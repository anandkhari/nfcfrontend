import React from "react";
import { useProfileForm } from "@/context/ProfileFormContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Trash2 } from "lucide-react";

// --- Reusable Email Types ---
const EMAIL_TYPES = [
  { label: "Personal" },
  { label: "Work" },
  { label: "Other" },
];

// --- Phone Section ---
const PhoneFormSection = () => {
  const { phones = [], setPhones, updateContact, addContact, removeContact, PHONE_TYPES = [] } =
    useProfileForm();

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-brand-dark">Phone Numbers</h3>

      <div className="space-y-3">
        {(phones || []).map((item, index) => (
          <div
            key={item.id}
            className="flex flex-col md:flex-row md:items-center space-y-3 md:space-y-0 md:space-x-4 mb-6"
          >
            {/* Phone Number Input */}
            <Label htmlFor={`phone-number-${item.id}`} className="sr-only">
              Phone Number {index + 1}
            </Label>
            <Input
              id={`phone-number-${item.id}`}
              type="tel"
              value={item.number || ""}
              onChange={(e) =>
                updateContact(setPhones, item.id, "number", e.target.value)
              }
              placeholder={`Phone Number ${index + 1}`}
              className="flex-1 rounded-2xl px-4 border border-gray-200 shadow-md py-3"
            />

            {/* Group Type + Trash Button */}
            <div className="flex items-center space-x-2">
              <Label htmlFor={`phone-type-${item.id}`} className="sr-only">
                Type
              </Label>
              <Select
                value={item.type || ""}
                onValueChange={(val) =>
                  updateContact(setPhones, item.id, "type", val)
                }
              >
                <SelectTrigger
                  id={`phone-type-${item.id}`}
                  className="flex-1 rounded-2xl px-4 border border-gray-200 shadow-md py-3"
                >
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  {(PHONE_TYPES || []).map((t) => (
                    <SelectItem key={t.label} value={t.label}>
                      {t.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button
                variant="ghost"
                size="icon"
                className="rounded-full text-brand-gray hover:bg-red-100 hover:text-red-600"
                onClick={() => removeContact(setPhones, item.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Button
        onClick={() => addContact(setPhones, { type: "Mobile", number: "" })}
        variant="default"
        className="w-auto rounded-2xl px-4 py-3 bg-brand-orange text-white hover:bg-brand-orange-dark"
      >
        <Plus className="mr-1 h-5 w-5" /> Add Phone Number
      </Button>
    </div>
  );
};

// --- Email Section ---
const EmailFormSection = () => {
  const { emails = [], setEmails, updateContact, addContact, removeContact } =
    useProfileForm();

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-brand-dark">Email Addresses</h3>

      <div className="space-y-3">
        {(emails || []).map((item, index) => (
          <div
            key={item.id}
            className="flex flex-col md:flex-row md:items-center space-y-3 md:space-y-0 md:space-x-4 mb-5"
          >
            {/* Email Address Input */}
            <Label htmlFor={`email-address-${item.id}`} className="sr-only">
              Email Address {index + 1}
            </Label>
            <Input
              id={`email-address-${item.id}`}
              type="email"
              value={item.address || ""}
              onChange={(e) =>
                updateContact(setEmails, item.id, "address", e.target.value)
              }
              placeholder={`Email Address ${index + 1}`}
              className="flex-1 rounded-2xl px-4 border border-gray-200 shadow-md py-3"
            />

            {/* Group Type + Trash Button */}
            <div className="flex items-center space-x-2">
              <Label htmlFor={`email-type-${item.id}`} className="sr-only">
                Type
              </Label>
              <Select
                value={item.type || ""}
                onValueChange={(val) =>
                  updateContact(setEmails, item.id, "type", val)
                }
              >
                <SelectTrigger
                  id={`email-type-${item.id}`}
                  className="flex-1 rounded-2xl px-4 border border-gray-200 shadow-md py-3"
                >
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  {EMAIL_TYPES.map((t) => (
                    <SelectItem key={t.label} value={t.label}>
                      {t.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button
                variant="ghost"
                size="icon"
                className="rounded-full text-brand-gray hover:bg-red-100 hover:text-red-600"
                onClick={() => removeContact(setEmails, item.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Button
        onClick={() => addContact(setEmails, { type: "Personal", address: "" })}
        variant="default"
        className="w-auto rounded-2xl px-4 py-3 bg-brand-orange text-white hover:bg-brand-orange-dark"
      >
        <Plus className="mr-2 h-4 w-4" /> Add Email
      </Button>
    </div>
  );
};

// --- Main Component ---
const ContactDetailsForm = () => {
  const {
    website = "",
    setWebsite,
    address = "",
    setAddress,
    addressLink = "",
    setAddressLink,
  } = useProfileForm();

  return (
    <div className="rounded-2xl bg-white space-y-6 p-5">
      <PhoneFormSection />
      <hr className="border-slate-200" />
      <EmailFormSection />
      <hr className="border-slate-200" />

      {/* Static Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="website" className="text-sm font-medium text-brand-gray">
            Website URL
          </Label>
          <Input
            id="website"
            type="url"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            placeholder="https://trueline.com"
            className="flex-2 rounded-2xl px-4 border border-gray-200 shadow-md py-6"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="address" className="text-sm font-medium text-brand-gray">
            Address / Location
          </Label>
          <Input
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="123 Main St, New York, NY"
            className="flex-1 rounded-2xl px-4 border border-gray-200 shadow-md py-6"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="addressLink" className="text-sm font-medium text-brand-gray">
            Google Maps Link
          </Label>
          <Input
            id="addressLink"
            type="url"
            value={addressLink}
            onChange={(e) => setAddressLink(e.target.value)}
            placeholder="https://maps.app.goo.gl/..."
            className="flex-1 rounded-2xl px-4 border border-gray-200 shadow-md py-6"
          />
        </div>
      </div>
    </div>
  );
};

export default ContactDetailsForm;
