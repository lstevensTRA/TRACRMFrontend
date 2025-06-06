import React from 'react';

export interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
      <p className="text-red-800">{message}</p>
    </div>
  );
};

export default ErrorMessage; 