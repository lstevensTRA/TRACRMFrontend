import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { TRACase } from '../../types/traCase';
import { CaseCard } from './CaseCard';

interface TRACasesListProps {
  cases: TRACase[];
  onCaseClick?: (caseItem: TRACase) => void;
}

export const TRACasesList = ({ cases, onCaseClick }: TRACasesListProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {cases.map((caseItem) => (
        <CaseCard
          key={caseItem.incidentid}
          case={caseItem}
          onClick={() => onCaseClick?.(caseItem)}
        />
      ))}
    </div>
  );
}; 