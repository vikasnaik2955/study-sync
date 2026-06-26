import { useState } from 'react';
import {
  Avatar, Box, Button, Card, CardContent, Chip, Dialog, DialogActions, DialogContent, DialogTitle,
  Divider, IconButton, Stack, TextField, Typography,
} from '@mui/material';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import SlideshowOutlinedIcon from '@mui/icons-material/SlideshowOutlined';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { useSelector } from 'react-redux';
import { useListNotesQuery, useUploadNoteMutation, useDeleteNoteMutation } from './notesApi';
import { useListSubjectsQuery } from '../subjects/subjectsApi';
import { selectCurrentUser } from '../auth/authSlice';
import SubjectSelect from '../../components/SubjectSelect';
import { Loading, EmptyState, ErrorState } from '../../components/states';
import { downloadNote } from '../../lib/download';

// Stable, distinct accent per subject (for the dot + icon tint), derived from the name.
const PALETTE = ['#2ECC71', '#F59E0B', '#5B9DFF', '#14B8A6', '#E0A82E', '#A78BFA', '#EC4899'];
function subjectColor(name = '') {
  let h = 0;
  for (let i = 0; i < name.length; i += 1) h = (h * 31 + name.charCodeAt(i)) >>> 0;
  return PALETTE[h % PALETTE.length];
}

function fileBadge(note) {
  const name = note.originalFilename || '';
  const ext = name.includes('.') ? name.split('.').pop().toUpperCase() : '';
  if (ext) return ext;
  const ct = note.contentType || '';
  if (ct.includes('pdf')) return 'PDF';
  if (ct.includes('presentation') || ct.includes('powerpoint')) return 'PPTX';
  if (ct.includes('word')) return 'DOCX';
  return 'FILE';
}

function initials(name = '?') {
  return name.split(' ').map((p) => p[0]).slice(0, 2).join('').toUpperCase();
}

function NoteCard({ note, isOwner, accessToken, onDelete }) {
  const color = subjectColor(note.subjectName);
  const badge = fileBadge(note);
  const isSlides = badge.startsWith('PPT');

  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', cursor: 'pointer', height: '100%',
      transition: 'border-color .15s', '&:hover': { borderColor: 'rgba(255,255,255,0.2)' } }}
      onClick={() => downloadNote(note.id, note.originalFilename, accessToken)}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 1.5 }}>
          <Box sx={{ width: 42, height: 42, borderRadius: 2, bgcolor: `${color}22`, color,
            display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {isSlides ? <SlideshowOutlinedIcon /> : <DescriptionOutlinedIcon />}
          </Box>
          <Stack direction="row" alignItems="center" spacing={0.5}>
            {isOwner && (
              <IconButton size="small" sx={{ color: 'text.secondary' }}
                onClick={(e) => { e.stopPropagation(); onDelete(note.id); }}>
                <DeleteOutlineIcon fontSize="small" />
              </IconButton>
            )}
            <Typography sx={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.04em',
              color: 'text.secondary', bgcolor: 'background.default', px: 0.75, py: 0.25, borderRadius: 1 }}>
              {badge}
            </Typography>
          </Stack>
        </Stack>

        <Typography sx={{ fontWeight: 700, fontSize: 16, lineHeight: 1.3, minHeight: 42,
          display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {note.title}
        </Typography>

        <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.75, mt: 1.5,
          px: 1, py: 0.5, borderRadius: 5, bgcolor: `${color}1F` }}>
          <Box sx={{ width: 7, height: 7, borderRadius: '50%', bgcolor: color }} />
          <Typography sx={{ fontSize: 12.5, fontWeight: 600, color }}>{note.subjectName}</Typography>
        </Box>
      </CardContent>

      <Divider />
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ px: 2, py: 1.5 }}>
        <Stack direction="row" alignItems="center" spacing={1} sx={{ minWidth: 0 }}>
          <Avatar sx={{ width: 26, height: 26, fontSize: 11, bgcolor: 'background.default',
            color: 'text.secondary' }}>{initials(note.uploaderName)}</Avatar>
          <Typography variant="body2" color="text.secondary" noWrap>{note.uploaderName}</Typography>
        </Stack>
        <Stack direction="row" alignItems="center" spacing={0.5} sx={{ color: 'text.secondary' }}>
          <DownloadIcon sx={{ fontSize: 16 }} />
          <Typography variant="body2">{note.downloadCount}</Typography>
        </Stack>
      </Stack>
    </Card>
  );
}

