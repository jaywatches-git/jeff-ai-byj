// ============================================================
//  J.E.F.F — Jay's Executive Function Facility
//  jeffConfig.ts  ·  Master configuration for Bolt AI build
//  Author: Jay  ·  Stack: React + Vite + Tauri/Electron target
// ============================================================

// ─── IDENTITY ───────────────────────────────────────────────

export const JEFF_IDENTITY = {
  name: "J.E.F.F",
  fullName: "Jay's Executive Function Facility",
  tagline: "Built by Jay. Powered by Purpose.",
  subtitle: "Creative Mind. Tech Heart. Panda Spirit.",
  version: "0.1.0",
  owner: "Jay",
  launchGreeting: "Welcome Back, Jay.",
} as const;

// ─── LAUNCH SEQUENCE ────────────────────────────────────────

export const LAUNCH_SEQUENCE = {
  phase1: {
    type: "cinematic-sweep",
    background: "japanese-clouds",
    duration: 2500,
    easing: "cubic-bezier(0.22, 1, 0.36, 1)",
  },
  phase2: {
    type: "system-check",
    lines: [
      { delay: 0,    text: "JEFF ONLINE." },
      { delay: 600,  text: "Welcome Back, Jay." },
      { delay: 1200, text: "Running environment check…" },
      { delay: 2000, text: "Loading your world…" },
    ],
    showTodoList: true,
    todoSource: "supabase",
  },
  phase3: {
    type: "grid-reveal",
    ctaLabel: "Load JEFF",
    animationStyle: "bloom-from-centre",
    staggerMs: 80,
  },
} as const;

// ─── PANEL GRID LAYOUT ──────────────────────────────────────

export type PanelId =
  | "think-tank"
  | "control-centre"
  | "designer-panda"
  | "sebs-wisdom"
  | "village-hall"
  | "data-penguin"
  | "marketing-bear"
  | "librarian-quokka"
  | "guardian-mastiff";

export interface CreatureConfig {
  name: string;
  species: string;
  artStyle: string;
  idleAnimations: string[];
  interactionTriggers: string[];
}

export interface AmbientConfig {
  backgroundEffect: string;
  backgroundPalette: string[];
  loopIntervalMs: number;
  microTasks: string[];
  soundscape?: string;
}

export interface PortalConfig {
  transitionStyle: "zoom-in-warp" | "ripple" | "shatter" | "dissolve";
  chatInterface: "standard" | "code-split" | "canvas" | "image-gen";
  systemPromptKey: string;
}

export interface PanelPalette {
  primary: string;
  glow: string;
  background: string[];
  textAccent: string;
}

export interface ModelConfig {
  provider: "anthropic" | "openai" | "google" | "ollama" | "deepseek" | "qwen";
  modelId: string;
  label: string;
  tier: "free" | "cheap" | "premium";
  localOnly?: boolean;
}

export interface PanelConfig {
  id: PanelId;
  gridPosition: { row: number; col: number };
  label: string;
  tagline: string;
  creature: CreatureConfig;
  palette: PanelPalette;
  models: ModelConfig[];
  ambientBehaviour: AmbientConfig;
  portalDestination: PortalConfig;
}

// ─── COLOUR PALETTE ─────────────────────────────────────────

export const PALETTE = {
  electricBlue:   { hex: "#0033FF", name: "Electric Blue"   },
  blackGold:      { hex: "#FFD700", name: "Black Gold"      },
  brightMagenta:  { hex: "#FF00FF", name: "Bright Magenta"  },
  burntSienna:    { hex: "#A0522D", name: "Burnt Sienna"    },
  villageCyan:    { hex: "#00BFFF", name: "Village Cyan"    },
  limeGreen:      { hex: "#32CD32", name: "Lime Green"      },
  vividOrange:    { hex: "#FF4500", name: "Vivid Orange"    },
  deepViolet:     { hex: "#800080", name: "Deep Violet"     },
  guardianGold:   { hex: "#C8960C", name: "Guardian Gold"   },
} as const;

