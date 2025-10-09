import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Phone,
  Mail,
  MapPin,
  UserPlus,
  ChevronLeft,
  ChevronRight,
  Globe,
  Building,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { FaInstagram, FaFacebookF, FaYoutube, FaLinkedinIn, FaTwitter, FaTelegram } from "react-icons/fa";

// --- Constants (Required for Social Icons) ---
const SOCIAL_PLATFORMS = [
  { key: "instagram", name: "Instagram", icon: FaInstagram, color: "#E4405F" },
  { key: "facebook", name: "Facebook", icon: FaFacebookF, color: "#1877F2" },
  { key: "youtube", name: "YouTube", icon: FaYoutube, color: "#FF0000" },
  { key: "linkedin", name: "LinkedIn", icon: FaLinkedinIn, color: "#0A66C2" },
  { key: "twitter", name: "Twitter (X)", icon: FaTwitter, color: "#000000" },
  { key: "telegram", name: "Telegram", icon: FaTelegram, color: "#2AABEE" },
];

// --- Helper button for headers ---
const HeaderActionButton = ({ href, icon: Icon }) => (
  <Button
    asChild
    size="icon"
    className="h-11 w-11 rounded-full shadow-lg transition hover:scale-105"
    style={{ backgroundColor: "var(--accent-color)" }}
  >
    <a href={href}>
      <Icon size={20} />
    </a>
  </Button>
);

// --- Header Templates ---
const Template1Header = ({ profileImageUrl, name, title, firstPhone, firstEmail, addressLink }) => (
  <div
    className="p-6 pt-10 text-center text-white"
    style={{ backgroundColor: "var(--primary-color)" }}
  >
    <img
      src={profileImageUrl}
      alt="Profile"
      className="mb-4 h-[250px] w-full rounded-xl border-4 border-white object-cover shadow-lg"
    />
    <h1 className="mb-1 text-3xl font-bold" style={{ color: "var(--title-colour)" }}>
      {name}
    </h1>
    <p className="mb-6 text-base font-medium" style={{ color: "var(--bio-colour)" }}>
      {title}
    </p>
    <div className="mb-4 flex justify-center space-x-4">
      <HeaderActionButton href={`tel:${firstPhone || "#"}`} icon={Phone} />
      <HeaderActionButton href={`mailto:${firstEmail || "#"}`} icon={Mail} />
      <HeaderActionButton href={addressLink || "#"} icon={MapPin} />
    </div>
  </div>
);

const Template2Header = ({ profileImageUrl, name, title, firstPhone, firstEmail, addressLink }) => (
  <div
    className="p-6 pt-10 text-center text-white"
    style={{ backgroundColor: "var(--primary-color)" }}
  >
    <img
      src={profileImageUrl}
      alt="Profile"
      className="mb-4 h-32 w-32 rounded-full border-4 border-white object-cover shadow-lg mx-auto"
    />
    <h1 className="mb-1 text-3xl font-bold" style={{ color: "var(--title-colour)" }}>
      {name}
    </h1>
    <p className="mb-6 text-base font-medium" style={{ color: "var(--bio-colour)" }}>
      {title}
    </p>
    <div className="mb-4 flex justify-center space-x-4">
      <HeaderActionButton href={`tel:${firstPhone || "#"}`} icon={Phone} />
      <HeaderActionButton href={`mailto:${firstEmail || "#"}`} icon={Mail} />
      <HeaderActionButton href={addressLink || "#"} icon={MapPin} />
    </div>
  </div>
);

const Template3Header = ({ profileImageUrl, name, title, firstPhone, firstEmail, addressLink }) => (
  <div className="relative h-96 w-full">
    <img src={profileImageUrl} alt="Profile Background" className="absolute inset-0 h-full w-full object-cover" />
    <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 to-transparent p-6">
      <h1 className="leading-tight text-3xl font-bold" style={{ color: "var(--title-colour)" }}>
        {name}
      </h1>
      <p className="mb-5 text-base font-medium" style={{ color: "var(--bio-colour)" }}>
        {title}
      </p>
      <div className="flex items-center space-x-3">
        <HeaderActionButton href={`tel:${firstPhone || "#"}`} icon={Phone} />
        <HeaderActionButton href={`mailto:${firstEmail || "#"}`} icon={Mail} />
        <HeaderActionButton href={addressLink || "#"} icon={MapPin} />
      </div>
    </div>
  </div>
);

