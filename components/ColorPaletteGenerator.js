// Description: A component that generates color palettes based on user input and displays them in a mockup window.

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import QuestionnaireForm from "./QuestionnaireForm";
import PaletteCard from "./PaletteCard";
import MockupWindow from "./MockupWindow";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ColorPaletteGenerator = () => {
  const [palettes, setPalettes] = useState([]);
  const [currentPaletteIndex, setCurrentPaletteIndex] = useState(0);
  const [colorFormat, setColorFormat] = useState("hex");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  // State for Locked Colors
  const [lockedColors, setLockedColors] = useState({});

  // Error State
  const [error, setError] = useState(null);

  // Ref for the mockup container
  const mockupRef = useRef(null);

  // Load palettes from localStorage on mount
  useEffect(() => {
    const storedPalettes = localStorage.getItem("palettes");
    if (storedPalettes) {
      setPalettes(JSON.parse(storedPalettes));
    }
  }, []);

  // Save palettes to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("palettes", JSON.stringify(palettes));
  }, [palettes]);

  // Clear localStorage on app close
  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.removeItem("palettes");
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  // Scroll into view when generating
  useEffect(() => {
    if (isGenerating && mockupRef.current) {
      mockupRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [isGenerating]);

  const handleFormSubmit = async (answers) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    setIsGenerating(true);
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(answers),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to generate palettes");
      }

      const data = await response.json();

      console.log("Response data:", data);

      if (!data.palettes || !Array.isArray(data.palettes)) {
        throw new Error("Invalid palette data received");
      }

      setPalettes(data.palettes);
      setCurrentPaletteIndex(0);

      // Initialize lockedColors for the new palettes
      const initialLockedColors = {};
      data.palettes.forEach((palette) => {
        Object.keys(palette.colors).forEach((colorName) => {
          initialLockedColors[colorName] = false;
        });
      });
      setLockedColors(initialLockedColors);
    } catch (err) {
      console.error("Error generating palettes:", err);
      setError(err); // Set the error state
    } finally {
      setIsSubmitting(false);
      setIsGenerating(false);
    }
  };

  const handlePrev = () => {
    setCurrentPaletteIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setCurrentPaletteIndex((prev) => Math.min(prev + 1, palettes.length - 1));
  };

  // Toggle lock state of a color
  const handleLockToggle = (colorName) => {
    setLockedColors((prev) => ({
      ...prev,
      [colorName]: !prev[colorName],
    }));
  };

  const currentPalette = palettes[currentPaletteIndex];

  // Framer Motion Variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        repeat: Infinity,
        repeatType: "loop",
        duration: 1,
        ease: "easeInOut",
      },
    },
  };

  const letters = "Generating...".split("");

  // Throw error during render if error state is set
  if (error) {
    throw error;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="w-full lg:w-64 lg:sticky lg:top-8">
          <QuestionnaireForm
            onSubmit={handleFormSubmit}
            disabled={isSubmitting}
          />
        </aside>
        <div className="flex-1 overflow-auto max-h-screen">
          <h1 className="text-xl md:text-3xl font-bold text-center mb-8">
            AI Generated Color Palette Mockup
          </h1>
          {palettes.length > 0 && (
            <div className="flex items-center justify-center mb-4 my-4">
              <button
                onClick={handlePrev}
                className="p-2 bg-gray-300 rounded-[4px] active:bg-slate-200"
                disabled={currentPaletteIndex === 0}
                aria-label="Previous Palette"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <span className="mx-4">
                Palette {currentPaletteIndex + 1} of {palettes.length}
              </span>
              <button
                onClick={handleNext}
                className="p-2 bg-gray-300 rounded-[4px] active:bg-slate-200"
                disabled={currentPaletteIndex === palettes.length - 1}
                aria-label="Next Palette"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          )}
          <div className="relative">
            {isGenerating && (
              <div className="absolute inset-0 bg-white opacity-80 flex justify-center items-center z-10">
                <motion.svg width="300" height="100">
                  <motion.text
                    x="50%"
                    y="50%"
                    textAnchor="middle"
                    fill="#000000"
                    fontSize="38"
                    fontWeight="bold"
                    dy=".3em"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {letters.map((letter, index) => (
                      <motion.tspan key={index} variants={letterVariants}>
                        {letter === " " ? "\u00A0" : letter}
                      </motion.tspan>
                    ))}
                  </motion.text>
                </motion.svg>
              </div>
            )}
            <div
              ref={mockupRef}
              className={`mockup-container -scroll-mt-8 md:scroll-mt-4 ${
                isGenerating ? "blur" : ""
              } mt-4`}
            >
              <MockupWindow
                colors={
                  isGenerating || palettes.length === 0
                    ? {
                        Background: "#f0f0f0",
                        Text: "#a0a0a0",
                        Border: "#d0d0d0",
                        Accent: "#c0c0c0",
                        Secondary: "#b0b0b0",
                      }
                    : currentPalette.colors
                }
              />
            </div>
          </div>
          {!isGenerating && palettes.length > 0 && (
            <PaletteCard
              palette={currentPalette}
              colorFormat={colorFormat}
              setColorFormat={setColorFormat}
              lockedColors={lockedColors}
              handleLockToggle={handleLockToggle}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ColorPaletteGenerator;
