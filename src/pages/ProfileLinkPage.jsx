import { useParams, useLocation, Link } from 'react-router-dom';
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle, Copy, PlusCircle, Home } from 'lucide-react';

const ProfileLinkPage = () => {
    const { profileId } = useParams();
    const location = useLocation();
    const [isCopied, setIsCopied] = useState(false);

    const dynamicLink = `${window.location.origin}/profile/${profileId}`;

    // Determine action (default to created)
    const action = location.state?.action || 'created';
    const message = action === 'edited' ? 'Profile Edited Successfully!' : 'Profile Created Successfully!';

    const copyToClipboard = () => {
        navigator.clipboard.writeText(dynamicLink);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000); 
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-canvas-gray p-6">
            <div className="w-full max-w-lg rounded-xl bg-white p-8 text-center shadow-lg">
                <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
                <h1 className="mt-4 text-3xl font-bold text-gray-800">{message}</h1>
                <p className="mt-2 text-gray-600">
                    Here is the unique link for the profile. You can now copy it and write it to an NFC tag.
                </p>

                <div className="mt-8 w-full text-left">
                    <Label htmlFor="profileLink" className="font-medium text-gray-700">
                        Profile Dynamic Link
                    </Label>
                    <div className="mt-2 flex items-center space-x-2">
                        <Input
                            id="profileLink"
                            type="text"
                            value={dynamicLink}
                            readOnly
                            className="bg-gray-100"
                        />
                        <Button onClick={copyToClipboard} className="w-28">
                            <Copy className="mr-2 h-4 w-4" />
                            {isCopied ? "Copied!" : "Copy"}
                        </Button>
                    </div>
                </div>

                <div className="mt-10 space-y-3">
                    <Button asChild className="h-12 w-full text-base">
                        <Link to="/create-profile">
                            <PlusCircle className="mr-2 h-5 w-5" />
                            Create Another Profile
                        </Link>
                    </Button>

                    <Button asChild variant="secondary" className="h-12 w-full text-base">
                        <Link to="/admin-dashboard">
                            <Home className="mr-2 h-5 w-5" />
                            Go to Admin Dashboard
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ProfileLinkPage;
