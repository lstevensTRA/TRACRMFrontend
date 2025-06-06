import { useQuery } from '@tanstack/react-query';
import { traCasesApi } from '../services/traCasesApi';
import { TRACase } from '../types/traCase';

export const useTRACases = () => {
  return useQuery({
    queryKey: ['tra-cases'],
    queryFn: () => traCasesApi.getCases(),
  });
}; 