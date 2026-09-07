import { useRef } from "react";
import { Link } from "react-router-dom";
import { COTL_TAGLINE, COTL_TITLE } from "../data/site";
import { useCotl } from "../i18n/LocaleContext";
import { useDocumentMeta } from "../lib/useDocumentMeta";
import {
  gsap,
  ScrollTrigger,
  useGSAP,
  prefersReducedMotion,
} from "../lib/gsap";
import { Logo } from "../components/Logo";

export function Home() {
  const { t } = useCotl();
  useDocumentMeta("Children of the Lance", t.hero.hook);

  const heroRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const root = heroRef.current;
      if (!root) return;

      const q = gsap.utils.selector(root);
      const orbA = q(".cotl-hero__orb--a");
      const orbB = q(".cotl-hero__orb--b");
      const ring = q(".cotl-hero__ring");
      const logoWrap = q(".cotl-hero__logo-wrap");

      // Scroll parallax: layers drift at different rates, ring turns.
      gsap.to(orbA, {
        yPercent: 26,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
      gsap.to(orbB, {
        yPercent: -18,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
      gsap.to(ring, {
        rotate: 90,
        yPercent: 12,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Mouse parallax: each layer leans toward the cursor, smoothed.
      const setX = {
        a: gsap.quickTo(orbA, "x", { duration: 0.7, ease: "power3" }),
        b: gsap.quickTo(orbB, "x", { duration: 0.7, ease: "power3" }),
        r: gsap.quickTo(ring, "x", { duration: 0.9, ease: "power3" }),
        l: gsap.quickTo(logoWrap, "x", { duration: 0.5, ease: "power3" }),
      };
      const setY = {
        a: gsap.quickTo(orbA, "y", { duration: 0.7, ease: "power3" }),
        b: gsap.quickTo(orbB, "y", { duration: 0.7, ease: "power3" }),
        r: gsap.quickTo(ring, "y", { duration: 0.9, ease: "power3" }),
        l: gsap.quickTo(logoWrap, "y", { duration: 0.5, ease: "power3" }),
      };

      const onMove = (e: PointerEvent) => {
        const r = root.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        setX.a(px * 40);
        setY.a(py * 40);
        setX.b(px * -26);
        setY.b(py * -26);
        setX.r(px * 18);
        setY.r(py * 18);
        setX.l(px * 14);
        setY.l(py * 14);
      };
      root.addEventListener("pointermove", onMove);

      ScrollTrigger.refresh();
      return () => root.removeEventListener("pointermove", onMove);
    },
    { scope: heroRef },
  );

  return (
    <section className="cotl-hero cotl-container" ref={heroRef}>
      <div className="cotl-hero__fx" aria-hidden="true">
        <span className="cotl-hero__orb cotl-hero__orb--a" />
        <span className="cotl-hero__orb cotl-hero__orb--b" />
        <span className="cotl-hero__ring" />
      </div>

      <div className="cotl-hero__logo-wrap">
        <Logo
          className="cotl-hero__logo"
          fallbackClassName="cotl-hero__logo-fallback"
        />
      </div>

      <h1>{COTL_TITLE}</h1>
      <p className="cotl-hero__tagline">{COTL_TAGLINE}</p>
      <p className="cotl-hero__premise">{t.hero.hook}</p>

      <div className="cotl-hero__cta">
        <Link className="cotl-btn cotl-btn--primary" to="/ler">
          {t.hero.ctaRead}
        </Link>
        <Link className="cotl-btn cotl-btn--ghost" to="/historia">
          {t.hero.ctaAbout}
        </Link>
      </div>
    </section>
  );
}