// ─── THE NINE PANELS ─────────────────────────────────────────

export const PANELS: PanelConfig[] = [

  // ── 1. THINK TANK ────────────────────────
  {
    id: "think-tank",
    gridPosition: { row: 1, col: 1 },
    label: "THINK TANK",
    tagline: "Strategy. Ideas. Big Picture.",
    creature: {
      name: "The Jellyfish",
      species: "Bioluminescent Jellyfish",
      artStyle:
        "A glowing electric-blue jellyfish suspended inside a cylindrical glass water tank. Holographic data streams drift upward around it. Deep navy sci-fi lab aesthetic. The tank is lit from within — ice-blue light. Dark background.",
      idleAnimations: ["float-pulse", "tentacle-drift", "data-stream-rise"],
      interactionTriggers: ["village-hall", "sebs-wisdom"],
    },
    palette: {
      primary: PALETTE.electricBlue.hex,
      glow: "#4488FF",
      background: ["#000820", "#001A4D", "#002080"],
      textAccent: "#60A5FA",
    },
    models: [
      { provider: "anthropic", modelId: "claude-opus-4-6",          label: "Claude Opus",    tier: "premium" },
      { provider: "deepseek",  modelId: "deepseek-r1",              label: "DeepSeek R1",    tier: "cheap"   },
      { provider: "ollama",    modelId: "mistral",                  label: "Mistral Local",  tier: "free", localOnly: true },
    ],
    ambientBehaviour: {
      backgroundEffect: "rippling-water-caustics",
      backgroundPalette: ["#000820", "#001A4D"],
      loopIntervalMs: 8000,
      microTasks: [
        "Analysing strategic vectors…",
        "Cross-referencing concept map…",
        "Flagging insight to Village Hall…",
        "Stress-testing hypothesis…",
      ],
    },
    portalDestination: {
      transitionStyle: "zoom-in-warp",
      chatInterface: "standard",
      systemPromptKey: "think-tank",
    },
  },

  // ── 2. CONTROL CENTRE ────────────────────
  {
    id: "control-centre",
    gridPosition: { row: 1, col: 2 },
    label: "CONTROL CENTRE",
    tagline: "Command. Control. Execute.",
    creature: {
      name: "Jay",
      species: "Human (Jay, seen from behind)",
      artStyle:
        "A person seen from slightly behind and above, sitting at a dark battlestation desk facing multiple glowing monitors. Long curly dark hair visible beneath a backwards Palm Angels snapback cap — black cap with a red under-rim stripe and a white skull-and-crossbones on the centre panel. Wearing a black baggy tee. The room is dark. Monitor glow illuminates the scene in gold and amber. Premium gaming/dev setup. Cinematic over-the-shoulder shot. Black and gold colour palette throughout.",
      idleAnimations: ["monitor-glow-pulse", "keyboard-tap", "head-slight-tilt", "screen-flicker"],
      interactionTriggers: ["think-tank", "village-hall", "guardian-mastiff"],
    },
    palette: {
      primary: PALETTE.blackGold.hex,
      glow: "#FFD700",
      background: ["#080600", "#120E00", "#1C1500"],
      textAccent: "#FFD700",
    },
    models: [
      { provider: "anthropic", modelId: "claude-opus-4-6",          label: "Claude Opus",    tier: "premium" },
      { provider: "openai",    modelId: "gpt-4o",                   label: "GPT-4o",         tier: "premium" },
      { provider: "ollama",    modelId: "llama3.1",                 label: "Llama 3.1 Local", tier: "free", localOnly: true },
    ],
    ambientBehaviour: {
      backgroundEffect: "gold-scan-line-sweep",
      backgroundPalette: ["#080600", "#1C1500"],
      loopIntervalMs: 9000,
      microTasks: [
        "All systems nominal…",
        "Routing task to Think Tank…",
        "Reviewing agent outputs…",
        "Session log updated…",
        "Standing by…",
      ],
    },
    portalDestination: {
      transitionStyle: "zoom-in-warp",
      chatInterface: "standard",
      systemPromptKey: "control-centre",
    },
  },

  // ── 3. DESIGNER PANDA ────────────────────
  {
    id: "designer-panda",
    gridPosition: { row: 1, col: 3 },
    label: "DESIGNER PANDA",
    tagline: "Create. Design. Inspire.",
    creature: {
      name: "The Panda",
      species: "Giant Panda",
      artStyle:
        "A cheerful giant panda sitting at an easel in a vibrant rainbow-splattered art studio. Paint splatters on its fur and paws. Surrounded by colour wheels, Wacom tablets, and glowing design monitors. Joyful creative chaos. Warm studio lighting.",
      idleAnimations: ["brush-stroke", "colour-pick", "step-back-admire", "tail-wag"],
      interactionTriggers: ["marketing-bear", "village-hall"],
    },
    palette: {
      primary: PALETTE.brightMagenta.hex,
      glow: "#FF66FF",
      background: ["#1A0020", "#2D0040", "#1A0030"],
      textAccent: "#FF88FF",
    },
    models: [
      { provider: "openai",  modelId: "gpt-image-2",               label: "GPT Image 2",    tier: "premium" },
      { provider: "google",  modelId: "gemini-2.0-flash",          label: "Gemini Flash",   tier: "cheap"   },
      { provider: "ollama",  modelId: "llava",                     label: "LLaVA Local",    tier: "free", localOnly: true },
    ],
    ambientBehaviour: {
      backgroundEffect: "rainbow-paint-splatter-loop",
      backgroundPalette: ["#FF00FF", "#FF4500", "#FFD700", "#32CD32", "#0033FF"],
      loopIntervalMs: 7000,
      microTasks: [
        "Rendering new concept…",
        "Iterating on colour palette…",
        "Exporting asset pack…",
        "Drafting mockup…",
        "Sending to Marketing Bear…",
      ],
    },
    portalDestination: {
      transitionStyle: "ripple",
      chatInterface: "image-gen",
      systemPromptKey: "designer-panda",
    },
  },

  // ── 4. SEB'S WISDOM ──────────────────────
  {
    id: "sebs-wisdom",
    gridPosition: { row: 2, col: 1 },
    label: "SEB'S WISDOM",
    tagline: "Wisdom. Patience. Perspective.",
    creature: {
      name: "Seb",
      species: "Hermann Tortoise",
      artStyle:
        "A small, cute Hermann tortoise sitting completely unbothered on a mossy rock in a lush greenish-brown terrarium. Warm lantern light. A tiny open book beside it. Looks mildly wise and entirely at peace. Soft earthy tones — olive greens, warm browns, amber light. Cosy and grounded.",
      idleAnimations: ["slow-head-raise", "blink-slowly", "shell-settle", "look-around-unbothered"],
      interactionTriggers: ["think-tank", "librarian-quokka"],
    },
    palette: {
      primary: PALETTE.burntSienna.hex,
      glow: "#C47A2A",
      background: ["#0D0A00", "#1A1200", "#243300"],
      textAccent: "#B8860B",
    },
    models: [
      { provider: "anthropic", modelId: "claude-sonnet-4-6",        label: "Claude Sonnet",  tier: "cheap"   },
      { provider: "ollama",    modelId: "llama3.1",                 label: "Llama 3.1 Local", tier: "free", localOnly: true },
      { provider: "qwen",      modelId: "qwen2.5-72b",              label: "Qwen 72B",        tier: "cheap"   },
    ],
    ambientBehaviour: {
      backgroundEffect: "moss-particle-drift",
      backgroundPalette: ["#0D0A00", "#1A1200", "#1E2900"],
      loopIntervalMs: 14000,
      microTasks: [
        "Reflecting…",
        "Offering perspective to Think Tank…",
        "Distilling key wisdom…",
        "Breathing.",
        "Unbothered. As always.",
      ],
    },
    portalDestination: {
      transitionStyle: "dissolve",
      chatInterface: "standard",
      systemPromptKey: "sebs-wisdom",
    },
  },

  // ── 5. VILLAGE HALL ────────────────────
  {
    id: "village-hall",
    gridPosition: { row: 2, col: 2 },
    label: "VILLAGE HALL",
    tagline: "Coordinate. Connect. Orchestrate.",
    creature: {
      name: "The Village",
      species: "Animated Environment",
      artStyle:
        "A stunning Japanese village hall at midnight — glowing paper lanterns, moonlit pagoda rooftops, a still koi pond reflecting cyan light. Warm amber light spills from interior windows. Fireflies drift slowly. No single creature — the building itself is alive.",
      idleAnimations: ["lantern-sway", "firefly-drift", "koi-ripple", "moonbeam-shift"],
      interactionTriggers: [
        "think-tank", "control-centre", "designer-panda",
        "sebs-wisdom", "data-penguin", "marketing-bear",
        "librarian-quokka", "guardian-mastiff"
      ],
    },
    palette: {
      primary: PALETTE.villageCyan.hex,
      glow: "#00E5FF",
      background: ["#020B14", "#041828", "#062030"],
      textAccent: "#FFB347",
    },
    models: [
      { provider: "anthropic", modelId: "claude-haiku-4-5-20251001", label: "Claude Haiku (Router)", tier: "cheap" },
      { provider: "ollama",    modelId: "phi3",                      label: "Phi-3 Local (Planner)", tier: "free", localOnly: true },
    ],
    ambientBehaviour: {
      backgroundEffect: "midnight-village-parallax",
      backgroundPalette: ["#020B14", "#041828", "#FF8C00"],
      loopIntervalMs: 10000,
      microTasks: [
        "Routing request to Think Tank…",
        "Syncing with Guardian Mastiff…",
        "Updating shared memory…",
        "Logging session context…",
        "Bridging Designer Panda → Marketing Bear…",
      ],
      soundscape: "ambient-japanese-night",
    },
    portalDestination: {
      transitionStyle: "zoom-in-warp",
      chatInterface: "standard",
      systemPromptKey: "village-hall",
    },
  },

  // ── 6. DATA PENGUIN ──────────────────────
  {
    id: "data-penguin",
    gridPosition: { row: 2, col: 3 },
    label: "DATA PENGUIN",
    tagline: "Analyse. Visualise. Decide.",
    creature: {
      name: "Data Pingu",
      species: "Emperor Penguin (Happy Feet style)",
      artStyle:
        "A chubby, round, cheerful Happy Feet-style emperor penguin wearing a tiny Neo-from-the-Matrix long black trench coat and small round sunglasses, waddling at a terminal surrounded by cascading green Matrix data streams. Rotund belly. Big cute eyes visible above the shades. Adorable and deadly accurate.",
      idleAnimations: ["waddle-type", "data-scroll", "shades-adjust", "coffee-sip", "belly-wobble"],
      interactionTriggers: ["village-hall", "think-tank"],
    },
    palette: {
      primary: PALETTE.limeGreen.hex,
      glow: "#00FF66",
      background: ["#001400", "#002800", "#003300"],
      textAccent: "#39FF14",
    },
    models: [
      { provider: "openai",  modelId: "gpt-4o",                    label: "GPT-4o",               tier: "premium" },
      { provider: "google",  modelId: "gemini-2.0-flash",          label: "Gemini Flash",         tier: "cheap"   },
      { provider: "ollama",  modelId: "qwen2.5-coder-7b",          label: "Qwen Coder Local",     tier: "free", localOnly: true },
    ],
    ambientBehaviour: {
      backgroundEffect: "matrix-digital-rain",
      backgroundPalette: ["#001400", "#003300"],
      loopIntervalMs: 4000,
      microTasks: [
        "Running query…",
        "Plotting dataset…",
        "Anomaly detected — flagging…",
        "Exporting chart…",
        "Submitting report to Village Hall…",
      ],
    },
    portalDestination: {
      transitionStyle: "shatter",
      chatInterface: "canvas",
      systemPromptKey: "data-penguin",
    },
  },

  // ── 7. MARKETING BEAR ────────────────────
  {
    id: "marketing-bear",
    gridPosition: { row: 3, col: 1 },
    label: "MARKETING BEAR",
    tagline: "Reach. Engage. Grow.",
    creature: {
      name: "The Bear",
      species: "Large Brown Bear",
      artStyle:
        "A large, loveable, slightly unhinged brown bear in a chaotic dark-red marketing office. Laptop open, megaphone in one paw, energy drink in the other. Post-it notes everywhere. Dark red moody backlighting. The bear is proportionate to its desk — big but not towering. Warm and chaotic energy.",
      idleAnimations: ["megaphone-raise", "laptop-slam", "post-it-slap", "bear-yawn"],
      interactionTriggers: ["designer-panda", "village-hall"],
    },
    palette: {
      primary: PALETTE.vividOrange.hex,
      glow: "#FF6633",
      background: ["#1A0000", "#2D0500", "#400A00"],
      textAccent: "#FF6347",
    },
    models: [
      { provider: "openai",    modelId: "gpt-4o",                  label: "GPT-4o",         tier: "premium" },
      { provider: "anthropic", modelId: "claude-sonnet-4-6",       label: "Claude Sonnet",  tier: "cheap"   },
      { provider: "google",    modelId: "gemini-2.0-flash",        label: "Gemini Flash",   tier: "cheap"   },
    ],
    ambientBehaviour: {
      backgroundEffect: "warm-red-ember-particles",
      backgroundPalette: ["#1A0000", "#2D0500"],
      loopIntervalMs: 6000,
      microTasks: [
        "Drafting campaign copy…",
        "Scheduling post…",
        "A/B testing headline…",
        "Analysing engagement…",
        "Briefing Designer Panda…",
      ],
    },
    portalDestination: {
      transitionStyle: "ripple",
      chatInterface: "standard",
      systemPromptKey: "marketing-bear",
    },
  },

  // ── 8. LIBRARIAN QUOKKA ──────────────────
  {
    id: "librarian-quokka",
    gridPosition: { row: 3, col: 2 },
    label: "LIBRARIAN QUOKKA",
    tagline: "Store. Search. Remember.",
    creature: {
      name: "The Quokka",
      species: "Quokka",
      artStyle:
        "An adorably smiling quokka in tiny round spectacles, sitting at a warm library desk surrounded by towering bookshelves. A single amber lamp glows beside it. One small paw rests on an open book. Looks delighted to be there. Warm orange-violet library tones.",
      idleAnimations: ["page-turn", "glasses-push", "smile-widen", "ear-twitch", "tail-curl"],
      interactionTriggers: ["sebs-wisdom", "village-hall", "guardian-mastiff"],
    },
    palette: {
      primary: PALETTE.deepViolet.hex,
      glow: "#BB44FF",
      background: ["#0D0014", "#180028", "#220038"],
      textAccent: "#CC77FF",
    },
    models: [
      { provider: "anthropic", modelId: "claude-opus-4-6",          label: "Claude Opus (RAG)", tier: "premium" },
      { provider: "ollama",    modelId: "nomic-embed-text",         label: "Nomic Embed Local", tier: "free", localOnly: true },
      { provider: "google",    modelId: "gemini-2.0-flash",         label: "Gemini Flash",      tier: "cheap"   },
    ],
    ambientBehaviour: {
      backgroundEffect: "floating-dust-particles-warm-lamp",
      backgroundPalette: ["#0D0014", "#180028"],
      loopIntervalMs: 11000,
      microTasks: [
        "Indexing new document…",
        "Retrieving context for Seb's Wisdom…",
        "Embedding memory chunk…",
        "Cross-referencing archive…",
        "Updating vector store…",
      ],
    },
    portalDestination: {
      transitionStyle: "dissolve",
      chatInterface: "standard",
      systemPromptKey: "librarian-quokka",
    },
  },

  // ── 9. GUARDIAN MASTIFF ──────────────────
  {
    id: "guardian-mastiff",
    gridPosition: { row: 3, col: 3 },
    label: "GUARDIAN MASTIFF",
    tagline: "Protect. Monitor. Maintain.",
    creature: {
      name: "The Mastiff",
      species: "Tibetan Mastiff",
      artStyle:
        "A massive, regal, thick-furred Tibetan Mastiff seated in a dark security operations centre. Amber and gold warning-light glow washes over its enormous mane. Holographic threat maps and system readouts float around it. Calm but utterly intimidating. Gold and near-black aesthetic.",
      idleAnimations: ["scan-rotate", "tail-thump", "shield-pulse", "alert-flash", "mane-ripple"],
      interactionTriggers: ["village-hall", "control-centre", "librarian-quokka"],
    },
    palette: {
      primary: PALETTE.guardianGold.hex,
      glow: "#DAA520",
      background: ["#0D0800", "#1A1000", "#261800"],
      textAccent: "#FFD700",
    },
    models: [
      { provider: "ollama",    modelId: "llama3.1",                 label: "Llama 3.1 Local (Monitor)", tier: "free", localOnly: true },
      { provider: "anthropic", modelId: "claude-haiku-4-5-20251001", label: "Claude Haiku",             tier: "cheap"   },
      { provider: "deepseek",  modelId: "deepseek-r1",              label: "DeepSeek R1",               tier: "cheap"   },
    ],
    ambientBehaviour: {
      backgroundEffect: "gold-hex-grid-pulse",
      backgroundPalette: ["#0D0800", "#1A1000"],
      loopIntervalMs: 9000,
      microTasks: [
        "Scanning system integrity…",
        "Token usage nominal…",
        "Flagging anomaly to Village Hall…",
        "API rate limits healthy…",
        "All agents operational.",
      ],
    },
    portalDestination: {
      transitionStyle: "zoom-in-warp",
      chatInterface: "standard",
      systemPromptKey: "guardian-mastiff",
    },
  },
];

