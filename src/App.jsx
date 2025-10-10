import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import CreateProfile from './pages/CreateProfile';
import ProfileLinkPage from './pages/ProfileLinkPage';
import PublicProfile from './pages/PublicProfile';
import EditProfile from './pages/EditProfile'; 
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

const App = () => {
  return ( 
    <>
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
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
          
          <Route 
            path="/profile-link/:profileId" 
            element={
              <ProtectedRoute>
                <ProfileLinkPage />
              </ProtectedRoute>
            } 
          />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
