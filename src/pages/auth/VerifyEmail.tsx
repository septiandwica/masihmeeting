import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const VerifyEmail: React.FC = () => {
  const { token } = useParams<{ token: string }>();
  const { verifyEmail, isLoading, resendVerificationEmail } = useAuth();
  const [verificationStatus, setVerificationStatus] = useState<string>("");
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [hasAttemptedVerification, setHasAttemptedVerification] =
    useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token || hasAttemptedVerification) return;

    const verify = async () => {
      setHasAttemptedVerification(true);

      const success = await verifyEmail(token);
      if (success) {
        setVerificationStatus("Email verified successfully!");
        setIsVerified(true);
        localStorage.setItem("isVerified", "true");
        navigate("/login");
      } else {
        setVerificationStatus(
          "Email verification failed. The link may be expired or invalid."
        );
      }
    };

    verify();
  }, [token, verifyEmail, hasAttemptedVerification, navigate]);

  const handleResend = async () => {
    if (isVerified) {
      setVerificationStatus("Your email is already verified.");
      return;
    }

    const success = await resendVerificationEmail();
    if (success) {
      setVerificationStatus("Verification email sent successfully!");
    } else {
      setVerificationStatus("Failed to resend verification email.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-md w-full space-y-8 text-center">
        {isLoading ? (
          <div className="text-lg text-gray-900 dark:text-white">
            Verifying your email...
          </div>
        ) : (
          <div className="text-lg text-gray-900 dark:text-white">
            {verificationStatus}
          </div>
        )}

        {!isVerified && verificationStatus.includes("failed") && (
          <div className="mt-4">
            <button
              onClick={handleResend}
              className="px-6 py-2 text-sm font-medium text-blue-600 bg-blue-100 hover:bg-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Resend Verification Email
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
