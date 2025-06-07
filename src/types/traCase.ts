export interface TRACase {
  incidentid: string;
  title: string;
  description?: string;
  statecode: number;
  statuscode: number;
  prioritycode: number;
  createdon: string;
  modifiedon: string;
  _customerid_value?: string;
  _customerid_type?: string; // 'contact' or 'account'
  customerid?: {
    id: string;
    name: string;
    type: 'contact' | 'account';
  };
} 