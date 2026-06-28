import type { PanelId } from '../../jeffConfig';

interface CreatureArtProps {
  panelId: PanelId;
  primaryColor: string;
  glowColor: string;
}

export default function CreatureArt({ panelId, primaryColor, glowColor }: CreatureArtProps) {
  const style = { filter: `drop-shadow(0 0 12px ${glowColor}40)` };

  switch (panelId) {
    case 'think-tank':       return <Jellyfish primaryColor={primaryColor} glowColor={glowColor} style={style} />;
    case 'control-centre':   return <JayBattlestation primaryColor={primaryColor} style={style} />;
    case 'designer-panda':   return <DesignerPanda primaryColor={primaryColor} style={style} />;
    case 'sebs-wisdom':      return <Tortoise primaryColor={primaryColor} style={style} />;
    case 'village-hall':     return <VillageHall primaryColor={primaryColor} style={style} />;
    case 'data-penguin':     return <DataPenguin primaryColor={primaryColor} style={style} />;
    case 'marketing-bear':   return <MarketingBear primaryColor={primaryColor} style={style} />;
    case 'librarian-quokka': return <LibrarianQuokka primaryColor={primaryColor} style={style} />;
    case 'guardian-mastiff': return <GuardianMastiff primaryColor={primaryColor} style={style} />;
    default:                 return null;
  }
}

// ── Think Tank: Bioluminescent Jellyfish ─────────────────────

function Jellyfish({ primaryColor, glowColor, style }: { primaryColor: string; glowColor: string; style: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 200 180" xmlns="http://www.w3.org/2000/svg" style={style} className="w-full h-full">
      {/* Tank glass */}
      <rect x="40" y="10" width="120" height="150" rx="8" fill="none" stroke="rgba(68,136,255,0.3)" strokeWidth="1.5" />
      <rect x="40" y="10" width="120" height="150" rx="8" fill="rgba(0,20,80,0.4)" />
      {/* Inner glow */}
      <ellipse cx="100" cy="90" rx="50" ry="60" fill={`${primaryColor}10`} />
      {/* Jellyfish bell */}
      <ellipse cx="100" cy="70" rx="32" ry="22" fill={`${primaryColor}60`} stroke={glowColor} strokeWidth="1.5" />
      <ellipse cx="100" cy="70" rx="22" ry="15" fill={`${primaryColor}30`} />
      {/* Tentacles */}
      {[-20, -10, 0, 10, 20].map((x, i) => (
        <path
          key={i}
          d={`M${100 + x},90 Q${100 + x + (i % 2 === 0 ? 8 : -8)},${110 + i * 4} ${100 + x},${130 + i * 3}`}
          fill="none"
          stroke={`${glowColor}80`}
          strokeWidth="1.5"
        />
      ))}
      {/* Data streams */}
      {[50, 70, 130, 150].map((x, i) => (
        <rect key={i} x={x} y={20 + i * 15} width="1" height="20" fill={`${primaryColor}40`} rx="0.5" />
      ))}
      {/* Glow core */}
      <circle cx="100" cy="68" r="6" fill={glowColor} opacity="0.8" />
    </svg>
  );
}

// ── Control Centre: Jay at battlestation ─────────────────────

