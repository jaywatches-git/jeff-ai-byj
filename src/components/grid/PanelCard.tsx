import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { PanelConfig } from '../../jeffConfig';
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
      className="relative overflow-hidden cursor-pointer panel-card w-full h-full"
      style={{
        borderRadius: '16px',
        border: `1px solid ${primary}40`,
        boxShadow: `0 0 20px ${glow}20`,
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
        boxShadow: `0 0 40px ${glow}55, 0 0 12px ${glow}25`,
        borderColor: `${primary}80`,
      }}
      onClick={() => onClick(panel)}
    >
      {/* Creature scene — fills entire card */}
      <div className="absolute inset-0">
        <CreatureArt
          panelId={panel.id}
          primaryColor={primary}
          glowColor={glow}
        />
      </div>

      {/* Bottom overlay: gradient + text */}
      <div
        className="absolute bottom-0 left-0 right-0 z-10 px-3 pb-2 pt-10"
        style={{
          background: `linear-gradient(to top, rgba(2,11,20,0.95) 0%, rgba(2,11,20,0.7) 50%, transparent 100%)`,
        }}
      >
        {/* Label */}
        <div
          className="text-xs font-bold tracking-[0.15em] uppercase mb-0.5 truncate"
          style={{
            color: textAccent,
            fontFamily: 'Rajdhani, Orbitron, sans-serif',
            textShadow: `0 0 8px ${glow}80`,
          }}
        >
          {panel.label}
        </div>

        {/* Tagline */}
        <div
          className="text-[10px] truncate mb-1.5"
          style={{ color: `${textAccent}99` }}
        >
          {panel.tagline}
        </div>

        {/* Divider */}
        <div
          className="h-px mb-1"
          style={{ background: `linear-gradient(90deg, ${primary}50, transparent)` }}
        />

        {/* Micro-task ticker */}
        <div className="overflow-hidden h-4">
          <motion.div
            key={taskIndex}
            initial={{ y: 8, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -8, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="text-[9px] truncate"
            style={{ color: `${primary}aa` }}
          >
            {tasks[taskIndex]}
          </motion.div>
        </div>
      </div>

      {/* Corner accent */}
      <div
        className="absolute top-0 right-0 w-8 h-8 z-10"
        style={{
          background: `linear-gradient(135deg, ${primary}35 0%, transparent 65%)`,
          borderTopRightRadius: '16px',
        }}
      />
    </motion.div>
  );
}
