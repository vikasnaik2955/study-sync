import { useEffect, useRef, useState } from 'react';
import {
  Avatar, AvatarGroup, Box, Button, Card, CardContent, Divider, IconButton, Stack, TextField, Typography,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import DownloadIcon from '@mui/icons-material/Download';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  useGetRoomQuery, useJoinRoomMutation, useLeaveRoomMutation, useEndRoomMutation,
} from './roomsApi';
import { selectCurrentUser } from '../auth/authSlice';
import { useStomp } from '../../app/StompProvider';
import { Loading, EmptyState, ErrorState } from '../../components/states';
import { downloadNote } from '../../lib/download';
import { subjectColor } from '../../lib/subjectColor';

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

  const [feed, setFeed] = useState([]);
  const [draft, setDraft] = useState('');
  const bottomRef = useRef(null);

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
  const color = subjectColor(room.subjectName);
  const isHost = room.hostId === me?.id;
  const ended = room.status === 'ENDED';

  const send = () => {
    if (!draft.trim()) return;
    publish('/app/room.post', { roomId: id, body: draft });
    setDraft('');
  };

  return (
    <Box>
      <Card sx={{ mb: 3, overflow: 'hidden' }}>
        <Box sx={{ height: 96, background: ended
          ? 'linear-gradient(140deg, #6D5BD0, #4C3FA8)'
          : `linear-gradient(140deg, ${color}, ${color}AA)` }} />
        <CardContent>
          <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between"
            alignItems={{ sm: 'flex-end' }} spacing={2} sx={{ mt: -1 }}>
            <Box>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Typography variant="h5">{room.name}</Typography>
                <Stack direction="row" alignItems="center" spacing={0.5}
                  sx={{ px: 1, py: 0.3, borderRadius: 5,
                    bgcolor: ended ? 'rgba(255,255,255,0.08)' : 'rgba(46,204,113,0.16)',
                    color: ended ? 'text.secondary' : 'primary.main' }}>
                  {!ended && <FiberManualRecordIcon sx={{ fontSize: 9 }} />}
                  <Typography sx={{ fontSize: 11.5, fontWeight: 700 }}>{ended ? 'Ended' : 'Live'}</Typography>
                </Stack>
              </Stack>
              <Typography color="text.secondary" sx={{ mt: 0.25 }}>
                {room.subjectName} · hosted by {room.hostName}
              </Typography>
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
        </CardContent>
      </Card>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
        <Stack spacing={2}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Participants ({participants.length})</Typography>
              {participants.length === 0
                ? <Typography variant="body2" color="text.secondary">No one here yet.</Typography>
                : (
                  <AvatarGroup max={8} sx={{ justifyContent: 'flex-start' }}>
                    {participants.map((p) => (
                      <Avatar key={p.userId} src={p.avatarUrl}
                        sx={{ bgcolor: subjectColor(p.displayName), color: '#fff' }}>
                        {p.displayName?.[0]}
                      </Avatar>
                    ))}
                  </AvatarGroup>
                )}
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Shared notes</Typography>
              {notes.length === 0 && <EmptyState title="No shared notes yet" />}
              {notes.map((n) => (
                <Box key={n.id}>
                  <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ py: 0.75 }}>
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

        <Card>
          <CardContent sx={{ display: 'flex', flexDirection: 'column', height: 440 }}>
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
