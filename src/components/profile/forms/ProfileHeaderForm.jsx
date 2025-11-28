import React from "react";
import { useProfileForm } from "@/context/ProfileFormContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";

const ProfileHeaderForm = () => {
  const {
    // Profile image
    profileImageUrl,
    profilePicInputRef,
    handleProfilePicUpload,

    // ✅ NEW: Cover image
    coverImageUrl,
    coverPicInputRef,
    handleCoverPicUpload,

    // Text content
    name,
    setName,
    title,
    setTitle,
    company,
    setCompany,
    jobTitle,
    setJobTitle,

    labelTextStyles,
    formInputStyles,
  } = useProfileForm();

  return (
    <div className="space-y-10 p-6 rounded-2xl">

      {/* ===================== COVER PHOTO ===================== */}
      <div className="space-y-2">
        <Label className={`${labelTextStyles} text-brand-dark`}>
          Cover Photo
        </Label>

        <div className="relative mt-6 w-full h-52 rounded-2xl overflow-hidden border-2 border-gray-200 shadow-md">

          <img
            src={coverImageUrl || "/cover-placeholder.png"}
            alt="Cover"
            className="h-full w-full object-cover"
          />

          <Input
            type="file"
            accept="image/jpeg, image/png"
            ref={coverPicInputRef}
            onChange={handleCoverPicUpload}
            className="sr-only"
            id="cover-pic-input"
          />

          <Label
            htmlFor="cover-pic-input"
            className="absolute inset-0 bg-black/40 flex items-center justify-center cursor-pointer hover:bg-black/50 transition-all"
          >
            <div className="flex items-center text-white font-medium">
              <Camera className="h-5 w-5 mr-2" />
              Change Cover Photo
            </div>
          </Label>
        </div>
      </div>

      {/* ===================== PROFILE PICTURE ===================== */}
      <div className="space-y-2">
        <Label className={`${labelTextStyles} text-brand-dark`}>
          Profile Picture
        </Label>

        <div className="flex items-center space-x-6 mt-6">
          <img
            src={profileImageUrl || "/profile-placeholder.png"}
            alt="Profile"
            className="h-28 w-28 rounded-full border-2 border-brand-dark-light object-cover"
          />

          <Input
            type="file"
            accept="image/jpeg, image/png"
            ref={profilePicInputRef}
            onChange={handleProfilePicUpload}
            className="sr-only"
            id="profile-pic-input"
          />

          <Button
            asChild
            variant="outline"
            className="w-auto rounded-2xl px-4 py-4 bg-brand-orange text-white hover:bg-brand-orange-dark"
          >
            <Label
              htmlFor="profile-pic-input"
              className="cursor-pointer flex items-center"
            >
              <Camera className="mr-2 h-5 w-5" />
              Upload Photo
            </Label>
          </Button>
        </div>
      </div>

      {/* ===================== FORM INPUTS ===================== */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Full Name */}
        <div className="space-y-1.5">
          <Label className={`${labelTextStyles} text-brand-dark`}>
            Full Name
          </Label>
          <Input
            placeholder="John Doe"
            className={`${formInputStyles} rounded-2xl px-4 py-5 border-2 mt-2 border-gray-200 shadow-md`}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Bio / Profession */}
        <div className="space-y-1.5">
          <Label className={`${labelTextStyles} text-brand-dark`}>
            Bio
          </Label>
          <Input
            placeholder="Creative Director"
            className={`${formInputStyles} rounded-2xl px-4 py-5 border-2 mt-2 border-gray-200 shadow-md`}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Company Name */}
        <div className="space-y-1.5">
          <Label className={`${labelTextStyles} text-brand-dark`}>
            Company Name
          </Label>
          <Input
            placeholder="Trueline"
            className={`${formInputStyles} rounded-2xl px-4 py-5 border-2 mt-2 border-gray-200 shadow-md`}
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
        </div>

        {/* Job Title */}
        <div className="space-y-1.5">
          <Label className={`${labelTextStyles} text-brand-dark`}>
            Job Title
          </Label>
          <Input
            placeholder="Director"
            className={`${formInputStyles} rounded-2xl px-4 py-5 border-2 mt-2 border-gray-200 shadow-md`}
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
          />
        </div>

      </div>
    </div>
  );
};

export default ProfileHeaderForm;
