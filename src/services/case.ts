import { Case } from '../types/case';

const apiUrl = import.meta.env.VITE_API_URL;

export const getCases = async (): Promise<Case[]> => {
  try {
    const response = await fetch(`${apiUrl}/cases`);
    if (!response.ok) {
      throw new Error('Failed to fetch cases');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching cases:', error);
    throw error;
  }
};

export const getCaseById = async (id: string): Promise<Case> => {
  try {
    const response = await fetch(`${apiUrl}/cases/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch case');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching case:', error);
    throw error;
  }
}; 