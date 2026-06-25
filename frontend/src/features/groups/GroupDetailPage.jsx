import { useState } from 'react';
import {
  Avatar, Box, Button, Card, CardContent, Chip, Divider, IconButton, List, ListItem,
  ListItemAvatar, ListItemText, Paper, Stack, TextField, Typography,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import DownloadIcon from '@mui/icons-material/Download';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  useGetGroupQuery, useGroupMembersQuery, useGroupNotesQuery, useGroupPostsQuery,
  useCreateGroupPostMutation, useJoinGroupMutation, useLeaveGroupMutation,
} from './groupsApi';
import { selectCurrentUser } from '../auth/authSlice';
import { Loading, EmptyState, ErrorState } from '../../components/states';
import { downloadNote } from '../../lib/download';

function Discussion({ groupId }) {
  const [body, setBody] = useState('');
  const { data, isLoading } = useGroupPostsQuery({ id: groupId });
  const [createPost, { isLoading: posting }] = useCreateGroupPostMutation();
  const posts = data?.content || [];

  const send = async () => {
    if (!body.trim()) return;
    await createPost({ id: groupId, body }).unwrap().catch(() => {});
    setBody('');
  };

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h6" gutterBottom>Group discussion</Typography>
        <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
          <TextField fullWidth size="small" placeholder="Write a message…" value={body}
            onChange={(e) => setBody(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && send()} />
          <IconButton color="primary" onClick={send} disabled={posting}><SendIcon /></IconButton>
        </Stack>
        {isLoading && <Loading />}
        {!isLoading && posts.length === 0 && <EmptyState title="No messages yet" />}
        <Stack spacing={1.5}>
          {posts.map((p) => (
            <Box key={p.id}>
              <Typography variant="subtitle2">{p.authorName}</Typography>
              <Typography variant="body2" color="text.secondary">{p.body}</Typography>
            </Box>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
}

export default function GroupDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = useSelector(selectCurrentUser);
  const accessToken = useSelector((s) => s.auth.accessToken);
  const { data: group, isLoading, error } = useGetGroupQuery(id);
  const { data: members = [] } = useGroupMembersQuery(id, { skip: !group?.joined });
  const { data: notes = [] } = useGroupNotesQuery(id, { skip: !group?.joined });
  const [join] = useJoinGroupMutation();
  const [leave] = useLeaveGroupMutation();

  if (isLoading) return <Loading />;
  if (error) return <ErrorState error={error} />;

  return (
    <Box>
      <Paper variant="outlined" sx={{ p: 3, mb: 3 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
          <Box>
            <Typography variant="h4">{group.name}</Typography>
            <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 1 }}>
              <Chip size="small" label={group.subjectName} color="primary" variant="outlined" />
              <Typography color="text.secondary">{group.memberCount} members · {group.ownerName}</Typography>
            </Stack>
            {group.description && <Typography sx={{ mt: 1.5 }}>{group.description}</Typography>}
          </Box>
          <Stack direction="row" spacing={1}>
            {group.joined && (
              <Button variant="outlined" startIcon={<ChatBubbleOutlineIcon />}
                onClick={() => navigate('/chat', { state: { open: { groupId: id } } })}>
                Group chat
              </Button>
            )}
            {group.joined ? (
              group.ownerId !== user?.id && (
                <Button variant="outlined" color="error" onClick={() => leave(id)}>Leave</Button>
              )
            ) : (
              <Button variant="contained" onClick={() => join(id)}>Join group</Button>
            )}
          </Stack>
        </Stack>
      </Paper>

      {!group.joined ? (
        <EmptyState title="Join to see members, shared notes, and discussion" />
      ) : (
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
          <Stack spacing={2}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" gutterBottom>Members</Typography>
                <List dense>
                  {members.map((m) => (
                    <ListItem key={m.userId} disableGutters
                      secondaryAction={m.userId !== user?.id && (
                        <IconButton edge="end" size="small" title="Message"
                          onClick={() => navigate('/chat', { state: { open: { participantId: m.userId } } })}>
                          <ChatBubbleOutlineIcon fontSize="small" />
                        </IconButton>
                      )}>
                      <ListItemAvatar>
                        <Avatar src={m.avatarUrl}>{m.displayName?.[0]}</Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={m.displayName} secondary={m.role} />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" gutterBottom>Shared resources</Typography>
                {notes.length === 0 && <EmptyState title="No shared notes yet" />}
                {notes.map((n) => (
                  <Box key={n.id}>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ py: 0.5 }}>
                      <Box sx={{ minWidth: 0 }}>
                        <Typography noWrap>{n.title}</Typography>
                        <Typography variant="caption" color="text.secondary">{n.subjectName}</Typography>
                      </Box>
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
          <Discussion groupId={id} />
        </Box>
      )}
    </Box>
  );
}
