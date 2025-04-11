// Description: Layout component for the application.

"use client";
import "./globals.css";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CSPostHogProvider } from "./providers";
import ErrorBoundary from "./error";

export default function RootLayout({ children }) {
  const router = useRouter();
  const [metadata, setMetadata] = useState({
    title: "Lorem Colors",
    description: "AI powered Color Palette Generator Application",
  });

  useEffect(() => {
    const { pathname } = router;
    switch (pathname) {
      case "/":
        setMetadata({
          title: "Home - Lorem Colors",
          description:
            "Welcome to the AI powered Color Palette Generator Application",
        });
        break;
      case "/genAI-Color-Palette":
        setMetadata({
          title: "GenAI - Color-Palette",
          description: "AI powered Color Palette Generator",
        });
        break;
      case "/color-shades":
        setMetadata({
          title: "Color Shades",
          description: "Color Shades Generator",
        });
        break;
      default:
        setMetadata({
          title: "Lorem Colors",
          description: "AI powered Color Palette Generator Application",
        });
    }
  }, [router]);

  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <CSPostHogProvider>
        <body>
          <ErrorBoundary>{children}</ErrorBoundary>
        </body>
      </CSPostHogProvider>
    </html>
  );
}
