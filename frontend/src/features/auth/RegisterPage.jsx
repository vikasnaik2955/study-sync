import { useState } from 'react';
import { Alert, Box, Button, Divider, Link, Stack, Typography } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useRegisterMutation } from './authApi';
import { AuthHero, Field } from './authUi';

export default function RegisterPage() {
  const [form, setForm] = useState({ displayName: '', email: '', password: '' });
  const [register, { isLoading, error }] = useRegisterMutation();
  const navigate = useNavigate();

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(form).unwrap();
      navigate('/dashboard', { replace: true });
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
          <Typography variant="h4" sx={{ fontWeight: 800 }}>Create your account</Typography>
          <Typography sx={{ color: 'text.secondary', mt: 1, mb: 4 }}>
            Start sharing and learning together.
          </Typography>

          <Stack spacing={2.5}>
            {error && <Alert severity="error">{error?.data?.message || 'Registration failed.'}</Alert>}

            <Field label="Display name" placeholder="Aarav Sharma" value={form.displayName} required
              autoFocus onChange={set('displayName')} />
            <Field label="Email" type="email" placeholder="you@college.edu" value={form.email} required
              onChange={set('email')} />
            <Field label="Password" type="password" placeholder="At least 8 characters"
              value={form.password} required onChange={set('password')} />

            <Button type="submit" variant="contained" size="large" disabled={isLoading}
              sx={{ py: 1.4, fontSize: 16, borderRadius: 2.5, boxShadow: '0 8px 18px rgba(31,157,87,0.30)' }}>
              {isLoading ? 'Creating…' : 'Create account'}
            </Button>

            <Divider sx={{ color: 'text.secondary', fontSize: 13 }}>or</Divider>

            <Typography align="center" sx={{ color: 'text.secondary' }}>
              Already have an account?{' '}
              <Link component={RouterLink} to="/login"
                sx={{ fontWeight: 800, color: 'primary.dark' }} underline="hover">
                Sign in
              </Link>
            </Typography>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}
