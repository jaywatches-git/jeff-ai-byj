import { JEFF_IDENTITY } from '../jeffConfig';

export default function Footer() {
  return (
    <footer
      className="flex items-center justify-between px-6 flex-shrink-0"
      style={{
        height: '36px',
        background: 'rgba(2,11,20,0.95)',
        borderTop: '1px solid rgba(0,191,255,0.08)',
      }}
    >
      <span
        className="text-[9px] tracking-[0.2em] uppercase"
        style={{ color: 'rgba(255,255,255,0.2)', fontFamily: 'Rajdhani, sans-serif' }}
      >
        {JEFF_IDENTITY.tagline}
      </span>
      <span
        className="text-[9px] tracking-[0.15em] uppercase"
        style={{ color: 'rgba(0,191,255,0.3)', fontFamily: 'Rajdhani, sans-serif' }}
      >
        {JEFF_IDENTITY.subtitle}
      </span>
      <span
        className="text-[9px] tracking-[0.2em]"
        style={{ color: 'rgba(255,255,255,0.15)', fontFamily: 'Rajdhani, sans-serif' }}
      >
        ByJ
      </span>
    </footer>
  );
}
