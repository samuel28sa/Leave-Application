import { Navigate, useLocation } from "react-router-dom";
import { useGlobalContext } from "../context/userContext";

export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useGlobalContext();
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect them to the login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};

export const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useGlobalContext();
  const location = useLocation();

  if (isAuthenticated) {
    // If user is authenticated and tries to access public routes like login,
    // redirect them to admin dashboard
    return <Navigate to="/admin" state={{ from: location }} replace />;
  }

  return children;
};
