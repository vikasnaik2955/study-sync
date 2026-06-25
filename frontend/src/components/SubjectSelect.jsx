import { MenuItem, TextField } from '@mui/material';
import { useListSubjectsQuery } from '../features/subjects/subjectsApi';

// Shared subject dropdown backed by GET /subjects. `allowAll` adds an "All subjects" option for
// filter use; omit it when the field is a required choice (upload, create group, ask, create room).
export default function SubjectSelect({ value, onChange, label = 'Subject', allowAll = false, ...rest }) {
  const { data: subjects = [] } = useListSubjectsQuery();
  return (
    <TextField
      select
      label={label}
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      {...rest}
    >
      {allowAll && <MenuItem value="">All subjects</MenuItem>}
      {subjects.map((s) => (
        <MenuItem key={s.id} value={s.id}>{s.name}</MenuItem>
      ))}
    </TextField>
  );
}
