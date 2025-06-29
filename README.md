# 🔐 OAuthLoginApp

OAuthLoginApp is a full-stack demo application showcasing how to implement **Google OAuth login** using **React (frontend)** and **Node.js with Express (backend)** via **Passport.js**.

---

## 🚀 Features

- Google OAuth 2.0 login
- Session-based authentication
- Displays user profile info
- Logout functionality
- CORS-enabled frontend/backend separation

---

## 📸 Demo Flow

1. User opens `http://localhost:3000`
2. Clicks “Login with Google”
3. Redirected to Google for authentication
4. Returns with Google profile data
5. App displays name, profile photo
6. Logout clears session

---

## 🖥 Tech Stack

- **Frontend**: React, Axios
- **Backend**: Node.js, Express
- **Authentication**: Passport.js with Google OAuth strategy
- **Session Handling**: express-session
- **Environment**: CORS setup for dev

---

## 📷 Screenshots

| Login Page | After Login |
|------------|-------------|
| *(Add screenshots here)* | *(User info display)* |

---

## 🔧 Quick Start

### 🔑 Prerequisites

- Node.js installed
- Google Cloud project with OAuth 2.0 Client ID
- Gmail added as a test user in consent screen

### 📦 Installation

```bash
# Clone project
git clone https://github.com/yourusername/OAuthLoginApp.git
cd OAuthLoginApp

# Backend
cd server
npm install
node index.js

# Frontend
cd ../client
npm install
npm start
