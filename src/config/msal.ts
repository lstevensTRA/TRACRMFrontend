import { Configuration, LogLevel, PublicClientApplication } from '@azure/msal-browser';

// Define the environment variables type
interface ImportMetaEnv {
  VITE_AZURE_CLIENT_ID: string;
  VITE_AZURE_AUTHORITY: string;
  VITE_REDIRECT_URI?: string;
  VITE_POST_LOGOUT_REDIRECT_URI?: string;
  VITE_API_URL?: string;
}

// Declare the env property on ImportMeta
declare global {
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
}

const isDevelopment = import.meta.env.DEV;

// MSAL configuration
export const msalConfig: Configuration = {
  auth: {
    clientId: import.meta.env.VITE_AZURE_CLIENT_ID,
    authority: import.meta.env.VITE_AZURE_AUTHORITY,
    redirectUri: isDevelopment 
      ? window.location.origin 
      : import.meta.env.VITE_REDIRECT_URI || window.location.origin,
    postLogoutRedirectUri: isDevelopment 
      ? window.location.origin 
      : import.meta.env.VITE_POST_LOGOUT_REDIRECT_URI || window.location.origin,
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
      logLevel: isDevelopment ? LogLevel.Verbose : LogLevel.Error,
      piiLoggingEnabled: false
    }
  }
};

export const msalInstance = new PublicClientApplication(msalConfig);

export const loginRequest = {
  scopes: ['https://taxrelief-dev.crm.dynamics.com/.default']
};

export const dataverseConfig = {
  apiUrl: import.meta.env.VITE_API_URL,
}; 