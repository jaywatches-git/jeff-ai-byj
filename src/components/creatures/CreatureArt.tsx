import type { PanelId } from '../../jeffConfig';

interface CreatureArtProps {
  panelId: PanelId;
  primaryColor: string;
  glowColor: string;
}

// All scenes use viewBox="0 0 250 300" (1:1.2) with xMidYMid slice
const SVG_PROPS = {
  viewBox: '0 0 250 300',
  xmlns: 'http://www.w3.org/2000/svg',
  style: { width: '100%', height: '100%' },
  preserveAspectRatio: 'xMidYMid slice',
} as const;

export default function CreatureArt({ panelId, primaryColor, glowColor }: CreatureArtProps) {
  switch (panelId) {
    case 'think-tank':       return <ThinkTankScene glow={glowColor} primary={primaryColor} />;
    case 'control-centre':   return <ControlCentreScene />;
    case 'designer-panda':   return <DesignerPandaScene />;
    case 'sebs-wisdom':      return <SebsWisdomScene />;
    case 'village-hall':     return <VillageHallScene />;
    case 'data-penguin':     return <DataPenguinScene />;
    case 'marketing-bear':   return <MarketingBearScene />;
    case 'librarian-quokka': return <LibrarianQuokkaScene />;
    case 'guardian-mastiff': return <GuardianMastiffScene />;
    default: return null;
  }
}

