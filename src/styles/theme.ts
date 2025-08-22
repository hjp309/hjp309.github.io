export const theme = {
  colors: {
    primary: '#2A2D3E',
    secondary: '#454964',
    accent: '#F6B17A',
    light: '#F6B17A',
    text: '#ffffff',
    textLight: '#ffffff',
    textDark: '#2A2D3E',
    glass: {
      background: 'rgba(255, 255, 255, 0.05)',
      border: 'transparent',
      card: 'rgba(42, 45, 62, 0.2)',
    },
    gradient: {
      main: 'linear-gradient(135deg, #2A2D3E 0%, #454964 50%, #2A2D3E 100%)',
      accent: 'linear-gradient(135deg, #F6B17A 0%, #f8c396 100%)',
      glass: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
    },
    overlay: {
      light: 'rgba(255, 255, 255, 0.1)',
      dark: 'rgba(42, 45, 62, 0.3)',
    }
  },
  fonts: {
    body: "'Inter', sans-serif",
    heading: "'Poppins', sans-serif",
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '2rem',
    xl: '4rem',
  },
  transitions: {
    default: '0.3s ease',
  },
};

export type Theme = typeof theme;
