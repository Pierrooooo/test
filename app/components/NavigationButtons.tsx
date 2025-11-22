"use client";

import React from "react";
import { ContentType } from "../types";
import { usePanel } from "../context/PanelContext";

const NavigationButtons: React.FC = () => {
  const { openPanel } = usePanel();

  const handleNavigation = (contentType: ContentType) => {
    openPanel(contentType);
  };

  const items: ContentType[] = ["projects", "maisonDeVinci", "about", "shop"];

  return (
    <div className="flex gap-3 md:gap-16">
      {items.map((item) => (
        <div key={item} className="flex">
          <button
            className="nav-button py-3 md:py-4 text-xl md:text-base text-black border-none cursor-pointer transition-all duration-300 uppercase tracking-wider rounded-none font-semibold dark:text-white "
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
  );
};

export default NavigationButtons;
