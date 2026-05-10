import React from 'react';
import { FaLinkedin, FaGithub } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="w-full bg-surface-container-lowest border-t border-outline-variant/20 py-4 px-margin-mobile md:px-margin-desktop z-10 relative">
      <div className="max-w-container-max mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-label-sm font-bold text-on-surface">
          © 2026 Recursion Visualiser. Built for clarity.
        </div>
        <div className="flex items-center gap-4 text-on-surface-variant">
          <span className="text-label-sm font-label-sm">Connect with me:</span>
          <a aria-label="LinkedIn" className="hover:text-primary transition-colors" href="https://www.linkedin.com/in/rishi-raj-32648a196/" target="_blank" rel="noreferrer">
            <FaLinkedin className="w-5 h-5" />
          </a>
          <a aria-label="GitHub" className="hover:text-primary transition-colors" href="https://github.com/rishi058" target="_blank" rel="noreferrer">
            <FaGithub className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
