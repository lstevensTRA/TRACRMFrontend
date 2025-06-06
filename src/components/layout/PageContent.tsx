interface PageContentProps {
  children: React.ReactNode;
}

export const PageContent = ({ children }: PageContentProps) => {
  return (
    <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      {children}
    </main>
  );
}; 