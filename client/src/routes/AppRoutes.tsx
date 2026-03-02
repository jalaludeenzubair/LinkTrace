import { Routes, Route, Navigate } from "react-router-dom";
import { Login } from "../components/auth/Login";
import { Signup } from "../components/auth/Signup";
import { Dashboard } from "../pages/Dashboard";
import { LinkHistoryPage } from "../pages/LinkHistoryPage";
import { LinkInsightsPage } from "../pages/LinkInsightsPage";
import SettingsPage from "../pages/SettingsPage";
import { GuestGuard } from "../HOC/GuestGuard";
import { AuthGuard } from "../HOC/AuthGuard";

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <GuestGuard>
            <Login />
          </GuestGuard>
        }
      />
      <Route
        path="/signup"
        element={
          <GuestGuard>
            <Signup />
          </GuestGuard>
        }
      />
      <Route
        path="/dashboard"
        element={
          <AuthGuard>
            <Dashboard />
          </AuthGuard>
        }
      />
      <Route
        path="/dashboard/history/:shortCode"
        element={
          <AuthGuard>
            <LinkHistoryPage />
          </AuthGuard>
        }
      />
      <Route
        path="/dashboard/insights/:shortCode"
        element={
          <AuthGuard>
            <LinkInsightsPage />
          </AuthGuard>
        }
      />
      <Route
        path="/dashboard/settings"
        element={
          <AuthGuard>
            <SettingsPage />
          </AuthGuard>
        }
      />
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};
