import { Navigate } from "react-router-dom";
import { useAuth } from "../context/Auth";

export const AuthGuard: React.FC<{ children: JSX.Element }> = ({
  children,
}) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return children;
};
