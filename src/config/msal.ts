import { Configuration, LogLevel, PublicClientApplication } from '@azure/msal-browser';

// Define the environment variables type
interface ImportMetaEnv {
  VITE_AZURE_CLIENT_ID: string;
  VITE_AZURE_AUTHORITY: string;
}

// Declare the env property on ImportMeta
declare global {
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
}

// MSAL configuration
export const msalConfig: Configuration = {
  auth: {
    clientId: import.meta.env.VITE_AZURE_CLIENT_ID,
    authority: import.meta.env.VITE_AZURE_AUTHORITY,
    redirectUri: window.location.origin,
  },
  cache: {
    cacheLocation: 'sessionStorage',
    storeAuthStateInCookie: false,
  },
  system: {
    loggerOptions: {
      loggerCallback: (level: LogLevel, message: string, containsPii: boolean) => {
        if (containsPii) {
          return;
        }
        switch (level) {
          case LogLevel.Error:
            console.error(message);
            return;
          case LogLevel.Info:
            console.info(message);
            return;
          case LogLevel.Verbose:
            console.debug(message);
            return;
          case LogLevel.Warning:
            console.warn(message);
            return;
          default:
            return;
        }
      },
      logLevel: LogLevel.Verbose,
      piiLoggingEnabled: false
    }
  }
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