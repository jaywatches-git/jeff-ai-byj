/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Rajdhani', 'Orbitron', 'sans-serif'],
        body: ['Inter', 'DM Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        jeff: {
          bg: '#020B14',
          cyan: '#00BFFF',
          gold: '#FFD700',
        },
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'scan-line': 'scanLine 3s linear infinite',
        'matrix-rain': 'matrixRain 1s linear infinite',
        'ember': 'emberFloat 4s ease-in-out infinite',
        'hex-pulse': 'hexPulse 3s ease-in-out infinite',
        'dust': 'dustFloat 8s ease-in-out infinite',
        'moss-drift': 'mossDrift 10s ease-in-out infinite',
        'caustic': 'causticShimmer 4s ease-in-out infinite',
        'splatter': 'splatterPulse 3s ease-in-out infinite',
        'typewriter': 'typewriter 0.05s steps(1) forwards',
        'cloud-drift': 'cloudDrift 20s linear infinite',
        'bloom-in': 'bloomIn 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'fade-in': 'fadeIn 0.5s ease forwards',
        'slide-up': 'slideUp 0.4s ease forwards',
        'lantern-sway': 'lanternSway 4s ease-in-out infinite',
        'firefly': 'fireflyFloat 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.8' },
          '50%': { opacity: '1', boxShadow: '0 0 30px currentColor' },
        },
        scanLine: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        matrixRain: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        emberFloat: {
          '0%': { transform: 'translateY(0) scale(1)', opacity: '0.8' },
          '50%': { transform: 'translateY(-30px) scale(0.8)', opacity: '0.6' },
          '100%': { transform: 'translateY(-60px) scale(0.4)', opacity: '0' },
        },
        hexPulse: {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '0.7' },
        },
        dustFloat: {
          '0%': { transform: 'translateY(0) translateX(0)', opacity: '0' },
          '20%': { opacity: '0.6' },
          '80%': { opacity: '0.4' },
          '100%': { transform: 'translateY(-80px) translateX(20px)', opacity: '0' },
        },
        mossDrift: {
          '0%': { transform: 'translateY(0) translateX(0)', opacity: '0' },
          '20%': { opacity: '0.5' },
          '100%': { transform: 'translateY(-60px) translateX(-10px)', opacity: '0' },
        },
        causticShimmer: {
          '0%, 100%': { transform: 'scale(1) rotate(0deg)', opacity: '0.3' },
          '50%': { transform: 'scale(1.2) rotate(180deg)', opacity: '0.6' },
        },
        splatterPulse: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.4' },
          '50%': { transform: 'scale(1.1)', opacity: '0.7' },
        },
        cloudDrift: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        bloomIn: {
          '0%': { transform: 'scale(0.6)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        lanternSway: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        fireflyFloat: {
          '0%': { transform: 'translate(0, 0)', opacity: '0' },
          '20%': { opacity: '1' },
          '50%': { transform: 'translate(20px, -30px)', opacity: '0.8' },
          '80%': { opacity: '0.5' },
          '100%': { transform: 'translate(-10px, -50px)', opacity: '0' },
        },
      },
    },
  },
  plugins: [],
}
