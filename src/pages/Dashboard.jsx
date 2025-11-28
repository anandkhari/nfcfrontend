import React, { useState, useEffect } from 'react';
import { User, Zap, CheckSquare } from 'lucide-react';
import { Loader2 } from 'lucide-react';
import { API_BASE_URL } from '../../config';
import Header from '../components/layout/Header';
import ScanChart from '../components/layout/ScanChart';

// --- RESPONSIVE FIX 1 ---
// The font size is now responsive.
const StatCard = ({ title, value, icon: Icon }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm">
    <div className="flex items-center justify-between">
      <span className="text-sm font-medium text-brand-gray">{title}</span>
      <Icon className="h-5 w-5 text-brand-gray" />
    </div>
    <div className="mt-2">
      <span className="text-2xl sm:text-3xl font-bold text-brand-dark">{value}</span>
    </div>
  </div>
);

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalProfiles: 0,
    totalScans: 0,
    totalSaves: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- Data Fetching (No changes needed) ---
  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${API_BASE_URL}/api/admin/dashboard-stats`, {
          method: 'GET',
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Failed to fetch dashboard stats.');
        }

        const data = await response.json();
        setStats({
          totalProfiles: data.totalProfiles || 0,
          totalScans: data.totalScans || 0,
          totalSaves: data.totalSaves || 0,
        });
      } catch (err) {
        setError(err.message || 'Unknown error');
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  // --- Render Logic (Handles Loading/Error/Success) ---
  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex h-64 items-center justify-center">
          <Loader2 className="h-12 w-12 animate-spin text-brand-orange" />
        </div>
      );
    }

    if (error) {
      return (
        <div className="rounded-lg bg-red-100 p-10 text-center text-red-700">
          <h3 className="font-bold">Error</h3>
          <p>{error}</p>
        </div>
      );
    }

    return (
      <>
        {/* --- Row 1: Key Performance Indicators --- */}
        {/* This grid is already perfectly responsive */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          <StatCard
            title="Total Profiles"
            value={stats.totalProfiles.toLocaleString()}
            icon={User}
          />
          <StatCard
            title="Total Scans"
            value={stats.totalScans.toLocaleString()}
            icon={Zap}
          />
          <StatCard
            title="Leads (Contact Saves)"
            value={stats.totalSaves.toLocaleString()}
            icon={CheckSquare}
          />
        </div>

        {/* --- Row 2: Chart and Recent Activity --- */}
        {/* This grid is also already perfectly responsive */}
        <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-3">
          
          {/* Chart Area */}
          {/* --- RESPONSIVE FIX 2 --- */}
          {/* Added responsive padding for better mobile view */}
          <div className="rounded-2xl bg-white p-4 sm:p-6 shadow-sm lg:col-span-2">
            <h3 className="mb-4 text-lg font-semibold text-brand-dark">
              Scans Over Time (Last 30 Days)
            </h3>
            
            <ScanChart />
          </div>
          
          {/* Recent Activity Area */}
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-semibold text-brand-dark">
              Recent Activity
            </h3>
            <div className="space-y-4">
              {/* This can be populated by data later */}
              <div className="text-sm">
                <p className="font-medium text-brand-dark">John D. edited profile</p>
                <p className="text-xs text-brand-gray">10 minutes ago</p>
              </div>
              <div className="text-sm">
                <p className="font-medium text-brand-dark">New scan on Card #007</p>
                <p className="text-xs text-brand-gray">12 minutes ago</p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    // --- RESPONSIVE FIX 3 ---
    // Removed 'p-8'. Your DashboardLayout's <main> tag already provides
    // responsive padding. Adding p-8 here creates *too much* padding on mobile.
    <div className="w-full"> 
      <Header title="Welcome back, Trueline " />
      <div className="mt-6">
        {renderContent()}
      </div>
    </div>
  );
};

export default Dashboard;