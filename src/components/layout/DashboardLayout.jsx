import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { Menu } from "lucide-react";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // --- FIX 1: This entire useEffect is not needed for this layout and can be removed. ---
  // The h-screen / flex layout already handles the main scroll,
  // and the mobile overlay will capture clicks/taps anyway.
  /*
  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? "hidden" : "auto";
  }, [sidebarOpen]);
  */

  return (
    // --- FIX 2: Removed "overflow-hidden" ---
    <div className="flex  bg-brand-light">
      {/* --- Sidebar --- */}
      <Sidebar
        className={`fixed inset-y-0 h-screen left-0 z-40 w-64 transform transition-transform duration-300 ease-in-out 
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        lg:static lg:translate-x-0`}
        onClose={() => setSidebarOpen(false)}
      />

      {/* --- Main Area --- */}
      {/* --- FIX 3: Removed "overflow-hidden" --- */}
      <div className="flex-1 flex flex-col">
        {/* --- Mobile Header --- */}
        <header className="flex items-center justify-between bg-white border-b border-gray-200 shadow-sm px-4 py-3 lg:hidden sticky top-0 z-30">
          <button
            aria-label="Open sidebar"
            onClick={() => setSidebarOpen(true)}
            className="text-brand-dark hover:text-brand-orange transition-colors"
          >
            <Menu size={26} />
          </button>
          <h1 className="text-base sm:text-lg font-semibold text-brand-dark">
            Dashboard
          </h1>
        </header>

        {/* --- Main Content --- */}
        {/* This is your one, true scrolling container */}
        <main className="flex-1 min-h-0  overflow-y-scroll overflow-x-hidden px-3 sm:px-4 md:px-6 lg:px-8 xl:px-10 py-4 sm:py-6">
          
          {/* --- FIX 4: Removed "h-full" --- */}
          {/* This div will now grow as tall as your form,
              which will correctly trigger the overflow-y-auto on <main>
          */}
          <div className="max-w-7xl mx-auto w-full transition-all duration-300 ease-in-out">
            <Outlet />
          </div>
        </main>
      </div>

      {/* --- Mobile Overlay --- */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-20 lg:hidden transition-opacity duration-300"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default DashboardLayout;