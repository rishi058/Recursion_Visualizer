import React from "react";
import Heading from "./components/Heading";
import HeroSection from "./components/HeroSection";
import UserGuide from "./components/UserGuide";
import Example from "./components/Example";
import IDE from "./components/IDE/IDE";
import Footer from "./components/Footer";
import PopularAlgorithms from "./components/PopularAlgorithms";
import "./style.css";

function Home() {
  return (
    <>
    <div className="relative min-h-screen">
      <div className="absolute inset-0 -z-50 flex flex-col">
        <div className="w-11/12 h-[30%] bg-gradient-to-r from-gray-900 to-gray-700 triangle"></div>
        <div className="w-full h-[50%] bg-gradient-to-r from-gray-900 to-gray-700 equilateral-triangle self-end"></div>
      </div>
      <div className="md:px-1 lg:px-4 xl:px-6 2xl:px-12">
      <Heading />
      <HeroSection />
      <UserGuide />
      <Example />
      <IDE />
      <PopularAlgorithms/>
      </div>
      <Footer />
    </div>
  </>
  );
}

export default Home;
