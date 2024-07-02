import React, { useState, ChangeEvent } from "react";

interface FloatingBoxProps {
  initialXFactor: number;
  initialYFactor: number;
  setXFactor: (factor: number) => void;
  setYFactor: (factor: number) => void;
}

const FloatingBox: React.FC<FloatingBoxProps> = ({
  initialXFactor,
  initialYFactor,
  setXFactor,
  setYFactor,
}) => {
  const handleXChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newXFactor = parseInt(event.target.value);
    setXFactor(newXFactor);
  };

  const handleYChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newYFactor = parseInt(event.target.value);
    setYFactor(newYFactor);
  };

  return (
    <div>
      <div className="fixed right-0 top-1/2 transform -translate-y-1/2 bg-white w-[60px] h-[220px] flex justify-center items-center">
        <div className="fixed right-3 top-[10%] transform -translate-y-1/2  text-xs font-bold text-gray-600 z-10">
          X: {initialXFactor}
        </div>
        <div className="transform rotate-90 origin-center">
          <input
            id="range1"
            type="range"
            min="1"
            max="500"
            value={initialXFactor}
            onChange={handleXChange}
            className="w-40 h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
          />
        </div>
      </div>

      <div className="fixed right-[60px] top-1/2 transform -translate-y-1/2 bg-white w-[80px] h-[220px] flex justify-center items-center">
        <div className="transform rotate-90 origin-center">
          <input
            id="range2"
            type="range"
            min="1"
            max="500"
            value={initialYFactor}
            onChange={handleYChange}
            className="w-40 h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
          />
        </div>
        <div className="fixed right-6 top-[10%] transform -translate-y-1/2 text-xs font-bold text-gray-600 z-10">
          Y: {initialYFactor}
        </div>
      </div>
    </div>
  );
};

export default FloatingBox;
