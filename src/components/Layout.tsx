import { useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { CursorLightning } from "./CursorLightning";
import { useScrollReveal } from "../lib/useScrollReveal";

/**
 * App shell: navbar, the current page, and the footer with the disclaimer.
 * Resets scroll on route change and runs the per-page scroll-reveal.
 */
export function Layout() {
  const { pathname } = useLocation();
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useScrollReveal(mainRef, pathname);

  return (
    <>
      <CursorLightning />
      <Navbar />
      <main ref={mainRef}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
