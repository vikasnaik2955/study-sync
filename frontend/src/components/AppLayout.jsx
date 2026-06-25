import {
  AppBar, Avatar, Box, Button, Container, Stack, Toolbar, Typography,
} from '@mui/material';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../features/auth/authSlice';
import { useLogoutMutation } from '../features/auth/authApi';

const NAV = [
  { to: '/notes', label: 'Notes' },
  { to: '/groups', label: 'Groups' },
  { to: '/qa', label: 'Q&A' },
  { to: '/chat', label: 'Chat' },
  { to: '/rooms', label: 'Rooms' },
];

export default function AppLayout() {
  const user = useSelector(selectCurrentUser);
  const navigate = useNavigate();
  const [logout] = useLogoutMutation();

  const onLogout = async () => {
    await logout().unwrap().catch(() => {});
    navigate('/login');
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar position="sticky" color="inherit" elevation={0}
        sx={{ borderBottom: '1px solid', borderColor: 'divider' }}>
        <Toolbar sx={{ gap: 2 }}>
          <Stack direction="row" alignItems="center" spacing={1}
            sx={{ cursor: 'pointer' }} onClick={() => navigate('/notes')}>
            <Avatar variant="rounded" sx={{ bgcolor: 'primary.main', width: 34, height: 34 }}>
              <MenuBookIcon fontSize="small" />
            </Avatar>
            <Typography variant="h6" sx={{ fontWeight: 800 }}>StudySync</Typography>
          </Stack>

          <Stack direction="row" spacing={0.5} sx={{ ml: 2, flexGrow: 1 }}>
            {NAV.map((item) => (
              <Button
                key={item.to}
                component={NavLink}
                to={item.to}
                sx={{
                  color: 'text.secondary',
                  '&.active': { color: 'primary.dark', bgcolor: 'primary.light' },
                }}
              >
                {item.label}
              </Button>
            ))}
          </Stack>

          <Button component={NavLink} to="/profile" startIcon={
            <Avatar src={user?.avatarUrl} sx={{ width: 26, height: 26 }}>
              {user?.displayName?.[0]?.toUpperCase()}
            </Avatar>
          } sx={{ color: 'text.primary' }}>
            {user?.displayName}
          </Button>
          <Button color="inherit" onClick={onLogout} sx={{ color: 'text.secondary' }}>Log out</Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Outlet />
      </Container>
    </Box>
  );
}
