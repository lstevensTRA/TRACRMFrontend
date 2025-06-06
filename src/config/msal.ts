import { PublicClientApplication, LogLevel } from '@azure/msal-browser';

declare global {
  interface ImportMeta {
    env: {
      VITE_AZURE_CLIENT_ID: string;
      VITE_AZURE_AUTHORITY: string;
    }
  }
}

const clientId = import.meta.env.VITE_AZURE_CLIENT_ID;
const authority = import.meta.env.VITE_AZURE_AUTHORITY;

export const msalConfig = {
  auth: {
    clientId,
    authority,
    redirectUri: window.location.origin,
  },
  cache: {
    cacheLocation: 'sessionStorage',
    storeAuthStateInCookie: false,
  },
  system: {
    loggerOptions: {
      loggerCallback: (message: string) => {
        console.log(message);
      },
      logLevel: LogLevel.Info,
      piiLoggingEnabled: false,
    },
  },
};

export const msalInstance = new PublicClientApplication(msalConfig);

export const loginRequest = {
  scopes: ['User.Read', 'https://taxrelief-dev.crm.dynamics.com/user_impersonation'],
};

export const dataverseConfig = {
  baseUrl: 'https://taxrelief-dev.crm.dynamics.com/api/data/v9.2',
  version: '9.2',
  environmentId: 'ff079966-c6d8-e92e-8786-cf4f838bdf04'
}; 