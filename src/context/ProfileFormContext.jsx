import React, { createContext, useContext, useState, useRef } from "react";
import { toast } from "react-toastify";
import { API_BASE_URL } from "../../config";
import {
  Instagram,
  Linkedin,
  Twitter,
  Facebook,
  Youtube,
  Globe,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProfileFormContext = createContext(null);

const SOCIAL_PLATFORMS = [
  { key: "instagram", name: "Instagram", icon: Instagram, color: "#E4405F" },
  { key: "linkedin", name: "LinkedIn", icon: Linkedin, color: "#0077B5" },
  { key: "twitter", name: "Twitter", icon: Twitter, color: "#1DA1F2" },
  { key: "facebook", name: "Facebook", icon: Facebook, color: "#1877F2" },
  { key: "youtube", name: "YouTube", icon: Youtube, color: "#FF0000" },
  { key: "website", name: "Website", icon: Globe, color: "#6B7280" },
];

const DEFAULT_OPEN_ACCORDIONS = ["template-layout"];
const MAX_IMAGES = 4;
const MAX_FILE_SIZE_MB = 1;

export const ProfileFormProvider = ({ children, initialData = null }) => {
  const navigate = useNavigate();

  const [profileId, setProfileId] = useState(initialData?._id || null);

  const [profileImageUrl, setProfileImageUrl] = useState(
    initialData?.profileImageUrl
      ? `${API_BASE_URL}${initialData.profileImageUrl}`
      : "/profile-placeholder.png"
  );

  const [profileImageFile, setProfileImageFile] = useState(null);
  const profilePicInputRef = useRef(null);

  const [name, setName] = useState(initialData?.name || "");
  const [title, setTitle] = useState(initialData?.title || "");
  const [company, setCompany] = useState(initialData?.company || "");
  const [jobTitle, setJobTitle] = useState(initialData?.jobTitle || "");

  const handleProfilePicUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      toast.error(`Profile image must be under ${MAX_FILE_SIZE_MB} MB`);
      return;
    }

    setProfileImageFile(file);
    setProfileImageUrl(URL.createObjectURL(file));
  };

  const [openAccordion, setOpenAccordion] = useState(DEFAULT_OPEN_ACCORDIONS);

  const [galleryImages, setGalleryImages] = useState(
    (initialData?.galleryImages || []).map((path) => `${API_BASE_URL}${path}`)
  );

  const [galleryImageFiles, setGalleryImageFiles] = useState([]);
  const galleryInputRef = useRef(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleGalleryFileSelect = (e) => {
    const files = Array.from(e.target.files || []);
    const remainingSlots = MAX_IMAGES - galleryImages.length;
    const filesToAdd = files.slice(0, remainingSlots);

    for (const file of filesToAdd) {
      if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        toast.error(`Each gallery image must be under ${MAX_FILE_SIZE_MB} MB`);
        return;
      }
    }

    const previews = filesToAdd.map((f) => URL.createObjectURL(f));
    setGalleryImages((prev) => [...prev, ...previews]);
    setGalleryImageFiles((prev) => [...prev, ...filesToAdd]);
  };

  const removeGalleryImage = (index) => {
    const imageToRemove = galleryImages[index];

    setGalleryImages((prev) => prev.filter((_, i) => i !== index));

    if (imageToRemove.startsWith("blob:")) {
      setGalleryImageFiles((prev) =>
        prev.filter(
          (_, i) =>
            i !==
            galleryImages
              .slice(0, index)
              .filter((img) => img.startsWith("blob:")).length
        )
      );
    }

    if (currentImageIndex >= galleryImages.length - 1) {
      setCurrentImageIndex(0);
    }
  };

  const nextImage = () =>
    galleryImages.length &&
    setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);

  const prevImage = () =>
    galleryImages.length &&
    setCurrentImageIndex(
      (prev) => (prev - 1 + galleryImages.length) % galleryImages.length
    );

  const [phones, setPhones] = useState(
    initialData?.phones ?? [{ id: Date.now(), type: "Mobile", number: "" }]
  );

  const [emails, setEmails] = useState(
    initialData?.emails ?? [{ id: Date.now(), type: "Work", address: "" }]
  );

  const [website, setWebsite] = useState(initialData?.website || "");
  const [address, setAddress] = useState(initialData?.address || "");
  const [addressLink, setAddressLink] = useState(
    initialData?.addressLink || ""
  );

  const [socials, setSocials] = useState(initialData?.socials ?? []);

  const [isSocialModalOpen, setSocialModalOpen] = useState(false);
  const [socialsEnableText, setSocialsEnableText] = useState(true);
  const [platformToAdd, setPlatformToAdd] = useState(null);

  /* COVER IMAGE */
  const [coverImageUrl, setCoverImageUrl] = useState(
    initialData?.coverImageUrl
      ? `${API_BASE_URL}${initialData.coverImageUrl}`
      : "/cover-placeholder.png"
  );

  const [coverImageFile, setCoverImageFile] = useState(null);
  const coverPicInputRef = useRef(null);

  const handleCoverPicUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      toast.error(`Cover image must be under ${MAX_FILE_SIZE_MB} MB`);
      return;
    }

    setCoverImageFile(file);
    setCoverImageUrl(URL.createObjectURL(file));
  };

  /* THEME & UI */
  const [template, setTemplate] = useState(
    initialData?.theme?.template || "template1"
  );

  const [showGallery, setShowGallery] = useState(
    initialData?.theme?.showGallery ?? true
  );

  const [showSocials, setShowSocials] = useState(
    initialData?.theme?.showSocials ?? true
  );

  const [primaryColor, setPrimaryColor] = useState(
    initialData?.theme?.primaryColor || "#1A1A1A"
  );

  const [accentColor, setAccentColor] = useState(
    initialData?.theme?.accentColor || "#FF4F00"
  );

  const [iconColor, setIconColor] = useState(
    initialData?.theme?.iconColor || "#FFFFFF"
  );

  const [titleTextColor, setTitleTextColor] = useState(
    initialData?.theme?.titleTextColor || "#FFFFFF"
  );

  const [bioTextColor, setBioTextColor] = useState(
    initialData?.theme?.bioTextColor || "#E5E7EB"
  );

  const [fontFamily, setFontFamily] = useState(
    initialData?.theme?.fontFamily || "'Inter', sans-serif"
  );

  const [isGalleryModalOpen, setGalleryModalOpen] = useState(false);
  const [isMobilePreviewOpen, setMobilePreviewOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [vcfUrl, setVcfUrl] = useState(initialData?.vcfUrl || "#");

  const resetForm = () => {
    setName("");
    setTitle("");
    setCompany("");
    setJobTitle("");

    setPhones([]);
    setEmails([]);
    setSocials([]);

    setWebsite("");
    setAddress("");
    setAddressLink("");

    setGalleryImages([]);
    setGalleryImageFiles([]);

    setProfileImageFile(null);
    setProfileImageUrl("/profile-placeholder.png");

    setCoverImageFile(null);
    setCoverImageUrl("/cover-placeholder.png");

    setSocialModalOpen(false);
    setGalleryModalOpen(false);
    setMobilePreviewOpen(false);

    // (optional) reset theme too if you want:
    // setTemplate("template1");
    // setShowGallery(true);
    // setShowSocials(true);
    // setPrimaryColor("#1A1A1A");
    // setAccentColor("#FF4F00");
    // setIconColor("#FFFFFF");
    // setTitleTextColor("#FFFFFF");
    // setBioTextColor("#E5E7EB");
    // setFontFamily("'Inter', sans-serif");

    setVcfUrl("#");
    setProfileId(null);
  };

  const handleSave = async () => {
    if (!name.trim()) return toast.error("Name is required");

    if (showSocials && socials.length > 0) {
      for (const s of socials) {
        if (!s.platform || !s.link) {
          return toast.error(
            "Each social link must include a platform and link"
          );
        }
      }
    }

    const formData = new FormData();

    const data = {
      theme: {
        template,
        showGallery,
        showSocials,
        primaryColor,
        accentColor,
        iconColor,
        titleTextColor,
        bioTextColor,
        fontFamily,
      },
      name,
      title,
      company,
      jobTitle,
      phones,
      emails,
      website,
      address,
      addressLink,
      socials,
      existingGallery: galleryImages.filter(
        (img) => typeof img === "string" && !img.startsWith("blob:")
      ),
    };

    if (!profileId) {
      const baseName =
        name?.trim()?.toLowerCase().replace(/\s+/g, "-") || "user";

      data.nfcLink = `${baseName}-${Math.random()
        .toString(36)
        .substring(2, 7)}`;
    }

    formData.append("data", JSON.stringify(data));

    if (profileImageFile) {
      formData.append("profileImage", profileImageFile);
    }

    if (coverImageFile) {
      formData.append("coverImage", coverImageFile);
    }

    galleryImageFiles.forEach((file) =>
      formData.append("galleryImages", file)
    );

    try {
      setLoading(true);

      const method = profileId ? "PUT" : "POST";
      const url = profileId
        ? `${API_BASE_URL}/api/profile/${profileId}`
        : `${API_BASE_URL}/api/profile`;

      const response = await fetch(url, {
        method,
        body: formData,
        credentials: "include",
      });

      const contentType = response.headers.get("content-type") || "";
      const responseBody = contentType.includes("application/json")
        ? await response.json()
        : { message: await response.text() };

      if (!response.ok) {
        return toast.error(
          responseBody?.message || "Error saving profile"
        );
      }

      if (profileId) {
        toast.success("Profile updated successfully!");

        setProfileImageUrl(
          responseBody?.profile?.profileImageUrl ||
            "/profile-placeholder.png"
        );

        setCoverImageUrl(
          responseBody?.profile?.coverImageUrl ||
            "/cover-placeholder.png"
        );

        setGalleryImages(responseBody?.profile?.galleryImages || []);

        setProfileImageFile(null);
        setCoverImageFile(null);
        setGalleryImageFiles([]);

        setTimeout(() => navigate("/admin/profiles"), 500);
      } else {
        toast.success("Profile saved successfully!");

        resetForm();

        const newProfileId = responseBody?._id || responseBody?.id;
        if (newProfileId) {
          navigate(`/profile-link/${newProfileId}`, {
            state: { action: "created" },
          });
        }
      }

      return responseBody;
    } catch (err) {
      console.error("🔥 handleSave error:", err);
      toast.error("Error saving profile");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const openSocialModal = (platformKey) => {
    if (!platformKey) return;
    setPlatformToAdd(platformKey);
    setSocialModalOpen(true);
  };

  const closeSocialModal = () => {
    setSocialModalOpen(false);
    setPlatformToAdd(null);
  };

  return (
    <ProfileFormContext.Provider
      value={{
        // images
        profileImageUrl,
        setProfileImageUrl,
        profilePicInputRef,
        handleProfilePicUpload,
        profileImageFile,

        coverImageUrl,
        setCoverImageUrl,
        coverImageFile,
        coverPicInputRef,
        handleCoverPicUpload,

        // basic info
        name,
        setName,
        title,
        setTitle,
        company,
        setCompany,
        jobTitle,
        setJobTitle,

        // contact
        phones,
        setPhones,
        emails,
        setEmails,
        website,
        setWebsite,
        address,
        setAddress,
        addressLink,
        setAddressLink,

        // socials
        socials,
        setSocials,
        isSocialModalOpen,
        setSocialModalOpen,
        socialsEnableText,
        setSocialsEnableText,
        platformToAdd,
        setPlatformToAdd,
        openSocialModal,
        closeSocialModal,

        // gallery
        galleryImages,
        galleryImageFiles,
        handleGalleryFileSelect,
        removeGalleryImage,
        galleryInputRef,
        currentImageIndex,
        nextImage,
        prevImage,
        isGalleryModalOpen,
        setGalleryModalOpen,

        // theme
        template,
        setTemplate,
        showGallery,
        setShowGallery,
        showSocials,
        setShowSocials,
        primaryColor,
        setPrimaryColor,
        accentColor,
        setAccentColor,
        iconColor,
        setIconColor,
        titleTextColor,
        setTitleTextColor,
        bioTextColor,
        setBioTextColor,
        fontFamily,
        setFontFamily,

        // ui
        isMobilePreviewOpen,
        setMobilePreviewOpen,
        loading,
        handleSave,
        vcfUrl,
        setVcfUrl,

        // misc
        SOCIAL_PLATFORMS,
        MAX_IMAGES,
        openAccordion,
        setOpenAccordion,
      }}
    >
      {children}
    </ProfileFormContext.Provider>
  );
};

export const useProfileForm = () => {
  const context = useContext(ProfileFormContext);
  if (!context)
    throw new Error("useProfileForm must be used within ProfileFormProvider");
  return context;
};
