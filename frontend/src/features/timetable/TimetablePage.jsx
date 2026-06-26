import { Box, Button, Stack, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

// Placeholder weekly planner. The backend doesn't track scheduled sessions yet, so the blocks are
// illustrative. Wire to a real "sessions" API later; the grid math stays the same.
const HOURS = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];

// day: 0=Mon..5=Sat, start/end in 24h. Row = hour - 6 (HOURS[0]=8 -> row 2).
const SESSIONS = [
  { day: 0, start: 9, end: 11, title: 'Data Structures', sub: 'Trees revision', color: '#2ECC71' },
  { day: 0, start: 16, end: 17, title: 'DSA Grinders', sub: 'Group practice', color: '#E8772E' },
  { day: 1, start: 11, end: 12, title: 'DBMS', sub: 'Normalization', color: '#14B8A6' },
  { day: 2, start: 9, end: 11, title: 'Machine Learning', sub: 'Backprop', color: '#6D5BD0' },
  { day: 2, start: 18, end: 19, title: 'Study room', sub: 'BCNF session', color: '#2ECC71' },
  { day: 3, start: 14, end: 16, title: 'Operating Systems', sub: 'Deadlocks', color: '#E8772E' },
  { day: 4, start: 10, end: 11, title: 'Networks', sub: 'TCP/IP', color: '#14B8A6' },
  { day: 4, start: 16, end: 18, title: 'Mock contest', sub: 'DSA Grinders', color: '#6D5BD0' },
  { day: 5, start: 11, end: 13, title: 'Mathematics', sub: 'Eigenvalues', color: '#2ECC71' },
];

function hourLabel(h) {
  const ampm = h < 12 ? 'AM' : 'PM';
  const hh = h % 12 === 0 ? 12 : h % 12;
  return `${hh} ${ampm}`;
}

function weekDays() {
  const now = new Date();
  const dow = now.getDay(); // 0=Sun
  const monday = new Date(now);
  monday.setDate(now.getDate() + (dow === 0 ? -6 : 1 - dow));
  const names = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  return names.map((name, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return { name, date: d.getDate(), isToday: d.toDateString() === now.toDateString() };
  });
}

export default function TimetablePage() {
  const days = weekDays();

  return (
    <Box>
      <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between"
        alignItems={{ sm: 'flex-start' }} spacing={2} sx={{ mb: 3 }}>
        <Box>
          <Typography variant="h4">Smart study timetable</Typography>
          <Typography color="text.secondary" sx={{ mt: 0.5 }}>
            Your week at a glance — sessions, groups and rooms, balanced automatically.
          </Typography>
        </Box>
        <Stack direction="row" spacing={1.5}>
          <Button variant="outlined" startIcon={<AutoAwesomeIcon />} sx={{ borderRadius: 2.5 }}>
            Auto-balance
          </Button>
          <Button variant="contained" startIcon={<AddIcon />}
            sx={{ borderRadius: 2.5, boxShadow: '0 8px 18px rgba(31,157,87,0.30)' }}>
            Add session
          </Button>
        </Stack>
      </Stack>

      <Box sx={{ overflowX: 'auto' }}>
        <Box sx={{
          minWidth: 820, display: 'grid',
          gridTemplateColumns: '64px repeat(6, 1fr)',
          gridTemplateRows: `48px repeat(${HOURS.length}, 56px)`,
          border: '1px solid', borderColor: 'divider', borderRadius: 3, overflow: 'hidden',
          bgcolor: 'background.paper',
        }}>
          {/* corner */}
          <Box sx={{ gridColumn: 1, gridRow: 1, borderRight: '1px solid', borderBottom: '1px solid',
            borderColor: 'divider' }} />

          {/* day headers */}
          {days.map((d, i) => (
            <Box key={d.name} sx={{ gridColumn: i + 2, gridRow: 1, textAlign: 'center', py: 0.75,
              borderRight: '1px solid', borderBottom: '1px solid', borderColor: 'divider' }}>
              <Typography sx={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em',
                color: 'text.secondary' }}>{d.name}</Typography>
              <Typography sx={{ fontSize: 17, fontWeight: 800,
                color: d.isToday ? 'primary.main' : 'text.primary' }}>{d.date}</Typography>
            </Box>
          ))}

          {/* time labels */}
          {HOURS.map((h, i) => (
            <Box key={h} sx={{ gridColumn: 1, gridRow: i + 2, pr: 1, pt: 0.5, textAlign: 'right',
              borderRight: '1px solid', borderColor: 'divider' }}>
              <Typography sx={{ fontSize: 11.5, color: 'text.secondary' }}>{hourLabel(h)}</Typography>
            </Box>
          ))}

          {/* grid cells */}
          {days.map((_, di) => HOURS.map((_, hi) => (
            <Box key={`${di}-${hi}`} sx={{ gridColumn: di + 2, gridRow: hi + 2,
              borderRight: '1px solid', borderBottom: '1px solid', borderColor: 'divider' }} />
          )))}

          {/* sessions */}
          {SESSIONS.map((s, i) => (
            <Box key={i} sx={{ gridColumn: s.day + 2, gridRow: `${s.start - 6} / ${s.end - 6}`,
              m: 0.5, p: 1, borderRadius: 2, bgcolor: s.color, color: '#fff', zIndex: 1,
              overflow: 'hidden' }}>
              <Typography sx={{ fontWeight: 700, fontSize: 13, lineHeight: 1.2 }}>{s.title}</Typography>
              <Typography sx={{ fontSize: 12, opacity: 0.9 }}>{s.sub}</Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
