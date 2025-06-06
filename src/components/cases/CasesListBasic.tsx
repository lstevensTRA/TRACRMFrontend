import React from 'react';
import { useTRACases } from '../../hooks/useTRACases';

export default function CasesListBasic() {
  const { data: cases, isLoading, error } = useTRACases();

  if (isLoading) return <div>Loading cases...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!cases || cases.length === 0) return <div>No cases found</div>;

  return (
    <div>
      <h1>TRA Cases - Raw Data Debug</h1>
      <p>Check console for actual field names!</p>
      
      {cases.map((caseItem, index) => (
        <div key={index} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
          <h3>Case #{index + 1}</h3>
          <pre style={{ fontSize: '12px', overflow: 'auto' }}>
            {JSON.stringify(caseItem, null, 2)}
          </pre>
        </div>
      ))}
    </div>
  );
} 