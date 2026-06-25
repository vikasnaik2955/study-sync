import { useState } from 'react';
import {
  Box, Button, Card, CardActionArea, CardContent, Chip, Dialog, DialogActions, DialogContent,
  DialogTitle, Stack, TextField, Typography,
} from '@mui/material';
import VideocamIcon from '@mui/icons-material/Videocam';
import { useNavigate } from 'react-router-dom';
import { useListRoomsQuery, useCreateRoomMutation } from './roomsApi';
import SubjectSelect from '../../components/SubjectSelect';
import { Loading, EmptyState, ErrorState } from '../../components/states';

function CreateRoomDialog({ open, onClose }) {
  const [form, setForm] = useState({ name: '', subjectId: '' });
  const [create, { isLoading, error }] = useCreateRoomMutation();
  const navigate = useNavigate();

  const submit = async () => {
    try {
      const room = await create(form).unwrap();
      onClose();
      navigate(`/rooms/${room.id}`);
    } catch {
      /* surfaced below */
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Open a study room</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          {error && <ErrorState error={error} />}
          <TextField label="Room name" value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          <SubjectSelect value={form.subjectId} onChange={(v) => setForm({ ...form, subjectId: v })} required />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={submit} disabled={isLoading || !form.name || !form.subjectId}>
          {isLoading ? 'Opening…' : 'Open room'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default function RoomsPage() {
  const [subjectId, setSubjectId] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const navigate = useNavigate();
  const { data, isLoading, error } = useListRoomsQuery({ subjectId });
  const rooms = data?.content || [];

  return (
    <Box>
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 3 }}>
        <Typography variant="h4">Virtual study rooms</Typography>
        <Button variant="contained" startIcon={<VideocamIcon />} onClick={() => setDialogOpen(true)}>
          Open a room
        </Button>
      </Stack>

      <SubjectSelect value={subjectId} onChange={setSubjectId} allowAll sx={{ minWidth: 220, mb: 3 }} />

      {isLoading && <Loading />}
      {error && <ErrorState error={error} />}
      {!isLoading && !error && rooms.length === 0 && (
        <EmptyState title="No active rooms" hint="Open one and invite your group." />
      )}

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
        {rooms.map((r) => (
          <Card key={r.id} variant="outlined">
            <CardActionArea onClick={() => navigate(`/rooms/${r.id}`)}>
              <CardContent>
                <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                  <Typography variant="h6">{r.name}</Typography>
                  <Chip size="small" color="success" label={`${r.participantCount} live`} />
                </Stack>
                <Stack direction="row" spacing={1} sx={{ mt: 0.5 }}>
                  <Chip size="small" label={r.subjectName} color="primary" variant="outlined" />
                  <Typography variant="body2" color="text.secondary">hosted by {r.hostName}</Typography>
                </Stack>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Box>

      <CreateRoomDialog open={dialogOpen} onClose={() => setDialogOpen(false)} />
    </Box>
  );
}
