// Description: Call to action component for the landing page.

import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CallToAction() {
  const [isClicked, setIsClicked] = useState(false);
  const router = useRouter();

  const handleClick = () => {
    setIsClicked(true);
  };

  //setting the time for automatic routing
  useEffect(() => {
    if (isClicked) {
      const timer = setTimeout(() => {
        router.push("/genAI-Color-Palette");
      }, 550);
      return () => clearTimeout(timer);
    }
  }, [isClicked, router]);

  return (
    <motion.div className="relative">
      {/* Gradient Overlay on Onclick*/}
      <AnimatePresence>
        {isClicked && (
          <motion.div
            className="absolute inset-2 bg-gradient-to-b from-blue-600 via-violet-600 to-pink-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
        )}
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10">
        <hr />
        <div className="max-w-2xl mx-auto text-center py-12 px-4 sm:py-16 sm:px-6 lg:px-8">
          <motion.h2
            className={`text-[17px] md:text-2xl font-extrabold ${
              isClicked ? "text-white" : "text-black"
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="block">Ready to elevate your designs?</span>{" "}
            <span className="block">
              Start creating with Lorem Colors today.
            </span>
          </motion.h2>
          <motion.p
            className={`mt-4 text-sm md:text-lg leading-6 ${
              isClicked ? "text-white" : "text-black"
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Join thousands of designers and developers using Lorem Colors to
            create stunning colors and improve their design workflow.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Button
              variant="outline"
              size="lg"
              className="mt-8 w-full sm:w-auto bg-white"
              onClick={handleClick}
              disabled={isClicked}
            >
              Start Creating Now
            </Button>
          </motion.div>
        </div>
        <hr />
      </div>
    </motion.div>
  );
}