// --- Contact Card ---
const ContactCard = ({ href, icon: Icon, value, type, alternate, isImmersive }) => {
  if (!value) return null;
  const cardClasses = `flex items-center rounded-xl border p-4 transition-all hover:scale-[1.01] hover:shadow-md ${
    isImmersive ? "bg-white" : alternate ? "bg-[rgba(0,122,138,0.08)]" : "bg-white"
  }`;
  const textStyle = { color: isImmersive ? '#111827' : 'var(--text-primary)' };
  const mutedTextStyle = { color: isImmersive ? '#6B7280' : 'var(--text-muted)' };

  return (
    <a href={href || "#"} target="_blank" rel="noopener noreferrer" className={cardClasses}>
      <div
        className="mr-4 flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg"
        style={{ color: "var(--icon-colour)" }}
      >
        <Icon size={22} />
      </div>
      <div>
        <p className="break-all text-base font-bold" style={textStyle}>{value}</p>
        <p className="text-[13px]" style={mutedTextStyle}>{type}</p>
      </div>
    </a>
  );
};

// --- Social Card ---
const SocialCard = ({ href, platform, handle, isImmersive }) => {
  if (!platform) return null;
  const cardClasses = `flex items-center rounded-xl border p-4 transition-all hover:scale-[1.01] hover:shadow-md ${isImmersive ? 'bg-white' : 'bg-white'}`;
  const textStyle = { color: isImmersive ? '#111827' : '' };
  const mutedTextStyle = { color: isImmersive ? '#6B7280' : '' };

  // render dynamic icon component safely
  const Icon = platform.icon;

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cardClasses}>
      <div
        className="mr-4 flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg"
        style={{ color: platform.color }}
      >
        <Icon size={24} />
      </div>
      <div>
        <p className="text-base font-bold" style={textStyle}>{platform.name}</p>
        <p className="text-[13px]" style={mutedTextStyle}>{handle}</p>
      </div>
    </a>
  );
};

