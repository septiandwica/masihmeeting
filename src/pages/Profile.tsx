import React, { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const ProfilePage: React.FC = () => {
  const { user, isLoading, fetchUserProfile, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user && !isLoading) {
      fetchUserProfile();
    }
  }, [user, isLoading, fetchUserProfile]);
  const handleLogout = () => {
    logout(); 
    navigate("/"); 
  };
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-lg w-full space-y-8">
        <div className="text-center">
          <div className="relative flex justify-center mb-6">
            <div className="relative">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 w-24 h-24 rounded-full flex justify-center items-center transform  transition-transform duration-300">
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt="User Avatar"
                    className="h-24 w-24 rounded-2xl object-cover"
                  />
                ) : (
                  <h1 className="text-white text-5xl font-bold text-capitalize">
                    {user?.name?.charAt(0)}
                  </h1>
                )}
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 border-4 border-white dark:border-gray-800 rounded-full"></div>
            </div>
          </div>

          <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
            Welcome back, {user?.name}
          </h2>
          <p className="mt-3 text-lg text-gray-600 dark:text-gray-400">
            Manage your profile and account settings
          </p>
        </div>

        {user && (
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl border border-white/20 dark:border-gray-700/20 overflow-hidden transition-all duration-300 ">
            <div className="bg-gradient-to-r from-blue-500/10 to-indigo-500/10 dark:from-blue-500/20 dark:to-indigo-500/20 px-8 py-6 border-b border-gray-200/50 dark:border-gray-700/50">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Profile Information
              </h3>
            </div>

            <div className="p-8 space-y-6">
              <div className="group">
                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  Email Address
                </label>
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl px-4 py-3 border border-gray-200 dark:border-gray-600 group-hover:border-blue-300 dark:group-hover:border-blue-500 transition-colors">
                  <p className="text-gray-900 dark:text-white font-medium">
                    {user.email}
                  </p>
                </div>
              </div>

              {/* Verification Status */}
              <div className="group">
                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  Account Status
                </label>
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl px-4 py-3 border border-gray-200 dark:border-gray-600 group-hover:border-blue-300 dark:group-hover:border-blue-500 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        user.isVerified ? "bg-green-500" : "bg-yellow-500"
                      }`}
                    ></div>
                    <p className="text-gray-900 dark:text-white font-medium">
                      {user.isVerified
                        ? "Verified Account"
                        : "Pending Verification"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 space-y-3">
                <button
                  onClick={handleLogout}
                  className="group relative w-full flex justify-center items-center py-4 px-6 border border-transparent text-base font-medium rounded-2xl text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform  active:scale-[0.98] -lg "
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                    />
                  </svg>
                  Sign Out
                </button>

                <button className="w-full flex justify-center items-center py-3 px-6 border-2 border-gray-300 dark:border-gray-600 text-base font-medium rounded-2xl text-gray-700 dark:text-gray-300 bg-transparent hover:bg-gray-50 dark:hover:bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-300 transform active:scale-[0.98]">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                  Edit Profile
                </button>
              </div>
            </div>
          </div>
        )}

        {/* {!user && (
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl  border border-white/20 dark:border-gray-700/20 p-8 ">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Authentication Required
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Please log in to view your profile information and manage your
                account.
              </p>
              <Link
                to="/login"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-2xl text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 "
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                  />
                </svg>
                Sign In
              </Link>
            </div>
          </div>
        )} */}

        {/* Navigation */}
        <div className="text-center">
          <Link
            to="/dashboard"
            className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 group"
          >
            <svg
              className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
