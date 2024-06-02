import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom'; // Import HashRouter
import SignUpPage from '../pages/SignUpPage';
import LoginPage from '../pages/LoginPage';
import UserDashboardPage from '../pages/UserDashboardpage';
import AdminDashboardPage from '../pages/AdminDashboardpage';

const RouterAdapter: React.FC = () => {
  return (
    <Router>
      <div>
        {/* Define your routes */}
        <Routes>
          <Route path="/" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/user-dashboard" element={<UserDashboardPage />} />
          <Route path="/admin-dashboard" element={<AdminDashboardPage />} />
          {/* <Route path="/admin-dashboard" element={<AdminDashboardPage />} /> */}
          {/* <Route path="/active-call" element={<ActiveCallPage />} /> */}
        </Routes>
      </div>
    </Router>
  );
};

export default RouterAdapter;