import { Configuration, LogLevel } from '@azure/msal-browser';

export const msalConfig: Configuration = {
  auth: {
    clientId: 'b65d8e0b-8c61-40bb-8bc0-33ed4023f2dc',
    authority: 'https://login.microsoftonline.com/185fc38c-2c1b-4307-a164-24a4072e83e1',
    redirectUri: 'http://localhost:3000',
    postLogoutRedirectUri: 'http://localhost:3000'
  },
  cache: {
    cacheLocation: 'sessionStorage',
    storeAuthStateInCookie: false
  },
  system: {
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) return;
        console.log(message);
      },
      logLevel: LogLevel.Info
    }
  }
};

export const loginRequest = {
  scopes: [
    'https://taxrelief-dev.crm.dynamics.com/user_impersonation',
    'User.Read'
  ]
};

export const dataverseConfig = {
  baseUrl: 'https://taxrelief-dev.crm.dynamics.com/api/data/v9.2',
  version: '9.2',
  environmentId: 'ff079966-c6d8-e92e-8786-cf4f838bdf04'
}; 