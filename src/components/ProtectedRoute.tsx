import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user } = useAuth(); // Use user state from AuthContext

  // If the user is not logged in (user is null), redirect to the login page
  if (!user) {
    return <Navigate to="/login" />;
  }

  // If the user is logged in, render the protected route (children)
  return <>{children}</>;
};

export default ProtectedRoute;