function JayBattlestation({ primaryColor, style }: { primaryColor: string; style: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 200 180" xmlns="http://www.w3.org/2000/svg" style={style} className="w-full h-full">
      {/* Desk */}
      <rect x="20" y="130" width="160" height="8" rx="2" fill="#1a1200" stroke="rgba(255,215,0,0.3)" strokeWidth="1" />
      {/* Monitors */}
      <rect x="30" y="75" width="60" height="52" rx="4" fill="#0a0800" stroke="rgba(255,215,0,0.6)" strokeWidth="1.5" />
      <rect x="33" y="78" width="54" height="44" rx="2" fill="rgba(255,140,0,0.12)" />
      <rect x="110" y="65" width="70" height="62" rx="4" fill="#0a0800" stroke="rgba(255,215,0,0.8)" strokeWidth="1.5" />
      <rect x="113" y="68" width="64" height="54" rx="2" fill="rgba(255,140,0,0.18)" />
      {/* Monitor content lines */}
      <rect x="40" y="85" width="40" height="2" rx="1" fill="rgba(255,215,0,0.4)" />
      <rect x="40" y="90" width="30" height="2" rx="1" fill="rgba(255,215,0,0.3)" />
      <rect x="40" y="95" width="35" height="2" rx="1" fill="rgba(255,215,0,0.25)" />
      <rect x="120" y="80" width="50" height="2" rx="1" fill="rgba(255,215,0,0.5)" />
      <rect x="120" y="86" width="40" height="2" rx="1" fill="rgba(255,215,0,0.35)" />
      <rect x="120" y="92" width="45" height="2" rx="1" fill="rgba(255,215,0,0.3)" />
      <rect x="120" y="98" width="35" height="2" rx="1" fill="rgba(255,215,0,0.25)" />
      {/* Chair back */}
      <path d="M70,130 Q75,80 80,50 Q90,40 110,45 Q120,50 125,80 L130,130" fill="rgba(30,20,0,0.9)" stroke="rgba(60,50,0,0.8)" strokeWidth="1" />
      {/* Jay's silhouette — curly hair */}
      <ellipse cx="100" cy="52" rx="22" ry="20" fill="#1a0f00" />
      {/* Cap brim */}
      <ellipse cx="100" cy="36" rx="26" ry="8" fill="#111" />
      <rect x="74" y="28" width="52" height="12" rx="3" fill="#111" />
      {/* Curly hair */}
      {[80, 88, 96, 104, 112, 118].map((x, i) => (
        <circle key={i} cx={x} cy={46 + (i % 2 === 0 ? 0 : 3)} r={5 + (i % 3)} fill="#2a1500" />
      ))}
      {/* Shoulders */}
      <ellipse cx="100" cy="100" rx="35" ry="20" fill="#111" />
      {/* Keyboard glow */}
      <rect x="55" y="128" width="90" height="6" rx="2" fill="rgba(255,215,0,0.1)" stroke="rgba(255,215,0,0.3)" strokeWidth="0.5" />
      {/* Monitor glow spill */}
      <ellipse cx="100" cy="90" rx="70" ry="35" fill="rgba(255,140,0,0.04)" />
    </svg>
  );
}

// ── Designer Panda ───────────────────────────────────────────

function DesignerPanda({ primaryColor, style }: { primaryColor: string; style: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 200 180" xmlns="http://www.w3.org/2000/svg" style={style} className="w-full h-full">
      {/* Paint splatters bg */}
      <circle cx="40" cy="40" r="20" fill="rgba(255,0,255,0.2)" />
      <circle cx="160" cy="30" r="15" fill="rgba(255,69,0,0.2)" />
      <circle cx="170" cy="140" r="18" fill="rgba(0,51,255,0.2)" />
      <circle cx="30" cy="150" r="12" fill="rgba(50,205,50,0.2)" />
      {/* Easel */}
      <line x1="85" y1="70" x2="60" y2="150" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
      <line x1="115" y1="70" x2="140" y2="150" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
      <line x1="90" y1="110" x2="110" y2="110" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
      {/* Canvas */}
      <rect x="70" y="40" width="60" height="60" rx="2" fill="rgba(0,0,0,0.8)" stroke="#FF66FF" strokeWidth="1.5" />
      <rect x="73" y="43" width="54" height="54" rx="1" fill="rgba(255,0,255,0.15)" />
      {/* Panda body */}
      <ellipse cx="100" cy="140" rx="30" ry="25" fill="#f0f0f0" />
      {/* Panda head */}
      <circle cx="100" cy="108" r="24" fill="#f0f0f0" />
      {/* Eye patches */}
      <ellipse cx="90" cy="106" rx="8" ry="7" fill="#111" />
      <ellipse cx="110" cy="106" rx="8" ry="7" fill="#111" />
      {/* Eyes */}
      <circle cx="90" cy="107" r="3" fill="white" />
      <circle cx="110" cy="107" r="3" fill="white" />
      <circle cx="91" cy="107" r="1.5" fill="#111" />
      <circle cx="111" cy="107" r="1.5" fill="#111" />
      {/* Ears */}
      <circle cx="80" cy="88" r="8" fill="#111" />
      <circle cx="120" cy="88" r="8" fill="#111" />
      {/* Nose */}
      <ellipse cx="100" cy="116" rx="4" ry="3" fill="#333" />
      {/* Paint brush */}
      <line x1="120" y1="125" x2="145" y2="100" stroke="rgba(255,255,255,0.7)" strokeWidth="2" />
      <circle cx="145" cy="99" r="3" fill="#FF00FF" />
      {/* Paint splat on paw */}
      <circle cx="88" cy="150" r="5" fill="rgba(255,215,0,0.5)" />
    </svg>
  );
}

