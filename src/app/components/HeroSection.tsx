"use client";

import React from "react";
import Image from "next/image";
import heroImage from "../../../public/hero.png";
import Lottie from "lottie-react";
import Animation from "../../../public/animation.json"

function HeroSection() {
  return (
    <>
      <div className="md:block lg:flex pt-20 w-full justify-evenly">
        <div className="w-full px-14 lg:w-1/3">
          <p className="pt-10 text-2xl font-medium text-justify bg-clip-text text-transparent bg-gradient-to-r from-gray-300 to-gray-500">
            A powerful tool designed to help developers easily visualize and
            debug the recursion stack, enhancing understanding and efficiency in
            solving complex Recursive and Dynamic programming problems.
          </p>
        </div>
        <div className="w-full flex justify-center items-center  pt-5 px-14 lg:pt-0 lg:w-1/3">
        <Lottie animationData={Animation}
         loop={true}
         autoplay={true}
         style={{ width: 300, height: 300 }}
        />
        </div>
      </div>
    </>
  );
}

export default HeroSection;
