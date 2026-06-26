import { useState } from 'react';
import {
  Box, Button, Card, CardContent, IconButton, Stack, TextField, Typography,
} from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { useParams } from 'react-router-dom';
import {
  useGetQuestionQuery, usePostAnswerMutation, useVoteAnswerMutation, useRetractVoteMutation,
} from './qaApi';
import { Loading, EmptyState, ErrorState } from '../../components/states';
import { subjectColor } from '../../lib/subjectColor';

function SubjectChip({ name }) {
  const color = subjectColor(name);
  return (
    <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.75, px: 1, py: 0.5,
      borderRadius: 5, bgcolor: `${color}1F` }}>
      <FiberManualRecordIcon sx={{ fontSize: 8, color }} />
      <Typography sx={{ fontSize: 12.5, fontWeight: 600, color }}>{name}</Typography>
    </Box>
  );
}

function AnswerCard({ answer, questionId }) {
  const [vote] = useVoteAnswerMutation();
  const [retract] = useRetractVoteMutation();

  // Clicking the active arrow again retracts; otherwise cast/replace the vote.
  const cast = (value) => {
    if (answer.myVote === value) retract({ answerId: answer.id, questionId });
    else vote({ answerId: answer.id, value, questionId });
  };

  return (
    <Card>
      <CardContent sx={{ display: 'flex', gap: 2 }}>
        <Stack alignItems="center" sx={{ flexShrink: 0 }}>
          <IconButton size="small" color={answer.myVote === 1 ? 'primary' : 'default'}
            onClick={() => cast(1)}><ArrowUpwardIcon fontSize="small" /></IconButton>
          <Typography sx={{ fontWeight: 800 }}>{answer.netVotes}</Typography>
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
    <Box sx={{ maxWidth: 860 }}>
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h5">{question.title}</Typography>
          <Stack direction="row" spacing={1.5} alignItems="center" sx={{ my: 1.5 }}>
            <SubjectChip name={question.subjectName} />
            <Typography variant="caption" color="text.secondary">
              asked by {question.authorName} · {question.viewCount} views
            </Typography>
          </Stack>
          <Typography sx={{ whiteSpace: 'pre-wrap' }}>{question.body}</Typography>
        </CardContent>
      </Card>

      <Typography variant="h6" sx={{ mb: 1.5 }}>
        {answers.length} {answers.length === 1 ? 'answer' : 'answers'}
      </Typography>

      <Stack spacing={2} sx={{ mb: 3 }}>
        {answers.length === 0 && <EmptyState title="No answers yet" hint="Share what you know." />}
        {answers.map((a) => <AnswerCard key={a.id} answer={a} questionId={id} />)}
      </Stack>

      <Card>
        <CardContent>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>Your answer</Typography>
          <TextField fullWidth multiline minRows={3} value={body}
            onChange={(e) => setBody(e.target.value)} placeholder="Write your answer…" />
          <Box sx={{ mt: 1.5, textAlign: 'right' }}>
            <Button variant="contained" onClick={submit} disabled={posting || !body.trim()}>
              {posting ? 'Posting…' : 'Post answer'}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
