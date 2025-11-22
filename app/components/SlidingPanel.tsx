"use client";

import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { gsap } from "gsap";
import {
  ProjectsData,
  MaisonDeVinciData,
  AboutData,
  ShopData,
  ContentType,
} from "../types";
import { usePanel } from "../context/PanelContext";
import Link from "next/link";

interface SlidingPanelProps {
  onClose: () => void;
}

export interface SlidingPanelHandle {
  loadContent: (type: ContentType) => void;
}

const SlidingPanel = forwardRef<SlidingPanelHandle, SlidingPanelProps>(
  ({ onClose }, ref) => {
    const [content, setContent] = useState<
      | ProjectsData
      | MaisonDeVinciData
      | AboutData
      | ShopData
      | { error: string }
      | null
    >(null);
    const [contentType, setContentType] = useState<ContentType | "">("");
    const { isOpen, closePanel } = usePanel();

    useEffect(() => {
      const panelElement = document.querySelector(
        ".sliding-panel"
      ) as HTMLElement;
      const overlayElement = document.querySelector(
        ".sliding-overlay"
      ) as HTMLElement;

      if (panelElement && overlayElement) {
        if (isOpen) {
          gsap.to(panelElement, {
            x: "0%",
            duration: 0.8,
            ease: "power3.out",
          });
          gsap.to(overlayElement, {
            opacity: 1,
            pointerEvents: "auto",
            duration: 0.4,
            ease: "power3.out",
          });
        } else {
          gsap.to(panelElement, {
            x: "-100%",
            duration: 0.8,
            ease: "power3.inOut",
          });
          gsap.to(overlayElement, {
            opacity: 0,
            pointerEvents: "none",
            duration: 0.4,
            ease: "power3.inOut",
          });
        }
      }
    }, [isOpen]);

    const loadContent = async (type: ContentType) => {
      setContentType(type);

      try {
        let data;
        switch (type) {
          case "projects":
            data = await import("../data/projects.json");
            break;
          case "maisonDeVinci":
            data = await import("../data/maisonDeVinci.json");
            break;
          case "about":
            data = await import("../data/about.json");
            break;
          case "shop":
            data = await import("../data/shop.json");
            break;
          default:
            return;
        }
        setContent(data.default);
      } catch (error) {
        console.error("Error loading content:", error);
        setContent({ error: "Erreur de chargement" });
      }
    };

    useImperativeHandle(ref, () => ({
      loadContent,
    }));

    const handleClose = () => {
      closePanel();
      onClose();
    };

    const renderContent = () => {
      if (!content) return null;

      if ("error" in content) {
        return (
          <div className="error text-red-500 text-center mt-8">
            {content.error}
          </div>
        );
      }

      switch (contentType) {
        case "projects":
          const projectsData = content as ProjectsData;
          return (
            <div className="projects-content">
              <h1 className="text-3xl md:text-4xl font-bold mb-8 dark:text-white">
                {projectsData.title || "Projets"}
              </h1>
              <div>
                <div className="grid grid-cols-3 pb-2">
                  <span>Projets</span>
                  <span>Categorie</span>
                  <span className="text-right">Année</span>
                </div>
                {projectsData.projects &&
                  projectsData.projects.map((project, index) => (
                    <a
                      key={index}
                      href={`/projects/${index}`}
                      className="block project-item cursor-pointer transition-colors duration-200 py-1 my-1 rounded-lg"
                    >
                      <div className="grid grid-cols-3 ">
                        <h2 className="w-fit">{project.title}</h2>
                        <span className="category italic">
                          {project.category}
                        </span>
                        <span className="year text-right">{project.year}</span>
                      </div>
                    </a>
                  ))}
              </div>
              <div className="fixed bottom-24 w-full max-w-4xl p-6 md:p-24 mx-auto flex justify-end">
                <Link
                  href="/projects"
                  className="text-right text-gray-600 hover:text-black dark:hover:text-white hover:cursor-pointer transition-colors"
                >
                  Voir tous les projets
                </Link>
              </div>
            </div>
          );

        case "maisonDeVinci":
          const maisonData = content as MaisonDeVinciData;
          return (
            <div className="maison-content">
              <h1 className="text-3xl md:text-4xl font-bold mb-8 dark:text-white">
                {maisonData.title}
              </h1>
              {maisonData.paragraphs &&
                maisonData.paragraphs.map((paragraph, index) => (
                  <p
                    key={index}
                    className="mb-4 text-gray-700 leading-relaxed dark:text-gray-300"
                  >
                    {paragraph}
                  </p>
                ))}
            </div>
          );

        case "about":
          const aboutData = content as AboutData;
          return (
            <div className="about-content">
              <h1 className="text-3xl md:text-4xl font-bold mb-8 dark:text-white">
                {aboutData.title || "À Propos"}
              </h1>
              {aboutData.paragraphs &&
                aboutData.paragraphs.map((paragraph, index) => (
                  <p
                    key={index}
                    className="mb-4 text-gray-700 leading-relaxed dark:text-gray-300"
                  >
                    {paragraph}
                  </p>
                ))}
              {aboutData.contact && (
                <div className="contact-info mt-8 flex flex-col gap-4">
                  <a
                    href={`mailto:${aboutData.contact.email}`}
                    className="email-link font-medium text-black dark:text-white hover:underline"
                  >
                    {aboutData.contact.email}
                  </a>
                  {aboutData.contact.links &&
                    aboutData.contact.links.map((link, index) => (
                      <a
                        key={index}
                        href={link.url}
                        className="external-link font-medium text-black dark:text-white hover:underline"
                      >
                        {link.label}
                      </a>
                    ))}
                </div>
              )}
            </div>
          );

        case "shop":
          const shopData = content as ShopData;
          return (
            <div className="shop-content">
              <h1 className="text-3xl md:text-4xl font-bold mb-8 dark:text-white">
                {shopData.title || "Boutique"}
              </h1>
              <p className="construction-message text-xl text-gray-600 text-center mt-8 dark:text-gray-400">
                {shopData.message || "En cours de construction"}
              </p>
            </div>
          );

        default:
          return null;
      }
    };

    return (
      <>
        <div
          className="sliding-overlay fixed inset-0 bg-black/10 backdrop-blur-sm opacity-0 pointer-events-none z-40 transition-all"
          onClick={handleClose}
        ></div>
        <div className="sliding-panel fixed top-0 left-0 w-full md:w-[70%] h-screen bg-white dark:bg-black transform -translate-x-full z-50 overflow-y-auto">
          <button
            className="close-button absolute top-4 right-4 bg-transparent border-none text-3xl cursor-pointer z-10 w-10 h-10 flex items-center justify-center text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
            onClick={handleClose}
          >
            ×
          </button>
          <div className="panel-content min-h-full relative p-6 md:p-12 max-w-4xl mx-auto">
            {renderContent()}
          </div>
        </div>
      </>
    );
  }
);

SlidingPanel.displayName = "SlidingPanel";

export default SlidingPanel;
