import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ProfileFormProvider } from "../context/ProfileFormContext";
import { useProfileForm } from "../context/ProfileFormContext";
import ProfileForm from "../components/profile/ProfileForm";
import ProfilePreview from "../components/profile/ProfilePreview";
import GalleryModal from "../components/profile/GalleryModal";
import SocialModal from "../components/profile/SocialModal";
import { Button } from "@/components/ui/button";
import { Smartphone, Loader2, ArrowLeft, X } from "lucide-react"; // Added X
import { API_BASE_URL } from "../../config";

// This component fetches data and handles loading/error states.
// This logic is correct and remains unchanged.
const EditProfileLoader = () => {
  const { profileId } = useParams();
  const [initialData, setInitialData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!profileId) {
        setError("No profile ID provided.");
        setIsLoading(false);
        return;
      }
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/profile/${profileId}`,
          {
            credentials: "include",
          }
        );
        if (!response.ok) {
          throw new Error("Profile not found");
        }
        const data = await response.json();
        setInitialData(data.profile);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch profile:", err);
        setError(err.message || "Failed to load profile.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfile();
  }, [profileId]);

  // 1. Loading State
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F9FAFB]">
        <Loader2 className="h-12 w-12 animate-spin text-[#FF4F00]" />
      </div>
    );
  }

  // 2. Error State
  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#F9FAFB] text-red-600">
        <h2 className="text-2xl font-semibold">Error</h2>
        <p>{error}</p>
      </div>
    );
  }

  // 3. Success State
  return (
    <ProfileFormProvider initialData={initialData}>
      <EditProfileUI />
    </ProfileFormProvider>
  );
};

// This component contains the UI, now matching the CreateProfiles structure.
const EditProfileUI = () => {
  const navigate = useNavigate();

  return (
    // This wrapper div is the new root, matching CreateProfiles.
    <div className="w-full max-w-7xl 2xl:max-w-8xl mx-auto">
      {/* Modal Components */}
      <GalleryModal />
      <SocialModal />
      <MobilePreviewModal />

      {/* Page Header */}
      <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-gray-200 pb-4 sm:pb-6 mb-6 sm:mb-8 gap-4 sm:gap-6">
        {/* Left Side: Back Button & Title */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-4 w-full sm:w-auto">
          <Button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center gap-2 rounded-3xl border border-[#FF4F00] text-[#FF4F00] px-4 py-3 mb-4 lg:mb-0 text-sm sm:text-base font-semibold hover:bg-[#FF4F00] hover:text-white transition-all duration-200 shadow-sm hover:shadow-md active:scale-95 w-[150px] sm:w-auto"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back</span>
          </Button>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center sm:text-left">
            Edit Profile
          </h1>
        </div>
      </header>

      {/* Main Grid: Form & Desktop Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
        {/* Form Section */}
        <div className="lg:col-span-2">
          <ProfileForm mode="edit" />
        </div>

        {/* Live Preview Section (Desktop only) */}
        <div className="hidden lg:block">
          {/* This sticky container now has the correct styling */}
          <div className="sticky top-8 max-h-[calc(100vh-64px)] overflow-y-auto rounded-2xl border border-gray-200 bg-white shadow-sm">
            <ProfilePreview />
          </div>
        </div>
      </div>

      {/* Floating Mobile Preview Button (Mobile only) */}
      <MobilePreviewButton />
    </div>
  );
};

// ----------------- Helper Components -----------------

// MobilePreviewButton now matches CreateProfiles
const MobilePreviewButton = () => {
  const { setMobilePreviewOpen } = useProfileForm();
  return (
    <div className="fixed bottom-6 right-4 flex justify-end lg:hidden z-40">
      <Button
        size="icon"
        onClick={() => setMobilePreviewOpen(true)}
        className="h-14 w-14 sm:h-16 sm:w-16 rounded-full bg-[#FF4F00] text-white shadow-xl hover:scale-105 transition-transform duration-200"
      >
        <Smartphone className="h-7 w-7 sm:h-8 sm:w-8" />
      </Button>
    </div>
  );
};

// MobilePreviewModal is copied exactly from CreateProfiles
const MobilePreviewModal = () => {
  const { isMobilePreviewOpen, setMobilePreviewOpen } = useProfileForm();

  if (!isMobilePreviewOpen) {
    return null;
  }

  const handleClose = () => {
    setMobilePreviewOpen(false);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gray-100 p-4 lg:hidden"
      onClick={handleClose}
    >
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-4 right-4 z-[51] h-10 w-10 rounded-full bg-white text-gray-800 shadow-lg"
        onClick={handleClose}
      >
        <X className="h-6 w-6" />
        <span className="sr-only">Close preview</span>
      </Button>

      {/* Wrapper for mobile scrolling fix */}
      <div 
        className="w-full max-w-sm max-h-[calc(100vh-2rem)]" 
        onClick={(e) => e.stopPropagation()}
      >
        <ProfilePreview />
      </div>
    </div>
  );
};

export default EditProfileLoader;