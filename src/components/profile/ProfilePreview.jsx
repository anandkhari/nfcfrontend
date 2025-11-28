import React from "react";
import { useProfileForm } from "../../context/ProfileFormContext";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  UserPlus,
  Phone,
  Mail,
  Globe,
  MapPin,
  Building,  // Icon for Company
  Briefcase, // Icon for Job Title
} from "lucide-react";
import PreviewHeader from "./preview/PreviewHeader";
import ContactCard from "./preview/ContactCard";
import SocialCard from "./preview/SocialCard";

const ProfilePreview = () => {
  const context = useProfileForm();

  if (!context) {
    return (
      <div className="p-4 text-red-600">
        ⚠️ Profile context not available.
      </div>
    );
  }

  // Destructure all needed values from the context
  const {
    previewStyle = {},
    isImmersive = false,
    name = "",
    vcfUrl = "",
    phones = [],
    emails = [],
    website = "",
    address = "",
    addressLink = "",
    company = "",
    jobTitle = "",
    showGallery = false,
    galleryImages = [],
    currentImageIndex = 0,
    prevImage = () => {},
    nextImage = () => {},
    showSocials = false,
    socials = [],
    primaryColor = "#1A1A1A",
    accentColor = "#FF4F00",
    iconColor = "#FF4F00",
    titleTextColor = "#FFFFFF",
    bioTextColor = "#E5E7EB",
    fontFamily = "'Inter', sans-serif",
  } = context;

  return (
    // 1. "PHONE BEZEL" (Outer Frame)
    // This div defines the phone's physical shape and border
    <div
      id="preview-card"
      style={{
        ...previewStyle,
        "--primary-color": primaryColor,
        "--accent-color": accentColor,
        "--icon-color": iconColor,
        "--title-colour": titleTextColor,
        "--bio-colour": bioTextColor,
        "--font-family": fontFamily,
      }}
      className={`relative mx-auto w-[320px] h-[640px] rounded-[40px] border-[10px] border-black shadow-2xl p-4 overflow-hidden
        ${isImmersive ? "bg-transparent" : "bg-white"}`}
    >
      {/* 2. "PHONE SCREEN" (Inner Content Scroller) */}
      <div
        className="relative w-full h-full hide-scrollbar rounded-[30px] overflow-y-auto"
        style={{
          backgroundColor: isImmersive ? primaryColor : "white",
          fontFamily,
        }}
      >
        {/* Header */}
        <PreviewHeader />

        <div className="relative z-10 space-y-4 px-2 mt-5">
          {/* Contact Details Section */}
          <div className="mb-8 space-y-4 text-left">
            <h2
              className="mb-5 border-b pb-2 text-xl font-semibold"
              style={{
                color: "black", // Hardcoded to black
                borderColor: isImmersive
                  ? "rgba(255,255,255,0.3)"
                  : accentColor,
                fontFamily: "var(--font-family)",
              }}
            >
              My Contact Details
            </h2>

            <div className="space-y-3">
              {/* Phones */}
              {phones.map((p, idx) => (
                <ContactCard
                  key={p.id || idx}
                  href={`tel:${p.number}`}
                  icon={Phone}
                  type={p.type}
                  value={p.number}
                  isImmersive={isImmersive}
                  accentColor={accentColor}
                  iconColor={iconColor}
                  fontFamily={fontFamily}
                />
              ))}

              {/* Emails */}
              {emails.map((e, idx) => (
                <ContactCard
                  key={e.id || idx}
                  href={`mailto:${e.address}`}
                  icon={Mail}
                  value={e.address}
                  type={e.type}
                  isImmersive={isImmersive}
                  accentColor={accentColor}
                  iconColor={iconColor}
                  fontFamily={fontFamily}
                />
              ))}

              {/* Website */}
              {website && (
                <ContactCard
                  href={website}
                  icon={Globe}
                  value={website}
                  type="Website"
                  isImmersive={isImmersive}
                  accentColor={accentColor}
                  iconColor={iconColor}
                  fontFamily={fontFamily}
                />
              )}

              {/* Address */}
              {address && (
                <ContactCard
                  href={addressLink || "#"}
                  icon={MapPin}
                  value={address}
                  type="Address"
                  isImmersive={isImmersive}
                  accentColor={accentColor}
                  iconColor={iconColor}
                  fontFamily={fontFamily}
                />
              )}
              
              {/* Company */}
              {company && (
                <ContactCard
                  href="#"
                  icon={Building}
                  value={company}
                  type="Company"
                  isImmersive={isImmersive}
                  accentColor={accentColor}
                  iconColor={iconColor}
                  fontFamily={fontFamily}
                />
              )}

              {/* Job Title */}
              {jobTitle && (
                <ContactCard
                  href="#"
                  icon={Briefcase}
                  value={jobTitle}
                  type="Job Title"
                  isImmersive={isImmersive}
                  accentColor={accentColor}
                  iconColor={iconColor}
                  fontFamily={fontFamily}
                />
              )}
            </div>
          </div>

          {/* Gallery Section */}
          {showGallery && (
            <div id="preview-gallery-section">
               <h2
              className="mb-5 border-b pb-2 text-xl font-semibold"
              style={{
                color: "black", // Hardcoded to black
                borderColor: isImmersive
                  ? "rgba(255,255,255,0.3)"
                  : accentColor,
                fontFamily: "var(--font-family)",
              }}
            >
                Gallery
              </h2>
              <div className="relative mb-8 w-full overflow-hidden rounded-xl bg-gray-100 shadow-lg border border-gray-200">
                {galleryImages.length > 0 ? (
                  <img
                    src={galleryImages[currentImageIndex]}
                    className="h-52 w-full object-cover"
                    alt="Gallery"
                  />
                ) : (
                  <div className="flex h-52 w-full items-center justify-center text-gray-400 bg-gray-50">
                    No images uploaded.
                  </div>
                )}

                {galleryImages.length > 1 && (
                  <>
                    <Button
                      size="icon"
                      onClick={prevImage}
                      className="absolute left-2 top-1/2 h-9 w-9 -translate-y-1/2 rounded-full bg-[#FF4F00]/70 text-white hover:bg-[#FF4F00]"
                    >
                      <ChevronLeft />
                    </Button>
                    <Button
                      size="icon"
                      onClick={nextImage}
                      className="absolute right-2 top-1/2 h-9 w-9 -translate-y-1/2 rounded-full bg-[#FF4F00]/70 text-white hover:bg-[#FF4F00]"
                    >
                      <ChevronRight />
                    </Button>
                  </>
                )}
              </div>
            </div>
          )}
          
          {/* Socials Section */}
          {showSocials && (
            <div id="preview-socials-section">
               <h2
              className="mb-5 border-b pb-2 text-xl font-semibold"
              style={{
                color: "black", // Hardcoded to black
                borderColor: isImmersive
                  ? "rgba(255,255,255,0.3)"
                  : accentColor,
                fontFamily: "var(--font-family)",
              }}
            >
                Connect With Me
              </h2>

              <div className="space-y-3 pb-16 text-left">
                {Array.isArray(socials) && socials.length > 0 ? (
                  <SocialCard />
                ) : (
                  <p
                    className={`text-sm ${
                      isImmersive ? "text-gray-300" : "text-gray-500"
                    }`}
                  >
                    No social links added yet.
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* VCF Download Button */}
      <div className="absolute bottom-10 right-10 z-20 md:bottom-12 md:right-12">
        <Button
          asChild
          size="icon"
          className="h-14 w-14 rounded-full bg-[#FF4F00] text-white shadow-xl hover:bg-[#E04500] transition-colors"
        >
          <a
            href={vcfUrl || "#"}
            download={`${(name || "contact").replace(/\s+/g, "_")}.vcf`}
          >
            <UserPlus className="h-6 w-6" />
          </a>
        </Button>
      </div>
    </div>
  );
};

export default ProfilePreview;