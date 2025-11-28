import React, { useRef } from "react";
// 1. Import Checkbox component
import { Checkbox } from "@/components/ui/checkbox"; 
// 2. Import all required state hooks from context
import { useProfileForm } from "@/context/ProfileFormContext";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ChevronLeft, ChevronRight } from "lucide-react";

const templates = [
  { id: "template1", label: "Standard", thumbnail: "/template1.png" },
  { id: "template2", label: "Circle Image", thumbnail: "/template2.png" },
  { id: "template3", label: "Immersive", thumbnail: "/template3.png" },
  { id: "template4", label: "Modern", thumbnail: "/template4.png" },
  { id: "template5", label: "Minimal", thumbnail: "/template5.png" },

  // ⭐ Added Template 6
  { id: "template6", label: "Elegant Mask", thumbnail: "/template6.png" },
];


const TemplateLayoutForm = () => {
  // 3. Destructure the visibility states and setters from the context
  const { 
    template, 
    setTemplate,
    showGallery, 
    setShowGallery, 
    showSocials, 
    setShowSocials 
  } = useProfileForm();
  
  const scrollRef = useRef(null);

  const scrollTemplates = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 200;
      scrollRef.current.scrollBy({
        left: direction * scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="w-full">
      
      {/* --- Template Selection Section --- */}
      <h2 className="mb-6 p-2 text-[16px] font-semibold text-text-primary">
        Select Profile Template
      </h2>

      <div className="grid grid-cols-[auto_1fr_auto] items-center gap-2">
        <button
          onClick={() => scrollTemplates(-1)}
          className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-opacity opacity-75 hover:opacity-100"
        >
          <ChevronLeft className="h-5 w-5 text-gray-700" />
        </button>

        <div
          ref={scrollRef}
          className="overflow-x-auto hide-scrollbar py-2"
        >
          <RadioGroup
            value={template}
            onValueChange={setTemplate}
            className="flex space-x-4"
          >
            {templates.map((t) => (
              <Label
                key={t.id}
                htmlFor={t.id}
                className={`
                  flex-shrink-0 flex flex-col cursor-pointer rounded-2xl border-2 
                  overflow-hidden transition-all duration-200
                  w-48 
                  hover:border-brand-orange
                  ${
                    template === t.id
                      ? "border-brand-orange ring-2 ring-brand-orange/30 bg-orange-50"
                      : "border-gray-200 bg-white"
                  }
                `}
              >
                <RadioGroupItem value={t.id} id={t.id} className="sr-only" />
                <img
                  src={t.thumbnail}
                  alt={t.label}
                  className="w-full h-64 object-fit"
                />
                <span className="w-full p-1 text-center text-sm font-medium text-gray-800">
                  {t.label}
                </span>
              </Label>
            ))}
          </RadioGroup>
        </div>

        <button
          onClick={() => scrollTemplates(1)}
          className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-opacity opacity-75 hover:opacity-100"
        >
          <ChevronRight className="h-5 w-5 text-gray-700" />
        </button>
      </div>

      <div className="mt-8 pt-4 border-t border-gray-200">
        {/* --- Section Visibility Controls --- */}
        <h2 className="mb-4 text-[16px] font-semibold text-text-primary">
          Section Visibility
        </h2>
        
        <div className="space-y-3">
          {/* Gallery Visibility */}
          <div className="flex items-center space-x-3">
            <Checkbox 
              id="show-gallery" 
              checked={showGallery} 
              onCheckedChange={setShowGallery} 
            />
            <Label htmlFor="show-gallery" className="cursor-pointer text-sm font-normal">
              Show Gallery Section
            </Label>
          </div>
          
          {/* Socials Visibility */}
          <div className="flex items-center space-x-3">
            <Checkbox 
              id="show-socials" 
              checked={showSocials} 
              onCheckedChange={setShowSocials} 
            />
            <Label htmlFor="show-socials" className="cursor-pointer text-sm font-normal">
              Show Social Media Links
            </Label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateLayoutForm;