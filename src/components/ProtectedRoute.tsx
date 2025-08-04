import React, { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

interface ProtectedRouteProps {
  children: ReactNode;
  redirectTo?: string; // Optional redirect if needed
  allowProfile?: boolean; // New prop to allow access to the profile page
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, redirectTo, allowProfile }) => {
  const navigate = useNavigate();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (isLoading) return; // Wait for loading state

    if (!user) {
      // If the user is not authenticated, redirect to login page
      if (redirectTo) {
        navigate(redirectTo); // Redirect to the provided path, like /dashboard after login
      } else {
        navigate("/login"); // Redirect to login if no path is provided
      }
    } else {
      // If the user is authenticated, handle role-based redirection
      if (allowProfile) return; // Allow profile access without redirection

      if (user?.role === "admin") {
        // Admin can access both /dashboard and /admin/dashboard
        if (redirectTo === "/dashboard") {
          navigate("/admin/dashboard");
        }
      } else {
        // Regular user can only access /dashboard
        if (redirectTo === "/admin/dashboard") {
          navigate("/dashboard");
        }
      }
    }
  }, [user, isLoading, navigate, redirectTo, allowProfile]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // If the user is authenticated, return the children (protected content)
  return <>{children}</>;
};

export default ProtectedRoute;
