import React from "react";
import { Phone, Mail, MapPin } from "lucide-react";

const Template5Header = ({
  name = "Edward Larry",
  title = "Senior Designer",
  profileImageUrl,
  firstPhone,
  firstEmail,
  location, // Google Maps link
  
  accentColor = "#3B82F6",
}) => {
  return (
    <>

      {/* Profile Header */}
      <div className="flex items-center mt-10 gap-3 px-4 py-2  mb-6">
        <img
          src={profileImageUrl || "/profile-placeholder.png"}
          alt={name}
          className="w-20 h-20 rounded-full object-cover bg-gray-300"
        />

        <div>
          <h3 className="font-semibold">{name}</h3>
          <p className="text-sm text-gray-400">{title}</p>
        </div>
      </div>

      {/* Contact Options */}
      <p className="text-xs text-gray-400 px-6 mb-4">Contact Options</p>

      <div className="flex gap-2 px-6 mb-8">

        {/* CALL */}
        <a
          href={firstPhone ? `tel:${firstPhone}` : "#"}
          className="flex-1 text-white py-3 text-xs rounded-2xl flex items-center justify-center gap-2 shadow-md"
          style={{ backgroundColor: accentColor }}
        >
          <Phone size={14} />
          Call
        </a>

        {/* EMAIL */}
        <a
          href={firstEmail ? `mailto:${firstEmail}` : "#"}
          className="flex-1 text-white  text-xs rounded-2xl flex items-center justify-center gap-2 shadow-md"
          style={{ backgroundColor: accentColor }}
        >
          <Mail size={14} />
          Email
        </a>

        {/* LOCATION */}
        <a
          href={location || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 text-white text-xs rounded-2xl flex items-center justify-center gap-2 shadow-md"
          style={{ backgroundColor: accentColor }}
        >
          <MapPin size={14} />
          Location
        </a>

      </div>


    </>
  );
};

export default Template5Header;
