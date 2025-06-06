import React from 'react';
import { TRACase } from '../../types/traCase';
import { StatusBadge } from '../ui/StatusBadge';

interface CaseCardProps {
  case: TRACase;
  onClick?: () => void;
}

export function CaseCard({ case: caseItem, onClick }: CaseCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStateLabel = (statecode: number) => {
    switch (statecode) {
      case 0: return 'Active';
      case 1: return 'Resolved';
      case 2: return 'Problem';
      case 3: return 'Question';
      default: return 'Unknown';
    }
  };

  return (
    <div 
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-shadow cursor-pointer"
      onClick={onClick}
    >
      {/* Case Header */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {caseItem.title || 'Untitled Case'}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            #{caseItem.ticketnumber}
          </p>
        </div>
        <StatusBadge status={caseItem.statecode} type="state" />
      </div>

      {/* Case Details */}
      <div className="space-y-2 text-sm">
        {caseItem.customerid?.name && (
          <div className="flex justify-between">
            <span className="text-gray-500 dark:text-gray-400">Customer:</span>
            <span className="text-gray-900 dark:text-white font-medium">
              {caseItem.customerid.name}
            </span>
          </div>
        )}
        
        <div className="flex justify-between">
          <span className="text-gray-500 dark:text-gray-400">Created:</span>
          <span className="text-gray-900 dark:text-white">
            {formatDate(caseItem.createdon)}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-500 dark:text-gray-400">Modified:</span>
          <span className="text-gray-900 dark:text-white">
            {formatDate(caseItem.modifiedon)}
          </span>
        </div>

        {/* Team Members */}
        {(caseItem.tra_caseadvocate || caseItem.tra_offeranalyst || caseItem.tra_setofficer) && (
          <div className="pt-2 mt-2 border-t border-gray-100 dark:border-gray-700">
            <p className="text-gray-500 dark:text-gray-400 mb-1">Team:</p>
            <div className="space-y-1">
              {caseItem.tra_caseadvocate && (
                <div className="text-sm text-gray-900 dark:text-white">
                  Advocate: {caseItem.tra_caseadvocate}
                </div>
              )}
              {caseItem.tra_offeranalyst && (
                <div className="text-sm text-gray-900 dark:text-white">
                  Analyst: {caseItem.tra_offeranalyst}
                </div>
              )}
              {caseItem.tra_setofficer && (
                <div className="text-sm text-gray-900 dark:text-white">
                  Officer: {caseItem.tra_setofficer}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
        <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium">
          View Details →
        </button>
      </div>
    </div>
  );
} 