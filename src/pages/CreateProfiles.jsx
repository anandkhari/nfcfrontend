import React from "react";
import { useNavigate } from "react-router-dom";
import { ProfileFormProvider } from "../context/ProfileFormContext";
import { useProfileForm } from "../context/ProfileFormContext";
import ProfileForm from "../components/profile/ProfileForm";
import ProfilePreview from "../components/profile/ProfilePreview";
import GalleryModal from "../components/profile/GalleryModal";
import SocialModal from "../components/profile/SocialModal";
import { Button } from "@/components/ui/button";
import { Smartphone, ArrowLeft, X } from "lucide-react";

/**
 * Main component for creating a new user profile.
 * This component is designed to be rendered inside the main DashboardLayout.
 */
const CreateProfiles = () => {
  const navigate = useNavigate();

  return (
    <ProfileFormProvider>
      {/* This wrapper div is the new root of the component.
        All layout (flex, min-h-screen) is removed.
      */}
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
              Create New Profile
            </h1>
          </div>

        </header>

        {/* Main Grid: Form & Desktop Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Form Section */}
          <div className="lg:col-span-2">
           <ProfileForm mode="create" />
          </div>

          {/* Live Preview Section (Desktop only) */}
          <div className="hidden lg:block">
            {/* This sticky container will now correctly be relative
              to the DashboardLayout's main scrolling area.
            */}
            <div className="sticky top-8 max-h-[calc(100vh-64px)] hide-scrollbar overflow-y-auto rounded-2xl  bg-white ">
              <ProfilePreview />
            </div>
          </div>
        </div>

        {/* Floating Mobile Preview Button (Mobile only) */}
        <MobilePreviewButton />
      </div>
    </ProfileFormProvider>
  );
};

// ----------------- Helper Components -----------------
// (These are unchanged, but I include them for completeness)
// -----------------------------------------------------

const SaveProfileButton = () => {
  const { handleSave, loading } = useProfileForm();
  return (
    <Button
      onClick={handleSave}
      className="bg-[#FF4F00] text-white rounded-3xl px-6 py-2.5 text-sm sm:text-base font-semibold shadow-md hover:bg-[#E04500] transition-all duration-200 w-full sm:w-auto active:scale-95"
      disabled={loading}
    >
      {loading ? "Saving..." : "Save Profile"}
    </Button>
  );
};

const MobilePreviewButton = () => {
  const { setMobilePreviewOpen } = useProfileForm();
  return (
    <div className="fixed bottom-6 right-10 flex justify-end lg:hidden z-40">
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

// In CreateProfiles.jsx ...

/**
 * The full-screen modal that displays the live preview on mobile.
 */
// In CreateProfiles.jsx ...

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

      {/* THIS IS THE FIX:
        - We REMOVED 'overflow-y-auto' from this wrapper.
        - The wrapper's ONLY job is to stop clicks and set a max-height
          so the phone doesn't go off-screen.
        - The ProfilePreview component *inside* will handle its own scrolling.
      */}
      <div 
        className="w-full max-w-sm max-h-[calc(100vh-2rem)]" 
        onClick={(e) => e.stopPropagation()}
      >
        <ProfilePreview />
      </div>
    </div>
  );
};
export default CreateProfiles;