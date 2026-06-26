import { useEffect, useState } from 'react';
import {
  Alert, Avatar, Box, Button, Card, CardContent, Dialog, DialogActions, DialogContent, DialogTitle,
  Divider, Link, Stack, Tab, Tabs, TextField, Typography,
} from '@mui/material';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../auth/authSlice';
import { useUpdateProfileMutation, useChangePasswordMutation } from '../users/usersApi';
import { useLogoutMutation } from '../auth/authApi';
import { useListNotesQuery } from '../notes/notesApi';
import { useListQuestionsQuery } from '../qa/qaApi';
import { useListGroupsQuery } from '../groups/groupsApi';
import { EmptyState, ErrorState } from '../../components/states';

function initials(name = '?') {
  return name.split(' ').map((p) => p[0]).slice(0, 2).join('').toUpperCase();
}

function StatCard({ icon, tint, value, label }) {
  return (
    <Card sx={{ flex: 1, minWidth: 0 }}>
      <CardContent>
        <Box sx={{ width: 38, height: 38, borderRadius: 2, mb: 1.5, bgcolor: `${tint}22`, color: tint,
          display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{icon}</Box>
        <Typography sx={{ fontSize: 28, fontWeight: 800, lineHeight: 1 }}>{value}</Typography>
        <Typography sx={{ mt: 0.5, fontSize: 14, color: 'text.secondary' }}>{label}</Typography>
      </CardContent>
    </Card>
  );
}

function RowItem({ primary, secondary, onClick }) {
  return (
    <Stack direction="row" alignItems="center" spacing={1.5} onClick={onClick}
      sx={{ py: 1.5, px: 0.5, borderTop: '1px solid', borderColor: 'divider', cursor: 'pointer',
        '&:first-of-type': { borderTop: 0 } }}>
      <Box sx={{ width: 34, height: 34, borderRadius: 1.5, bgcolor: 'rgba(46,204,113,0.14)',
        color: 'primary.main', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <DescriptionOutlinedIcon fontSize="small" />
      </Box>
      <Box sx={{ flexGrow: 1, minWidth: 0 }}>
        <Typography sx={{ fontWeight: 700 }} noWrap>{primary}</Typography>
        <Typography variant="body2" color="text.secondary" noWrap>{secondary}</Typography>
      </Box>
      <ChevronRightIcon sx={{ color: 'text.secondary' }} />
    </Stack>
  );
}

function EditProfileDialog({ open, onClose, user }) {
  const [profile, setProfile] = useState({ displayName: '', avatarUrl: '', bio: '' });
  const [pw, setPw] = useState({ currentPassword: '', newPassword: '' });
  const [savedMsg, setSavedMsg] = useState('');
  const [pwMsg, setPwMsg] = useState('');
  const [updateProfile, { isLoading: saving, error: saveErr }] = useUpdateProfileMutation();
  const [changePassword, { isLoading: changing, error: pwErr }] = useChangePasswordMutation();

  useEffect(() => {
    if (user) setProfile({ displayName: user.displayName || '', avatarUrl: user.avatarUrl || '', bio: user.bio || '' });
  }, [user, open]);

  const saveProfile = async () => {
    setSavedMsg('');
    try { await updateProfile(profile).unwrap(); setSavedMsg('Profile saved.'); } catch { /* below */ }
  };
  const savePassword = async () => {
    setPwMsg('');
    try {
      await changePassword(pw).unwrap();
      setPw({ currentPassword: '', newPassword: '' });
      setPwMsg('Password changed. Other sessions were signed out.');
    } catch { /* below */ }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Edit profile</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          {saveErr && <ErrorState error={saveErr} />}
          {savedMsg && <Alert severity="success">{savedMsg}</Alert>}
          <TextField label="Display name" value={profile.displayName}
            onChange={(e) => setProfile({ ...profile, displayName: e.target.value })} />
          <TextField label="Avatar URL" value={profile.avatarUrl}
            onChange={(e) => setProfile({ ...profile, avatarUrl: e.target.value })} />
          <TextField label="Bio" value={profile.bio} multiline minRows={3}
            onChange={(e) => setProfile({ ...profile, bio: e.target.value })} />
          <Box sx={{ textAlign: 'right' }}>
            <Button variant="contained" onClick={saveProfile} disabled={saving}>
              {saving ? 'Saving…' : 'Save profile'}
            </Button>
          </Box>

          <Divider>Change password</Divider>
          {pwErr && <ErrorState error={pwErr} />}
          {pwMsg && <Alert severity="success">{pwMsg}</Alert>}
          <TextField label="Current password" type="password" value={pw.currentPassword}
            onChange={(e) => setPw({ ...pw, currentPassword: e.target.value })} />
          <TextField label="New password" type="password" value={pw.newPassword} helperText="At least 8 characters"
            onChange={(e) => setPw({ ...pw, newPassword: e.target.value })} />
          <Box sx={{ textAlign: 'right' }}>
            <Button variant="outlined" onClick={savePassword}
              disabled={changing || !pw.currentPassword || !pw.newPassword}>
              {changing ? 'Updating…' : 'Change password'}
            </Button>
          </Box>
        </Stack>
      </DialogContent>
      <DialogActions><Button onClick={onClose}>Done</Button></DialogActions>
    </Dialog>
  );
}

export default function ProfilePage() {
  const user = useSelector(selectCurrentUser);
  const navigate = useNavigate();
  const [logout] = useLogoutMutation();
  const [editOpen, setEditOpen] = useState(false);
  const [tab, setTab] = useState(0);

  // No "my X" endpoints yet, so derive the user's content by filtering the lists client-side.
  const { data: notesData } = useListNotesQuery({ size: 50 });
  const { data: questionsData } = useListQuestionsQuery({ size: 50 });
  const { data: groupsData } = useListGroupsQuery({ size: 50 });

  const myNotes = (notesData?.content || []).filter((n) => n.uploaderId === user?.id);
  const myQuestions = (questionsData?.content || []).filter((q) => q.authorId === user?.id);
  const myGroups = (groupsData?.content || []).filter((g) => g.joined);

  const onLogout = async () => {
    await logout().unwrap().catch(() => {});
    navigate('/login');
  };

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto' }}>
      {/* header card */}
      <Card sx={{ overflow: 'hidden', mb: 3 }}>
        <Box sx={{ height: 132, background: 'linear-gradient(140deg, #22A85D, #0F6E3C)' }} />
        <Box sx={{ px: 3, pb: 3 }}>
          <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between"
            alignItems={{ sm: 'flex-end' }} sx={{ mt: -5 }} spacing={2}>
            <Stack direction="row" spacing={2} alignItems="flex-end">
              <Avatar src={user?.avatarUrl} sx={{ width: 92, height: 92, fontSize: 28, fontWeight: 700,
                bgcolor: 'rgba(46,204,113,0.25)', color: 'primary.main',
                border: '4px solid', borderColor: 'background.paper' }}>
                {initials(user?.displayName)}
              </Avatar>
              <Box sx={{ pb: 0.5 }}>
                <Typography variant="h5">{user?.displayName}</Typography>
                <Typography color="text.secondary">{user?.email}</Typography>
              </Box>
            </Stack>
            <Stack direction="row" spacing={2} alignItems="center">
              <Button variant="outlined" onClick={() => setEditOpen(true)}>Edit profile</Button>
              <Link component="button" onClick={onLogout} underline="hover"
                sx={{ fontWeight: 700, color: 'primary.main' }}>Log out</Link>
            </Stack>
          </Stack>
          {user?.bio && <Typography sx={{ mt: 2 }} color="text.secondary">{user.bio}</Typography>}
        </Box>
      </Card>

      {/* stats */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr 1fr', md: 'repeat(4, 1fr)' }, gap: 2, mb: 3 }}>
        <StatCard icon={<DescriptionOutlinedIcon />} tint="#2ECC71" value={myNotes.length} label="Notes shared" />
        <StatCard icon={<ChatBubbleOutlineIcon />} tint="#5B9DFF" value="—" label="Answers given" />
        <StatCard icon={<EmojiEventsOutlinedIcon />} tint="#E0A82E" value="—" label="Reputation" />
        <StatCard icon={<GroupsOutlinedIcon />} tint="#F59E0B" value={myGroups.length} label="Groups" />
      </Box>

      {/* tabs */}
      <Card>
        <Tabs value={tab} onChange={(_e, v) => setTab(v)} sx={{ px: 2,
          borderBottom: '1px solid', borderColor: 'divider' }}>
          <Tab label="Notes" sx={{ textTransform: 'none', fontWeight: 700 }} />
          <Tab label="Questions" sx={{ textTransform: 'none', fontWeight: 700 }} />
          <Tab label="Answers" sx={{ textTransform: 'none', fontWeight: 700 }} />
        </Tabs>
        <CardContent>
          {tab === 0 && (
            myNotes.length === 0
              ? <EmptyState title="No notes uploaded yet" hint="Share your first set from Notes." />
              : myNotes.map((n) => (
                <RowItem key={n.id} primary={n.title} secondary={`${n.subjectName} · ${n.downloadCount} downloads`}
                  onClick={() => navigate('/notes')} />
              ))
          )}
          {tab === 1 && (
            myQuestions.length === 0
              ? <EmptyState title="No questions asked yet" hint="Ask one in the Q&A forum." />
              : myQuestions.map((q) => (
                <RowItem key={q.id} primary={q.title} secondary={`${q.subjectName} · ${q.viewCount} views`}
                  onClick={() => navigate(`/qa/${q.id}`)} />
              ))
          )}
          {tab === 2 && (
            <EmptyState title="Answers aren't listed yet"
              hint="A per-user answers feed isn't available in the API yet." />
          )}
        </CardContent>
      </Card>

      <EditProfileDialog open={editOpen} onClose={() => setEditOpen(false)} user={user} />
    </Box>
  );
}
