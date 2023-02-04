import OktaAuth from '@okta/okta-auth-js';

export function httpResponseUnauthorizedInterceptor(oktaAuth: OktaAuth) {
  return async (error: any) => {
    if(error?.response?.status === 401) {
      oktaAuth.signInWithRedirect({
        originalUri: `${window.location.pathname}${window.location.search}`
      });
      return;
    }
    return Promise.reject(error);
  };
}