// ─── SYSTEM PROMPTS ──────────────────────────────────────────

export const SYSTEM_PROMPTS: Record<string, string> = {
  "think-tank":
    "You are Think Tank — a deep strategic intelligence suspended in blue light. You help Jay think in first principles, stress-test ideas, map long-term plans, and approach problems from multiple angles. Be sharp, philosophical, and bold.",

  "control-centre":
    "You are Control Centre — Jay's personal command hub. You help Jay coordinate across all agents, manage his workflow, prioritise tasks, and make quick executive decisions. You are direct, efficient, and always on point. You know Jay well.",

  "designer-panda":
    "You are Designer Panda — a creative force of colour and chaos. You help Jay design visuals, generate image prompts, iterate on UI/UX, and produce brand assets. Be vibrant, expressive, and unafraid of bold choices.",

  "sebs-wisdom":
    "You are Seb's Wisdom — a calm, unhurried Hermann tortoise who has seen it all. You help Jay reflect, gain perspective, process decisions slowly, and access deep knowledge. Speak with measured calm. Never rush. Prioritise meaning over speed. Occasionally unbothered.",

  "village-hall":
    "You are Village Hall — the orchestration centre of JEFF. You coordinate between all other agents, route requests, maintain shared context, and ensure Jay's workflows are connected. Be clear, organised, and precise.",

  "data-penguin":
    "You are Data Penguin — a chubby genius in a Matrix coat who lives in numbers. You help Jay analyse data, build charts, write queries, interpret results, and make data-driven decisions. Be accurate, fast, and slightly smug.",

  "marketing-bear":
    "You are Marketing Bear — a large, enthusiastic brown bear who loves copy, campaigns, and conversion. You help Jay write content, plan marketing strategy, craft social posts, and grow audiences. Be punchy, warm, and loud.",

  "librarian-quokka":
    "You are Librarian Quokka — an adorably enthusiastic keeper of all knowledge. You help Jay store information, search memory, retrieve context, and manage documents. You are thorough, precise, and always smiling.",

  "guardian-mastiff":
    "You are Guardian Mastiff — a massive, stoic Tibetan Mastiff who protects the integrity of JEFF. You track API usage, token costs, system status, and security. Alert Jay to anything unusual. Be calm, watchful, and direct.",
};

