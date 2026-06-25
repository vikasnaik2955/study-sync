import { useEffect, useState } from 'react';
import {
  Alert, Avatar, Box, Button, Card, CardContent, Divider, Stack, TextField, Typography,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../auth/authSlice';
import { useUpdateProfileMutation, useChangePasswordMutation } from '../users/usersApi';
import { ErrorState } from '../../components/states';

export default function ProfilePage() {
  const user = useSelector(selectCurrentUser);
  const [profile, setProfile] = useState({ displayName: '', avatarUrl: '', bio: '' });
  const [pw, setPw] = useState({ currentPassword: '', newPassword: '' });
  const [savedMsg, setSavedMsg] = useState('');
  const [pwMsg, setPwMsg] = useState('');

  const [updateProfile, { isLoading: saving, error: saveErr }] = useUpdateProfileMutation();
  const [changePassword, { isLoading: changing, error: pwErr }] = useChangePasswordMutation();

  useEffect(() => {
    if (user) setProfile({ displayName: user.displayName || '', avatarUrl: user.avatarUrl || '', bio: user.bio || '' });
  }, [user]);

  const saveProfile = async () => {
    setSavedMsg('');
    try {
      await updateProfile(profile).unwrap();
      setSavedMsg('Profile saved.');
    } catch {
      /* surfaced below */
    }
  };

  const savePassword = async () => {
    setPwMsg('');
    try {
      await changePassword(pw).unwrap();
      setPw({ currentPassword: '', newPassword: '' });
      setPwMsg('Password changed. Other sessions were signed out.');
    } catch {
      /* surfaced below */
    }
  };

  return (
    <Box sx={{ maxWidth: 640, mx: 'auto' }}>
      <Typography variant="h4" sx={{ mb: 3 }}>Edit profile</Typography>

      <Card variant="outlined" sx={{ mb: 3 }}>
        <CardContent>
          <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
            <Avatar src={profile.avatarUrl} sx={{ width: 64, height: 64 }}>
              {profile.displayName?.[0]?.toUpperCase()}
            </Avatar>
            <Box>
              <Typography variant="h6">{user?.displayName}</Typography>
              <Typography variant="body2" color="text.secondary">{user?.email}</Typography>
            </Box>
          </Stack>
          <Stack spacing={2}>
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
          </Stack>
        </CardContent>
      </Card>

      <Card variant="outlined">
        <CardContent>
          <Typography variant="h6" gutterBottom>Change password</Typography>
          <Divider sx={{ mb: 2 }} />
          <Stack spacing={2}>
            {pwErr && <ErrorState error={pwErr} />}
            {pwMsg && <Alert severity="success">{pwMsg}</Alert>}
            <TextField label="Current password" type="password" value={pw.currentPassword}
              onChange={(e) => setPw({ ...pw, currentPassword: e.target.value })} />
            <TextField label="New password" type="password" value={pw.newPassword}
              helperText="At least 8 characters"
              onChange={(e) => setPw({ ...pw, newPassword: e.target.value })} />
            <Box sx={{ textAlign: 'right' }}>
              <Button variant="outlined" onClick={savePassword}
                disabled={changing || !pw.currentPassword || !pw.newPassword}>
                {changing ? 'Updating…' : 'Change password'}
              </Button>
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}
