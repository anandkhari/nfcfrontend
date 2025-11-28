import React from 'react';
import { useProfileForm } from '@/context/ProfileFormContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UploadCloud, X } from "lucide-react";

const GalleryModal = () => {
  const formContext = useProfileForm();
  if (!formContext) return null;

  const {
    isGalleryModalOpen,
    setGalleryModalOpen,
    galleryImages = [],
    removeGalleryImage,
    galleryInputRef,
    handleGalleryFileSelect,
    galleryImageFiles = [],
    MAX_IMAGES,
  } = formContext;

  return (
    <Dialog
      open={!!isGalleryModalOpen}
      onOpenChange={(val) => setGalleryModalOpen?.(val)} 
    >
      <DialogContent className="bg-transparent shadow-none">
        <DialogHeader>
          <DialogTitle>Manage Gallery Images</DialogTitle>
        </DialogHeader>

        {/* File Upload */}
        <Input
          type="file"
          id="file-upload"
          accept="image/*"
          multiple
          ref={galleryInputRef}
          className="sr-only"
          onChange={handleGalleryFileSelect}
        />

        <Button
          asChild
          className={`px-4 py-4 bg-brand-orange mt-6 text-white hover:bg-brand-orange-dark ${
            galleryImageFiles.length >= MAX_IMAGES ? 'opacity-50 pointer-events-none' : ''
          }`}
        >
          <Label htmlFor="file-upload" className="cursor-pointer flex items-center justify-center">
            <UploadCloud className="mr-2 h-4 w-4" /> Upload Images (Max {MAX_IMAGES})
          </Label>
        </Button>

        <p className="text-sm text-center text-muted-foreground mt-2">
          You have uploaded {galleryImageFiles.length} of {MAX_IMAGES} images.
        </p>

        {/* Image Grid */}
        <div className="mt-4 grid grid-cols-3 gap-3 max-h-64 overflow-y-auto p-1">
          {Array.isArray(galleryImages) &&
            galleryImages.map((src, index) => (
              <div key={`${src}-${index}`} className="relative group">
                <img
                  src={src}
                  alt={`Gallery preview ${index + 1}`}
                  className="w-full h-20 object-cover rounded-md border"
                />
                <Button
                  variant="destructive"
                  size="icon"
                  aria-label={`Delete image ${index + 1}`}
                  onClick={() => removeGalleryImage?.(index)}
                  className="absolute top-1 right-1 h-6 w-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ))}
        </div>

        <DialogFooter>
          <Button
            onClick={() => setGalleryModalOpen?.(false)}
            className="w-full rounded-soft-pill"
          >
            Done
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default GalleryModal;