// ── Seb's Wisdom: Hermann Tortoise ───────────────────────────

function Tortoise({ primaryColor, style }: { primaryColor: string; style: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 200 180" xmlns="http://www.w3.org/2000/svg" style={style} className="w-full h-full">
      {/* Mossy rock */}
      <ellipse cx="100" cy="145" rx="55" ry="20" fill="#1a2200" />
      <ellipse cx="100" cy="140" rx="50" ry="16" fill="#243300" />
      {/* Moss patches */}
      {[60, 80, 110, 130].map((x, i) => (
        <ellipse key={i} cx={x} cy={138 + (i % 2)} rx="8" ry="4" fill="rgba(80,120,40,0.5)" />
      ))}
      {/* Shell */}
      <ellipse cx="100" cy="118" rx="40" ry="28" fill="#7a5c20" />
      <ellipse cx="100" cy="116" rx="36" ry="24" fill="#8B6914" />
      {/* Shell pattern */}
      <polygon points="100,95 115,108 110,125 90,125 85,108" fill="rgba(0,0,0,0.2)" stroke="rgba(0,0,0,0.3)" strokeWidth="1" />
      {[[-18,5], [18,5], [-10,18], [10,18], [0,22]].map(([dx, dy], i) => (
        <ellipse key={i} cx={100 + dx} cy={116 + dy} rx="8" ry="6" fill="rgba(0,0,0,0.15)" stroke="rgba(0,0,0,0.2)" strokeWidth="0.5" />
      ))}
      {/* Head */}
      <ellipse cx="100" cy="94" rx="14" ry="12" fill="#9B7940" />
      {/* Eyes — wise and calm */}
      <circle cx="94" cy="91" r="3" fill="#1a0f00" />
      <circle cx="106" cy="91" r="3" fill="#1a0f00" />
      <circle cx="94.5" cy="90.5" r="1" fill="rgba(255,255,255,0.4)" />
      <circle cx="106.5" cy="90.5" r="1" fill="rgba(255,255,255,0.4)" />
      {/* Small book */}
      <rect x="128" y="125" width="18" height="22" rx="1" fill="#4a2800" stroke="rgba(184,134,11,0.5)" strokeWidth="1" />
      <rect x="130" y="127" width="14" height="18" rx="1" fill="rgba(255,200,100,0.15)" />
      <line x1="132" y1="131" x2="142" y2="131" stroke="rgba(255,200,100,0.3)" strokeWidth="0.5" />
      <line x1="132" y1="134" x2="142" y2="134" stroke="rgba(255,200,100,0.3)" strokeWidth="0.5" />
      {/* Lantern glow */}
      <circle cx="60" cy="120" r="15" fill="rgba(255,165,0,0.1)" />
    </svg>
  );
}

// ── Village Hall ─────────────────────────────────────────────

