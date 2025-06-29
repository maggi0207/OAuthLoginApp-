import React, { useEffect, useState } from 'react';
import axios from 'axios';

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    padding: '2rem',
    maxWidth: 500,
    margin: '3rem auto',
    textAlign: 'center',
    border: '1px solid #ddd',
    borderRadius: 12,
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
  },
  heading: {
    fontSize: '2rem',
    color: '#333',
    marginBottom: '1rem',
  },
  profileImg: {
    borderRadius: '50%',
    width: 80,
    height: 80,
    marginTop: '1rem',
  },
  button: {
    backgroundColor: '#4285F4',
    color: 'white',
    padding: '0.8rem 1.5rem',
    fontSize: '1rem',
    border: 'none',
    borderRadius: 6,
    cursor: 'pointer',
    marginTop: '1rem',
  },
  logoutLink: {
    display: 'inline-block',
    marginTop: '1rem',
    color: '#d9534f',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
};

const Login = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/user', { withCredentials: true });
      setUser(res.data);
    } catch (err) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (loading) {
    return (
      <div style={styles.container}>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>OAuthLoginApp</h1>
      {user ? (
        <>
          <img src={user.photos?.[0]?.value} alt="Profile" style={styles.profileImg} />
          <h2>Welcome, {user.displayName}</h2>
          <p>{user.emails?.[0]?.value}</p>
          <a href="http://localhost:5000/auth/logout" style={styles.logoutLink}>
            Logout
          </a>
        </>
      ) : (
        <a href="http://localhost:5000/auth/google">
          <button style={styles.button}>Login with Google</button>
        </a>
      )}
    </div>
  );
};

export default Login;
