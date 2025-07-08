
// ✅ File: src/hooks/useTokenExpiryDialog.js
import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

/**
 * Custom hook that tracks token expiration and prompts user with a dialog.
 */
export const useTokenExpiryDialog = () => {
  const { logout, getAccessTokenSilently, isAuthenticated } = useAuth0();
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) return;

    let warningTimer;
    let refreshTimer;

    const setupTokenTimers = async () => {
      try {
        const tokenResponse = await getAccessTokenSilently({ detailedResponse: true });
        const expiresInMs = tokenResponse.expires_in * 1000;
        const currentTime = Date.now();
        const tokenExpiryTime = currentTime + expiresInMs;

        const warningBeforeExpiry = 60 * 1000; // Show dialog 1 min before expiry
        const refreshBeforeExpiry = 30 * 1000; // Refresh token 30 sec before expiry

        const timeUntilWarning = tokenExpiryTime - warningBeforeExpiry - currentTime;
        const timeUntilRefresh = tokenExpiryTime - refreshBeforeExpiry - currentTime;

        warningTimer = setTimeout(() => setShowDialog(true), timeUntilWarning);

        refreshTimer = setTimeout(async () => {
          try {
            await getAccessTokenSilently({ ignoreCache: true });
            setShowDialog(false);
          } catch {
            logout({ returnTo: window.location.origin });
          }
        }, timeUntilRefresh);
      } catch (err) {
        console.error('Failed to schedule token timers:', err);
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


// ✅ File: src/components/SessionExpiryDialog.js
import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { useTokenExpiryDialog } from '../hooks/useTokenExpiryDialog';

/**
 * SessionExpiryDialog - A Material UI dialog that warns the user before session expires.
 */
const SessionExpiryDialog = () => {
  const { showDialog, stayLoggedIn, logoutUser } = useTokenExpiryDialog();

  return (
    <Dialog open={showDialog} onClose={() => {}} disableEscapeKeyDown>
      <DialogTitle>⚠️ Session Expiring Soon</DialogTitle>
      <DialogContent>
        Your session will expire in less than a minute.
      </DialogContent>
      <DialogActions>
        <Button onClick={logoutUser} color="error">
          Logout
        </Button>
        <Button onClick={stayLoggedIn} autoFocus color="primary">
          Stay Logged In
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SessionExpiryDialog;


// ✅ Usage Example: App.js or Layout.js
// import SessionExpiryDialog from './components/SessionExpiryDialog';
// ...
// <SessionExpiryDialog />
// ...
