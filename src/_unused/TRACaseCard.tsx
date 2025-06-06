import React from 'react';
import { TRACase } from '../../types/traCase';
import { StatusBadge } from '../ui/StatusBadge';
import { TeamMemberCard } from '../ui/TeamMemberCard';

interface TRACaseCardProps {
  traCase: TRACase;
  onEdit: () => void;
  onDelete: () => void;
  icons?: {
    users: React.ReactNode;
    clock: React.ReactNode;
    status: React.ReactNode;
  };
}

export const TRACaseCard: React.FC<TRACaseCardProps> = ({ traCase, onEdit, onDelete, icons }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <div className="font-bold text-lg">{traCase.ticketnumber} - {traCase.title}</div>
        <div className="flex items-center gap-2">
          {icons?.status}
          <StatusBadge type="state" status={traCase.statecode} />
        </div>
      </div>
      <div className="text-sm text-gray-500 dark:text-gray-300">{traCase.description}</div>
      <div className="flex flex-wrap gap-2 mt-2">
        {traCase.tra_caseadvocate && (
          <TeamMemberCard name={traCase.tra_caseadvocate} role="Case Advocate" icon={icons?.users} />
        )}
        {traCase.tra_offeranalyst && (
          <TeamMemberCard name={traCase.tra_offeranalyst} role="Offer Analyst" icon={icons?.users} />
        )}
        {traCase.tra_setofficer && (
          <TeamMemberCard name={traCase.tra_setofficer} role="SET Officer" icon={icons?.users} />
        )}
      </div>
      <div className="flex items-center gap-2 text-sm text-gray-500">
        {icons?.clock}
        <span>Last updated: {new Date(traCase.modifiedon).toLocaleDateString()}</span>
      </div>
      <div className="flex justify-end gap-2 mt-4">
        <button
          onClick={onEdit}
          className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 px-3 py-1 rounded-md text-xs font-medium transition-colors"
        >
          Edit
        </button>
        <button
          onClick={onDelete}
          className="bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/40 px-3 py-1 rounded-md text-xs font-medium transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  );
}; 