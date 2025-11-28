import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  User,
  BarChart2,
  PlusCircle,
  Settings,
  LogOut,
  Loader2,
  X,
} from "lucide-react";
import { toast } from "react-toastify";
import { API_BASE_URL } from "../../../config";

const Sidebar = ({ className = "", onClose }) => {
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await fetch(`${API_BASE_URL}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
      toast.success("Logout Successful!");
      navigate("/login");
    } catch (err) {
      console.error("Logout API call failed:", err);
      toast.error("Logout failed, please try again.");
    } finally {
      setIsLoggingOut(false);
    }
  };

  // This class logic is now 100% correct with the v4 @theme method
  const navLinkClass = ({ isActive }) =>
    `flex items-center space-x-3 rounded-3xl px-3 py-2 transition-colors duration-200 ${
      isActive
        ? "bg-brand-orange text-white" // Uses --color-brand-orange
        : "text-gray-300 hover:bg-brand-dark-light hover:text-white" // Uses --color-brand-dark-light
    }`;

  return (
    <aside
      // Added bg-brand-dark here, which maps to --color-brand-dark
      className={`fixed top-0 left-0 h-screen w-64 flex flex-col p-4 bg-brand-dark z-40 
         transform transition-transform duration-300 ease-in-out 
         -translate-x-full lg:translate-x-0 
         overflow-y-auto ${className}`}
    >
      {/* --- Mobile Close Button --- */}
      <div className="flex items-center justify-between mb-4 lg:hidden">
        <img src="/logo.png" alt="Trueline Logo" className="h-auto w-28" />
        <button
          onClick={onClose}
          className="text-gray-300 hover:text-white transition"
        >
          <X size={24} />
        </button>
      </div>

      {/* --- Desktop Logo --- */}
      <div className="hidden lg:flex items-center justify-center border-b border-gray-700 pb-4 mb-4">
        <img src="/logo.png" alt="Trueline Logo" className="h-auto w-32" />
      </div>

      {/* --- Navigation Links --- */}
<nav className="flex-1 space-y-2">
  <NavLink to="/admin/dashboard" className={navLinkClass}>
    <LayoutDashboard className="h-5 w-5" />
    <span>Dashboard</span>
  </NavLink>

  <NavLink to="/admin/profiles" end className={navLinkClass}>
    <User className="h-5 w-5" />
    <span>Profiles</span>
  </NavLink>


  <NavLink to="/admin/settings" className={navLinkClass}>
    <Settings className="h-5 w-5" />
    <span>Settings</span>
  </NavLink>
</nav>


      {/* --- Footer / Logout --- */}
      <div className="mt-auto border-t border-gray-700 pt-4">
        <div className="flex items-center space-x-3 mb-3">
          <div className="h-10 w-10 rounded-full bg-brand-orange flex items-center justify-center font-bold text-white">
            {" "}
            {/* Uses --color-brand-orange */}
            A
          </div>
          <div>
            <p className="font-medium text-white">Admin</p>
            <p className="text-xs text-brand-gray">admin@trueline.com</p>{" "}
            {/* Uses --color-brand-gray */}
          </div>
        </div>

        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="flex w-full items-center justify-center space-x-2 rounded-3xl bg-brand-dark-light px-3 py-2 text-red-400 transition-colors hover:bg-red-800 hover:text-white" // Uses --color-brand-dark-light
        >
          {isLoggingOut ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <LogOut className="h-5 w-5" />
          )}
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;