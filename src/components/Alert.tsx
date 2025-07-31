import React from 'react';
import { CheckCircle, XCircle, AlertTriangle, Info, X } from 'lucide-react';

export type AlertType = 'success' | 'error' | 'warning' | 'info';

interface AlertProps {
  type: AlertType;
  title?: string;
  message: string;
  onClose?: () => void;
  dismissible?: boolean;
  className?: string;
}

const Alert: React.FC<AlertProps> = ({
  type,
  title,
  message,
  onClose,
  dismissible = false,
  className = ''
}) => {
  const getAlertStyles = () => {
    switch (type) {
      case 'success':
        return {
          container: 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800',
          icon: 'text-green-500',
          title: 'text-green-800 dark:text-green-400',
          message: 'text-green-700 dark:text-green-300',
          closeButton: 'text-green-500 hover:text-green-600 dark:hover:text-green-400'
        };
      case 'error':
        return {
          container: 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800',
          icon: 'text-red-500',
          title: 'text-red-800 dark:text-red-400',
          message: 'text-red-700 dark:text-red-300',
          closeButton: 'text-red-500 hover:text-red-600 dark:hover:text-red-400'
        };
      case 'warning':
        return {
          container: 'bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800',
          icon: 'text-yellow-500',
          title: 'text-yellow-800 dark:text-yellow-400',
          message: 'text-yellow-700 dark:text-yellow-300',
          closeButton: 'text-yellow-500 hover:text-yellow-600 dark:hover:text-yellow-400'
        };
      case 'info':
        return {
          container: 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800',
          icon: 'text-blue-500',
          title: 'text-blue-800 dark:text-blue-400',
          message: 'text-blue-700 dark:text-blue-300',
          closeButton: 'text-blue-500 hover:text-blue-600 dark:hover:text-blue-400'
        };
      default:
        return {
          container: 'bg-gray-50 dark:bg-gray-900/20 border border-gray-200 dark:border-gray-800',
          icon: 'text-gray-500',
          title: 'text-gray-800 dark:text-gray-400',
          message: 'text-gray-700 dark:text-gray-300',
          closeButton: 'text-gray-500 hover:text-gray-600 dark:hover:text-gray-400'
        };
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-5 w-5" />;
      case 'error':
        return <XCircle className="h-5 w-5" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5" />;
      case 'info':
        return <Info className="h-5 w-5" />;
      default:
        return <Info className="h-5 w-5" />;
    }
  };

  const styles = getAlertStyles();

  return (
    <div className={`rounded-lg p-4 ${styles.container} ${className} transition-all duration-300`}>
      <div className="flex">
        <div className={`flex-shrink-0 ${styles.icon}`}>
          {getIcon()}
        </div>
        <div className="ml-3 flex-1">
          {title && (
            <h3 className={`text-sm font-medium ${styles.title} mb-1`}>
              {title}
            </h3>
          )}
          <div className={`text-sm ${styles.message}`}>
            {message}
          </div>
        </div>
        {dismissible && onClose && (
          <div className="ml-auto pl-3">
            <div className="-mx-1.5 -my-1.5">
              <button
                type="button"
                onClick={onClose}
                className={`inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors ${styles.closeButton}`}
              >
                <span className="sr-only">Dismiss</span>
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Alert;