import { PublicClientApplication, AccountInfo } from '@azure/msal-browser';
import { msalConfig, loginRequest } from '../config/msal';

export const msalInstance = new PublicClientApplication(msalConfig);

// Initialize MSAL
msalInstance.initialize().catch(error => {
  console.error('MSAL initialization failed:', error);
});

export const getToken = async (): Promise<string | null> => {
  try {
    const account = msalInstance.getAllAccounts()[0];
    if (!account) {
      console.log('No active account found');
      return null;
    }

    console.log('Getting token for account:', account.username);
    const response = await msalInstance.acquireTokenSilent({
      scopes: ['https://taxrelief-dev.crm.dynamics.com/.default'],
      account: account
    });

    console.log('Token acquired successfully');
    return response.accessToken;
  } catch (error) {
    console.error('Error acquiring token:', error);
    // If silent token acquisition fails, try interactive login
    try {
      const response = await msalInstance.acquireTokenPopup({
        scopes: ['https://taxrelief-dev.crm.dynamics.com/.default']
      });
      return response.accessToken;
    } catch (popupError) {
      console.error('Interactive token acquisition failed:', popupError);
      return null;
    }
  }
};

export const authService = {
  getActiveAccount: (): AccountInfo | null => {
    const accounts = msalInstance.getAllAccounts();
    return accounts.length > 0 ? accounts[0] : null;
  },

  login: async () => {
    try {
      await msalInstance.loginPopup({
        scopes: ['https://taxrelief-dev.crm.dynamics.com/.default']
      });
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  },

  logout: () => {
    msalInstance.logout();
  },
}; 