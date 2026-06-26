import { useState } from 'react';
import {
  Box, Button, Card, CardContent, Dialog, DialogActions, DialogContent, DialogTitle, Link,
  Stack, TextField, Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { useNavigate } from 'react-router-dom';
import { useListGroupsQuery, useCreateGroupMutation, useJoinGroupMutation, useLeaveGroupMutation } from './groupsApi';
import SubjectSelect from '../../components/SubjectSelect';
import { Loading, EmptyState, ErrorState } from '../../components/states';
import { subjectColor } from '../../lib/subjectColor';

function GroupCard({ group, onJoin, onLeave, onView }) {
  const color = subjectColor(group.subjectName);
  return (
    <Card sx={{ borderLeft: '4px solid', borderLeftColor: color }}>
      <CardContent>
        <Stack direction="row" spacing={1.5} alignItems="flex-start">
          <Box sx={{ width: 42, height: 42, borderRadius: 2, bgcolor: `${color}22`, color,
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <GroupsOutlinedIcon />
          </Box>
          <Box sx={{ flexGrow: 1, minWidth: 0 }}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography sx={{ fontWeight: 700, fontSize: 17 }} noWrap>{group.name}</Typography>
              {group.joined && (
                <Stack direction="row" alignItems="center" spacing={0.25}
                  sx={{ color: 'primary.main', flexShrink: 0 }}>
                  <FiberManualRecordIcon sx={{ fontSize: 9 }} />
                  <Typography sx={{ fontSize: 12.5, fontWeight: 700 }}>Joined</Typography>
                </Stack>
              )}
            </Stack>
            <Typography variant="body2" color="text.secondary">
              {group.subjectName} · {group.memberCount} members
            </Typography>
          </Box>
        </Stack>

        {group.description && (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1.5 }}>{group.description}</Typography>
        )}

        <Stack direction="row" alignItems="center" spacing={2.5} sx={{ mt: 2 }}>
          {group.joined
            ? <Button variant="outlined" size="small" onClick={() => onLeave(group.id)}>Leave</Button>
            : <Button variant="contained" size="small" onClick={() => onJoin(group.id)}>Join</Button>}
          <Link component="button" onClick={() => onView(group.id)} underline="hover"
            sx={{ fontWeight: 700, color: 'primary.main' }}>View group</Link>
        </Stack>
      </CardContent>
    </Card>
  );
}

function CreateGroupDialog({ open, onClose }) {
  const [form, setForm] = useState({ name: '', description: '', subjectId: '' });
  const [create, { isLoading, error }] = useCreateGroupMutation();
  const navigate = useNavigate();

  const submit = async () => {
    try {
      const group = await create(form).unwrap();
      onClose();
      navigate(`/groups/${group.id}`);
    } catch {
      /* surfaced below */
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Create study group</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          {error && <ErrorState error={error} />}
          <TextField label="Group name" value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          <SubjectSelect value={form.subjectId} onChange={(v) => setForm({ ...form, subjectId: v })} required />
          <TextField label="Description" value={form.description} multiline minRows={2}
            onChange={(e) => setForm({ ...form, description: e.target.value })} />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={submit} disabled={isLoading || !form.name || !form.subjectId}>
          {isLoading ? 'Creating…' : 'Create'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default function GroupsPage() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const navigate = useNavigate();
  const { data, isLoading, error } = useListGroupsQuery({ size: 24 });
  const [join] = useJoinGroupMutation();
  const [leave] = useLeaveGroupMutation();

  const groups = data?.content || [];

  return (
    <Box>
      <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between"
        alignItems={{ sm: 'flex-start' }} spacing={2} sx={{ mb: 3 }}>
        <Box>
          <Typography variant="h4">Study groups</Typography>
          <Typography color="text.secondary" sx={{ mt: 0.5 }}>
            Find your subject. Learn with people on the same path.
          </Typography>
        </Box>
        <Button variant="contained" size="large" startIcon={<AddIcon />}
          onClick={() => setDialogOpen(true)}
          sx={{ borderRadius: 2.5, boxShadow: '0 8px 18px rgba(31,157,87,0.30)' }}>
          Create group
        </Button>
      </Stack>

      {isLoading && <Loading />}
      {error && <ErrorState error={error} />}
      {!isLoading && !error && groups.length === 0 && (
        <EmptyState title="No groups yet" hint="Start one for your subject." />
      )}

      <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' } }}>
        {groups.map((g) => (
          <GroupCard key={g.id} group={g} onJoin={join} onLeave={leave}
            onView={(id) => navigate(`/groups/${id}`)} />
        ))}
      </Box>

      <CreateGroupDialog open={dialogOpen} onClose={() => setDialogOpen(false)} />
    </Box>
  );
}
