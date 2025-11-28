import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import Loader from "@/components/ui/loader";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading, hasFetched } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // redirect only AFTER we’ve checked auth
    if (!isLoading && hasFetched && !isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, isLoading, hasFetched, navigate]);

  if (isLoading || !hasFetched) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader size={40} />
      </div>
    );
  }

  return isAuthenticated ? children : null;
};

export default ProtectedRoute;
