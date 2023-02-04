import OktaAuth from '@okta/okta-auth-js';

export function httpRequestAuthInterceptor(oktaAuth: OktaAuth) {
  return async (config) => {
    const originalConfig = config;
    const accessToken = oktaAuth.getAccessToken();

    const headers: {[key: string]: string | boolean} = {
      'Content-Type': 'application/json',
      'Ocp-Apim-Trace': true,
      'Subscription-Key': 'def8c86cd85144b1839c0418886f9b1e',
    };
    if (accessToken) {
      headers.Authorization = `Bearer ${accessToken}`;
    }

    originalConfig.headers = {
      ...headers,
      ...originalConfig.headers,
    };
    return originalConfig;
  };
}
