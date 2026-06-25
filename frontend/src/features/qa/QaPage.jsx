import { useState } from 'react';
import {
  Box, Button, Card, CardActionArea, CardContent, Chip, Dialog, DialogActions, DialogContent,
  DialogTitle, Stack, TextField, Typography,
} from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { useNavigate } from 'react-router-dom';
import { useListQuestionsQuery, useAskQuestionMutation } from './qaApi';
import SubjectSelect from '../../components/SubjectSelect';
import { Loading, EmptyState, ErrorState } from '../../components/states';

function AskDialog({ open, onClose }) {
  const [form, setForm] = useState({ title: '', body: '', subjectId: '' });
  const [ask, { isLoading, error }] = useAskQuestionMutation();
  const navigate = useNavigate();

  const submit = async () => {
    try {
      const q = await ask(form).unwrap();
      onClose();
      navigate(`/qa/${q.id}`);
    } catch {
      /* surfaced below */
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Ask a question</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          {error && <ErrorState error={error} />}
          <TextField label="Title" value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })} required />
          <SubjectSelect value={form.subjectId} onChange={(v) => setForm({ ...form, subjectId: v })} required />
          <TextField label="Details" value={form.body} multiline minRows={4}
            onChange={(e) => setForm({ ...form, body: e.target.value })} required />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={submit}
          disabled={isLoading || !form.title || !form.body || !form.subjectId}>
          {isLoading ? 'Posting…' : 'Post question'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default function QaPage() {
  const [subjectId, setSubjectId] = useState('');
  const [q, setQ] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const navigate = useNavigate();
  const { data, isLoading, error } = useListQuestionsQuery({ subjectId, q });
  const questions = data?.content || [];

  return (
    <Box>
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 3 }}>
        <Typography variant="h4">Q&amp;A forum</Typography>
        <Button variant="contained" startIcon={<HelpOutlineIcon />} onClick={() => setDialogOpen(true)}>
          Ask a question
        </Button>
      </Stack>

      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 3 }}>
        <TextField label="Search questions" value={q} onChange={(e) => setQ(e.target.value)} fullWidth />
        <SubjectSelect value={subjectId} onChange={setSubjectId} allowAll sx={{ minWidth: 200 }} />
      </Stack>

      {isLoading && <Loading />}
      {error && <ErrorState error={error} />}
      {!isLoading && !error && questions.length === 0 && (
        <EmptyState title="No questions yet" hint="Be the first to ask." />
      )}

      <Stack spacing={1.5}>
        {questions.map((question) => (
          <Card key={question.id} variant="outlined">
            <CardActionArea onClick={() => navigate(`/qa/${question.id}`)}>
              <CardContent>
                <Typography variant="h6">{question.title}</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }} noWrap>
                  {question.body}
                </Typography>
                <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 1 }}>
                  <Chip size="small" label={question.subjectName} color="primary" variant="outlined" />
                  <Typography variant="caption" color="text.secondary">
                    {question.answerCount} answers · {question.viewCount} views · by {question.authorName}
                  </Typography>
                </Stack>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Stack>

      <AskDialog open={dialogOpen} onClose={() => setDialogOpen(false)} />
    </Box>
  );
}
