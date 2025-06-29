import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [user, setUser] = useState(null);

  const fetchUser = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/user', { withCredentials: true });
      setUser(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>OAuthLoginApp</h1>
      {user ? (
        <>
          <h2>Welcome, {user.displayName}</h2>
          <br />
          <a href="http://localhost:5000/auth/logout">Logout</a>
        </>
      ) : (
        <a href="http://localhost:5000/auth/google">
          <button>Login with Google</button>
        </a>
      )}
    </div>
  );
};

export default Login;
