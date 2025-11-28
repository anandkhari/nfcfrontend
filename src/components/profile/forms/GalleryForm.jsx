import React from 'react';
import { useProfileForm } from '@/context/ProfileFormContext';
import { Button } from "@/components/ui/button";
import { ImageIcon } from "lucide-react";

const GalleryForm = () => {
  const { setGalleryModalOpen } = useProfileForm();

  return (
    <>
      <p className="mb-4 text-sm text-muted-foreground">Upload and manage images directly from your system.</p>
      <Button onClick={() => setGalleryModalOpen(true)} className="w-auto rounded-2xl px-4 py-4 bg-brand-orange text-white hover:bg-brand-orange-dark">
        <ImageIcon className="mr-2 h-4 w-4" /> Manage Gallery
      </Button>
    </>
  );
};

export default GalleryForm;