import React from "react";

const OutputConsole = ({ currentOutput, setCurrentOutput}: any) => {
  return (
    <div className="flex flex-col h-full">
      <div className='bg-surface-container-highest px-4 py-1 border-b border-outline-variant/30 flex items-center justify-between'>
        <span className="text-label-sm font-label-sm text-on-surface-variant flex items-center gap-2">
           <span className="material-symbols-outlined text-[16px]">terminal</span>
           Output
        </span>
      </div>
      <textarea 
        className="flex-grow resize-none bg-surface-container text-on-surface p-4 font-mono text-code-md outline-none focus:ring-1 focus:ring-primary/50"
        value={currentOutput} 
        onChange={(e) => setCurrentOutput(e.target.value)}
        placeholder="Output will appear here..."
      />
    </div>
  );
};

export default OutputConsole;
