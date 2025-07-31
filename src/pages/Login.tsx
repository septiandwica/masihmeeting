import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mic, Eye, EyeOff } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import Alert from "../components/Alert";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [showRegistrationAlert, setShowRegistrationAlert] = useState(false);
  const [showVerificationAlert, setShowVerificationAlert] = useState(false);
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("isVerified") === "true") {
      setShowVerificationAlert(true);
      localStorage.removeItem("isVerified");
    }

    if (localStorage.getItem("registrationSuccess") === "true") {
      setShowRegistrationAlert(true);
      localStorage.removeItem("registrationSuccess");

      setTimeout(() => {
        setShowRegistrationAlert(false);
      }, 5000);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    const success = await login(email, password);
    if (success) {
      navigate("/dashboard");
    } else {
      setError(
        "Invalid email or password. Password must be at least 6 characters."
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center">
            <div className="bg-blue-500 p-3 rounded-full">
              <Mic className="h-8 w-8 text-white" />
            </div>
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900 dark:text-white">
            Welcome back
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Sign in to your MasihMeeting? account
          </p>
        </div>

        {/* Floating Registration Success Alert */}
        {showRegistrationAlert && (
          <div className="fixed top-4 right-4 z-50 w-80 p-4 rounded-lg shadow-mdtransition-all opacity-100 duration-300 transform translate-y-0">
            <Alert
              type="success"
              title="Success!"
              message="Registration successful. Please log in!"
              dismissible={true}
              onClose={() => setShowRegistrationAlert(false)}
            />
          </div>
        )}

        {/* Floating Email Verified Alert */}
        {showVerificationAlert && (
          <div className="fixed top-4 right-4 z-50 w-80 p-4 rounded-lg shadow-mdtransition-all opacity-100 duration-300 transform translate-y-0">
            <Alert
              type="success"
              title="Verified!"
              message="Your email has been verified. Please log in!"
              dismissible={true}
              onClose={() => setShowVerificationAlert(false)}
            />
          </div>
        )}

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8 transition-colors duration-300">
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none relative block w-full px-3 py-3 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white bg-white dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none relative block w-full px-3 py-3 pr-10 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white bg-white dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  "Sign in"
                )}
              </button>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500"
                >
                  Sign up for free
                </Link>
              </p>
            </div>
          </form>
        </div>

        <div className="text-center">
          <Link
            to="/"
            className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            ← Back to homepage
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
