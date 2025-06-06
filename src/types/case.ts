export interface Case {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  assignedTo: string;
  createdDate: string;
  lastModifiedDate: string;
  ticketnumber: string;
  statecode: number;
  customerid: {
    id: string;
    name: string;
    email: string;
  };
  createdon: string;
  modifiedon: string;
  tra_caseadvocate?: string;
  tra_offeranalyst?: string;
  tra_setofficer?: string;
  attachments: Array<{
    id: string;
    name: string;
    url: string;
  }>;
  comments: Array<{
    id: string;
    text: string;
    author: string;
    createdDate: string;
  }>;
} 