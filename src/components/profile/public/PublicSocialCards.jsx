// src/components/profile/public/PublicSocialCards.jsx
import React from "react";
import { FaInstagram, FaFacebookF, FaYoutube, FaLinkedinIn, FaTwitter, FaTelegram } from "react-icons/fa";

const ICONS = {
  instagram: FaInstagram,
  facebook: FaFacebookF,
  youtube: FaYoutube,
  linkedin: FaLinkedinIn,
  twitter: FaTwitter,
  telegram: FaTelegram,
};

/**
 * PublicSocialCards
 * Props:
 *  - socials: [{ platform, link, handle }]
 */
export default function PublicSocialCards({ socials = [], isImmersive = false }) {
  if (!Array.isArray(socials) || socials.length === 0) return null;

  return (
    <div className="mb-8">
      <h2 className="mb-4 text-xl font-semibold">Connect With Me</h2>
      <div className="grid grid-cols-1 gap-3">
        {socials.map((s, idx) => {
          const PlatformIcon = ICONS[s.platform?.toLowerCase()] || null;
          return (
  <a
    key={s._id ?? idx}
    href={s.link}
    target="_blank"
    rel="noreferrer"
    className="
      flex items-center gap-4 rounded-xl border border-gray-100 
      bg-[#F9F7FB] p-3 shadow-sm hover:shadow-md transition-all duration-200
    "
  >
    {/* Icon container */}
    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-2xl bg-gray-200">
      {PlatformIcon ? <PlatformIcon className="h-5 w-5 text-gray-700" /> : <span className="text-lg">🔗</span>}
    </div>

    {/* Text content */}
    <div className="flex flex-col">
      <p className="text-sm font-semibold text-gray-700">{s.platform}</p>
      {s.handle && <p className="text-xs text-gray-500">{s.handle}</p>}
    </div>
  </a>
);

        })}
      </div>
    </div>
  );
}
