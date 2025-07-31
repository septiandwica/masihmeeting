import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, AlertTriangle, Info, X } from 'lucide-react';
import { AlertType } from './Alert';

interface ToastProps {
  type: AlertType;
  title?: string;
  message: string;
  duration?: number; // in milliseconds
  onClose: () => void;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
}

const Toast: React.FC<ToastProps> = ({
  type,
  title,
  message,
  duration = 5000,
  onClose,
  position = 'top-right'
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Show animation
    setTimeout(() => setIsVisible(true), 100);

    // Auto dismiss
    if (duration > 0) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const getToastStyles = () => {
    switch (type) {
      case 'success':
        return {
          container: 'bg-white dark:bg-gray-800 border-l-4 border-green-500 shadow-lg',
          icon: 'text-green-500',
          title: 'text-gray-900 dark:text-white',
          message: 'text-gray-600 dark:text-gray-300'
        };
      case 'error':
        return {
          container: 'bg-white dark:bg-gray-800 border-l-4 border-red-500 shadow-lg',
          icon: 'text-red-500',
          title: 'text-gray-900 dark:text-white',
          message: 'text-gray-600 dark:text-gray-300'
        };
      case 'warning':
        return {
          container: 'bg-white dark:bg-gray-800 border-l-4 border-yellow-500 shadow-lg',
          icon: 'text-yellow-500',
          title: 'text-gray-900 dark:text-white',
          message: 'text-gray-600 dark:text-gray-300'
        };
      case 'info':
        return {
          container: 'bg-white dark:bg-gray-800 border-l-4 border-blue-500 shadow-lg',
          icon: 'text-blue-500',
          title: 'text-gray-900 dark:text-white',
          message: 'text-gray-600 dark:text-gray-300'
        };
      default:
        return {
          container: 'bg-white dark:bg-gray-800 border-l-4 border-gray-500 shadow-lg',
          icon: 'text-gray-500',
          title: 'text-gray-900 dark:text-white',
          message: 'text-gray-600 dark:text-gray-300'
        };
    }
  };

  const getPositionStyles = () => {
    switch (position) {
      case 'top-right':
        return 'fixed top-4 right-4 z-50';
      case 'top-left':
        return 'fixed top-4 left-4 z-50';
      case 'bottom-right':
        return 'fixed bottom-4 right-4 z-50';
      case 'bottom-left':
        return 'fixed bottom-4 left-4 z-50';
      case 'top-center':
        return 'fixed top-4 left-1/2 transform -translate-x-1/2 z-50';
      case 'bottom-center':
        return 'fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50';
      default:
        return 'fixed top-4 right-4 z-50';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-6 w-6" />;
      case 'error':
        return <XCircle className="h-6 w-6" />;
      case 'warning':
        return <AlertTriangle className="h-6 w-6" />;
      case 'info':
        return <Info className="h-6 w-6" />;
      default:
        return <Info className="h-6 w-6" />;
    }
  };

  const styles = getToastStyles();
  const positionClass = getPositionStyles();

  const animationClass = isExiting
    ? 'opacity-0 transform translate-x-full'
    : isVisible
    ? 'opacity-100 transform translate-x-0'
    : 'opacity-0 transform translate-x-full';

  return (
    <div className={`${positionClass} transition-all duration-300 ease-in-out ${animationClass}`}>
      <div className={`max-w-sm w-full rounded-lg ${styles.container} p-4`}>
        <div className="flex items-start">
          <div className={`flex-shrink-0 ${styles.icon}`}>
            {getIcon()}
          </div>
          <div className="ml-3 w-0 flex-1">
            {title && (
              <p className={`text-sm font-medium ${styles.title}`}>
                {title}
              </p>
            )}
            <p className={`text-sm ${styles.message} ${title ? 'mt-1' : ''}`}>
              {message}
            </p>
          </div>
          <div className="ml-4 flex-shrink-0 flex">
            <button
              className="rounded-md inline-flex text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              onClick={handleClose}
            >
              <span className="sr-only">Close</span>
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Toast;