import React, { ChangeEvent } from "react";

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
    <div className="fixed right-6 top-1/2 transform -translate-y-1/2 bg-surface-container/80 backdrop-blur-md border border-outline-variant/50 rounded-2xl shadow-2xl p-6 flex gap-8 z-50 transition-all duration-300 hover:bg-surface-container/90 hover:border-outline-variant">
      <div className="flex flex-col items-center gap-6">
        <div className="text-xs font-mono text-on-surface-variant font-medium">X: {initialXFactor}</div>
        <div className="h-40 w-4 flex justify-center items-center">
          <input
            id="range1"
            type="range"
            min="1"
            max="500"
            value={initialXFactor}
            onChange={handleXChange}
            className="w-40 h-1.5 bg-surface-variant rounded-lg appearance-none cursor-pointer transform -rotate-90 origin-center [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:rounded-xl [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(173,198,255,0.5)] [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-125"
          />
        </div>
      </div>

      <div className="flex flex-col items-center gap-6">
        <div className="text-xs font-mono text-on-surface-variant font-medium">Y: {initialYFactor}</div>
        <div className="h-40 w-4 flex justify-center items-center">
          <input
            id="range2"
            type="range"
            min="1"
            max="500"
            value={initialYFactor}
            onChange={handleYChange}
            className="w-40 h-1.5 bg-surface-variant rounded-lg appearance-none cursor-pointer transform -rotate-90 origin-center [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:rounded-xl [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(173,198,255,0.5)] [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-125"
          />
        </div>
      </div>
    </div>
  );
};

export default FloatingBox;
