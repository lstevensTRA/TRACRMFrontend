import { useState, useEffect } from 'react';
import { authService } from '../../services/auth';
import { DataverseService } from '../../services/dataverse';
import { dataverseConfig } from '../../config/msal';

interface TestResult {
  name: string;
  status: 'success' | 'error' | 'loading';
  message?: string;
}

export const ConfigTest = () => {
  const [results, setResults] = useState<TestResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    runTests();
  }, []);

  const runTests = async () => {
    const newResults: TestResult[] = [];
    
    // Test 1: Check MSAL Configuration
    try {
      const account = authService.getActiveAccount();
      newResults.push({
        name: 'MSAL Configuration',
        status: 'success',
        message: account ? `Logged in as: ${account.username}` : 'Not logged in'
      });
    } catch (error) {
      newResults.push({
        name: 'MSAL Configuration',
        status: 'error',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }

    // Test 2: Get Microsoft Graph User Info
    try {
      const token = await authService.getToken(['User.Read']);
      const response = await fetch('https://graph.microsoft.com/v1.0/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      newResults.push({
        name: 'Microsoft Graph API',
        status: 'success',
        message: `Connected as: ${data.displayName}`
      });
    } catch (error) {
      newResults.push({
        name: 'Microsoft Graph API',
        status: 'error',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }

    // Test 3: Test Dataverse Connection
    try {
      const token = await authService.getToken(['https://taxrelief-dev.crm.dynamics.com/user_impersonation']);
      const dataverse = new DataverseService(token);
      await dataverse.get('systemusers', undefined, { $top: '1' });
      newResults.push({
        name: 'Dataverse API',
        status: 'success',
        message: 'Successfully connected to Dataverse'
      });
    } catch (error) {
      newResults.push({
        name: 'Dataverse API',
        status: 'error',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }

    setResults(newResults);
    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Configuration Test</h2>
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Configuration Test</h2>
      <div className="space-y-4">
        <div className="bg-gray-100 p-4 rounded">
          <h3 className="font-semibold mb-2">Environment Info</h3>
          <p>Dataverse URL: {dataverseConfig.baseUrl}</p>
          <p>Environment ID: {dataverseConfig.environmentId}</p>
        </div>
        
        <div className="space-y-2">
          {results.map((result, index) => (
            <div
              key={index}
              className={`p-4 rounded ${
                result.status === 'success'
                  ? 'bg-green-100'
                  : result.status === 'error'
                  ? 'bg-red-100'
                  : 'bg-gray-100'
              }`}
            >
              <div className="font-semibold">{result.name}</div>
              <div className="text-sm">{result.message}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}; 