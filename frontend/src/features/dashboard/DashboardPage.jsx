import { useState } from 'react';
import {
  Box, Button, Card, CardContent, Chip, LinearProgress, Stack, ToggleButton,
  ToggleButtonGroup, Typography,
} from '@mui/material';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../auth/authSlice';
import { useListNotesQuery } from '../notes/notesApi';
import { useListGroupsQuery } from '../groups/groupsApi';
import { useListRoomsQuery } from '../rooms/roomsApi';
import { EmptyState } from '../../components/states';

// NOTE: reputation, hours-studied, today's plan, the weekly goal and the streak are not tracked by
// the backend yet — they're shown as illustrative placeholders. Notes count, groups count, recent
// notes and live rooms are real data.
const TODAYS_PLAN = [
  { time: '4:00 PM', title: 'DSA Grinders practice', sub: 'Group session · Data Structures', color: '#F59E0B' },
  { time: '6:00 PM', title: 'BCNF crash session', sub: 'Study room · DBMS', color: '#2ECC71' },
  { time: '8:30 PM', title: 'Solo: backprop notes', sub: 'Machine Learning', color: '#5B9DFF' },
];

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 18) return 'Good afternoon';
  return 'Good evening';
}

function StatCard({ icon, tint, value, label, delta }) {
  return (
    <Card sx={{ flex: 1, minWidth: 0 }}>
      <CardContent>
        <Box sx={{
          width: 40, height: 40, borderRadius: 2, mb: 1.5,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          bgcolor: `${tint}22`, color: tint,
        }}>
          {icon}
        </Box>
        <Typography sx={{ fontSize: 30, fontWeight: 800, lineHeight: 1 }}>{value}</Typography>
        <Typography sx={{ mt: 0.75, fontSize: 14, color: 'text.secondary' }}>
          {label}
          {delta && <Box component="span" sx={{ color: 'primary.main', fontWeight: 700, ml: 0.5 }}>{delta}</Box>}
        </Typography>
      </CardContent>
    </Card>
  );
}

function SectionCard({ title, action, onAction, children, sx }) {
  return (
    <Card sx={{ ...sx }}>
      <CardContent>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1.5 }}>
          <Typography variant="h6">{title}</Typography>
          {action && (
            <Typography onClick={onAction}
              sx={{ fontSize: 13, fontWeight: 700, color: 'primary.main', cursor: 'pointer' }}>
              {action} →
            </Typography>
          )}
        </Stack>
        {children}
      </CardContent>
    </Card>
  );
}

