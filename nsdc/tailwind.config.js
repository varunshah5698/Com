/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        void: {
          950: '#05050A',
          900: '#0A0A10',
          800: '#12121A',
          700: '#1B1B26',
        },
        photon: '#F5F5F2',
        mist: '#A4A4B8',
        dim: '#7C7C92',
        ultraviolet: '#7443FF',
        ion: '#2CA6FF',
        plasma: '#4DE3D0',
        amber: '#FFC247',
        ember: '#FF7A1A',
        rose: '#FF4FA3',
        error: '#FF5A5F',
      },
      fontFamily: {
        display: [
          '"Neue Haas Grotesk Display Pro 55 Roman"',
          '"Plus Jakarta Sans"',
          '"Helvetica Neue"',
          'Helvetica',
          'Arial',
          'sans-serif',
        ],
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
        body: [
          '"Neue Haas Grotesk Text Pro"',
          '"Plus Jakarta Sans"',
          '-apple-system',
          'BlinkMacSystemFont',
          'sans-serif',
        ],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      spacing: {
        s1: '4px',
        s2: '8px',
        s3: '12px',
        s4: '16px',
        s5: '24px',
        s6: '32px',
        s7: '48px',
        s8: '64px',
        s9: '96px',
        s10: '128px',
      },
      maxWidth: {
        site: '1380px',
      },
    },
  },
  plugins: [],
};
