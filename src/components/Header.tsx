import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mic, Moon, Sun, LogOut, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

const Header: React.FC = () => {
  const { user, logout } = useAuth();  // Use user and logout from AuthContext
  const { isDark, toggleTheme } = useTheme();  // Use theme from ThemeContext
  const navigate = useNavigate();

  // Handle logout
  const handleLogout = () => {
    logout();  // Call logout function from AuthContext
    navigate('/');  // Redirect to the homepage after logout
  };

  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="bg-blue-500 p-2 rounded-lg">
                <Mic className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                MasihMeeting?
              </span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Home
            </Link>
            <Link
              to="/features"
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Features
            </Link>
            <Link
              to="/pricing"
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Pricing
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            {/* Theme toggle button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            {/* If user is logged in, show their name and logout button */}
            {user ? (
              <div className="flex items-center space-x-3">
                <Link
                  to="/dashboard"
                  className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  <User className="h-5 w-5" />
                  <span className="hidden sm:block">{user.name}</span> {/* Display name only when logged in */}
                </Link>
                <button
                  onClick={handleLogout}
                  className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
              // If user is not logged in, show "Sign In" button
              <Link
                to="/login"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
