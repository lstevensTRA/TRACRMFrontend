import { Case } from '../types/case';
import { getToken } from './auth';

const apiUrl = import.meta.env.VITE_API_URL;

export const getCases = async (): Promise<Case[]> => {
  try {
    const token = await getToken();
    if (!token) {
      throw new Error('No authentication token available');
    }

    console.log('Making request to Dataverse API with token');
    const response = await fetch(`${apiUrl}/incidents?$select=incidentid,title,ticketnumber,statecode,statuscode,_customerid_value,createdon,modifiedon,description,prioritycode&$top=100`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'OData-MaxVersion': '4.0',
        'OData-Version': '4.0',
        'Accept': 'application/json',
        'Prefer': 'odata.include-annotations="*"'
      }
    });

    if (!response.ok) {
      const errorDetails = await response.text();
      console.error('Dataverse API error:', {
        status: response.status,
        statusText: response.statusText,
        details: errorDetails
      });
      throw new Error(`Failed to fetch cases: ${response.status} - ${errorDetails}`);
    }

    const data = await response.json();
    console.log('Successfully fetched cases:', data.value?.length || 0);
    return data.value || [];
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