import { useState } from 'react';
import {
  Avatar, Badge, Box, Divider, IconButton, InputBase, Menu, MenuItem, Stack, Typography,
} from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import SpaceDashboardOutlinedIcon from '@mui/icons-material/SpaceDashboardOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../features/auth/authSlice';
import { useLogoutMutation } from '../features/auth/authApi';
import { useListConversationsQuery } from '../features/chat/chatApi';

const SIDEBAR_WIDTH = 232;

const NAV = [
  { to: '/dashboard', label: 'Dashboard', icon: <SpaceDashboardOutlinedIcon /> },
  { to: '/notes', label: 'Notes', icon: <DescriptionOutlinedIcon /> },
  { to: '/groups', label: 'Study groups', icon: <GroupsOutlinedIcon /> },
  { to: '/qa', label: 'Q&A forum', icon: <ForumOutlinedIcon /> },
  { to: '/chat', label: 'Messages', icon: <ChatBubbleOutlineIcon />, badgeKey: 'messages' },
  { to: '/rooms', label: 'Study rooms', icon: <VideocamOutlinedIcon /> },
  { to: '/timetable', label: 'Timetable', icon: <CalendarMonthOutlinedIcon /> },
  { to: '/profile', label: 'Profile', icon: <PersonOutlineIcon /> },
];

function titleFor(pathname) {
  const match = NAV.find((n) => pathname === n.to || pathname.startsWith(n.to + '/'));
  return match?.label || 'StudySync';
}

function SidebarLink({ item, badge }) {
  return (
    <NavLink to={item.to} style={{ textDecoration: 'none' }}>
      {({ isActive }) => (
        <Stack direction="row" alignItems="center" spacing={1.5}
          sx={{
            px: 1.5, py: 1.1, borderRadius: 2, mb: 0.25,
            color: isActive ? 'primary.main' : 'text.secondary',
            bgcolor: isActive ? 'rgba(46,204,113,0.14)' : 'transparent',
            fontWeight: isActive ? 700 : 500,
            '&:hover': { bgcolor: isActive ? 'rgba(46,204,113,0.14)' : 'rgba(255,255,255,0.04)' },
          }}>
          <Box sx={{ display: 'flex' }}>{item.icon}</Box>
          <Typography sx={{ flexGrow: 1, fontWeight: 'inherit', fontSize: 14.5 }}>{item.label}</Typography>
          {badge > 0 && (
            <Box sx={{ minWidth: 20, height: 20, px: 0.5, borderRadius: 5, bgcolor: 'primary.main',
              color: 'primary.contrastText', fontSize: 12, fontWeight: 700,
              display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {badge}
            </Box>
          )}
        </Stack>
      )}
    </NavLink>
  );
}

export default function AppLayout() {
  const user = useSelector(selectCurrentUser);
  const navigate = useNavigate();
  const location = useLocation();
  const [logout] = useLogoutMutation();
  const [anchorEl, setAnchorEl] = useState(null);
  const { data: conversations } = useListConversationsQuery();
  const badges = { messages: conversations?.length || 0 };

  const initials = (user?.displayName || '?')
    .split(' ').map((p) => p[0]).slice(0, 2).join('').toUpperCase();

  const onLogout = async () => {
    setAnchorEl(null);
    await logout().unwrap().catch(() => {});
    navigate('/login');
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', bgcolor: 'background.default' }}>
      {/* ---------- SIDEBAR ---------- */}
      <Box component="nav" sx={{
        width: SIDEBAR_WIDTH, flexShrink: 0, display: { xs: 'none', md: 'flex' }, flexDirection: 'column',
        position: 'sticky', top: 0, height: '100vh',
        bgcolor: 'background.paper', borderRight: '1px solid', borderColor: 'divider', p: 2,
      }}>
        <Stack direction="row" alignItems="center" spacing={1.25} sx={{ px: 1, py: 1, mb: 2 }}>
          <Avatar variant="rounded" sx={{ bgcolor: 'primary.main', width: 36, height: 36 }}>
            <SchoolIcon fontSize="small" />
          </Avatar>
          <Typography sx={{ fontWeight: 800, fontSize: 19 }}>StudySync</Typography>
        </Stack>

        <Box sx={{ flexGrow: 1 }}>
          {NAV.map((item) => <SidebarLink key={item.to} item={item} badge={badges[item.badgeKey]} />)}
        </Box>

        {/* streak card (illustrative) */}
        <Box sx={{ p: 1.75, borderRadius: 2.5, bgcolor: 'rgba(46,204,113,0.10)',
          border: '1px solid', borderColor: 'rgba(46,204,113,0.25)' }}>
          <Stack direction="row" alignItems="center" spacing={0.75} sx={{ mb: 0.5 }}>
            <LocalFireDepartmentIcon sx={{ color: '#F59E0B', fontSize: 18 }} />
            <Typography sx={{ fontWeight: 700, fontSize: 14 }}>7-day streak</Typography>
          </Stack>
          <Typography variant="body2" color="text.secondary" sx={{ fontSize: 12.5 }}>
            Study 25 more minutes today to keep it alive.
          </Typography>
        </Box>
      </Box>

      {/* ---------- MAIN ---------- */}
      <Box sx={{ flexGrow: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
        {/* top bar */}
        <Stack direction="row" alignItems="center" spacing={2} sx={{
          position: 'sticky', top: 0, zIndex: 10, height: 64, px: 3,
          bgcolor: 'background.paper', borderBottom: '1px solid', borderColor: 'divider',
        }}>
          <Typography sx={{ fontWeight: 800, fontSize: 18, display: { xs: 'none', sm: 'block' } }}>
            {titleFor(location.pathname)}
          </Typography>
          <Stack direction="row" alignItems="center" spacing={1} sx={{
            flexGrow: 1, maxWidth: 440, px: 2, height: 42, borderRadius: 2.5,
            bgcolor: 'background.default', border: '1px solid', borderColor: 'divider',
          }}>
            <SearchIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
            <InputBase placeholder="Search notes, questions, groups…" fullWidth
              onKeyDown={(e) => e.key === 'Enter' && navigate('/notes')}
              sx={{ fontSize: 14 }} />
          </Stack>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton><Badge color="primary" variant="dot"><NotificationsNoneIcon /></Badge></IconButton>
          <Stack direction="row" alignItems="center" spacing={1} sx={{ cursor: 'pointer', pl: 1 }}
            onClick={(e) => setAnchorEl(e.currentTarget)}>
            <Avatar src={user?.avatarUrl} sx={{ width: 32, height: 32, bgcolor: 'primary.main',
              color: 'primary.contrastText', fontSize: 13, fontWeight: 700 }}>
              {initials}
            </Avatar>
            <Typography sx={{ fontWeight: 700, fontSize: 14, display: { xs: 'none', sm: 'block' } }}>
              {user?.displayName}
            </Typography>
            <KeyboardArrowDownIcon sx={{ color: 'text.secondary' }} />
          </Stack>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}>
            <MenuItem onClick={() => { setAnchorEl(null); navigate('/profile'); }}>Profile</MenuItem>
            <Divider />
            <MenuItem onClick={onLogout}>Log out</MenuItem>
          </Menu>
        </Stack>

        {/* page content */}
        <Box sx={{ p: { xs: 2, md: 4 }, flexGrow: 1 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
