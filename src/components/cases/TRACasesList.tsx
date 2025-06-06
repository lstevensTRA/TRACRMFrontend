import { useState } from 'react';
import { Case } from '../../types/case';
import { CaseCard } from './CaseCard';

interface TRACasesListProps {
  cases: Case[];
  onCaseClick?: (caseItem: Case) => void;
}

export const TRACasesList = ({ cases, onCaseClick }: TRACasesListProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {cases.map((caseItem) => (
        <CaseCard
          key={caseItem.id}
          case={caseItem}
          onClick={() => onCaseClick?.(caseItem)}
        />
      ))}
    </div>
  );
}; 