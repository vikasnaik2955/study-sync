import { Navigate, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import AppLayout from './components/AppLayout';
import { StompProvider } from './app/StompProvider';
import LoginPage from './features/auth/LoginPage';
import RegisterPage from './features/auth/RegisterPage';
import DashboardPage from './features/dashboard/DashboardPage';
import TimetablePage from './features/timetable/TimetablePage';
import NotesPage from './features/notes/NotesPage';
import GroupsPage from './features/groups/GroupsPage';
import GroupDetailPage from './features/groups/GroupDetailPage';
import QaPage from './features/qa/QaPage';
import QuestionDetailPage from './features/qa/QuestionDetailPage';
import ChatPage from './features/chat/ChatPage';
import RoomsPage from './features/rooms/RoomsPage';
import RoomDetailPage from './features/rooms/RoomDetailPage';
import ProfilePage from './features/profile/ProfilePage';

// Authenticated area is wrapped in StompProvider so the single WebSocket connection lives exactly
// as long as the user is signed in (it reads the access token from the store).
export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route
        element={
          <ProtectedRoute>
            <StompProvider>
              <AppLayout />
            </StompProvider>
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/timetable" element={<TimetablePage />} />
        <Route path="/notes" element={<NotesPage />} />
        <Route path="/groups" element={<GroupsPage />} />
        <Route path="/groups/:id" element={<GroupDetailPage />} />
        <Route path="/qa" element={<QaPage />} />
        <Route path="/qa/:id" element={<QuestionDetailPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/rooms" element={<RoomsPage />} />
        <Route path="/rooms/:id" element={<RoomDetailPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Route>

      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
