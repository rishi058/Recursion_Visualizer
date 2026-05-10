"use client";

import React, { useEffect, useRef } from "react";
import TopBar from "./components/TopBar";
import HeroSection from "./components/HeroSection";
import UserGuide from "./components/UserGuide";
import Example from "./components/Example";
import IDE from "./components/IDE/IDE";
import Footer from "./components/Footer";
import PopularAlgorithms from "./components/PopularAlgorithms";

function Home() {
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    function scrollToHash() {
      const hash = window.location.hash;
      if (hash) {
        const id = hash.replace("#", "");
        const target = document.getElementById(id);
        const container = mainRef.current;
        if (target && container) {
          // scrollIntoView doesn't work on custom scroll containers, use offsetTop
          container.scrollTo({ top: target.offsetTop, behavior: "smooth" });
        }
      }
    }

    // Handle initial load with hash (e.g. back-button → /#playground)
    scrollToHash();

    // Handle future popstate events (back/forward)
    window.addEventListener("popstate", scrollToHash);
    return () => window.removeEventListener("popstate", scrollToHash);
  }, []);

  return (
    <div className="relative h-screen bg-background text-on-background overflow-hidden">
      <TopBar />
      <main ref={mainRef} className="h-full w-full overflow-y-auto snap-y snap-mandatory scroll-smooth pb-10">
        <HeroSection />
        
        <UserGuide />
        
        {/* Example section - 3rd position */}
        <Example />

        {/* IDE / Playground section - 4th position */}
        <IDE />
        
        {/* Extra content section */}
        <section className="snap-start h-screen flex flex-col pt-16 w-full mx-auto">
          <div className="flex-grow flex flex-col justify-center py-8 px-margin-mobile md:px-margin-desktop w-full max-w-container-max mx-auto">
             <PopularAlgorithms/>
          </div>
          <Footer />
        </section>
      </main>
    </div>
  );
}

export default Home;
