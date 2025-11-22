"use client";

import React, { useState } from "react";
import { ContentType } from "../types";
import { usePanel } from "../context/PanelContext";

const NavigationButtons: React.FC = () => {
  const { openPanel } = usePanel();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavigation = (contentType: ContentType) => {
    openPanel(contentType);
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const items: ContentType[] = ["projects", "maisonDeVinci", "about", "shop"];

  return (
    <>
      <div className="md:hidden">
        <button
          className="flex flex-col justify-center items-center w-8 h-8 relative z-50"
          onClick={toggleMenu}
          aria-label="Ouvrir le menu"
        >
          <span
            className={`block w-6 h-0.5 bg-black dark:bg-white transition-all duration-300 ${
              isMenuOpen ? "rotate-45 translate-y-1 w-4" : "-translate-y-1"
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-black dark:bg-white transition-all duration-300 ${
              isMenuOpen ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-black dark:bg-white transition-all duration-300 ${
              isMenuOpen ? "-rotate-45 w-4" : "translate-y-1"
            }`}
          />
        </button>

        <div
          className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-all duration-300 ${
            isMenuOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
          onClick={() => setIsMenuOpen(false)}
        />

        <div
          className={`fixed top-0 left-0 w-full h-full bg-white dark:bg-gray-900 z-40 flex flex-col items-center justify-center gap-8 transition-transform duration-500 ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {items.map((item, index) => (
            <button
              key={item}
              className={`text-2xl font-semibold text-black dark:text-white uppercase tracking-wider py-4 border-none cursor-pointer transition-all duration-300 hover:opacity-70 transform ${
                isMenuOpen
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-8 opacity-0"
              }`}
              style={{
                transitionDelay: isMenuOpen ? `${index * 100}ms` : "0ms"
              }}
              onClick={() => handleNavigation(item)}
            >
              {item === "projects" && "Projets"}
              {item === "maisonDeVinci" && "Maison De Vinci"}
              {item === "about" && "À Propos"}
              {item === "shop" && "Boutique"}
            </button>
          ))}
        </div>
      </div>

      <div className="hidden md:flex gap-3 md:gap-16">
        {items.map((item) => (
          <div key={item} className="flex">
            <button
              className="nav-button py-3 md:py-4 text-xl md:text-base text-black border-none cursor-pointer transition-all duration-300 uppercase tracking-wider rounded-none font-semibold dark:text-white"
              onClick={() => handleNavigation(item)}
            >
              {item === "projects" && "Projets"}
              {item === "maisonDeVinci" && "Maison De Vinci"}
              {item === "about" && "À Propos"}
              {item === "shop" && "Boutique"}
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default NavigationButtons;