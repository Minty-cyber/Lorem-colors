//  Description: The main component for the landing page.

import Header from "./Header";
import Hero from "./Hero";
import Features from "./Features";
import Testimonials from "./Testimonials";
import CallToAction from "./CallToAction";
import Footer from "./Footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <Hero />
        <Features />
        <Testimonials />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
}
