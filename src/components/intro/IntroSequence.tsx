import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LAUNCH_SEQUENCE, JEFF_IDENTITY } from '../../jeffConfig';
import { supabase } from '../../lib/supabase';
import type { Todo } from '../../lib/supabase';

interface IntroSequenceProps {
  onComplete: () => void;
}

export default function IntroSequence({ onComplete }: IntroSequenceProps) {
  const [phase, setPhase] = useState<1 | 2 | 3>(1);
  const [visibleLines, setVisibleLines] = useState<number[]>([]);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [ctaVisible, setCtaVisible] = useState(false);

  useEffect(() => {
    // Phase 1 → Phase 2 after cloud animation
    const t = setTimeout(() => setPhase(2), LAUNCH_SEQUENCE.phase1.duration);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (phase !== 2) return;

    const lines = LAUNCH_SEQUENCE.phase2.lines;
    lines.forEach((line, i) => {
      setTimeout(() => {
        setVisibleLines(prev => [...prev, i]);
      }, line.delay);
    });

    // Fetch todos
    const lastDelay = lines[lines.length - 1].delay;
    setTimeout(async () => {
      const { data } = await supabase
        .from('todos')
        .select('*')
        .eq('done', false)
        .order('created_at', { ascending: false })
        .limit(5);
      if (data) setTodos(data as Todo[]);
    }, lastDelay + 300);

    // Show CTA
    setTimeout(() => {
      setCtaVisible(true);
    }, lastDelay + 1200);
  }, [phase]);

  return (
    <div className="relative w-full h-full overflow-hidden" style={{ background: '#020B14' }}>
      {/* Cloud layers — Japanese ink-wash parallax */}
      <CloudLayers />

      {/* Phase 2: typewriter + todos */}
      <AnimatePresence>
        {phase >= 2 && (
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center z-10 px-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="max-w-2xl w-full">
              {/* Typewriter lines */}
              <div className="mb-8 space-y-2">
                {LAUNCH_SEQUENCE.phase2.lines.map((line, i) => (
                  <AnimatePresence key={i}>
                    {visibleLines.includes(i) && (
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4 }}
                        className={`font-display tracking-widest ${
                          i === 0
                            ? 'text-3xl font-bold text-cyan-300'
                            : i === 1
                            ? 'text-xl text-amber-300'
                            : 'text-sm text-slate-400'
                        }`}
                        style={{ fontFamily: 'Orbitron, Rajdhani, sans-serif' }}
                      >
                        <TypewriterText text={line.text} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                ))}
              </div>

              {/* Todo list */}
              <AnimatePresence>
                {todos.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="mb-8 border border-cyan-900/40 rounded-xl p-4"
                    style={{ background: 'rgba(0,191,255,0.05)' }}
                  >
                    <p className="text-xs text-cyan-500 uppercase tracking-widest mb-3 font-display">
                      Today's Active Tasks
                    </p>
                    <ul className="space-y-1.5">
                      {todos.map((todo) => (
                        <motion.li
                          key={todo.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="flex items-center gap-2 text-sm text-slate-300"
                        >
                          <span className="w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                          {todo.text}
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* CTA button */}
              <AnimatePresence>
                {ctaVisible && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="flex justify-center"
                  >
                    <button
                      onClick={onComplete}
                      className="relative px-10 py-4 rounded-full font-display font-bold text-lg tracking-widest uppercase transition-all duration-300 group"
                      style={{
                        background: 'rgba(0,191,255,0.1)',
                        border: '1px solid rgba(0,191,255,0.6)',
                        color: '#00BFFF',
                        fontFamily: 'Rajdhani, sans-serif',
                        boxShadow: '0 0 20px rgba(0,191,255,0.3), inset 0 0 20px rgba(0,191,255,0.05)',
                      }}
                      onMouseEnter={e => {
                        (e.currentTarget as HTMLButtonElement).style.boxShadow =
                          '0 0 40px rgba(0,191,255,0.6), inset 0 0 30px rgba(0,191,255,0.1)';
                      }}
                      onMouseLeave={e => {
                        (e.currentTarget as HTMLButtonElement).style.boxShadow =
                          '0 0 20px rgba(0,191,255,0.3), inset 0 0 20px rgba(0,191,255,0.05)';
                      }}
                    >
                      <span className="relative z-10">{LAUNCH_SEQUENCE.phase3.ctaLabel}</span>
                      <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{ background: 'radial-gradient(circle, rgba(0,191,255,0.15) 0%, transparent 70%)' }}
                      />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* JEFF logo overlay */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <JeffHexLogo size={56} />
          <p
            className="text-xs tracking-[0.3em] uppercase mt-2"
            style={{ color: 'rgba(0,191,255,0.5)', fontFamily: 'Rajdhani, sans-serif' }}
          >
            {JEFF_IDENTITY.fullName}
          </p>
        </motion.div>
      </div>
    </div>
  );
}

// ── Cloud layers ────────────────────────────────────────────

function CloudLayers() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Base deep sky gradient */}
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse at 50% 80%, #041018 0%, #020B14 100%)' }}
      />

      {/* Far cloud layer */}
      <div className="absolute inset-0 cloud-layer-far" style={{ opacity: 0.4 }}>
        <svg className="absolute w-[200%] h-full animate-cloud-drift" viewBox="0 0 2400 600" preserveAspectRatio="none">
          <defs>
            <filter id="blur-sm">
              <feGaussianBlur stdDeviation="8" />
            </filter>
          </defs>
          {/* Ink-wash cloud shapes */}
          <ellipse cx="200" cy="200" rx="300" ry="100" fill="rgba(20,40,80,0.6)" filter="url(#blur-sm)" />
          <ellipse cx="600" cy="150" rx="400" ry="120" fill="rgba(15,30,60,0.7)" filter="url(#blur-sm)" />
          <ellipse cx="1100" cy="180" rx="350" ry="90" fill="rgba(25,45,80,0.5)" filter="url(#blur-sm)" />
          <ellipse cx="1600" cy="160" rx="450" ry="110" fill="rgba(10,25,55,0.6)" filter="url(#blur-sm)" />
          <ellipse cx="2100" cy="200" rx="300" ry="100" fill="rgba(20,40,80,0.6)" filter="url(#blur-sm)" />
          {/* Repeat for seamless loop */}
          <ellipse cx="200" cy="200" rx="300" ry="100" fill="rgba(20,40,80,0.6)" filter="url(#blur-sm)" transform="translate(2400,0)" />
          <ellipse cx="600" cy="150" rx="400" ry="120" fill="rgba(15,30,60,0.7)" filter="url(#blur-sm)" transform="translate(2400,0)" />
        </svg>
      </div>

      {/* Mid cloud layer — slower drift */}
      <div className="absolute inset-0" style={{ opacity: 0.5 }}>
        <svg
          className="absolute w-[200%] h-full"
          viewBox="0 0 2400 600"
          preserveAspectRatio="none"
          style={{ animation: 'cloudDrift 30s linear infinite' }}
        >
          <defs>
            <filter id="blur-md">
              <feGaussianBlur stdDeviation="15" />
            </filter>
          </defs>
          <ellipse cx="350" cy="300" rx="500" ry="140" fill="rgba(5,15,40,0.8)" filter="url(#blur-md)" />
          <ellipse cx="900" cy="280" rx="600" ry="160" fill="rgba(8,20,50,0.7)" filter="url(#blur-md)" />
          <ellipse cx="1500" cy="320" rx="550" ry="130" fill="rgba(5,15,40,0.8)" filter="url(#blur-md)" />
          <ellipse cx="2100" cy="290" rx="480" ry="150" fill="rgba(10,25,60,0.6)" filter="url(#blur-md)" />
          <ellipse cx="350" cy="300" rx="500" ry="140" fill="rgba(5,15,40,0.8)" filter="url(#blur-md)" transform="translate(2400,0)" />
          <ellipse cx="900" cy="280" rx="600" ry="160" fill="rgba(8,20,50,0.7)" filter="url(#blur-md)" transform="translate(2400,0)" />
        </svg>
      </div>

      {/* Near cloud layer — fastest */}
      <div className="absolute inset-0" style={{ opacity: 0.3 }}>
        <svg
          className="absolute w-[200%] h-full"
          viewBox="0 0 2400 600"
          preserveAspectRatio="none"
          style={{ animation: 'cloudDrift 15s linear infinite' }}
        >
          <defs>
            <filter id="blur-lg">
              <feGaussianBlur stdDeviation="20" />
            </filter>
          </defs>
          <ellipse cx="200" cy="450" rx="400" ry="100" fill="rgba(0,5,20,0.9)" filter="url(#blur-lg)" />
          <ellipse cx="700" cy="500" rx="550" ry="120" fill="rgba(0,8,25,0.8)" filter="url(#blur-lg)" />
          <ellipse cx="1300" cy="480" rx="500" ry="110" fill="rgba(0,5,20,0.9)" filter="url(#blur-lg)" />
          <ellipse cx="1900" cy="460" rx="600" ry="100" fill="rgba(0,8,25,0.8)" filter="url(#blur-lg)" />
          <ellipse cx="200" cy="450" rx="400" ry="100" fill="rgba(0,5,20,0.9)" filter="url(#blur-lg)" transform="translate(2400,0)" />
          <ellipse cx="700" cy="500" rx="550" ry="120" fill="rgba(0,8,25,0.8)" filter="url(#blur-lg)" transform="translate(2400,0)" />
        </svg>
      </div>

      {/* Subtle moonbeam */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 300px 600px at 70% 10%, rgba(0,191,255,0.04) 0%, transparent 70%)',
        }}
      />
    </div>
  );
}

// ── Typewriter text ──────────────────────────────────────────

function TypewriterText({ text }: { text: string }) {
  const [displayed, setDisplayed] = useState('');

  useEffect(() => {
    setDisplayed('');
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 40);
    return () => clearInterval(interval);
  }, [text]);

  return (
    <span>
      {displayed}
      {displayed.length < text.length && (
        <span className="inline-block w-0.5 h-4 bg-cyan-400 ml-0.5 animate-pulse" />
      )}
    </span>
  );
}

