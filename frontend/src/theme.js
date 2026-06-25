import { createTheme } from '@mui/material/styles';

// Palette lifted from the project's design-system tokens (the green "brand" scale) so the web
// app matches the Phase 0 visual direction.
const theme = createTheme({
  palette: {
    primary: { main: '#1F9D57', dark: '#178049', light: '#ECFBF1', contrastText: '#FFFFFF' },
    secondary: { main: '#2F6FED' },
    success: { main: '#1F9D57' },
    background: { default: '#FAF8F5', paper: '#FFFFFF' },
    text: { primary: '#1A1714', secondary: '#5C544B' },
  },
  shape: { borderRadius: 12 },
  typography: {
    fontFamily: '"Plus Jakarta Sans", system-ui, -apple-system, Segoe UI, Roboto, sans-serif',
    h4: { fontWeight: 800, letterSpacing: '-0.02em' },
    h5: { fontWeight: 800, letterSpacing: '-0.02em' },
    h6: { fontWeight: 700 },
    button: { fontWeight: 700, textTransform: 'none' },
  },
  components: {
    MuiButton: { defaultProps: { disableElevation: true } },
    MuiPaper: { styleOverrides: { root: { backgroundImage: 'none' } } },
  },
});

export default theme;
