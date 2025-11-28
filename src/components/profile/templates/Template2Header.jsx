import React from "react";
import { Phone, Mail, MapPin } from "lucide-react";

const HeaderActionButton = ({ href, icon: Icon }) => {
  if (!href) return null;

  return (
    <a
      href={href}
      className="p-4 rounded-full flex items-center justify-center shadow-lg transition hover:scale-105"
      style={{ backgroundColor: "var(--accent-color)" }}  // ← dynamic accent color
    >
      <Icon size={20} className="text-white" />
    </a>
  );
};


export default function Template2Header({
  profileImageUrl = "",
  name = "John Doe",
  title = "Your Title Here",
  firstPhone,
  firstEmail,
  addressLink,
}) {
  return (
    <div className="relative w-full max-w-sm bg-white shadow-xl overflow-hidden ">

      {/* Top Black Area With V-Notch */}
      <div
        className="relative w-full h-[230px] bg-black"
        style={{
          clipPath: "polygon(0 0, 100% 0, 100% 50%, 65% 95%, 0 18%)",
        }}
      ></div>


      {/* Profile Image */}
      <div className="absolute left-1/2 transform -translate-x-1/2 top-22">
        <div className="w-32 h-32 rounded-full border-4 border-white shadow-2xl overflow-hidden">
          <img
            src={profileImageUrl || "/profile-placeholder.png"}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Content */}
      <div className="mt-2 pb-10 text-center px-2">

        {/* Name */}
        <h2 className="text-xl font-semibold text-gray-900">
          {name}
        </h2>

        {/* Title */}
        <p className="text-sm text-gray-500 mt-1">
          {title}
        </p>

        {/* Social icons (for phone/email/location like Template 2) */}
        <div className="flex justify-center gap-5 mt-6">

          {firstPhone && (
            <HeaderActionButton href={`tel:${firstPhone}`} icon={Phone} />
          )}

          {firstEmail && (
            <HeaderActionButton href={`mailto:${firstEmail}`} icon={Mail} />
          )}

          {addressLink && (
            <HeaderActionButton href={addressLink} icon={MapPin} />
          )}

        </div>
      </div>
    </div>
  );
}
