"use client";

import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import { usePathname } from "next/navigation";
import { ContentType } from '../types';
import SlidingPanel from '../components/SlidingPanel';

interface PanelContextType {
  isOpen: boolean;
  openPanel: (type: ContentType) => void;
  closePanel: () => void;
  currentContent: ContentType | null;
}

const PanelContext = createContext<PanelContextType | undefined>(undefined);

export function PanelProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentContent, setCurrentContent] = useState<ContentType | null>(null);
  const panelRef = useRef<{ loadContent: (type: ContentType) => void }>(null);

  const pathname = usePathname();

  const openPanel = (type: ContentType) => {
    setCurrentContent(type);
    setIsOpen(true);

    setTimeout(() => {
      if (panelRef.current) {
        panelRef.current.loadContent(type);
      }
    }, 100);
  };

  const closePanel = () => {
    setIsOpen(false);
    setCurrentContent(null);
  };

  useEffect(() => {
    if (isOpen) {
      closePanel();
    }
  }, [pathname]);

  return (
    <PanelContext.Provider value={{ isOpen, openPanel, closePanel, currentContent }}>
      {children}
      <SlidingPanel ref={panelRef} onClose={closePanel} />
    </PanelContext.Provider>
  );
}

export function usePanel() {
  const context = useContext(PanelContext);
  if (context === undefined) {
    throw new Error('usePanel must be used within a PanelProvider');
  }
  return context;
}
