import React from "react";
import { Phone, Mail, Globe, MapPin, Briefcase, Building } from "lucide-react";

export default function PublicContactCards({
  phones = [],
  emails = [],
  website,
  address,
  addressLink,
  company,
  jobTitle,
  // 👇 These come dynamically from backend
  accentColor,
  iconColor,
  titleTextColor,
  bioTextColor,
}) {
  const cardClass = `
    flex items-start gap-4 rounded-xl border border-gray-100 
    bg-[#F9F7FB] p-3 shadow-sm hover:shadow-md transition-all duration-200
  `;

  // fallback colors in case API doesn't send
  const _accentColor = accentColor || "#E0D7EA";
  const _iconColor = iconColor || "#5E2E91";

  if (
    !phones.length &&
    !emails.length &&
    !website &&
    !address &&
    !company &&
    !jobTitle
  )
    return null;

  return (
    <div className="mb-8 space-y-4 text-left">
      <h2
        className="mb-3 border-b pb-2 text-xl font-semibold"
        style={{ color: "#111827" }}
      >
        My Contact Details
      </h2>

      <div className="space-y-3">
        {/* Company */}
        {company && (
          <div className={cardClass}>
            <div
              className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-2xl"
              style={{ backgroundColor: _accentColor }}
            >
              <Building className="h-5 w-5" style={{ color: _iconColor }} />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-700">{company}</p>
              <p className="text-xs text-gray-600">Company</p>
            </div>
          </div>
        )}

        {/* Job Title */}
        {jobTitle && (
          <div className={cardClass}>
            <div
              className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-2xl"
              style={{ backgroundColor: _accentColor }}
            >
              <Briefcase className="h-5 w-5" style={{ color: _iconColor }} />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-700">{jobTitle}</p>
              <p className="text-xs text-gray-600">Job Title</p>
            </div>
          </div>
        )}

        {/* Phones */}
        {phones.map((p, i) => (
          <a
            key={p._id ?? i}
            href={`tel:${p.number}`}
            className={cardClass}
            target="_blank"
            rel="noreferrer"
          >
            <div
              className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-2xl"
              style={{ backgroundColor: _accentColor }}
            >
              <Phone className="h-5 w-5" style={{ color: _iconColor }} />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-700">{p.number}</p>
              <p className="text-xs text-gray-600">{p.type || "Phone"}</p>
            </div>
          </a>
        ))}

        {/* Emails */}
        {emails.map((e, i) => (
          <a
            key={e._id ?? i}
            href={`mailto:${e.address}`}
            className={cardClass}
            target="_blank"
            rel="noreferrer"
          >
            <div
              className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-2xl"
              style={{ backgroundColor: _accentColor }}
            >
              <Mail className="h-5 w-5" style={{ color: _iconColor }} />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-700 break-all">
                {e.address}
              </p>
              <p className="text-xs text-gray-600">{e.type || "Email"}</p>
            </div>
          </a>
        ))}

        {/* Website */}
        {website && (
          <a href={website} target="_blank" rel="noreferrer" className={cardClass}>
            <div
              className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-2xl"
              style={{ backgroundColor: _accentColor }}
            >
              <Globe className="h-5 w-5" style={{ color: _iconColor }} />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-700 break-all">{website}</p>
              <p className="text-xs text-gray-600">Website</p>
            </div>
          </a>
        )}

        {/* Address */}
        {address && (
          <a
            href={addressLink || "#"}
            target="_blank"
            rel="noreferrer"
            className={cardClass}
          >
            <div
              className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-2xl"
              style={{ backgroundColor: _accentColor }}
            >
              <MapPin className="h-5 w-5" style={{ color: _iconColor }} />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-700 break-all">{address}</p>
              <p className="text-xs text-gray-600">Address</p>
            </div>
          </a>
        )}
      </div>
    </div>
  );
}
