import React from 'react';
import { Phone, Mail, Globe } from 'lucide-react';

const Template4Header = ({
  profileImageUrl = "/profile-placeholder.png",
  name = "Your Full Name",
  title = "Position - Company Name",
  primaryColor = "#3B82F6", // Default blue
  titleTextColor = "#FFFFFF",
  firstPhone,
  firstEmail,
  // website can be added if needed
}) => {

  const borderColor = "rgba(255, 255, 255, 0.3)"; 

  return (
    <div className="relative  p-3">
      {/* 1. Main Blue Card */}
      <div
        className="relative w-full rounded-2xl shadow-lg overflow-hidden"
        style={{ backgroundColor: primaryColor }}
      >
        {/* 2. Text Content */}
        <div className="flex flex-col items-center px-6 pt-32 mt-18 pb-6">
          <h1 className="text-3xl font-bold mb-2" style={{ color: titleTextColor }}>
            {name}
          </h1>
          <p className="text-lg font-medium text-center" style={{ color: titleTextColor, opacity: 0.9 }}>
            {title}
          </p>
        </div>

        {/* 3. Icon Bar (Phone, Email, Website) */}
        <div 
          className="grid grid-cols-3 border-t"
          style={{ borderColor: borderColor }}
        >
          {/* Phone */}
          <a
            href={firstPhone ? `tel:${firstPhone}` : "#"}
            className="flex flex-col items-center justify-center p-3"
          >
            <Phone className="h-5 w-5 mb-1" style={{ color: titleTextColor }} />
            <span className="text-xs font-medium" style={{ color: titleTextColor }}>Phone</span>
          </a>

          {/* Email */}
          <a
            href={firstEmail ? `mailto:${firstEmail}` : "#"}
            className="flex flex-col items-center justify-center p-3 border-x"
            style={{ borderColor: borderColor }}
          >
            <Mail className="h-5 w-5 mb-1" style={{ color: titleTextColor }} />
            <span className="text-xs font-medium" style={{ color: titleTextColor }}>Email</span>
          </a>

          {/* Website */}
          <a
            href={"#"} // Replace with website prop if added
            className="flex flex-col items-center justify-center p-3"
          >
            <Globe className="h-5 w-5 mb-1" style={{ color: titleTextColor }} />
            <span className="text-xs font-medium" style={{ color: titleTextColor }}>Website</span>
          </a>
        </div>
      </div>

      {/* 4. Profile Picture (Overlaps) */}
      <div className="absolute top-5 left-1/2 -translate-x-1/2 pt-10">
        <div className="w-32 h-32 p-1 bg-white rounded-full shadow-lg">
          <img
            src={profileImageUrl}
            alt={name}
            className="w-full h-full rounded-full  object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Template4Header;
