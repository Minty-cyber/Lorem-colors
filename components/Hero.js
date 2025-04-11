// Description: Hero section of the landing page.

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

// Function to get a random rotation angle
const getRandomRotation = () => {
  const rotations = [0, 30, 45, 60];
  return rotations[Math.floor(Math.random() * rotations.length)];
};

// Animation variants for the container to stagger children animations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      duration: 0.5,
    },
  },
};

// Animation variants for each letter
const letterVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

// Animation variants for the gradient text upon button click
const gradientVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      duration: 0.5,
    },
  },
};

export default function Hero() {
  const [buttonBg, setButtonBg] = useState("bg-primary");
  const [isClicked, setIsClicked] = useState(false);
  const [bgGradient, setBgGradient] = useState("bg-white");
  const [rotation, setRotation] = useState(0);
  const router = useRouter();

  const handleButtonClick = useCallback(() => {
    if (isClicked) return;
    setIsClicked(true);
    setButtonBg("bg-[#8ff2fe] text-white");
    setBgGradient(
      "bg-gradient-to-tr from-[#4158D0] via-[#C850C0] to-[#FFCC70]",
    );
    const timeoutId = setTimeout(() => {
      router.push("/genAI-Color-Palette");
    }, 550);

    // Clear timeout on component unmount
    return () => clearTimeout(timeoutId);
  }, [isClicked, router]);

  useEffect(() => {
    setRotation(getRandomRotation());
  }, []);

  // Split the text into individual letters, including spaces
  const text = "Lorem Colors.";
  const letters = text.split("");

  return (
    <div
      className={`overflow-hidden transition-all duration-500 ${
        isClicked ? bgGradient : "bg-white"
      }`}
    >
      <div className="w-full min-h-screen mx-auto relative flex flex-col lg:flex-row">
        {/* Text Section */}
        <div
          className={`relative z-10 pb-8 bg-background lg:w-[54%] lg:pb-28 ${
            isClicked ? "bg-transparent" : ""
          } w-full`}
        >
          <main className="mt-10 md:mt-16 mx-8 justify-center items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-center lg:text-left md:mx-6"
            >
              {/* Main Heading */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div
                  className={`transition-colors mb-3 duration-500 w-full text-3xl md:text-4xl leading-snug tracking-tight font-extrabold ${
                    isClicked ? "text-white" : "text-black"
                  }`}
                >
                  <span>Transform Your Designs</span> <br />
                  <span>with Perfect Colors.</span>
                </div>
              </motion.h1>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-5/6 mx-auto lg:mx-0"
              >
                <span
                  className={`block leading-normal my-2 text-lg ${
                    isClicked ? "text-white" : "text-black"
                  }`}
                >
                  Create personalized color palettes with AI-powered color
                  recommendations.
                </span>
              </motion.div>
              {/* Generate Palette Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <div className="mt-4 md:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md">
                    <Button
                      variant="outline"
                      size="lg"
                      className={`text-lg lg:text-xl ${buttonBg} text-white transition-colors duration-300 px-6 py-3 rounded-md`}
                      onClick={handleButtonClick}
                      disabled={isClicked}
                    >
                      Get Started
                    </Button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </main>
        </div>

        {/* Animated "Lorem Colors" SVG with Per-Letter Animation */}
        <motion.div className="w-full lg:w-2/3 mt-0 flex justify-center items-center transition-transform duration-500">
          <motion.div
            className="w-full h-full"
            animate={{ scale: isClicked ? 1.03 : 1 }}
            transition={{ duration: 0.3 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 600 300"
              className="w-full h-full object-contain"
              aria-labelledby="gradient-title gradient-desc"
              role="img"
            >
              {/* Black Text */}
              <motion.text
                x="50%"
                y="50%"
                textAnchor="middle"
                fill="#000000"
                fontSize="89"
                fontWeight="bold"
                dy=".3em"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {letters.map((letter, index) => (
                  <motion.tspan
                    key={`black-${index}`}
                    variants={letterVariants}
                  >
                    {letter === " " ? "\u00A0" : letter}
                  </motion.tspan>
                ))}
              </motion.text>

              {/* Gradient Text - Visible Only After Button Click */}
              <motion.text
                x="50%"
                y="50%"
                textAnchor="middle"
                fill="url(#gradient)"
                fontSize="89"
                fontWeight="bold"
                dy=".3em"
                variants={isClicked ? gradientVariants : containerVariants}
                initial={isClicked ? "hidden" : "hidden"}
                animate={isClicked ? "visible" : "hidden"}
              >
                {letters.map((letter, index) => (
                  <motion.tspan
                    key={`gradient-${index}`}
                    variants={letterVariants}
                  >
                    {letter === " " ? "\u00A0" : letter}
                  </motion.tspan>
                ))}
              </motion.text>

              <defs>
                <linearGradient
                  id="gradient"
                  gradientTransform={`rotate(${rotation})`}
                >
                  <stop offset="0%" stopColor="#ff0000" />
                  <stop offset="20%" stopColor="#ffa500" />
                  <stop offset="40%" stopColor="#ffff00" />
                  <stop offset="60%" stopColor="#00ff00" />
                  <stop offset="80%" stopColor="#0000ff" />
                  <stop offset="100%" stopColor="#800080" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
