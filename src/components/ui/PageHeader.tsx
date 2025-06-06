import React from 'react';

export interface PageHeaderProps {
  title: string;
  actions?: React.ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ title, actions }) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-semibold">{title}</h1>
      {actions && <div>{actions}</div>}
    </div>
  );
};

export default PageHeader; 