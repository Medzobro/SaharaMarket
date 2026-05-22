import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: ['./src/**/*.{ts,tsx,mdx}'],
  theme: {
    container: {
      center: true,
      padding: '1rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        // ─── Brand ───────────────────────────────────────
        brand: {
          black: '#0B0F19',
          royal: '#2563EB',
          cyan: '#22D3EE',
          emerald: '#10B981',
          purple: '#7C3AED',
          gray: '#F1F5F9',
          white: '#FFFFFF',
        },
        // ─── ShadCN tokens ───────────────────────────────
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        arabic: ['var(--font-arabic)', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'grid-pattern':
          'linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-cyber':
          'linear-gradient(135deg, #2563EB 0%, #7C3AED 50%, #22D3EE 100%)',
        'gradient-luxury':
          'linear-gradient(135deg, #0B0F19 0%, #1e1b4b 50%, #0B0F19 100%)',
      },
      boxShadow: {
        glow: '0 0 40px -10px rgba(34, 211, 238, 0.5)',
        'glow-purple': '0 0 60px -10px rgba(124, 58, 237, 0.6)',
        'glow-emerald': '0 0 40px -10px rgba(16, 185, 129, 0.5)',
        glass: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        neumorph:
          'inset 2px 2px 5px rgba(255,255,255,0.05), inset -2px -2px 5px rgba(0,0,0,0.5)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(34,211,238,0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(34,211,238,0.6)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'gradient-x': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        shimmer: 'shimmer 2.5s linear infinite',
        'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
        float: 'float 6s ease-in-out infinite',
        'gradient-x': 'gradient-x 8s ease infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;
