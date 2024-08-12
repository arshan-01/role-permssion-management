/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1D4ED8',       // Blue color
        secondary: '#6D28D9',     // Purple color
        accent: '#FBBF24',        // Yellow color
        background: '#F3F4F6',    // Light gray background
        text: '#1F2937',         // Dark gray text
        success: '#10B981',       // Green color for success
        error: '#EF4444',         // Red color for error
        warning: '#F59E0B',       // Orange color for warnings
      },
      fontFamily: {
        sans: ['Roboto', 'Helvetica', 'Arial', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
        mono: ['Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace'],
      },
      fontSize: {
        'tiny': '0.625rem',  // 10px
        'sm': '0.875rem',    // 14px
        'base': '1rem',      // 16px
        'lg': '1.125rem',    // 18px
        'xl': '1.25rem',     // 20px
        '2xl': '1.5rem',     // 24px
        '3xl': '1.875rem',   // 30px
        '4xl': '2.25rem',    // 36px
        '5xl': '3rem',       // 48px
        '6xl': '3.75rem',    // 60px
      },
      spacing: {
        '0.5': '0.125rem',  // 2px
        '1.5': '0.375rem',  // 6px
        '4.5': '1.125rem',  // 18px
        '7': '1.75rem',     // 28px
        '18': '4.5rem',     // 72px
        '24': '6rem',       // 96px
        '32': '8rem',       // 128px
      },
      borderRadius: {
        'sm': '0.125rem',    // 2px
        'md': '0.375rem',    // 6px
        'lg': '0.5rem',      // 8px
        'xl': '0.75rem',     // 12px
        '2xl': '1.25rem',    // 20px
        '3xl': '1.5rem',     // 24px
        'full': '9999px',    // Fully rounded
      },
      borderWidth: {
        'thin': '1px',
        'medium': '2px',
        'thick': '4px',
      },
      boxShadow: {
        'custom-light': '0 4px 6px rgba(0, 0, 0, 0.1)',
        'custom-dark': '0 10px 15px rgba(0, 0, 0, 0.2)',
        'inner': 'inset 0 2px 4px rgba(0, 0, 0, 0.05)',
        'outline': '0 0 0 3px rgba(66, 153, 225, 0.5)',
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
        'colors': 'background-color, border-color, color, fill, stroke',
        'opacity': 'opacity',
        'transform': 'transform',
      },
      transitionDuration: {
        'default': '150ms',
        'slow': '300ms',
        'fast': '75ms',
      },
      transitionTimingFunction: {
        'default': 'ease-in-out',
        'in': 'ease-in',
        'out': 'ease-out',
        'in-out': 'ease-in-out',
      },
      transitionDelay: {
        'default': '0ms',
        'short': '100ms',
        'medium': '200ms',
        'long': '300ms',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 1s ease-in-out',
        slideIn: 'slideIn 0.5s ease-out',
      },
    },
  },
  plugins: [],
}
