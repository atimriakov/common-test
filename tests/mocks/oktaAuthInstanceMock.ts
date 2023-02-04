import OktaAuth from '@okta/okta-auth-js';

export const oktaAuthInstanceMock = {
  getAccessToken() {
    return 'TEST_AUTH_TOKEN';
  },
  signInWithRedirect() {

  }
} as OktaAuth;
