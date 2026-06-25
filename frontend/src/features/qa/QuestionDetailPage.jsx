import { useState } from 'react';
import {
  Box, Button, Card, CardContent, Chip, IconButton, Paper, Stack, TextField, Typography,
} from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { useParams } from 'react-router-dom';
import {
  useGetQuestionQuery, usePostAnswerMutation, useVoteAnswerMutation, useRetractVoteMutation,
} from './qaApi';
import { Loading, EmptyState, ErrorState } from '../../components/states';

function AnswerCard({ answer, questionId }) {
  const [vote] = useVoteAnswerMutation();
  const [retract] = useRetractVoteMutation();

  // Clicking the active arrow again retracts; otherwise cast/replace the vote.
  const cast = (value) => {
    if (answer.myVote === value) retract({ answerId: answer.id, questionId });
    else vote({ answerId: answer.id, value, questionId });
  };

  return (
    <Card variant="outlined">
      <CardContent sx={{ display: 'flex', gap: 2 }}>
        <Stack alignItems="center">
          <IconButton size="small" color={answer.myVote === 1 ? 'primary' : 'default'}
            onClick={() => cast(1)}><ArrowUpwardIcon fontSize="small" /></IconButton>
          <Typography fontWeight={700}>{answer.netVotes}</Typography>
          <IconButton size="small" color={answer.myVote === -1 ? 'error' : 'default'}
            onClick={() => cast(-1)}><ArrowDownwardIcon fontSize="small" /></IconButton>
        </Stack>
        <Box sx={{ flexGrow: 1 }}>
          <Typography sx={{ whiteSpace: 'pre-wrap' }}>{answer.body}</Typography>
          <Typography variant="caption" color="text.secondary">— {answer.authorName}</Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

export default function QuestionDetailPage() {
  const { id } = useParams();
  const { data, isLoading, error } = useGetQuestionQuery(id);
  const [postAnswer, { isLoading: posting }] = usePostAnswerMutation();
  const [body, setBody] = useState('');

  if (isLoading) return <Loading />;
  if (error) return <ErrorState error={error} />;

  const { question, answers } = data;

  const submit = async () => {
    if (!body.trim()) return;
    await postAnswer({ id, body }).unwrap().catch(() => {});
    setBody('');
  };

  return (
    <Box>
      <Paper variant="outlined" sx={{ p: 3, mb: 3 }}>
        <Typography variant="h4">{question.title}</Typography>
        <Stack direction="row" spacing={1} alignItems="center" sx={{ my: 1 }}>
          <Chip size="small" label={question.subjectName} color="primary" variant="outlined" />
          <Typography variant="caption" color="text.secondary">
            Asked by {question.authorName} · {question.viewCount} views
          </Typography>
        </Stack>
        <Typography sx={{ whiteSpace: 'pre-wrap', mt: 1 }}>{question.body}</Typography>
      </Paper>

      <Typography variant="h6" sx={{ mb: 1.5 }}>
        {answers.length} {answers.length === 1 ? 'answer' : 'answers'}
      </Typography>

      <Stack spacing={1.5} sx={{ mb: 3 }}>
        {answers.length === 0 && <EmptyState title="No answers yet" hint="Share what you know." />}
        {answers.map((a) => <AnswerCard key={a.id} answer={a} questionId={id} />)}
      </Stack>

      <Paper variant="outlined" sx={{ p: 2 }}>
        <Typography variant="subtitle1" sx={{ mb: 1 }}>Your answer</Typography>
        <TextField fullWidth multiline minRows={3} value={body}
          onChange={(e) => setBody(e.target.value)} placeholder="Write your answer…" />
        <Box sx={{ mt: 1, textAlign: 'right' }}>
          <Button variant="contained" onClick={submit} disabled={posting || !body.trim()}>
            {posting ? 'Posting…' : 'Post answer'}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
