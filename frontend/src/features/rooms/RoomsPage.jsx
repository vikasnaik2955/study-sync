import { useState } from 'react';
import {
  Box, Button, Card, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField, Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DesktopWindowsOutlinedIcon from '@mui/icons-material/DesktopWindowsOutlined';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import { useNavigate } from 'react-router-dom';
import { useListRoomsQuery, useCreateRoomMutation } from './roomsApi';
import SubjectSelect from '../../components/SubjectSelect';
import { Loading, EmptyState, ErrorState } from '../../components/states';
import { subjectColor } from '../../lib/subjectColor';

function RoomCard({ room, onJoin }) {
  const color = subjectColor(room.subjectName);
  const ended = room.status === 'ENDED';
  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* banner */}
      <Box sx={{ position: 'relative', height: 132, display: 'flex', alignItems: 'center',
        justifyContent: 'center',
        background: ended
          ? 'linear-gradient(140deg, #6D5BD0, #4C3FA8)'
          : `linear-gradient(140deg, ${color}, ${color}AA)` }}>
        <DesktopWindowsOutlinedIcon sx={{ color: 'rgba(255,255,255,0.92)', fontSize: 44 }} />
        <Stack direction="row" alignItems="center" spacing={0.5} sx={{ position: 'absolute', top: 12, left: 12,
          px: 1, py: 0.4, borderRadius: 5, bgcolor: 'rgba(0,0,0,0.28)', color: '#fff' }}>
          {!ended && <FiberManualRecordIcon sx={{ fontSize: 9, color: '#3DF08A' }} />}
          <Typography sx={{ fontSize: 11.5, fontWeight: 700 }}>{ended ? 'Ended' : 'Live'}</Typography>
        </Stack>
      </Box>

      <Box sx={{ p: 2, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography sx={{ fontWeight: 700, fontSize: 17 }}>{room.name}</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.25 }}>
          {room.subjectName} · hosted by {room.hostName}
        </Typography>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mt: 2 }}>
          <Stack direction="row" alignItems="center" spacing={0.75} sx={{ color: 'text.secondary' }}>
            <PeopleAltOutlinedIcon sx={{ fontSize: 18 }} />
            <Typography variant="body2">{room.participantCount} studying</Typography>
          </Stack>
          {ended
            ? <Button size="small" disabled variant="outlined">Ended</Button>
            : <Button size="small" variant="contained" onClick={() => onJoin(room.id)}>Join room</Button>}
        </Stack>
      </Box>
    </Card>
  );
}

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
  const [dialogOpen, setDialogOpen] = useState(false);
  const navigate = useNavigate();
  const { data, isLoading, error } = useListRoomsQuery({ size: 24 }, { pollingInterval: 30000 });
  const rooms = data?.content || [];

  return (
    <Box>
      <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between"
        alignItems={{ sm: 'flex-start' }} spacing={2} sx={{ mb: 3 }}>
        <Box>
          <Typography variant="h4">Virtual study rooms</Typography>
          <Typography color="text.secondary" sx={{ mt: 0.5 }}>
            Drop into a live room or open your own. Shared notes &amp; discussion included.
          </Typography>
        </Box>
        <Button variant="contained" size="large" startIcon={<AddIcon />}
          onClick={() => setDialogOpen(true)}
          sx={{ borderRadius: 2.5, boxShadow: '0 8px 18px rgba(31,157,87,0.30)' }}>
          Open a room
        </Button>
      </Stack>

      {isLoading && <Loading />}
      {error && <ErrorState error={error} />}
      {!isLoading && !error && rooms.length === 0 && (
        <EmptyState title="No active rooms" hint="Open one and invite your group." />
      )}

      <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(3, 1fr)' } }}>
        {rooms.map((r) => (
          <RoomCard key={r.id} room={r} onJoin={(id) => navigate(`/rooms/${id}`)} />
        ))}
      </Box>

      <CreateRoomDialog open={dialogOpen} onClose={() => setDialogOpen(false)} />
    </Box>
  );
}
