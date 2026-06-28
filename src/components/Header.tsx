import { Settings } from 'lucide-react';
import { JEFF_IDENTITY } from '../jeffConfig';
import { JeffHexLogo } from './intro/IntroSequence';

interface HeaderProps {
  onSettingsClick: () => void;
}

export default function Header({ onSettingsClick }: HeaderProps) {
  return (
    <header
      className="flex items-center justify-between px-4 py-2 flex-shrink-0 relative"
      style={{
        background: 'rgba(2,11,20,0.95)',
        borderBottom: '1px solid rgba(0,191,255,0.12)',
        height: '56px',
      }}
    >
      {/* Left spacer */}
      <div className="w-8" />

      {/* Centre: logo + title */}
      <div className="flex items-center gap-3">
        <JeffHexLogo size={36} />
        <div>
          <div
            className="text-lg font-black tracking-[0.25em] leading-none"
            style={{
              color: '#00BFFF',
              fontFamily: 'Orbitron, sans-serif',
              textShadow: '0 0 12px rgba(0,191,255,0.5)',
            }}
          >
            {JEFF_IDENTITY.name}
          </div>
          <div
            className="text-[9px] tracking-[0.2em] uppercase leading-none mt-0.5"
            style={{ color: 'rgba(0,191,255,0.45)', fontFamily: 'Rajdhani, sans-serif' }}
          >
            {JEFF_IDENTITY.fullName}
          </div>
        </div>
      </div>

      {/* Right: settings */}
      <button
        onClick={onSettingsClick}
        className="w-8 h-8 flex items-center justify-center rounded-lg transition-all hover:bg-cyan-500/10"
        style={{ border: '1px solid rgba(0,191,255,0.2)' }}
      >
        <Settings size={15} style={{ color: 'rgba(0,191,255,0.7)' }} />
      </button>
    </header>
  );
}
