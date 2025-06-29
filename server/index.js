// server/index.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { expressjwt: jwt } = require('express-jwt');
const jwksRsa = require('jwks-rsa');

const app = express();

// Enable CORS for frontend app
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

// Middleware to validate JWTs
const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
  }),
  audience: process.env.AUTH0_AUDIENCE,
  issuer: `https://${process.env.AUTH0_DOMAIN}/`,
  algorithms: ['RS256']
});

// Public route (no auth)
app.get('/api/public', (req, res) => {
  res.json({ message: 'Hello from a public API! No token needed.' });
});

// Protected route (requires valid Auth0 token)
app.get('/api/protected', checkJwt, (req, res) => {
  res.json({
    message: '🎉 Hello from a protected API!',
    user: req.auth
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
