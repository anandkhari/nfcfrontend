import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard'
import CreateProfile from './pages/CreateProfile';
import ProfileLinkPage from './pages/ProfileLinkPage';
import PublicProfile from './pages/PublicProfile';
import EditProfile from './pages/EditProfile';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/profile/:profileId" element={<PublicProfile />} />
        
        <Route 
          path="/" 
          element={<ProtectedRoute><Dashboard /></ProtectedRoute>} 
        />
        
        <Route 
          path="/create-profile" 
          element={<ProtectedRoute><CreateProfile /></ProtectedRoute>} 

        />

        <Route 
          path="/edit-profile/:profileId" 
          element={<ProtectedRoute><EditProfile /></ProtectedRoute>} 
        />
        
        {/* ✅ CORRECTED ROUTE */}
        <Route 
          path="/profile-link/:profileId" // 1. The dynamic parameter is part of the path
          element={
            <ProtectedRoute>
              <ProfileLinkPage /> {/* 2. The correct component is placed inside */}
            </ProtectedRoute>
          } 
        />

        {/* This catch-all route is good for handling unknown URLs */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;