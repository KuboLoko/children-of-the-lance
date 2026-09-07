import type { RefObject } from "react";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "./gsap";

// Elements inside a page that rise + fade in as they scroll into view.
const SELECTOR = [
  ".cotl-eyebrow",
  "main h1",
  "main h2",
  ".cotl-lead",
  ".cotl-prose > p",
  ".cotl-card",
  ".cotl-chip",
  ".cotl-list li",
  ".cotl-hero__logo",
  ".cotl-hero__logo-fallback",
  ".cotl-hero__tagline",
  ".cotl-hero__premise",
  ".cotl-hero__cta",
  ".cotl-divider",
].join(", ");

/**
 * Staggered scroll-reveal for the current page. Re-runs whenever `routeKey`
 * changes and reverts its own inline styles / triggers on the way out.
 *
 * No-op when the visitor prefers reduced motion.
 */
export function useScrollReveal(
  scope: RefObject<HTMLElement | null>,
  routeKey: string,
) {
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const els = scope.current?.querySelectorAll<HTMLElement>(SELECTOR);
      if (!els || !els.length) return;

      gsap.set(els, { opacity: 0, y: 24 });
      ScrollTrigger.batch(els, {
        start: "top 90%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
            stagger: 0.07,
            overwrite: true,
          }),
      });
      // Elements already on-screen at load: reveal immediately.
      ScrollTrigger.refresh();
    },
    { scope, dependencies: [routeKey], revertOnUpdate: true },
  );
}
