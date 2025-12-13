"use client";

import { useEffect, useRef, useState } from "react";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Vérifier si c'est une navigation (pas un refresh)
    const isNavigation = sessionStorage.getItem("isNavigating") === "true";
    
    if (overlayRef.current && isNavigation) {
      const overlay = overlayRef.current;
      
      // Reset initial state
      overlay.style.display = "block";
      overlay.style.transform = "translateY(50%) scaleY(0.6) scaleX(0.8)";
      overlay.style.opacity = "0";
      
      // Force reflow
      overlay.offsetHeight;
      
      // Start animation
      overlay.style.transition = "all 1.2s cubic-bezier(0.16, 1, 0.3, 1)";
      overlay.style.transform = "translateY(0) scale(1)";
      overlay.style.opacity = "1";
      
      // Attendre que la page soit chargée
      const checkIfLoaded = () => {
        if (document.readyState === "complete") {
          setIsLoaded(true);
        } else {
          setTimeout(checkIfLoaded, 50);
        }
      };
      
      // Commencer à vérifier après 1.2s (fin de l'animation d'entrée)
      setTimeout(checkIfLoaded, 1200);
    } else {
      // Pas de navigation, marquer comme chargé immédiatement
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (isLoaded && overlayRef.current) {
      const overlay = overlayRef.current;
      const isNavigation = sessionStorage.getItem("isNavigating") === "true";
      
      if (isNavigation) {
        // Fade out après que les données soient chargées
        overlay.style.transition = "opacity 0.5s ease";
        overlay.style.opacity = "0";
        
        setTimeout(() => {
          overlay.style.display = "none";
          sessionStorage.removeItem("isNavigating");
        }, 500);
      }
    }
  }, [isLoaded]);

  return (
    <>
      <div
        ref={overlayRef}
        className="fixed inset-0 bg-gradient-to-br from-gray-100 to-gray-200 pointer-events-none opacity-0 hidden"
        style={{ zIndex: 50000 }}
      />
      {children}
    </>
  );
}