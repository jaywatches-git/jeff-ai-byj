import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AMBIENT_WORLD } from '../../jeffConfig';

interface Toast {
  id: string;
  from: string;
  to: string;
  message: string;
}

export default function AmbientToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    if (!AMBIENT_WORLD.enabled) return;

    const fire = () => {
      const events = AMBIENT_WORLD.crossPanelEvents;
      const event = events[Math.floor(Math.random() * events.length)];
      const toast: Toast = {
        id: crypto.randomUUID(),
        from: event.from,
        to: event.to,
        message: event.message,
      };
      setToasts(prev => [...prev, toast]);
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== toast.id));
      }, AMBIENT_WORLD.toastDurationMs);
    };

    // Initial delay then regular interval
    const initialDelay = setTimeout(() => {
      fire();
      const interval = setInterval(fire, AMBIENT_WORLD.globalLoopMs);
      return () => clearInterval(interval);
    }, 8000);

    return () => clearTimeout(initialDelay);
  }, []);

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 pointer-events-none">
      <AnimatePresence>
        {toasts.map(toast => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 40, y: 0 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 40 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="rounded-xl px-4 py-2.5 max-w-[280px]"
            style={{
              background: 'rgba(2,11,20,0.95)',
              border: '1px solid rgba(0,191,255,0.25)',
              boxShadow: '0 4px 20px rgba(0,0,0,0.5), 0 0 12px rgba(0,191,255,0.1)',
            }}
          >
            <div className="flex items-center gap-2">
              <div
                className="w-1.5 h-1.5 rounded-full flex-shrink-0 animate-pulse"
                style={{ background: '#00BFFF' }}
              />
              <span className="text-xs" style={{ color: 'rgba(0,191,255,0.8)' }}>
                {toast.message}
              </span>
            </div>
            <div className="flex items-center gap-1 mt-0.5">
              <span className="text-[10px]" style={{ color: 'rgba(255,255,255,0.3)' }}>
                {toast.from}
              </span>
              <span className="text-[10px]" style={{ color: 'rgba(255,255,255,0.2)' }}>→</span>
              <span className="text-[10px]" style={{ color: 'rgba(255,255,255,0.3)' }}>
                {toast.to}
              </span>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
