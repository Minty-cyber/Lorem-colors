// Description: Features section component.

import { motion } from "framer-motion";
import { Palette, Users, Cpu } from "lucide-react";

const features = [
  {
    name: "Color Palette Generation",
    description:
      "Create customized color schemes effortlessly with our intuitive interface.",
    icon: Palette,
  },
  {
    name: "AI Integration",
    description:
      "Leverage AI for intelligent color recommendations tailored to your brand.",
    icon: Cpu,
  },
  {
    name: "User centered",
    description:
      "Designed with users in mind, our platform is easy to use and navigate.",
    icon: Users,
  },
];

export default function Features() {
  return (
    <div className="py-4 mx-4 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base text-black font-semibold tracking-wide uppercase">
            Features
          </h2>
          <p className="mt-2 text-2xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            A better way to create colors!
          </p>
        </div>

        <div className="mt-10">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
            {features.map((feature, index) => (
              <motion.div
                key={feature.name}
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="items-center">
                  <div className="absolute flex items-center justify-center h-10 w-10 md:w-12 md:h-12 rounded-md bg-primary text-white">
                    <feature.icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                    {feature.name}
                  </p>
                </div>
                <div className="mt-2 ml-16 text-base text-gray-500">
                  {feature.description}
                </div>
              </motion.div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
