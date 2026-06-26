import { useState } from 'react';
import {
  Alert, Box, Button, Divider, Link, Stack, TextField, Typography,
} from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { useLoginMutation } from './authApi';

// Rounded, surface-colored inputs with the label sitting above the box (not floating).
const fieldSx = {
  '& .MuiOutlinedInput-root': {
    borderRadius: 2.5,
    backgroundColor: 'background.paper',
  },
};

function Stat({ value, label }) {
  return (
    <Box>
      <Typography sx={{ fontSize: 28, fontWeight: 800, lineHeight: 1 }}>{value}</Typography>
      <Typography sx={{ fontSize: 13, color: 'rgba(255,255,255,0.8)', mt: 0.5 }}>{label}</Typography>
    </Box>
  );
}

function Field({ label, ...props }) {
  return (
    <Box>
      <Typography sx={{ fontWeight: 700, fontSize: 14, mb: 0.75 }}>{label}</Typography>
      <TextField fullWidth size="medium" sx={fieldSx} {...props} />
    </Box>
  );
}

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login, { isLoading, error }] = useLoginMutation();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/notes';

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await login({ email, password }).unwrap();
      navigate(from, { replace: true });
    } catch {
      /* error surfaced below */
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex' }}>
      {/* ---------- LEFT: brand / hero ---------- */}
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
        {/* soft decorative circle, bottom-right */}
        <Box sx={{
          position: 'absolute', right: -120, bottom: -140, width: 420, height: 420,
          borderRadius: '50%', background: 'rgba(255,255,255,0.06)',
        }} />

        {/* logo */}
        <Stack direction="row" alignItems="center" spacing={1.5} sx={{ position: 'relative' }}>
          <Box sx={{
            width: 46, height: 46, borderRadius: 2.5, bgcolor: 'rgba(255,255,255,0.16)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <SchoolIcon />
          </Box>
          <Typography sx={{ fontWeight: 800, fontSize: 24 }}>StudySync</Typography>
        </Stack>

        {/* hero copy */}
        <Box sx={{ position: 'relative', maxWidth: 560 }}>
          <Typography sx={{
            fontSize: 13, fontWeight: 800, letterSpacing: '0.18em',
            color: 'rgba(255,255,255,0.75)', mb: 2.5,
          }}>
            LEARN · SHARE · COLLABORATE · GROW
          </Typography>
          <Typography sx={{ fontSize: { md: 44, lg: 52 }, fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.02em' }}>
            One place for every student to study together.
          </Typography>
          <Typography sx={{ mt: 3, fontSize: 17, lineHeight: 1.6, color: 'rgba(255,255,255,0.85)', maxWidth: 480 }}>
            Share notes, join subject groups, ask questions, chat in real time, and collaborate in
            study rooms — all in one calm, organised home.
          </Typography>
        </Box>

        {/* stats */}
        <Stack direction="row" spacing={5} sx={{ position: 'relative' }}>
          <Stat value="12k+" label="notes shared" />
          <Stat value="840" label="study groups" />
          <Stat value="3.2k" label="questions solved" />
        </Stack>
      </Box>

      {/* ---------- RIGHT: form ---------- */}
      <Box sx={{
        flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
        p: { xs: 3, sm: 6 }, bgcolor: 'background.default',
      }}>
        <Box component="form" onSubmit={onSubmit} sx={{ width: '100%', maxWidth: 410 }}>
          <Typography variant="h4" sx={{ fontWeight: 800 }}>Welcome back</Typography>
          <Typography sx={{ color: 'text.secondary', mt: 1, mb: 4 }}>
            Sign in to pick up where you left off.
          </Typography>

          <Stack spacing={2.5}>
            {error && <Alert severity="error">{error?.data?.message || 'Login failed.'}</Alert>}

            <Field label="Email" type="email" placeholder="you@college.edu" value={email} required
              autoFocus onChange={(e) => setEmail(e.target.value)} />

            <Box>
              <Field label="Password" type="password" placeholder="••••••••" value={password} required
                onChange={(e) => setPassword(e.target.value)} />
              <Box sx={{ textAlign: 'right', mt: 1 }}>
                <Link component="button" type="button" underline="hover"
                  sx={{ fontSize: 13, fontWeight: 700, color: 'primary.dark' }}>
                  Forgot password?
                </Link>
              </Box>
            </Box>

            <Button type="submit" variant="contained" size="large" disabled={isLoading}
              sx={{
                py: 1.4, fontSize: 16, borderRadius: 2.5,
                boxShadow: '0 8px 18px rgba(31,157,87,0.30)',
              }}>
              {isLoading ? 'Signing in…' : 'Sign in'}
            </Button>

            <Divider sx={{ color: 'text.secondary', fontSize: 13 }}>or</Divider>

            <Typography align="center" sx={{ color: 'text.secondary' }}>
              New to StudySync?{' '}
              <Link component={RouterLink} to="/register"
                sx={{ fontWeight: 800, color: 'primary.dark' }} underline="hover">
                Create an account
              </Link>
            </Typography>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}
