import { Navigate } from 'react-router-dom';
import { useAuth } from "../contexts/Authcontext";  

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAdmin } = useAuth();

  if (!isAdmin) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}