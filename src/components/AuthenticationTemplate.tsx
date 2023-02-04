import { useEffect, PropsWithChildren } from 'react';
import { useHistory } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';

interface Props {};

export default function AuthenticationTemplate({ children }: PropsWithChildren<Props>) {
  const { authState, oktaAuth } = useOktaAuth();
  const history = useHistory();
  useEffect(() => {
    if (authState) {
      if (!authState.isAuthenticated) {
        oktaAuth.signInWithRedirect({
          originalUri: `${history.location.pathname}${history.location.search}`
        });
      }
    }
  }, [authState, authState?.isAuthenticated, authState?.idToken, oktaAuth, history]);

  return (
    <>
      {authState?.isAuthenticated && children}
    </>
  );
};
