import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Image, Loader as Loader2 } from 'lucide-react';
import type { PanelConfig } from '../../jeffConfig';
import AmbientEffect from '../effects/AmbientEffect';
import CreatureArt from '../creatures/CreatureArt';

interface Props { panel: PanelConfig; onClose: () => void; }

export default function ImageGenInterface({ panel, onClose }: Props) {
  const [prompt, setPrompt] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { primary, glow, textAccent } = panel.palette;

  const generate = async () => {
    if (!prompt.trim() || loading) return;
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: prompt.trim(), panelId: panel.id }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Generation failed');
      if (data.urls) setImages(prev => [...data.urls, ...prev]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate image');
    } finally {
      setLoading(false);
    }
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
      <div className="absolute inset-0 opacity-40"><AmbientEffect panel={panel} /></div>

      {/* Header */}
      <div className="relative z-10 flex items-center gap-3 px-4 py-3 flex-shrink-0" style={{ borderBottom: `1px solid ${primary}30` }}>
        <button onClick={onClose} className="flex items-center gap-1.5 text-sm hover:opacity-70" style={{ color: textAccent }}>
          <ArrowLeft size={16} />
          <span style={{ fontFamily: 'Rajdhani, sans-serif' }} className="tracking-wider">BACK</span>
        </button>
        <div className="w-px h-5" style={{ background: `${primary}30` }} />
        <div className="w-12 h-8"><CreatureArt panelId={panel.id} primaryColor={primary} glowColor={glow} /></div>
        <span className="text-sm font-bold tracking-widest" style={{ color: textAccent, fontFamily: 'Rajdhani, sans-serif' }}>
          {panel.label}
        </span>
      </div>

      {/* Image grid */}
      <div className="relative z-10 flex-1 overflow-y-auto p-4 min-h-0">
        {images.length === 0 && !loading && (
          <div className="flex flex-col items-center justify-center h-full opacity-40">
            <Image size={48} style={{ color: primary }} className="mb-3" />
            <p className="text-sm" style={{ color: textAccent }}>Enter a prompt to generate images</p>
          </div>
        )}
        <div className="grid grid-cols-2 gap-3">
          {images.map((url, i) => (
            <img key={i} src={url} alt={`Generated ${i}`} className="w-full rounded-lg" style={{ border: `1px solid ${primary}30` }} />
          ))}
          {loading && (
            <div
              className="w-full aspect-square rounded-lg flex items-center justify-center"
              style={{ background: `${primary}10`, border: `1px solid ${primary}30` }}
            >
              <Loader2 size={32} className="animate-spin" style={{ color: primary }} />
            </div>
          )}
        </div>
        {error && <p className="mt-3 text-xs text-red-400">{error}</p>}
      </div>

      {/* Prompt input */}
      <div className="relative z-10 px-4 py-3 flex-shrink-0" style={{ borderTop: `1px solid ${primary}20` }}>
        <div className="flex gap-2">
          <input
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && generate()}
            placeholder="Describe your image…"
            className="flex-1 bg-transparent px-4 py-2.5 text-sm rounded-xl outline-none"
            style={{
              background: `${primary}10`,
              border: `1px solid ${primary}30`,
              color: '#e2e8f0',
              caretColor: primary,
            }}
          />
          <button
            onClick={generate}
            disabled={!prompt.trim() || loading}
            className="px-4 py-2 rounded-xl text-sm font-bold tracking-wide disabled:opacity-30"
            style={{ background: `${primary}30`, border: `1px solid ${primary}50`, color: textAccent }}
          >
            {loading ? <Loader2 size={16} className="animate-spin" /> : 'Generate'}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
