import axios from 'axios';
import { getToken } from './auth';

const DYNAMICS_URL = 'https://tra-dev.crm.dynamics.com/api/data/v9.2';

interface DynamicsSearchResult {
  id: string;
  name: string;
  type: 'contact' | 'account';
}

export const searchContacts = async (searchTerm: string): Promise<DynamicsSearchResult[]> => {
  try {
    const token = await getToken();
    if (!token) {
      throw new Error('No authentication token available');
    }

    const response = await axios.get(`${DYNAMICS_URL}/contacts`, {
      params: {
        $select: 'contactid,fullname',
        $filter: `contains(fullname,'${searchTerm}')`,
        $top: 10
      },
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'OData-MaxVersion': '4.0',
        'OData-Version': '4.0',
        'Accept': 'application/json'
      }
    });

    return response.data.value.map((contact: any) => ({
      id: contact.contactid,
      name: contact.fullname,
      type: 'contact' as const
    }));
  } catch (error) {
    console.error('Error searching contacts:', error);
    return [];
  }
};

export const searchAccounts = async (searchTerm: string): Promise<DynamicsSearchResult[]> => {
  try {
    const token = await getToken();
    if (!token) {
      throw new Error('No authentication token available');
    }

    const response = await axios.get(`${DYNAMICS_URL}/accounts`, {
      params: {
        $select: 'accountid,name',
        $filter: `contains(name,'${searchTerm}')`,
        $top: 10
      },
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'OData-MaxVersion': '4.0',
        'OData-Version': '4.0',
        'Accept': 'application/json'
      }
    });

    return response.data.value.map((account: any) => ({
      id: account.accountid,
      name: account.name,
      type: 'account' as const
    }));
  } catch (error) {
    console.error('Error searching accounts:', error);
    return [];
  }
};

export const searchCustomers = async (searchTerm: string): Promise<DynamicsSearchResult[]> => {
  const [contacts, accounts] = await Promise.all([
    searchContacts(searchTerm),
    searchAccounts(searchTerm)
  ]);

  return [...contacts, ...accounts].sort((a, b) => a.name.localeCompare(b.name));
}; 