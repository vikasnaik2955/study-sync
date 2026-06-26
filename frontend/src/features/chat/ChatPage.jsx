import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Avatar, Box, Divider, IconButton, InputBase, List, ListItemButton, Paper, Stack, Typography,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  useListConversationsQuery, useOpenConversationMutation, useConversationMessagesQuery,
  useUploadChatFileMutation,
} from './chatApi';
import { selectCurrentUser } from '../auth/authSlice';
import { useStomp } from '../../app/StompProvider';
import { Loading, EmptyState } from '../../components/states';
import { subjectColor } from '../../lib/subjectColor';

function formatTime(iso) {
  if (!iso) return '';
  return new Date(iso).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function initials(name = '?') {
  return name.split(' ').map((p) => p[0]).slice(0, 2).join('').toUpperCase();
}

function ChatPane({ conversation }) {
  const me = useSelector(selectCurrentUser);
  const conversationId = conversation.id;
  const { data, isLoading } = useConversationMessagesQuery({ id: conversationId });
  const { subscribe, publish } = useStomp();
  const [uploadFile] = useUploadChatFileMutation();
  const [live, setLive] = useState([]);
  const [draft, setDraft] = useState('');
  const bottomRef = useRef(null);

  const history = useMemo(() => [...(data?.content || [])].reverse(), [data]);
  const messages = useMemo(() => [...history, ...live], [history, live]);

  useEffect(() => { setLive([]); }, [conversationId]);

  useEffect(() => {
    const unsub = subscribe(`/topic/conversation/${conversationId}`, (event) => {
      if (event.type === 'MESSAGE_CREATED') setLive((prev) => [...prev, event.message]);
    });
    return unsub;
  }, [conversationId, subscribe]);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages.length]);

  const send = () => {
    if (!draft.trim()) return;
    publish('/app/chat.send', { conversationId, body: draft });
    setDraft('');
  };

  const onAttach = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const fd = new FormData();
    fd.append('file', file);
    const res = await uploadFile({ id: conversationId, formData: fd }).unwrap().catch(() => null);
    if (res?.url) publish('/app/chat.send', { conversationId, attachmentUrl: res.url });
  };

  return (
    <Stack sx={{ height: '100%' }}>
      {/* header */}
      <Stack direction="row" alignItems="center" spacing={1.5} sx={{ px: 2.5, py: 1.5,
        borderBottom: '1px solid', borderColor: 'divider' }}>
        <Avatar sx={{ width: 38, height: 38, bgcolor: subjectColor(conversation.title), color: '#fff', fontSize: 14 }}>
          {initials(conversation.title)}
        </Avatar>
        <Box sx={{ flexGrow: 1, minWidth: 0 }}>
          <Typography sx={{ fontWeight: 700 }} noWrap>{conversation.title}</Typography>
          <Typography sx={{ fontSize: 12.5, fontWeight: 600, color: 'primary.main' }}>Active now</Typography>
        </Box>
        <IconButton sx={{ color: 'text.secondary' }}><CallOutlinedIcon /></IconButton>
      </Stack>

      {/* messages */}
      <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 2.5 }}>
        {isLoading && <Loading />}
        {!isLoading && messages.length === 0 && <EmptyState title="No messages yet" hint="Say hello 👋" />}
        {messages.map((m, i) => {
          const mine = m.senderId === me?.id;
          return (
            <Box key={m.id || i} sx={{ display: 'flex', justifyContent: mine ? 'flex-end' : 'flex-start', mb: 1.25 }}>
              <Box sx={{
                px: 1.75, py: 1.1, maxWidth: '68%', borderRadius: 3,
                bgcolor: mine ? 'primary.main' : 'background.default',
                color: mine ? 'primary.contrastText' : 'text.primary',
                border: mine ? 'none' : '1px solid', borderColor: 'divider',
              }}>
                {m.body && <Typography variant="body2">{m.body}</Typography>}
                {m.attachmentUrl && (
                  <Typography variant="body2"><a href={m.attachmentUrl} style={{ color: 'inherit' }}>📎 Attachment</a></Typography>
                )}
                <Typography sx={{ fontSize: 10.5, mt: 0.25, textAlign: 'right',
                  opacity: 0.7 }}>{formatTime(m.sentAt)}</Typography>
              </Box>
            </Box>
          );
        })}
        <div ref={bottomRef} />
      </Box>

      {/* composer */}
      <Stack direction="row" alignItems="center" spacing={1} sx={{ p: 2, borderTop: '1px solid',
        borderColor: 'divider' }}>
        <IconButton component="label" sx={{ color: 'text.secondary' }}>
          <AttachFileIcon />
          <input hidden type="file" onChange={onAttach} />
        </IconButton>
        <Box sx={{ flexGrow: 1, px: 2, py: 1, borderRadius: 3, bgcolor: 'background.default',
          border: '1px solid', borderColor: 'divider' }}>
          <InputBase fullWidth placeholder="Write a message…" value={draft}
            onChange={(e) => setDraft(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && send()} />
        </Box>
        <IconButton onClick={send} sx={{ bgcolor: 'primary.main', color: 'primary.contrastText',
          '&:hover': { bgcolor: 'primary.dark' } }}>
          <SendIcon fontSize="small" />
        </IconButton>
      </Stack>
    </Stack>
  );
}

