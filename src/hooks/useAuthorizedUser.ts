import { useEffect, useState } from 'react';
import { UserClaims } from '@okta/okta-auth-js';
import { useOktaAuth } from '@okta/okta-react';

import { AuthorizedUser } from '../types/authorizedUser';

export function useAuthorizedUser(): AuthorizedUser {
  const { authState, oktaAuth } = useOktaAuth();
  const [userInfo, setUserInfo] = useState<AuthorizedUser | undefined>();

  useEffect(() => {
    if (authState) {
      if (!authState.isAuthenticated) {
        setUserInfo(undefined);
        oktaAuth.signInWithRedirect({
          originalUri: `${window.location.pathname}${window.location.search}`
        });
      } else {
        oktaAuth.getUser().then((info: UserClaims) => {
          setUserInfo({
            name: info.name,
            email: info.email,
            givenName: info.given_name,
            accessToken: oktaAuth.getAccessToken(),
          });
        });
      }
    }
  }, [authState, authState?.isAuthenticated, authState?.idToken, oktaAuth, history]);

  return userInfo;
}
