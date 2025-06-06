import { useState, useEffect } from 'react';
import { PageContent, PageHeader } from '../components/layout';
import { CaseCard } from '../components/cases';
import { getCases } from '../services/case';
import { Case } from '../types/case';

export const TRACasesListPage = () => {
  const [cases, setCases] = useState<Case[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCases = async () => {
      try {
        const data = await getCases();
        setCases(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load cases');
        setLoading(false);
      }
    };

    fetchCases();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <PageHeader title="TRA Cases" />
      <PageContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {cases.map((caseItem) => (
            <CaseCard key={caseItem.id} case={caseItem} />
          ))}
        </div>
      </PageContent>
    </>
  );
};