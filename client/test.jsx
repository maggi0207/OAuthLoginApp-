import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

export const useTokenExpiryDialog = () => {
  const { logout, getIdTokenClaims, getAccessTokenSilently, isAuthenticated } = useAuth0();
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) return;

    let warningTimer;
    let refreshTimer;

    const setupTokenTimers = async () => {
      try {
        const claims = await getIdTokenClaims();
        const exp = claims?.exp;

        if (!exp) return;

        const expireTimeMs = exp * 1000;
        const now = Date.now();

        const warningBeforeExpiry = 60 * 1000; // 1 min
        const refreshBeforeExpiry = 30 * 1000; // 30 sec

        const timeUntilWarning = expireTimeMs - warningBeforeExpiry - now;
        const timeUntilRefresh = expireTimeMs - refreshBeforeExpiry - now;

        if (timeUntilWarning > 0) {
          warningTimer = setTimeout(() => setShowDialog(true), timeUntilWarning);
        }

        if (timeUntilRefresh > 0) {
          refreshTimer = setTimeout(async () => {
            try {
              await getAccessTokenSilently({ ignoreCache: true });
              setShowDialog(false);
            } catch {
              logout({ returnTo: window.location.origin });
            }
          }, timeUntilRefresh);
        }
      } catch (err) {
        console.error('Error fetching ID token claims:', err);
      }
    };

    setupTokenTimers();

    return () => {
      clearTimeout(warningTimer);
      clearTimeout(refreshTimer);
    };
  }, [isAuthenticated, getIdTokenClaims, getAccessTokenSilently, logout]);

  const stayLoggedIn = async () => {
    try {
      await getAccessTokenSilently({ ignoreCache: true });
      setShowDialog(false);
    } catch {
      logout({ returnTo: window.location.origin });
    }
  };

  const logoutUser = () => logout({ returnTo: window.location.origin });

  return { showDialog, stayLoggedIn, logoutUser };
};
