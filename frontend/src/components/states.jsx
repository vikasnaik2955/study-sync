import { Alert, Box, CircularProgress, Typography } from '@mui/material';

// Tiny, reusable loading / empty / error states so every page handles the three async outcomes
// consistently instead of each re-inventing them.

export function Loading({ label = 'Loading…' }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1.5, py: 6 }}>
      <CircularProgress size={22} />
      <Typography color="text.secondary">{label}</Typography>
    </Box>
  );
}

export function EmptyState({ title = 'Nothing here yet', hint }) {
  return (
    <Box sx={{ textAlign: 'center', py: 6, color: 'text.secondary' }}>
      <Typography variant="h6" sx={{ mb: 0.5 }}>{title}</Typography>
      {hint && <Typography variant="body2">{hint}</Typography>}
    </Box>
  );
}

export function ErrorState({ error }) {
  const message =
    error?.data?.message || error?.error || 'Something went wrong. Please try again.';
  return <Alert severity="error" sx={{ my: 2 }}>{message}</Alert>;
}
