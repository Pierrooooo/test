"use client";

import React, {
  useState,
  useRef,
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
import TransitionLink from "./TransitionLink";
import { staggerTextAppear } from "@/app/animations/animations";

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
    const panelContentRef = useRef<HTMLDivElement>(null);
    const animationTimelineRef = useRef<gsap.core.Timeline | null>(null);

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
            duration: 0.6,
            ease: "power3.inOut",
            onComplete: () => {
              resetAnimations();
              setContent(null);
              setContentType("");
            }
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

    const resetAnimations = () => {
      if (animationTimelineRef.current) {
        animationTimelineRef.current.kill();
        animationTimelineRef.current = null;
      }

      if (panelContentRef.current) {
        const allAnimatedElements = panelContentRef.current.querySelectorAll(
          ".text-item, .text-paragraph, .contact-link"
        );
        
        gsap.set(allAnimatedElements, {
          clearProps: "all"
        });
      }
    };

    useEffect(() => {
      if (content && panelContentRef.current && !("error" in content)) {
        if (animationTimelineRef.current) {
          animationTimelineRef.current.kill();
        }

        const mainTimeline = gsap.timeline();

        setTimeout(() => {
          const textItems = panelContentRef.current?.querySelectorAll(".text-item");
          if (textItems && textItems.length > 0) {
            const tl = staggerTextAppear(Array.from(textItems) as HTMLElement[], {
              delay: 0.2,
              duration: 0.6,
              stagger: 0.05,
              yOffset: 20,
              ease: "power3.out",
            });
            if (tl) mainTimeline.add(tl, 0);
          }

          if (contentType === "about" || contentType === "maisonDeVinci") {
            const paragraphs = panelContentRef.current?.querySelectorAll(".text-paragraph");
            if (paragraphs && paragraphs.length > 0) {
              const tl = staggerTextAppear(Array.from(paragraphs) as HTMLElement[], {
                delay: 0.3,
                duration: 0.6,
                stagger: 0.1,
                yOffset: 30,
                ease: "power3.out",
              });
              if (tl) mainTimeline.add(tl, 0);
            }
          }

          if (contentType === "about") {
            const contactLinks = panelContentRef.current?.querySelectorAll(".contact-link");
            if (contactLinks && contactLinks.length > 0) {
              const tl = staggerTextAppear(Array.from(contactLinks) as HTMLElement[], {
                delay: 0.5,
                duration: 0.5,
                stagger: 0.08,
                yOffset: 15,
                ease: "power3.out",
              });
              if (tl) mainTimeline.add(tl, 0);
            }
          }

          animationTimelineRef.current = mainTimeline;
        }, 50);

        return () => {
          if (animationTimelineRef.current) {
            animationTimelineRef.current.kill();
          }
        };
      }
    }, [content, contentType]);

    const loadContent = async (type: ContentType) => {
      resetAnimations();
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
              <h1 className="text-item text-3xl md:text-4xl font-bold mb-8 dark:text-white opacity-0 translate-y-5">
                {projectsData.title || "Projets"}
              </h1>
              <div>
                <div className="text-item grid grid-cols-3 pb-2 opacity-0 translate-y-5">
                  <span>Projets</span>
                  <span>Categorie</span>
                  <span className="text-right">Année</span>
                </div>
                {projectsData.projects &&
                  projectsData.projects.map((project, index) => (
                    <TransitionLink
                      key={index}
                      href={`/projects/${index}`}
                      className="text-item block project-item cursor-pointer transition-colors duration-200 py-1 my-1 rounded-lg opacity-0 translate-y-5"
                    >
                      <div onClick={handleClose} className="grid grid-cols-3">
                        <h2 className="w-fit">{project.title}</h2>
                        <span className="category italic">
                          {project.category}
                        </span>
                        <span className="year text-right">{project.year}</span>
                      </div>
                    </TransitionLink>
                  ))}
              </div>
              <div className="fixed bottom-24 md:w-full max-w-4xl md:p-6 md:p-24 mx-auto flex justify-end">
                <TransitionLink
                  href="/projects"
                  className="text-item text-right text-gray-600 hover:text-black dark:hover:text-white hover:cursor-pointer transition-colors opacity-0 translate-y-5"
                >
                  Voir tous les projets
                </TransitionLink>
              </div>
            </div>
          );

        case "maisonDeVinci":
          const maisonData = content as MaisonDeVinciData;
          return (
            <div className="maison-content">
              <h1 className="text-item text-3xl md:text-4xl font-bold mb-8 dark:text-white opacity-0 translate-y-5">
                {maisonData.title}
              </h1>
              {maisonData.paragraphs &&
                maisonData.paragraphs.map((paragraph, index) => (
                  <p
                    key={index}
                    className="text-paragraph mb-4 text-gray-700 leading-relaxed dark:text-gray-300 opacity-0 translate-y-[30px]"
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
              <h1 className="text-item text-3xl md:text-4xl font-bold mb-8 dark:text-white opacity-0 translate-y-5">
                {aboutData.title || "À Propos"}
              </h1>
              {aboutData.paragraphs &&
                aboutData.paragraphs.map((paragraph, index) => (
                  <p
                    key={index}
                    className="text-paragraph mb-4 text-gray-700 leading-relaxed dark:text-gray-300 opacity-0 translate-y-[30px]"
                  >
                    {paragraph}
                  </p>
                ))}
              {aboutData.contact && (
                <div className="contact-info mt-8 flex flex-col gap-4">
                  <a
                    href={`mailto:${aboutData.contact.email}`}
                    className="contact-link email-link font-medium text-black dark:text-white hover:underline opacity-0 translate-y-[15px]"
                  >
                    {aboutData.contact.email}
                  </a>
                  {aboutData.contact.links &&
                    aboutData.contact.links.map((link, index) => (
                      <a
                        key={index}
                        href={link.url}
                        className="contact-link external-link font-medium text-black dark:text-white hover:underline opacity-0 translate-y-[15px]"
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
              <h1 className="text-item text-3xl md:text-4xl font-bold mb-8 dark:text-white opacity-0 translate-y-5">
                {shopData.title || "Boutique"}
              </h1>
              <p className="text-item construction-message text-xl text-gray-600 text-center mt-8 dark:text-gray-400 opacity-0 translate-y-5">
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
          className="sliding-overlay cursor-pointer fixed inset-0 bg-black/10 backdrop-blur-sm opacity-0 pointer-events-none z-40 transition-all"
          onClick={handleClose}
        ></div>
        <div className="sliding-panel fixed top-0 left-0 w-full md:w-[70%] h-screen bg-white dark:bg-black transform -translate-x-full z-50 overflow-y-auto">
          <button
            className="close-button absolute top-4 right-4 bg-transparent border-none text-3xl cursor-pointer z-10 w-10 h-10 flex items-center justify-center text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
            onClick={handleClose}
          >
            ×
          </button>
          <div ref={panelContentRef} className="panel-content min-h-full relative p-6 md:p-12 max-w-4xl mx-auto">
            {renderContent()}
          </div>
        </div>
      </>
    );
  }
);

SlidingPanel.displayName = "SlidingPanel";

export default SlidingPanel;