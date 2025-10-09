import React, { useState, useEffect, useMemo, useRef } from "react";
import { useNavigate } from 'react-router-dom';  

// --- Shadcn/ui Imports ---
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

// --- Icon Imports ---
import { FaInstagram, FaFacebookF, FaYoutube, FaLinkedinIn, FaTwitter, FaTelegram } from "react-icons/fa";
import {
    Layers, Palette, UserCircle, Contact, Images as ImagesIcon, Share2, CheckCircle, Plus, Trash2, Camera, UploadCloud, Link, X, Image as ImageIcon, Save, Smartphone, ChevronLeft, ChevronRight, UserPlus, Globe, MapPin, Building, Phone, Mail
} from "lucide-react";

// --- Constants ---
const SOCIAL_PLATFORMS = [
    { key: "instagram", name: "Instagram", icon: FaInstagram, color: "#E4405F" },
    { key: "facebook", name: "Facebook", icon: FaFacebookF, color: "#1877F2" },
    { key: "youtube", name: "YouTube", icon: FaYoutube, color: "#FF0000" },
    { key: "linkedin", name: "LinkedIn", icon: FaLinkedinIn, color: "#0A66C2" },
    { key: "twitter", name: "Twitter (X)", icon: FaTwitter, color: "#000000" },
    { key: "telegram", name: "Telegram", icon: FaTelegram, color: "#2AABEE" },
];
const PHONE_TYPES = [ { label: "Personal", icon: UserCircle }, { label: "Work", icon: Building }, { label: "Mobile", icon: Smartphone }];
const MAX_IMAGES = 5;
const API_ENDPOINT = "http://localhost:3000/api/profile";
const formInputStyles = "h-10 rounded-lg border bg-canvas-gray focus:border-action-blue focus:ring-2 focus:ring-blue-500/20";
const labelTextStyles = "text-sm font-medium text-gray-600";

// --- Main Component ---
const CreateProfile = () => {
    // --- State ---
    const [openAccordion, setOpenAccordion] = useState("template-layout");
  const [template, setTemplate] = useState("template2");
  const [showGallery, setShowGallery] = useState(true);
  const [showSocials, setShowSocials] = useState(true);
  const [primaryColor, setPrimaryColor] = useState("#007A8A");
  const [accentColor, setAccentColor] = useState("#00AEEF");
  const [iconColor, setIconColor] = useState("#00AEEF");
  const [titleTextColor, setTitleTextColor] = useState("#FFFFFF");
  const [bioTextColor, setBioTextColor] = useState("#E5E7EB");
  const [fontFamily, setFontFamily] = useState("'Inter', sans-serif");

  const [profileImageUrl, setProfileImageUrl] = useState(
    "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=800&auto=format&fit=crop"
  );
  const [name, setName] = useState("John Doe");
  const [title, setTitle] = useState("Software Engineer & Blogger");
  const [company, setCompany] = useState("TechCorp Solutions");
  const [jobTitle, setJobTitle] = useState("Senior Developer");

  const [phones, setPhones] = useState([
    { id: Date.now(), type: "Mobile", number: "+1234567890" },
    { id: Date.now() + 1, type: "Work", number: "+0987654321" },
  ]);

  const [emails, setEmails] = useState([
    { id: Date.now() + 2, type: "Personal", address: "john.doe@example.com" },
    { id: Date.now() + 3, type: "Work", address: "john.doe@techcorp.com" },
  ]);

  const [website, setWebsite] = useState("https://www.techcorp.com");
  const [address, setAddress] = useState("123 Tech Street, Silicon Valley, CA");
  const [addressLink, setAddressLink] = useState(
    "https://maps.google.com/?q=Silicon+Valley"
  );

  const [galleryImages, setGalleryImages] = useState([
    "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800&auto=format&fit=crop",
  ]);

  const [socials, setSocials] = useState([
    { id: Date.now() + 5, platform: "instagram", link: "https://instagram.com/john_doe", handle: "@john_doe" },
    { id: Date.now() + 6, platform: "linkedin", link: "https://linkedin.com/in/johndoe", handle: "/in/johndoe" },
    { id: Date.now() + 7, platform: "twitter", link: "https://twitter.com/john_doe", handle: "@john_doe" },
  ]);
    // --- ADDED: State for raw file objects ---
    const [profileImageFile, setProfileImageFile] = useState(null);
    const [galleryImageFiles, setGalleryImageFiles] = useState([]);

    // --- Unchanged state ---
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isGalleryModalOpen, setGalleryModalOpen] = useState(false);
    const [isSocialModalOpen, setSocialModalOpen] = useState(false);
    const [socialPlatform, setSocialPlatform] = useState("");
    const [socialHandle, setSocialHandle] = useState("");
    const [socialLink, setSocialLink] = useState("");
    const [socialError, setSocialError] = useState("");
    const [isMobilePreviewOpen, setMobilePreviewOpen] = useState(false);
    const [vcfUrl, setVcfUrl] = useState("#");

    const profilePicInputRef = useRef(null);
    const galleryInputRef = useRef(null);

    // --- UPDATED: File Input Handlers ---
    const handleProfilePicUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setProfileImageFile(file); // Store the raw file object
        setProfileImageUrl(URL.createObjectURL(file)); // Update preview URL
    };

    const handleGalleryFileSelect = (e) => {
        const files = Array.from(e.target.files);
        const remainingSlots = MAX_IMAGES - galleryImageFiles.length;
        const filesToProcess = files.slice(0, remainingSlots);
        if (filesToProcess.length === 0) return;

        setGalleryImageFiles(prev => [...prev, ...filesToProcess]); // Store raw file objects
        const newPreviewUrls = filesToProcess.map(file => URL.createObjectURL(file));
        setGalleryImages(prev => [...prev, ...newPreviewUrls]); // Update preview URLs
    };

    const removeGalleryImage = (index) => {
        setGalleryImages(prev => prev.filter((_, i) => i !== index));
        setGalleryImageFiles(prev => prev.filter((_, i) => i !== index)); // Keep files in sync
        if (currentImageIndex >= galleryImages.length - 1) {
            setCurrentImageIndex(0);
        }
    };

