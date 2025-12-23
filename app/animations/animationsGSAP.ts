import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const animateImageElement = (element: Element) => {
  gsap.fromTo(
    element,
    { y: "50%", scaleY: 0.6, scaleX: 0.8, opacity: 0 },
    {
      y: 0,
      scale: 1,
      opacity: 1,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: element,
        start: "top-=100 bottom",
        toggleActions: "play none none none",
      },
    }
  );
};

export const animateTextElement = (elementRef: React.RefObject<HTMLElement>) => {
  if (!elementRef.current) return;

  const timer = setTimeout(() => {
    if (!elementRef.current) return;

    gsap.fromTo(
      elementRef.current,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: elementRef.current,
          start: "top bottom-=100",
          toggleActions: "play none none none",
        },
      }
    );
  }, 100);

  return () => {
    clearTimeout(timer);
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  };
};

export const animateTextElementImmediate = (elementRef: React.RefObject<HTMLElement>) => {
  if (!elementRef.current) return;

  gsap.fromTo(
    elementRef.current,
    { y: 30, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "power3.out",
      delay: 0.2,
    }
  );
};