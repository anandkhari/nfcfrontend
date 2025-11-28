import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";

import PublicHeader from "../components/profile/public/PublicHeader";
import PublicContactCards from "../components/profile/public/PublicContactCards";
import PublicSocialCards from "../components/profile/public/PublicSocialCards";
import PublicGallery from "../components/profile/public/PublicGallery";

import { fetchPublicProfile } from "../utils/api/publicApi";
import { API_BASE_URL } from "../../config";
import { UserPlus } from "lucide-react";

export default function PublicProfilePage({ context = "nfc" }) {
  const { profileId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [vcfUrl, setVcfUrl] = useState("#");

  const pageContext = location.state?.context || context;

  /* -------------------------------
     Fetch Public Profile
  --------------------------------*/
  useEffect(() => {
    let mounted = true;

    setLoading(true);
    setError(null);

    fetchPublicProfile(profileId)
      .then((p) => {
        if (!mounted) return;
        setProfile(p);
        setCurrentImageIndex(0);
      })
      .catch((err) => {
        if (!mounted) return;
        setError(err.message || "Error fetching profile");
      })
      .finally(() => {
        if (!mounted) return;
        setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [profileId]);

  /* -------------------------------
     Set Backend VCF URL
  --------------------------------*/
  useEffect(() => {
    if (!profile?._id) return;
    setVcfUrl(`${API_BASE_URL}/api/public/vcf/${profile._id}`);
  }, [profile]);

  /* -------------------------------
     Log VCF Save
  --------------------------------*/
  const handleVcfSave = async () => {
    if (!profile?._id) return;

    try {
      fetch(`${API_BASE_URL}/api/profile/log-save`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ profileId: profile._id }),
      });

      console.log("VCF Save event sent to backend.");
    } catch (err) {
      console.error("Failed to log VCF save:", err);
    }
  };

  /* -------------------------------
     UI States
  --------------------------------*/
  if (loading)
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="w-full max-w-sm p-6">
          <div className="rounded-3xl bg-white p-6 shadow-xl space-y-6 animate-pulse">
            <div className="mx-auto h-32 w-32 rounded-full bg-gray-200" />
            <div className="h-5 w-3/4 mx-auto bg-gray-200 rounded" />
            <div className="h-4 w-1/2 mx-auto bg-gray-200 rounded" />

            <div className="space-y-3 pt-6">
              <div className="h-12 bg-gray-200 rounded-xl" />
              <div className="h-12 bg-gray-200 rounded-xl" />
              <div className="h-12 bg-gray-200 rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="flex h-screen items-center justify-center text-red-500">
        Error: {error}
      </div>
    );

  if (!profile)
    return (
      <div className="flex h-screen items-center justify-center">
        No profile found.
      </div>
    );

  /* -------------------------------
     Theme & Normalization
  --------------------------------*/
  const theme = profile.theme || {};
  const isImmersive = theme.template === "template3";

  const showGallery = theme.showGallery ?? true;
  const showSocials = theme.showSocials ?? true;

  const normalizeUrl = (p) => {
    if (!p) return p;
    if (p.startsWith("http")) return p;

    const clean = p.replace(/^\/+/, "");
    return `${API_BASE_URL}/${clean}`;
  };

  const normalizedProfileImage =
    normalizeUrl(profile.profileImageUrl) ||
    `https://via.placeholder.com/400x300?text=${encodeURIComponent(
      profile.name || "Profile"
    )}`;

  const normalizedCoverImage =
    normalizeUrl(profile.coverImageUrl) || "/cover-placeholder.png";

  const galleryUrls = (profile.galleryImages || []).map(normalizeUrl);

  /* -------------------------------
     Gallery Navigation
  --------------------------------*/
  const prevImage = () =>
    setCurrentImageIndex(
      (i) => (i - 1 + galleryUrls.length) % galleryUrls.length
    );

  const nextImage = () =>
    setCurrentImageIndex((i) => (i + 1) % galleryUrls.length);

  /* -------------------------------
     Theme Colors
  --------------------------------*/
  const primaryColor = theme.primaryColor || "#1E293B";
  const accentColor = theme.accentColor || "#F97316";
  const iconColor = theme.iconColor || "#FFFFFF";
  const titleTextColor = theme.titleTextColor || "#FFFFFF";
  const bioTextColor = theme.bioTextColor || "#E5E7EB";
  const fontFamily = theme.fontFamily || "sans-serif";

  const showBackButton =
    pageContext === "dashboard" || pageContext === "profileLink";
  const showEditButton = pageContext === "dashboard";
  const showShareButton = pageContext === "profileLink";

  /* -------------------------------
     JSX UI
  --------------------------------*/
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-2">
      <div className="w-full max-w-sm">
        {/* Action Buttons */}
        <div className="flex justify-between items-center mb-4 px-1">
          <div className="flex gap-2">
            {showBackButton && (
              <button
                onClick={() => window.history.back()}
                className="px-3 py-1 rounded-full bg-gray-200 text-gray-800 hover:bg-gray-300 transition"
              >
                Back
              </button>
            )}
          </div>

          <div className="flex gap-2">
            {showEditButton && (
              <button
                onClick={() => navigate(`/admin/profiles/edit/${profileId}`)}
                className="px-3 py-1 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition"
              >
                Edit Profile
              </button>
            )}

            {showShareButton && (
              <button
                onClick={() =>
                  navigator.clipboard.writeText(window.location.href)
                }
                className="px-3 py-1 rounded-full bg-green-600 text-white hover:bg-green-700 transition"
              >
                Copy Link
              </button>
            )}
          </div>
        </div>

        {/* Main Card */}
        <div
          id="preview-card"
          className={`relative w-full overflow-y-auto rounded-3xl shadow-xl ${
            isImmersive ? "bg-transparent" : "bg-white"
          }`}
          style={{ fontFamily }}
        >
          <PublicHeader
            name={profile.name}
            title={profile.title || profile.jobTitle}
            profileImageUrl={normalizedProfileImage}
            coverImageUrl={normalizedCoverImage} 
            firstPhone={profile.phones?.[0]?.number}
            firstEmail={profile.emails?.[0]?.address}
            addressLink={profile.addressLink}
            isImmersive={isImmersive}
            primaryColor={primaryColor}
            titleTextColor={titleTextColor}
            bioTextColor={bioTextColor}
            accentColor={accentColor}
            iconColor={iconColor}
            template={theme.template}
          />

          <div
            className="p-6 relative z-10"
            style={{ backgroundColor: isImmersive ? "white" : "" }}
          >
            <PublicContactCards
              phones={profile.phones}
              emails={profile.emails}
              website={profile.website}
              address={profile.address}
              addressLink={profile.addressLink}
              company={profile.company}
              jobTitle={profile.jobTitle}
              isImmersive={isImmersive}
              accentColor={accentColor}
              iconColor={iconColor}
              titleTextColor={titleTextColor}
              bioTextColor={bioTextColor}
            />

            {showGallery && (
              <PublicGallery
                images={galleryUrls}
                currentIndex={currentImageIndex}
                prev={prevImage}
                next={nextImage}
              />
            )}

            {showSocials && (
              <PublicSocialCards
                socials={profile.socials}
                isImmersive={isImmersive}
                iconColor={iconColor}
              />
            )}
          </div>

          {/* VCF Save Button */}
          <div className="absolute bottom-6 right-6 z-20">
            <a href={vcfUrl} download onClick={handleVcfSave}>
              <button
                className="h-14 w-14 rounded-full shadow-xl flex items-center justify-center"
                style={{ backgroundColor: accentColor }}
              >
                <UserPlus className="h-6 w-6 text-white" />
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
