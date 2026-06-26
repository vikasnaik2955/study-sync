import { useState } from 'react';
import {
  Box, Button, Card, CardContent, Dialog, DialogActions, DialogContent, DialogTitle, Stack,
  TextField, Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { useNavigate } from 'react-router-dom';
import { useListQuestionsQuery, useAskQuestionMutation } from './qaApi';
import SubjectSelect from '../../components/SubjectSelect';
import { Loading, EmptyState, ErrorState } from '../../components/states';
import { subjectColor } from '../../lib/subjectColor';

function Stat({ value, label, accent }) {
  return (
    <Box sx={{ textAlign: 'center' }}>
      <Typography sx={{ fontSize: 19, fontWeight: 800, color: accent ? 'primary.main' : 'text.primary' }}>
        {value}
      </Typography>
      <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>{label}</Typography>
    </Box>
  );
}

function QuestionCard({ question, onClick }) {
  const color = subjectColor(question.subjectName);
  return (
    <Card sx={{ cursor: 'pointer', transition: 'border-color .15s',
      '&:hover': { borderColor: 'rgba(255,255,255,0.2)' } }} onClick={onClick}>
      <CardContent>
        <Stack direction="row" spacing={2.5}>
          <Stack spacing={1} sx={{ width: 56, flexShrink: 0, pt: 0.5 }}>
            <Stat value={question.answerCount} label="answers" accent />
            <Stat value={question.viewCount} label="views" />
          </Stack>
          <Box sx={{ flexGrow: 1, minWidth: 0 }}>
            <Typography sx={{ fontWeight: 700, fontSize: 17 }}>{question.title}</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5,
              display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
              {question.body}
            </Typography>
            <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mt: 1.5 }}>
              <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.75, px: 1, py: 0.5,
                borderRadius: 5, bgcolor: `${color}1F` }}>
                <FiberManualRecordIcon sx={{ fontSize: 8, color }} />
                <Typography sx={{ fontSize: 12.5, fontWeight: 600, color }}>{question.subjectName}</Typography>
              </Box>
              <Typography variant="caption" color="text.secondary">
                asked by {question.authorName}
              </Typography>
            </Stack>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}

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
  const [dialogOpen, setDialogOpen] = useState(false);
  const navigate = useNavigate();
  const { data, isLoading, error } = useListQuestionsQuery({ size: 24 });
  const questions = data?.content || [];

  return (
    <Box>
      <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between"
        alignItems={{ sm: 'flex-start' }} spacing={2} sx={{ mb: 3 }}>
        <Box>
          <Typography variant="h4">Q&amp;A forum</Typography>
          <Typography color="text.secondary" sx={{ mt: 0.5 }}>
            Ask anything academic. Answer to earn reputation.
          </Typography>
        </Box>
        <Button variant="contained" size="large" startIcon={<AddIcon />}
          onClick={() => setDialogOpen(true)}
          sx={{ borderRadius: 2.5, boxShadow: '0 8px 18px rgba(31,157,87,0.30)' }}>
          Ask a question
        </Button>
      </Stack>

      {isLoading && <Loading />}
      {error && <ErrorState error={error} />}
      {!isLoading && !error && questions.length === 0 && (
        <EmptyState title="No questions yet" hint="Be the first to ask." />
      )}

      <Stack spacing={2}>
        {questions.map((q) => (
          <QuestionCard key={q.id} question={q} onClick={() => navigate(`/qa/${q.id}`)} />
        ))}
      </Stack>

      <AskDialog open={dialogOpen} onClose={() => setDialogOpen(false)} />
    </Box>
  );
}
