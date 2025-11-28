import React, { Component } from "react";
import { useProfileForm } from "@/context/ProfileFormContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Type } from "lucide-react"; 

// ---------------- Error Boundary ----------------
// (This component is correct, no changes needed)
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error in ThemeColorsForm:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 text-center text-red-700 bg-red-100 rounded-md">
          <h2 className="text-lg font-bold">Something went wrong.</h2>
          <p>{this.state.error?.message || "Please try again later."}</p>
        </div>
      );
    }
    return this.props.children;
  }
}

// ---------------- Color Input ----------------
const ColorInput = ({ label, value, onChange }) => {
  const { labelTextStyles, formInputStyles } = useProfileForm();

  return (
    <div className="space-y-1.5">
      <Label className={labelTextStyles}>{label}</Label>
      <div className="flex mt-4 items-center space-x-4">
        <input
          type="color"
          value={value}
          onChange={onChange}
          className="h-12 w-12 cursor-pointer appearance-none p-0"
        />
        <Input
          value={value.toUpperCase()}
          onChange={onChange}
          // --- RESPONSIVE FIX ---
          // Changed w-[250px] to flex-1 (fill available space)
          // This prevents overflow on small mobile screens.
          className={`${formInputStyles} rounded-2xl border flex-1 border-gray-300 py-5 `}
        />
      </div>
    </div>
  );
};

// ---------------- Theme Colors Form ----------------
const ThemeColorsFormInner = () => {
  const {
    primaryColor,
    setPrimaryColor,
    accentColor,
    setAccentColor,
    iconColor,
    setIconColor,
    titleTextColor,
    setTitleTextColor,
    bioTextColor,
    setBioTextColor,
    fontFamily,
    setFontFamily,
    formInputStyles,
    labelTextStyles,
  } = useProfileForm();

  return (
    // --- RESPONSIVE FIX ---
    // grid-cols-1 (default for mobile)
    // md:grid-cols-2 (2 columns for medium screens and up)
    <div className="grid grid-cols-1 md:grid-cols-2 mt-4 gap-x-4 gap-y-6">
      <ColorInput
        label="Primary Color"
        value={primaryColor}
        onChange={(e) => setPrimaryColor(e.target.value)}
      />
      <ColorInput
        label="Accent Color"
        value={accentColor}
        onChange={(e) => setAccentColor(e.target.value)}
      />

      <ColorInput
        label="Icon Color"
        value={iconColor}
        onChange={(e) => setIconColor(e.target.value)}
      />
      <ColorInput
        label="Title Text Color"
        value={titleTextColor}
        onChange={(e) => setTitleTextColor(e.target.value)}
      />

      <ColorInput
        label="Bio Text Color"
        value={bioTextColor}
        onChange={(e) => setBioTextColor(e.target.value)}
      />

      {/* --- RESPONSIVE FIX --- */}
      {/* col-span-1 (default) and md:col-span-2 to span full width on desktop */}
      <div className="col-span-1 md:col-span-2 space-y-1.5">
        <Label className={labelTextStyles}>
          <div className="flex items-center space-x-2 mb-2">
            <Type className="h-4 w-4 text-gray-500" /> {/* Text icon */}
            <span>Font Style</span>
          </div>
        </Label>
        <Select value={fontFamily} onValueChange={setFontFamily}>
          <SelectTrigger className={`${formInputStyles} rounded-2xl`}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="'Inter', sans-serif">Inter (Default)</SelectItem>
            <SelectItem value="'Roboto', sans-serif">Roboto</SelectItem>
            <SelectItem value="'Playfair Display', serif">
              Playfair Display
            </SelectItem>
            <SelectItem value="'Oswald', sans-serif">Oswald</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

// ---------------- Export Wrapped in Error Boundary ----------------
const ThemeColorsForm = () => (
  <ErrorBoundary>
    <ThemeColorsFormInner />
  </ErrorBoundary>
);

export default ThemeColorsForm;