export default function ChatPage() {
  const location = useLocation();
  const { data: conversations = [], isLoading } = useListConversationsQuery();
  const [openConversation] = useOpenConversationMutation();
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    const open = location.state?.open;
    if (open) openConversation(open).unwrap().then((c) => setSelectedId(c.id)).catch(() => {});
  }, [location.state, openConversation]);

  const selected = conversations.find((c) => c.id === selectedId);

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3 }}>Messages</Typography>
      <Paper variant="outlined" sx={{ display: 'flex', height: '72vh', overflow: 'hidden' }}>
        {/* conversation list */}
        <Box sx={{ width: 300, borderRight: '1px solid', borderColor: 'divider',
          display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h6" sx={{ px: 2.5, py: 2 }}>Messages</Typography>
          <Divider />
          <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
            {isLoading && <Loading />}
            {!isLoading && conversations.length === 0 && (
              <EmptyState title="No chats yet" hint="Start one from a group member." />
            )}
            <List disablePadding>
              {conversations.map((c) => {
                const active = c.id === selectedId;
                return (
                  <ListItemButton key={c.id} selected={active} onClick={() => setSelectedId(c.id)}
                    sx={{ px: 2, py: 1.5, gap: 1.5,
                      '&.Mui-selected': { bgcolor: 'rgba(46,204,113,0.10)' },
                      '&.Mui-selected:hover': { bgcolor: 'rgba(46,204,113,0.14)' } }}>
                    <Avatar sx={{ width: 40, height: 40, bgcolor: subjectColor(c.title), color: '#fff', fontSize: 14 }}>
                      {initials(c.title)}
                    </Avatar>
                    <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                      <Stack direction="row" justifyContent="space-between" spacing={1}>
                        <Typography sx={{ fontWeight: 700 }} noWrap>{c.title}</Typography>
                        <Typography variant="caption" color="text.secondary" sx={{ flexShrink: 0 }}>
                          {formatTime(c.lastMessage?.sentAt)}
                        </Typography>
                      </Stack>
                      <Typography variant="body2" color="text.secondary" noWrap>
                        {c.lastMessage?.body || (c.type === 'GROUP' ? 'Group chat' : 'Direct message')}
                      </Typography>
                    </Box>
                  </ListItemButton>
                );
              })}
            </List>
          </Box>
        </Box>

        {/* chat pane */}
        <Box sx={{ flexGrow: 1, minWidth: 0 }}>
          {selected ? <ChatPane conversation={selected} /> : <EmptyState title="Select a conversation" />}
        </Box>
      </Paper>
    </Box>
  );
}
