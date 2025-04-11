// Description: Testimonials section component with infinite scroll on desktop and button navigation on mobile.

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, useAnimation } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Testimonials() {
  // Testimonials Data
  const testimonials = [
    {
      content:
        "With Lorem Colors, you are able to speed up your design process and get better results for your work",
      author: {
        name: "Prince Acheampong",
        role: "Lead Designer, UI/UX Cape Coast",
        image: "/Prince_Profile.png",
      },
    },
    {
      content:
        "It is easy to generate our brand identity with Lorem Colors. The color palettes are always on point!",
      author: {
        name: "Reginald Crabbe",
        role: "Creative Director, Reggie Designs",
        image: "/Reggie_Profile.png",
      },
    },
    {
      content:
        "Lorem Colors has become an essential tool for my workflow. Highly recommended for all UI designers!",
      author: {
        name: "Emmanuel Totimeh",
        role: "Full Stack Engineer",
        image: "/Toti_Profile.png",
      },
    },
    {
      content:
        "I enjoy how Lorem Colors makes it simple for me to produce UI colors based on my design requirements.",
      author: {
        name: "Justice Duah",
        role: "Frontend Engineer",
        image: "/Justice_Profile.png",
      },
    },
  ];

  const duplicatedTestimonials = [
    ...testimonials,
    ...testimonials,
    ...testimonials,
  ];

  const controls = useAnimation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const carouselVariants = {
    animate: {
      x: ["0%", "-66.666%"],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 30,
          ease: "linear",
        },
      },
    },
  };

  useEffect(() => {
    if (!isMobile) {
      controls.start("animate");
    } else {
      controls.stop();
    }
  }, [isMobile, controls]);

  // Handlers for mobile navigation buttons
  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1,
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1,
    );
  };

  return (
    <section className="relative bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full mx-auto">
        <div className="mb-16 relative flex flex-col items-center">
          {/* SVG Quote Icon */}
          <div className="absolute top-4 md:left-1/3 left-9 transform -translate-x-1/2 -translate-y-12 w-12 h-12 md:w-24 md:h-24 text-gray-400 pointer-events-none">
            <svg
              stroke="currentColor"
              fill="none"
              viewBox="0 0 144 144"
              aria-hidden="true"
            >
              <path
                strokeWidth={2}
                d="M41.485 15C17.753 31.753 1 59.208 1 89.455c0 24.664 14.891 39.09 32.109 39.09 16.287 0 28.386-13.03 28.386-28.387 0-15.356-10.703-26.524-24.663-26.524-2.792 0-6.515.465-7.446.93 2.327-15.821 17.218-34.435 32.11-43.742L41.485 15zm80.04 0c-23.268 16.753-40.02 44.208-40.02 74.455 0 24.664 14.891 39.09 32.109 39.09 15.822 0 28.386-13.03 28.386-28.387 0-15.356-11.168-26.524-25.129-26.524-2.792 0-6.049.465-6.98.93 2.327-15.821 16.753-34.435 31.644-43.742L121.525 15z"
              />
            </svg>
          </div>

          {/* Section Header */}
          <h2 className="text-2xl font-extrabold text-gray-900 text-center relative z-10">
            What Our Users Say
          </h2>
          <p className="mt-4 text-base font-medium leading-6 text-gray-600 text-center relative z-10">
            Trusted by designers and developers worldwide.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative overflow-hidden">
          {!isMobile ? (
            <motion.div
              className="flex space-x-8"
              variants={carouselVariants}
              animate={controls}
              style={{ width: `${(duplicatedTestimonials.length / 3) * 100}%` }}
            >
              {duplicatedTestimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-white p-6 shadow-lg flex-shrink-0 w-80 md:w-96"
                >
                  {/* Testimonial Content */}
                  <blockquote className="flex-1">
                    <div className="text-gray-700 text-sm md:text-base leading-relaxed mb-6">
                      “{testimonial.content}”
                    </div>
                    <footer className="flex items-center">
                      <div className="flex-shrink-0">
                        <Image
                          className="rounded-full brightness-110"
                          src={testimonial.author.image}
                          alt={`Testimonial author ${testimonial.author.name}`}
                          width={48}
                          height={48}
                          quality={100}
                        />
                      </div>
                      <div className="ml-4">
                        <h4 className="text-lg font-medium text-gray-900">
                          {testimonial.author.name}
                        </h4>
                        <p className="text-sm text-gray-500">
                          {testimonial.author.role}
                        </p>
                      </div>
                    </footer>
                  </blockquote>
                </div>
              ))}
            </motion.div>
          ) : (
            // Mobile: Button Navigation
            <div className="flex flex-col items-center">
              <div className="bg-white p-6 shadow-lg w-full md:w-96">
                {/* Testimonial Content */}
                <blockquote className="flex-1">
                  <div className="text-gray-700 text-sm md:text-base leading-relaxed mb-6">
                    “{testimonials[currentIndex].content}”
                  </div>
                  <footer className="flex items-center">
                    <div className="flex-shrink-0">
                      <Image
                        className="rounded-full brightness-110"
                        src={testimonials[currentIndex].author.image}
                        alt={`Testimonial author ${testimonials[currentIndex].author.name}`}
                        width={48}
                        height={48}
                        quality={100}
                      />
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-medium text-gray-900">
                        {testimonials[currentIndex].author.name}
                      </h4>
                      <p className="text-sm text-gray-500">
                        {testimonials[currentIndex].author.role}
                      </p>
                    </div>
                  </footer>
                </blockquote>
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-4 w-full max-w-md">
                <button
                  onClick={handlePrev}
                  className="bg-gray-300 text-gray-700 p-2 rounded-full shadow active:bg-gray-400 focus:outline-none"
                  aria-label="Previous Testimonial"
                >
                  <ChevronLeft className="size-6" />
                </button>
                <button
                  onClick={handleNext}
                  className="bg-gray-300 text-gray-700 p-2 rounded-full shadow active:bg-gray-400 focus:outline-none"
                  aria-label="Next Testimonial"
                >
                  <ChevronRight className="size-6" />
                </button>
              </div>
            </div>
          )}

          {/* Blurred Gradient Overlay for Desktop */}
          {!isMobile && (
            <>
              <div className="absolute top-0 left-0 h-full w-24 bg-gradient-to-r from-gray-100 to-transparent pointer-events-none"></div>
              <div className="absolute top-0 right-0 h-full w-32 bg-gradient-to-l from-gray-100 to-transparent pointer-events-none"></div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