// ── JEFF hex logo ────────────────────────────────────────────

export function JeffHexLogo({ size = 48 }: { size?: number }) {
  const s = size;
  return (
    <svg width={s} height={s} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Outer hex */}
      <polygon
        points="50,4 93,27 93,73 50,96 7,73 7,27"
        fill="none"
        stroke="#00BFFF"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      {/* Inner hex */}
      <polygon
        points="50,18 81,35 81,65 50,82 19,65 19,35"
        fill="rgba(0,191,255,0.08)"
        stroke="rgba(0,191,255,0.4)"
        strokeWidth="1"
        strokeLinejoin="round"
      />
      {/* Circuit lines */}
      <line x1="50" y1="4" x2="50" y2="18" stroke="#00BFFF" strokeWidth="2" opacity="0.6" />
      <line x1="93" y1="27" x2="81" y2="35" stroke="#00BFFF" strokeWidth="2" opacity="0.6" />
      <line x1="93" y1="73" x2="81" y2="65" stroke="#00BFFF" strokeWidth="2" opacity="0.6" />
      <line x1="50" y1="96" x2="50" y2="82" stroke="#00BFFF" strokeWidth="2" opacity="0.6" />
      <line x1="7" y1="73" x2="19" y2="65" stroke="#00BFFF" strokeWidth="2" opacity="0.6" />
      <line x1="7" y1="27" x2="19" y2="35" stroke="#00BFFF" strokeWidth="2" opacity="0.6" />
      {/* J.E.F.F text */}
      <text
        x="50"
        y="58"
        textAnchor="middle"
        fontSize="18"
        fontWeight="900"
        fontFamily="Orbitron, sans-serif"
        fill="#00BFFF"
        letterSpacing="1"
      >
        JEFF
      </text>
    </svg>
  );
}
