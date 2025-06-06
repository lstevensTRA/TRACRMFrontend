import { TRACase } from '../types/traCase';
import { getToken } from './auth';

const DATAVERSE_BASE_URL = 'https://tra-dev.crm.dynamics.com/api/data/v9.2';

// Debug logging utility
const debugLog = (message: string, data?: any) => {
  console.log(`[TRA Cases API] ${message}`, data || '');
};

const getHeaders = async () => {
  try {
    const token = await getToken();
    debugLog('Token received:', token ? 'EXISTS' : 'MISSING');
    
    if (!token) {
      throw new Error('No authentication token available');
    }

    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'OData-MaxVersion': '4.0',
      'OData-Version': '4.0',
      'Accept': 'application/json'
    };
  } catch (error) {
    debugLog('Error getting headers:', error);
    throw error;
  }
};

// Test connection function
export const testCasesConnection = async () => {
  try {
    const token = await getToken();
    debugLog('Testing connection with token:', token ? 'EXISTS' : 'MISSING');
    
    const response = await fetch(`${DATAVERSE_BASE_URL}/incidents?$top=5`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'OData-MaxVersion': '4.0',
        'OData-Version': '4.0'
      }
    });
    
    debugLog('Test response status:', response.status);
    if (!response.ok) {
      const errorText = await response.text();
      debugLog('Test error details:', errorText);
      throw new Error(`Test connection failed: ${response.status} - ${errorText}`);
    }
    
    const data = await response.json();
    debugLog('Test connection successful, cases found:', data.value?.length || 0);
    return data;
  } catch (error) {
    debugLog('Test connection error:', error);
    throw error;
  }
};

export const getCases = async (): Promise<TRACase[]> => {
  try {
    debugLog('Fetching all cases...');
    const token = await getToken();
    
    if (!token) {
      throw new Error('No authentication token available');
    }
    
    const queryUrl = `${DATAVERSE_BASE_URL}/incidents?$select=incidentid,title,ticketnumber,statecode,statuscode,_customerid_value,createdon,modifiedon,description,prioritycode,tra_irsstatus,tra_substatus&$top=100`;
    debugLog('Query URL:', queryUrl);
    
    const response = await fetch(queryUrl, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'OData-MaxVersion': '4.0',
        'OData-Version': '4.0',
        'Accept': 'application/json'
      }
    });
    
    debugLog('Response status:', response.status);
    
    if (!response.ok) {
      const errorDetails = await response.text();
      debugLog('Error response:', errorDetails);
      throw new Error(`Failed to fetch cases: ${response.status} - ${errorDetails}`);
    }
    
    const data = await response.json();
    debugLog('Successfully fetched cases:', data.value?.length || 0);
    
    return data.value || [];
  } catch (error) {
    debugLog('getCases error:', error);
    throw error;
  }
};

export const createCase = async (caseData: Partial<TRACase>): Promise<TRACase> => {
  try {
    debugLog('Creating case...');
    const token = await getToken();
    
    if (!token) {
      throw new Error('No authentication token available');
    }
    
    const response = await fetch(`${DATAVERSE_BASE_URL}/incidents`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'OData-MaxVersion': '4.0',
        'OData-Version': '4.0',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        title: caseData.title,
        description: caseData.description,
        prioritycode: caseData.prioritycode || 2,
        statecode: caseData.statecode || 0,
        statuscode: caseData.statuscode || 1
      })
    });
    
    if (!response.ok) {
      const errorDetails = await response.text();
      throw new Error(`Failed to create case: ${response.status} - ${errorDetails}`);
    }
    
    return await response.json();
  } catch (error) {
    debugLog('createCase error:', error);
    throw error;
  }
};

export const updateCase = async (caseId: string, caseData: Partial<TRACase>): Promise<void> => {
  try {
    debugLog('Updating case:', caseId);
    const token = await getToken();
    
    if (!token) {
      throw new Error('No authentication token available');
    }
    
    const response = await fetch(`${DATAVERSE_BASE_URL}/incidents(${caseId})`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'OData-MaxVersion': '4.0',
        'OData-Version': '4.0',
        'Accept': 'application/json'
      },
      body: JSON.stringify(caseData)
    });
    
    if (!response.ok) {
      const errorDetails = await response.text();
      throw new Error(`Failed to update case: ${response.status} - ${errorDetails}`);
    }
    
    debugLog('Case updated successfully');
  } catch (error) {
    debugLog('updateCase error:', error);
    throw error;
  }
};

export const deleteCase = async (caseId: string): Promise<void> => {
  try {
    debugLog('Deleting case:', caseId);
    const token = await getToken();
    
    if (!token) {
      throw new Error('No authentication token available');
    }
    
    const response = await fetch(`${DATAVERSE_BASE_URL}/incidents(${caseId})`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'OData-MaxVersion': '4.0',
        'OData-Version': '4.0'
      }
    });
    
    if (!response.ok) {
      const errorDetails = await response.text();
      throw new Error(`Failed to delete case: ${response.status} - ${errorDetails}`);
    }
    
    debugLog('Case deleted successfully');
  } catch (error) {
    debugLog('deleteCase error:', error);
    throw error;
  }
};

export const traCasesApi = {
  getCases,
  createCase,
  updateCase,
  deleteCase
}; 