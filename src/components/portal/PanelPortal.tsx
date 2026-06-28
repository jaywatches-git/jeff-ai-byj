import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Send, Loader as Loader2, ChevronDown } from 'lucide-react';
import type { PanelConfig, ModelConfig } from '../../jeffConfig';
import { SYSTEM_PROMPTS, TOKEN_ECONOMY } from '../../jeffConfig';
import { supabase } from '../../lib/supabase';
import AmbientEffect from '../effects/AmbientEffect';
import CreatureArt from '../creatures/CreatureArt';
import CodeSplitInterface from './CodeSplitInterface';
import ImageGenInterface from './ImageGenInterface';
import CanvasInterface from './CanvasInterface';

interface PanelPortalProps {
  panel: PanelConfig;
  onClose: () => void;
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  model?: string;
}

export default function PanelPortal({ panel, onClose }: PanelPortalProps) {
  const chatInterface = panel.portalDestination.chatInterface;

  if (chatInterface === 'code-split') return <CodeSplitInterface panel={panel} onClose={onClose} />;
  if (chatInterface === 'image-gen') return <ImageGenInterface panel={panel} onClose={onClose} />;
  if (chatInterface === 'canvas') return <CanvasInterface panel={panel} onClose={onClose} />;
  return <StandardChat panel={panel} onClose={onClose} />;
}

// ── Standard chat interface ──────────────────────────────────

