import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Avatar, Box, Divider, IconButton, List, ListItemButton, ListItemAvatar, ListItemText,
  Paper, Stack, TextField, Typography,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  useListConversationsQuery, useOpenConversationMutation, useConversationMessagesQuery,
} from './chatApi';
import { selectCurrentUser } from '../auth/authSlice';
import { useStomp } from '../../app/StompProvider';
import { Loading, EmptyState } from '../../components/states';

function MessageList({ conversationId }) {
  const me = useSelector(selectCurrentUser);
  const { data, isLoading } = useConversationMessagesQuery({ id: conversationId });
  const { subscribe, publish } = useStomp();
  const [live, setLive] = useState([]);
  const [draft, setDraft] = useState('');
  const bottomRef = useRef(null);

  // History (REST) comes newest-first; show oldest-first. Live deltas append.
  const history = useMemo(() => [...(data?.content || [])].reverse(), [data]);
  const messages = useMemo(() => [...history, ...live], [history, live]);

  useEffect(() => { setLive([]); }, [conversationId]);

  useEffect(() => {
    const unsub = subscribe(`/topic/conversation/${conversationId}`, (event) => {
      if (event.type === 'MESSAGE_CREATED') {
        setLive((prev) => [...prev, event.message]);
      }
    });
    return unsub;
  }, [conversationId, subscribe]);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages.length]);

  const send = () => {
    if (!draft.trim()) return;
    publish('/app/chat.send', { conversationId, body: draft });
    setDraft('');
  };

  if (isLoading) return <Loading />;

  return (
    <Stack sx={{ height: '100%' }}>
      <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 2 }}>
        {messages.length === 0 && <EmptyState title="No messages yet" hint="Say hello 👋" />}
        {messages.map((m, i) => {
          const mine = m.senderId === me?.id;
          return (
            <Box key={m.id || i} sx={{ display: 'flex', justifyContent: mine ? 'flex-end' : 'flex-start', mb: 1 }}>
              <Paper variant="outlined" sx={{
                px: 1.5, py: 1, maxWidth: '70%',
                bgcolor: mine ? 'primary.light' : 'background.paper',
              }}>
                {!mine && <Typography variant="caption" color="text.secondary">{m.senderName}</Typography>}
                {m.body && <Typography variant="body2">{m.body}</Typography>}
                {m.attachmentUrl && (
                  <Typography variant="body2"><a href={m.attachmentUrl}>Attachment</a></Typography>
                )}
              </Paper>
            </Box>
          );
        })}
        <div ref={bottomRef} />
      </Box>
      <Divider />
      <Stack direction="row" spacing={1} sx={{ p: 1.5 }}>
        <TextField fullWidth size="small" placeholder="Type a message…" value={draft}
          onChange={(e) => setDraft(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && send()} />
        <IconButton color="primary" onClick={send}><SendIcon /></IconButton>
      </Stack>
    </Stack>
  );
}

export default function ChatPage() {
  const location = useLocation();
  const { data: conversations = [], isLoading } = useListConversationsQuery();
  const [openConversation] = useOpenConversationMutation();
  const [selectedId, setSelectedId] = useState(null);

  // Opened from elsewhere (e.g. "Message" on a group member) via navigation state.
  useEffect(() => {
    const open = location.state?.open;
    if (open) {
      openConversation(open).unwrap().then((c) => setSelectedId(c.id)).catch(() => {});
    }
  }, [location.state, openConversation]);

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3 }}>Messages</Typography>
      <Paper variant="outlined" sx={{ display: 'flex', height: '70vh' }}>
        <Box sx={{ width: 280, borderRight: '1px solid', borderColor: 'divider', overflowY: 'auto' }}>
          {isLoading && <Loading />}
          {!isLoading && conversations.length === 0 && (
            <EmptyState title="No chats yet" hint="Start one from a group member." />
          )}
          <List disablePadding>
            {conversations.map((c) => (
              <ListItemButton key={c.id} selected={c.id === selectedId} onClick={() => setSelectedId(c.id)}>
                <ListItemAvatar><Avatar>{c.title?.[0]?.toUpperCase()}</Avatar></ListItemAvatar>
                <ListItemText primary={c.title}
                  secondary={c.lastMessage?.body || (c.type === 'GROUP' ? 'Group chat' : 'Direct')}
                  secondaryTypographyProps={{ noWrap: true }} />
              </ListItemButton>
            ))}
          </List>
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          {selectedId
            ? <MessageList conversationId={selectedId} />
            : <EmptyState title="Select a conversation" />}
        </Box>
      </Paper>
    </Box>
  );
}
