'use client';

import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

// Enregistrer le plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollToPlugin);
}

const Footer = () => {
  const scrollToTop = () => {
    gsap.to(window, {
      duration: 1,
      scrollTo: 0, // Simplifié - juste la position Y
      ease: "power2.inOut"
    });
  };

  return (
    <footer className="bg-black text-white dark:bg-black dark:text-white flex justify-between items-center px-6 py-2 md:px-20 md:py-8">
      <div className="footer-left flex flex-col gap-4 md:gap-8 text-sm">
        <a 
          href="mailto:" 
          className="footer-link hover:opacity-70 transition-opacity"
        >
          Email
        </a>
        <a
          href="https://www.instagram.com/nicocaillet.raw/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="footer-link hover:opacity-70 transition-opacity"
        >
          Instagram
        </a>
        <a
          href="https://www.behance.net/nicolas-caillet/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="footer-link hover:opacity-70 transition-opacity"
        >
          Behance
        </a>
        <a
          href="https://www.linkedin.com/in/nicolas-caillet-57ab7a128/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="footer-link hover:opacity-70 transition-opacity"
        >
          Linkedin
        </a>
        <a
          href="/cgu-cgv" 
          className="footer-link hover:opacity-70 transition-opacity"
        >
          CGU & CGV
        </a>
      </div>
      
      <div className="footer-right">
        <button 
          className="scroll-to-top bg-gray-800 dark:bg-gray-200 text-white dark:text-black border-none w-10 h-10 rounded-full cursor-pointer text-lg transition-colors hover:bg-gray-600 dark:hover:bg-gray-400 flex items-center justify-center"
          onClick={scrollToTop}
        >
          ↑
        </button>
      </div>
    </footer>
  );
};

export default Footer;