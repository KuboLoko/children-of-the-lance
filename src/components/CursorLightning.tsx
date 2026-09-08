import { useEffect, useRef } from "react";

/**
 * Electric-lightning effects on a single full-viewport <canvas>:
 *
 *  - a jagged glowing bolt trails the mouse as it moves; holding the button
 *    down (dragging) makes the bolts bigger and forked;
 *  - clicking any `.cotl-btn` fires a radial "explosion" of bolts plus an
 *    expanding shockwave ring around that button.
 *
 * pointer-events: none, so it never blocks clicks. The whole thing is skipped
 * when the visitor prefers reduced motion; the mouse trail is also skipped on
 * touch / coarse pointers (the click burst still works there).
 */

type Point = { x: number; y: number };
type Bolt = { points: Point[]; life: number; decay: number; width: number };
type Ring = { x: number; y: number; r: number; life: number; max: number };

const CORE = "#eaf1ff";
const GLOW = "#8163ff";
const HOT = "#a9c7ff";

/** Jagged polyline between a and b via midpoint displacement. */
function makeBolt(
  ax: number,
  ay: number,
  bx: number,
  by: number,
  amp: number,
): Point[] {
  let pts: Point[] = [
    { x: ax, y: ay },
    { x: bx, y: by },
  ];
  for (let pass = 0; pass < 4; pass++) {
    const next: Point[] = [];
    for (let i = 0; i < pts.length - 1; i++) {
      const p = pts[i];
      const q = pts[i + 1];
      const mx = (p.x + q.x) / 2;
      const my = (p.y + q.y) / 2;
      const nx = -(q.y - p.y);
      const ny = q.x - p.x;
      const len = Math.hypot(nx, ny) || 1;
      const off = (Math.random() - 0.5) * amp * (1 - pass / 5);
      next.push(p, { x: mx + (nx / len) * off, y: my + (ny / len) * off });
    }
    next.push(pts[pts.length - 1]);
    pts = next;
  }
  return pts;
}

