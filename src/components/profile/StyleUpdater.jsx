import { useEffect } from "react";
import { useProfileForm } from "@/context/ProfileFormContext";

const StyleUpdater = () => {
  const {
    primaryColor,
    accentColor,
    iconColor,
    titleTextColor,
    bioTextColor,
    fontFamily,
  } = useProfileForm();

  useEffect(() => {
    const root = document.documentElement; // top-level HTML element

    root.style.setProperty("--primary-color", primaryColor);
    root.style.setProperty("--accent-color", accentColor);
    root.style.setProperty("--icon-color", iconColor);
    root.style.setProperty("--title-color", titleTextColor);
    root.style.setProperty("--bio-color", bioTextColor);
    root.style.setProperty("--font-family", fontFamily);
  }, [primaryColor, accentColor, iconColor, titleTextColor, bioTextColor, fontFamily]);

  return null; // doesn't render anything visually
};

export default StyleUpdater;
