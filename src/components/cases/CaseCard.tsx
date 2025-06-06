import { Case } from '../../types/case';

interface CaseCardProps {
  case: Case;
  onClick?: () => void;
}

export const CaseCard = ({ case: caseItem, onClick }: CaseCardProps) => {
  return (
    <div 
      className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 cursor-pointer hover:shadow-md transition-shadow"
      onClick={onClick}
    >
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
        {caseItem.title}
      </h3>
      <p className="text-gray-600 dark:text-gray-400 mb-4">
        {caseItem.description}
      </p>
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-500 dark:text-gray-400">
          Status: {caseItem.status}
        </span>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          Priority: {caseItem.priority}
        </span>
      </div>
    </div>
  );
}; 