function VillageHall({ primaryColor, style }: { primaryColor: string; style: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 200 180" xmlns="http://www.w3.org/2000/svg" style={style} className="w-full h-full">
      {/* Moon */}
      <circle cx="160" cy="20" r="18" fill="rgba(200,220,255,0.6)" />
      <circle cx="166" cy="16" r="14" fill="rgba(20,40,80,0.8)" />
      {/* Stars */}
      {[[20,15],[40,25],[70,10],[120,18],[50,35]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="1" fill="rgba(255,255,255,0.8)" />
      ))}
      {/* Pagoda roof layers */}
      <polygon points="100,20 155,55 45,55" fill="#1a0f00" stroke="rgba(0,191,255,0.4)" strokeWidth="1" />
      <polygon points="100,35 145,60 55,60" fill="#1a0f00" stroke="rgba(0,191,255,0.3)" strokeWidth="1" />
      {/* Main building */}
      <rect x="55" y="60" width="90" height="80" fill="#110a00" stroke="rgba(0,191,255,0.3)" strokeWidth="1" />
      {/* Windows with amber glow */}
      <rect x="65" y="75" width="20" height="25" rx="1" fill="rgba(255,165,0,0.5)" />
      <rect x="90" y="70" width="20" height="35" rx="1" fill="rgba(255,165,0,0.6)" />
      <rect x="115" y="75" width="20" height="25" rx="1" fill="rgba(255,165,0,0.4)" />
      {/* Door */}
      <path d="M90,140 Q100,130 110,140 L110,140 L90,140" fill="#2a1500" stroke="rgba(0,191,255,0.4)" strokeWidth="1" />
      {/* Lanterns */}
      {[70, 100, 130].map((x, i) => (
        <g key={i} style={{ animation: `lanternSway ${3 + i * 0.6}s ease-in-out infinite`, transformOrigin: `${x}px 58px` }}>
          <line x1={x} y1="58" x2={x} y2="66" stroke="rgba(255,165,0,0.5)" strokeWidth="1" />
          <rect x={x - 4} y="66" width="8" height="10" rx="2" fill="rgba(255,140,0,0.8)" />
          <circle cx={x} cy="71" r="5" fill="rgba(255,165,0,0.2)" />
        </g>
      ))}
      {/* Koi pond */}
      <ellipse cx="100" cy="155" rx="50" ry="12" fill="rgba(0,100,160,0.3)" />
      <ellipse cx="100" cy="155" rx="45" ry="9" fill="rgba(0,191,255,0.1)" stroke="rgba(0,191,255,0.2)" strokeWidth="0.5" />
      {/* Koi reflections */}
      <ellipse cx="85" cy="157" rx="8" ry="3" fill="rgba(255,100,0,0.3)" />
      <ellipse cx="115" cy="154" rx="7" ry="2" fill="rgba(255,255,255,0.2)" />
    </svg>
  );
}

// ── Data Penguin ─────────────────────────────────────────────

function DataPenguin({ primaryColor, style }: { primaryColor: string; style: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 200 180" xmlns="http://www.w3.org/2000/svg" style={style} className="w-full h-full">
      {/* Matrix bg lines */}
      {[30, 50, 70, 100, 130, 160].map((x, i) => (
        <text key={i} x={x} y={60 + (i * 20) % 80} fontSize="8" fill="rgba(50,205,50,0.3)" fontFamily="monospace">
          {['01', '10', '11', '00'][i % 4]}
        </text>
      ))}
      {/* Trench coat */}
      <path d="M65,95 Q60,130 55,165 L145,165 Q140,130 135,95 Z" fill="#111" stroke="rgba(50,205,50,0.3)" strokeWidth="1" />
      {/* Penguin body */}
      <ellipse cx="100" cy="120" rx="32" ry="38" fill="#1a1a1a" />
      <ellipse cx="100" cy="125" rx="22" ry="26" fill="#f5f5f5" />
      {/* Head */}
      <circle cx="100" cy="82" r="28" fill="#1a1a1a" />
      {/* White face patch */}
      <ellipse cx="100" cy="88" rx="18" ry="16" fill="#f0f0f0" />
      {/* Sunglasses */}
      <rect x="84" y="80" width="14" height="9" rx="4" fill="#111" stroke="rgba(50,205,50,0.8)" strokeWidth="1.5" />
      <rect x="102" y="80" width="14" height="9" rx="4" fill="#111" stroke="rgba(50,205,50,0.8)" strokeWidth="1.5" />
      <line x1="98" y1="84" x2="102" y2="84" stroke="rgba(50,205,50,0.8)" strokeWidth="1.5" />
      {/* Eyes visible above shades */}
      <circle cx="91" cy="78" r="2.5" fill="#32CD32" opacity="0.8" />
      <circle cx="109" cy="78" r="2.5" fill="#32CD32" opacity="0.8" />
      {/* Orange beak */}
      <polygon points="100,95 93,100 107,100" fill="#FF8C00" />
      {/* Flippers */}
      <ellipse cx="68" cy="120" rx="10" ry="20" fill="#111" transform="rotate(-15, 68, 120)" />
      <ellipse cx="132" cy="120" rx="10" ry="20" fill="#111" transform="rotate(15, 132, 120)" />
      {/* Terminal */}
      <rect x="115" y="105" width="45" height="35" rx="3" fill="#001400" stroke="rgba(50,205,50,0.5)" strokeWidth="1" />
      <text x="118" y="118" fontSize="6" fill="#32CD32" fontFamily="monospace">$ run</text>
      <text x="118" y="126" fontSize="6" fill="#32CD32" fontFamily="monospace">OK 100%</text>
      <text x="118" y="134" fontSize="6" fill="rgba(50,205,50,0.6)" fontFamily="monospace">██████</text>
    </svg>
  );
}

