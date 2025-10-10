import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  User,
  Zap,
  Menu,
  Copy,
  Edit,
  Trash2,
  Plus,
  LogOut,
  TrendingUp,
  Loader2,
} from "lucide-react"; 
import { toast } from "react-toastify";  
import "react-toastify/dist/ReactToastify.css"; 

// --- Constants ---
import { API_BASE_URL } from "../../config";

const COLORS = {
  DeepTeal: "#007A8A",
  BrightSkyBlue: "#00AEEF",
  LightCoolGray: "#F7F8FC",
  PureWhite: "#FFFFFF",
  LimeGreen: "#4CAF50",
  WarningRed: "#D9534F",
};

const Dashboard = () => {
  const navigate = useNavigate();

  // --- State Management ---
  const [profiles, setProfiles] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // user typing
  const [activeSearch, setActiveSearch] = useState(""); // applied search (on button)
  const [loading, setLoading] = useState(true); // Start with loading true
  const [error, setError] = useState(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // --- Data Fetching (run once on mount) ---
  useEffect(() => {
    let mounted = true;

    const fetchProfiles = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`${API_BASE_URL}/api/profile`, {
          method: "GET",
          credentials: "include", // ✅ sends HTTP-only cookie if present
        });

        if (response.status === 401) {
          // unauthorized - redirect to login
          navigate("/login");
          return;
        }

        if (!response.ok) {
          throw new Error("Failed to fetch profiles. Please try again.");
        }

        const data = await response.json();
        if (!mounted) return;
        setProfiles(data.profiles || []);
      } catch (err) {
        if (!mounted) return;
        setError(err.message || "Unknown error");
        console.error(err);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchProfiles();

    return () => {
      mounted = false;
    };
    // intentionally empty deps: run once on mount
  }, [navigate]);

  // --- Derived State (Metrics) ---
  const totalProfiles = profiles.length;
  const activeProfiles = profiles.filter((p) => p.status === "active").length;
  const draftProfiles = profiles.filter((p) => p.status === "draft").length;
  const nfcScans = 5412; // static placeholder

  // --- Handlers ---
  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  const handleApplySearch = () => {
    setActiveSearch(searchTerm.trim());
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    setActiveSearch("");
  };

  const handleCreateProfile = () => {
    navigate("/create-profile");
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await fetch(`${API_BASE_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch (err) {
      console.error(
        "Logout API call failed, but proceeding with client-side logout:",
        err
      );
    } finally {
      // If you stored something in localStorage previously, clear it
      localStorage.removeItem("token");
      
      toast.success("✅ Logout Successful! Redirecting...", {
        position: "top-right",
        autoClose: 2000, // optional, toast will auto-close in 2s
      });
      navigate("/login");
      setIsLoggingOut(false);
    }
  };

  const handleProfileAction = useCallback(
    async (action, profileId) => {
      if (action === "Edit") {
        navigate(`/edit-profile/${profileId}`);
        return;
      }

      if (action === "Delete") {
        const confirmDelete = window.confirm(
          "Are you sure you want to delete this profile?"
        );
        if (!confirmDelete) return;

        try {
          const response = await fetch(`${API_BASE_URL}/profile/${profileId}`, {
            method: "DELETE",
            credentials: "include",
          });

          if (!response.ok) {
            throw new Error("Failed to delete profile");
          }

          const result = await response.json();
          console.log("Profile deleted:", result);

          // Remove deleted profile from state
          setProfiles((prev) => prev.filter((p) => p._id !== profileId));
        } catch (error) {
          console.error("Error deleting profile:", error);
          alert("Failed to delete profile. See console for details.");
        }
      }

      if (action === "Copy") {
        const link = `${window.location.origin}/profile/${profileId}`;
        try {
          await navigator.clipboard.writeText(link);
          alert("Link copied to clipboard!");
        } catch (err) {
          console.error("Failed to copy link:", err);
        }
      }
    },
    [navigate]
  );

  // --- Filtering Logic: only recompute when activeSearch or profiles change ---
  const filteredProfiles = useMemo(() => {
    const term = (activeSearch || "").toLowerCase().trim();
    if (!term) return profiles;

    // for multi-word search, require every word to exist in any field
    const words = term.split(/\s+/).filter(Boolean);
    return profiles.filter((profile) => {
      // create searchable string fields (fallback to empty)
      const name = (profile.name || "").toLowerCase();
      const title = (profile.title || "").toLowerCase();
      const link = (profile._id ? `${window.location.origin}/profile/${profile._id}` : "").toLowerCase();
      // optional: include company, emails, phones
      const company = (profile.company || "").toLowerCase();
      const emails = (profile.emails || []).map(e => (e.address || "").toLowerCase()).join(" ");
      const phones = (profile.phones || []).map(p => (p.number || "").toLowerCase()).join(" ");

      // check that every word appears in at least one field
      return words.every((w) =>
        name.includes(w) ||
        title.includes(w) ||
        link.includes(w) ||
        company.includes(w) ||
        emails.includes(w) ||
        phones.includes(w)
      );
    });
  }, [activeSearch, profiles]);

  // --- Memoized ProfileRow to avoid re-render on unrelated state changes ---
  const ProfileRow = React.memo(({ profile }) => {
    const status = profile.status || "draft";
    const statusColor = status === "active" ? COLORS.LimeGreen : "#A0AEC0";

    return (
      <div className="grid grid-cols-4 sm:grid-cols-[2fr,1fr,2fr,1fr] items-center gap-4 py-4 px-4 sm:px-6 bg-white border-b hover:bg-gray-50 transition-colors duration-150 rounded-xl mb-2 shadow-sm">
        <div className="col-span-4 sm:col-span-1">
          <p className="font-semibold text-gray-800">{profile.name}</p>
          <p className="text-xs text-gray-500 truncate">
            {profile.title || "No title"}
          </p>
        </div>

        <div className="col-span-1 sm:col-span-1">
          <span
            className="inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full"
            style={{ backgroundColor: statusColor, color: COLORS.PureWhite }}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
        </div>

        <div className="col-span-3 sm:col-span-1 flex items-center space-x-2">
          <p className="text-sm text-deep-teal font-mono truncate">
            {profile._id
              ? `${window.location.origin}/profile/${profile._id}`
              : "Not set"}
          </p>

          <button
            onClick={() => handleProfileAction("Copy", profile._id)}
            title="Copy Link"
            className="text-gray-400 hover:text-gray-600"
          >
            <Copy className="h-4 w-4" />
          </button>
        </div>

        <div className="col-span-4 sm:col-span-1 text-right">
          <div className="flex space-x-2 justify-end">
            <button
              onClick={() => handleProfileAction("Edit", profile._id)}
              className="p-2 text-sm font-medium rounded-lg hover:bg-gray-100"
              style={{ color: COLORS.DeepTeal }}
            >
              <Edit className="h-5 w-5 inline mr-1" />
              Edit
            </button>

            <button
              onClick={() => handleProfileAction("Delete", profile._id)}
              className="p-2 text-sm font-medium rounded-lg hover:bg-red-100"
              style={{ color: COLORS.WarningRed }}
            >
              <Trash2 className="h-5 w-5 inline mr-1" />
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  });

  // --- UI Subcomponents ---
  const Header = () => (
    <header className="bg-white shadow-md p-4 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <span className="text-2xl font-bold" style={{ color: COLORS.DeepTeal }}>
            Scatch
          </span>
          <p className="hidden md:block text-sm text-gray-500">Admin Dashboard</p>
        </div>

        <div className="relative flex-grow mx-4 max-w-lg hidden sm:flex">
          <input
            type="text"
            placeholder="Search Profiles by name, title..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50"
            style={{ borderColor: COLORS.DeepTeal }}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />

          {/* Search & Clear Buttons */}
          <div className="absolute right-1 top-1/2 -translate-y-1/2 flex space-x-2">
            <button
              onClick={handleApplySearch}
              className="ml-2 px-3 py-1 rounded-md bg-[var(--accent, #007A8A)] text-white text-sm hover:opacity-95"
              style={{ backgroundColor: COLORS.DeepTeal }}
            >
              Search
            </button>
            <button
              onClick={handleClearSearch}
              className="ml-2 px-3 py-1 rounded-md bg-gray-100 text-sm hover:bg-gray-200"
            >
              Clear
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={handleCreateProfile}
            className="flex items-center px-4 py-2 text-sm md:text-base font-semibold text-white rounded-lg shadow-lg transition duration-200 hover:bg-[#00606B]"
            style={{ backgroundColor: COLORS.DeepTeal }}
          >
            <Plus className="h-5 w-5 mr-1" />
            <span className="hidden sm:inline">Create New Profile</span>
            <span className="sm:hidden">New</span>
          </button>

          <button
            onClick={handleLogout}
            className="p-2 rounded-full bg-red-100 hover:bg-red-200 hidden md:block"
            disabled={isLoggingOut}
            title="Logout"
          >
            <LogOut className="h-5 w-5 text-red-600" />
          </button>
        </div>
      </div>
    </header>
  );

  const MetricCard = ({ title, value, icon: Icon, colorClass, trend }) => (
    <div className="bg-white p-6 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <p className="text-sm font-medium text-gray-500 mb-2">{title}</p>
      <div className="flex items-center justify-between">
        <span className="text-3xl font-extrabold text-gray-900">{value}</span>
        <div className="flex items-center space-x-2">
          {trend && <TrendingUp className="h-6 w-6 text-green-500" />}
          <Icon className={`h-6 w-6 ${colorClass}`} />
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="h-12 w-12 text-deep-teal animate-spin" />
          <p className="ml-4 text-lg text-gray-600">Loading Profiles...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="text-center py-10 text-red-600 bg-red-50 rounded-lg">
          Error: {error}
        </div>
      );
    }

    return (
      <div className="mt-4 space-y-3">
        {filteredProfiles.length > 0 ? (
          filteredProfiles.map((profile) => (
            <ProfileRow key={profile._id} profile={profile} />
          ))
        ) : (
          <div className="text-center py-10 text-gray-500">
            {activeSearch
              ? `No profiles found matching "${activeSearch}".`
              : "No profiles created yet. Click 'Create New Profile' to start!"}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: COLORS.LightCoolGray }}>
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Welcome, Admin!</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <MetricCard title="Total Profiles" value={totalProfiles} icon={User} colorClass="text-deep-teal" />
          <MetricCard title="NFC Scans (30 Days)" value={nfcScans.toLocaleString()} icon={Zap} colorClass="text-gray-600" trend />
          <MetricCard title="Active/Draft Profiles" value={`${activeProfiles} / ${draftProfiles}`} icon={Menu} colorClass="text-gray-600" />
        </div>

        <div className="bg-white rounded-xl shadow-2xl p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">All NFC Profiles</h2>

          <div className="hidden sm:grid grid-cols-[2fr,1fr,2fr,1fr] gap-4 py-3 px-6 text-sm font-medium text-gray-500 uppercase border-b border-gray-200">
            <div>Profile Name</div>
            <div>Status</div>
            <div>NFC Link</div>
            <div className="text-right">Actions</div>
          </div>

          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
