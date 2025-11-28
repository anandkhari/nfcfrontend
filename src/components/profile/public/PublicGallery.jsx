// src/components/profile/public/PublicGallery.jsx
import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * PublicGallery
 * Props:
 *  - images: array of image paths (may be relative, function that prefixes API_BASE_URL should be used by parent)
 *  - currentIndex, setCurrentIndex
 */
export default function PublicGallery({ images = [], currentIndex = 0, prev, next }) {
  if (!images || images.length === 0) return null;

  return (
    <div>
      <h2 className="mb-4 mt-6 border-b pb-2 text-xl font-semibold">Gallery</h2>
      <div className="relative mb-6 w-full overflow-hidden rounded-xl bg-gray-100 shadow-lg">
        <img src={images[currentIndex]} alt={`Gallery ${currentIndex + 1}`} className="h-64 w-full object-cover" />
        {images.length > 1 && (
          <>
            <Button size="icon" onClick={prev} className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 text-white"><ChevronLeft /></Button>
            <Button size="icon" onClick={next} className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 text-white"><ChevronRight /></Button>
          </>
        )}
      </div>
    </div>
  );
}
