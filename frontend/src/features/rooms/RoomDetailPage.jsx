import { useEffect, useRef, useState } from 'react';
import {
  Avatar, AvatarGroup, Box, Button, Card, CardContent, Chip, Divider, IconButton, Paper,
  Stack, TextField, Typography,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import DownloadIcon from '@mui/icons-material/Download';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  useGetRoomQuery, useJoinRoomMutation, useLeaveRoomMutation, useEndRoomMutation,
} from './roomsApi';
import { selectCurrentUser } from '../auth/authSlice';
import { useStomp } from '../../app/StompProvider';
import { Loading, EmptyState, ErrorState } from '../../components/states';
import { downloadNote } from '../../lib/download';

export default function RoomDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const me = useSelector(selectCurrentUser);
  const accessToken = useSelector((s) => s.auth.accessToken);
  const { data, isLoading, error, refetch } = useGetRoomQuery(id);
  const [join] = useJoinRoomMutation();
  const [leave] = useLeaveRoomMutation();
  const [endRoom] = useEndRoomMutation();
  const { subscribe, publish } = useStomp();

  const [feed, setFeed] = useState([]); // live discussion + join/leave events
  const [draft, setDraft] = useState('');
  const bottomRef = useRef(null);

  // Live room stream: discussion posts plus participant/end events. Membership changes refetch
  // the room so the participant list and counts stay accurate.
  useEffect(() => {
    const unsub = subscribe(`/topic/room/${id}`, (event) => {
      if (event.type === 'ROOM_POST') {
        setFeed((prev) => [...prev, { kind: 'post', name: event.displayName, body: event.body }]);
      } else if (event.type === 'ROOM_ENDED') {
        setFeed((prev) => [...prev, { kind: 'system', body: 'The host ended this room.' }]);
        refetch();
      } else {
        const verb = event.type === 'PARTICIPANT_JOINED' ? 'joined' : 'left';
        setFeed((prev) => [...prev, { kind: 'system', body: `${event.displayName} ${verb}.` }]);
        refetch();
      }
    });
    return unsub;
  }, [id, subscribe, refetch]);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [feed.length]);

  if (isLoading) return <Loading />;
  if (error) return <ErrorState error={error} />;

  const { room, participants, notes } = data;
  const isHost = room.hostId === me?.id;
  const ended = room.status === 'ENDED';

  const send = () => {
    if (!draft.trim()) return;
    publish('/app/room.post', { roomId: id, body: draft });
    setDraft('');
  };

  return (
    <Box>
      <Paper variant="outlined" sx={{ p: 3, mb: 3 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
          <Box>
            <Typography variant="h4">{room.name}</Typography>
            <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 1 }}>
              <Chip size="small" label={room.subjectName} color="primary" variant="outlined" />
              <Chip size="small" color={ended ? 'default' : 'success'} label={ended ? 'Ended' : 'Live'} />
              <Typography color="text.secondary">hosted by {room.hostName}</Typography>
            </Stack>
          </Box>
          <Stack direction="row" spacing={1}>
            {!ended && !room.joined && <Button variant="contained" onClick={() => join(id)}>Join</Button>}
            {!ended && room.joined && !isHost && (
              <Button variant="outlined" color="error" onClick={() => leave(id)}>Leave</Button>
            )}
            {!ended && isHost && (
              <Button variant="outlined" color="error"
                onClick={async () => { await endRoom(id); navigate('/rooms'); }}>End room</Button>
            )}
          </Stack>
        </Stack>
      </Paper>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
        <Stack spacing={2}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" gutterBottom>Participants ({participants.length})</Typography>
              <AvatarGroup max={8} sx={{ justifyContent: 'flex-start' }}>
                {participants.map((p) => (
                  <Avatar key={p.userId} src={p.avatarUrl}>{p.displayName?.[0]}</Avatar>
                ))}
              </AvatarGroup>
            </CardContent>
          </Card>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" gutterBottom>Shared notes</Typography>
              {notes.length === 0 && <EmptyState title="No shared notes yet" />}
              {notes.map((n) => (
                <Box key={n.id}>
                  <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ py: 0.5 }}>
                    <Typography noWrap>{n.title}</Typography>
                    <IconButton size="small" color="primary"
                      onClick={() => downloadNote(n.id, n.originalFilename, accessToken)}>
                      <DownloadIcon fontSize="small" />
                    </IconButton>
                  </Stack>
                  <Divider />
                </Box>
              ))}
            </CardContent>
          </Card>
        </Stack>

        <Card variant="outlined">
          <CardContent sx={{ display: 'flex', flexDirection: 'column', height: 420 }}>
            <Typography variant="h6" gutterBottom>Room discussion</Typography>
            <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
              {feed.length === 0 && <EmptyState title="Discussion is quiet" hint="Say something." />}
              {feed.map((f, i) => (
                f.kind === 'system' ? (
                  <Typography key={i} variant="caption" color="text.secondary"
                    sx={{ display: 'block', textAlign: 'center', my: 0.5 }}>{f.body}</Typography>
                ) : (
                  <Box key={i} sx={{ mb: 1 }}>
                    <Typography variant="subtitle2" component="span">{f.name}: </Typography>
                    <Typography variant="body2" component="span">{f.body}</Typography>
                  </Box>
                )
              ))}
              <div ref={bottomRef} />
            </Box>
            {!ended && room.joined && (
              <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                <TextField fullWidth size="small" placeholder="Message the room…" value={draft}
                  onChange={(e) => setDraft(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && send()} />
                <IconButton color="primary" onClick={send}><SendIcon /></IconButton>
              </Stack>
            )}
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
