import React from 'react';

export interface PageContentProps {
  children: React.ReactNode;
}

export const PageContent: React.FC<PageContentProps> = ({ children }) => {
  return (
    <div className="p-6">
      {children}
    </div>
  );
};

export default PageContent; 