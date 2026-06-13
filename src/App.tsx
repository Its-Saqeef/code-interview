import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';
import { Toaster } from 'sonner';
import AppLayout from './components/layout/AppLayout';
import DocumentTitle from './components/layout/DocumentTitle';
import ProtectedRoute from './components/layout/ProtectedRoute';
import AdminRoute from './components/layout/AdminRoute';

// Page Imports
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import RoomPage from './pages/RoomPage';
import PracticePage from './pages/PracticePage';
import ProblemsPage from './pages/ProblemsPage';
import ProblemDetailPage from './pages/ProblemDetailPage';
import SessionHistoryPage from './pages/SessionHistoryPage';
import SessionRecapPage from './pages/SessionRecapPage';
import LeaderboardPage from './pages/LeaderboardPage';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';
import PricingPage from './pages/PricingPage';
import NotFoundPage from './pages/NotFoundPage';
import SystemDesign from './components/SystemDesign';
import AdminDashboardPage from './pages/AdminDashboardPage';
import AdminAddEditProblemPage from './pages/AdminAddEditProblemPage';

function AppContent() {
  return (
    <>
      <DocumentTitle />
      <Routes>
        {/* Public Pages */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<RegisterPage />} />

        {/* Protected Main Application Layout */}
        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/problems" element={<ProblemsPage />} />
            <Route path="/problems/:problemId" element={<ProblemDetailPage />} />
            <Route path="/leaderboard" element={<LeaderboardPage />} />
            <Route path="/history" element={<SessionHistoryPage />} />
            <Route path="/recap/:recapId" element={<SessionRecapPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/styling" element={<SystemDesign />} />

            {/* Admin Protected Routes */}
            <Route element={<AdminRoute />}>
              <Route path="/admin" element={<AdminDashboardPage />} />
              <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
              <Route path="/admin/problems/new" element={<AdminAddEditProblemPage />} />
              <Route path="/admin/problems/edit/:problemId" element={<AdminAddEditProblemPage />} />
            </Route>
          </Route>

          {/* Live interview room uses its own workspace layout, protected but outside AppLayout */}
          <Route path="/room/:roomId" element={<RoomPage />} />
          <Route path="/practice/:slug" element={<PracticePage />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
      <Toaster richColors theme="dark" position="bottom-right" />
    </AuthProvider>
  );
}

export default App;
