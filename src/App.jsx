import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// --- Layout ---
import DashboardLayout from './components/layout/DashboardLayout';

// --- Pages ---
import Login from './pages/Login';
import PublicProfilePage from './pages/PublicProfilePage';
import Dashboard from './pages/Dashboard';
import DisplayProfiles from './pages/DisplayProfiles';
import CreateProfiles from './pages/CreateProfiles';
import EditProfile from './pages/EditProfile';
import ProfileLinkPage from './pages/ProfileLinkPage';
import SettingsPage from './pages/SettingsPage'; // 1. Import the new SettingsPage

// --- Auth Context ---
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './routes/ProtectedRoute';

const App = () => {
  return (
    <>
      {/* Toast Notifications */}
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
        <AuthProvider>
          <Routes>
            {/* --- Public Routes --- */}
            <Route path="/login" element={<Login />} />
            <Route path="/profile/:profileId" element={<PublicProfilePage />} />

            {/* --- Admin Routes Wrapped with DashboardLayout --- */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              {/* Default redirect */}
              <Route index element={<Navigate to="dashboard" replace />} />

              {/* Dashboard Pages */}
              <Route path="dashboard" element={<Dashboard />} />
              
              {/* 2. Add the new Settings route */}
              <Route path="settings" element={<SettingsPage />} /> 

              {/* Profiles Pages */}
              <Route path="profiles" element={<DisplayProfiles />} />
              <Route path="profiles/create" element={<CreateProfiles context="dashboard" />} />
              <Route path="profiles/edit/:profileId" element={<EditProfile context="dashboard" />} />
              <Route path="profiles/view/:profileId" element={<PublicProfilePage context="dashboard" />} />
            </Route>

            {/* --- Profile Link Page (Full-Screen, outside dashboard) --- */}
            <Route
              path="/profile-link/:profileId"
              element={
                <ProtectedRoute>
                  <ProfileLinkPage />
                </ProtectedRoute>
              }
            />

            {/* --- Fallback Routes --- */}
            <Route path="/" element={<Navigate to="/admin/dashboard" />} />
            <Route path="*" element={<Navigate to="/admin/dashboard" />} />
          </Routes>
        </AuthProvider>
      </Router>
    </>
  );
};

export default App;