import { Navigate } from "react-router-dom";
import { useIsAuthenticated } from "../hooks/useAuth";

function AuthenticatedRoute({ children }) {
  const isAuthenticated = useIsAuthenticated();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default AuthenticatedRoute;
