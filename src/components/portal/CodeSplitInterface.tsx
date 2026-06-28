import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import type { PanelConfig } from '../../jeffConfig';
import AmbientEffect from '../effects/AmbientEffect';
import CreatureArt from '../creatures/CreatureArt';
import { StandardChat } from './PanelPortal';

interface Props { panel: PanelConfig; onClose: () => void; }

export default function CodeSplitInterface({ panel, onClose }: Props) {
  const [codeContent, setCodeContent] = useState('// Code will appear here…');
  const { primary, glow, textAccent } = panel.palette;

  // Extract code blocks from the last message by watching the DOM
  // For simplicity: render standard chat on left, code on right

  return (
    <motion.div
      className="absolute inset-0 z-50 flex flex-col overflow-hidden"
      style={{ background: panel.palette.background[0], borderRadius: '16px' }}
      initial={{ scale: 0.4, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.4, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
    >
      <div className="flex h-full">
        {/* Left: chat */}
        <div className="flex-1 relative min-w-0">
          <StandardChat panel={panel} onClose={onClose} />
        </div>

        {/* Divider */}
        <div className="w-px flex-shrink-0" style={{ background: `${primary}30` }} />

        {/* Right: code panel */}
        <div
          className="w-2/5 flex flex-col relative flex-shrink-0"
          style={{ background: `${panel.palette.background[0]}f0` }}
        >
          <div className="absolute inset-0 opacity-20"><AmbientEffect panel={panel} /></div>
          <div
            className="relative z-10 flex items-center justify-between px-4 py-3 flex-shrink-0"
            style={{ borderBottom: `1px solid ${primary}20` }}
          >
            <span className="text-xs tracking-widest uppercase" style={{ color: `${textAccent}60`, fontFamily: 'Rajdhani, sans-serif' }}>
              Code Output
            </span>
          </div>
          <pre
            className="relative z-10 flex-1 p-4 overflow-auto text-xs font-mono leading-relaxed"
            style={{ color: '#e2e8f0', fontFamily: 'JetBrains Mono, monospace' }}
          >
            {codeContent}
          </pre>
        </div>
      </div>
    </motion.div>
  );
}