const navigate = useNavigate();  

const handleSave = async () => {
    const formData = new FormData();
    const dataToSubmit = {
        template, showGallery, showSocials, primaryColor, accentColor, iconColor,
        titleTextColor, bioTextColor, fontFamily, name, title, company, jobTitle,
        phones, emails, website, address, addressLink, socials
    };
    formData.append('data', JSON.stringify(dataToSubmit));

    if (profileImageFile) formData.append('profileImage', profileImageFile);
    galleryImageFiles.forEach(file => formData.append('galleryImages', file));

    console.log("Submitting FormData to backend...");

    try {
        const response = await fetch(API_ENDPOINT, {
            method: 'POST',
            body: formData,
            credentials: 'include',
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const result = await response.json();
        console.log('Success!', result);

      if (result.profile?._id) {
   navigate(`/profile-link/${result.profile._id}`, { state: { action: 'created' } });
} else {
  console.error("Profile saved, but no _id returned:", result);
}

    } catch (error) {
        console.error('Error saving profile:', error);

        // This error handling is good, so we'll keep it
        if (error.message.includes('401')) {
            alert("Session expired. Please log in again.");
            window.location.href = "/login";
        } else {
            alert("Error saving profile. See console for details.");
        }
    }
};


    // --- Unchanged Logic ---
    const nextImage = () => galleryImages.length && setCurrentImageIndex(prev => (prev + 1) % galleryImages.length);
    const prevImage = () => galleryImages.length && setCurrentImageIndex(prev => (prev - 1 + galleryImages.length) % galleryImages.length);
    const updateContact = (listSetter, id, key, value) => {
        listSetter(prev => prev.map(item => item.id === id ? { ...item, [key]: value } : item));
    };
    const addContact = (listSetter, newItem) => {
        listSetter(prev => [...prev, { id: Date.now() + Math.random(), ...newItem }]);
    };
    const removeContact = (listSetter, id) => {
        listSetter(prev => prev.filter(item => item.id !== id));
    };
    const openSocialModal = () => {
        setSocialPlatform("");
        setSocialHandle("");
        setSocialLink("");
        setSocialError("");
        setSocialModalOpen(true);
    }
    const commitSocialEntry = () => {
        if (!socialPlatform || !socialLink) {
            setSocialError("Please select a platform and provide a full link/URL.");
            return;
        }
        let finalLink = socialLink.trim();
        if (finalLink && !finalLink.match(/^https?:\/\//i)) {
            finalLink = "https://" + finalLink;
        }
        addContact(setSocials, { platform: socialPlatform, link: finalLink, handle: socialHandle || socialPlatform });
        setSocialModalOpen(false);
    };

    // --- Side Effects (with cleanup for Object URLs) ---
    useEffect(() => {
        const [firstName, ...lastNameParts] = name.split(" ");
        let vcfContent = `BEGIN:VCARD\nVERSION:3.0\nN:${lastNameParts.join(" ")};${firstName};;;\nFN:${name}\n`;
        if (company) vcfContent += `ORG:${company}\n`;
        if (jobTitle) vcfContent += `TITLE:${jobTitle}\n`;
        phones.forEach(p => p.number && (vcfContent += `TEL;TYPE=${p.type.toUpperCase()},VOICE:${p.number}\n`));
        emails.forEach(e => e.address && (vcfContent += `EMAIL;TYPE=${e.type.toUpperCase()}:${e.address}\n`));
        socials.forEach(s => s.link && (vcfContent += `URL;TYPE=${s.platform.toUpperCase()}:${s.link}\n`));
        if (website) vcfContent += `URL;TYPE=WEBSITE:${website}\n`;
        if (address) vcfContent += `ADR;TYPE=WORK:;;${address};;;;\n`;
        vcfContent += "END:VCARD";
        const blob = new Blob([vcfContent], { type: "text/vcard;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        setVcfUrl(url);

        return () => {
            URL.revokeObjectURL(url);
            if (profileImageUrl && profileImageUrl.startsWith('blob:')) {
                URL.revokeObjectURL(profileImageUrl);
            }
            galleryImages.forEach(gUrl => {
                if (gUrl.startsWith('blob:')) {
                    URL.revokeObjectURL(gUrl);
                }
            });
        };
    }, [name, company, jobTitle, phones, emails, socials, website, address, profileImageUrl, galleryImages]);

    // --- Unchanged Derived State & Memos ---
    const availablePlatforms = useMemo(() => {
        const addedPlatforms = new Set(socials.map(s => s.platform));
        return SOCIAL_PLATFORMS.filter(p => !addedPlatforms.has(p.key));
    }, [socials]);

    const previewStyle = {
        '--primary-color': primaryColor,
        '--accent-color': accentColor,
        '--icon-colour': iconColor,
        '--title-colour': titleTextColor,
        '--bio-colour': bioTextColor,
        fontFamily: fontFamily,
    };

    // --- Unchanged Render Logic ---
    const isImmersive = template === 'template3';
    const contactItems = [
        ...phones.filter(p => p.number).map(p => ({ id: p.id, href: `tel:${p.number}`, icon: PHONE_TYPES.find(t => t.label === p.type)?.icon || Phone, value: p.number, type: `${p.type} Phone` })),
        ...emails.filter(e => e.address).map(e => ({ id: e.id, href: `mailto:${e.address}`, icon: Mail, value: e.address, type: `${e.type} Email` })),
        { id: 'website', href: website, icon: Globe, value: website, type: "Portfolio Website" },
        { id: 'address', href: addressLink, icon: MapPin, value: address, type: "View on Google Maps" },
        { id: 'company', icon: Building, value: company, type: jobTitle },
    ];
    const renderHeader = () => {
        const commonProps = { name, title, addressLink, firstPhone: phones[0]?.number, firstEmail: emails[0]?.address };
        switch (template) {
            case "template1": return <Template1Header {...commonProps} profileImageUrl={profileImageUrl} />;
            case "template3": return <Template3Header {...commonProps} profileImageUrl={profileImageUrl} />;
            case "template2":
            default:
                return <Template2Header {...commonProps} profileImageUrl={profileImageUrl} />;
        }
    };

    return (
        <div className="min-h-screen bg-canvas-gray font-sans text-text-primary lg:h-screen lg:overflow-hidden">
            {/* --- Modals --- */}
            <Dialog open={isGalleryModalOpen} onOpenChange={setGalleryModalOpen}>
                <DialogContent>
                    <DialogHeader><DialogTitle>Manage Gallery Images</DialogTitle></DialogHeader>
                    <Input type="file" id="file-upload" accept="image/*" multiple ref={galleryInputRef} className="sr-only" onChange={handleGalleryFileSelect} />
                    <Button asChild className={`w-full rounded-soft-pill ${galleryImageFiles.length >= MAX_IMAGES ? 'opacity-50 pointer-events-none' : ''}`}>
                        <Label htmlFor="file-upload" className="cursor-pointer"><UploadCloud className="mr-2 h-4 w-4" /> Upload Images (Max {MAX_IMAGES})</Label>
                    </Button>
                    <p className="text-sm text-center text-muted-foreground">You have uploaded {galleryImageFiles.length} of {MAX_IMAGES} images.</p>
                    <div className="mt-4 grid grid-cols-3 gap-3 max-h-64 overflow-y-auto p-1">
                        {galleryImages.map((src, index) => (
                            <div key={src} className="relative group">
                                <img src={src} alt={`Preview ${index + 1}`} className="w-full h-20 object-cover rounded-md border" />
                                <Button variant="destructive" size="icon" onClick={() => removeGalleryImage(index)} className="absolute top-1 right-1 h-6 w-6 rounded-full opacity-0 group-hover:opacity-100">
                                    <X className="h-3 w-3" />
                                </Button>
                            </div>
                        ))}
                    </div>
                    <DialogFooter>
                        <Button onClick={() => setGalleryModalOpen(false)} className="w-full rounded-soft-pill">Done</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog open={isSocialModalOpen} onOpenChange={setSocialModalOpen}>
                <DialogContent>
                    <DialogHeader><DialogTitle>Add Social Link</DialogTitle></DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-1.5">
                            <Label className={labelTextStyles}>Platform</Label>
                            <Select value={socialPlatform} onValueChange={setSocialPlatform}>
                                <SelectTrigger className={formInputStyles}><SelectValue placeholder="-- Select a Platform --" /></SelectTrigger>
                                <SelectContent>
                                    {availablePlatforms.map(p => <SelectItem key={p.key} value={p.key}>{p.name}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-1.5">
                            <Label className={labelTextStyles}>Handle or User ID</Label>
                            <Input className={formInputStyles} value={socialHandle} onChange={e => setSocialHandle(e.target.value)} placeholder="e.g., anand_hari_actor" />
                        </div>
                        <div className="space-y-1.5">
                            <Label className={labelTextStyles}>Full Link/URL</Label>
                            <Input className={formInputStyles} type="url" value={socialLink} onChange={e => setSocialLink(e.target.value)} placeholder="e.g., https://instagram.com/anand_hari_actor" />
                        </div>
                        {socialError && <p className="text-sm text-destructive text-center">{socialError}</p>}
                    </div>
                    <DialogFooter>
                        <Button onClick={commitSocialEntry} className="w-full rounded-soft-pill"><Link className="mr-2 h-4 w-4" /> Add Link</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* --- Main Layout --- */}
            <div className="mx-auto w-full max-w-7xl p-4 md:p-8 lg:h-full">
                <div className="flex flex-col gap-8 lg:h-full lg:flex-row">
                    {/* --- Form Column --- */}
                    <div className={`flex w-full flex-col rounded-xl bg-white shadow-lg lg:h-full lg:w-2/3 ${isMobilePreviewOpen ? 'hidden' : ''}`}>
                        <div className="p-6">
                            <h1 className="border-b border-canvas-gray pb-4 text-3xl font-extrabold text-brand-teal">Profile Configuration</h1>
                        </div>
                        <div className="flex-grow overflow-y-auto px-6">
                            <div className="space-y-8 pb-6">
                                <div className="flex items-center rounded-lg bg-success-green p-3 text-sm font-semibold text-white shadow-md">
                                    <CheckCircle className="mr-3 h-5 w-5" />
                                    Profile Status: <strong>Active</strong> | Last Synced: Just now
                                </div>

                                <Accordion type="single" collapsible value={openAccordion} onValueChange={setOpenAccordion} className="w-full space-y-4">
                                    <StyledAccordionItem value="template-layout" icon={Layers} title="1. Template & Layout">
                                        <h2 className="mb-4 text-[16px] font-semibold text-text-primary">Select Profile Template</h2>
                                        <RadioGroup value={template} onValueChange={setTemplate} className="grid grid-cols-3 gap-3">
                                            {[{id: 'template1', label: 'Standard'}, {id: 'template2', label: 'Circle Image'}, {id: 'template3', label: 'Immersive'}].map(t => (
                                                <div key={t.id}>
                                                    <RadioGroupItem value={t.id} id={t.id} className="sr-only" />
                                                    <Label htmlFor={t.id} className={`block cursor-pointer rounded-soft-pill border-2 p-3 text-center font-medium transition hover:border-brand-teal ${template === t.id ? 'border-brand-teal' : 'border-gray-300'}`}>{t.label}</Label>
                                                </div>
                                            ))}
                                        </RadioGroup>
                                        <h2 className="mb-4 mt-6 border-t border-canvas-gray pt-4 text-[16px] font-semibold text-text-primary">Section Visibility</h2>
                                        <div className="space-y-3">
                                            <div className="flex items-center space-x-3"><Checkbox id="show-gallery" checked={showGallery} onCheckedChange={setShowGallery} /><Label htmlFor="show-gallery" className="cursor-pointer text-sm font-normal">Show Gallery Section</Label></div>
                                            <div className="flex items-center space-x-3"><Checkbox id="show-socials" checked={showSocials} onCheckedChange={setShowSocials} /><Label htmlFor="show-socials" className="cursor-pointer text-sm font-normal">Show Social Media Links</Label></div>
                                        </div>
                                    </StyledAccordionItem>

                                    <StyledAccordionItem value="theme-colors" icon={Palette} title="2. Theme & Colors">
                                        <div className="grid grid-cols-2 gap-x-4 gap-y-6">
                                            <div className="space-y-1.5">
                                                <Label className={labelTextStyles}>Primary Color</Label>
                                                <div className="flex items-center space-x-2">
                                                    <Input type="color" value={primaryColor} onChange={e => setPrimaryColor(e.target.value)} className="h-10 w-10 cursor-pointer rounded-md border-none bg-transparent p-0" />
                                                    <Input value={primaryColor.toUpperCase()} onChange={e => setPrimaryColor(e.target.value)} className={formInputStyles} />
                                                </div>
                                            </div>
                                            <div className="space-y-1.5">
                                                <Label className={labelTextStyles}>Accent Color</Label>
                                                <div className="flex items-center space-x-2">
                                                    <Input type="color" value={accentColor} onChange={e => setAccentColor(e.target.value)} className="h-10 w-10 cursor-pointer rounded-md border-none bg-transparent p-0" />
                                                    <Input value={accentColor.toUpperCase()} onChange={e => setAccentColor(e.target.value)} className={formInputStyles} />
                                                </div>
                                            </div>
                                            <div className="col-span-2 space-y-1.5">
                                                <Label className={labelTextStyles}>Icon Color</Label>
                                                <div className="flex items-center space-x-2">
                                                    <Input type="color" value={iconColor} onChange={e => setIconColor(e.target.value)} className="h-10 w-10 cursor-pointer rounded-md border-none bg-transparent p-0" />
                                                    <Input value={iconColor.toUpperCase()} onChange={e => setIconColor(e.target.value)} className={formInputStyles} />
                                                </div>
                                            </div>
                                            <div className="space-y-1.5">
                                                <Label className={labelTextStyles}>Title Text Color</Label>
                                                <div className="flex items-center space-x-2">
                                                    <Input type="color" value={titleTextColor} onChange={e => setTitleTextColor(e.target.value)} className="h-10 w-10 cursor-pointer rounded-md border-none bg-transparent p-0" />
                                                    <Input value={titleTextColor.toUpperCase()} onChange={e => setTitleTextColor(e.target.value)} className={formInputStyles} />
                                                </div>
                                            </div>
                                            <div className="space-y-1.5">
                                                <Label className={labelTextStyles}>Bio Text Color</Label>
                                                <div className="flex items-center space-x-2">
                                                    <Input type="color" value={bioTextColor} onChange={e => setBioTextColor(e.target.value)} className="h-10 w-10 cursor-pointer rounded-md border-none bg-transparent p-0" />
                                                    <Input value={bioTextColor.toUpperCase()} onChange={e => setBioTextColor(e.target.value)} className={formInputStyles} />
                                                </div>
                                            </div>
                                            <div className="col-span-2 space-y-1.5">
                                                <Label className={labelTextStyles}>Font Style</Label>
                                                <Select value={fontFamily} onValueChange={setFontFamily}>
                                                    <SelectTrigger className={formInputStyles}><SelectValue /></SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="'Inter', sans-serif">Inter (Default)</SelectItem>
                                                        <SelectItem value="'Roboto', sans-serif">Roboto</SelectItem>
                                                        <SelectItem value="'Playfair Display', serif">Playfair Display</SelectItem>
                                                        <SelectItem value="'Oswald', sans-serif">Oswald</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>
                                    </StyledAccordionItem>
                                    
                                    <StyledAccordionItem value="profile-header" icon={UserCircle} title="3. Profile & Header Info">
                                        <div className="space-y-6">
                                            <div className="space-y-2">
                                                <Label className={labelTextStyles}>Profile Picture</Label>
                                                <div className="flex items-center space-x-4">
                                                    <img src={profileImageUrl} className="h-16 w-16 rounded-full border-2 border-canvas-gray object-cover" />
                                                    <Input type="file" accept="image/jpeg, image/png" ref={profilePicInputRef} onChange={handleProfilePicUpload} className="sr-only" id="profile-pic-input" />
                                                    <Button asChild variant="outline" className="rounded-soft-pill border-brand-teal text-brand-teal hover:bg-brand-teal/5 hover:text-brand-teal">
                                                        <Label htmlFor="profile-pic-input" className="cursor-pointer"><Camera className="mr-2 h-4 w-4" /> Upload Photo</Label>
                                                    </Button>
                                                </div>
                                            </div>
                                            <div className="space-y-1.5">
                                                <Label className={labelTextStyles}>Full Name</Label>
                                                <Input className={formInputStyles} value={name} onChange={e => setName(e.target.value)} />
                                            </div>
                                            <div className="space-y-1.5">
                                                <Label className={labelTextStyles}>Title / Profession</Label>
                                                <Input className={formInputStyles} value={title} onChange={e => setTitle(e.target.value)} />
                                            </div>
                                            <div className="space-y-1.5">
                                                <Label className={labelTextStyles}>Company Name</Label>
                                                <Input className={formInputStyles} value={company} onChange={e => setCompany(e.target.value)} />
                                            </div>
                                            <div className="space-y-1.5">
                                                <Label className={labelTextStyles}>Job Title</Label>
                                                <Input className={formInputStyles} value={jobTitle} onChange={e => setJobTitle(e.target.value)} />
                                            </div>
                                        </div>
                                    </StyledAccordionItem>

                                    <StyledAccordionItem value="contact-details" icon={Contact} title="4. Key Contact Details">
                                        <div className="space-y-6">
                                            <div className="space-y-4">
                                                <h3 className="text-base font-semibold text-text-primary">Phone Numbers</h3>
                                                {phones.map((item, index) => (
                                                    <div key={item.id} className="rounded-lg border bg-canvas-gray/50 p-4">
                                                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-2">
                                                            <div className="space-y-1.5">
                                                                <Label htmlFor={`phone-number-${item.id}`} className={labelTextStyles}>Phone Number {index + 1}</Label>
                                                                <Input id={`phone-number-${item.id}`} type="tel" value={item.number} onChange={e => updateContact(setPhones, item.id, 'number', e.target.value)} className={formInputStyles} placeholder="e.g., +1 555 123 4567" />
                                                            </div>
                                                            <div className="space-y-1.5">
                                                                <Label htmlFor={`phone-type-${item.id}`} className={labelTextStyles}>Type</Label>
                                                                <div className="flex items-center space-x-2">
                                                                    <Select value={item.type} onValueChange={val => updateContact(setPhones, item.id, 'type', val)}>
                                                                        <SelectTrigger id={`phone-type-${item.id}`} className={`${formInputStyles} w-full`}><SelectValue /></SelectTrigger>
                                                                        <SelectContent>
                                                                            {PHONE_TYPES.map(t => <SelectItem key={t.label} value={t.label}>{t.label}</SelectItem>)}
                                                                        </SelectContent>
                                                                    </Select>
                                                                    <Button variant="ghost" size="icon" className="shrink-0 rounded-full text-gray-500 hover:bg-destructive/10 hover:text-destructive" onClick={() => removeContact(setPhones, item.id)}><Trash2 className="h-4 w-4" /></Button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                                <Button onClick={() => addContact(setPhones, { type: "Mobile", number: "" })} variant="outline" className="w-full rounded-soft-pill"><Plus className="mr-2 h-4 w-4" /> Add Phone Number</Button>
                                            </div>
                                            <hr className="border-canvas-gray/60" />
                                            <div className="space-y-4">
                                                <h3 className="text-base font-semibold text-text-primary">Email Addresses</h3>
                                                {emails.map((item, index) => (
                                                     <div key={item.id} className="rounded-lg border bg-canvas-gray/50 p-4">
                                                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-2">
                                                            <div className="space-y-1.5">
                                                                <Label htmlFor={`email-address-${item.id}`} className={labelTextStyles}>Email Address {index + 1}</Label>
                                                                <Input id={`email-address-${item.id}`} type="email" value={item.address} onChange={e => updateContact(setEmails, item.id, 'address', e.target.value)} className={formInputStyles} placeholder="email@example.com" />
                                                            </div>
                                                            <div className="space-y-1.5">
                                                                <Label htmlFor={`email-type-${item.id}`} className={labelTextStyles}>Type</Label>
                                                                <div className="flex items-center space-x-2">
                                                                    <Input id={`email-type-${item.id}`} value={item.type} onChange={e => updateContact(setEmails, item.id, 'type', e.target.value)} className={`${formInputStyles} w-full`} placeholder="e.g., Personal" />
                                                                    <Button variant="ghost" size="icon" className="shrink-0 rounded-full text-gray-500 hover:bg-destructive/10 hover:text-destructive" onClick={() => removeContact(setEmails, item.id)}><Trash2 className="h-4 w-4" /></Button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                                <Button onClick={() => addContact(setEmails, { type: "Personal", address: "" })} variant="outline" className="w-full rounded-soft-pill"><Plus className="mr-2 h-4 w-4" /> Add Email Address</Button>
                                            </div>
                                            <hr className="border-canvas-gray/60" />
                                            <div className="space-y-1.5">
                                                <Label className={labelTextStyles}>Website URL</Label>
                                                <Input className={formInputStyles} type="url" value={website} onChange={e => setWebsite(e.target.value)} />
                                            </div>
                                            <div className="space-y-1.5">
                                                <Label className={labelTextStyles}>Address / Location</Label>
                                                <Input className={formInputStyles} value={address} onChange={e => setAddress(e.target.value)} />
                                            </div>
                                            <div className="space-y-1.5">
                                                <Label className={labelTextStyles}>Google Maps Link</Label>
                                                <Input className={formInputStyles} type="url" value={addressLink} onChange={e => setAddressLink(e.target.value)} />
                                            </div>
                                        </div>
                                    </StyledAccordionItem>

                                    {showGallery && <StyledAccordionItem value="gallery" icon={ImagesIcon} title="5. Gallery Images">
                                        <p className="mb-4 text-sm text-muted-foreground">Upload and manage images directly from your system.</p>
                                        <Button onClick={() => setGalleryModalOpen(true)} className="w-full rounded-soft-pill"><ImageIcon className="mr-2 h-4 w-4" /> Manage Gallery</Button>
                                    </StyledAccordionItem>}

                                    {showSocials && <StyledAccordionItem value="socials" icon={Share2} title="6. Social Media & Links">
                                        <div className="space-y-6">
                                            <Label className={labelTextStyles}>Configured Social Links</Label>
                                            <div className="space-y-4">
                                                {socials.map(item => {
                                                    const platform = SOCIAL_PLATFORMS.find(p => p.key === item.platform);
                                                    return (
                                                        <div key={item.id} className="space-y-4 rounded-lg border bg-background p-4 shadow-sm">
                                                            <div className="flex items-center justify-between border-b pb-3">
                                                                <span className="flex items-center text-sm font-semibold" style={{ color: platform?.color }}>
                                                                    {platform?.icon && <platform.icon className="mr-2" />} {platform?.name}
                                                                </span>
                                                                <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full text-gray-500 hover:text-destructive hover:bg-destructive/10" onClick={() => removeContact(setSocials, item.id)}><Trash2 className="h-4 w-4" /></Button>
                                                            </div>
                                                            <div className="space-y-1.5">
                                                                <Label className={labelTextStyles}>Handle / Display Text</Label>
                                                                <Input className={formInputStyles} value={item.handle} onChange={e => updateContact(setSocials, item.id, 'handle', e.target.value)} />
                                                            </div>
                                                            <div className="space-y-1.5">
                                                                <Label className={labelTextStyles}>Full Link (URL)</Label>
                                                                <Input className={formInputStyles} type="url" value={item.link} onChange={e => updateContact(setSocials, item.id, 'link', e.target.value)} />
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                            <Button onClick={openSocialModal} className="w-full rounded-soft-pill"><Plus className="mr-2 h-4 w-4" /> Add Social Link</Button>
                                        </div>
                                    </StyledAccordionItem>}
                                </Accordion>
                            </div>
                        </div>
                        <div className="border-t border-canvas-gray p-6">
                            <Button onClick={handleSave} className="h-12 w-full rounded-soft-pill py-3 text-base font-bold"><Save className="mr-2 h-5 w-5" />Create Profile</Button>
                        </div>
                    </div>

                    {/* --- Right Column (Preview) --- */}
                    <div className={`relative w-full transition-all duration-300 lg:flex lg:h-full lg:w-1/3 lg:justify-end lg:pt-8 ${isMobilePreviewOpen ? 'fixed inset-0 z-50 flex flex-col items-center justify-start bg-page-bg p-4' : 'hidden'}`}>
                        <Button onClick={() => setMobilePreviewOpen(false)} variant="ghost" size="icon" className="absolute right-4 top-4 z-[60] rounded-full bg-white shadow-xl lg:hidden"><X className="h-5 w-5" /></Button>
                        <div id="preview-card" style={previewStyle} className={`relative mx-auto w-full max-w-sm overflow-y-auto rounded-3xl border border-[rgba(15,23,36,0.06)] shadow-xl ${isMobilePreviewOpen ? 'h-full w-full max-w-full' : 'h-[700px] lg:h-full'} ${isImmersive ? 'bg-transparent' : 'bg-white'}`}>
                            {renderHeader()}
                            <div className="relative z-10 space-y-4 p-6" style={{ backgroundColor: isImmersive ? primaryColor : '' }}>
                                <div className="mb-8 space-y-4 text-left">
                                    <h2 className="mb-3 border-b pb-2 text-xl font-semibold" style={{ color: isImmersive ? '#FFF' : 'var(--text-primary)', borderColor: isImmersive ? 'rgba(255,255,255,0.3)' : 'var(--canvas-gray)' }}>My Contact Details</h2>
                                    <div className="space-y-3">
                                        {contactItems.filter(c => c.value).map((item, index) => <ContactCard key={item.id} {...item} alternate={index % 2 !== 0} isImmersive={isImmersive} />)}
                                    </div>
                                </div>

                                {showGallery && <div id="preview-gallery-section">
                                    <h2 className="mb-4 mt-8 border-b pb-2 text-xl font-semibold" style={{ color: isImmersive ? '#FFF' : 'var(--text-primary)', borderColor: isImmersive ? 'rgba(255,255,255,0.3)' : 'var(--canvas-gray)' }}>Gallery</h2>
                                    <div className="relative mb-8 w-full overflow-hidden rounded-xl bg-canvas-gray shadow-lg">
                                        {galleryImages.length > 0 ? (
                                            <img src={galleryImages[currentImageIndex]} className="h-52 w-full object-cover" />
                                        ) : (
                                            <div className="flex h-52 w-full items-center justify-center text-muted-foreground">No images uploaded.</div>
                                        )}
                                        {galleryImages.length > 1 && <>
                                            <Button size="icon" onClick={prevImage} className="absolute left-2 top-1/2 h-9 w-9 -translate-y-1/2 bg-black/30 text-white hover:bg-black/50"><ChevronLeft /></Button>
                                            <Button size="icon" onClick={nextImage} className="absolute right-2 top-1/2 h-9 w-9 -translate-y-1/2 bg-black/30 text-white hover:bg-black/50"><ChevronRight /></Button>
                                        </>}
                                    </div>
                                </div>}

                                {showSocials && <div id="preview-socials-section">
                                    <h2 className="mb-4 mt-8 border-b pb-2 text-xl font-semibold" style={{ color: isImmersive ? '#FFF' : 'var(--text-primary)', borderColor: isImmersive ? 'rgba(255,255,255,0.3)' : 'var(--canvas-gray)' }}>Connect With Me</h2>
                                    <div className="space-y-3 pb-16 text-left">
                                        {socials.filter(s => s.link).map(s => {
                                            const platform = SOCIAL_PLATFORMS.find(p => p.key === s.platform);
                                            return <SocialCard key={s.id} href={s.link} platform={platform} handle={s.handle} isImmersive={isImmersive} />;
                                        })}
                                    </div>
                                </div>}
                            </div>
                        </div>
                        <div className="absolute bottom-10 right-10 z-20 md:bottom-12 md:right-12">
                            <Button asChild size="icon" className="h-14 w-14 rounded-full bg-action-blue shadow-xl">
                                <a href={vcfUrl} download={`${name.replace(/\s+/g, "_") || "contact"}.vcf`}><UserPlus className="h-6 w-6" /></a>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="fixed bottom-6 right-6 z-40 lg:hidden">
                <Button size="icon" onClick={() => setMobilePreviewOpen(true)} className="h-16 w-16 rounded-full bg-brand-teal shadow-2xl transition hover:scale-105"><Smartphone className="h-8 w-8" /></Button>
            </div>
        </div>
    );
};

// --- Helper Components for Styling ---
const StyledAccordionItem = ({ value, icon: Icon, title, children }) => (
    <AccordionItem value={value} className="overflow-hidden rounded-xl border-none shadow-sm">
        <AccordionTrigger className="flex w-full items-center justify-between bg-white p-4 text-xl font-semibold hover:bg-canvas-gray">
            <div className="flex items-center">
                <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-lg bg-brand-teal/10 text-brand-teal">
                    <Icon size={20} />
                </div>
                <span className="text-deep-teal">{title}</span>
            </div>
        </AccordionTrigger>
        <AccordionContent className="border-l-4 border-brand-teal bg-white p-6">
            {children}
        </AccordionContent>
    </AccordionItem>
);

// --- Unchanged Preview Panel Helper Components ---
const HeaderActionButton = ({ href, icon: Icon }) => (
    <Button asChild size="icon" className="h-11 w-11 rounded-full shadow-lg transition hover:scale-105" style={{ backgroundColor: 'var(--accent-color)' }}>
        <a href={href}><Icon size={20} /></a>
    </Button>
);

const Template1Header = ({ profileImageUrl, name, title, firstPhone, firstEmail, addressLink }) => (
    <div className="p-6 pt-10 text-center text-white" style={{ backgroundColor: 'var(--primary-color)' }}>
        <img src={profileImageUrl} alt="Profile" className="mb-4 h-[250px] w-full rounded-xl border-4 border-white object-cover shadow-lg" />
        <h1 className="mb-1 text-3xl font-bold" style={{ color: 'var(--title-colour)' }}>{name}</h1>
        <p className="mb-6 text-base font-medium" style={{ color: 'var(--bio-colour)' }}>{title}</p>
        <div className="mb-4 flex justify-center space-x-4">
            <HeaderActionButton href={`tel:${firstPhone || '#'}`} icon={Phone} />
            <HeaderActionButton href={`mailto:${firstEmail || '#'}`} icon={Mail} />
            <HeaderActionButton href={addressLink || '#'} icon={MapPin} />
        </div>
    </div>
);

const Template2Header = ({ profileImageUrl, name, title, firstPhone, firstEmail, addressLink }) => (
    <div className="p-6 pt-10 text-center text-white" style={{ backgroundColor: 'var(--primary-color)' }}>
        <img src={profileImageUrl} alt="Profile" className="mb-4 h-32 mx-auto w-32 rounded-full border-4 border-white object-cover shadow-lg" />
        <h1 className="mb-1 text-3xl font-bold" style={{ color: 'var(--title-colour)' }}>{name}</h1>
        <p className="mb-6 text-base font-medium" style={{ color: 'var(--bio-colour)' }}>{title}</p>
        <div className="mb-4 flex justify-center space-x-4">
            <HeaderActionButton href={`tel:${firstPhone || '#'}`} icon={Phone} />
            <HeaderActionButton href={`mailto:${firstEmail || '#'}`} icon={Mail} />
            <HeaderActionButton href={addressLink || '#'} icon={MapPin} />
        </div>
    </div>
);

const Template3Header = ({ profileImageUrl, name, title, firstPhone, firstEmail, addressLink }) => (
    <div className="relative h-96 w-full">
        <img src={profileImageUrl} alt="Profile Background" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 to-transparent p-6">
            <h1 className="leading-tight text-3xl font-bold" style={{ color: 'var(--title-colour)' }}>{name}</h1>
            <p className="mb-5 text-base font-medium" style={{ color: 'var(--bio-colour)' }}>{title}</p>
            <div className="flex items-center space-x-3">
                <HeaderActionButton href={`tel:${firstPhone || '#'}`} icon={Phone} />
                <HeaderActionButton href={`mailto:${firstEmail || '#'}`} icon={Mail} />
                <HeaderActionButton href={addressLink || '#'} icon={MapPin} />
            </div>
        </div>
    </div>
);

const ContactCard = ({ href, icon: Icon, value, type, alternate, isImmersive }) => {
    if (!value) return null;
    const cardClasses = `flex items-center rounded-xl border p-4 transition-all hover:scale-[1.01] hover:shadow-md ${isImmersive ? 'bg-white' : alternate ? 'bg-[rgba(0,122,138,0.08)]' : 'bg-white'}`;
    const textStyle = { color: isImmersive ? 'var(--text-primary)' : '' };
    const mutedTextStyle = { color: isImmersive ? 'var(--text-muted)' : '' };

    return (
        <a href={href || '#'} target="_blank" rel="noopener noreferrer" className={cardClasses}>
            <div className="mr-4 flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg" style={{ color: 'var(--icon-colour)' }}><Icon size={22} /></div>
            <div>
                <p className="break-all text-base font-bold" style={textStyle}>{value}</p>
                <p className="text-[13px] text-text-muted" style={mutedTextStyle}>{type}</p>
            </div>
        </a>
    );
};

const SocialCard = ({ href, platform, handle, isImmersive }) => {
    if (!platform) return null;
    const cardClasses = `flex items-center rounded-xl border p-4 transition-all hover:scale-[1.01] hover:shadow-md ${isImmersive ? 'bg-white' : 'bg-white'}`;
    const textStyle = { color: isImmersive ? 'var(--text-primary)' : '' };
    const mutedTextStyle = { color: isImmersive ? 'var(--text-muted)' : '' };

    return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={cardClasses}>
            <div className="mr-4 flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg" style={{ color: platform.color }}>
                <platform.icon size={24} />
            </div>
            <div>
                <p className="text-base font-bold" style={textStyle}>{platform.name}</p>
                <p className="text-[13px] text-text-muted" style={mutedTextStyle}>{handle}</p>
            </div>
        </a>
    );
};

export default CreateProfile;