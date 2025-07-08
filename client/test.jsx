import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

export const useTokenExpiryDialog = () => {
  const { logout, getAccessTokenSilently, isAuthenticated } = useAuth0();
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) return;

    let warningTimer;
    let refreshTimer;

    const setupTokenTimers = async () => {
      try {
        const { id_token } = await getAccessTokenSilently({ detailedResponse: true });

        // Decode ID token to extract `exp`
        const base64Payload = id_token.split('.')[1];
        const decodedPayload = JSON.parse(atob(base64Payload));
        const exp = decodedPayload.exp * 1000; // Convert to ms
        const now = Date.now();

        const warningBeforeExpiry = 60 * 1000;  // Show dialog 1 min before expiry
        const refreshBeforeExpiry = 30 * 1000;  // Attempt refresh 30 sec before expiry

        const timeUntilWarning = exp - warningBeforeExpiry - now;
        const timeUntilRefresh = exp - refreshBeforeExpiry - now;

        if (timeUntilWarning > 0) {
          warningTimer = setTimeout(() => setShowDialog(true), timeUntilWarning);
        }

        if (timeUntilRefresh > 0) {
          refreshTimer = setTimeout(async () => {
            try {
              await getAccessTokenSilently({ ignoreCache: true });
              setShowDialog(false); // Token renewed
            } catch {
              logout({ returnTo: window.location.origin });
            }
          }, timeUntilRefresh);
        }
      } catch (err) {
        console.error('Failed to decode ID token or schedule timers:', err);
      }
    };

    setupTokenTimers();

    return () => {
      clearTimeout(warningTimer);
      clearTimeout(refreshTimer);
    };
  }, [isAuthenticated, getAccessTokenSilently, logout]);

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
