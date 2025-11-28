import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Header from '../components/layout/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { API_BASE_URL } from '../../config'; // Make sure this path is correct

/**
 * A clean, simple card wrapper for a settings section.
 * NOTE: We'll put buttons inside the 'children' for more flexibility.
 */
const SettingsCard = ({ title, description, children }) => (
  <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
    {/* Card Header */}
    <div className="p-6 border-b border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      <p className="mt-1 text-sm text-gray-600">{description}</p>
    </div>
    
    {/* Card Content */}
    <div className="p-6 space-y-6">
      {children}
    </div>
  </div>
);


/**
 * The Main Settings Page
 */
const SettingsPage = () => {

  // --- State for Admin Details ---
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [detailsLoading, setDetailsLoading] = useState(false);

  // --- State for Password ---
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordLoading, setPasswordLoading] = useState(false);

  // --- State for Export ---
  const [exportLoading, setExportLoading] = useState(false);

  // --- 1. Fetch Current Admin Details on Page Load ---
  useEffect(() => {
    const fetchAdminDetails = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/admin/account/details`, {
          credentials: 'include',
        });
        const data = await res.json();
        if (res.ok) {
          setUsername(data.user.username || '');
          setEmail(data.user.email || '');
        } else {
          throw new Error(data.message || 'Failed to fetch account details.');
        }
      } catch (err) {
        toast.error(err.message);
      }
    };
    fetchAdminDetails();
  }, []);

  

  // --- 3. Handler for Changing Password ---
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match.");
      return;
    }
    setPasswordLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/account/password`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ currentPassword, newPassword, confirmPassword }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success('Password changed successfully!');
        // Clear password fields on success
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        throw new Error(data.message || 'Failed to change password');
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setPasswordLoading(false);
    }
  };

  // --- 4. Handler for Exporting Data ---
  const handleExport = async () => {
    setExportLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/export-all-profiles`, {
        credentials: 'include',
      });
      if (!res.ok) {
        throw new Error('Failed to export data. Server responded with ' + res.status);
      }
      
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'trueline-profiles-export.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast.success('Profile data exported successfully!');

    } catch (err) {
      toast.error(err.message);
    } finally {
      setExportLoading(false);
    }
  };


  return (
    <div className="w-full">
     <h1 className="text-3xl mt-4 font-bold text-gray-900">Settings</h1>
      <Tabs defaultValue="account" className="mt-6">
        {/* Tab Triggers */}
        <TabsList className="flex h-auto w-full justify-start gap-6 rounded-none border-b border-gray-200 bg-transparent p-0 md:w-[300px]">
          <TabsTrigger 
            value="account" 
            className="flex-1 rounded-none border-b-2 border-transparent bg-transparent p-0 py-3 font-semibold text-gray-500 shadow-none transition-none data-[state=active]:border-[#FF4F00] data-[state=active]:text-[#FF4F00] data-[state=active]:shadow-none"
          >
            Account
          </TabsTrigger>
          <TabsTrigger 
            value="data"
            className="flex-1 rounded-none border-b-2 border-transparent bg-transparent p-0 py-3 font-semibold text-gray-500 shadow-none transition-none data-[state=active]:border-[#FF4F00] data-[state=active]:text-[#FF4F00] data-[state=active]:shadow-none"
          >
            Data & Export
          </TabsTrigger>
        </TabsList>

        {/* 1. Account Settings Tab */}
        <TabsContent value="account" className="mt-6">
          <SettingsCard
            title="Admin Account"
            description="Manage your login credentials and personal information."
          >
            {/* --- Account Info Form --- */}
            <form  className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="adminUsername">Admin Username</Label>
                  <Input
                    id="adminUsername"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="h-12 rounded-xl border-gray-200 shadow-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="adminEmail">Admin Email</Label>
                  <Input
                    id="adminEmail"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-12 rounded-xl border-gray-200 shadow-sm"
                  />
                </div>
              </div>
           
            </form>

            <hr className="border-gray-200" />
            
            {/* --- Change Password Form --- */}
            <form onSubmit={handlePasswordSubmit} className="space-y-6">
              <h4 className="text-md font-medium text-gray-800">Change Password</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="currentPass">Current Password</Label>
                  <Input 
                    id="currentPass" 
                    type="password" 
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="h-12 rounded-xl border-gray-200 shadow-sm" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPass">New Password</Label>
                  <Input 
                    id="newPass" 
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="h-12 rounded-xl border-gray-200 shadow-sm" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPass">Confirm New Password</Label>
                  <Input 
                    id="confirmPass" 
                    type="password" 
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="h-12 rounded-xl border-gray-200 shadow-sm" 
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <Button 
                  type="submit"
                  disabled={passwordLoading}
                  className="rounded-2xl bg-gray-800 text-white hover:bg-gray-700"
                >
                  {passwordLoading ? "Saving..." : "Change Password"}
                </Button>
              </div>
            </form>
          </SettingsCard>
        </TabsContent>
        
        {/* 2. Data & Export Tab */}
        <TabsContent value="data" className="mt-6 space-y-6">
          {/* Export Card */}
          <SettingsCard
            title="Export All Profiles"
            description="Download a single JSON file of all your profile data for backup."
          >
            <Button
              onClick={handleExport}
              disabled={exportLoading}
              variant="outline"
              className="w-full md:w-auto h-12 rounded-2xl border-2 border-brand-orange text-brand-orange font-semibold hover:bg-brand-orange/10 hover:text-brand-orange"
            >
              {exportLoading ? "Exporting..." : "Download Export File (.json)"}
            </Button>
          </SettingsCard>

          {/* Danger Zone Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-red-500">
            <div className="p-6 border-b border-red-200">
              <h3 className="text-lg font-semibold text-red-700">Danger Zone</h3>
            </div>
            <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h4 className="font-medium text-gray-800">Delete This Account</h4>
                <p className="text-sm text-gray-600">
                  Once you delete your account, all profiles will be lost. 
                  This action is permanent and cannot be undone.
                </p>
              </div>
              <Button
                variant="destructive"
                className="w-full md:w-auto h-12 rounded-2xl font-semibold"
              >
                Delete My Account
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsPage;