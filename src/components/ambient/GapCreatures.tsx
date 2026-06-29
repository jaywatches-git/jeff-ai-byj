import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Creature silhouettes for the inter-panel gap animation
const SILHOUETTES = [
  // Small cat walking (right-facing)
  'M10,28 C10,22 14,18 18,18 C16,14 17,10 20,10 C23,10 24,13 22,16 C26,16 30,19 30,24 C32,20 36,20 36,24 C36,27 34,28 32,28 L28,32 L28,36 L26,36 L26,32 L22,32 L22,36 L20,36 L20,32 L14,32 L14,36 L12,36 L12,32 Z',
  // Small bird in flight
  'M20,20 C15,15 5,18 2,16 C6,20 8,22 12,20 C10,22 8,26 10,28 C14,24 16,22 20,20 Z M20,20 C25,15 35,18 38,16 C34,20 32,22 28,20 C30,22 32,26 30,28 C26,24 24,22 20,20 Z',
  // Small dog/creature trotting
  'M8,24 L8,30 L10,30 L10,26 L14,24 L20,22 L26,24 L30,26 L30,30 L32,30 L32,24 C32,20 28,18 24,18 L24,14 C24,12 22,11 20,11 C18,11 16,12 16,14 L16,18 C12,18 8,20 8,24 Z',
];

interface SilhouetteEvent {
  id: string;
  path: string;
  row: 1 | 2;        // which gap row (between row1-2 or row2-3)
  direction: 'ltr' | 'rtl';
}

export default function GapCreatures() {
  const [active, setActive] = useState<SilhouetteEvent | null>(null);

  useEffect(() => {
    // First event after 20-40 seconds, then every 35-65 seconds
    const schedule = () => {
      const delay = 20000 + Math.random() * 20000;
      return setTimeout(() => {
        const event: SilhouetteEvent = {
          id: crypto.randomUUID(),
          path: SILHOUETTES[Math.floor(Math.random() * SILHOUETTES.length)],
          row: Math.random() > 0.5 ? 1 : 2,
          direction: Math.random() > 0.5 ? 'ltr' : 'rtl',
        };
        setActive(event);
        // Clear after animation (12s)
        setTimeout(() => {
          setActive(null);
          timer = schedule();
        }, 12000);
      }, delay);
    };

    let timer = schedule();
    return () => clearTimeout(timer);
  }, []);

  if (!active) return null;

  // Gap is at 1/3 or 2/3 of grid height, accounting for the gap itself
  // Position the silhouette in the gap between panel rows
  const topPct = active.row === 1
    ? 'calc(33.33% - 20px)'
    : 'calc(66.66% - 20px)';

  const animStyle: React.CSSProperties = {
    position: 'absolute',
    top: topPct,
    left: 0,
    width: '50px',
    height: '40px',
    zIndex: 5,
    pointerEvents: 'none',
    opacity: 0,
    animation: active.direction === 'ltr'
      ? 'gapSlideRight 10s ease-in-out forwards'
      : 'gapSlideLeft 10s ease-in-out forwards',
  };

  return (
    <div key={active.id} style={animStyle}>
      <svg
        viewBox="0 0 40 40"
        style={{
          width: '100%',
          height: '100%',
          filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.8))',
          transform: active.direction === 'rtl' ? 'scaleX(-1)' : undefined,
        }}
      >
        <path d={active.path} fill="rgba(0,0,0,0.55)" />
      </svg>
    </div>
  );
}
