import { useState } from 'react';
import {
  Box, Button, Card, CardContent, Chip, Dialog, DialogActions, DialogContent, DialogTitle,
  IconButton, Stack, TextField, Typography,
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { useSelector } from 'react-redux';
import { useListNotesQuery, useUploadNoteMutation, useDeleteNoteMutation } from './notesApi';
import { selectCurrentUser } from '../auth/authSlice';
import SubjectSelect from '../../components/SubjectSelect';
import { Loading, EmptyState, ErrorState } from '../../components/states';
import { downloadNote } from '../../lib/download';

function formatSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
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
  const [q, setQ] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const user = useSelector(selectCurrentUser);
  const accessToken = useSelector((s) => s.auth.accessToken);

  const { data, isLoading, error } = useListNotesQuery({ subjectId, q });
  const [deleteNote] = useDeleteNoteMutation();

  const notes = data?.content || [];

  return (
    <Box>
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 3 }}>
        <Typography variant="h4">Notes library</Typography>
        <Button variant="contained" startIcon={<UploadFileIcon />} onClick={() => setDialogOpen(true)}>
          Upload notes
        </Button>
      </Stack>

      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 3 }}>
        <TextField label="Search by title" value={q} onChange={(e) => setQ(e.target.value)} fullWidth />
        <SubjectSelect value={subjectId} onChange={setSubjectId} allowAll sx={{ minWidth: 200 }} />
      </Stack>

      {isLoading && <Loading />}
      {error && <ErrorState error={error} />}
      {!isLoading && !error && notes.length === 0 && (
        <EmptyState title="No notes yet" hint="Upload the first set of notes for your subject." />
      )}

      <Stack spacing={1.5}>
        {notes.map((n) => (
          <Card key={n.id} variant="outlined">
            <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                <Typography variant="h6" noWrap>{n.title}</Typography>
                <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 0.5 }}>
                  <Chip size="small" label={n.subjectName} color="primary" variant="outlined" />
                  <Typography variant="body2" color="text.secondary">
                    {n.uploaderName} · {formatSize(n.sizeBytes)} · {n.downloadCount} downloads
                  </Typography>
                </Stack>
              </Box>
              <IconButton color="primary" title="Download"
                onClick={() => downloadNote(n.id, n.originalFilename, accessToken)}>
                <DownloadIcon />
              </IconButton>
              {n.uploaderId === user?.id && (
                <IconButton color="error" title="Delete" onClick={() => deleteNote(n.id)}>
                  <DeleteOutlineIcon />
                </IconButton>
              )}
            </CardContent>
          </Card>
        ))}
      </Stack>

      <UploadDialog open={dialogOpen} onClose={() => setDialogOpen(false)} />
    </Box>
  );
}
