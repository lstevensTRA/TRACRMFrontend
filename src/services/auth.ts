import { PublicClientApplication, AccountInfo, AuthenticationResult, InteractionRequiredAuthError } from '@azure/msal-browser';
import { loginRequest } from '../config/msal';

// Microsoft Authentication Library (MSAL) configuration
const msalConfig = {
  auth: {
    clientId: import.meta.env.VITE_AZURE_CLIENT_ID || '',
    authority: `https://login.microsoftonline.com/${import.meta.env.VITE_AZURE_TENANT_ID}`,
    redirectUri: window.location.origin,
  },
  cache: {
    cacheLocation: 'sessionStorage',
    storeAuthStateInCookie: false,
  },
};

// Initialize MSAL instance
const msalInstance = new PublicClientApplication(msalConfig);

// Scopes for Dataverse API
const scopes = ['https://tra-dev.crm.dynamics.com/user_impersonation'];

class AuthService {
  private initialized: boolean = false;

  constructor() {
    this.initialize();
  }

  async initialize() {
    if (!this.initialized) {
      await msalInstance.initialize();
      this.initialized = true;
    }
  }

  async login(): Promise<AccountInfo | null> {
    await this.initialize();
    const result = await msalInstance.loginPopup(loginRequest);
    if (result.account) {
      msalInstance.setActiveAccount(result.account);
      return result.account;
    }
    return null;
  }

  async logout(): Promise<void> {
    await this.initialize();
    await msalInstance.logoutPopup();
  }

  async getToken(scopes: string[]): Promise<string> {
    await this.initialize();
    let account = msalInstance.getActiveAccount();
    if (!account) {
      const accounts = msalInstance.getAllAccounts();
      if (accounts.length > 0) {
        account = accounts[0];
        msalInstance.setActiveAccount(account);
      } else {
        throw new Error('No active account found');
      }
    }
    try {
      const response = await msalInstance.acquireTokenSilent({
        scopes,
        account
      });
      return response.accessToken;
    } catch (error: any) {
      if (error instanceof InteractionRequiredAuthError) {
        const response = await msalInstance.acquireTokenPopup({
          scopes,
          account
        });
        return response.accessToken;
      }
      throw error;
    }
  }

  getActiveAccount(): AccountInfo | null {
    if (!this.initialized) return null;
    let account = msalInstance.getActiveAccount();
    if (!account) {
      const accounts = msalInstance.getAllAccounts();
      if (accounts.length > 0) {
        account = accounts[0];
        msalInstance.setActiveAccount(account);
      }
    }
    return account;
  }

  isAuthenticated(): boolean {
    return this.getActiveAccount() !== null;
  }
}

export const authService = new AuthService();

// Get access token for Dataverse API
export const getToken = async (): Promise<string> => {
  return authService.getToken(scopes);
};

// Login function
export const login = async (): Promise<void> => {
  await authService.login();
};

// Logout function
export const logout = async (): Promise<void> => {
  await authService.logout();
};

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  return authService.isAuthenticated();
}; 