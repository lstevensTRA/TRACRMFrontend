import { PublicClientApplication, AccountInfo } from '@azure/msal-browser';
import { msalConfig } from '../config/msal';

const msalInstance = new PublicClientApplication(msalConfig);

export const authService = {
  getActiveAccount: (): AccountInfo | null => {
    const accounts = msalInstance.getAllAccounts();
    return accounts.length > 0 ? accounts[0] : null;
  },

  login: async () => {
    try {
      await msalInstance.loginPopup();
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  },

  logout: () => {
    msalInstance.logout();
  },

  getToken: async (scopes: string[]) => {
    const account = authService.getActiveAccount();
    if (!account) {
      throw new Error('No active account');
    }

    try {
      const response = await msalInstance.acquireTokenSilent({
        scopes,
        account,
      });
      return response.accessToken;
    } catch (error) {
      console.error('Token acquisition failed:', error);
      throw error;
    }
  },
}; 