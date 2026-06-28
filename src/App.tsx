import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import IntroSequence from './components/intro/IntroSequence';
import PanelGrid from './components/grid/PanelGrid';
import PanelPortal from './components/portal/PanelPortal';
import Header from './components/Header';
import Footer from './components/Footer';
import SettingsDrawer from './components/settings/SettingsDrawer';
import AmbientToast from './components/ambient/AmbientToast';
import type { PanelConfig } from './jeffConfig';

type AppState = 'intro' | 'grid' | 'portal';

export default function App() {
  const [appState, setAppState] = useState<AppState>('intro');
  const [activePanel, setActivePanel] = useState<PanelConfig | null>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const handleIntroComplete = () => {
    setAppState('grid');
  };

  const handlePanelClick = (panel: PanelConfig) => {
    setActivePanel(panel);
    setAppState('portal');
  };

  const handlePortalClose = () => {
    setActivePanel(null);
    setAppState('grid');
  };

  return (
    <div
      className="w-screen h-screen overflow-hidden flex flex-col"
      style={{ background: '#020B14' }}
    >
      <AnimatePresence mode="wait">
        {appState === 'intro' ? (
          <motion.div
            key="intro"
            className="absolute inset-0 z-30"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <IntroSequence onComplete={handleIntroComplete} />
          </motion.div>
        ) : (
          <motion.div
            key="app"
            className="flex flex-col w-full h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Header onSettingsClick={() => setSettingsOpen(true)} />

            {/* Main content */}
            <div className="flex-1 relative overflow-hidden min-h-0">
              {/* Grid — always rendered but hidden when portal is open */}
              <div className="absolute inset-0">
                <PanelGrid onPanelClick={handlePanelClick} />
              </div>

              {/* Portal overlay */}
              <AnimatePresence>
                {appState === 'portal' && activePanel && (
                  <div className="absolute inset-0 z-20 p-2">
                    <PanelPortal
                      panel={activePanel}
                      onClose={handlePortalClose}
                    />
                  </div>
                )}
              </AnimatePresence>
            </div>

            <Footer />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Settings drawer — always available after intro */}
      {appState !== 'intro' && (
        <SettingsDrawer
          isOpen={settingsOpen}
          onClose={() => setSettingsOpen(false)}
        />
      )}

      {/* Ambient toasts */}
      {appState !== 'intro' && <AmbientToast />}
    </div>
  );
}
