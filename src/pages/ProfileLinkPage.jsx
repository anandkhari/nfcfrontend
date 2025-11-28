import { useParams, useLocation, Link, useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle, Copy, PlusCircle, Home, Download, Eye } from "lucide-react";
import { QRCodeCanvas } from "qrcode.react";

const ProfileLinkPage = () => {
  const { profileId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [isCopied, setIsCopied] = useState(false);

  const dynamicLink = `${window.location.origin}/profile/${profileId}`;

  // Determine action (default to created)
  const action = location.state?.action || "created";
  const message =
    action === "edited"
      ? "Profile Edited Successfully!"
      : "Profile Created Successfully!";

 const copyToClipboard = () => {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(dynamicLink);
  } else {
    // Fallback for HTTP / insecure context
    const textArea = document.createElement("textarea");
    textArea.value = dynamicLink;
    textArea.style.position = "fixed";
    textArea.style.opacity = 0;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand("copy");
    } catch (err) {
      console.error("Fallback copy failed:", err);
    }
    document.body.removeChild(textArea);
  }
  setIsCopied(true);
  setTimeout(() => setIsCopied(false), 2000);
};


  // QR download
  const qrRef = useRef(null);
  const downloadQRCode = () => {
    const canvas = qrRef.current.querySelector("canvas");
    if (!canvas) return;
    const pngUrl = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = pngUrl;
    link.download = `${profileId}-QRCode.png`;
    link.click();
  };

  // Navigate to public profile page with context
  const viewProfile = () => {
    navigate(`/profile/${profileId}`, { state: { context: "profileLink" } });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4 sm:p-6">
      <div className="w-full max-w-lg rounded-2xl bg-white shadow-xl p-8 sm:p-10 text-center">
        {/* Success Icon */}
        <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
        <h1 className="mt-4 text-2xl sm:text-3xl font-bold text-gray-800">{message}</h1>
        <p className="mt-2 text-gray-600 text-sm sm:text-base">
          Here is the unique link for the profile. You can copy it, print it, or save it to an NFC tag.
        </p>

        {/* Dynamic Link */}
        <div className="mt-6 text-left">
          <Label htmlFor="profileLink" className="font-medium text-brand-gray">
            Profile Dynamic Link
          </Label>
          <div className="mt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <Input
              id="profileLink"
              type="text"
              value={dynamicLink}
              readOnly
              className="flex-1 truncate rounded-2xl px-4 py-6 border border-gray-200 shadow-md bg-gray-100 text-sm sm:text-base"
            />
            <Button
              onClick={copyToClipboard}
              className="flex items-center justify-center gap-2 h-12 w-full sm:w-36 rounded-2xl bg-brand-orange text-white hover:bg-brand-orange-dark"
            >
              <Copy className="h-4 w-4" /> {isCopied ? "Copied!" : "Copy"}
            </Button>
          </div>
        </div>

        {/* QR Code */}
        <div ref={qrRef} className="mt-8 inline-block p-4 bg-white rounded-2xl shadow-md">
          <QRCodeCanvas value={dynamicLink} size={200} level="H" />
        </div>
        <Button
          onClick={downloadQRCode}
          variant="outline"
          className="mt-4 flex items-center justify-center gap-2 mx-auto rounded-2xl border border-gray-300"
        >
          <Download className="h-4 w-4" /> Download QR
        </Button>

        {/* Action Buttons */}
        {/* --- CHANGES ARE HERE --- */}
        <div className="mt-10 flex flex-col sm:flex-row sm:flex-wrap gap-4">
          {/* View Profile */}
          <Button
            onClick={viewProfile}
            className="h-12 w-full sm:flex-1 flex items-center justify-center gap-2 rounded-2xl bg-blue-600 text-white hover:bg-blue-700"
          >
            <Eye className="h-5 w-5" /> View Profile
          </Button>

          {/* Create Another Profile */}
          <Button
            asChild
            className="h-12 w-full sm:flex-1 flex items-center justify-center gap-2 rounded-2xl bg-brand-orange text-white hover:bg-brand-orange-dark"
          >
            <Link to="/create-profile">
              <PlusCircle className="h-5 w-5" /> Create Another Profile
            </Link>
          </Button>

          {/* Go to Admin Dashboard */}
          <Button
            asChild
            variant="secondary"
            className="h-12 w-full sm:w-full flex items-center justify-center gap-2 rounded-2xl" // Changed sm:flex-1 to sm:w-full
          >
            <Link to="/admin/dashboard">
              <Home className="h-5 w-5" /> Go to Admin Dashboard
            </Link>
          </Button>
        </div>
        
      </div>
    </div>
  );
};

export default ProfileLinkPage;