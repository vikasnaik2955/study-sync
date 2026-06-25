import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { selectIsAuthenticated } from '../features/auth/authSlice';

// Gate for authenticated routes: bounce to /login (remembering where we came from) when there is
// no access token. The token's real validity is enforced server-side; this is just UX routing.
export default function ProtectedRoute({ children }) {
  const isAuthed = useSelector(selectIsAuthenticated);
  const location = useLocation();
  if (!isAuthed) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}
