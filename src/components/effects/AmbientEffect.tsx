import { useEffect, useRef } from 'react';
import type { PanelConfig } from '../../jeffConfig';

interface AmbientEffectProps {
  panel: PanelConfig;
}

export default function AmbientEffect({ panel }: AmbientEffectProps) {
  const effect = panel.ambientBehaviour.backgroundEffect;
  const palette = panel.ambientBehaviour.backgroundPalette;

  if (effect === 'matrix-digital-rain') return <MatrixRain palette={palette} />;
  if (effect === 'gold-scan-line-sweep') return <ScanLineSweep palette={palette} />;
  if (effect === 'rippling-water-caustics') return <WaterCaustics palette={palette} />;
  if (effect === 'rainbow-paint-splatter-loop') return <PaintSplatter />;
  if (effect === 'moss-particle-drift') return <ParticleDrift palette={palette} color="rgba(80,160,60,0.6)" />;
  if (effect === 'midnight-village-parallax') return <VillageParallax />;
  if (effect === 'warm-red-ember-particles') return <EmberParticles palette={palette} />;
  if (effect === 'floating-dust-particles-warm-lamp') return <DustParticles palette={palette} />;
  if (effect === 'gold-hex-grid-pulse') return <HexGrid palette={palette} />;
  return null;
}

// ── Matrix digital rain ──────────────────────────────────────

function MatrixRain({ palette }: { palette: readonly string[] }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();

    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノ';
    const fontSize = 11;
    const cols = Math.floor(canvas.width / fontSize);
    const drops: number[] = Array(cols).fill(1);

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 20, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#32CD32';
      ctx.font = `${fontSize}px JetBrains Mono, monospace`;
      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full opacity-50"
      style={{ background: palette[0] }}
    />
  );
}

// ── Gold scan line sweep ─────────────────────────────────────

function ScanLineSweep({ palette }: { palette: readonly string[] }) {
  return (
    <div className="absolute inset-0 overflow-hidden" style={{ background: `linear-gradient(180deg, ${palette[0]} 0%, ${palette[1] || palette[0]} 100%)` }}>
      <div
        className="absolute w-full h-0.5 opacity-40"
        style={{
          background: 'linear-gradient(90deg, transparent, #FFD700, transparent)',
          animation: 'scanLine 4s linear infinite',
          top: 0,
        }}
      />
      <div
        className="absolute w-full h-0.5 opacity-20"
        style={{
          background: 'linear-gradient(90deg, transparent, #FFD700, transparent)',
          animation: 'scanLine 4s linear infinite',
          top: 0,
          animationDelay: '2s',
        }}
      />
      {/* Horizontal scan lines overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,215,0,0.1) 2px, rgba(255,215,0,0.1) 3px)',
        }}
      />
    </div>
  );
}

// ── Rippling water caustics ──────────────────────────────────

function WaterCaustics({ palette }: { palette: readonly string[] }) {
  return (
    <div
      className="absolute inset-0"
      style={{ background: `linear-gradient(180deg, ${palette[0]} 0%, ${palette[1] || palette[0]} 100%)` }}
    >
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: `${60 + i * 30}%`,
            height: `${60 + i * 30}%`,
            top: `${10 + i * 5}%`,
            left: `${5 + i * 8}%`,
            border: '1px solid rgba(68,136,255,0.2)',
            animation: `causticShimmer ${3 + i * 0.7}s ease-in-out infinite`,
            animationDelay: `${i * 0.5}s`,
          }}
        />
      ))}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 30% 60%, rgba(0,51,255,0.15) 0%, transparent 60%)',
        }}
      />
    </div>
  );
}

// ── Rainbow paint splatter ───────────────────────────────────

function PaintSplatter() {
  const blobs = [
    { x: 20, y: 30, r: 30, color: 'rgba(255,0,255,0.3)' },
    { x: 70, y: 20, r: 25, color: 'rgba(255,69,0,0.25)' },
    { x: 50, y: 70, r: 35, color: 'rgba(0,51,255,0.25)' },
    { x: 85, y: 55, r: 20, color: 'rgba(50,205,50,0.25)' },
    { x: 15, y: 75, r: 28, color: 'rgba(255,215,0,0.25)' },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden" style={{ background: '#1A0020' }}>
      {blobs.map((b, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${b.x}%`,
            top: `${b.y}%`,
            width: `${b.r * 2}%`,
            height: `${b.r * 2}%`,
            background: b.color,
            filter: 'blur(20px)',
            animation: `splatterPulse ${2.5 + i * 0.4}s ease-in-out infinite`,
            animationDelay: `${i * 0.3}s`,
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}
    </div>
  );
}

// ── Generic particle drift ───────────────────────────────────

function ParticleDrift({ palette, color }: { palette: readonly string[]; color: string }) {
  return (
    <div
      className="absolute inset-0"
      style={{ background: `linear-gradient(180deg, ${palette[0]} 0%, ${palette[1] || palette[0]} 100%)` }}
    >
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: `${2 + Math.random() * 3}px`,
            height: `${2 + Math.random() * 3}px`,
            background: color,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `mossDrift ${8 + Math.random() * 6}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 4}s`,
          }}
        />
      ))}
    </div>
  );
}

// ── Midnight village parallax ────────────────────────────────

function VillageParallax() {
  return (
    <div className="absolute inset-0 overflow-hidden" style={{ background: '#020B14' }}>
      {/* Sky gradient */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(180deg, #020B14 0%, #041828 50%, #062030 100%)' }}
      />
      {/* Moonlight */}
      <div
        className="absolute"
        style={{
          top: '5%',
          right: '15%',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(200,220,255,0.8) 0%, rgba(150,190,255,0.3) 40%, transparent 70%)',
          filter: 'blur(2px)',
        }}
      />
      {/* Stars */}
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: '1px',
            height: '1px',
            background: 'white',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 40}%`,
            opacity: 0.4 + Math.random() * 0.6,
          }}
        />
      ))}
      {/* Lanterns */}
      {[20, 45, 70, 90].map((x, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            left: `${x}%`,
            top: '25%',
            animation: `lanternSway ${3 + i * 0.5}s ease-in-out infinite`,
            animationDelay: `${i * 0.7}s`,
            transformOrigin: 'top center',
          }}
        >
          <div
            style={{
              width: '8px',
              height: '12px',
              borderRadius: '3px',
              background: 'rgba(255,165,0,0.8)',
              boxShadow: '0 0 12px rgba(255,165,0,0.6), 0 0 25px rgba(255,140,0,0.3)',
            }}
          />
        </div>
      ))}
      {/* Koi pond reflection */}
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{
          height: '25%',
          background: 'linear-gradient(180deg, transparent 0%, rgba(0,191,255,0.08) 100%)',
        }}
      />
      {/* Fireflies */}
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: '3px',
            height: '3px',
            background: 'rgba(200,255,150,0.9)',
            boxShadow: '0 0 6px rgba(200,255,150,0.8)',
            left: `${20 + Math.random() * 60}%`,
            top: `${30 + Math.random() * 40}%`,
            animation: `fireflyFloat ${5 + Math.random() * 4}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        />
      ))}
    </div>
  );
}

