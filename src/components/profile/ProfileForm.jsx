import React from "react";
import { useProfileForm } from "../../context/ProfileFormContext";
import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { StyledAccordionItem } from "@/components/ui/StyledAccordionItem";
import {
  Layers,
  Palette,
  UserCircle,
  Contact,
  Images as ImagesIcon,
  Share2,
  Save,
} from "lucide-react";
import ErrorBoundary from "../../components/ErrorBoundary";

// Import all the form sections
import TemplateLayoutForm from "./forms/TemplateLayoutForm";
import ThemeColorsForm from "./forms/ThemeColorsForm";
import ProfileHeaderForm from "./forms/ProfileHeaderForm";
import ContactDetailsForm from "./forms/ContactDetailsForm";
import GalleryForm from "./forms/GalleryForm";
import SocialsForm from "./forms/SocialsForm";

const ProfileFormContent = ({ mode = "create" }) => {
  const { isMobilePreviewOpen, handleSave } = useProfileForm();

  const buttonText = mode === "edit" ? "Update Profile" : "Create Profile";

  return (
    <div className={`w-full ${isMobilePreviewOpen ? "hidden" : ""}`}>
      {/* Heading */}
      <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">
        Profile Configuration
      </h2>

      {/* Accordion Section */}
      <Accordion type="multiple" defaultValue="item-1" className="w-full space-y-6">
        <StyledAccordionItem value="template-layout" icon={Layers} title="1. Template & Layout">
          <TemplateLayoutForm />
        </StyledAccordionItem>

        <StyledAccordionItem value="theme-colors" icon={Palette} title="2. Theme & Colors">
          <ThemeColorsForm />
        </StyledAccordionItem>

        <StyledAccordionItem value="profile-header" icon={UserCircle} title="3. Profile & Header Info">
          <ProfileHeaderForm />
        </StyledAccordionItem>

        <StyledAccordionItem value="contact-details" icon={Contact} title="4. Key Contact Details">
          <ContactDetailsForm />
        </StyledAccordionItem>

        <StyledAccordionItem value="gallery" icon={ImagesIcon} title="5. Gallery Images">
          <GalleryForm />
        </StyledAccordionItem>

        <StyledAccordionItem value="socials" icon={Share2} title="6. Social Media & Links">
          <SocialsForm />
        </StyledAccordionItem>
      </Accordion>

      {/* Save Button */}
      <div className="mt-6">
        <Button
          onClick={handleSave}
          className="h-12 w-[200px] rounded-2xl bg-[#FF4F00] py-3 text-base font-bold text-white shadow-sm hover:bg-[#E04500] transition-colors"
        >
          <Save className="mr-2 h-5 w-5" />
          {buttonText}
        </Button>
      </div>
    </div>
  );
};

// Wrap with ErrorBoundary and forward `mode` prop
const ProfileForm = ({ mode = "create" }) => (
  <ErrorBoundary>
    <ProfileFormContent mode={mode} />
  </ErrorBoundary>
);

export default ProfileForm;
