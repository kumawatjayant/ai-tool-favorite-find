
import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 max-w-md">
        <div className="flex items-center">
          <AlertCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
          <div>
            <h3 className="text-sm font-medium text-red-800 dark:text-red-200">
              Something went wrong
            </h3>
            <p className="text-sm text-red-600 dark:text-red-400 mt-1">
              {message}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;
