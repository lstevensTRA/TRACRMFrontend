import React from 'react';
import { useTRACases } from '../../hooks/useTRACases';
import { CaseCard } from './CaseCard';

export function TRACasesList() {
  const { data: cases, isLoading, error } = useTRACases();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 m-4">
        <div className="text-red-800 dark:text-red-200">
          <h3 className="font-medium">Error loading cases</h3>
          <p className="text-sm mt-1">{error.message}</p>
        </div>
      </div>
    );
  }

  if (!cases || cases.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 dark:text-gray-400">
          <h3 className="text-lg font-medium">No cases found</h3>
          <p className="mt-2">There are no cases to display at this time.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">TRA Cases</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">Manage and track tax relief cases</p>
      </div>

      {/* Cases Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {cases.map((caseItem) => (
          <CaseCard 
            key={caseItem.incidentid} 
            case={caseItem}
            onClick={() => {
              // TODO: Implement case details view
              console.log('View case:', caseItem.incidentid);
            }}
          />
        ))}
      </div>
    </div>
  );
} 