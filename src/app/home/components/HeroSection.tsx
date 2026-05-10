"use client";

import React, { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { Container, Engine } from "@tsparticles/engine";

function HeroSection() {
  const [init, setInit] = useState(false);
  const [options, setOptions] = useState<any>(null);

  useEffect(() => {
    // Initialize particles engine
    initParticlesEngine(async (engine: Engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });

    // Fetch options from public/tsparticle.js
    fetch("/tsparticle.json")
      .then((res) => res.json())
      .then((data) => {
        const config = Array.isArray(data) ? data[0] : data;
        
        // Override some settings for the Hero section container
        setOptions({
          ...config,
          fullScreen: { enable: false },
          background: { color: { value: "transparent" } },
          interactivity: {
            ...config.interactivity,
            detectsOn: "parent" // Ensure interaction is relative to the container
          }
        });
      })
      .catch((err) => console.error("Failed to load particle options:", err));
  }, []);

  const particlesLoaded = async (container?: Container): Promise<void> => {
    console.log("Particles loaded:", container);
  };

  return (
    <section className="flex flex-col md:flex-row items-center gap-12 lg:gap-24 relative min-h-screen pt-16 px-margin-mobile md:px-margin-desktop w-full max-w-container-max mx-auto snap-start justify-center">
      {/* Abstract Background Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-[600px] bg-primary/5 blur-[120px] rounded-full pointer-events-none -z-10 transform translate-x-1/4 -translate-y-1/4"></div>
      <div className="absolute bottom-1/2 left-0 w-1/3 h-[400px] bg-tertiary/5 blur-[100px] rounded-full pointer-events-none -z-10 transform -translate-x-1/2"></div>
      
      <div className="flex-1 flex flex-col gap-6 z-10">
        <h2 className="text-[38px] md:text-[54px] font-headline-lg font-bold leading-tight tracking-tight text-on-surface">
          Master <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-tertiary">Recursion</span><br/>Through Vision.
        </h2>
        <p className="text-body-lg font-body-lg text-on-surface-variant max-w-2xl">
          A powerful tool designed to help developers easily visualize and debug the recursion stack, enhancing understanding and efficiency in solving complex Recursive and Dynamic programming problems.
        </p>
        <div className="flex flex-wrap items-center gap-4 mt-4">
          <a className="bg-primary text-on-primary text-label-sm font-label-sm px-6 py-3 rounded-lg hover:bg-primary-fixed transition-colors flex items-center gap-2 shadow-[0_0_20px_rgba(173,198,255,0.3)]" href="#playground">
            Start Experimenting
            <span className="material-symbols-outlined !text-[18px]">rocket_launch</span>
          </a>
          <a className="bg-surface-container text-on-surface text-label-sm font-label-sm px-6 py-3 rounded-lg border border-outline-variant/50 hover:bg-surface-container-high transition-colors flex items-center gap-2" href="#how-to-use">
            How to Use
            <span className="material-symbols-outlined !text-[18px]">menu_book</span>
          </a>
        </div>
      </div>
      
      <div className="flex-1 w-full max-w-lg lg:max-w-none relative z-10">
        <div className="relative w-full aspect-square md:aspect-auto md:h-[500px] bg-surface-container border border-outline-variant/30 rounded-xl overflow-hidden shadow-2xl flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-br from-surface-container-high to-surface-container-lowest opacity-50"></div>
          
          {init && options && (
            <Particles
              id="tsparticles"
              particlesLoaded={particlesLoaded}
              options={options}
              className="absolute inset-0"
            />
          )}
        </div>
      </div>
    </section>
  );
}

export default HeroSection;