function NoteRow({ note, onClick }) {
  return (
    <Stack direction="row" alignItems="center" spacing={1.5} onClick={onClick}
      sx={{ py: 1.25, borderTop: '1px solid', borderColor: 'divider', cursor: 'pointer',
        '&:first-of-type': { borderTop: 0 } }}>
      <Box sx={{ width: 36, height: 36, borderRadius: 1.5, bgcolor: 'rgba(46,204,113,0.14)',
        color: 'primary.main', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <DescriptionOutlinedIcon fontSize="small" />
      </Box>
      <Box sx={{ flexGrow: 1, minWidth: 0 }}>
        <Typography sx={{ fontWeight: 700 }} noWrap>{note.title}</Typography>
        <Typography variant="body2" color="text.secondary" noWrap>
          {note.subjectName} · {note.downloadCount} downloads
        </Typography>
      </Box>
      <ChevronRightIcon sx={{ color: 'text.secondary' }} />
    </Stack>
  );
}

function PlanCard({ onAction }) {
  return (
    <SectionCard title="Today's plan" action="Timetable" onAction={onAction}>
      <Stack spacing={0}>
        {TODAYS_PLAN.map((p, i) => (
          <Stack key={i} direction="row" spacing={2} sx={{ py: 1.25 }}>
            <Typography sx={{ fontSize: 13, color: 'text.secondary', width: 64, flexShrink: 0, pt: 0.25 }}>
              {p.time}
            </Typography>
            <Box sx={{ width: 3, borderRadius: 2, bgcolor: p.color, alignSelf: 'stretch' }} />
            <Box>
              <Typography sx={{ fontWeight: 700 }}>{p.title}</Typography>
              <Typography variant="body2" color="text.secondary">{p.sub}</Typography>
            </Box>
          </Stack>
        ))}
      </Stack>
    </SectionCard>
  );
}

function RoomsCard({ rooms, onJoin, onAction }) {
  return (
    <SectionCard title="Live study rooms" action="Join" onAction={onAction}>
      {rooms.length === 0 && <EmptyState title="No live rooms" hint="Open one from Study rooms." />}
      <Stack spacing={1.5}>
        {rooms.map((r) => (
          <Stack key={r.id} direction="row" alignItems="center" spacing={1.5}>
            <FiberManualRecordIcon sx={{ fontSize: 12, color: 'primary.main' }} />
            <Box sx={{ flexGrow: 1, minWidth: 0 }}>
              <Typography sx={{ fontWeight: 700 }} noWrap>{r.name}</Typography>
              <Typography variant="body2" color="text.secondary" noWrap>
                {r.hostName} · {r.participantCount} studying
              </Typography>
            </Box>
            <Button size="small" variant="outlined" onClick={() => onJoin(r)}>Join</Button>
          </Stack>
        ))}
      </Stack>
    </SectionCard>
  );
}

function GoalCard() {
  return (
    <SectionCard title="Weekly study goal">
      <Stack direction="row" alignItems="baseline" spacing={1}>
        <Typography sx={{ fontSize: 34, fontWeight: 800 }}>18h</Typography>
        <Typography color="text.secondary">/ 25h goal</Typography>
      </Stack>
      <LinearProgress variant="determinate" value={72}
        sx={{ height: 8, borderRadius: 5, my: 2, bgcolor: 'rgba(255,255,255,0.08)',
          '& .MuiLinearProgress-bar': { borderRadius: 5 } }} />
      <Stack direction="row" spacing={1}>
        <Chip size="small" label="● On track" sx={{ bgcolor: 'rgba(46,204,113,0.14)', color: 'primary.main' }} />
        <Chip size="small" label="● 3 days left" sx={{ bgcolor: 'rgba(91,157,255,0.16)', color: 'secondary.main' }} />
      </Stack>
    </SectionCard>
  );
}

export default function DashboardPage() {
  const [view, setView] = useState('overview');
  const navigate = useNavigate();
  const user = useSelector(selectCurrentUser);
  const firstName = user?.displayName?.split(' ')[0] || 'there';

  const { data: notesData } = useListNotesQuery({ size: 3 });
  const { data: groupsData } = useListGroupsQuery({ size: 1 });
  const { data: roomsData } = useListRoomsQuery({ size: 2 }, { pollingInterval: 30000 });

  const recentNotes = notesData?.content || [];
  const notesTotal = notesData?.totalElements ?? '—';
  const groupsTotal = groupsData?.totalElements ?? '—';
  const rooms = roomsData?.content || [];

  const stats = (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr 1fr', md: 'repeat(4, 1fr)' }, gap: 2 }}>
      <StatCard icon={<DescriptionOutlinedIcon />} tint="#2ECC71" value={notesTotal}
        label="Notes shared" delta="+6 this week" />
      <StatCard icon={<GroupsOutlinedIcon />} tint="#F59E0B" value={groupsTotal} label="Study groups" />
      <StatCard icon={<EmojiEventsOutlinedIcon />} tint="#E0A82E" value="320" label="Reputation" delta="+24" />
      <StatCard icon={<AccessTimeOutlinedIcon />} tint="#5B9DFF" value="18h" label="Studied this week" />
    </Box>
  );

  const continueCard = (
    <SectionCard title="Continue studying" action="All notes" onAction={() => navigate('/notes')}>
      {recentNotes.length === 0 && <EmptyState title="No notes yet" hint="Upload from Notes." />}
      {recentNotes.map((n) => <NoteRow key={n.id} note={n} onClick={() => navigate('/notes')} />)}
    </SectionCard>
  );
  const planCard = <PlanCard onAction={() => navigate('/timetable')} />;
  const roomsCard = <RoomsCard rooms={rooms} onJoin={(r) => navigate(`/rooms/${r.id}`)}
    onAction={() => navigate('/rooms')} />;
  const goalCard = <GoalCard />;

  return (
    <Box sx={view === 'focus' ? { maxWidth: 980, mx: 'auto' } : undefined}>
      <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between"
        alignItems={{ sm: 'flex-start' }} sx={{ mb: 3 }} spacing={2}>
        <Box>
          <Typography variant="h4">{greeting()}, {firstName} 👋</Typography>
          <Typography color="text.secondary" sx={{ mt: 0.5 }}>
            You have 2 sessions today and 3 new answers to your questions.
          </Typography>
        </Box>
        <ToggleButtonGroup value={view} exclusive size="small"
          onChange={(_e, v) => v && setView(v)}
          sx={{
            bgcolor: 'background.default', borderRadius: 2, p: 0.5,
            '& .MuiToggleButton-root': {
              border: 0, borderRadius: 1.5, px: 2, py: 0.5, textTransform: 'none',
              fontWeight: 700, color: 'text.secondary',
            },
            '& .Mui-selected': {
              bgcolor: 'background.paper !important', color: 'text.primary !important',
              boxShadow: '0 1px 3px rgba(0,0,0,0.4)',
            },
          }}>
          <ToggleButton value="overview">Overview</ToggleButton>
          <ToggleButton value="compact">Compact</ToggleButton>
          <ToggleButton value="focus">Focus</ToggleButton>
        </ToggleButtonGroup>
      </Stack>

      {stats}

      {view === 'overview' && (
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2, mt: 2 }}>
          <Stack spacing={2}>{continueCard}{roomsCard}</Stack>
          <Stack spacing={2}>{planCard}{goalCard}</Stack>
        </Box>
      )}

      {view === 'compact' && (
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(4, 1fr)' }, gap: 2, mt: 2,
          alignItems: 'start' }}>
          {continueCard}{planCard}{roomsCard}{goalCard}
        </Box>
      )}

      {view === 'focus' && (
        // Focus: one calm centered column with everything stacked.
        <Stack spacing={2} sx={{ mt: 2 }}>{continueCard}{planCard}{roomsCard}{goalCard}</Stack>
      )}
    </Box>
  );
}