function UploadDialog({ open, onClose }) {
  const [title, setTitle] = useState('');
  const [subjectId, setSubjectId] = useState('');
  const [file, setFile] = useState(null);
  const [upload, { isLoading, error }] = useUploadNoteMutation();

  const submit = async () => {
    const fd = new FormData();
    fd.append('title', title);
    fd.append('subjectId', subjectId);
    fd.append('file', file);
    try {
      await upload(fd).unwrap();
      setTitle(''); setSubjectId(''); setFile(null);
      onClose();
    } catch {
      /* surfaced below */
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Upload notes</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          {error && <ErrorState error={error} />}
          <TextField label="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
          <SubjectSelect value={subjectId} onChange={setSubjectId} required />
          <Button variant="outlined" component="label" startIcon={<UploadFileIcon />}>
            {file ? file.name : 'Choose file (PDF, DOC, PPT)'}
            <input hidden type="file" accept=".pdf,.doc,.docx,.ppt,.pptx"
              onChange={(e) => setFile(e.target.files?.[0] || null)} />
          </Button>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={submit} disabled={isLoading || !title || !subjectId || !file}>
          {isLoading ? 'Uploading…' : 'Upload'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default function NotesPage() {
  const [subjectId, setSubjectId] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const user = useSelector(selectCurrentUser);
  const accessToken = useSelector((s) => s.auth.accessToken);

  const { data: subjects = [] } = useListSubjectsQuery();
  const { data, isLoading, error } = useListNotesQuery({ subjectId, size: 24 });
  const [deleteNote] = useDeleteNoteMutation();

  const notes = data?.content || [];
  const total = data?.totalElements ?? 0;

  return (
    <Box>
      <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between"
        alignItems={{ sm: 'flex-start' }} spacing={2} sx={{ mb: 3 }}>
        <Box>
          <Typography variant="h4">Notes library</Typography>
          <Typography color="text.secondary" sx={{ mt: 0.5 }}>
            {total} notes across {subjects.length} subjects — shared by your peers.
          </Typography>
        </Box>
        <Button variant="contained" size="large" startIcon={<UploadFileIcon />}
          onClick={() => setDialogOpen(true)}
          sx={{ borderRadius: 2.5, boxShadow: '0 8px 18px rgba(31,157,87,0.30)' }}>
          Upload notes
        </Button>
      </Stack>

      {/* subject filter pills */}
      <Stack direction="row" spacing={1} sx={{ mb: 3, flexWrap: 'wrap', gap: 1 }}>
        <FilterPill label="All" active={!subjectId} onClick={() => setSubjectId('')} />
        {subjects.map((s) => (
          <FilterPill key={s.id} label={s.name} active={subjectId === s.id}
            onClick={() => setSubjectId(s.id)} />
        ))}
      </Stack>

      {isLoading && <Loading />}
      {error && <ErrorState error={error} />}
      {!isLoading && !error && notes.length === 0 && (
        <EmptyState title="No notes yet" hint="Upload the first set of notes for this subject." />
      )}

      <Box sx={{ display: 'grid', gap: 2,
        gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(3, 1fr)' } }}>
        {notes.map((n) => (
          <NoteCard key={n.id} note={n} accessToken={accessToken}
            isOwner={n.uploaderId === user?.id} onDelete={deleteNote} />
        ))}
      </Box>

      <UploadDialog open={dialogOpen} onClose={() => setDialogOpen(false)} />
    </Box>
  );
}

function FilterPill({ label, active, onClick }) {
  return (
    <Chip label={label} onClick={onClick} clickable
      sx={{
        borderRadius: 5, fontWeight: 600, px: 0.5,
        border: '1px solid',
        borderColor: active ? 'primary.main' : 'divider',
        bgcolor: active ? 'rgba(46,204,113,0.14)' : 'transparent',
        color: active ? 'primary.main' : 'text.secondary',
        '&:hover': { bgcolor: active ? 'rgba(46,204,113,0.18)' : 'rgba(255,255,255,0.04)' },
      }} />
  );
}
