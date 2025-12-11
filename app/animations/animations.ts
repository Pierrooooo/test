// animations/animations.ts
import { gsap } from "gsap";

/**
 * Animates text elements to appear one after another with a stagger effect
 * @param selector - CSS selector for the text elements to animate
 * @param options - Animation configuration options
 */
export const staggerTextAppear = (
  selector: string | HTMLElement[],
  options: {
    delay?: number;
    duration?: number;
    stagger?: number;
    ease?: string;
    yOffset?: number;
    opacity?: number;
    onComplete?: () => void;
    onStart?: () => void;
  } = {}
) => {
  const {
    delay = 0,
    duration = 0.8,
    stagger = 0.1,
    ease = "power2.out",
    yOffset = 20,
    opacity = 0,
    onComplete,
    onStart,
  } = options;

  // Get elements
  const elements = typeof selector === "string" 
    ? gsap.utils.toArray<HTMLElement>(selector)
    : selector;

  if (!elements.length) {
    console.warn(`No elements found for selector: ${selector}`);
    return;
  }

  // Set initial state
  gsap.set(elements, {
    y: yOffset,
    opacity: opacity,
  });

  // Create the animation
  const tl = gsap.timeline({
    delay,
    onComplete,
    onStart,
  });

  tl.to(elements, {
    y: 0,
    opacity: 1,
    duration,
    ease,
    stagger,
  });

  return tl;
};

/**
 * Animates text characters to appear one after another
 * @param selector - CSS selector for the text element
 * @param options - Animation configuration options
 */
export const staggerCharsAppear = (
  selector: string | HTMLElement,
  options: {
    delay?: number;
    duration?: number;
    stagger?: number;
    ease?: string;
    yOffset?: number;
    opacity?: number;
    onComplete?: () => void;
  } = {}
) => {
  const {
    delay = 0,
    duration = 0.5,
    stagger = 0.03,
    ease = "power2.out",
    yOffset = 20,
    opacity = 0,
    onComplete,
  } = options;

  const element: HTMLElement | null = typeof selector === "string"
    ? (document.querySelector(selector) as HTMLElement | null)
    : selector;

  if (!element) {
    console.warn(`Element not found for selector: ${selector}`);
    return;
  }

  // Split text into spans for each character
  const text = element.textContent || "";
  element.innerHTML = text
    .split("")
    .map(char => `<span class="char">${char === " " ? "&nbsp;" : char}</span>`)
    .join("");

  const chars = element.querySelectorAll(".char");

  // Set initial state
  gsap.set(chars, {
    y: yOffset,
    opacity: opacity,
    display: "inline-block",
  });

  // Create the animation
  const tl = gsap.timeline({
    delay,
    onComplete,
  });

  tl.to(chars, {
    y: 0,
    opacity: 1,
    duration,
    ease,
    stagger,
  });

  return tl;
};

/**
 * Animates text lines to appear one after another
 * Useful for paragraphs split into lines
 * @param selector - CSS selector for the text elements (lines)
 * @param options - Animation configuration options
 */
export const staggerLinesAppear = (
  selector: string | HTMLElement[],
  options: {
    delay?: number;
    duration?: number;
    stagger?: number;
    ease?: string;
    yOffset?: number;
    opacity?: number;
    onComplete?: () => void;
  } = {}
) => {
  const {
    delay = 0,
    duration = 0.6,
    stagger = 0.15,
    ease = "power2.out",
    yOffset = 30,
    opacity = 0,
    onComplete,
  } = options;

  const elements = typeof selector === "string"
    ? gsap.utils.toArray<HTMLElement>(selector)
    : selector;

  if (!elements.length) {
    console.warn(`No elements found for selector: ${selector}`);
    return;
  }

  // Set initial state
  gsap.set(elements, {
    y: yOffset,
    opacity: opacity,
  });

  // Create the animation
  const tl = gsap.timeline({
    delay,
    onComplete,
  });

  tl.to(elements, {
    y: 0,
    opacity: 1,
    duration,
    ease,
    stagger,
  });

  return tl;
};

/**
 * Pre-configured animation presets for common use cases
 */
export const textAnimations = {
  // For headings
  heading: (selector: string) => 
    staggerTextAppear(selector, {
      delay: 0.2,
      duration: 0.8,
      stagger: 0.05,
      yOffset: 30,
    }),

  // For paragraphs
  paragraph: (selector: string) =>
    staggerLinesAppear(selector, {
      delay: 0.4,
      duration: 0.6,
      stagger: 0.1,
      yOffset: 20,
    }),

  // For list items
  listItems: (selector: string) =>
    staggerTextAppear(selector, {
      delay: 0.3,
      duration: 0.5,
      stagger: 0.08,
      yOffset: 15,
    }),

  // For character-by-character animation
  typewriter: (selector: string) =>
    staggerCharsAppear(selector, {
      delay: 0.5,
      duration: 0.4,
      stagger: 0.05,
      yOffset: 0,
    }),
};

/**
 * Utility to split text into lines for line-by-line animation
 * @param element - The HTML element containing text
 * @returns Array of line elements
 */
export const splitTextIntoLines = (element: HTMLElement): HTMLElement[] => {
  const text = element.textContent || "";
  const words = text.split(" ");
  const lines: string[] = [];
  let currentLine = "";

  element.innerHTML = "";

  // Simple line splitting logic (you might want to adjust this based on your layout)
  words.forEach((word, index) => {
    if (currentLine.length + word.length > 50 || index === words.length - 1) {
      if (currentLine) lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine += (currentLine ? " " : "") + word;
    }
  });

  if (currentLine) lines.push(currentLine);

  // Create span for each line
  const lineElements = lines.map((line) => {
    const span = document.createElement("span");
    span.className = "text-line";
    span.style.display = "block";
    span.textContent = line;
    element.appendChild(span);
    return span;
  });

  return lineElements;
};