import React, { useState } from "react";
import { Copy, Edit, Trash2, QrCode, Check } from "lucide-react";

const ProfileCard = React.memo(({ profile, onAction }) => {
  const { name = "Untitled Profile", title = "No title", _id, status } = profile;

  const [copied, setCopied] = useState(false);

  const statusColor =
    status === "active"
      ? "bg-green-100 text-green-800"
      : "bg-yellow-100 text-yellow-800";

  const link = `${window.location.origin}/profile/${_id}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.error("Copy failed:", err);
    }
  };

  return (
    <div className="flex flex-col rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-lg">

      {/* 1. Profile Info */}
      <div className="p-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="truncate text-lg font-semibold text-brand-dark">
            {name}
          </h3>
          <span
            className={`rounded-full px-3 py-1 text-xs font-medium ${statusColor}`}
          >
            {status}
          </span>
        </div>
        <p className="mt-1 truncate text-sm text-brand-gray">{title}</p>
      </div>

      {/* 2. Link + Copy */}
      <div className="border-t border-gray-100 bg-gray-50 p-4">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            readOnly
            value={link}
            onClick={(e) => e.target.select()}
            className="flex-1 truncate rounded-md border border-gray-300 bg-white p-2 text-sm text-brand-gray shadow-sm cursor-pointer"
          />

          <button
            onClick={handleCopy}
            title={copied ? "Copied!" : "Copy link"}
            className={`rounded-md p-2 transition-colors 
              ${copied ? "bg-green-100 text-green-600" : "text-brand-gray hover:bg-gray-200 hover:text-brand-dark"}
            `}
          >
            {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* 3. Action Buttons */}
      <div className="flex flex-col gap-3 border-t border-gray-100 p-4 sm:flex-row sm:flex-wrap sm:justify-between">

        {/* Left */}
        <div className="flex w-full flex-wrap gap-2 sm:w-auto">

          {/* Edit */}
          <button
            onClick={() => onAction("Edit", _id)}
            className="flex flex-1 items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-brand-dark transition-colors hover:bg-gray-100 sm:flex-none"
          >
            <Edit className="h-4 w-4" />
            <span>Edit</span>
          </button>

          {/* Delete */}
          <button
            onClick={() => onAction("Delete", _id)}
            className="flex flex-1 items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 sm:flex-none"
          >
            <Trash2 className="h-4 w-4" />
            <span>Delete</span>
          </button>

          {/* QR */}
          <button
            onClick={() => onAction("QR", _id)}
            className="flex flex-1 items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-purple-600 transition-colors hover:bg-purple-50 sm:flex-none"
          >
            <QrCode className="h-4 w-4" />
            <span>Get QR</span>
          </button>
        </div>

        {/* Right */}
        <button
          onClick={() => onAction("View", _id)}
          className="flex w-full items-center justify-center rounded-md bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-100 sm:w-auto"
        >
          View Profile
        </button>

      </div>

    </div>
  );
});

export default ProfileCard;
