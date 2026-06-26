import { Box, Stack, TextField, Typography } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';

// Shared bits for the Login + Register split-screen pages so they stay identical.

export const fieldSx = {
  '& .MuiOutlinedInput-root': { borderRadius: 2.5, backgroundColor: 'background.paper' },
};

export function Field({ label, ...props }) {
  return (
    <Box>
      <Typography sx={{ fontWeight: 700, fontSize: 14, mb: 0.75 }}>{label}</Typography>
      <TextField fullWidth size="medium" sx={fieldSx} {...props} />
    </Box>
  );
}

function Stat({ value, label }) {
  return (
    <Box>
      <Typography sx={{ fontSize: 28, fontWeight: 800, lineHeight: 1 }}>{value}</Typography>
      <Typography sx={{ fontSize: 13, color: 'rgba(255,255,255,0.8)', mt: 0.5 }}>{label}</Typography>
    </Box>
  );
}

export function AuthHero() {
  return (
    <Box
      sx={{
        flex: 1,
        display: { xs: 'none', md: 'flex' },
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        overflow: 'hidden',
        color: '#fff',
        p: { md: 6, lg: 8 },
        background:
          'radial-gradient(120% 120% at 85% 80%, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0) 42%),'
          + ' linear-gradient(150deg, #22A85D 0%, #178A4B 55%, #0F6E3C 100%)',
      }}
    >
      <Box sx={{ position: 'absolute', right: -120, bottom: -140, width: 420, height: 420,
        borderRadius: '50%', background: 'rgba(255,255,255,0.06)' }} />

      <Stack direction="row" alignItems="center" spacing={1.5} sx={{ position: 'relative' }}>
        <Box sx={{ width: 46, height: 46, borderRadius: 2.5, bgcolor: 'rgba(255,255,255,0.16)',
          display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <SchoolIcon />
        </Box>
        <Typography sx={{ fontWeight: 800, fontSize: 24 }}>StudySync</Typography>
      </Stack>

      <Box sx={{ position: 'relative', maxWidth: 560 }}>
        <Typography sx={{ fontSize: 13, fontWeight: 800, letterSpacing: '0.18em',
          color: 'rgba(255,255,255,0.75)', mb: 2.5 }}>
          LEARN · SHARE · COLLABORATE · GROW
        </Typography>
        <Typography sx={{ fontSize: { md: 44, lg: 52 }, fontWeight: 800, lineHeight: 1.05,
          letterSpacing: '-0.02em' }}>
          One place for every student to study together.
        </Typography>
        <Typography sx={{ mt: 3, fontSize: 17, lineHeight: 1.6, color: 'rgba(255,255,255,0.85)', maxWidth: 480 }}>
          Share notes, join subject groups, ask questions, chat in real time, and collaborate in
          study rooms — all in one calm, organised home.
        </Typography>
      </Box>

      <Stack direction="row" spacing={5} sx={{ position: 'relative' }}>
        <Stat value="12k+" label="notes shared" />
        <Stat value="840" label="study groups" />
        <Stat value="3.2k" label="questions solved" />
      </Stack>
    </Box>
  );
}
