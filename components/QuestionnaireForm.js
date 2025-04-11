// Description: A form component that takes user input for generating color palettes.

import { useState } from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import colors from "@/lib/colors";

const colorNames = Object.keys(colors);

const QuestionnaireForm = ({ onSubmit, disabled }) => {
  const [formData, setFormData] = useState({
    primaryColor: "",
    backgroundColorPreference: "",
    contrastPreference: "",
    intendedMood: "",
  });

  const [errors, setErrors] = useState({});

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.primaryColor)
      newErrors.primaryColor = "Primary color is required.";
    if (!formData.backgroundColorPreference)
      newErrors.backgroundColorPreference =
        "Background color preference is required.";
    if (!formData.contrastPreference)
      newErrors.contrastPreference = "Contrast preference is required.";
    if (!formData.intendedMood)
      newErrors.intendedMood = "Intended mood is required.";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    if (disabled) return;
    onSubmit(formData);
  };

  const isFormValid =
    formData.primaryColor &&
    formData.backgroundColorPreference &&
    formData.contrastPreference &&
    formData.intendedMood;

  return (
    <div className="mx-auto px-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Primary Color */}
        <div className="space-y-1">
          <Label className="text-sm font-semibold">Primary Color</Label>
          <Select
            name="primaryColor"
            value={formData.primaryColor}
            onValueChange={(value) => handleSelectChange("primaryColor", value)}
            required
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select primary color" />
            </SelectTrigger>
            <SelectContent>
              {colorNames.map((colorName) => (
                <SelectItem key={colorName} value={colorName}>
                  <div className="flex items-center space-x-2">
                    <div
                      className="size-[15px]"
                      style={{ backgroundColor: colors[colorName][500] }}
                    ></div>
                    <span>{colorName}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.primaryColor && (
            <p className="text-red-500 text-xs">{errors.primaryColor}</p>
          )}
        </div>

        {/* Background Color Preference */}
        <div className="space-y-1">
          <Label className="text-sm font-semibold">
            Background Color Preference
          </Label>
          <Select
            name="backgroundColorPreference"
            value={formData.backgroundColorPreference}
            onValueChange={(value) =>
              handleSelectChange("backgroundColorPreference", value)
            }
            required
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Background theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Light">Light</SelectItem>
              <SelectItem value="Dark">Dark</SelectItem>
            </SelectContent>
          </Select>
          {errors.backgroundColorPreference && (
            <p className="text-red-500 text-xs">
              {errors.backgroundColorPreference}
            </p>
          )}
        </div>

        {/* Contrast Preference */}
        <div className="space-y-1">
          <Label className="text-sm font-semibold">Contrast Preference</Label>
          <Select
            name="contrastPreference"
            value={formData.contrastPreference}
            onValueChange={(value) =>
              handleSelectChange("contrastPreference", value)
            }
            required
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Contrast preference" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="High Contrast">High Contrast</SelectItem>
              <SelectItem value="Low Contrast">Low Contrast</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {/* Intended Mood */}
        <div className="space-y-1">
          <Label className="text-sm font-semibold">Intended Mood</Label>
          <Select
            name="intendedMood"
            value={formData.intendedMood}
            onValueChange={(value) => handleSelectChange("intendedMood", value)}
            required
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select intended mood" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Professional">Professional</SelectItem>
              <SelectItem value="Playful">Playful</SelectItem>
              <SelectItem value="Minimalistic">Minimalistic</SelectItem>
              <SelectItem value="Bold">Bold</SelectItem>
            </SelectContent>
          </Select>
          {errors.intendedMood && (
            <p className="text-red-500 text-xs">{errors.intendedMood}</p>
          )}
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full"
          disabled={!isFormValid || disabled}
        >
          {disabled ? <>Generating...</> : "Generate Palettes"}
        </Button>
      </form>
    </div>
  );
};

export default QuestionnaireForm;
