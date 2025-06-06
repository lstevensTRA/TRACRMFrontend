import { useQuery } from '@tanstack/react-query';
import { traCasesApi } from '../services/traCasesApi';
import { TRACase } from '../types/traCase';

export function useTRACases(params?: Record<string, string | number>) {
  return useQuery<TRACase[], Error>({
    queryKey: ['tra-cases', params],
    queryFn: () => traCasesApi.getCases(params),
  });
} 