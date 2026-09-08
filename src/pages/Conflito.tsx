import { useRef } from "react";
import { Link } from "react-router-dom";
import { useCotl } from "../i18n/LocaleContext";
import { useDocumentMeta } from "../lib/useDocumentMeta";
import {
  gsap,
  ScrollTrigger,
  useGSAP,
  prefersReducedMotion,
} from "../lib/gsap";

export function Conflito() {
  const { t, locale } = useCotl();
  const c = t.conflito;
  useDocumentMeta({
    title: `${c.h1} · Children of the Lance`,
    description: c.lead,
    path: "/conflito",
    locale,
  });

  const locations = ["Solace", "Qualinesti", "Palanthas", c.ruinsOfNeraka];

  const wrapRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const fill =
        wrapRef.current?.querySelector<HTMLElement>(".cotl-spine__fill");
      const prose = wrapRef.current?.querySelector<HTMLElement>(".cotl-prose");
      if (!fill || !prose) return;

      if (prefersReducedMotion()) {
        gsap.set(fill, { scaleY: 1 });
        return;
      }
      // The lightning spine "charges" from top to bottom as the section scrolls.
      gsap.fromTo(
        fill,
        { scaleY: 0 },
        {
          scaleY: 1,
          transformOrigin: "top",
          ease: "none",
          scrollTrigger: {
            trigger: prose,
            start: "top 72%",
            end: "bottom 85%",
            scrub: true,
          },
        },
      );
      ScrollTrigger.refresh();
    },
    { scope: wrapRef, dependencies: [t], revertOnUpdate: true },
  );

  return (
    <div className="cotl-container cotl-section">
      <p className="cotl-eyebrow">{c.eyebrow}</p>
      <h1>{c.h1}</h1>

      <div className="cotl-conflict" ref={wrapRef}>
        <div className="cotl-spine" aria-hidden="true">
          <span className="cotl-spine__fill" />
        </div>

        <div className="cotl-prose">
          <p className="cotl-lead">{c.lead}</p>

          <h2>{c.h2Search}</h2>
          <p>{c.silverChild}</p>

          <h2>{c.h2Knights}</h2>
          {c.knights.map((p, i) => (
            <p key={i}>{p}</p>
          ))}

          <h2>{c.h2Legacy}</h2>
          <p>
            {c.legacy} <em>Children versus Legacy.</em>
          </p>

          <h2>{c.h2Where}</h2>
          <p>{c.whereIntro}</p>
        </div>
      </div>

      <div className="cotl-chips" style={{ marginTop: "1rem" }}>
        {locations.map((place) => (
          <span key={place} className="cotl-chip">
            {place}
          </span>
        ))}
      </div>

      <hr className="cotl-divider" />
      <Link className="cotl-btn cotl-btn--primary" to="/ler">
        {t.hero.ctaRead}
      </Link>
    </div>
  );
}