// ── Marketing Bear ───────────────────────────────────────────

function MarketingBear({ primaryColor, style }: { primaryColor: string; style: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 200 180" xmlns="http://www.w3.org/2000/svg" style={style} className="w-full h-full">
      {/* Desk */}
      <rect x="20" y="140" width="160" height="8" rx="2" fill="rgba(60,10,0,0.8)" />
      {/* Post-it notes */}
      <rect x="30" y="90" width="20" height="20" rx="1" fill="rgba(255,215,0,0.7)" transform="rotate(-8, 40, 100)" />
      <rect x="150" y="85" width="20" height="20" rx="1" fill="rgba(50,205,50,0.6)" transform="rotate(5, 160, 95)" />
      <rect x="155" y="115" width="18" height="18" rx="1" fill="rgba(255,100,100,0.6)" transform="rotate(-3, 164, 124)" />
      {/* Bear body */}
      <ellipse cx="100" cy="135" rx="35" ry="25" fill="#6B3A1A" />
      {/* Bear head */}
      <circle cx="100" cy="98" r="30" fill="#7A4520" />
      {/* Ears */}
      <circle cx="74" cy="73" r="12" fill="#6B3A1A" />
      <circle cx="126" cy="73" r="12" fill="#6B3A1A" />
      <circle cx="74" cy="73" r="7" fill="#4a2800" />
      <circle cx="126" cy="73" r="7" fill="#4a2800" />
      {/* Snout */}
      <ellipse cx="100" cy="108" rx="14" ry="10" fill="#5a3010" />
      <ellipse cx="100" cy="106" rx="5" ry="4" fill="#2a1000" />
      {/* Eyes */}
      <circle cx="88" cy="93" r="5" fill="#1a0800" />
      <circle cx="112" cy="93" r="5" fill="#1a0800" />
      <circle cx="89" cy="92" r="1.5" fill="rgba(255,255,255,0.6)" />
      <circle cx="113" cy="92" r="1.5" fill="rgba(255,255,255,0.6)" />
      {/* Megaphone */}
      <path d="M130,110 L145,100 L160,95 L155,115 L140,118 Z" fill="#FF4500" stroke="rgba(255,100,0,0.5)" strokeWidth="1" />
      <circle cx="128" cy="111" r="4" fill="#FF6347" />
      {/* Laptop */}
      <rect x="55" y="128" width="45" height="28" rx="2" fill="#1a0800" stroke="rgba(255,100,0,0.4)" strokeWidth="1" />
      <rect x="57" y="130" width="41" height="22" rx="1" fill="rgba(255,100,0,0.15)" />
      {/* Energy drink */}
      <rect x="145" y="118" width="12" height="20" rx="3" fill="#FF4500" />
      <rect x="146" y="120" width="10" height="6" rx="1" fill="rgba(255,255,255,0.2)" />
    </svg>
  );
}

