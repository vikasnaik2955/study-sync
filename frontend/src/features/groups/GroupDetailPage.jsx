import { useState } from 'react';
import {
  Avatar, Box, Button, Card, CardContent, Divider, IconButton, List, ListItem, ListItemAvatar,
  ListItemText, Stack, TextField, Typography,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import DownloadIcon from '@mui/icons-material/Download';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  useGetGroupQuery, useGroupMembersQuery, useGroupNotesQuery, useGroupPostsQuery,
  useCreateGroupPostMutation, useJoinGroupMutation, useLeaveGroupMutation,
} from './groupsApi';
import { selectCurrentUser } from '../auth/authSlice';
import { Loading, EmptyState, ErrorState } from '../../components/states';
import { downloadNote } from '../../lib/download';
import { subjectColor } from '../../lib/subjectColor';

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
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>Group discussion</Typography>
        <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
          <TextField fullWidth size="small" placeholder="Write a message…" value={body}
            onChange={(e) => setBody(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && send()} />
          <IconButton color="primary" onClick={send} disabled={posting}><SendIcon /></IconButton>
        </Stack>
        {isLoading && <Loading />}
        {!isLoading && posts.length === 0 && <EmptyState title="No messages yet" />}
        <Stack spacing={2}>
          {posts.map((p) => (
            <Stack key={p.id} direction="row" spacing={1.5}>
              <Avatar src={p.authorAvatarUrl} sx={{ width: 32, height: 32, fontSize: 13,
                bgcolor: subjectColor(p.authorName), color: '#fff' }}>
                {p.authorName?.[0]}
              </Avatar>
              <Box>
                <Typography variant="subtitle2">{p.authorName}</Typography>
                <Typography variant="body2" color="text.secondary">{p.body}</Typography>
              </Box>
            </Stack>
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

  const color = subjectColor(group.subjectName);

  return (
    <Box>
      <Card sx={{ borderLeft: '4px solid', borderLeftColor: color, mb: 3 }}>
        <CardContent>
          <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between"
            alignItems={{ sm: 'flex-start' }} spacing={2}>
            <Stack direction="row" spacing={2} alignItems="flex-start">
              <Box sx={{ width: 52, height: 52, borderRadius: 2, bgcolor: `${color}22`, color,
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <GroupsOutlinedIcon />
              </Box>
              <Box>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Typography variant="h5">{group.name}</Typography>
                  {group.joined && (
                    <Stack direction="row" alignItems="center" spacing={0.25} sx={{ color: 'primary.main' }}>
                      <FiberManualRecordIcon sx={{ fontSize: 9 }} />
                      <Typography sx={{ fontSize: 12.5, fontWeight: 700 }}>Joined</Typography>
                    </Stack>
                  )}
                </Stack>
                <Typography color="text.secondary" sx={{ mt: 0.25 }}>
                  {group.subjectName} · {group.memberCount} members · led by {group.ownerName}
                </Typography>
                {group.description && <Typography sx={{ mt: 1.5 }}>{group.description}</Typography>}
              </Box>
            </Stack>
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
        </CardContent>
      </Card>

      {!group.joined ? (
        <EmptyState title="Join to see members, shared notes, and discussion" />
      ) : (
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
          <Stack spacing={2}>
            <Card>
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
                        <Avatar src={m.avatarUrl} sx={{ bgcolor: subjectColor(m.displayName), color: '#fff' }}>
                          {m.displayName?.[0]}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={m.displayName} secondary={m.role} />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>Shared resources</Typography>
                {notes.length === 0 && <EmptyState title="No shared notes yet" />}
                {notes.map((n) => (
                  <Box key={n.id}>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ py: 0.75 }}>
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