// ── Ember particles ──────────────────────────────────────────

function EmberParticles({ palette }: { palette: readonly string[] }) {
  return (
    <div
      className="absolute inset-0"
      style={{ background: `linear-gradient(180deg, ${palette[0]} 0%, ${palette[1] || palette[0]} 100%)` }}
    >
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: `${2 + Math.random() * 4}px`,
            height: `${2 + Math.random() * 4}px`,
            background: i % 3 === 0 ? '#FF6347' : i % 3 === 1 ? '#FF4500' : '#FFD700',
            boxShadow: `0 0 4px ${i % 2 === 0 ? '#FF6347' : '#FF4500'}`,
            left: `${Math.random() * 100}%`,
            bottom: `${Math.random() * 30}%`,
            animation: `emberFloat ${3 + Math.random() * 3}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 3}s`,
          }}
        />
      ))}
    </div>
  );
}

// ── Dust particles warm lamp ─────────────────────────────────

function DustParticles({ palette }: { palette: readonly string[] }) {
  return (
    <div
      className="absolute inset-0"
      style={{ background: `linear-gradient(180deg, ${palette[0]} 0%, ${palette[1] || palette[0]} 100%)` }}
    >
      {/* Warm lamp glow */}
      <div
        className="absolute"
        style={{
          bottom: '20%',
          right: '15%',
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,180,60,0.25) 0%, transparent 70%)',
          filter: 'blur(15px)',
        }}
      />
      {[...Array(14)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: `${1 + Math.random() * 2}px`,
            height: `${1 + Math.random() * 2}px`,
            background: 'rgba(255,180,60,0.7)',
            left: `${Math.random() * 100}%`,
            top: `${20 + Math.random() * 60}%`,
            animation: `dustFloat ${7 + Math.random() * 5}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        />
      ))}
    </div>
  );
}

// ── Gold hex grid pulse ──────────────────────────────────────

function HexGrid({ palette }: { palette: readonly string[] }) {
  return (
    <div
      className="absolute inset-0"
      style={{ background: `linear-gradient(180deg, ${palette[0]} 0%, ${palette[1] || palette[0]} 100%)` }}
    >
      <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="hexPattern" x="0" y="0" width="30" height="26" patternUnits="userSpaceOnUse">
            <polygon
              points="15,1 29,8 29,22 15,29 1,22 1,8"
              fill="none"
              stroke="#C8960C"
              strokeWidth="0.8"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hexPattern)" />
      </svg>
      {/* Pulse overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, rgba(200,150,12,0.1) 0%, transparent 70%)',
          animation: 'hexPulse 3s ease-in-out infinite',
        }}
      />
    </div>
  );
}