// ── Librarian Quokka ─────────────────────────────────────────

function LibrarianQuokka({ primaryColor, style }: { primaryColor: string; style: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 200 180" xmlns="http://www.w3.org/2000/svg" style={style} className="w-full h-full">
      {/* Bookshelves */}
      <rect x="10" y="20" width="20" height="160" fill="rgba(40,10,60,0.6)" stroke="rgba(128,0,128,0.3)" strokeWidth="0.5" />
      <rect x="170" y="20" width="20" height="160" fill="rgba(40,10,60,0.6)" stroke="rgba(128,0,128,0.3)" strokeWidth="0.5" />
      {[40, 60, 80, 100, 120, 140].map((y, i) => (
        <rect key={i} x="12" y={y} width="16" height="14" rx="1" fill={['#4a1a00','#1a004a','#003a1a','#4a0020','#1a1a00','#002a40'][i]} opacity="0.8" />
      ))}
      {[40, 60, 80, 100, 120, 140].map((y, i) => (
        <rect key={i} x="172" y={y} width="16" height="14" rx="1" fill={['#003a1a','#4a0020','#4a1a00','#1a004a','#002a40','#1a1a00'][i]} opacity="0.8" />
      ))}
      {/* Desk */}
      <rect x="45" y="140" width="110" height="8" rx="2" fill="rgba(60,20,80,0.8)" stroke="rgba(187,68,255,0.3)" strokeWidth="1" />
      {/* Amber lamp */}
      <line x1="155" y1="80" x2="155" y2="140" stroke="rgba(255,180,60,0.4)" strokeWidth="1.5" />
      <ellipse cx="155" cy="80" rx="16" ry="8" fill="rgba(255,180,60,0.6)" />
      <circle cx="155" cy="110" r="20" fill="rgba(255,180,60,0.08)" />
      {/* Open book on desk */}
      <path d="M75,138 Q100,132 125,138 L125,150 Q100,146 75,150 Z" fill="#2a0a3a" stroke="rgba(187,68,255,0.4)" strokeWidth="1" />
      <line x1="100" y1="133" x2="100" y2="150" stroke="rgba(187,68,255,0.3)" strokeWidth="0.5" />
      {/* Quokka body */}
      <ellipse cx="100" cy="128" rx="22" ry="18" fill="#C8965A" />
      {/* Quokka head */}
      <circle cx="100" cy="104" r="22" fill="#D4A060" />
      {/* Ears */}
      <ellipse cx="82" cy="86" rx="8" ry="12" fill="#C8965A" />
      <ellipse cx="118" cy="86" rx="8" ry="12" fill="#C8965A" />
      <ellipse cx="82" cy="86" rx="5" ry="8" fill="rgba(255,180,180,0.3)" />
      <ellipse cx="118" cy="86" rx="5" ry="8" fill="rgba(255,180,180,0.3)" />
      {/* Signature smile */}
      <path d="M88,113 Q100,122 112,113" fill="none" stroke="#4a2000" strokeWidth="2" strokeLinecap="round" />
      {/* Eyes with spectacles */}
      <circle cx="91" cy="103" r="6" fill="#2a1000" />
      <circle cx="109" cy="103" r="6" fill="#2a1000" />
      <circle cx="92" cy="102" r="2" fill="rgba(255,255,255,0.5)" />
      <circle cx="110" cy="102" r="2" fill="rgba(255,255,255,0.5)" />
      {/* Spectacle frames */}
      <circle cx="91" cy="103" r="7" fill="none" stroke="rgba(255,215,0,0.7)" strokeWidth="1.5" />
      <circle cx="109" cy="103" r="7" fill="none" stroke="rgba(255,215,0,0.7)" strokeWidth="1.5" />
      <line x1="98" y1="103" x2="102" y2="103" stroke="rgba(255,215,0,0.7)" strokeWidth="1.5" />
      <line x1="80" y1="100" x2="84" y2="103" stroke="rgba(255,215,0,0.5)" strokeWidth="1" />
      <line x1="116" y1="103" x2="120" y2="100" stroke="rgba(255,215,0,0.5)" strokeWidth="1" />
      {/* Nose */}
      <ellipse cx="100" cy="110" rx="3" ry="2" fill="#4a2000" />
      {/* Paw on book */}
      <ellipse cx="85" cy="142" rx="8" ry="5" fill="#C8965A" />
    </svg>
  );
}

