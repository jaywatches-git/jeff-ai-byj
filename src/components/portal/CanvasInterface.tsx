import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ChartBar as BarChart2, TrendingUp, Activity } from 'lucide-react';
import type { PanelConfig } from '../../jeffConfig';
import AmbientEffect from '../effects/AmbientEffect';
import CreatureArt from '../creatures/CreatureArt';
import { StandardChat } from './PanelPortal';

interface Props { panel: PanelConfig; onClose: () => void; }

// Simple canvas chart visualisation
function MiniChart({ color }: { color: string }) {
  const points = [40, 65, 30, 80, 55, 90, 45, 75, 60, 85];
  const maxY = 100;
  const w = 300;
  const h = 100;

  const pathD = points.map((p, i) =>
    `${i === 0 ? 'M' : 'L'} ${(i / (points.length - 1)) * w} ${h - (p / maxY) * h}`
  ).join(' ');

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`${pathD} L ${w} ${h} L 0 ${h} Z`} fill="url(#chartGrad)" />
      <path d={pathD} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {points.map((p, i) => (
        <circle
          key={i}
          cx={(i / (points.length - 1)) * w}
          cy={h - (p / maxY) * h}
          r="3"
          fill={color}
          opacity="0.8"
        />
      ))}
    </svg>
  );
}

export default function CanvasInterface({ panel, onClose }: Props) {
  const { primary, glow, textAccent } = panel.palette;

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

        {/* Right: data visualisation */}
        <div className="w-2/5 flex flex-col relative flex-shrink-0 overflow-y-auto" style={{ background: `${panel.palette.background[0]}f0` }}>
          <div className="absolute inset-0 opacity-20"><AmbientEffect panel={panel} /></div>

          <div className="relative z-10 p-4 space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <BarChart2 size={14} style={{ color: primary }} />
              <span className="text-xs tracking-widest uppercase" style={{ color: `${textAccent}80`, fontFamily: 'Rajdhani, sans-serif' }}>
                Data Canvas
              </span>
            </div>

            {/* Chart 1 */}
            <div
              className="rounded-xl p-3"
              style={{ background: `${primary}10`, border: `1px solid ${primary}20` }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs" style={{ color: textAccent }}>Analysis Output</span>
                <TrendingUp size={12} style={{ color: primary }} />
              </div>
              <div className="h-20">
                <MiniChart color={primary} />
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: 'Data Points', value: '1,247' },
                { label: 'Accuracy', value: '94.3%' },
                { label: 'Queries Run', value: '38' },
                { label: 'Anomalies', value: '2' },
              ].map((s, i) => (
                <div
                  key={i}
                  className="rounded-lg p-2"
                  style={{ background: `${primary}08`, border: `1px solid ${primary}20` }}
                >
                  <div className="text-[10px] mb-0.5" style={{ color: `${textAccent}60` }}>{s.label}</div>
                  <div className="text-sm font-bold" style={{ color: textAccent, fontFamily: 'Rajdhani, sans-serif' }}>{s.value}</div>
                </div>
              ))}
            </div>

            {/* Activity */}
            <div
              className="rounded-xl p-3"
              style={{ background: `${primary}08`, border: `1px solid ${primary}20` }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs" style={{ color: textAccent }}>Activity</span>
                <Activity size={12} style={{ color: primary }} />
              </div>
              <div className="h-16">
                <MiniChart color={glow} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
