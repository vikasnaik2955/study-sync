import { createTheme } from '@mui/material/styles';

// Single source of truth for the look: dark mode, a vivid green accent (the StudySync brand),
// and rounded, flat cards (outlined, no drop shadows). Components read everything from here.
const ACCENT = '#2ECC71';
const ACCENT_DARK = '#23A65B';
const ACCENT_SOFT = 'rgba(46,204,113,0.14)'; // translucent green for tints (active nav, chips)
const PAPER = '#161C24';
const BORDER = 'rgba(255,255,255,0.09)';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: ACCENT, dark: ACCENT_DARK, light: '#5FE0A0', contrastText: '#06130B' },
    secondary: { main: '#5B9DFF' },
    success: { main: ACCENT },
    error: { main: '#F26D6D' },
    background: { default: '#0E1217', paper: PAPER },
    text: { primary: '#E7ECF3', secondary: '#9AA6B5' },
    divider: BORDER,
  },
  shape: { borderRadius: 14 },
  typography: {
    fontFamily: '"Plus Jakarta Sans", system-ui, -apple-system, Segoe UI, Roboto, sans-serif',
    h4: { fontWeight: 800, letterSpacing: '-0.02em' },
    h5: { fontWeight: 800, letterSpacing: '-0.02em' },
    h6: { fontWeight: 700 },
    button: { fontWeight: 700, textTransform: 'none' },
  },
  components: {
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: { root: { borderRadius: 12 } },
    },
    // Flat + rounded cards: outlined by default, no shadow, generous radius.
    MuiCard: {
      defaultProps: { variant: 'outlined' },
      styleOverrides: {
        root: { borderRadius: 16, borderColor: BORDER, backgroundColor: PAPER },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: { backgroundImage: 'none' },
        outlined: { borderColor: BORDER, borderRadius: 16 },
      },
    },
    MuiAppBar: {
      styleOverrides: { root: { backgroundImage: 'none' } },
    },
    MuiOutlinedInput: {
      styleOverrides: { root: { borderRadius: 12 } },
    },
    MuiChip: {
      styleOverrides: { root: { borderRadius: 8, fontWeight: 600 } },
    },
  },
});

// Export the accent tint so components can reuse the exact same translucent green.
export const accentSoft = ACCENT_SOFT;
export default theme;
