import { Navigate } from "react-router-dom";
import { useAuth } from "../context/Auth";

export const GuestGuard: React.FC<{ children: JSX.Element }> = ({
  children,
}) => {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) return <Navigate to="/dashboard" replace />;
  return children;
};
