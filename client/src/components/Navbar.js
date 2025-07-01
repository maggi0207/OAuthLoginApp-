import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const { isAuthenticated, user, loginWithRedirect, logout, isLoading } = useAuth0();

  return (
    <nav style={styles.nav}>
      <div>
        <Link to="/" style={styles.link}>🏠 Home</Link>
        <Link to="/company-announcements" style={styles.link}>📣 Announcements</Link>
        {isAuthenticated && (
          <Link to="/employee-benefits" style={styles.link}>💼 Benefits</Link>
        )}
      </div>

      <div style={styles.authBlock}>
        {!isLoading && isAuthenticated && (
          <span style={styles.user}>👋 {user?.name || user?.email}</span>
        )}
        {!isAuthenticated ? (
          <button style={styles.button} onClick={() => loginWithRedirect()}>
            🔐 Login
          </button>
        ) : (
          <button
            style={styles.button}
            onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
          >
            🚪 Logout
          </button>
        )}
      </div>
    </nav>
  );
};
