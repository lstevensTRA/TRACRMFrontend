import React from 'react';

interface StatusBadgeProps {
  status: number | string;
  type?: 'state' | 'status';
}

export function StatusBadge({ status, type = 'state' }: StatusBadgeProps) {
  const getStatusColor = (status: number | string) => {
    // Convert to string safely and handle numbers
    const statusStr = String(status).toLowerCase();
    
    // Handle Dataverse statecode numbers
    if (status === 0 || statusStr === 'active') {
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
    }
    if (status === 1 || statusStr === 'resolved') {
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
    }
    if (status === 2 || statusStr === 'problem') {
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
    }
    if (status === 3 || statusStr === 'question') {
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
    }
    if (statusStr === 'pending') {
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
    }
    return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
  };

  const getStatusLabel = (status: number | string) => {
    // Convert Dataverse statecode numbers to readable labels
    if (status === 0) return 'Active';
    if (status === 1) return 'Resolved';
    if (status === 2) return 'Problem';
    if (status === 3) return 'Question';
    
    // For other status codes, just display the value
    return String(status);
  };

  const colorClass = getStatusColor(status);
  const label = getStatusLabel(status);

  return (
    <span 
      className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${colorClass}`}
      title={type === 'state' ? 'State' : 'Status'}
    >
      {label}
    </span>
  );
} 