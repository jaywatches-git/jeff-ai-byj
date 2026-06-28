import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, X, CircleCheck as CheckCircle2, Circle, Trash2, Plus, Wifi, WifiOff } from 'lucide-react';
import { API_KEY_SLOTS } from '../../jeffConfig';
import { supabase } from '../../lib/supabase';
import type { Todo } from '../../lib/supabase';

interface SettingsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SettingsDrawer({ isOpen, onClose }: SettingsDrawerProps) {
  const [activeTab, setActiveTab] = useState<'keys' | 'todos' | 'system'>('keys');
  const [keys, setKeys] = useState<Record<string, string>>({});
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [ollamaStatus, setOllamaStatus] = useState<'unknown' | 'online' | 'offline'>('unknown');

  // Load saved keys
  useEffect(() => {
    const saved: Record<string, string> = {};
    Object.keys(API_KEY_SLOTS).forEach(k => {
      const val = localStorage.getItem(`jeff_key_${k}`);
      if (val) saved[k] = val;
    });
    setKeys(saved);
  }, []);

  // Check Ollama status
  useEffect(() => {
    if (!isOpen) return;
    fetch('/api/ollama-status')
      .then(r => r.json())
      .then(d => setOllamaStatus(d.online ? 'online' : 'offline'))
      .catch(() => setOllamaStatus('offline'));
  }, [isOpen]);

  // Load todos
  useEffect(() => {
    if (!isOpen) return;
    supabase.from('todos').select('*').order('created_at', { ascending: false }).then(({ data }) => {
      if (data) setTodos(data as Todo[]);
    });
  }, [isOpen]);

