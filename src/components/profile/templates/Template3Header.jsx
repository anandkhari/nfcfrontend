import React from "react";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin } from "lucide-react";

// Reusable icon button with dynamic colors
const HeaderActionButton = ({ href, icon: Icon, accentColor, iconColor }) => (
  <Button
    asChild
    size="icon"
    className="h-11 w-11 rounded-full shadow-lg transition hover:scale-105"
    style={{ backgroundColor: accentColor }}
  >
    <a href={href} target="_blank" rel="noopener noreferrer">
      <Icon size={20} color={iconColor} />
    </a>
  </Button>
);

const Template3Header = ({
  profileImageUrl,
  name,
  title,
  firstPhone,
  firstEmail,
  addressLink,
  accentColor = "var(--accent-color)",
  iconColor = "var(--icon-color)",
  titleTextColor = "var(--title-color)",
  bioTextColor = "var(--bio-color)",
}) => (
  <div className="relative h-96 w-full">
    {/* Background Image fills header */}
    <img
      src={profileImageUrl || "/profile-placeholder.png"}
      alt="Profile Background"
      className="absolute inset-0 h-full w-full object-cover"
    />

    {/* Overlay with gradient */}
    <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 to-transparent p-6">
      <h1
        className="leading-tight text-3xl font-bold"
        style={{ color: titleTextColor }}
      >
        {name}
      </h1>
      <p
        className="mb-5 text-base font-medium"
        style={{ color: bioTextColor }}
      >
        {title}
      </p>

      {/* Action buttons */}
      <div className="flex items-center space-x-3">
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
  </div>
);

export default Template3Header;
