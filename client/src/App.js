import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './Login';
import CompanyAnnouncements from './pages/CompanyAnnouncements';
import EmployeeBenefitsDashboard from './pages/EmployeeBenefitsDashboard';
import UnauthorizedAccess from './pages/UnauthorizedAccess';
import AuthRouteGuard from './components/AuthRouteGuard';

const App = () => (
  <>
    <Navbar />
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/company-announcements" element={<CompanyAnnouncements />} />
      <Route
        path="/employee-benefits"
        element={
          <AuthRouteGuard>
            <EmployeeBenefitsDashboard />
          </AuthRouteGuard>
        }
      />
      <Route path="/unauthorized-access" element={<UnauthorizedAccess />} />
    </Routes>
  </>
);

export default App;
