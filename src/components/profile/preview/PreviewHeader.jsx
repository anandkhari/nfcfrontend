import React, { useEffect } from "react";
import { useProfileForm } from "@/context/ProfileFormContext";
import Template1Header from "../templates/Template1Header";
import Template2Header from "../templates/Template2Header";
import Template3Header from "../templates/Template3Header";
import Template4Header from "../templates/Template4Header";
import Template5Header from "../templates/Template5Header";
import Template6Header from "../templates/Template6Header";

const PreviewHeader = () => {
  const context = useProfileForm();

  const {
    template = "template2",

    // ✅ PROFILE IMAGE
    profileImageUrl = "",

    // ✅ NEW: COVER IMAGE
    coverImageUrl = "",

    name = "Your Name",
    title = "",
    phones = [],
    emails = [],
    addressLink = "",
    primaryColor = "#1A1A1A",
    accentColor = "#FF4F00",
    iconColor = "#FF4F00",
    titleTextColor = "#1A1A1A",
    bioTextColor = "#E5E7EB",
    fontFamily = "'Inter', sans-serif",
  } = context;

  // Set CSS variables
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--primary-color", primaryColor);
    root.style.setProperty("--accent-color", accentColor);
    root.style.setProperty("--icon-color", iconColor);
    root.style.setProperty("--title-color", titleTextColor);
    root.style.setProperty("--bio-color", bioTextColor);
    root.style.setProperty("--font-family", fontFamily);
  }, [
    primaryColor,
    accentColor,
    iconColor,
    titleTextColor,
    bioTextColor,
    fontFamily,
  ]);

  // Common props
  const commonProps = {
    name,
    title,
    addressLink,

    firstPhone:
      Array.isArray(phones) && phones.length > 0
        ? phones[0]?.number || ""
        : "",

    firstEmail:
      Array.isArray(emails) && emails.length > 0
        ? emails[0]?.address || ""
        : "",

    profileImageUrl,

    // ✅ NEW
    coverImageUrl,

    primaryColor,
    accentColor,
    iconColor,
    titleTextColor,
    bioTextColor,
    fontFamily,
  };

  try {
    switch (template) {
      case "template1":
        return <Template1Header {...commonProps} />;

      case "template3":
        return <Template3Header {...commonProps} />;

      case "template4":
        return <Template4Header {...commonProps} />;

      case "template5":
        return <Template5Header {...commonProps} />;

      case "template6":
        return (
          <Template6Header
            {...commonProps}
            profileImageUrl={profileImageUrl}
            coverImageUrl={coverImageUrl}
          />
        );

      case "template2":
      default:
        return <Template2Header {...commonProps} />;
    }
  } catch (error) {
    console.error("❌ Error rendering PreviewHeader:", error);
    return (
      <div className="p-4 text-red-500">
        ⚠️ Error rendering header. Please check your template configuration.
      </div>
    );
  }
};

export default PreviewHeader;
