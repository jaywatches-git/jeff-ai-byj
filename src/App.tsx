import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import IntroSequence from './components/intro/IntroSequence';
import PanelGrid from './components/grid/PanelGrid';
import PanelPortal from './components/portal/PanelPortal';
import Header from './components/Header';
import Footer from './components/Footer';
import SettingsDrawer from './components/settings/SettingsDrawer';
import type { PanelConfig } from './jeffConfig';

type AppState = 'intro' | 'grid' | 'portal';

export default function App() {
  const [appState, setAppState] = useState<AppState>('intro');
  const [activePanel, setActivePanel] = useState<PanelConfig | null>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const handlePanelClick = (panel: PanelConfig) => {
    setActivePanel(panel);
    setAppState('portal');
  };

  const handlePortalClose = () => {
    setActivePanel(null);
    setAppState('grid');
  };

  return (
    <div className="w-screen h-screen overflow-hidden flex flex-col" style={{ background: '#020B14' }}>

      {/* ── Full-screen background ── */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Video background — swap src when jeff_bg_anim.mp4 is available */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-60"
          onError={e => (e.currentTarget.style.display = 'none')}
        >
          <source src="/jeff_bg_anim.mp4" type="video/mp4" />
        </video>
        {/* CSS animated gradient fallback (always visible, video overlays it) */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 80% 60% at 20% 80%, rgba(0,30,60,0.9) 0%, transparent 60%),
              radial-gradient(ellipse 60% 80% at 80% 20%, rgba(0,15,40,0.8) 0%, transparent 60%),
              radial-gradient(ellipse 100% 100% at 50% 50%, #020B14 0%, #010810 100%)
            `,
          }}
        />
        {/* Subtle star field */}
        <StarField />
      </div>

      <AnimatePresence mode="wait">
        {appState === 'intro' ? (
          <motion.div
            key="intro"
            className="absolute inset-0 z-30"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <IntroSequence onComplete={() => setAppState('grid')} />
          </motion.div>
        ) : (
          <motion.div
            key="app"
            className="flex flex-col w-full h-full relative z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Header onSettingsClick={() => setSettingsOpen(true)} />

            <div className="flex-1 relative overflow-hidden min-h-0">
              <div className="absolute inset-0">
                <PanelGrid onPanelClick={handlePanelClick} />
              </div>

              <AnimatePresence>
                {appState === 'portal' && activePanel && (
                  <div className="absolute inset-0 z-20 p-2">
                    <PanelPortal panel={activePanel} onClose={handlePortalClose} />
                  </div>
                )}
              </AnimatePresence>
            </div>

            <Footer />
          </motion.div>
        )}
      </AnimatePresence>

      {appState !== 'intro' && (
        <SettingsDrawer isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} />
      )}
    </div>
  );
}

// ── Static star field ────────────────────────────────────────

function StarField() {
  const stars = Array.from({ length: 60 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() < 0.8 ? 1 : 1.5,
    opacity: 0.15 + Math.random() * 0.35,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none">
      {stars.map(s => (
        <div
          key={s.id}
          className="absolute rounded-full"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            background: 'white',
            opacity: s.opacity,
          }}
        />
      ))}
    </div>
  );
}
