import { Navigate } from "react-router-dom";
import { getLoggedInUser } from "../utils/authStore";

function ProtectedRoute({ allowedRole, children }) {
  const user = getLoggedInUser();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRole && user.role !== allowedRole) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;