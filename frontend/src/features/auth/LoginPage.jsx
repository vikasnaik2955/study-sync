import { useState } from 'react';
import {
  Alert, Avatar, Box, Button, Container, Link, Paper, Stack, TextField, Typography,
} from '@mui/material';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { useLoginMutation } from './authApi';

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
    <Container maxWidth="xs" sx={{ pt: 10 }}>
      <Stack alignItems="center" spacing={1} sx={{ mb: 3 }}>
        <Avatar variant="rounded" sx={{ bgcolor: 'primary.main', width: 48, height: 48 }}>
          <MenuBookIcon />
        </Avatar>
        <Typography variant="h4">Welcome back</Typography>
        <Typography color="text.secondary">Sign in to StudySync</Typography>
      </Stack>
      <Paper variant="outlined" sx={{ p: 3 }}>
        <Box component="form" onSubmit={onSubmit}>
          <Stack spacing={2}>
            {error && <Alert severity="error">{error?.data?.message || 'Login failed.'}</Alert>}
            <TextField label="Email" type="email" value={email} required
              onChange={(e) => setEmail(e.target.value)} autoFocus />
            <TextField label="Password" type="password" value={password} required
              onChange={(e) => setPassword(e.target.value)} />
            <Button type="submit" variant="contained" size="large" disabled={isLoading}>
              {isLoading ? 'Signing in…' : 'Sign in'}
            </Button>
            <Typography variant="body2" align="center" color="text.secondary">
              New here?{' '}
              <Link component={RouterLink} to="/register">Create an account</Link>
            </Typography>
          </Stack>
        </Box>
      </Paper>
    </Container>
  );
}
