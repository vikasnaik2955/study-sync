// The note download endpoint is authenticated, so a plain <a href> (which can't send the bearer
// token) won't work. Fetch the bytes with the Authorization header, then save the resulting blob.
const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api/v1';

export async function downloadNote(noteId, filename, accessToken) {
  const res = await fetch(`${API_BASE}/notes/${noteId}/download`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!res.ok) throw new Error('Download failed');
  const blob = await res.blob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename || 'note';
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
