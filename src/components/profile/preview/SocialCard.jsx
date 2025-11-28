import React from "react";
import { useProfileForm } from "@/context/ProfileFormContext";

const SocialFooter = () => {
  const { socials = [], SOCIAL_PLATFORMS = [], socialsEnableText = false } =
    useProfileForm();

  if (!Array.isArray(socials) || socials.length === 0) {
    return <p className="text-gray-500 text-sm">No social links available</p>;
  }

  return (
    <div
      className={
        socialsEnableText
          ? "flex flex-col gap-2"
          : "flex flex-wrap gap-2 items-center justify-center"
      }
    >
      {socials.map((item) => {
        const platform = SOCIAL_PLATFORMS.find((p) => p.key === item.platform);
        if (!platform) return null;

        const Icon = platform.icon;

        // 🟢 Text enabled: card-like layout
        if (socialsEnableText) {
          return (
            <div
              key={item.id || item.platform}
              className="flex items-center gap-2 px-3 py-2 rounded-lg mt-4 bg-gray-50 border border-gray-100"
            >
              {Icon && (
                <Icon
                  className="w-4 h-4 flex-shrink-0"
                  style={{ color: platform.color, display: "block" }}
                />
              )}
              <div className="flex flex-col">
                <span className="text-xs font-medium text-gray-800">
                  {item.handle || item.link}
                </span>
                <span className="text-[10px] text-gray-500">
                  {platform.name}
                </span>
              </div>
            </div>
          );
        }

        // 🟣 Text disabled: footer-style icons
        return (
          <a
            key={item.id || item.platform}
            href={item.link || "#"}
            target="_blank"
            rel="noopener noreferrer"
            title={platform.name}
            className="
              flex items-center justify-center
              w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10
              rounded-full bg-gray-100
              hover:bg-gray-200 transition-colors
            "
          >
            {Icon && (
              <Icon
                className="w-4 h-4 sm:w-5 sm:h-5 md:w-5 md:h-5"
                style={{ color: platform.color, display: "block" }}
              />
            )}
          </a>
        );
      })}
    </div>
  );
};

export default SocialFooter;
