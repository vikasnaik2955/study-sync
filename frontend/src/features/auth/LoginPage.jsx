import { useState } from 'react';
import { Alert, Box, Button, Divider, Link, Stack, Typography } from '@mui/material';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { useLoginMutation } from './authApi';
import { AuthHero, Field } from './authUi';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login, { isLoading, error }] = useLoginMutation();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/dashboard';

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
      <AuthHero />

      <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
        p: { xs: 3, sm: 6 }, bgcolor: 'background.default' }}>
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
              sx={{ py: 1.4, fontSize: 16, borderRadius: 2.5, boxShadow: '0 8px 18px rgba(31,157,87,0.30)' }}>
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
