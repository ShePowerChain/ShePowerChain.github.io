// Design System for ShePowerChain
// Production-ready design tokens and utilities

export const colors = {
  primary: {
    50: '#fdf2f8',
    100: '#fce7f3',
    200: '#fbcfe8',
    300: '#f9a8d4',
    400: '#f472b6',
    500: '#ec4899',
    600: '#db2777',
    700: '#be185d',
    800: '#9d174d',
    900: '#831843',
    950: '#500724',
  },
  secondary: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
    950: '#020617',
  },
  accent: {
    purple: '#8b5cf6',
    blue: '#3b82f6',
    green: '#10b981',
    yellow: '#f59e0b',
    red: '#ef4444',
  },
  dark: {
    bg: '#000000',
    surface: '#0f0f0f',
    card: '#1a1a1a',
    border: '#2a2a2a',
    text: {
      primary: '#ffffff',
      secondary: '#a1a1aa',
      muted: '#71717a',
    }
  }
};

export const spacing = {
  xs: '0.25rem',   // 4px
  sm: '0.5rem',    // 8px
  md: '1rem',      // 16px
  lg: '1.5rem',    // 24px
  xl: '2rem',      // 32px
  '2xl': '3rem',   // 48px
  '3xl': '4rem',   // 64px
  '4xl': '6rem',   // 96px
};

export const borderRadius = {
  sm: '0.25rem',   // 4px
  md: '0.5rem',    // 8px
  lg: '0.75rem',   // 12px
  xl: '1rem',      // 16px
  '2xl': '1.5rem', // 24px
  full: '9999px',
};

export const shadows = {
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  glow: '0 0 20px rgb(236 72 153 / 0.3)',
  glowLg: '0 0 40px rgb(236 72 153 / 0.4)',
};

export const typography = {
  fontFamily: {
    sans: ['Inter', 'system-ui', 'sans-serif'],
    mono: ['Fira Code', 'monospace'],
  },
  fontSize: {
    xs: ['0.75rem', { lineHeight: '1rem' }],
    sm: ['0.875rem', { lineHeight: '1.25rem' }],
    base: ['1rem', { lineHeight: '1.5rem' }],
    lg: ['1.125rem', { lineHeight: '1.75rem' }],
    xl: ['1.25rem', { lineHeight: '1.75rem' }],
    '2xl': ['1.5rem', { lineHeight: '2rem' }],
    '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
    '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
    '5xl': ['3rem', { lineHeight: '1' }],
    '6xl': ['3.75rem', { lineHeight: '1' }],
  },
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
  },
};

export const animations = {
  transition: {
    fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
    normal: '200ms cubic-bezier(0.4, 0, 0.2, 1)',
    slow: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
  },
  spring: {
    normal: '0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
    fast: '0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
  },
};

export const gradients = {
  primary: 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)',
  secondary: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
  dark: 'linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #500724 100%)',
  card: 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)',
  hover: 'linear-gradient(135deg, #f472b6 0%, #ec4899 100%)',
};

// Component variants for consistent styling
export const buttonVariants = {
  primary: {
    sm: `bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 
         text-white font-medium px-4 py-2 rounded-lg transition-all duration-200 
         transform hover:scale-105 shadow-md hover:shadow-pink-500/25`,
    base: `bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 
           text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 
           transform hover:scale-105 shadow-lg hover:shadow-pink-500/25`,
    lg: `bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 
         text-white font-bold px-8 py-4 rounded-xl transition-all duration-200 
         transform hover:scale-105 shadow-xl hover:shadow-pink-500/30`,
  },
  secondary: {
    sm: `bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700 hover:border-pink-400 
         text-gray-300 hover:text-pink-400 font-medium px-4 py-2 rounded-lg 
         transition-all duration-200`,
    base: `bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700 hover:border-pink-400 
           text-gray-300 hover:text-pink-400 font-medium px-6 py-3 rounded-xl 
           transition-all duration-200`,
    lg: `bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700 hover:border-pink-400 
         text-gray-300 hover:text-pink-400 font-bold px-8 py-4 rounded-xl 
         transition-all duration-200`,
  },
  ghost: {
    sm: `text-gray-400 hover:text-pink-400 hover:bg-pink-400/10 font-medium px-4 py-2 
         rounded-lg transition-all duration-200`,
    base: `text-gray-400 hover:text-pink-400 hover:bg-pink-400/10 font-medium px-6 py-3 
           rounded-xl transition-all duration-200`,
    lg: `text-gray-400 hover:text-pink-400 hover:bg-pink-400/10 font-bold px-8 py-4 
         rounded-xl transition-all duration-200`,
  },
};

export const cardVariants = {
  default: `bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 
            transition-all duration-200 hover:border-pink-500/30 hover:shadow-lg hover:shadow-pink-500/10`,
  elevated: `bg-gray-800/60 backdrop-blur-sm border border-gray-600/50 rounded-2xl p-8 
             shadow-xl hover:shadow-2xl transition-all duration-300 hover:border-pink-500/40`,
  interactive: `bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 
                cursor-pointer transition-all duration-200 hover:border-pink-500/50 
                hover:shadow-lg hover:shadow-pink-500/20 hover:scale-[1.02] active:scale-[0.98]`,
};

export const inputVariants = {
  default: `w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl 
            text-white placeholder-gray-400 focus:border-pink-500 focus:ring-1 
            focus:ring-pink-500 focus:outline-none transition-all duration-200`,
  search: `w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl 
           text-white placeholder-gray-400 focus:border-pink-500 focus:ring-1 
           focus:ring-pink-500 focus:outline-none transition-all duration-200`,
};

export const statusColors = {
  success: {
    bg: 'bg-green-500/20',
    border: 'border-green-500/30',
    text: 'text-green-400',
    icon: 'text-green-400',
  },
  warning: {
    bg: 'bg-yellow-500/20',
    border: 'border-yellow-500/30',
    text: 'text-yellow-400',
    icon: 'text-yellow-400',
  },
  error: {
    bg: 'bg-red-500/20',
    border: 'border-red-500/30',
    text: 'text-red-400',
    icon: 'text-red-400',
  },
  info: {
    bg: 'bg-blue-500/20',
    border: 'border-blue-500/30',
    text: 'text-blue-400',
    icon: 'text-blue-400',
  },
  pending: {
    bg: 'bg-gray-500/20',
    border: 'border-gray-500/30',
    text: 'text-gray-400',
    icon: 'text-gray-400',
  },
};

// Utility functions
export const cn = (...classes: (string | undefined | null | false)[]): string => {
  return classes.filter(Boolean).join(' ');
};

export const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'verified':
    case 'confirmed':
    case 'success':
    case 'completed':
    case 'active':
      return statusColors.success;
    case 'pending':
    case 'processing':
    case 'loading':
      return statusColors.pending;
    case 'warning':
    case 'review':
      return statusColors.warning;
    case 'error':
    case 'failed':
    case 'rejected':
    case 'declined':
      return statusColors.error;
    case 'info':
    case 'scheduled':
      return statusColors.info;
    default:
      return statusColors.pending;
  }
};
