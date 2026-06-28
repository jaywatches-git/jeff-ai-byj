import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { PanelConfig } from '../../jeffConfig';
import AmbientEffect from '../effects/AmbientEffect';
import CreatureArt from '../creatures/CreatureArt';

interface PanelCardProps {
  panel: PanelConfig;
  onClick: (panel: PanelConfig) => void;
  animationDelay: number;
}

export default function PanelCard({ panel, onClick, animationDelay }: PanelCardProps) {
  const [taskIndex, setTaskIndex] = useState(0);
  const tasks = panel.ambientBehaviour.microTasks;

  useEffect(() => {
    const interval = setInterval(() => {
      setTaskIndex(i => (i + 1) % tasks.length);
    }, panel.ambientBehaviour.loopIntervalMs);
    return () => clearInterval(interval);
  }, [tasks, panel.ambientBehaviour.loopIntervalMs]);

  const { primary, glow, textAccent } = panel.palette;

  return (
    <motion.div
      className="relative overflow-hidden cursor-pointer panel-card"
      style={{
        borderRadius: '16px',
        border: `1px solid ${primary}40`,
        boxShadow: `0 0 20px ${glow}20, inset 0 0 40px rgba(0,0,0,0.3)`,
        background: panel.palette.background[0],
      }}
      initial={{ scale: 0.6, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        delay: animationDelay,
        duration: 0.5,
        type: 'spring',
        stiffness: 200,
        damping: 20,
      }}
      whileHover={{
        boxShadow: `0 0 35px ${glow}50, inset 0 0 40px rgba(0,0,0,0.2)`,
        borderColor: `${primary}80`,
      }}
      onClick={() => onClick(panel)}
    >
      {/* Ambient background effect */}
      <div className="absolute inset-0">
        <AmbientEffect panel={panel} />
      </div>

      {/* Content overlay */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Creature art — top ~60% */}
        <div className="flex-1 flex items-center justify-center p-2 min-h-0">
          <div className="w-full h-full max-h-[130px]">
            <CreatureArt
              panelId={panel.id}
              primaryColor={primary}
              glowColor={glow}
            />
          </div>
        </div>

        {/* Panel info */}
        <div
          className="px-3 py-2 flex-shrink-0"
          style={{
            background: `linear-gradient(to top, ${panel.palette.background[0]}f0 0%, transparent 100%)`,
          }}
        >
          {/* Label */}
          <div
            className="text-xs font-bold tracking-[0.15em] uppercase mb-0.5 truncate"
            style={{
              color: textAccent,
              fontFamily: 'Rajdhani, Orbitron, sans-serif',
              textShadow: `0 0 8px ${glow}60`,
            }}
          >
            {panel.label}
          </div>

          {/* Tagline */}
          <div
            className="text-[10px] truncate mb-2"
            style={{ color: `${textAccent}80` }}
          >
            {panel.tagline}
          </div>

          {/* Divider */}
          <div
            className="h-px mb-1.5"
            style={{ background: `linear-gradient(90deg, ${primary}40, transparent)` }}
          />

          {/* Micro-task ticker */}
          <div
            className="overflow-hidden h-4"
            style={{ position: 'relative' }}
          >
            <motion.div
              key={taskIndex}
              initial={{ y: 8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="text-[9px] truncate"
              style={{ color: `${primary}90` }}
            >
              {tasks[taskIndex]}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Corner accent */}
      <div
        className="absolute top-0 right-0 w-6 h-6"
        style={{
          background: `linear-gradient(135deg, ${primary}30 0%, transparent 60%)`,
          borderTopRightRadius: '16px',
        }}
      />
    </motion.div>
  );
}
