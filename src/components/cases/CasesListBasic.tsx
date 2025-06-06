import { useState } from 'react';
import { Case } from '../../types/case';

interface CasesListBasicProps {
  cases: Case[];
  onCaseClick?: (caseItem: Case) => void;
}

export const CasesListBasic = ({ cases, onCaseClick }: CasesListBasicProps) => {
  return (
    <div className="space-y-4">
      {cases.map((caseItem) => (
        <div
          key={caseItem.id}
          className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => onCaseClick?.(caseItem)}
        >
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            {caseItem.title}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Status: {caseItem.status}
          </p>
        </div>
      ))}
    </div>
  );
}; 