export function StandardChat({ panel, onClose }: PanelPortalProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState<ModelConfig>(() => {
    const sorted = [...panel.models].sort((a, b) => {
      const tier = { free: 0, cheap: 1, premium: 2 };
      return tier[a.tier] - tier[b.tier];
    });
    return sorted[0];
  });
  const [showModelPicker, setShowModelPicker] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { primary, glow, textAccent } = panel.palette;

  // Load conversation history
  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from('conversations')
        .select('*')
        .eq('panel_id', panel.id)
        .order('created_at', { ascending: true })
        .limit(50);
      if (data && data.length > 0) {
        setMessages(data.map(d => ({
          id: d.id,
          role: d.role as 'user' | 'assistant',
          content: d.content,
          model: d.model_id ?? undefined,
        })));
      }
    })();
  }, [panel.id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    // Premium gate
    if (selectedModel.tier === 'premium' && TOKEN_ECONOMY.premiumGate.enabled) {
      if (!confirm(TOKEN_ECONOMY.premiumGate.confirmationPrompt)) return;
    }

    const userMsg: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content: input.trim(),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    // Save user message
    await supabase.from('conversations').insert({
      panel_id: panel.id,
      role: 'user',
      content: userMsg.content,
    });

    const assistantId = crypto.randomUUID();
    setMessages(prev => [...prev, { id: assistantId, role: 'assistant', content: '' }]);

    try {
      const systemPrompt = SYSTEM_PROMPTS[panel.portalDestination.systemPromptKey] || '';
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          panelId: panel.id,
          messages: [
            { role: 'system', content: systemPrompt },
            ...messages.map(m => ({ role: m.role, content: m.content })),
            { role: 'user', content: userMsg.content },
          ],
          modelId: selectedModel.modelId,
          provider: selectedModel.provider,
        }),
      });

      if (!response.ok || !response.body) {
        throw new Error(`API error: ${response.status}`);
      }

      // Handle SSE stream
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let fullContent = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6).trim();
            if (data === '[DONE]') break;
            try {
              const parsed = JSON.parse(data);
              const delta = parsed.delta || parsed.text || '';
              if (delta) {
                fullContent += delta;
                setMessages(prev =>
                  prev.map(m =>
                    m.id === assistantId ? { ...m, content: fullContent } : m
                  )
                );
              }
            } catch {
              // non-JSON line
            }
          }
        }
      }

      // Save assistant message
      await supabase.from('conversations').insert({
        panel_id: panel.id,
        role: 'assistant',
        content: fullContent,
        model_id: selectedModel.modelId,
      });

    } catch (err) {
      const errMsg = err instanceof Error ? err.message : 'An error occurred';
      setMessages(prev =>
        prev.map(m =>
          m.id === assistantId
            ? { ...m, content: `Error: ${errMsg}. Check your API keys in Settings.` }
            : m
        )
      );
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const sortedModels = [...panel.models].sort((a, b) => {
    const tier = { free: 0, cheap: 1, premium: 2 };
    return tier[a.tier] - tier[b.tier];
  });

  const tierColour = (tier: string) => {
    if (tier === 'free') return '#32CD32';
    if (tier === 'cheap') return '#FFD700';
    return '#FF6347';
  };

  return (
    <motion.div
      className="absolute inset-0 z-50 flex flex-col overflow-hidden"
      style={{ background: panel.palette.background[0], borderRadius: '16px' }}
      initial={{ scale: 0.4, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.4, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
    >
      {/* Ambient BG */}
      <div className="absolute inset-0 opacity-40">
        <AmbientEffect panel={panel} />
      </div>

      {/* Header */}
      <div
        className="relative z-10 flex items-center justify-between px-4 py-3 flex-shrink-0"
        style={{
          borderBottom: `1px solid ${primary}30`,
          background: `${panel.palette.background[0]}e0`,
        }}
      >
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 text-sm transition-opacity hover:opacity-70"
            style={{ color: textAccent }}
          >
            <ArrowLeft size={16} />
            <span className="font-display tracking-wider" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
              BACK
            </span>
          </button>
          <div className="w-px h-5" style={{ background: `${primary}30` }} />
          <div className="flex items-center gap-2">
            <div className="w-20 h-10 flex-shrink-0">
              <CreatureArt panelId={panel.id} primaryColor={primary} glowColor={glow} />
            </div>
            <div>
              <div
                className="text-sm font-bold tracking-widest uppercase"
                style={{ color: textAccent, fontFamily: 'Rajdhani, sans-serif', textShadow: `0 0 8px ${glow}60` }}
              >
                {panel.label}
              </div>
              <div className="text-[10px]" style={{ color: `${textAccent}60` }}>
                {panel.tagline}
              </div>
            </div>
          </div>
        </div>

        {/* Model selector */}
        <div className="relative">
          <button
            onClick={() => setShowModelPicker(v => !v)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs transition-all"
            style={{
              background: `${primary}15`,
              border: `1px solid ${primary}30`,
              color: textAccent,
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full flex-shrink-0"
              style={{ background: tierColour(selectedModel.tier) }}
            />
            <span className="max-w-[120px] truncate">{selectedModel.label}</span>
            <ChevronDown size={12} />
          </button>

          <AnimatePresence>
            {showModelPicker && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="absolute right-0 top-full mt-1 rounded-lg overflow-hidden z-50 min-w-[180px]"
                style={{
                  background: panel.palette.background[0],
                  border: `1px solid ${primary}40`,
                  boxShadow: `0 8px 32px rgba(0,0,0,0.6)`,
                }}
              >
                {sortedModels.map(model => (
                  <button
                    key={model.modelId}
                    onClick={() => { setSelectedModel(model); setShowModelPicker(false); }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-xs text-left transition-colors hover:bg-white/5"
                    style={{ color: selectedModel.modelId === model.modelId ? textAccent : `${textAccent}80` }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ background: tierColour(model.tier) }}
                    />
                    <span className="flex-1">{model.label}</span>
                    <span style={{ color: `${textAccent}40` }}>{model.tier}</span>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Messages */}
      <div className="relative z-10 flex-1 overflow-y-auto px-4 py-4 space-y-4 min-h-0">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center opacity-40">
            <div className="w-24 h-24 mb-4">
              <CreatureArt panelId={panel.id} primaryColor={primary} glowColor={glow} />
            </div>
            <p className="text-sm" style={{ color: textAccent, fontFamily: 'Rajdhani, sans-serif' }}>
              {panel.creature.name} is ready.
            </p>
            <p className="text-xs mt-1" style={{ color: `${textAccent}60` }}>
              {panel.tagline}
            </p>
          </div>
        )}

        {messages.map(msg => (
          <div
            key={msg.id}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                msg.role === 'user' ? 'chat-user' : 'chat-assistant'
              }`}
              style={{
                background: msg.role === 'user' ? `${primary}20` : 'rgba(255,255,255,0.04)',
                border: `1px solid ${msg.role === 'user' ? `${primary}40` : 'rgba(255,255,255,0.08)'}`,
                color: msg.role === 'user' ? textAccent : '#e2e8f0',
              }}
            >
              {msg.content || (
                loading && msg.role === 'assistant' && (
                  <span className="flex items-center gap-2" style={{ color: `${textAccent}60` }}>
                    <Loader2 size={12} className="animate-spin" />
                    Thinking…
                  </span>
                )
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div
        className="relative z-10 px-4 py-3 flex-shrink-0"
        style={{ borderTop: `1px solid ${primary}20`, background: `${panel.palette.background[0]}e0` }}
      >
        <div
          className="flex items-end gap-2 rounded-xl overflow-hidden"
          style={{
            background: `${primary}10`,
            border: `1px solid ${primary}30`,
          }}
        >
          <textarea
            ref={textareaRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={`Message ${panel.creature.name}…`}
            rows={1}
            className="flex-1 bg-transparent px-4 py-3 text-sm resize-none outline-none max-h-32"
            style={{ color: '#e2e8f0', caretColor: primary }}
            onInput={e => {
              const el = e.currentTarget;
              el.style.height = 'auto';
              el.style.height = `${Math.min(el.scrollHeight, 128)}px`;
            }}
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim() || loading}
            className="m-2 p-2 rounded-lg transition-all disabled:opacity-30"
            style={{
              background: `${primary}30`,
              border: `1px solid ${primary}50`,
              color: textAccent,
            }}
          >
            {loading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
          </button>
        </div>
        <p className="text-[10px] mt-1.5 text-center" style={{ color: `${textAccent}30` }}>
          Enter to send · Shift+Enter for newline
        </p>
      </div>
    </motion.div>
  );
}
