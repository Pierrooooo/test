"use client";

import { useRef, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { TransitionLinkProps } from "../types";

export default function TransitionLink({ href, children, className, style }: TransitionLinkProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    if (overlayRef.current) {
      const overlay = overlayRef.current;
      
      sessionStorage.setItem("isNavigating", "true");
      
      overlay.style.display = "block";
      overlay.style.transform = "translateY(50%) scaleY(0.6) scaleX(0.6)";
      
      overlay.offsetHeight;
      
      overlay.style.transition = "all 1.2s cubic-bezier(0.16, 1, 0.3, 1)";
      overlay.style.transform = "translateY(0) scale(1)";
      
      setTimeout(() => {
        window.location.href = href;
      }, 1200);
    }
  };

  return (
    <>
      <a href={href} onClick={handleClick} className={className} style={style}>
        {children}
      </a>
      {mounted && createPortal(
        <div
          ref={overlayRef}
          className="fixed inset-0 h-screen w-screen bg-white dark:bg-black pointer-events-none hidden"
          style={{ zIndex: 50000 }}
        />,
        document.body
      )}
    </>
  );
}