import { useState } from 'react';
import {
  Alert, Avatar, Box, Button, Container, Link, Paper, Stack, TextField, Typography,
} from '@mui/material';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useRegisterMutation } from './authApi';

export default function RegisterPage() {
  const [form, setForm] = useState({ displayName: '', email: '', password: '' });
  const [register, { isLoading, error }] = useRegisterMutation();
  const navigate = useNavigate();

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(form).unwrap();
      navigate('/notes', { replace: true });
    } catch {
      /* error surfaced below */
    }
  };

  return (
    <Container maxWidth="xs" sx={{ pt: 8 }}>
      <Stack alignItems="center" spacing={1} sx={{ mb: 3 }}>
        <Avatar variant="rounded" sx={{ bgcolor: 'primary.main', width: 48, height: 48 }}>
          <MenuBookIcon />
        </Avatar>
        <Typography variant="h4">Create your account</Typography>
        <Typography color="text.secondary">Join StudySync</Typography>
      </Stack>
      <Paper variant="outlined" sx={{ p: 3 }}>
        <Box component="form" onSubmit={onSubmit}>
          <Stack spacing={2}>
            {error && (
              <Alert severity="error">
                {error?.data?.message || 'Registration failed.'}
              </Alert>
            )}
            <TextField label="Display name" value={form.displayName} required
              onChange={set('displayName')} autoFocus />
            <TextField label="Email" type="email" value={form.email} required onChange={set('email')} />
            <TextField label="Password" type="password" value={form.password} required
              onChange={set('password')} helperText="At least 8 characters" />
            <Button type="submit" variant="contained" size="large" disabled={isLoading}>
              {isLoading ? 'Creating…' : 'Create account'}
            </Button>
            <Typography variant="body2" align="center" color="text.secondary">
              Already have an account?{' '}
              <Link component={RouterLink} to="/login">Sign in</Link>
            </Typography>
          </Stack>
        </Box>
      </Paper>
    </Container>
  );
}
