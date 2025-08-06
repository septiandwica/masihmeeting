import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { handleGoogleCallback } from "../services/authApi";
import { useAuth } from "../contexts/AuthContext"; 

const OauthCallbackPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const { fetchUserProfile, setUser } = useAuth(); 

  useEffect(() => {
    const processGoogleLogin = async () => {

      if (token) {
        try {
          handleGoogleCallback(token);

          await fetchUserProfile(); 

          const currentUser = JSON.parse(localStorage.getItem("user") || "null");
          const currentToken = localStorage.getItem("token");
          
          if (currentUser && currentToken) {
            navigate("/dashboard", { replace: true });
          } else {
            navigate("/login?error=google_login_failed", { replace: true });
          }

        } catch (error) {
          localStorage.removeItem("user");
          localStorage.removeItem("token");
          setUser(null);
          navigate("/login?error=google_login_failed", { replace: true });
        }
      } else {
        navigate("/login?error=no_token", { replace: true });
      }
    };

    processGoogleLogin();
  }, [token, navigate, fetchUserProfile, setUser]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <p className="text-lg text-gray-700">Redirecting...</p>
    </div>
  );
};

export default OauthCallbackPage;
