import { useEffect, type RefObject } from "react";
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

  /**
   * Failsafe. If a tab is backgrounded mid-navigation, the GSAP ticker throttles
   * and a reveal can stall part-way — leaving content faded. So after a short
   * wait, and whenever the tab returns to the foreground, force any element that
   * is in (or above) the viewport but still not opaque to its final state.
   *
   * Kept in a plain effect and written straight to `style` (not via a GSAP
   * tween) because the GSAP ticker is the very thing that may be stalled.
   * Off-screen elements are left alone so they keep their normal scroll reveal.
   */
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const root = scope.current;
    if (!root) return;

    const unstick = () => {
      const vh = window.innerHeight || 900;
      root.querySelectorAll<HTMLElement>(SELECTOR).forEach((el) => {
        if (
          el.getBoundingClientRect().top < vh &&
          Number(getComputedStyle(el).opacity) < 0.99
        ) {
          gsap.killTweensOf(el);
          el.style.removeProperty("opacity");
          el.style.removeProperty("transform");
          el.style.removeProperty("translate");
        }
      });
    };

    const timer = window.setTimeout(unstick, 2500);
    const onVisible = () => {
      if (document.visibilityState === "visible") unstick();
    };
    document.addEventListener("visibilitychange", onVisible);

    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [scope, routeKey]);
}
