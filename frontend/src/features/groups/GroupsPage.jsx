import { useState } from 'react';
import {
  Box, Button, Card, CardActionArea, CardContent, Chip, Dialog, DialogActions, DialogContent,
  DialogTitle, Stack, TextField, Typography,
} from '@mui/material';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { useNavigate } from 'react-router-dom';
import { useListGroupsQuery, useCreateGroupMutation, useJoinGroupMutation } from './groupsApi';
import SubjectSelect from '../../components/SubjectSelect';
import { Loading, EmptyState, ErrorState } from '../../components/states';

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
  const [subjectId, setSubjectId] = useState('');
  const [q, setQ] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const navigate = useNavigate();
  const { data, isLoading, error } = useListGroupsQuery({ subjectId, q });
  const [join] = useJoinGroupMutation();

  const groups = data?.content || [];

  return (
    <Box>
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 3 }}>
        <Typography variant="h4">Study groups</Typography>
        <Button variant="contained" startIcon={<GroupAddIcon />} onClick={() => setDialogOpen(true)}>
          Create group
        </Button>
      </Stack>

      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 3 }}>
        <TextField label="Search groups" value={q} onChange={(e) => setQ(e.target.value)} fullWidth />
        <SubjectSelect value={subjectId} onChange={setSubjectId} allowAll sx={{ minWidth: 200 }} />
      </Stack>

      {isLoading && <Loading />}
      {error && <ErrorState error={error} />}
      {!isLoading && !error && groups.length === 0 && (
        <EmptyState title="No groups yet" hint="Start one for your subject." />
      )}

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
        {groups.map((g) => (
          <Card key={g.id} variant="outlined">
            <CardActionArea onClick={() => navigate(`/groups/${g.id}`)}>
              <CardContent>
                <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                  <Typography variant="h6">{g.name}</Typography>
                  <Chip size="small" label={g.subjectName} color="primary" variant="outlined" />
                </Stack>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                  {g.memberCount} members · led by {g.ownerName}
                </Typography>
                {g.description && (
                  <Typography variant="body2" sx={{ mt: 1 }} noWrap>{g.description}</Typography>
                )}
              </CardContent>
            </CardActionArea>
            <Box sx={{ px: 2, pb: 2 }}>
              {g.joined ? (
                <Chip size="small" label="Joined" color="success" />
              ) : (
                <Button size="small" variant="outlined" onClick={() => join(g.id)}>Join</Button>
              )}
            </Box>
          </Card>
        ))}
      </Box>

      <CreateGroupDialog open={dialogOpen} onClose={() => setDialogOpen(false)} />
    </Box>
  );
}
