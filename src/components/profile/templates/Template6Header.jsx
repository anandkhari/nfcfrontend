"use client";

import React from "react";
import { Phone, Mail } from "lucide-react";

/* -------------------------------------------------
   TEMPLATE 6 BUTTON GROUP (Phone + Email Only)
--------------------------------------------------*/
const HeaderButtons = ({ phone, email }) => {
  if (!phone && !email) return null;

  return (
    <div className="mt-6 flex rounded-2xl overflow-hidden border border-gray-200 w-full">

      {/* PHONE BUTTON */}
      {phone && (
        <a
          href={`tel:${phone}`}
          className="w-1/2 py-3 flex items-center justify-center gap-2 font-medium text-white"
          style={{ backgroundColor: "var(--accent-color)" }}
        >
          <Phone size={18} className="text-white" />
          Call
        </a>
      )}

      {/* EMAIL BUTTON */}
      {email && (
        <a
          href={`mailto:${email}`}
          className={`w-1/2 py-3 flex items-center justify-center gap-2 font-medium text-white ${
            phone ? "border-l border-white/20" : ""
          }`}
          style={{ backgroundColor: "var(--accent-color)" }}
        >
          <Mail size={18} className="text-white" />
          Email
        </a>
      )}

    </div>
  );
};

/* -------------------------------------------------
   TEMPLATE 6 HEADER COMPONENT
--------------------------------------------------*/
export default function Template6Header({
  profileImageUrl = "",
  coverImageUrl = "",
  name = "John Doe",
  title = "Your Title Here",
  firstPhone,
  firstEmail,
}) {

  return (
    <div className="relative w-full max-w-sm bg-white overflow-hidden rounded-xl">

      {/* --- COVER IMAGE --- */}
      <div className="relative h-[360px] w-full overflow-hidden">
        <img
          src={coverImageUrl || "/cover-placeholder.png"}
          alt="Cover"
          className="w-full h-full object-cover"
        />

        {/* DIAGONAL WHITE MASK */}
        <div
          className="absolute inset-0 bg-white z-10"
          style={{
            clipPath: "polygon(0 78%, 100% 48%, 100% 100%, 0 100%)",
          }}
        ></div>
      </div>

      {/* --- PROFILE IMAGE --- */}
      <div className="absolute top-[200px] left-1/2 -translate-x-1/2 z-30">
        <div className="w-24 h-24 rounded-full border-4 border-white overflow-hidden shadow-xl bg-white">
          <img
            src={profileImageUrl || "/profile-placeholder.png"}
            alt="Profile"
            className="w-full h-full object-cover object-top"
          />
        </div>
      </div>

      {/* --- CONTENT AREA --- */}
      <div className="relative z-20 px-6 -mt-10 pb-10 bg-white">

        {/* NAME */}
        <h2 className="text-2xl font-semibold text-gray-900 text-center">
          {name}
        </h2>

        {/* TITLE */}
        <p className="mt-1 text-sm text-gray-500 flex items-center justify-center gap-2">
          <span className="w-1.5 h-1.5 bg-gray-500 rounded-full"></span>
          {title}
        </p>

        {/* CALL + EMAIL BUTTONS */}
        <HeaderButtons phone={firstPhone} email={firstEmail} />

      </div>
    </div>
  );
}
