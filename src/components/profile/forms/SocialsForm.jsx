import React from "react";
import { useProfileForm } from "@/context/ProfileFormContext"; // Trying aliased path
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Trash2 } from "lucide-react";

// Base styles for reuse, matching Trueline/Shadcn aesthetic
const cardClasses =
  "bg-white rounded-xl shadow-sm border bg-gray-50 border-gray-100 p-4 md:p-4";
const labelClasses = "text-sm font-medium text-gray-700";
const inputClasses =
  "rounded-2xl px-4 py-3 border border-gray-200 shadow-sm h-12 focus-visible:ring-brand-orange"; // Using py-3 for balanced input height

const SocialsForm = () => {
  const formContext = useProfileForm();
  if (!formContext) return null;

  const {
    socials = [],
    setSocials,
    updateContact,
    removeContact,
    openSocialModal,
    SOCIAL_PLATFORMS = [],
    socialsEnableText,
    setSocialsEnableText,
  } = formContext;

  return (
    <div className="space-y-6">
      {/* 1. "Enable text" Toggle Section */}
      <div
        className={` flex items-center space-x-2 justify-end p-2 md:p-4`}
      >
        <Label htmlFor="enable-text" className={`${labelClasses} font-semibold`}>
          Enable Custom Text
        </Label>
        <div className="flex items-center space-x-3">
          <span
            className={`text-sm font-medium transition-colors ${
              socialsEnableText ? "text-orange-600" : "text-gray-500"
            }`}
            aria-hidden="true"
          >
            {socialsEnableText ? "On" : "Off"}
          </span>
          <Switch
            id="enable-text"
            checked={socialsEnableText}
            onCheckedChange={setSocialsEnableText}
            className="data-[state=checked]:bg-orange-600 focus-visible:ring-orange-600 data-[state=unchecked]:bg-gray-300"
          />
        </div>
      </div>

      {/* 2. Configured Social Links Section */}
      <div className="space-y-6">
        {Array.isArray(socials) && socials.length > 0 ? (
          socials.map((item, i) => {
            const platform = SOCIAL_PLATFORMS.find(
              (p) => p.key === item.platform
            );
            const IconComponent = platform?.icon;

            return (
              <div key={item.id || i} className={cardClasses}>
                {/* Card Header: Platform + Delete Action */}
                <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                  <span
                    className="flex items-center text-lg font-semibold"
                    style={{ color: platform?.color || "#000" }}
                  >
                    {IconComponent && (
                      <IconComponent className="mr-3 h-6 w-6" />
                    )}
                    {platform?.name || "Invalid Platform"}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 rounded-full text-gray-500 hover:text-destructive hover:bg-destructive/10 focus-visible:ring-destructive"
                    onClick={() => removeContact?.(setSocials, item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                {/* Card Body: Inputs (Responsive Grid) */}
                <div className="grid grid-cols-1 gap-4 pt-4 md:grid-cols-2">
                  {/* Link (URL) Input */}
                  <div className="space-y-2">
                    <Label
                      htmlFor={`link-${item.id}`}
                      className={labelClasses}
                    >
                      {platform?.key === "dribbble"
                        ? "User ID *"
                        : "URL / @ *"}
                    </Label>
                    <Input
                      id={`link-${item.id}`}
                      className={inputClasses}
                      type="text" // Use text to allow for "@username"
                      value={item.link}
                      onChange={(e) =>
                        updateContact?.(
                          setSocials,
                          item.id,
                          "link",
                          e.target.value
                        )
                      }
                      placeholder={
                        platform?.key === "twitter"
                          ? "https://twitter.com/username"
                          : "https://..."
                      }
                    />
                  </div>

                  {/* Handle / Display Text (CONDITIONAL) */}
                  {socialsEnableText && (
                    <div className="space-y-2">
                      <Label
                        htmlFor={`handle-${item.id}`}
                        className={labelClasses}
                      >
                        Title
                      </Label>
                      <Input
                        id={`handle-${item.id}`}
                        className={inputClasses}
                        value={item.handle}
                        onChange={(e) =>
                          updateContact?.(
                            setSocials,
                            item.id,
                            "handle",
                            e.target.value
                          )
                        }
                        placeholder="e.g., My Portfolio"
                      />
                    </div>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div
            className={`${cardClasses} flex items-center justify-center p-10`}
          >
            <p className="text-sm text-gray-500">No social links added yet.</p>
          </div>
        )}
      </div>

      {/* 3. "Add Section" Icon Grid */}
      <div className={cardClasses}>
        <Label className={`${labelClasses} text-base font-semibold`}>
          Add new social link
        </Label>
        <div className="grid grid-cols-4 gap-3 pt-6 sm:grid-cols-6 md:grid-cols-8">
          {SOCIAL_PLATFORMS.map((platform) => {
            const Icon = platform.icon;
            return (
    <Button
  key={platform.key}
  variant="outline"
  className="
    flex 
    h-14 w-14        
    items-center 
    justify-center 
    rounded-full 
    border border-gray-200 
    bg-white 
    shadow-sm 
    hover:border-gray-300 
    hover:bg-gray-900 
    focus-visible:ring-2 
    focus-visible:ring-brand-orange 
    transition-all 
    duration-200
  "
  onClick={() => {
  console.log("Clicked platform:", platform.key);
  openSocialModal(platform.key);
}}

>
  <Icon
    style={{ color: platform.color }}
    className="h-6 w-6"  /* Balanced size inside the button */
  />
</Button>

            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SocialsForm;