export function CursorLightning() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const coarse = window.matchMedia("(pointer: coarse)").matches;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const bolts: Bolt[] = [];
    const rings: Ring[] = [];
    let last: Point | null = null;
    let dragging = false;
    let raf = 0;

    const addBolt = (
      a: Point,
      b: Point,
      amp: number,
      width: number,
      decay: number,
    ) => {
      bolts.push({
        points: makeBolt(a.x, a.y, b.x, b.y, amp),
        life: 1,
        decay,
        width,
      });
      if (bolts.length > 90) bolts.splice(0, bolts.length - 90);
    };

    const onMove = (e: PointerEvent) => {
      const p = { x: e.clientX, y: e.clientY };
      if (last) {
        const dist = Math.hypot(p.x - last.x, p.y - last.y);
        if (dist > 3) {
          const amp = Math.min(
            dist * (dragging ? 0.9 : 0.5),
            dragging ? 90 : 42,
          );
          addBolt(last, p, amp, dragging ? 2.4 : 1.5, dragging ? 0.06 : 0.09);
          if (dragging || Math.random() < 0.25) {
            const mid = bolts[bolts.length - 1].points;
            const m = mid[Math.floor(mid.length / 2)];
            addBolt(
              m,
              {
                x: m.x + (Math.random() - 0.5) * 120,
                y: m.y + (Math.random() - 0.5) * 120,
              },
              dragging ? 60 : 30,
              dragging ? 1.6 : 1,
              0.12,
            );
          }
        }
      }
      last = p;
    };
    const onDown = () => (dragging = true);
    const onUp = () => (dragging = false);

    /** Radial explosion of bolts + a shockwave ring around a point. */
    const burst = (cx: number, cy: number, radius: number) => {
      const spokes = 16;
      for (let i = 0; i < spokes; i++) {
        const ang = (i / spokes) * Math.PI * 2 + Math.random() * 0.3;
        const reach = radius + 50 + Math.random() * 90;
        const sx = cx + Math.cos(ang) * radius * 0.6;
        const sy = cy + Math.sin(ang) * radius * 0.6;
        const ex = cx + Math.cos(ang) * reach;
        const ey = cy + Math.sin(ang) * reach;
        addBolt({ x: sx, y: sy }, { x: ex, y: ey }, reach * 0.35, 2, 0.07);
        if (Math.random() < 0.5) {
          addBolt(
            { x: ex, y: ey },
            {
              x: ex + Math.cos(ang) * 40 + (Math.random() - 0.5) * 60,
              y: ey + Math.sin(ang) * 40 + (Math.random() - 0.5) * 60,
            },
            30,
            1.2,
            0.12,
          );
        }
      }
      rings.push({ x: cx, y: cy, r: radius * 0.5, life: 1, max: radius + 140 });
      rings.push({ x: cx, y: cy, r: radius * 0.5, life: 1, max: radius + 70 });
    };

    // Page CTAs plus every clickable control in the header spark on click.
    const ZAP = ".cotl-btn, .cotl-nav a, .cotl-nav button";
    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement | null)?.closest(ZAP);
      if (!el || el.getAttribute("aria-disabled") === "true") return;
      const r = el.getBoundingClientRect();
      const radius = Math.max(Math.max(r.width, r.height) / 2 + 8, 20);
      burst(r.left + r.width / 2, r.top + r.height / 2, radius);
    };

    if (!coarse) {
      window.addEventListener("pointermove", onMove, { passive: true });
      window.addEventListener("pointerdown", onDown, { passive: true });
      window.addEventListener("pointerup", onUp, { passive: true });
      window.addEventListener("pointercancel", onUp, { passive: true });
    }
    window.addEventListener("click", onClick, { capture: true });

    // One stroke pass along a bolt: `alpha` and `widthMul` scale with life `a`.
    const strokePass = (
      b: Bolt,
      a: number,
      color: string,
      glow: string,
      blur: number,
      alpha: number,
      widthMul: number,
    ) => {
      ctx.strokeStyle = color;
      ctx.shadowColor = glow;
      ctx.shadowBlur = blur * a;
      ctx.globalAlpha = alpha * a;
      ctx.lineWidth = b.width * widthMul;
      ctx.beginPath();
      ctx.moveTo(b.points[0].x, b.points[0].y);
      for (let i = 1; i < b.points.length; i++)
        ctx.lineTo(b.points[i].x, b.points[i].y);
      ctx.stroke();
    };

    const tick = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.globalCompositeOperation = "lighter";

      for (let i = bolts.length - 1; i >= 0; i--) {
        const b = bolts[i];
        b.life -= b.decay;
        if (b.life <= 0) {
          bolts.splice(i, 1);
          continue;
        }
        const a = b.life;
        strokePass(b, a, GLOW, GLOW, 18, 0.35, 4); // outer glow
        strokePass(b, a, HOT, HOT, 10, 0.6, 2); // mid
        strokePass(b, a, CORE, HOT, 6, 1, 1); // hot core
      }

      for (let i = rings.length - 1; i >= 0; i--) {
        const rg = rings[i];
        rg.life -= 0.05;
        rg.r += (rg.max - rg.r) * 0.18;
        if (rg.life <= 0) {
          rings.splice(i, 1);
          continue;
        }
        ctx.strokeStyle = HOT;
        ctx.shadowColor = GLOW;
        ctx.shadowBlur = 20 * rg.life;
        ctx.globalAlpha = 0.5 * rg.life;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(rg.x, rg.y, rg.r, 0, Math.PI * 2);
        ctx.stroke();
      }

      if (last && !coarse) {
        ctx.shadowColor = GLOW;
        ctx.shadowBlur = 16;
        ctx.fillStyle = CORE;
        ctx.globalAlpha = 0.9;
        ctx.beginPath();
        ctx.arc(last.x, last.y, dragging ? 2.6 : 1.8, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
      ctx.globalCompositeOperation = "source-over";
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
      window.removeEventListener("click", onClick, {
        capture: true,
      } as EventListenerOptions);
    };
  }, []);

  return (
    <canvas ref={canvasRef} className="cotl-lightning" aria-hidden="true" />
  );
}
