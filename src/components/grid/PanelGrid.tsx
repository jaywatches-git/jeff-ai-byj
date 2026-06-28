import { motion } from 'framer-motion';
import { PANELS, LAUNCH_SEQUENCE } from '../../jeffConfig';
import type { PanelConfig } from '../../jeffConfig';
import PanelCard from './PanelCard';

interface PanelGridProps {
  onPanelClick: (panel: PanelConfig) => void;
}

export default function PanelGrid({ onPanelClick }: PanelGridProps) {
  const stagger = LAUNCH_SEQUENCE.phase3.staggerMs / 1000;

  // Centre-outward order for bloom animation: centre first, then outward
  const bloomOrder = [4, 1, 3, 5, 7, 0, 2, 6, 8];

  return (
    <div
      className="w-full h-full grid"
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gridTemplateRows: 'repeat(3, 1fr)',
        gap: '8px',
        padding: '8px',
      }}
    >
      {PANELS.map((panel, i) => {
        const bloomIndex = bloomOrder.indexOf(i);
        return (
          <PanelCard
            key={panel.id}
            panel={panel}
            onClick={onPanelClick}
            animationDelay={bloomIndex * stagger}
          />
        );
      })}
    </div>
  );
}
