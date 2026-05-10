import React from 'react';
import Link from 'next/link';

function TopBar() {
  return (
    <header className="bg-background/80 backdrop-blur-md fixed full-width top-0 z-[100] border-b border-outline-variant/30 flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop h-12">
      <div className="flex items-center gap-6 max-w-container-max mx-auto w-full justify-between">
        <div className="flex items-center gap-6">
          <h1 className="text-headline-sm font-headline-sm font-bold tracking-tight text-on-background">
            Recursion Visualiser
          </h1>
          <nav aria-label="Main Navigation" className="hidden md:flex items-center gap-6">
            <a className="text-on-surface-variant font-medium text-label-sm hover:text-primary transition-colors duration-200" href="#how-to-use">How to Use</a>
            <a className="text-on-surface-variant font-medium text-label-sm hover:text-primary transition-colors duration-200" href="#playground">Playground</a>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <a className="bg-primary text-on-primary text-xs font-medium px-4 py-1 rounded hover:bg-primary-fixed transition-colors flex items-center gap-2" href="#playground">
            Visualize
            <span className="material-symbols-outlined !text-[16px]">play_arrow</span>
          </a>
        </div>
      </div>
    </header>
  );
}

export default TopBar;
