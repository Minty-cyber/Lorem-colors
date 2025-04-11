// Description: A card component to display a color palette with color swatches.

import { useState } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import ColorSwatch from "./ColorSwatch";
import { motion } from "framer-motion";

// Helper function to convert HEX to RGB
const hexToRgb = (hex) => {
  // Remove '#' if present
  hex = hex.replace("#", "");

  // Parse the r, g, b values
  const bigint = parseInt(hex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return `rgb(${r}, ${g}, ${b})`;
};

const PaletteCard = ({
  palette,
  colorFormat,
  setColorFormat,
  lockedColors,
  handleLockToggle,
}) => {
  const [copied, setCopied] = useState(false);

  const handleExport = () => {
    const exportData = Object.entries(palette.colors)
      .map(([name, code]) => {
        const formattedCode = colorFormat === "rgb" ? hexToRgb(code) : code;
        return `${name}: ${formattedCode}`;
      })
      .join("\n");

    navigator.clipboard
      .writeText(exportData)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
      })
      .catch((error) => {
        console.error("Failed to copy palette:", error);
        // Optionally, you can set an error state here to notify the user
      });
  };

  return (
    <Card className="w-full shadow-lg rounded-lg overflow-hidden mt-4">
      {/* Card Header with Gradient Background */}
      <CardHeader className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white">
        <CardTitle className="flex justify-between items-center">
          {/* Palette Name */}
          <span className="text-base">{palette.name}</span>
          <span className="text-base">Color Palette</span>

          {/* Color Format Selector */}
          <Select value={colorFormat} onValueChange={setColorFormat}>
            <SelectTrigger className="md:w-[120px] w-[80px] bg-white text-black rounded-md shadow-md">
              <SelectValue placeholder="Color format" />
            </SelectTrigger>
            <SelectContent className="bg-white text-black rounded-md shadow-md">
              <SelectItem value="hex">HEX</SelectItem>
              <SelectItem value="rgb">RGB</SelectItem>
            </SelectContent>
          </Select>
        </CardTitle>
      </CardHeader>

      {/* Card Content */}
      <CardContent className="p-6 bg-gray-50">
        <div className="space-y-4 mt-4">
          {/* Grid Layout for Color Swatches */}
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-4">
            {Object.entries(palette.colors).map(([name, hex]) => (
              <ColorSwatch
                key={name} // Unique key for each swatch
                color={hex} // Hex code of the color
                locked={lockedColors[name]} // Lock state of the color
                onLockToggle={() => handleLockToggle(name)} // Function to toggle lock state
                format={colorFormat} // Current color format selected
              />
            ))}
          </div>

          {/* Popup Message */}
          {copied && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-4 p-2 bg-green-100 text-green-800 rounded text-center"
            >
              Palette copied to clipboard!
            </motion.div>
          )}
        </div>
        {/* Export Button */}
        <div className="flex items-center justify-center mt-4">
          <Button onClick={handleExport} variant="outline">
            Export
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PaletteCard;
