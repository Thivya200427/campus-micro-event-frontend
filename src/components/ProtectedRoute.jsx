import { Navigate } from "react-router-dom";
import { getLoggedInUser } from "../utils/authStore";

function ProtectedRoute({ allowedRole, children }) {
  const user = getLoggedInUser();

  // Not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Logged in, but wrong role
  if (allowedRole && user.role !== allowedRole) {
    if (user.role === "club") {
      return <Navigate to="/dashboard" replace />;
    }

    if (user.role === "estate") {
      return <Navigate to="/estate/dashboard" replace />;
    }

    if (user.role === "admin") {
      return <Navigate to="/admin/dashboard" replace />;
    }

    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;