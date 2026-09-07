import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Register plugins once. Import { gsap, ScrollTrigger, useGSAP } from here.
gsap.registerPlugin(ScrollTrigger, useGSAP);

/** True when the visitor asked the OS for less motion. Skip effects if so. */
export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export { gsap, ScrollTrigger, useGSAP };
