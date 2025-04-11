// Description: A color tuner tool to generate shades of a color.

import { useState, useEffect, useCallback } from "react";
import { CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { HexColorPicker } from "react-colorful";
import { Slider } from "@/components/ui/slider";
import { Check, Copy } from "lucide-react";
import Footer from "@/components/Footer";

export default function ColorTuner() {
  const [baseColor, setBaseColor] = useState("#ffffff");
  const [shadeCount, setShadeCount] = useState(10);
  const [colorShades, setColorShades] = useState({});
  const [copiedShades, setCopiedShades] = useState({});

  const hexToHSL = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result) throw new Error("Invalid hex color");

    let r = parseInt(result[1], 16);
    let g = parseInt(result[2], 16);
    let b = parseInt(result[3], 16);

    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0,
      s,
      l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
        default:
          break;
      }
      h /= 6;
    }

    return { h: h * 360, s: s * 100, l: l * 100 };
  };

  const hslToHex = (h, s, l) => {
    l /= 100;
    const a = (s * Math.min(l, 1 - l)) / 100;
    const f = (n) => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color)
        .toString(16)
        .padStart(2, "0");
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  };

  const handleCopy = (color, shade) => {
    navigator.clipboard.writeText(color);
    setCopiedShades((prev) => ({ ...prev, [shade]: true }));
    setTimeout(() => {
      setCopiedShades((prev) => ({ ...prev, [shade]: false }));
    }, 2000);
  };

  const generateShades = useCallback((color, count) => {
    const shades = {};
    const hsl = hexToHSL(color);

    for (let i = 0; i < count; i++) {
      const lightness = 100 - (i / (count - 1)) * 100;
      const hex = hslToHex(hsl.h, hsl.s, lightness);
      shades[i] = hex;
    }

    return shades;
  }, []);

  useEffect(() => {
    setColorShades(generateShades(baseColor, shadeCount));
  }, [baseColor, shadeCount, generateShades]);

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow flex flex-col items-center justify-center">
        <div className="w-full rounded-xl max-w-4xl mx-auto px-4 mt-10 overflow-x-hidden">
          <div>
            <CardTitle className="text-xl">Color Shades</CardTitle>
            <CardDescription className="text-sm">
              Customize your color palette with various shades
            </CardDescription>
          </div>
          <div className="p-4 mb-4">
            <div className="flex flex-col md:flex-row lg:justify-center justify-between">
              {/* Color Picker Section */}
              <div className="flex flex-col items-center lg:items-start w-full">
                <HexColorPicker color={baseColor} onChange={setBaseColor} />
                <Input
                  type="text"
                  value={baseColor}
                  onChange={(e) => setBaseColor(e.target.value)}
                  className="my-4 w-1/2 pointer-events-none"
                  disabled
                />
              </div>

              {/* Shades Generator Section */}
              <div className="flex flex-col items-start w-full mt-6 md:mt-0">
                <Label className="mb-2 text-sm sm:text-base">
                  Number of Shades: {shadeCount}
                </Label>
                <Slider
                  value={[shadeCount]}
                  onValueChange={(value) => setShadeCount(value[0])}
                  min={4}
                  max={50}
                  step={1}
                  className="my-2 w-full"
                />

                {/* Shades Grid */}
                <div className="grid grid-cols-5 gap-2 mt-4 w-full">
                  {Object.entries(colorShades).map(([shade, color]) => (
                    <div key={shade} className="flex items-center">
                      {/* Color Box */}
                      <div
                        className="w-14 h-24 rounded-lg border border-gray-400 cursor-pointer transition-transform hover:scale-110 flex items-center justify-center relative"
                        style={{ backgroundColor: color }}
                        onClick={() => handleCopy(color, shade)}
                      >
                        {copiedShades[shade] ? (
                          <Check className="size-5 text-gray-500 absolute" />
                        ) : (
                          <Copy className="size-5 text-gray-500 absolute" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
