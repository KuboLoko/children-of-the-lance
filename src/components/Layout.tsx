import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

/**
 * App shell: navbar, the current page, and the footer with the disclaimer.
 * Also resets scroll to the top on every route change.
 */
export function Layout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
