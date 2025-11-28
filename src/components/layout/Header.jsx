import React from "react";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";

const Header = ({ title }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
      {/* Title */}
      <h1 className="text-2xl sm:text-3xl font-bold text-brand-dark text-center sm:text-left">
        {title}
      </h1>

      {/* Action Button */}
      <button
        onClick={() => navigate("/admin/profiles/create")}
        className="flex items-center justify-center sm:justify-start space-x-2 rounded-3xl bg-brand-orange px-5 py-2.5 
                   font-semibold text-white shadow-md sm:shadow-lg transition-all duration-200 
                   hover:bg-brand-orange-dark hover:shadow-xl active:scale-95 w-full sm:w-auto"
      >
        <Plus className="h-5 w-5" />
        <span>Create New Profile</span>
      </button>
    </div>
  );
};

export default Header;