// --- Main Component ---
const PublicProfile = () => {
  const { profileId } = useParams();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [vcfUrl, setVcfUrl] = useState("#");

  // Update to your server base URL in production
  import { API_BASE_URL } from "../../../config";

  // Fetch Profile Data
 useEffect(() => {
  const fetchProfile = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/profile/${profileId}`);
      if (!res.ok) throw new Error("Profile not found");
      const data = await res.json();
      console.log("Fetched profile:", data);
      setProfile(data.profile); // ✅ set the actual profile object
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  if (profileId) fetchProfile();
}, [profileId]);


  // Generate VCF
  useEffect(() => {
    if (!profile) return;
    const [firstName, ...lastNameParts] = (profile.name || "").split(" ");
    let vcf = `BEGIN:VCARD\nVERSION:3.0\nN:${lastNameParts.join(" ")};${firstName}\nFN:${profile.name}\n`;
    if (profile.company) vcf += `ORG:${profile.company}\n`;
    if (profile.jobTitle) vcf += `TITLE:${profile.jobTitle}\n`;
    profile.phones?.forEach(p => (vcf += `TEL;TYPE=${(p.type || "work").toUpperCase()},VOICE:${p.number}\n`));
    profile.emails?.forEach(e => (vcf += `EMAIL;TYPE=${(e.type || "work").toUpperCase()}:${e.address}\n`));
    vcf += "END:VCARD";
    const blob = new Blob([vcf], { type: "text/vcard;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    setVcfUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [profile]);

  if (loading) return <div className="flex h-screen items-center justify-center">Loading Profile...</div>;
  if (error) return <div className="flex h-screen items-center justify-center text-red-500">Error: {error}</div>;
  if (!profile) return <div className="flex h-screen items-center justify-center">No profile found.</div>;

  // === THEME VALUES (from profile.theme) ===
  const theme = profile.theme || {};
  const isImmersive = theme.template === "template3";

  const previewStyle = {
    "--primary-color": theme.primaryColor || "#1E293B",
    "--accent-color": theme.accentColor || "#F97316",
    "--icon-colour": theme.iconColor || "#FFFFFF",
    "--title-colour": theme.titleTextColor || "#FFFFFF",
    "--bio-colour": theme.bioTextColor || "#E5E7EB",
    fontFamily: theme.fontFamily || "sans-serif",
  };

  const renderHeader = () => {
    const template = theme.template || "template2";

    // profile image fallback — if profile.profileImageUrl is empty use a placeholder
    const normalizedProfileImage =
      profile.profileImageUrl && profile.profileImageUrl.trim()
        ? `${API_BASE_URL}${profile.profileImageUrl}`
        : `https://via.placeholder.com/600x400?text=${encodeURIComponent(profile.name || "Profile")}`;

    const commonProps = {
      name: profile.name || "",
      title: profile.title || profile.jobTitle || "",
      addressLink: profile.addressLink,
      firstPhone: profile.phones?.[0]?.number,
      firstEmail: profile.emails?.[0]?.address,
      profileImageUrl: normalizedProfileImage,
    };

    switch (template) {
      case "template1":
        return <Template1Header {...commonProps} />;
      case "template3":
        return <Template3Header {...commonProps} />;
      default:
        return <Template2Header {...commonProps} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div
        id="preview-card"
        style={previewStyle}
        className={`relative mx-auto w-full max-w-sm overflow-y-auto rounded-3xl border shadow-xl ${isImmersive ? "bg-transparent" : "bg-white"}`}
      >
        {renderHeader()}

        {/* Content Section */}
        <div className="relative z-10 space-y-4 p-6" style={{ backgroundColor: isImmersive ? theme.primaryColor : '' }}>
          {/* Contact Details */}
          <div className="mb-8 space-y-4 text-left">
            <h2 className="mb-3 border-b pb-2 text-xl font-semibold" style={{ color: isImmersive ? '#FFF' : 'var(--text-primary)', borderColor: isImmersive ? 'rgba(255,255,255,0.3)' : '#E5E7EB' }}>
              My Contact Details
            </h2>
            <div className="space-y-3">
              {(profile.phones || []).map((p, i) => (
                <ContactCard
                  key={p._id ?? `phone-${i}`}
                  href={`tel:${p.number}`}
                  icon={Phone}
                  value={p.number}
                  type={`${p.type ?? "Work"} Phone`}
                  alternate={i % 2 !== 0}
                  isImmersive={isImmersive}
                />
              ))}
              {(profile.emails || []).map((e, i) => (
                <ContactCard
                  key={e._id ?? `email-${i}`}
                  href={`mailto:${e.address}`}
                  icon={Mail}
                  value={e.address}
                  type={`${e.type ?? "Work"} Email`}
                  alternate={i % 2 !== 0}
                  isImmersive={isImmersive}
                />
              ))}
              {profile.website && <ContactCard href={profile.website} icon={Globe} value={profile.website} type="Website" isImmersive={isImmersive} />}
              {profile.address && <ContactCard href={profile.addressLink} icon={MapPin} value={profile.address} type="View on Google Maps" isImmersive={isImmersive} />}
              {profile.company && <ContactCard icon={Building} value={profile.company} type={profile.jobTitle} isImmersive={isImmersive} />}
            </div>
          </div>

          {/* Gallery */}
          {theme.showGallery && profile.galleryImages?.length > 0 && (
            <div>
              <h2 className="mb-4 mt-8 border-b pb-2 text-xl font-semibold" style={{ color: isImmersive ? '#FFF' : 'var(--text-primary)', borderColor: isImmersive ? 'rgba(255,255,255,0.3)' : '#E5E7EB' }}>Gallery</h2>
              <div className="relative mb-8 w-full overflow-hidden rounded-xl bg-gray-200 shadow-lg">
                <img src={`${API_BASE_URL}${profile.galleryImages[currentImageIndex]}`} className="h-52 w-full object-cover" alt={`Gallery ${currentImageIndex + 1}`} />
                {profile.galleryImages.length > 1 && (
                  <>
                    <Button size="icon" onClick={() => setCurrentImageIndex(prev => (prev - 1 + profile.galleryImages.length) % profile.galleryImages.length)} className="absolute left-2 top-1/2 h-9 w-9 -translate-y-1/2 bg-black/30 text-white hover:bg-black/50"><ChevronLeft /></Button>
                    <Button size="icon" onClick={() => setCurrentImageIndex(prev => (prev + 1) % profile.galleryImages.length)} className="absolute right-2 top-1/2 h-9 w-9 -translate-y-1/2 bg-black/30 text-white hover:bg-black/50"><ChevronRight /></Button>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Socials */}
          {theme.showSocials && profile.socials?.length > 0 && (
            <div>
              <h2 className="mb-4 mt-8 border-b pb-2 text-xl font-semibold" style={{ color: isImmersive ? '#FFF' : 'var(--text-primary)', borderColor: isImmersive ? 'rgba(255,255,255,0.3)' : '#E5E7EB' }}>Connect With Me</h2>
              <div className="space-y-3 pb-16 text-left">
                {profile.socials.map((s, idx) => {
                  const platform = SOCIAL_PLATFORMS.find(p => p.key === s.platform);
                  return <SocialCard key={s._id ?? `social-${idx}`} href={s.link} platform={platform} handle={s.handle} isImmersive={isImmersive} />;
                })}
              </div>
            </div>
          )}
        </div>

        {/* Add to Contacts Button */}
        <div className="absolute bottom-6 right-6 z-20">
          <Button asChild size="icon" className="h-14 w-14 rounded-full shadow-xl" style={{ backgroundColor: theme.accentColor || '#F97316' }}>
            <a href={vcfUrl} download={`${(profile.name || "contact").replace(/\s+/g, "_")}.vcf`}>
              <UserPlus className="h-6 w-6" />
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PublicProfile;