// ── Guardian Mastiff ─────────────────────────────────────────

function GuardianMastiff({ primaryColor, style }: { primaryColor: string; style: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 200 180" xmlns="http://www.w3.org/2000/svg" style={style} className="w-full h-full">
      {/* SOC background hex grid */}
      <rect x="0" y="0" width="200" height="180" fill="rgba(10,8,0,0.9)" />
      {/* Holographic readouts */}
      <rect x="10" y="20" width="40" height="25" rx="2" fill="rgba(200,150,12,0.1)" stroke="rgba(200,150,12,0.3)" strokeWidth="0.5" />
      <rect x="150" y="20" width="40" height="25" rx="2" fill="rgba(200,150,12,0.1)" stroke="rgba(200,150,12,0.3)" strokeWidth="0.5" />
      <text x="15" y="30" fontSize="5" fill="rgba(200,150,12,0.6)" fontFamily="monospace">SHIELD:ON</text>
      <text x="15" y="37" fontSize="5" fill="rgba(200,150,12,0.6)" fontFamily="monospace">THREAT:0</text>
      <text x="155" y="30" fontSize="5" fill="rgba(200,150,12,0.6)" fontFamily="monospace">API:OK</text>
      <text x="155" y="37" fontSize="5" fill="rgba(200,150,12,0.6)" fontFamily="monospace">TOKENS:</text>
      {/* Massive body */}
      <ellipse cx="100" cy="145" rx="50" ry="30" fill="#1a1000" />
      {/* Thick fur mane */}
      {[-35,-25,-15,0,15,25,35].map((dx, i) => (
        <ellipse key={i} cx={100 + dx} cy={105 + Math.abs(dx) * 0.3} rx="16" ry="22" fill="#2a1800" />
      ))}
      {/* Head */}
      <circle cx="100" cy="88" r="36" fill="#2a1800" />
      <circle cx="100" cy="90" r="28" fill="#3a2200" />
      {/* Heavy jowls */}
      <ellipse cx="80" cy="102" rx="16" ry="10" fill="#2a1800" />
      <ellipse cx="120" cy="102" rx="16" ry="10" fill="#2a1800" />
      {/* Eyes — calm, amber */}
      <circle cx="88" cy="82" r="8" fill="#1a0f00" />
      <circle cx="112" cy="82" r="8" fill="#1a0f00" />
      <circle cx="88" cy="82" r="5" fill="#C8960C" />
      <circle cx="112" cy="82" r="5" fill="#C8960C" />
      <circle cx="88" cy="82" r="2.5" fill="#0a0600" />
      <circle cx="112" cy="82" r="2.5" fill="#0a0600" />
      <circle cx="89" cy="81" r="1" fill="rgba(255,255,255,0.4)" />
      <circle cx="113" cy="81" r="1" fill="rgba(255,255,255,0.4)" />
      {/* Snout */}
      <rect x="88" y="93" width="24" height="18" rx="6" fill="#2a1800" />
      <ellipse cx="100" cy="97" rx="8" ry="5" fill="#1a0a00" />
      {/* Wrinkle lines */}
      <path d="M88,85 Q82,80 80,75" fill="none" stroke="rgba(60,40,0,0.6)" strokeWidth="1" />
      <path d="M112,85 Q118,80 120,75" fill="none" stroke="rgba(60,40,0,0.6)" strokeWidth="1" />
      {/* Gold warning glow */}
      <circle cx="100" cy="90" r="50" fill="rgba(200,150,12,0.06)" />
      {/* Shield hologram */}
      <polygon points="100,50 120,60 120,78 100,88 80,78 80,60" fill="none" stroke="rgba(200,150,12,0.4)" strokeWidth="1" />
    </svg>
  );
}
