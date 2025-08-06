import React from "react";
import { AlertTriangle, RefreshCw, ArrowLeft } from "lucide-react";

const ErrorPage: React.FC = () => {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 min-h-screen flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-100/10 to-gray-100/98 dark:from-gray-900/10 dark:to-gray-800/98"></div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="p-12">
            <div className="flex justify-center mb-8">
              <div className="bg-red-100 dark:bg-red-900/20 rounded-full p-6">
                <AlertTriangle className="h-16 w-16 text-red-500" />
              </div>
            </div>

            <div className="mb-6">
              <h1 className="text-8xl md:text-9xl font-bold text-gray-900 dark:text-white mb-4">
                404
              </h1>
              <div className="w-24 h-1 bg-blue-600 dark:bg-blue-400 mx-auto rounded-full"></div>
            </div>

            <div className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Oops! Page Not Found
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                The page you're looking for seems to have wandered off during a
                meeting. Don't worry, even the best meetings sometimes go off
                track!
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 mb-12 text-left">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                What happened?
              </h3>
              <ul className="text-gray-600 dark:text-gray-300 space-y-2">
                <li>• The page might have been moved or deleted</li>
                <li>• You may have typed the URL incorrectly</li>
                <li>• The link you followed might be broken</li>
                <li>• Our servers might be taking a quick coffee break</li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleRefresh}
                className="inline-flex items-center px-8 py-4 border-2 border-blue-600 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 font-semibold rounded-lg transition-colors"
              >
                <RefreshCw className="mr-2 h-5 w-5" />
                Try Again
              </button>

              <button
                onClick={() => window.history.back()}
                className="inline-flex items-center px-8 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 font-semibold rounded-lg transition-colors"
              >
                <ArrowLeft className="mr-2 h-5 w-5" />
                Go Back
              </button>
            </div>

            <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-600">
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                Still having trouble? We're here to help!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center text-sm">
                <a
                  href="/contact"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Contact Support
                </a>
                <a
                  href="/help"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Help Center
                </a>
                <a
                  href="/status"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Service Status
                </a>
              </div>
            </div>
          </div>

          <div className="absolute top-20 left-20 w-20 h-20 bg-blue-200 dark:bg-blue-800 rounded-full opacity-20 animate-pulse"></div>
          <div
            className="absolute bottom-20 right-20 w-32 h-32 bg-purple-200 dark:bg-purple-800 rounded-full opacity-20 animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute top-1/2 left-10 w-16 h-16 bg-green-200 dark:bg-green-800 rounded-full opacity-20 animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
