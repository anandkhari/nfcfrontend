import React, { useState, useEffect } from "react";
import { useProfileForm } from "@/context/ProfileFormContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "lucide-react";

/* ------------------- UTIL FUNCTIONS ------------------- */

function isValidURL(string) {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
}

function normalizeLink(input, platform) {
  let value = input.trim();

  if (!value) return "";

  // Remove leading @
  if (value.startsWith("@")) {
    value = value.slice(1);
  }

  // If user didn't enter http/https, build platform link
  if (!value.startsWith("http://") && !value.startsWith("https://")) {
    switch (platform) {
      case "instagram":
        return `https://www.instagram.com/${value}`;
      case "linkedin":
        return `https://www.linkedin.com/in/${value}`;
      case "twitter":
        return `https://twitter.com/${value}`;
      case "facebook":
        return `https://www.facebook.com/${value}`;
      case "youtube":
        return `https://www.youtube.com/${value}`;
      case "website":
        return `https://${value}`;
      default:
        return `https://${value}`;
    }
  }

  return value;
}

/* ------------------- COMPONENT ------------------- */

const SocialModal = () => {
  const {
    isSocialModalOpen = false,
    closeSocialModal,
    platformToAdd,
    addContact,
    setSocials,
    SOCIAL_PLATFORMS = [],
    labelTextStyles,
    formInputStyles,
  } = useProfileForm();

  const [handle, setHandle] = useState("");
  const [link, setLink] = useState("");
  const [error, setError] = useState("");

  // Find platform data
  const platform = SOCIAL_PLATFORMS.find((p) => p.key === platformToAdd);
  const IconComponent = platform?.icon;

  const handleSubmit = () => {
    if (!platformToAdd) {
      setError("No platform selected.");
      return;
    }

    if (!link.trim()) {
      setError("Please provide a link or username.");
      return;
    }

    const finalLink = normalizeLink(link, platformToAdd);

    if (!isValidURL(finalLink)) {
      setError("Please enter a valid link or username.");
      return;
    }

    const newContact = {
      id: Date.now().toString(),
      platform: platformToAdd,
      handle: handle || "",
      link: finalLink,
    };

    addContact(setSocials, newContact);

    // Reset + close
    setHandle("");
    setLink("");
    setError("");

    closeSocialModal();
  };

  // Reset when modal opens
  useEffect(() => {
    if (isSocialModalOpen) {
      setHandle("");
      setLink("");
      setError("");
    }
  }, [isSocialModalOpen]);

  return (
    <Dialog open={!!isSocialModalOpen} onOpenChange={closeSocialModal}>
      <DialogContent className="sm:max-w-md rounded-2xl dark:bg-neutral-900">
        <DialogHeader>
          <DialogTitle className="flex items-center text-lg font-semibold text-neutral-900 dark:text-neutral-100">
            {IconComponent && (
              <IconComponent
                className="mr-2 h-5 w-5"
                style={{ color: platform?.color }}
              />
            )}
            Add {platform?.name || "Social Link"}
          </DialogTitle>

          <DialogDescription className="text-sm text-neutral-500 dark:text-neutral-400">
            Add your username or link for {platform?.name}.
          </DialogDescription>
        </DialogHeader>

        {/* ---------------- FORM ---------------- */}
        <div className="py-4 space-y-4">

          {/* Handle */}
          <div className="space-y-1.5">
            <Label className={labelTextStyles} htmlFor="handle">
              Handle / Username (optional)
            </Label>

            <Input
              id="handle"
              className={formInputStyles}
              value={handle}
              onChange={(e) => setHandle(e.target.value)}
              placeholder={`e.g. anand_k_hari`}
            />
          </div>

          {/* Link */}
          <div className="space-y-1.5">
            <Label className={labelTextStyles} htmlFor="link">
              Profile Link or Username
            </Label>

            <Input
              id="link"
              type="text"                 
              className={formInputStyles}
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder={
                platform?.key === "instagram"
                  ? "anand_k_hari or instagram.com/anand_k_hari"
                  : `Paste your ${platform?.name} link or username`
              }
            />
          </div>

          {/* Error */}
          {error && (
            <p className="pt-1 text-sm text-center text-destructive">
              {error}
            </p>
          )}
        </div>

        {/* ---------------- FOOTER ---------------- */}
        <DialogFooter className="pt-4">
          <Button
            onClick={handleSubmit}
            className="w-full rounded-full bg-[#FF4F00] text-white hover:bg-[#E04500] sm:w-auto"
          >
            <Link className="mr-2 h-4 w-4" />
            Add Link
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SocialModal;
