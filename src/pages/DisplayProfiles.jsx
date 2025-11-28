import React, { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Search, Loader2, AlertCircle, ListFilter } from "lucide-react";
import { toast } from "react-toastify";
import { API_BASE_URL } from "../../config";
import { QRCodeCanvas } from "qrcode.react";

// Components
import Header from "../components/layout/Header";
import ProfileCard from "../components/profile/ProfileCard";
import Pagination from "../components/profile/Pagination";

// ShadCN
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

// ---------------- Profile Grid ----------------
const ProfileGrid = ({ profiles, onAction }) => (
  <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
    {profiles.map((profile) => (
      <ProfileCard key={profile._id} profile={profile} onAction={onAction} />
    ))}
  </div>
);

const DisplayProfiles = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // --- State ---
  const [profiles, setProfiles] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalProfiles: 0,
  });

  const [searchTerm, setSearchTerm] = useState(searchParams.get("q") || "");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Delete states
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [profileToDelete, setProfileToDelete] = useState(null);

  // QR states
  const [qrProfile, setQrProfile] = useState(null);
  const qrRef = useRef(null);

  const sortBy = searchParams.get("sortBy") || "createdAt";
  const sortOrder = searchParams.get("sortOrder") || "desc";

  // ---------------- Fetch profiles ----------------
  useEffect(() => {
    let mounted = true;

    const fetchProfiles = async () => {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams();
      params.set("q", searchParams.get("q") || "");
      params.set("page", searchParams.get("page") || "1");
      params.set("limit", "9");
      params.set("sortBy", searchParams.get("sortBy") || "createdAt");
      params.set("sortOrder", searchParams.get("sortOrder") || "desc");

      try {
        const response = await fetch(
          `${API_BASE_URL}/api/profile?${params.toString()}`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (!response.ok) throw new Error("Failed to fetch profiles");

        const data = await response.json();

        if (mounted) {
          setProfiles(data.profiles || []);
          setPagination(
            data.pagination || {
              currentPage: 1,
              totalPages: 1,
              totalProfiles: 0,
            }
          );
        }
      } catch (err) {
        if (mounted) setError(err.message || "Error loading profiles");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchProfiles();
    return () => {
      mounted = false;
    };
  }, [searchParams]);

  useEffect(() => {
    setSearchTerm(searchParams.get("q") || "");
  }, [searchParams]);

  // ---------------- Actions ----------------
  const handleProfileAction = useCallback(
    (action, profileId) => {
      switch (action) {
        case "View":
          navigate(`/admin/profiles/view/${profileId}`, {
            state: { context: "dashboard" },
          });
          break;

        case "Edit":
          navigate(`/admin/profiles/edit/${profileId}`);
          break;

        case "Delete":
          setProfileToDelete(profileId);
          setDeleteDialogOpen(true);
          break;

        case "QR":
          const profile = profiles.find((p) => p._id === profileId);
          setQrProfile(profile);
          break;

        default:
          console.warn("Unknown action:", action);
      }
    },
    [navigate, profiles]
  );

  // ---------------- Delete ----------------
  const handleConfirmDelete = async () => {
    if (!profileToDelete) return;

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/profile/${profileToDelete}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (!response.ok) throw new Error("Failed to delete profile");

      toast.success("Profile deleted successfully");
      setProfiles((prev) => prev.filter((p) => p._id !== profileToDelete));

      if (profiles.length === 1 && pagination.currentPage > 1) {
        setSearchParams((prev) => {
          prev.set("page", (pagination.currentPage - 1).toString());
          return prev;
        });
      } else {
        setSearchParams(searchParams);
      }
    } catch (err) {
      toast.error(err.message || "Delete failed.");
    } finally {
      setDeleteDialogOpen(false);
      setProfileToDelete(null);
    }
  };

  // ---------------- Handlers ----------------
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchParams((prev) => {
      prev.set("q", searchTerm);
      prev.set("page", "1");
      return prev;
    });
  };

  const handlePageChange = (newPage) => {
    setSearchParams((prev) => {
      prev.set("page", newPage.toString());
      return prev;
    });
  };

  const handleSortChange = (e) => {
    const [sortBy, sortOrder] = e.target.value.split(":");
    setSearchParams((prev) => {
      prev.set("sortBy", sortBy);
      prev.set("sortOrder", sortOrder);
      prev.set("page", "1");
      return prev;
    });
  };

  // ---------------- Render ----------------
  const renderContent = () => {
    if (loading)
      return (
        <div className="flex h-64 items-center justify-center">
          <Loader2 className="h-12 w-12 animate-spin text-brand-orange" />
          <p className="ml-4 text-lg text-brand-gray">Loading Profiles...</p>
        </div>
      );

    if (error)
      return (
        <div className="flex h-64 flex-col items-center justify-center rounded-lg bg-red-50 text-red-600">
          <AlertCircle className="h-12 w-12" />
          <p className="mt-4 text-lg font-medium">Error: {error}</p>
        </div>
      );

    if (profiles.length === 0)
      return (
        <div className="flex h-64 flex-col items-center justify-center rounded-lg bg-gray-50 text-brand-gray">
          <p className="text-lg">
            {searchParams.get("q")
              ? `No profiles found matching "${searchParams.get("q")}".`
              : "No profiles created yet."}
          </p>
        </div>
      );

    return <ProfileGrid profiles={profiles} onAction={handleProfileAction} />;
  };

  const dynamicProfileLink = qrProfile
    ? `${window.location.origin}/profile/${qrProfile._id}`
    : "";

  // ---------------- UI ----------------
  return (
    <div className="w-full">
      <Header title="Profiles" />

      {/* Search & Filters */}
      <form
        className="mb-6 flex flex-col sm:flex-row gap-4"
        onSubmit={handleSearchSubmit}
      >
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search profiles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border border-gray-300 py-3 pl-12 pr-4 text-base shadow-sm"
          />
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-brand-gray" />
        </div>

        <div className="relative">
          <select
            value={`${sortBy}:${sortOrder}`}
            onChange={handleSortChange}
            className="h-full w-full sm:w-auto rounded-lg border border-gray-300 py-3 pl-12 pr-8 text-base shadow-sm"
          >
            <option value="createdAt:desc">Newest</option>
            <option value="createdAt:asc">Oldest</option>
            <option value="name:asc">Name (A-Z)</option>
            <option value="name:desc">Name (Z-A)</option>
          </select>
          <ListFilter className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-brand-gray" />
        </div>

        <button
          type="submit"
          className="rounded-md bg-brand-orange px-4 py-3 text-white"
        >
          Search
        </button>
      </form>

      {renderContent()}

      {!loading && !error && (
        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          onPageChange={handlePageChange}
        />
      )}

      {/* DELETE DIALOG */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this profile?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleConfirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* QR DIALOG */}
      <Dialog open={!!qrProfile} onOpenChange={() => setQrProfile(null)}>
        <DialogContent className="text-center">
          <DialogHeader>
            <DialogTitle>Profile QR Code</DialogTitle>
            <DialogDescription>
              Scan or download this QR
            </DialogDescription>
          </DialogHeader>

          {qrProfile && (
            <>
              <div
                ref={qrRef}
                className="mx-auto mt-4 flex justify-center rounded-xl bg-white p-6 shadow"
              >
                <QRCodeCanvas
                  value={dynamicProfileLink}
                  size={220}
                  level="H"
                />
              </div>

              <p className="mt-4 text-xs text-gray-500 break-all">
                {dynamicProfileLink}
              </p>

              <DialogFooter className="mt-6">
                <Button
                  onClick={() => {
                    const canvas = qrRef.current.querySelector("canvas");
                    const url = canvas.toDataURL("image/png");

                    const a = document.createElement("a");
                    a.href = url;
                    a.download = `${qrProfile.name}-QR.png`;
                    a.click();
                  }}
                >
                  Download QR
                </Button>

                <Button
                  variant="outline"
                  onClick={() => setQrProfile(null)}
                >
                  Close
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DisplayProfiles;
