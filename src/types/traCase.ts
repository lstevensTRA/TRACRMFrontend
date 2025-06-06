export interface TRACase {
  incidentid: string;
  title: string;
  description: string;
  statecode: number;
  statuscode: number;
  prioritycode: number;
  ticketnumber: string;
  createdon: string;
  modifiedon: string;
  _customerid_value: string;
  casenumber?: string;
  customerid_formatted?: string;
} 