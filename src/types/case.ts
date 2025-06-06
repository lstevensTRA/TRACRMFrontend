export interface Case {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  assignedTo: string;
  createdDate: string;
  lastModifiedDate: string;
  customer: {
    id: string;
    name: string;
    email: string;
  };
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