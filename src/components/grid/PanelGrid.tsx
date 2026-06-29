import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { PANELS, LAUNCH_SEQUENCE } from '../../jeffConfig';
import type { PanelConfig } from '../../jeffConfig';
import PanelCard from './PanelCard';
import GapCreatures from '../ambient/GapCreatures';

interface PanelGridProps {
  onPanelClick: (panel: PanelConfig) => void;
}

// Bloom order: centre outward (index 4 = centre of 3×3)
const BLOOM_ORDER = [4, 1, 3, 5, 7, 0, 2, 6, 8];
const STAGGER = LAUNCH_SEQUENCE.phase3.staggerMs / 1000;

export default function PanelGrid({ onPanelClick }: PanelGridProps) {
  const gridRef = useRef<HTMLDivElement>(null);

  return (
    <div className="w-full h-full flex items-center justify-center py-3 px-4">
      {/*
        Centred 3×3 grid.
        max-w keeps background visible on wide screens.
        aspect-ratio on each cell enforces portrait-square (~1:1.2).
      */}
      <div
        ref={gridRef}
        className="relative w-full"
        style={{
          maxWidth: 'min(92vw, calc((100vh - 120px) * 2.78))',
        }}
      >
        <div
          className="grid grid-cols-3"
          style={{ gap: '10px' }}
        >
          {PANELS.map((panel, i) => {
            const bloomIndex = BLOOM_ORDER.indexOf(i);
            return (
              <div
                key={panel.id}
                style={{ aspectRatio: '5 / 6' }}
              >
                <PanelCard
                  panel={panel}
                  onClick={onPanelClick}
                  animationDelay={bloomIndex * STAGGER}
                />
              </div>
            );
          })}
        </div>

        {/* Inter-panel creature silhouettes */}
        <GapCreatures />
      </div>
    </div>
  );
}
