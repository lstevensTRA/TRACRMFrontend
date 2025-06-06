import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { MsalProvider, AuthenticatedTemplate, UnauthenticatedTemplate } from '@azure/msal-react';
import { PublicClientApplication } from '@azure/msal-browser';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { msalConfig } from './config/msal';
import { Login } from './components/auth/Login';
import { ThemeProvider } from './context/ThemeContext';
import { TRACasesListPage } from './pages/TRACasesListPage';

const msalInstance = new PublicClientApplication(msalConfig);
const queryClient = new QueryClient();

function App() {
  return (
    <ThemeProvider>
      <MsalProvider instance={msalInstance}>
        <QueryClientProvider client={queryClient}>
          <Router>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 dark:text-gray-100">
              <AuthenticatedTemplate>
                <Routes>
                  <Route path="/tra-cases/list" element={<TRACasesListPage />} />
                  <Route path="/tra-cases/debug" element={<TRACasesListPage />} />
                  <Route path="/" element={<Navigate to="/tra-cases/list" replace />} />
                </Routes>
              </AuthenticatedTemplate>
              <UnauthenticatedTemplate>
                <Login />
              </UnauthenticatedTemplate>
            </div>
          </Router>
        </QueryClientProvider>
      </MsalProvider>
    </ThemeProvider>
  );
}

export default App; 