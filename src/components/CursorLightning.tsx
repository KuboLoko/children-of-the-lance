import { useEffect, useRef } from "react";

/**
 * Electric-lightning effects on a single full-viewport <canvas>:
 *
 *  - a jagged bolt trails the mouse as it moves (bigger + forked while dragging);
 *  - clicking any `.cotl-btn` / header control fires a radial burst of bolts
 *    plus an expanding ring around that control.
 *
 * Performance notes:
 *  - NO canvas shadowBlur (it's a per-shape gaussian blur — very expensive).
 *    The glow is faked with 3 cheap layered translucent strokes.
 *  - the rAF loop is suspended whenever nothing is on screen, so there is zero
 *    per-frame cost while idle.
 *  - the canvas backing store is kept at 1x device pixels.
 *
 * pointer-events: none, so it never blocks clicks. Skipped entirely for
 * prefers-reduced-motion; the mouse trail is also skipped on coarse pointers
 * (the click burst still works there).
 */

type Point = { x: number; y: number };
type Bolt = { points: Point[]; life: number; decay: number; width: number };
type Ring = { x: number; y: number; r: number; life: number; max: number };

const CORE = "#eaf1ff";
const MID = "#a9c7ff";
const GLOW = "#8163ff";

/** Jagged polyline between a and b via 3 passes of midpoint displacement. */
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
  for (let pass = 0; pass < 3; pass++) {
    const next: Point[] = [];
    for (let i = 0; i < pts.length - 1; i++) {
      const p = pts[i];
      const q = pts[i + 1];
      const nx = -(q.y - p.y);
      const ny = q.x - p.x;
      const len = Math.hypot(nx, ny) || 1;
      const off = (Math.random() - 0.5) * amp * (1 - pass / 4);
      next.push(p, {
        x: (p.x + q.x) / 2 + (nx / len) * off,
        y: (p.y + q.y) / 2 + (ny / len) * off,
      });
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
      // 1x device pixels on purpose — lightning does not need retina sharpness.
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const bolts: Bolt[] = [];
    const rings: Ring[] = [];
    let last: Point | null = null;
    let dragging = false;
    let raf = 0;
    let running = false;

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
      if (bolts.length > 48) bolts.splice(0, bolts.length - 48);
    };

    const ensureLoop = () => {
      if (!running) {
        running = true;
        raf = requestAnimationFrame(tick);
      }
    };

    const onMove = (e: PointerEvent) => {
      const p = { x: e.clientX, y: e.clientY };
      if (last) {
        const dist = Math.hypot(p.x - last.x, p.y - last.y);
        if (dist > 4) {
          const amp = Math.min(
            dist * (dragging ? 0.8 : 0.45),
            dragging ? 80 : 38,
          );
          addBolt(last, p, amp, dragging ? 2.2 : 1.4, dragging ? 0.11 : 0.16);
          if (dragging && Math.random() < 0.6) {
            const mid = bolts[bolts.length - 1].points;
            const m = mid[(mid.length / 2) | 0];
            addBolt(
              m,
              {
                x: m.x + (Math.random() - 0.5) * 90,
                y: m.y + (Math.random() - 0.5) * 90,
              },
              40,
              1.3,
              0.2,
            );
          }
          ensureLoop();
        }
      }
      last = p;
    };
    const onDown = () => (dragging = true);
    const onUp = () => (dragging = false);

    /** Radial burst of bolts + two shockwave rings around a point. */
    const burst = (cx: number, cy: number, radius: number) => {
      const spokes = 12;
      for (let i = 0; i < spokes; i++) {
        const ang = (i / spokes) * Math.PI * 2 + Math.random() * 0.35;
        const reach = radius + 44 + Math.random() * 80;
        addBolt(
          {
            x: cx + Math.cos(ang) * radius * 0.55,
            y: cy + Math.sin(ang) * radius * 0.55,
          },
          { x: cx + Math.cos(ang) * reach, y: cy + Math.sin(ang) * reach },
          reach * 0.3,
          1.8,
          0.13,
        );
        if (Math.random() < 0.35) {
          const ex = cx + Math.cos(ang) * reach;
          const ey = cy + Math.sin(ang) * reach;
          addBolt(
            { x: ex, y: ey },
            {
              x: ex + (Math.random() - 0.5) * 70,
              y: ey + (Math.random() - 0.5) * 70,
            },
            28,
            1,
            0.22,
          );
        }
      }
      rings.push({ x: cx, y: cy, r: radius * 0.5, life: 1, max: radius + 120 });
      rings.push({ x: cx, y: cy, r: radius * 0.5, life: 1, max: radius + 60 });
      ensureLoop();
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

    // Cheap fake glow: 3 layered translucent strokes, NO shadowBlur.
    const drawBolt = (b: Bolt) => {
      ctx.beginPath();
      ctx.moveTo(b.points[0].x, b.points[0].y);
      for (let i = 1; i < b.points.length; i++)
        ctx.lineTo(b.points[i].x, b.points[i].y);
      const a = b.life;
      ctx.strokeStyle = GLOW;
      ctx.globalAlpha = 0.16 * a;
      ctx.lineWidth = b.width * 5;
      ctx.stroke();
      ctx.strokeStyle = MID;
      ctx.globalAlpha = 0.5 * a;
      ctx.lineWidth = b.width * 2;
      ctx.stroke();
      ctx.strokeStyle = CORE;
      ctx.globalAlpha = a;
      ctx.lineWidth = b.width;
      ctx.stroke();
    };

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.globalCompositeOperation = "lighter";

      for (let i = bolts.length - 1; i >= 0; i--) {
        const b = bolts[i];
        b.life -= b.decay;
        if (b.life <= 0) bolts.splice(i, 1);
        else drawBolt(b);
      }

      for (let i = rings.length - 1; i >= 0; i--) {
        const rg = rings[i];
        rg.life -= 0.06;
        rg.r += (rg.max - rg.r) * 0.16;
        if (rg.life <= 0) {
          rings.splice(i, 1);
          continue;
        }
        ctx.strokeStyle = MID;
        ctx.globalAlpha = 0.45 * rg.life;
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.arc(rg.x, rg.y, rg.r, 0, Math.PI * 2);
        ctx.stroke();
      }

      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";

      if (bolts.length || rings.length) {
        raf = requestAnimationFrame(tick);
      } else {
        // Nothing left to draw: clear once and stop burning frames.
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        running = false;
      }
    };

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
