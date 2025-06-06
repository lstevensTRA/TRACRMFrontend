import { useEffect, useState } from 'react';
import { msalInstance } from '../../config/msal';

export const ConfigTest = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [account, setAccount] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const accounts = msalInstance.getAllAccounts();
      if (accounts.length > 0) {
        setAccount(accounts[0]);
        setIsAuthenticated(true);
      }
    };

    checkAuth();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Auth Config Test</h2>
      <div className="space-y-2">
        <p>Authentication Status: {isAuthenticated ? 'Authenticated' : 'Not Authenticated'}</p>
        {account && (
          <div>
            <p>Account: {account.username}</p>
            <p>Name: {account.name}</p>
          </div>
        )}
      </div>
    </div>
  );
}; 