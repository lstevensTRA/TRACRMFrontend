export interface TRACase {
  // Core fields
  incidentid: string;
  title: string;
  ticketnumber: string;
  statecode: number;
  statuscode: number;
  createdon: string;
  modifiedon: string;
  
  // Customer relationship
  _customerid_value?: string;
  customerid?: {
    name: string;
  };
  
  // Custom fields
  tra_caseadvocate?: string;
  tra_offeranalyst?: string;
  tra_setofficer?: string;
  tra_thsstatus?: number;
  tra_irsstatus?: number;
  tra_substatus?: number;
  
  // Lookup values
  _tra_caseadvocate_value?: string;
  _tra_offeranalyst_value?: string;
  _tra_setofficer_value?: string;
  
  // Allow for additional fields we discover
  [key: string]: any;
} 