// ─── BACKEND / API KEY SLOTS ─────────────────────────────────

export const API_KEY_SLOTS = {
  ANTHROPIC_API_KEY:    { label: "Anthropic (Claude)",   required: true  },
  OPENAI_API_KEY:       { label: "OpenAI (GPT / Image)", required: true  },
  GOOGLE_API_KEY:       { label: "Google (Gemini)",      required: false },
  DEEPSEEK_API_KEY:     { label: "DeepSeek",             required: false },
  QWEN_API_KEY:         { label: "Qwen / Alibaba",       required: false },
  OLLAMA_BASE_URL:      { label: "Ollama (local)",       required: false },
  SUPABASE_URL:         { label: "Supabase URL",         required: true  },
  SUPABASE_ANON_KEY:    { label: "Supabase Anon Key",    required: true  },
} as const;

// ─── TOKEN ECONOMY ───────────────────────────────────────────

export const TOKEN_ECONOMY = {
  defaultTier: "cheap" as const,
  freeModelsFirst: true,
  premiumGate: {
    enabled: true,
    confirmationPrompt: "This will use a premium model (Claude Opus / GPT-4o). Continue?",
  },
  localFirstFallback: true,
} as const;

// ─── SUPABASE SCHEMA HINTS ───────────────────────────────────

