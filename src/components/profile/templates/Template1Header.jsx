import React from 'react';
import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin } from "lucide-react";

// Reusable icon button
const HeaderActionButton = ({ href, icon: Icon, accentColor, iconColor }) => (
  <Button
    asChild
    size="icon"
    className="h-14 w-18 rounded-2xl shadow-lg transition hover:scale-105"
    style={{ backgroundColor: accentColor }}
  >
    <a href={href} target="_blank" rel="noopener noreferrer">
      <Icon size={20} color={iconColor} />
    </a>
  </Button>
);

// Header component (Updated)
const Template1Header = ({
  profileImageUrl,
  name,
  title,
  firstPhone,
  firstEmail,
  addressLink,
  primaryColor = "#1A1A1A",
  accentColor = "#FF4F00",
  iconColor = "#FFFFFF",
  titleTextColor = "#FFFFFF",
  bioTextColor = "#E5E7EB",
}) => {
  return (
    <div
      className="p-6 pt-10 text-center"
      style={{
        backgroundColor: primaryColor,
        color: bioTextColor,
      }}
    >
      {/* 1. Profile Image */}
      <img
        src={profileImageUrl || "/profile-placeholder.png"}
        alt="Profile"
        className="w-36 h-36 rounded-full mb-3 border-2 mx-auto border-gray-200 object-cover"
      />

      {/* 2. Name */}
      <h1 className="mb-1 text-xl font-bold" style={{ color: titleTextColor }}>
        {name}
      </h1>

      {/* 4. Title (Moved down) */}
      <p className=" text-sm mb-6 font-medium" style={{ color: bioTextColor }}>
        {title}
      </p>

      {/* 3. Action Buttons (Moved up) */}
      <div className="mb-4 flex justify-center space-x-2">
        {firstPhone && (
          <HeaderActionButton
            href={`tel:${firstPhone}`}
            icon={Phone}
            accentColor={accentColor}
            iconColor={iconColor}
          />
        )}
        {firstEmail && (
          <HeaderActionButton
            href={`mailto:${firstEmail}`}
            icon={Mail}
            accentColor={accentColor}
            iconColor={iconColor}
          />
        )}
        {addressLink && (
          <HeaderActionButton
            href={addressLink}
            icon={MapPin}
            accentColor={accentColor}
            iconColor={iconColor}
          />
        )}
      </div>
      
      

    </div>
  );
};

export default Template1Header;