// ─────────────────────────────────────────────────────────────
// 1. THINK TANK — Bioluminescent jellyfish in a dark lab tank
// ─────────────────────────────────────────────────────────────
function ThinkTankScene({ glow, primary }: { glow: string; primary: string }) {
  return (
    <svg {...SVG_PROPS}>
      <defs>
        <radialGradient id="tt-tank-glow" cx="50%" cy="45%" r="40%">
          <stop offset="0%" stopColor="#4488FF" stopOpacity="0.5" />
          <stop offset="60%" stopColor="#0033FF" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#000820" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="tt-jelly-inner" cx="50%" cy="40%" r="50%">
          <stop offset="0%" stopColor="#88BBFF" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#0033FF" stopOpacity="0.4" />
        </radialGradient>
        <linearGradient id="tt-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#000510" />
          <stop offset="100%" stopColor="#000820" />
        </linearGradient>
        <filter id="tt-glow">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="tt-soft">
          <feGaussianBlur stdDeviation="2" />
        </filter>
      </defs>

      {/* Dark lab room */}
      <rect width="250" height="300" fill="url(#tt-bg)" />

      {/* Lab wall details */}
      <rect x="0" y="0" width="60" height="300" fill="rgba(0,5,20,0.6)" />
      <rect x="190" y="0" width="60" height="300" fill="rgba(0,5,20,0.6)" />
      {/* Shelving/equipment silhouettes on walls */}
      <rect x="5" y="40" width="45" height="6" rx="1" fill="rgba(20,40,80,0.5)" />
      <rect x="5" y="55" width="30" height="4" rx="1" fill="rgba(20,40,80,0.4)" />
      <rect x="200" y="35" width="45" height="6" rx="1" fill="rgba(20,40,80,0.5)" />
      <rect x="210" y="50" width="35" height="4" rx="1" fill="rgba(20,40,80,0.4)" />
      {/* Small indicator lights */}
      <circle cx="15" cy="20" r="2" fill="#0066FF" opacity="0.8" />
      <circle cx="22" cy="20" r="2" fill="#00CCFF" opacity="0.6" />
      <circle cx="235" cy="22" r="2" fill="#0044FF" opacity="0.7" />

      {/* Floor reflection */}
      <rect x="0" y="260" width="250" height="40" fill="rgba(0,10,30,0.8)" />
      <rect x="55" y="262" width="140" height="1" fill="rgba(68,136,255,0.15)" />

      {/* Tank body — cylindrical glass */}
      <rect x="55" y="20" width="140" height="250" rx="12"
        fill="rgba(5,15,50,0.7)"
        stroke="rgba(68,136,255,0.35)"
        strokeWidth="2"
      />
      {/* Tank glass sheen */}
      <rect x="57" y="22" width="18" height="246" rx="6"
        fill="rgba(100,160,255,0.06)"
      />
      {/* Tank rim top & bottom */}
      <rect x="50" y="16" width="150" height="10" rx="4" fill="rgba(40,60,120,0.6)" stroke="rgba(68,136,255,0.4)" strokeWidth="1" />
      <rect x="50" y="274" width="150" height="10" rx="4" fill="rgba(40,60,120,0.6)" stroke="rgba(68,136,255,0.4)" strokeWidth="1" />

      {/* Tank inner glow */}
      <rect x="57" y="26" width="136" height="246" rx="8" fill="url(#tt-tank-glow)" />

      {/* Holographic data streams rising */}
      {[80, 100, 125, 150, 175].map((x, i) => (
        <rect key={i} x={x - 0.5} y={50 + i * 15} width="1" height={40 + i * 5}
          fill="rgba(68,136,255,0.3)" rx="0.5">
          <animate attributeName="y" values={`${50 + i * 15};${20 + i * 10};${50 + i * 15}`}
            dur={`${3 + i * 0.4}s`} repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.3;0.7;0.3" dur={`${3 + i * 0.4}s`} repeatCount="indefinite" />
        </rect>
      ))}

      {/* ── JELLYFISH — breathing animation group ── */}
      <g style={{ transformOrigin: '125px 140px', animation: 'creatureBreathe 4s ease-in-out infinite' }}>
        {/* Bell outer glow */}
        <ellipse cx="125" cy="130" rx="55" ry="42" fill="rgba(68,136,255,0.15)" filter="url(#tt-soft)" />

        {/* Bell main */}
        <ellipse cx="125" cy="128" rx="48" ry="38" fill="url(#tt-jelly-inner)" />

        {/* Bell inner detail */}
        <ellipse cx="125" cy="124" rx="34" ry="25" fill="rgba(136,187,255,0.3)" />
        <ellipse cx="125" cy="120" rx="20" ry="14" fill="rgba(200,220,255,0.25)" />

        {/* Radial ribs on bell */}
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => {
          const rad = (angle * Math.PI) / 180;
          return (
            <line key={i}
              x1="125" y1="128"
              x2={125 + Math.cos(rad) * 46} y2={128 + Math.sin(rad) * 36}
              stroke="rgba(100,160,255,0.15)" strokeWidth="1"
            />
          );
        })}

        {/* Core bioluminescent orb */}
        <circle cx="125" cy="122" r="12" fill="rgba(140,190,255,0.6)" filter="url(#tt-glow)" />
        <circle cx="125" cy="122" r="7" fill="rgba(200,230,255,0.9)" />

        {/* Tentacles drifting */}
        {[-36,-22,-10,0,10,22,36].map((xOff, i) => (
          <path key={i}
            d={`M${125 + xOff},166 Q${125 + xOff + (i % 2 === 0 ? 12 : -12)},${195 + i * 6} ${125 + xOff + (i % 2 === 0 ? 6 : -6)},${220 + i * 4}`}
            fill="none" stroke="rgba(100,160,255,0.55)" strokeWidth="1.5" strokeLinecap="round"
          >
            <animateTransform attributeName="transform" type="translate"
              values={`0,0; ${i % 2 === 0 ? 4 : -4},2; 0,0`}
              dur={`${2.5 + i * 0.3}s`} repeatCount="indefinite" />
          </path>
        ))}

        {/* Oral arms (thicker inner) */}
        {[-16, 0, 16].map((xOff, i) => (
          <path key={i}
            d={`M${125 + xOff},166 Q${125 + xOff + (i - 1) * 8},200 ${125 + xOff + (i - 1) * 4},235`}
            fill="none" stroke="rgba(136,187,255,0.4)" strokeWidth="2.5" strokeLinecap="round"
          />
        ))}
      </g>

      {/* Caustic light patterns on tank glass */}
      {[70, 100, 155, 185].map((x, i) => (
        <ellipse key={i} cx={x} cy={80 + i * 40} rx="8" ry="4" fill="rgba(68,136,255,0.1)">
          <animate attributeName="opacity" values="0.1;0.3;0.1" dur={`${2 + i * 0.6}s`} repeatCount="indefinite" />
        </ellipse>
      ))}

      {/* Eyelid (blink) effect — briefly dims the core */}
      <ellipse cx="125" cy="122" rx="7" ry="7" fill="rgba(5,15,50,0)">
        <animate attributeName="fill-opacity" values="0;0;0;0;0;0;0;0;0;0.9;0;0" dur="8s" repeatCount="indefinite" />
      </ellipse>
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────
// 2. CONTROL CENTRE — Jay at battlestation, over-the-shoulder
// ─────────────────────────────────────────────────────────────
function ControlCentreScene() {
  return (
    <svg {...SVG_PROPS}>
      <defs>
        <radialGradient id="cc-screen-glow" cx="50%" cy="30%" r="55%">
          <stop offset="0%" stopColor="#FFB300" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#080600" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="cc-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#080600" />
          <stop offset="100%" stopColor="#050400" />
        </linearGradient>
        <filter id="cc-glow">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="cc-soft">
          <feGaussianBlur stdDeviation="3" />
        </filter>
      </defs>

      {/* Dark room */}
      <rect width="250" height="300" fill="url(#cc-bg)" />

      {/* Ambient monitor glow spread */}
      <rect width="250" height="300" fill="url(#cc-screen-glow)" />

      {/* ── MONITORS ── */}
      {/* Left monitor */}
      <rect x="8" y="30" width="88" height="62" rx="3" fill="#080500" stroke="rgba(180,120,0,0.5)" strokeWidth="1.5" />
      <rect x="10" y="32" width="84" height="58" rx="2" fill="rgba(255,160,0,0.1)" />
      {/* Left monitor content */}
      <rect x="14" y="38" width="60" height="2" rx="1" fill="rgba(255,200,0,0.5)" />
      <rect x="14" y="44" width="45" height="1.5" rx="0.5" fill="rgba(255,180,0,0.35)" />
      <rect x="14" y="49" width="52" height="1.5" rx="0.5" fill="rgba(255,180,0,0.3)" />
      <rect x="14" y="54" width="38" height="1.5" rx="0.5" fill="rgba(255,180,0,0.25)" />
      {/* Waveform graphic */}
      <polyline points="14,74 22,65 28,74 35,60 42,75 50,67 58,73 66,62 74,70 80,65 88,71"
        fill="none" stroke="rgba(255,215,0,0.5)" strokeWidth="1.2" />

      {/* Centre monitor (largest, main) */}
      <rect x="100" y="18" width="108" height="76" rx="3" fill="#080500" stroke="rgba(200,140,0,0.7)" strokeWidth="2" />
      <rect x="102" y="20" width="104" height="72" rx="2" fill="rgba(255,160,0,0.14)" />
      {/* Main monitor content — code editor feel */}
      {[28, 34, 40, 46, 52, 58, 64, 70, 76, 82].map((y, i) => (
        <rect key={i} x={106 + (i % 3) * 2} y={y} width={35 + (i * 7) % 50} height="2" rx="0.5"
          fill={i % 4 === 0 ? 'rgba(255,215,0,0.5)' : 'rgba(255,165,0,0.3)'} />
      ))}
      <rect x="106" y="28" width="22" height="2" rx="0.5" fill="rgba(255,220,100,0.7)" />

      {/* Monitor scan-line pulse */}
      <rect x="100" y="18" width="108" height="2" fill="rgba(255,180,0,0.3)" opacity="0.5">
        <animate attributeName="y" values="18;90;18" dur="3s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.5;0;0.5" dur="3s" repeatCount="indefinite" />
      </rect>

      {/* ── JAY'S SILHOUETTE — breathing group ── */}
      <g style={{ transformOrigin: '125px 200px', animation: 'creatureBreathe 5s ease-in-out infinite' }}>
        {/* Chair back */}
        <path d="M70,105 Q72,90 78,78 Q86,65 125,62 Q164,65 172,78 Q178,90 180,105 L180,300 L70,300 Z"
          fill="#0a0700" />
        <path d="M72,107 Q74,92 80,80 Q88,67 125,64 Q162,67 170,80 Q176,92 178,107 L175,115 L75,115 Z"
          fill="rgba(50,35,0,0.4)" />

        {/* Shoulders — wide, close */}
        <path d="M40,165 Q52,140 80,132 Q102,126 125,125 Q148,126 170,132 Q198,140 210,165 L215,300 L35,300 Z"
          fill="#0d0900" />

        {/* Arm/sleeve left */}
        <path d="M40,165 Q30,190 32,220 Q34,240 40,250 L55,250 Q50,235 52,210 L60,175 Z"
          fill="#0a0700" />
        {/* Arm/sleeve right */}
        <path d="M210,165 Q220,190 218,220 Q216,240 210,250 L195,250 Q200,235 198,210 L190,175 Z"
          fill="#0a0700" />

        {/* Hands on keyboard glow */}
        <ellipse cx="75" cy="252" rx="18" ry="7" fill="rgba(255,150,0,0.15)" />
        <ellipse cx="175" cy="252" rx="18" ry="7" fill="rgba(255,150,0,0.15)" />

        {/* Neck */}
        <rect x="108" y="104" width="34" height="28" rx="4" fill="#2a1a00" />
        {/* Neck highlight from screen */}
        <rect x="110" y="105" width="12" height="22" rx="2" fill="rgba(255,160,0,0.12)" />

        {/* Head */}
        <ellipse cx="125" cy="85" rx="36" ry="34" fill="#2a1a00" />
        {/* Screen glow on jaw/face side */}
        <ellipse cx="113" cy="90" rx="20" ry="18" fill="rgba(255,150,0,0.18)" />

        {/* ── CURLY HAIR ── */}
        {/* Bulk of hair — dark, flowing */}
        <ellipse cx="125" cy="72" rx="38" ry="30" fill="#1a0f00" />
        {/* Curly texture — clusters of circles */}
        {[
          [88, 68, 10], [98, 62, 9], [110, 58, 10], [122, 56, 9], [134, 58, 10],
          [145, 62, 9], [155, 68, 10], [160, 78, 8], [84, 78, 9], [92, 82, 8],
          [152, 80, 8], [104, 60, 7], [128, 57, 7], [140, 65, 8],
        ].map(([cx, cy, r], i) => (
          <circle key={i} cx={cx} cy={cy} r={r} fill="#1c1000" />
        ))}
        {/* Hair body fill */}
        <ellipse cx="125" cy="78" rx="36" ry="26" fill="#1a0f00" />

        {/* ── CAP ── */}
        {/* Cap body */}
        <ellipse cx="125" cy="58" rx="38" ry="14" fill="#111111" />
        <rect x="87" y="50" width="76" height="16" rx="5" fill="#111111" />
        {/* Red under-rim stripe */}
        <rect x="87" y="60" width="76" height="4" rx="1" fill="#CC0000" />
        {/* Brim — pointing backward */}
        <path d="M163,54 Q185,52 190,58 Q185,64 163,62 Z" fill="#0d0d0d" />
        {/* Skull on cap panel */}
        <ellipse cx="112" cy="54" rx="6" ry="5" fill="rgba(240,240,240,0.7)" />
        <ellipse cx="112" cy="54" rx="4" ry="3" fill="#111" />
        <circle cx="110" cy="53" r="1.2" fill="rgba(240,240,240,0.7)" />
        <circle cx="114" cy="53" r="1.2" fill="rgba(240,240,240,0.7)" />
        <rect x="110" y="56" width="4" height="2" rx="0.5" fill="rgba(240,240,240,0.7)" />
      </g>

      {/* Keyboard */}
      <rect x="60" y="244" width="130" height="16" rx="3" fill="rgba(20,15,0,0.9)" stroke="rgba(120,80,0,0.4)" strokeWidth="1" />
      {/* Key rows */}
      {[0, 1, 2].map(row => (
        Array.from({ length: 12 - row }, (_, k) => (
          <rect key={`${row}-${k}`} x={64 + k * 9.5 + row * 4.5} y={247 + row * 4} width="8" height="3"
            rx="0.5" fill="rgba(60,40,0,0.7)" />
        ))
      ))}

      {/* Desk surface */}
      <rect x="0" y="258" width="250" height="6" rx="1" fill="rgba(30,20,0,0.9)" stroke="rgba(80,50,0,0.4)" strokeWidth="0.5" />

      {/* RGB strip at desk edge — subtle amber */}
      <rect x="0" y="262" width="250" height="2" fill="rgba(255,160,0,0.2)" />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────
// 3. DESIGNER PANDA — Close-up at colourful studio easel
// ─────────────────────────────────────────────────────────────
function DesignerPandaScene() {
  return (
    <svg {...SVG_PROPS}>
      <defs>
        <radialGradient id="dp-warm" cx="60%" cy="40%" r="55%">
          <stop offset="0%" stopColor="#FF66BB" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#1A0020" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="dp-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#120018" />
          <stop offset="100%" stopColor="#1A0025" />
        </linearGradient>
        <filter id="dp-soft"><feGaussianBlur stdDeviation="3" /></filter>
      </defs>

      <rect width="250" height="300" fill="url(#dp-bg)" />
      <rect width="250" height="300" fill="url(#dp-warm)" />

      {/* Paint splatters on wall/floor */}
      {[
        [30, 40, 18, '#FF00FF', 0.3], [200, 60, 14, '#FF4500', 0.25],
        [220, 150, 20, '#0033FF', 0.2], [15, 180, 16, '#32CD32', 0.2],
        [170, 30, 12, '#FFD700', 0.25], [40, 250, 22, '#FF00FF', 0.15],
      ].map(([x, y, r, c, o], i) => (
        <ellipse key={i} cx={x as number} cy={y as number} rx={r as number} ry={(r as number) * 0.65}
          fill={c as string} opacity={o as number} filter="url(#dp-soft)"
          transform={`rotate(${i * 23}, ${x}, ${y})`} />
      ))}

      {/* Easel */}
      <line x1="165" y1="50" x2="140" y2="260" stroke="rgba(255,255,255,0.2)" strokeWidth="3" />
      <line x1="200" y1="50" x2="220" y2="260" stroke="rgba(255,255,255,0.2)" strokeWidth="3" />
      <line x1="165" y1="130" x2="200" y2="130" stroke="rgba(255,255,255,0.15)" strokeWidth="2" />

      {/* Canvas on easel */}
      <rect x="142" y="50" width="72" height="85" rx="2" fill="#0d0015" stroke="rgba(255,100,255,0.4)" strokeWidth="1.5" />
      {/* Abstract painting on canvas */}
      <rect x="144" y="52" width="68" height="81" rx="1" fill="rgba(80,0,100,0.6)" />
      <ellipse cx="178" cy="85" rx="20" ry="18" fill="rgba(255,0,255,0.35)" />
      <ellipse cx="165" cy="100" rx="14" ry="10" fill="rgba(255,100,0,0.3)" />
      <ellipse cx="192" cy="98" rx="12" ry="14" fill="rgba(0,150,255,0.3)" />
      <ellipse cx="178" cy="115" rx="18" ry="8" fill="rgba(255,215,0,0.25)" />
      {/* Canvas highlight */}
      <rect x="142" y="50" width="20" height="85" rx="1" fill="rgba(255,255,255,0.04)" />

      {/* Colour palette/tray */}
      <ellipse cx="135" cy="220" rx="30" ry="16" fill="rgba(30,5,40,0.8)" stroke="rgba(255,100,255,0.2)" strokeWidth="1" />
      {['#FF0080', '#FF4500', '#FFD700', '#32CD32', '#0088FF', '#CC00FF'].map((c, i) => (
        <circle key={i} cx={112 + i * 9} cy={220} r="4" fill={c} opacity="0.7" />
      ))}

      {/* ── PANDA — breathing group, fills lower 75% ── */}
      <g style={{ transformOrigin: '100px 200px', animation: 'creatureBreathe 3.8s ease-in-out infinite' }}>
        {/* Body */}
        <ellipse cx="100" cy="245" rx="65" ry="55" fill="#EEEEEE" />
        {/* Paint splatters on body */}
        <circle cx="85" cy="235" r="5" fill="rgba(255,0,255,0.5)" />
        <circle cx="115" cy="250" r="4" fill="rgba(0,100,255,0.4)" />
        <circle cx="75" cy="255" r="3" fill="rgba(255,150,0,0.5)" />
        <circle cx="125" cy="238" r="3" fill="rgba(50,205,50,0.4)" />

        {/* Arm left — raised with paintbrush */}
        <ellipse cx="42" cy="195" rx="20" ry="36" fill="#EEEEEE" transform="rotate(-30, 42, 195)" />
        {/* Arm right */}
        <ellipse cx="158" cy="205" rx="18" ry="32" fill="#EEEEEE" transform="rotate(20, 158, 205)" />

        {/* Paintbrush in left paw */}
        <rect x="10" y="120" width="4" height="55" rx="2" fill="rgba(180,120,50,0.9)" transform="rotate(25, 12, 145)" />
        <ellipse cx="9" cy="120" rx="4" ry="6" fill="rgba(255,0,255,0.8)" transform="rotate(25, 9, 120)" />

        {/* HEAD — large, close, filling upper portion */}
        <circle cx="100" cy="145" r="72" fill="#EEEEEE" />

        {/* Ear fluffs */}
        <circle cx="38" cy="85" r="22" fill="#111111" />
        <circle cx="38" cy="85" r="12" fill="#1a1a1a" />
        <circle cx="162" cy="85" r="22" fill="#111111" />
        <circle cx="162" cy="85" r="12" fill="#1a1a1a" />

        {/* Eye patches */}
        <ellipse cx="78" cy="138" rx="24" ry="22" fill="#111111" transform="rotate(-10, 78, 138)" />
        <ellipse cx="122" cy="138" rx="24" ry="22" fill="#111111" transform="rotate(10, 122, 138)" />

        {/* Eyes */}
        <circle cx="78" cy="138" r="12" fill="#EEEEEE" />
        <circle cx="122" cy="138" r="12" fill="#EEEEEE" />
        {/* Irises */}
        <circle cx="79" cy="138" r="8" fill="#1a0025" />
        <circle cx="123" cy="138" r="8" fill="#1a0025" />
        {/* Pupils */}
        <circle cx="80" cy="138" r="5" fill="#080010" />
        <circle cx="124" cy="138" r="5" fill="#080010" />
        {/* Eye shine */}
        <circle cx="82" cy="135" r="2.5" fill="rgba(255,255,255,0.9)" />
        <circle cx="126" cy="135" r="2.5" fill="rgba(255,255,255,0.9)" />

        {/* Eyelids for blink */}
        <ellipse cx="78" cy="138" rx="12" ry="0" fill="#111">
          <animate attributeName="ry" values="0;0;0;0;0;0;0;12;0;0;0" dur="7s" repeatCount="indefinite" />
        </ellipse>
        <ellipse cx="122" cy="138" rx="12" ry="0" fill="#111">
          <animate attributeName="ry" values="0;0;0;0;0;0;0;12;0;0;0" dur="7s" repeatCount="indefinite" />
        </ellipse>

        {/* Nose */}
        <ellipse cx="100" cy="160" rx="10" ry="7" fill="#222" />
        <ellipse cx="100" cy="158" rx="6" ry="4" fill="#333" />

        {/* Mouth — big happy smile */}
        <path d="M84,172 Q100,186 116,172" fill="none" stroke="#333" strokeWidth="3" strokeLinecap="round" />

        {/* Cheek blushes */}
        <ellipse cx="60" cy="170" rx="14" ry="8" fill="rgba(255,100,180,0.3)" />
        <ellipse cx="140" cy="170" rx="14" ry="8" fill="rgba(255,100,180,0.3)" />

        {/* Paint on face */}
        <circle cx="65" cy="145" r="4" fill="rgba(255,0,255,0.45)" />
        <circle cx="140" cy="155" r="3" fill="rgba(50,205,50,0.4)" />
        <circle cx="110" cy="132" r="2.5" fill="rgba(255,150,0,0.5)" />
      </g>
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────
// 4. SEB'S WISDOM — Hermann tortoise, warm terrarium close-up
// ─────────────────────────────────────────────────────────────
function SebsWisdomScene() {
  return (
    <svg {...SVG_PROPS}>
      <defs>
        <radialGradient id="sw-lamp" cx="75%" cy="65%" r="50%">
          <stop offset="0%" stopColor="#FF9D3A" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#0D0A00" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="sw-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0D0A00" />
          <stop offset="100%" stopColor="#101400" />
        </linearGradient>
        <filter id="sw-soft"><feGaussianBlur stdDeviation="2.5" /></filter>
      </defs>

      <rect width="250" height="300" fill="url(#sw-bg)" />
      <rect width="250" height="300" fill="url(#sw-lamp)" />

      {/* Terrarium wall — glass edge */}
      <rect x="0" y="0" width="4" height="300" fill="rgba(120,150,100,0.15)" />
      <rect x="246" y="0" width="4" height="300" fill="rgba(120,150,100,0.1)" />

      {/* Background plants — far layer */}
      {[20, 60, 185, 220].map((x, i) => (
        <ellipse key={i} cx={x} cy={80 + i * 15} rx={22 + i * 3} ry={55 + i * 8}
          fill={`rgba(${25 + i * 5},${50 + i * 8},${10 + i * 3},0.5)`} filter="url(#sw-soft)" />
      ))}

      {/* Moss ground */}
      <ellipse cx="125" cy="285" rx="130" ry="30" fill="rgba(30,50,10,0.8)" />
      <ellipse cx="125" cy="278" rx="120" ry="22" fill="rgba(40,65,15,0.7)" />

      {/* Rocks — background */}
      <ellipse cx="30" cy="220" rx="28" ry="18" fill="rgba(60,50,20,0.7)" />
      <ellipse cx="215" cy="230" rx="22" ry="14" fill="rgba(55,45,18,0.6)" />

      {/* Main mossy rock */}
      <ellipse cx="125" cy="240" rx="85" ry="40" fill="#2a2000" />
      <ellipse cx="125" cy="234" rx="78" ry="32" fill="#332700" />
      {/* Moss on rock */}
      {[75, 100, 125, 150, 170].map((x, i) => (
        <ellipse key={i} cx={x} cy={225 + (i % 2) * 4} rx={16 + i * 2} ry="6"
          fill={`rgba(${40 + i * 5},${70 + i * 8},${15 + i * 3},0.6)`} />
      ))}

      {/* ── TORTOISE — large, fills frame from center ── */}
      <g style={{ transformOrigin: '125px 200px', animation: 'creatureBreathe 5s ease-in-out infinite' }}>
        {/* Shell — large, close */}
        <ellipse cx="125" cy="205" rx="82" ry="58" fill="#7a5c20" />
        <ellipse cx="125" cy="200" rx="76" ry="52" fill="#8B6914" />

        {/* Shell scutes — top pattern */}
        <polygon points="125,153 153,170 148,198 125,208 102,198 97,170"
          fill="rgba(0,0,0,0.2)" stroke="rgba(0,0,0,0.25)" strokeWidth="1.5" />
        {/* Side scutes */}
        {[
          [155, 175, 30, 24], [90, 175, 30, 24],
          [168, 205, 22, 18], [77, 205, 22, 18],
          [155, 225, 26, 18], [90, 225, 26, 18],
        ].map(([cx, cy, rx, ry], i) => (
          <ellipse key={i} cx={cx} cy={cy} rx={rx} ry={ry}
            fill="rgba(0,0,0,0.15)" stroke="rgba(0,0,0,0.2)" strokeWidth="1" />
        ))}
        {/* Shell highlight */}
        <ellipse cx="105" cy="170" rx="25" ry="14" fill="rgba(200,180,80,0.12)" transform="rotate(-10,105,170)" />

        {/* Head — large, close, coming towards viewer */}
        <ellipse cx="125" cy="140" rx="38" ry="32" fill="#9B7940" />
        {/* Head detail */}
        <ellipse cx="115" cy="138" rx="20" ry="16" fill="rgba(255,160,60,0.12)" />
        {/* Neck scales pattern */}
        {[110, 120, 130, 140].map((x, i) => (
          <ellipse key={i} cx={x} cy={162 + (i % 2) * 3} rx="6" ry="4" fill="rgba(0,0,0,0.1)" />
        ))}

        {/* Eyes — wise, calm */}
        <circle cx="105" cy="132" r="10" fill="#1a0f00" />
        <circle cx="145" cy="132" r="10" fill="#1a0f00" />
        {/* Iris */}
        <circle cx="105" cy="132" r="6.5" fill="#3d2200" />
        <circle cx="145" cy="132" r="6.5" fill="#3d2200" />
        {/* Pupil */}
        <ellipse cx="105" cy="132" rx="3" ry="5" fill="#0a0500" />
        <ellipse cx="145" cy="132" rx="3" ry="5" fill="#0a0500" />
        {/* Eye shine */}
        <circle cx="107" cy="129" r="2.5" fill="rgba(255,220,150,0.7)" />
        <circle cx="147" cy="129" r="2.5" fill="rgba(255,220,150,0.7)" />

        {/* Blink eyelids */}
        <circle cx="105" cy="132" r="10" fill="#9B7940" opacity="0">
          <animate attributeName="opacity" values="0;0;0;0;0;0;0;0;0;1;0;0" dur="9s" repeatCount="indefinite" />
        </circle>
        <circle cx="145" cy="132" r="10" fill="#9B7940" opacity="0">
          <animate attributeName="opacity" values="0;0;0;0;0;0;0;0;0;1;0;0" dur="9s" repeatCount="indefinite" />
        </circle>

        {/* Nose */}
        <circle cx="118" cy="148" r="3" fill="rgba(0,0,0,0.4)" />
        <circle cx="132" cy="148" r="3" fill="rgba(0,0,0,0.4)" />

        {/* Mouth — slight upward curve, unbothered */}
        <path d="M112,156 Q125,162 138,156" fill="none" stroke="rgba(0,0,0,0.3)" strokeWidth="1.5" strokeLinecap="round" />

        {/* Front leg */}
        <ellipse cx="65" cy="245" rx="20" ry="12" fill="#9B7940" transform="rotate(-15,65,245)" />
        <ellipse cx="185" cy="245" rx="20" ry="12" fill="#9B7940" transform="rotate(15,185,245)" />
        {/* Claws */}
        {[-6, -2, 2, 6].map((d, i) => (
          <line key={i} x1={55 + d} y1="253" x2={53 + d} y2="260"
            stroke="rgba(60,40,10,0.6)" strokeWidth="1.5" strokeLinecap="round" />
        ))}
      </g>

      {/* Open book on rock — lower right */}
      <g transform="translate(168, 210) rotate(-8)">
        <path d="M0,0 Q20,-5 40,0 L40,28 Q20,22 0,28 Z" fill="#2a1500" stroke="rgba(180,130,20,0.4)" strokeWidth="1" />
        <path d="M0,0 Q-20,-5 -40,0 L-40,28 Q-20,22 0,28 Z" fill="#241200" stroke="rgba(180,130,20,0.3)" strokeWidth="1" />
        {/* Text lines */}
        {[6, 10, 14, 18, 22].map((y, i) => (
          <line key={i} x1={4} y1={y} x2={34} y2={y} stroke="rgba(200,160,60,0.3)" strokeWidth="0.8" />
        ))}
      </g>

      {/* Small lantern — warm glow source */}
      <g transform="translate(195, 175)">
        <rect x="-8" y="0" width="16" height="22" rx="4" fill="rgba(255,150,30,0.8)" />
        <rect x="-6" y="2" width="12" height="6" rx="1" fill="rgba(255,220,100,0.5)" />
        <line x1="0" y1="-15" x2="0" y2="0" stroke="rgba(150,100,30,0.5)" strokeWidth="1" />
        <circle cx="0" cy="11" r="10" fill="rgba(255,150,30,0.12)" />
      </g>
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────
// 5. VILLAGE HALL — Midnight Japanese village, no creature
// ─────────────────────────────────────────────────────────────
function VillageHallScene() {
  return (
    <svg {...SVG_PROPS}>
      <defs>
        <linearGradient id="vh-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#010810" />
          <stop offset="55%" stopColor="#021220" />
          <stop offset="100%" stopColor="#041828" />
        </linearGradient>
        <radialGradient id="vh-moon" cx="75%" cy="12%" r="15%">
          <stop offset="0%" stopColor="rgba(220,235,255,0.7)" />
          <stop offset="50%" stopColor="rgba(180,210,255,0.15)" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <radialGradient id="vh-pond" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(0,180,255,0.2)" />
          <stop offset="100%" stopColor="rgba(0,80,120,0.08)" />
        </radialGradient>
        <filter id="vh-soft"><feGaussianBlur stdDeviation="2" /></filter>
        <filter id="vh-glow"><feGaussianBlur stdDeviation="4" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
      </defs>

      {/* Sky */}
      <rect width="250" height="300" fill="url(#vh-sky)" />
      {/* Moon glow */}
      <rect width="250" height="300" fill="url(#vh-moon)" />

      {/* Moon */}
      <circle cx="188" cy="28" r="18" fill="rgba(230,240,255,0.55)" />
      <circle cx="194" cy="24" r="14" fill="rgba(10,20,40,0.9)" />

      {/* Stars */}
      {[
        [20,15],[45,8],[70,20],[95,6],[130,12],[155,22],[25,35],[55,30],
        [170,15],[200,32],[222,10],[238,25],[12,45],[82,38],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i % 3 === 0 ? 1.2 : 0.8}
          fill="rgba(255,255,255,0.7)" opacity={0.4 + (i % 4) * 0.15} />
      ))}

      {/* Far mountains/trees silhouette */}
      <path d="M0,120 Q30,80 60,95 Q90,75 120,90 Q150,70 180,88 Q210,72 250,92 L250,150 L0,150 Z"
        fill="rgba(5,15,30,0.7)" />

      {/* Mid-distance pagoda silhouette */}
      {/* Far pagoda */}
      <path d="M40,98 L75,82 L110,98 Z" fill="rgba(8,18,35,0.85)" />
      <rect x="55" y="98" width="30" height="40" fill="rgba(8,18,35,0.85)" />
      <path d="M45,110 L75,96 L105,110 Z" fill="rgba(8,18,35,0.85)" />
      <path d="M50,122 L75,110 L100,122 Z" fill="rgba(8,18,35,0.85)" />
      {/* Far pagoda windows (amber) */}
      <rect x="62" y="107" width="10" height="12" rx="1" fill="rgba(255,140,0,0.35)" />
      <rect x="78" y="107" width="10" height="12" rx="1" fill="rgba(255,140,0,0.3)" />

      {/* ── MAIN VILLAGE HALL ── */}
      {/* Roof tiers */}
      <path d="M35,162 L125,132 L215,162 Z" fill="#0d0800" stroke="rgba(0,191,255,0.25)" strokeWidth="1" />
      <path d="M20,180 L125,148 L230,180 Z" fill="#110a00" stroke="rgba(0,191,255,0.2)" strokeWidth="1" />
      <path d="M10,200 L125,164 L240,200 Z" fill="#140c00" stroke="rgba(0,191,255,0.18)" strokeWidth="1" />
      {/* Roof finials */}
      <path d="M35,162 Q30,155 35,148 Q38,158 35,162 Z" fill="#0d0800" />
      <path d="M215,162 Q220,155 215,148 Q212,158 215,162 Z" fill="#0d0800" />
      {/* Roof ridge ornaments */}
      <rect x="121" y="128" width="8" height="14" rx="1" fill="rgba(0,191,255,0.3)" />
      <circle cx="125" cy="128" r="4" fill="rgba(0,191,255,0.4)" />

      {/* Hall body */}
      <rect x="30" y="200" width="190" height="70" fill="#0a0700" stroke="rgba(0,191,255,0.15)" strokeWidth="1" />

      {/* Columns */}
      {[50, 90, 130, 170, 210].map(x => (
        <rect key={x} x={x - 4} y="200" width="8" height="70" rx="2"
          fill="rgba(20,15,0,0.8)" stroke="rgba(100,70,0,0.2)" strokeWidth="0.5" />
      ))}

      {/* Windows with amber glow */}
      {[45, 90, 145, 190].map((x, i) => (
        <g key={i}>
          <rect x={x} y="212" width="24" height="30" rx="2" fill={`rgba(255,${140 + i * 10},0,${0.3 + i * 0.04})`} />
          <rect x={x + 2} y="214" width="10" height="26" rx="1" fill="rgba(255,180,0,0.15)" />
          <rect x={x + 14} y="214" width="8" height="26" rx="1" fill="rgba(255,160,0,0.1)" />
        </g>
      ))}

      {/* Main door */}
      <path d="M108,268 Q125,255 142,268 L142,270 L108,270 Z" fill="#080500" stroke="rgba(0,191,255,0.3)" strokeWidth="1" />
      <rect x="108" y="248" width="34" height="22" fill="#080500" stroke="rgba(0,191,255,0.2)" strokeWidth="1" />
      <circle cx="125" cy="259" r="2" fill="rgba(255,180,0,0.5)" />

      {/* ── LANTERNS — swaying ── */}
      {[55, 90, 160, 200].map((x, i) => (
        <g key={i}
          style={{
            transformOrigin: `${x}px 200px`,
            animation: `lanternSway ${3.5 + i * 0.4}s ease-in-out infinite`,
            animationDelay: `${i * 0.6}s`,
          }}
        >
          <line x1={x} y1="198" x2={x} y2="210" stroke="rgba(255,150,50,0.4)" strokeWidth="1" />
          <rect x={x - 7} y="210" width="14" height="18" rx="3" fill="rgba(255,130,0,0.85)" />
          <rect x={x - 5} y="213" width="10" height="6" rx="1" fill="rgba(255,220,100,0.4)" />
          <rect x={x - 7} y="226" width="14" height="2" rx="1" fill="rgba(255,130,0,0.5)" />
          {/* Lantern glow */}
          <circle cx={x} cy="219" r="15" fill={`rgba(255,130,0,0.06)`} filter="url(#vh-soft)" />
        </g>
      ))}

      {/* ── KOI POND — foreground ── */}
      <ellipse cx="125" cy="282" rx="105" ry="22" fill="rgba(0,40,80,0.6)" />
      <ellipse cx="125" cy="281" rx="100" ry="19" fill="url(#vh-pond)" />
      {/* Moon reflection */}
      <ellipse cx="165" cy="279" rx="10" ry="4" fill="rgba(220,235,255,0.25)">
        <animate attributeName="ry" values="4;6;4" dur="3s" repeatCount="indefinite" />
      </ellipse>
      {/* Lantern reflections in pond */}
      {[55, 90, 160, 200].map((x, i) => (
        <ellipse key={i} cx={x} cy={280 + i * 0.5} rx="3" ry="6"
          fill="rgba(255,130,0,0.2)">
          <animate attributeName="ry" values="6;10;6" dur={`${2.5 + i * 0.3}s`} repeatCount="indefinite" />
        </ellipse>
      ))}
      {/* Koi fish */}
      <ellipse cx="90" cy="280" rx="18" ry="6" fill="rgba(255,80,0,0.3)" transform="rotate(-8,90,280)">
        <animateTransform attributeName="transform" type="translate"
          values="0,0; 10,2; 0,0; -8,1; 0,0" dur="8s" repeatCount="indefinite" />
      </ellipse>
      <ellipse cx="155" cy="283" rx="14" ry="5" fill="rgba(255,255,255,0.2)" transform="rotate(5,155,283)">
        <animateTransform attributeName="transform" type="translate"
          values="0,0; -12,-1; 0,0; 8,2; 0,0" dur="10s" repeatCount="indefinite" />
      </ellipse>

      {/* ── FIREFLIES ── */}
      {[
        [55, 170], [82, 190], [168, 175], [195, 188], [35, 160], [215, 165],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="2" fill="rgba(200,255,130,0.9)">
          <animate attributeName="opacity" values="0;0;0;0.9;0.7;0;0;0" dur={`${5 + i * 0.8}s`}
            begin={`${i * 1.2}s`} repeatCount="indefinite" />
          <animateTransform attributeName="transform" type="translate"
            values={`0,0; ${12 - i * 4},${-15 - i * 3}; ${8 - i * 3},${-28 - i * 4}`}
            dur={`${5 + i * 0.8}s`} begin={`${i * 1.2}s`} repeatCount="indefinite" />
        </circle>
      ))}
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────
// 6. DATA PENGUIN — Happy Feet style, research scientist vibe
// ─────────────────────────────────────────────────────────────
function DataPenguinScene() {
  return (
    <svg {...SVG_PROPS}>
      <defs>
        <linearGradient id="dpn-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#001200" />
          <stop offset="100%" stopColor="#001800" />
        </linearGradient>
        <radialGradient id="dpn-glow" cx="50%" cy="65%" r="45%">
          <stop offset="0%" stopColor="rgba(50,205,50,0.2)" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <filter id="dpn-soft"><feGaussianBlur stdDeviation="2" /></filter>
      </defs>

      <rect width="250" height="300" fill="url(#dpn-bg)" />
      <rect width="250" height="300" fill="url(#dpn-glow)" />

      {/* Whiteboard — far background */}
      <rect x="10" y="15" width="100" height="75" rx="2" fill="rgba(5,20,5,0.8)" stroke="rgba(50,205,50,0.25)" strokeWidth="1" />
      {/* Whiteboard data */}
      {/* Bar chart */}
      {[20, 35, 28, 42, 32, 38, 25].map((h, i) => (
        <rect key={i} x={14 + i * 13} y={75 - h} width="10" height={h}
          fill={`rgba(50,205,50,${0.3 + i * 0.05})`} />
      ))}
      <line x1="12" y1="75" x2="108" y2="75" stroke="rgba(50,205,50,0.3)" strokeWidth="0.8" />
      {/* Labels */}
      <text x="14" y="89" fontSize="6" fill="rgba(50,205,50,0.5)" fontFamily="monospace">ANALYSIS v2.1</text>

      {/* Second whiteboard — right */}
      <rect x="145" y="10" width="98" height="85" rx="2" fill="rgba(5,20,5,0.8)" stroke="rgba(50,205,50,0.2)" strokeWidth="1" />
      {/* Scatter plot */}
      {[[155,65],[160,50],[170,70],[175,45],[180,60],[185,52],[190,68],[195,42],[200,58],[205,48],[210,65],[215,55],[220,45],[225,60],[230,40]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="2.5" fill="rgba(50,205,50,0.5)" />
      ))}
      {/* Trend line */}
      <line x1="152" y1="70" x2="233" y2="38" stroke="rgba(50,205,50,0.4)" strokeWidth="1" strokeDasharray="3,2" />
      <text x="147" y="93" fontSize="6" fill="rgba(50,205,50,0.4)" fontFamily="monospace">CORRELATION: 0.94</text>

      {/* Data terminal screen */}
      <rect x="155" y="215" width="88" height="60" rx="3" fill="rgba(0,10,0,0.9)" stroke="rgba(50,205,50,0.4)" strokeWidth="1.5" />
      {['$ python analyse.py', '>>> loading data...', '>>> accuracy: 94.3%', '>>> anomalies: 2'].map((line, i) => (
        <text key={i} x="159" y={225 + i * 11} fontSize="5.5" fill="rgba(50,205,50,0.7)" fontFamily="monospace">{line}</text>
      ))}
      <rect x="157" y="265" width="3" height="7" fill="rgba(50,205,50,0.9)">
        <animate attributeName="opacity" values="1;0;1" dur="1s" repeatCount="indefinite" />
      </rect>

      {/* Lab bench */}
      <rect x="0" y="260" width="250" height="8" rx="1" fill="rgba(15,25,10,0.9)" stroke="rgba(50,205,50,0.15)" strokeWidth="0.5" />

      {/* ── PENGUIN — large, close ── */}
      <g style={{ transformOrigin: '105px 210px', animation: 'creatureBreathe 4.5s ease-in-out infinite' }}>
        {/* Body */}
        <ellipse cx="105" cy="245" rx="58" ry="52" fill="#1a1a1a" />
        {/* White belly */}
        <ellipse cx="105" cy="250" rx="38" ry="40" fill="#F0F0F0" />

        {/* Lab coat — white, slightly open */}
        <path d="M47,220 Q48,200 60,195 Q72,190 105,188 Q138,190 150,195 Q162,200 163,220 L163,268 L47,268 Z"
          fill="rgba(245,245,245,0.92)" />
        {/* Lab coat lapels */}
        <path d="M105,190 L88,210 L88,240 L105,230 L122,240 L122,210 Z"
          fill="#1a1a1a" />
        {/* Coat pockets */}
        <rect x="58" y="235" width="20" height="14" rx="2" fill="rgba(220,220,220,0.6)" stroke="rgba(180,180,180,0.4)" strokeWidth="0.5" />
        <rect x="132" y="235" width="20" height="14" rx="2" fill="rgba(220,220,220,0.6)" stroke="rgba(180,180,180,0.4)" strokeWidth="0.5" />
        {/* Pocket protector */}
        <rect x="62" y="237" width="3" height="10" rx="0.5" fill="rgba(50,205,50,0.5)" />
        <rect x="66" y="237" width="3" height="10" rx="0.5" fill="rgba(255,100,0,0.5)" />
        <rect x="70" y="237" width="3" height="10" rx="0.5" fill="rgba(0,100,255,0.5)" />

        {/* Flippers */}
        <ellipse cx="50" cy="225" rx="16" ry="32" fill="#1a1a1a" transform="rotate(-20,50,225)" />
        <ellipse cx="160" cy="225" rx="16" ry="32" fill="#1a1a1a" transform="rotate(20,160,225)" />

        {/* Feet */}
        <ellipse cx="88" cy="268" rx="18" ry="8" fill="#FF8C00" transform="rotate(-5,88,268)" />
        <ellipse cx="122" cy="268" rx="18" ry="8" fill="#FF8C00" transform="rotate(5,122,268)" />

        {/* HEAD — Happy Feet style, large round */}
        <circle cx="105" cy="155" r="62" fill="#1a1a1a" />
        {/* White face patch */}
        <ellipse cx="105" cy="165" rx="44" ry="38" fill="#F5F5F5" />
        {/* Golden crown stripe */}
        <path d="M62,140 Q80,125 105,122 Q130,125 148,140 Q140,135 105,132 Q70,135 62,140 Z"
          fill="rgba(255,200,0,0.7)" />

        {/* ── ROUND WIRE-FRAME GLASSES ── */}
        {/* Frame */}
        <circle cx="88" cy="158" r="18" fill="rgba(200,220,200,0.12)" stroke="rgba(100,200,100,0.8)" strokeWidth="2" />
        <circle cx="122" cy="158" r="18" fill="rgba(200,220,200,0.12)" stroke="rgba(100,200,100,0.8)" strokeWidth="2" />
        {/* Bridge */}
        <line x1="106" y1="158" x2="104" y2="158" stroke="rgba(100,200,100,0.8)" strokeWidth="2" />
        {/* Arms */}
        <line x1="70" y1="155" x2="62" y2="150" stroke="rgba(100,200,100,0.6)" strokeWidth="1.5" />
        <line x1="140" y1="155" x2="148" y2="150" stroke="rgba(100,200,100,0.6)" strokeWidth="1.5" />

        {/* Eyes behind glasses */}
        <circle cx="88" cy="158" r="10" fill="#1a1a1a" />
        <circle cx="122" cy="158" r="10" fill="#1a1a1a" />
        <circle cx="88" cy="158" r="6" fill="#0a2a0a" />
        <circle cx="122" cy="158" r="6" fill="#0a2a0a" />
        <circle cx="88" cy="158" r="3" fill="#050f05" />
        <circle cx="122" cy="158" r="3" fill="#050f05" />
        <circle cx="91" cy="154" r="2.5" fill="rgba(200,255,200,0.7)" />
        <circle cx="125" cy="154" r="2.5" fill="rgba(200,255,200,0.7)" />

        {/* Blink */}
        <circle cx="88" cy="158" r="10" fill="#1a1a1a" opacity="0">
          <animate attributeName="opacity" values="0;0;0;0;0;0;0;0;1;0" dur="8s" repeatCount="indefinite" />
        </circle>
        <circle cx="122" cy="158" r="10" fill="#1a1a1a" opacity="0">
          <animate attributeName="opacity" values="0;0;0;0;0;0;0;0;1;0" dur="8s" repeatCount="indefinite" />
        </circle>

        {/* Beak */}
        <polygon points="105,178 92,192 118,192" fill="#FF8C00" />
        <line x1="92" y1="185" x2="118" y2="185" stroke="rgba(200,70,0,0.4)" strokeWidth="1" />

        {/* ID badge */}
        <rect x="62" y="210" width="26" height="18" rx="2" fill="rgba(0,50,0,0.8)" stroke="rgba(50,205,50,0.5)" strokeWidth="1" />
        <text x="65" y="218" fontSize="4.5" fill="rgba(50,205,50,0.9)" fontFamily="monospace">DR. PINGU</text>
        <text x="65" y="224" fontSize="4" fill="rgba(50,205,50,0.6)" fontFamily="monospace">DATA SCI</text>
      </g>
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────
// 7. MARKETING BEAR — Large grizzly close-up, chaotic office
// ─────────────────────────────────────────────────────────────
function MarketingBearScene() {
  return (
    <svg {...SVG_PROPS}>
      <defs>
        <linearGradient id="mb-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#160200" />
          <stop offset="100%" stopColor="#1A0300" />
        </linearGradient>
        <radialGradient id="mb-warm" cx="30%" cy="50%" r="60%">
          <stop offset="0%" stopColor="rgba(255,60,0,0.25)" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <filter id="mb-soft"><feGaussianBlur stdDeviation="2" /></filter>
      </defs>

      <rect width="250" height="300" fill="url(#mb-bg)" />
      <rect width="250" height="300" fill="url(#mb-warm)" />

      {/* Post-it notes on wall */}
      {[
        [15, 35, -12, '#FFFF00'], [25, 80, 8, '#FF9900'], [190, 25, 5, '#FF6666'],
        [205, 65, -8, '#99FF99'], [180, 100, 12, '#FFFF00'], [10, 130, -5, '#FF9900'],
      ].map(([x, y, angle, color], i) => (
        <rect key={i} x={x as number} y={y as number} width="28" height="24" rx="1"
          fill={color as string} opacity="0.55"
          transform={`rotate(${angle}, ${(x as number) + 14}, ${(y as number) + 12})`} />
      ))}

      {/* Chaotic shelves */}
      <rect x="0" y="50" width="15" height="200" fill="rgba(30,8,0,0.6)" />
      <rect x="235" y="40" width="15" height="220" fill="rgba(30,8,0,0.6)" />
      {[75, 105, 135, 165].map(y => (
        <rect key={y} x="0" y={y} width="15" height="3" fill="rgba(80,20,0,0.5)" />
      ))}

      {/* Laptop on desk — visible below */}
      <rect x="30" y="255" width="80" height="48" rx="2" fill="rgba(15,5,0,0.9)" stroke="rgba(255,80,0,0.3)" strokeWidth="1" />
      <rect x="32" y="257" width="76" height="40" rx="1" fill="rgba(255,60,0,0.12)" />

      {/* Energy drink cans */}
      <rect x="190" y="245" width="16" height="30" rx="3" fill="rgba(255,40,0,0.7)" />
      <rect x="210" y="250" width="14" height="25" rx="3" fill="rgba(200,30,0,0.6)" />

      {/* Desk */}
      <rect x="0" y="262" width="250" height="8" rx="1" fill="rgba(25,8,0,0.9)" stroke="rgba(80,20,0,0.3)" strokeWidth="0.5" />

      {/* ── GRIZZLY BEAR — LARGE, fills frame ── */}
      <g style={{ transformOrigin: '125px 170px', animation: 'creatureBreathe 4s ease-in-out infinite' }}>
        {/* Massive body / shoulders — just barely visible at bottom */}
        <ellipse cx="125" cy="280" rx="110" ry="50" fill="#5a3010" />

        {/* Thick neck */}
        <rect x="88" y="215" width="74" height="55" rx="15" fill="#6b3a18" />

        {/* HEAD — fills most of panel — close up */}
        <circle cx="125" cy="160" r="95" fill="#7a4520" />

        {/* Forehead/top of head fur texture */}
        <ellipse cx="125" cy="80" rx="85" ry="45" fill="#6a3810" />
        {/* Fur texture bumps */}
        {[60,80,100,120,140,160,185].map((x, i) => (
          <circle key={i} cx={x} cy={75 + (i % 2) * 8} r={12 + (i % 3) * 3} fill="rgba(50,25,5,0.4)" />
        ))}

        {/* Ears — big, round */}
        <circle cx="42" cy="95" r="30" fill="#6a3810" />
        <circle cx="42" cy="95" r="20" fill="#4a2508" />
        <circle cx="42" cy="95" r="12" fill="rgba(255,120,80,0.15)" />
        <circle cx="208" cy="95" r="30" fill="#6a3810" />
        <circle cx="208" cy="95" r="20" fill="#4a2508" />
        <circle cx="208" cy="95" r="12" fill="rgba(255,120,80,0.15)" />

        {/* Eye brow ridges */}
        <path d="M68,138 Q90,126 112,132" fill="none" stroke="rgba(40,15,0,0.5)" strokeWidth="5" strokeLinecap="round" />
        <path d="M138,132 Q160,126 182,138" fill="none" stroke="rgba(40,15,0,0.5)" strokeWidth="5" strokeLinecap="round" />

        {/* EYES — bear eyes, dark, intense */}
        <circle cx="88" cy="148" r="18" fill="#1a0800" />
        <circle cx="162" cy="148" r="18" fill="#1a0800" />
        <circle cx="88" cy="148" r="12" fill="#2a1000" />
        <circle cx="162" cy="148" r="12" fill="#2a1000" />
        <circle cx="88" cy="148" r="7" fill="#0a0400" />
        <circle cx="162" cy="148" r="7" fill="#0a0400" />
        {/* Eye shine — slightly unhinged look */}
        <circle cx="94" cy="142" r="4" fill="rgba(255,200,150,0.6)" />
        <circle cx="168" cy="142" r="4" fill="rgba(255,200,150,0.6)" />
        <circle cx="82" cy="152" r="2" fill="rgba(255,255,255,0.3)" />
        <circle cx="156" cy="152" r="2" fill="rgba(255,255,255,0.3)" />

        {/* Blink */}
        <ellipse cx="88" cy="148" rx="18" ry="0" fill="#7a4520">
          <animate attributeName="ry" values="0;0;0;0;0;0;18;0;0;0" dur="7s" repeatCount="indefinite" />
        </ellipse>
        <ellipse cx="162" cy="148" rx="18" ry="0" fill="#7a4520">
          <animate attributeName="ry" values="0;0;0;0;0;0;18;0;0;0" dur="7s" repeatCount="indefinite" />
        </ellipse>

        {/* Massive snout */}
        <ellipse cx="125" cy="195" rx="40" ry="28" fill="#5a3010" />
        <ellipse cx="125" cy="190" rx="30" ry="20" fill="#4a2508" />
        {/* Nose */}
        <ellipse cx="125" cy="185" rx="20" ry="12" fill="#1a0800" />
        <ellipse cx="125" cy="183" rx="14" ry="8" fill="#0a0400" />
        <ellipse cx="119" cy="181" rx="4" ry="3" fill="rgba(80,40,20,0.4)" />
        <ellipse cx="131" cy="181" rx="4" ry="3" fill="rgba(80,40,20,0.4)" />

        {/* Mouth — slightly open, excited */}
        <path d="M100,207 Q125,222 150,207" fill="none" stroke="rgba(30,10,0,0.7)" strokeWidth="3" strokeLinecap="round" />
        <path d="M108,210 Q125,228 142,210" fill="rgba(30,0,0,0.5)" />

        {/* Jowl fur folds */}
        <ellipse cx="65" cy="190" rx="28" ry="22" fill="rgba(90,48,15,0.6)" />
        <ellipse cx="185" cy="190" rx="28" ry="22" fill="rgba(90,48,15,0.6)" />

        {/* Megaphone — raised in one paw */}
        <g transform="translate(182, 170) rotate(-20)">
          <polygon points="0,0 30,-8 30,8 0,14" fill="rgba(255,60,0,0.85)" stroke="rgba(255,100,0,0.5)" strokeWidth="1" />
          <circle cx="0" cy="7" r="7" fill="rgba(200,50,0,0.7)" />
          <line x1="30" y1="-12" x2="40" y2="-18" stroke="rgba(255,200,0,0.6)" strokeWidth="2" />
        </g>
      </g>
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────
// 8. LIBRARIAN QUOKKA — Close-up at warm formal library desk
// ─────────────────────────────────────────────────────────────
function LibrarianQuokkaScene() {
  return (
    <svg {...SVG_PROPS}>
      <defs>
        <radialGradient id="lq-lamp" cx="75%" cy="50%" r="55%">
          <stop offset="0%" stopColor="rgba(255,160,40,0.4)" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <linearGradient id="lq-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0D0014" />
          <stop offset="100%" stopColor="#130020" />
        </linearGradient>
        <filter id="lq-soft"><feGaussianBlur stdDeviation="2.5" /></filter>
      </defs>

      <rect width="250" height="300" fill="url(#lq-bg)" />
      <rect width="250" height="300" fill="url(#lq-lamp)" />

      {/* Bookshelves — dark background */}
      <rect x="0" y="0" width="40" height="260" fill="rgba(20,5,30,0.7)" />
      <rect x="210" y="0" width="40" height="260" fill="rgba(20,5,30,0.6)" />
      {/* Book spines — left shelf */}
      {[8, 30, 55, 80, 105, 130, 155, 180, 205].map((y, i) => (
        <rect key={i} x={4 + (i % 3) * 4} y={y} width="30" height="18" rx="1"
          fill={['#2a0a4a','#1a0830','#0a1a3a','#3a1a00','#0a2a15','#2a1a00'][i % 6]}
          opacity="0.8" />
      ))}
      {/* Book spines — right shelf */}
      {[12, 38, 62, 88, 114, 140, 165, 190].map((y, i) => (
        <rect key={i} x={212 + (i % 2) * 5} y={y} width="30" height="18" rx="1"
          fill={['#1a0a3a','#2a0020','#0a1530','#3a2a00','#0a2010'][i % 5]}
          opacity="0.8" />
      ))}

      {/* Noble dark wood desk */}
      <rect x="15" y="230" width="220" height="70" rx="4" fill="rgba(30,10,50,0.9)" stroke="rgba(140,50,200,0.2)" strokeWidth="1" />
      <rect x="15" y="230" width="220" height="12" rx="4" fill="rgba(50,20,70,0.8)" />

      {/* Open book on desk */}
      <g transform="translate(40, 245)">
        <path d="M0,0 Q55,-8 80,0 L80,38 Q55,28 0,38 Z" fill="#1a0530" stroke="rgba(150,80,220,0.3)" strokeWidth="1" />
        <path d="M0,0 Q-55,-8 -80,0 L-80,38 Q-55,28 0,38 Z" fill="#14042a" stroke="rgba(150,80,220,0.25)" strokeWidth="1" />
        {/* Pages with text */}
        {[6, 11, 16, 21, 26, 31].map(y => (
          <line key={y} x1="5" y1={y} x2="72" y2={y} stroke="rgba(200,150,255,0.2)" strokeWidth="0.7" />
        ))}
        {[6, 11, 16, 21, 26, 31].map(y => (
          <line key={y} x1="-8" y1={y} x2="-72" y2={y} stroke="rgba(200,150,255,0.15)" strokeWidth="0.7" />
        ))}
        {/* Book gutter */}
        <line x1="0" y1="0" x2="0" y2="38" stroke="rgba(100,50,150,0.4)" strokeWidth="1.5" />
      </g>

      {/* Amber desk lamp */}
      <line x1="200" y1="140" x2="200" y2="230" stroke="rgba(180,100,220,0.3)" strokeWidth="3" />
      <path d="M200,140 Q218,130 228,145" fill="none" stroke="rgba(180,100,220,0.3)" strokeWidth="3" />
      <ellipse cx="228" cy="152" rx="20" ry="10" fill="rgba(255,170,50,0.75)" />
      <ellipse cx="228" cy="162" rx="35" ry="20" fill="rgba(255,160,40,0.12)" filter="url(#lq-soft)" />

      {/* ── QUOKKA — large, warm, formal ── */}
      <g style={{ transformOrigin: '105px 190px', animation: 'creatureBreathe 3.5s ease-in-out infinite' }}>
        {/* Body */}
        <ellipse cx="105" cy="265" rx="60" ry="40" fill="#C8965A" />

        {/* Arms/paws resting on book */}
        <ellipse cx="65" cy="262" rx="22" ry="12" fill="#C8965A" transform="rotate(-10,65,262)" />
        <ellipse cx="148" cy="265" rx="20" ry="10" fill="#C8965A" transform="rotate(8,148,265)" />

        {/* HEAD — large, centred, close */}
        <circle cx="105" cy="170" r="78" fill="#D4A060" />

        {/* Big rounded ears */}
        <ellipse cx="37" cy="112" rx="24" ry="34" fill="#C8965A" />
        <ellipse cx="37" cy="112" rx="14" ry="22" fill="rgba(255,160,160,0.25)" />
        <ellipse cx="173" cy="112" rx="24" ry="34" fill="#C8965A" />
        <ellipse cx="173" cy="112" rx="14" ry="22" fill="rgba(255,160,160,0.2)" />

        {/* Cheek puffs */}
        <ellipse cx="48" cy="185" rx="30" ry="26" fill="rgba(200,140,70,0.5)" />
        <ellipse cx="162" cy="185" rx="30" ry="26" fill="rgba(200,140,70,0.5)" />

        {/* ── ROUND SPECTACLES ── */}
        <circle cx="84" cy="162" r="24" fill="rgba(255,200,100,0.08)"
          stroke="rgba(255,200,60,0.75)" strokeWidth="2.5" />
        <circle cx="126" cy="162" r="24" fill="rgba(255,200,100,0.08)"
          stroke="rgba(255,200,60,0.75)" strokeWidth="2.5" />
        {/* Nose bridge */}
        <path d="M108,162 Q115,158 118,162" fill="none" stroke="rgba(255,200,60,0.75)" strokeWidth="2.5" />
        {/* Arms to ears */}
        <line x1="60" y1="158" x2="46" y2="150" stroke="rgba(255,200,60,0.5)" strokeWidth="2" />
        <line x1="150" y1="158" x2="164" y2="150" stroke="rgba(255,200,60,0.5)" strokeWidth="2" />

        {/* EYES */}
        <circle cx="84" cy="162" r="16" fill="#1a0800" />
        <circle cx="126" cy="162" r="16" fill="#1a0800" />
        <circle cx="84" cy="162" r="10" fill="#2a1200" />
        <circle cx="126" cy="162" r="10" fill="#2a1200" />
        <circle cx="84" cy="162" r="5" fill="#0a0400" />
        <circle cx="126" cy="162" r="5" fill="#0a0400" />
        {/* Big eye shine — delighted expression */}
        <circle cx="90" cy="155" r="5" fill="rgba(255,240,200,0.85)" />
        <circle cx="132" cy="155" r="5" fill="rgba(255,240,200,0.85)" />
        <circle cx="80" cy="167" r="2" fill="rgba(255,255,255,0.4)" />
        <circle cx="122" cy="167" r="2" fill="rgba(255,255,255,0.4)" />

        {/* Blink */}
        <circle cx="84" cy="162" r="16" fill="#D4A060" opacity="0">
          <animate attributeName="opacity" values="0;0;0;0;0;0;0;0;0;1;0;0" dur="9s" repeatCount="indefinite" />
        </circle>
        <circle cx="126" cy="162" r="16" fill="#D4A060" opacity="0">
          <animate attributeName="opacity" values="0;0;0;0;0;0;0;0;0;1;0;0" dur="9s" repeatCount="indefinite" />
        </circle>

        {/* Nose */}
        <ellipse cx="105" cy="182" rx="8" ry="6" fill="#4a2000" />
        <ellipse cx="105" cy="181" rx="5" ry="3.5" fill="#2a1000" />

        {/* SIGNATURE QUOKKA SMILE — big, wide, delighted */}
        <path d="M76,194 Q105,218 134,194" fill="none" stroke="#4a2000" strokeWidth="3.5" strokeLinecap="round" />
        <path d="M82,196 Q105,212 128,196" fill="rgba(255,100,80,0.2)" />

        {/* Cheek blush */}
        <ellipse cx="52" cy="196" rx="20" ry="12" fill="rgba(255,130,100,0.25)" />
        <ellipse cx="158" cy="196" rx="20" ry="12" fill="rgba(255,130,100,0.25)" />

        {/* Whiskers */}
        {[-1, 0, 1].map((i) => (
          <line key={`l${i}`} x1="96" y1={184 + i * 5} x2="60" y2={182 + i * 7}
            stroke="rgba(200,150,80,0.4)" strokeWidth="0.8" />
        ))}
        {[-1, 0, 1].map((i) => (
          <line key={`r${i}`} x1="114" y1={184 + i * 5} x2="150" y2={182 + i * 7}
            stroke="rgba(200,150,80,0.4)" strokeWidth="0.8" />
        ))}
      </g>
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────
// 9. GUARDIAN MASTIFF (Cane Corso) — Dark tactical ops room
// ─────────────────────────────────────────────────────────────
function GuardianMastiffScene() {
  return (
    <svg {...SVG_PROPS}>
      <defs>
        <linearGradient id="gm-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#070500" />
          <stop offset="100%" stopColor="#0D0800" />
        </linearGradient>
        <radialGradient id="gm-alert" cx="30%" cy="40%" r="60%">
          <stop offset="0%" stopColor="rgba(200,150,12,0.3)" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <radialGradient id="gm-alert2" cx="80%" cy="60%" r="50%">
          <stop offset="0%" stopColor="rgba(200,100,0,0.15)" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <filter id="gm-glow"><feGaussianBlur stdDeviation="5" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
        <filter id="gm-soft"><feGaussianBlur stdDeviation="2" /></filter>
      </defs>

      <rect width="250" height="300" fill="url(#gm-bg)" />
      <rect width="250" height="300" fill="url(#gm-alert)" />
      <rect width="250" height="300" fill="url(#gm-alert2)" />

      {/* Tactical room: holographic displays in background */}
      {/* Left holo panel */}
      <rect x="8" y="25" width="50" height="60" rx="2"
        fill="rgba(200,150,12,0.06)" stroke="rgba(200,150,12,0.3)" strokeWidth="1" />
      {['SHIELD', 'THREAT', 'API', 'TOKEN'].map((label, i) => (
        <g key={i}>
          <text x="12" y={38 + i * 13} fontSize="5.5" fill="rgba(200,150,12,0.6)" fontFamily="monospace">
            {label}:
          </text>
          <rect x="36" y={33 + i * 13} width={12 + (i % 2) * 8} height="5" rx="1"
            fill={i === 1 ? 'rgba(255,60,0,0.3)' : 'rgba(200,150,12,0.25)'} />
        </g>
      ))}

      {/* Right holo panel */}
      <rect x="192" y="20" width="52" height="65" rx="2"
        fill="rgba(200,150,12,0.05)" stroke="rgba(200,150,12,0.25)" strokeWidth="1" />
      {/* Threat map */}
      {[[200,35],[212,45],[225,32],[218,55],[206,60],[232,42]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="3" fill="rgba(200,150,12,0.4)" />
      ))}
      <line x1="200" y1="35" x2="232" y2="42" stroke="rgba(200,150,12,0.2)" strokeWidth="0.8" />
      <line x1="212" y1="45" x2="218" y2="55" stroke="rgba(200,150,12,0.2)" strokeWidth="0.8" />
      <text x="193" y="78" fontSize="5" fill="rgba(200,150,12,0.5)" fontFamily="monospace">SECURE</text>

      {/* Floor in background */}
      <rect x="0" y="270" width="250" height="30" fill="rgba(10,7,0,0.9)" />
      <line x1="0" y1="272" x2="250" y2="272" stroke="rgba(200,150,12,0.1)" strokeWidth="0.5" />

      {/* Warning light streak */}
      <rect x="0" y="95" width="250" height="2" fill="rgba(200,130,0,0.15)">
        <animate attributeName="opacity" values="0.15;0.4;0.15" dur="2s" repeatCount="indefinite" />
      </rect>

      {/* ── CANE CORSO — large, imposing, close ── */}
      <g style={{ transformOrigin: '125px 185px', animation: 'creatureBreathe 5s ease-in-out infinite' }}>
        {/* Massive body */}
        <ellipse cx="125" cy="285" rx="105" ry="40" fill="#1a1000" />

        {/* Thick muscular neck */}
        <path d="M75,235 Q78,200 95,190 Q110,182 125,180 Q140,182 155,190 Q172,200 175,235 L175,280 L75,280 Z"
          fill="#2a1800" />
        {/* Neck muscle definition */}
        <path d="M88,240 Q90,210 100,195" fill="none" stroke="rgba(60,35,10,0.4)" strokeWidth="3" strokeLinecap="round" />
        <path d="M162,240 Q160,210 150,195" fill="none" stroke="rgba(60,35,10,0.4)" strokeWidth="3" strokeLinecap="round" />

        {/* ── CANE CORSO HEAD — brachycephalic, square, imposing ── */}
        {/* Head is very square and wide for Cane Corso */}
        <rect x="42" y="100" width="166" height="140" rx="30" fill="#2a1800" />
        {/* Head top flat area */}
        <rect x="55" y="95" width="140" height="50" rx="15" fill="#2e1c00" />

        {/* Wrinkle lines on forehead — Cane Corso characteristic */}
        {[75, 95, 115, 135, 155, 175].map((x, i) => (
          <path key={i}
            d={`M${x},100 Q${x + (i % 2 === 0 ? 3 : -3)},115 ${x},130`}
            fill="none" stroke="rgba(10,5,0,0.4)" strokeWidth={1.5 + (i === 2 || i === 3 ? 1 : 0)} />
        ))}

        {/* Thick brow ridge */}
        <ellipse cx="125" cy="142" rx="70" ry="12" fill="rgba(20,10,0,0.5)" />

        {/* EYES — calm, amber, watchful */}
        <circle cx="88" cy="155" r="20" fill="#0d0800" />
        <circle cx="162" cy="155" r="20" fill="#0d0800" />
        <circle cx="88" cy="155" r="13" fill="#C8960C" />
        <circle cx="162" cy="155" r="13" fill="#C8960C" />
        <circle cx="88" cy="155" r="7" fill="#0a0600" />
        <circle cx="162" cy="155" r="7" fill="#0a0600" />
        {/* Amber iris detail */}
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => {
          const rad = (angle * Math.PI) / 180;
          return (
            <line key={i}
              x1={88 + Math.cos(rad) * 7} y1={155 + Math.sin(rad) * 7}
              x2={88 + Math.cos(rad) * 12} y2={155 + Math.sin(rad) * 12}
              stroke="rgba(220,160,10,0.3)" strokeWidth="0.8" />
          );
        })}
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => {
          const rad = (angle * Math.PI) / 180;
          return (
            <line key={i}
              x1={162 + Math.cos(rad) * 7} y1={155 + Math.sin(rad) * 7}
              x2={162 + Math.cos(rad) * 12} y2={155 + Math.sin(rad) * 12}
              stroke="rgba(220,160,10,0.3)" strokeWidth="0.8" />
          );
        })}
        {/* Eye shine — small, focused */}
        <circle cx="92" cy="149" r="3.5" fill="rgba(255,220,100,0.5)" />
        <circle cx="166" cy="149" r="3.5" fill="rgba(255,220,100,0.5)" />

        {/* Slow blink */}
        <circle cx="88" cy="155" r="20" fill="#2a1800" opacity="0">
          <animate attributeName="opacity" values="0;0;0;0;0;0;0;0;0;0;0;1;0.8;0" dur="10s" repeatCount="indefinite" />
        </circle>
        <circle cx="162" cy="155" r="20" fill="#2a1800" opacity="0">
          <animate attributeName="opacity" values="0;0;0;0;0;0;0;0;0;0;0;1;0.8;0" dur="10s" repeatCount="indefinite" />
        </circle>

        {/* Jowl folds — Cane Corso characteristic heavy jowls */}
        <ellipse cx="60" cy="195" rx="32" ry="25" fill="rgba(35,20,5,0.7)" />
        <ellipse cx="190" cy="195" rx="32" ry="25" fill="rgba(35,20,5,0.7)" />

        {/* Wide square muzzle */}
        <rect x="80" y="185" width="90" height="55" rx="18" fill="#2a1800" />
        {/* Muzzle wrinkles */}
        <path d="M80,200 Q85,195 90,200" fill="none" stroke="rgba(10,5,0,0.4)" strokeWidth="1.5" />
        <path d="M160,200 Q155,195 150,200" fill="none" stroke="rgba(10,5,0,0.4)" strokeWidth="1.5" />

        {/* Nose — large, broad */}
        <rect x="95" y="188" width="60" height="28" rx="14" fill="#0a0500" />
        <ellipse cx="110" cy="200" rx="7" ry="5" fill="rgba(40,20,5,0.5)" />
        <ellipse cx="140" cy="200" rx="7" ry="5" fill="rgba(40,20,5,0.5)" />

        {/* Mouth — closed, firm */}
        <path d="M95,218 Q125,228 155,218" fill="none" stroke="rgba(10,5,0,0.6)" strokeWidth="2" strokeLinecap="round" />

        {/* Alert collar — tactical */}
        <rect x="70" y="234" width="110" height="18" rx="5" fill="rgba(30,20,0,0.9)" stroke="rgba(200,150,12,0.4)" strokeWidth="1.5" />
        <rect x="118" y="237" width="14" height="12" rx="2" fill="rgba(200,150,12,0.6)" />
        <text x="119" y="246" fontSize="5" fill="rgba(10,7,0,0.9)" fontFamily="monospace" fontWeight="bold">J</text>
      </g>

      {/* Warning holo ring around dog */}
      <ellipse cx="125" cy="220" rx="110" ry="30" fill="none"
        stroke="rgba(200,150,12,0.12)" strokeWidth="1">
        <animate attributeName="stroke-opacity" values="0.12;0.3;0.12" dur="3s" repeatCount="indefinite" />
      </ellipse>
    </svg>
  );
}