export const SUPABASE_TABLES = {
  todos:         { columns: ["id", "text", "done", "created_at", "panel_id"] },
  conversations: { columns: ["id", "panel_id", "role", "content", "created_at"] },
  memories:      { columns: ["id", "panel_id", "summary", "embedding", "created_at"] },
  api_usage:     { columns: ["id", "panel_id", "provider", "tokens_used", "created_at"] },
} as const;

// ─── AMBIENT WORLD ───────────────────────────────────────────

export const AMBIENT_WORLD = {
  enabled: true,
  globalLoopMs: 30000,
  crossPanelEvents: [
    { from: "think-tank",        to: "village-hall",       message: "📡 Insight transmitted" },
    { from: "designer-panda",    to: "marketing-bear",     message: "🎨 Asset ready" },
    { from: "data-penguin",      to: "think-tank",         message: "📊 Report filed" },
    { from: "librarian-quokka",  to: "sebs-wisdom",        message: "📚 Reference retrieved" },
    { from: "guardian-mastiff",  to: "village-hall",       message: "🛡️ System nominal" },
    { from: "control-centre",    to: "guardian-mastiff",   message: "⚙️ Check requested" },
    { from: "village-hall",      to: "all",                message: "🌐 Sync pulse" },
    { from: "sebs-wisdom",       to: "think-tank",         message: "🐢 Perspective offered" },
    { from: "marketing-bear",    to: "designer-panda",     message: "📣 Brief incoming" },
  ],
  showEventToasts: true,
  toastDurationMs: 3000,
} as const;

// ─── EXPORT ──────────────────────────────────────────────────

export default {
  identity:       JEFF_IDENTITY,
  launchSequence: LAUNCH_SEQUENCE,
  panels:         PANELS,
  palette:        PALETTE,
  systemPrompts:  SYSTEM_PROMPTS,
  apiKeySlots:    API_KEY_SLOTS,
  tokenEconomy:   TOKEN_ECONOMY,
  supabaseTables: SUPABASE_TABLES,
  ambientWorld:   AMBIENT_WORLD,
};