  const saveKey = (key: string, value: string) => {
    setKeys(prev => ({ ...prev, [key]: value }));
    localStorage.setItem(`jeff_key_${key}`, value);
    // Also send to server to update env at runtime
    fetch('/api/set-key', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key, value }),
    }).catch(() => {});
  };

  const addTodo = async () => {
    if (!newTodo.trim()) return;
    const { data } = await supabase.from('todos').insert({ text: newTodo.trim(), done: false }).select().maybeSingle();
    if (data) setTodos(prev => [data as Todo, ...prev]);
    setNewTodo('');
  };

  const toggleTodo = async (todo: Todo) => {
    await supabase.from('todos').update({ done: !todo.done }).eq('id', todo.id);
    setTodos(prev => prev.map(t => t.id === todo.id ? { ...t, done: !t.done } : t));
  };

  const deleteTodo = async (id: string) => {
    await supabase.from('todos').delete().eq('id', id);
    setTodos(prev => prev.filter(t => t.id !== id));
  };

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-40"
            style={{ background: 'rgba(0,0,0,0.5)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      {/* Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed right-0 top-0 bottom-0 z-50 flex flex-col w-80"
            style={{
              background: '#040C16',
              borderLeft: '1px solid rgba(0,191,255,0.2)',
              boxShadow: '-10px 0 40px rgba(0,0,0,0.6)',
            }}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-5 py-4 flex-shrink-0"
              style={{ borderBottom: '1px solid rgba(0,191,255,0.15)' }}
            >
              <div className="flex items-center gap-2">
                <Settings size={16} className="text-cyan-400" />
                <span className="text-sm font-bold tracking-widest uppercase text-cyan-400" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                  SETTINGS
                </span>
              </div>
              <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
                <X size={18} />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex flex-shrink-0" style={{ borderBottom: '1px solid rgba(0,191,255,0.1)' }}>
              {(['keys', 'todos', 'system'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className="flex-1 py-2.5 text-xs font-bold tracking-widest uppercase transition-colors"
                  style={{
                    fontFamily: 'Rajdhani, sans-serif',
                    color: activeTab === tab ? '#00BFFF' : 'rgba(255,255,255,0.4)',
                    borderBottom: activeTab === tab ? '2px solid #00BFFF' : '2px solid transparent',
                  }}
                >
                  {tab === 'keys' ? 'API Keys' : tab === 'todos' ? 'Tasks' : 'System'}
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">

              {/* API Keys tab */}
              {activeTab === 'keys' && (
                <>
                  {Object.entries(API_KEY_SLOTS).map(([key, info]) => (
                    <div key={key}>
                      <label className="block text-xs text-slate-400 mb-1.5 tracking-wide">
                        {info.label}
                        {info.required && <span className="text-red-400 ml-1">*</span>}
                      </label>
                      <input
                        type="password"
                        placeholder={key.includes('URL') ? 'http://localhost:11434' : '••••••••'}
                        value={keys[key] || ''}
                        onChange={e => saveKey(key, e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-lg outline-none"
                        style={{
                          background: 'rgba(0,191,255,0.06)',
                          border: '1px solid rgba(0,191,255,0.2)',
                          color: '#e2e8f0',
                          caretColor: '#00BFFF',
                        }}
                      />
                    </div>
                  ))}
                  <p className="text-[10px] text-slate-500 mt-2">
                    Keys are stored in localStorage and sent to the local server at runtime. Never leave the device.
                  </p>
                </>
              )}

              {/* Todos tab */}
              {activeTab === 'todos' && (
                <>
                  <div className="flex gap-2">
                    <input
                      value={newTodo}
                      onChange={e => setNewTodo(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && addTodo()}
                      placeholder="New task…"
                      className="flex-1 px-3 py-2 text-xs rounded-lg outline-none"
                      style={{
                        background: 'rgba(0,191,255,0.06)',
                        border: '1px solid rgba(0,191,255,0.2)',
                        color: '#e2e8f0',
                        caretColor: '#00BFFF',
                      }}
                    />
                    <button
                      onClick={addTodo}
                      className="px-3 py-2 rounded-lg text-cyan-400 hover:text-white transition-colors"
                      style={{ background: 'rgba(0,191,255,0.1)', border: '1px solid rgba(0,191,255,0.3)' }}
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  <div className="space-y-2 mt-3">
                    {todos.length === 0 && (
                      <p className="text-xs text-slate-500 text-center py-4">No tasks. Add one above.</p>
                    )}
                    {todos.map(todo => (
                      <div
                        key={todo.id}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg group"
                        style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
                      >
                        <button onClick={() => toggleTodo(todo)} className="flex-shrink-0 transition-colors">
                          {todo.done
                            ? <CheckCircle2 size={14} className="text-cyan-400" />
                            : <Circle size={14} className="text-slate-500" />
                          }
                        </button>
                        <span
                          className="flex-1 text-xs"
                          style={{
                            color: todo.done ? 'rgba(255,255,255,0.3)' : '#e2e8f0',
                            textDecoration: todo.done ? 'line-through' : 'none',
                          }}
                        >
                          {todo.text}
                        </span>
                        <button
                          onClick={() => deleteTodo(todo.id)}
                          className="flex-shrink-0 opacity-0 group-hover:opacity-100 text-slate-500 hover:text-red-400 transition-all"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {/* System tab */}
              {activeTab === 'system' && (
                <>
                  <div
                    className="flex items-center justify-between px-3 py-2.5 rounded-lg"
                    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
                  >
                    <span className="text-xs text-slate-300">Ollama Status</span>
                    <div className="flex items-center gap-1.5">
                      {ollamaStatus === 'online'
                        ? <><Wifi size={12} className="text-green-400" /><span className="text-xs text-green-400">Online</span></>
                        : ollamaStatus === 'offline'
                        ? <><WifiOff size={12} className="text-red-400" /><span className="text-xs text-red-400">Offline</span></>
                        : <span className="text-xs text-slate-500">Checking…</span>
                      }
                    </div>
                  </div>

                  <div
                    className="px-3 py-2.5 rounded-lg space-y-2"
                    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
                  >
                    <p className="text-xs font-bold text-slate-300">Token Economy</p>
                    <p className="text-[10px] text-slate-500">
                      Premium model gate is active. You will be prompted before using Claude Opus or GPT-4o.
                    </p>
                    <p className="text-[10px] text-slate-500">
                      Default tier: cheap. Free models preferred when Ollama is running.
                    </p>
                  </div>

                  <div
                    className="px-3 py-2.5 rounded-lg"
                    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
                  >
                    <p className="text-xs font-bold text-slate-300 mb-2">Install Ollama</p>
                    <p className="text-[10px] text-slate-500">
                      Run <code className="text-cyan-400">curl -fsSL https://ollama.ai/install.sh | sh</code> then{' '}
                      <code className="text-cyan-400">ollama pull llama3.1</code> to enable local models.
                    </p>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
