import { useEffect, useRef } from "react";

/**
 * An electric-lightning trail that follows the mouse. Each time the pointer
 * moves, a jagged glowing bolt is drawn from the previous position to the new
 * one and then fades out. Holding the button down (dragging) makes the bolts
 * bigger and forked.
 *
 * Full-viewport <canvas>, pointer-events: none, so it never blocks clicks.
 * Disabled for touch/coarse pointers and when the user prefers reduced motion.
 */

type Bolt = {
  points: { x: number; y: number }[];
  life: number; // 1 -> 0
  width: number;
  hot: boolean; // drawn while dragging = brighter + thicker
};

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
): { x: number; y: number }[] {
  let pts = [
    { x: ax, y: ay },
    { x: bx, y: by },
  ];
  for (let pass = 0; pass < 4; pass++) {
    const next: { x: number; y: number }[] = [];
    for (let i = 0; i < pts.length - 1; i++) {
      const p = pts[i];
      const q = pts[i + 1];
      const mx = (p.x + q.x) / 2;
      const my = (p.y + q.y) / 2;
      // perpendicular offset, shrinking each pass
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

    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (coarse || reduced) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const bolts: Bolt[] = [];
    let last: { x: number; y: number } | null = null;
    let dragging = false;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      if (last) {
        const dist = Math.hypot(x - last.x, y - last.y);
        if (dist > 3) {
          const amp = Math.min(
            dist * (dragging ? 0.9 : 0.5),
            dragging ? 90 : 42,
          );
          bolts.push({
            points: makeBolt(last.x, last.y, x, y, amp),
            life: 1,
            width: dragging ? 2.4 : 1.5,
            hot: dragging,
          });
          // occasional fork
          if (dragging || Math.random() < 0.25) {
            const midp = bolts[bolts.length - 1].points;
            const m = midp[Math.floor(midp.length / 2)];
            bolts.push({
              points: makeBolt(
                m.x,
                m.y,
                m.x + (Math.random() - 0.5) * 120,
                m.y + (Math.random() - 0.5) * 120,
                dragging ? 60 : 30,
              ),
              life: 0.8,
              width: dragging ? 1.6 : 1,
              hot: dragging,
            });
          }
          if (bolts.length > 60) bolts.splice(0, bolts.length - 60);
        }
      }
      last = { x, y };
    };
    const onDown = () => (dragging = true);
    const onUp = () => (dragging = false);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    window.addEventListener("pointercancel", onUp, { passive: true });

    const tick = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.globalCompositeOperation = "lighter";

      for (let i = bolts.length - 1; i >= 0; i--) {
        const b = bolts[i];
        b.life -= b.hot ? 0.06 : 0.09;
        if (b.life <= 0) {
          bolts.splice(i, 1);
          continue;
        }
        const a = b.life;
        // outer glow
        ctx.strokeStyle = GLOW;
        ctx.shadowColor = GLOW;
        ctx.shadowBlur = 18 * a;
        ctx.globalAlpha = 0.35 * a;
        ctx.lineWidth = b.width * 4;
        stroke(ctx, b.points);
        // mid
        ctx.strokeStyle = HOT;
        ctx.shadowBlur = 10 * a;
        ctx.globalAlpha = 0.6 * a;
        ctx.lineWidth = b.width * 2;
        stroke(ctx, b.points);
        // hot core
        ctx.strokeStyle = CORE;
        ctx.shadowColor = HOT;
        ctx.shadowBlur = 6 * a;
        ctx.globalAlpha = a;
        ctx.lineWidth = b.width;
        stroke(ctx, b.points);
      }

      // cursor spark
      if (last) {
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
    };
  }, []);

  return (
    <canvas ref={canvasRef} className="cotl-lightning" aria-hidden="true" />
  );
}

function stroke(
  ctx: CanvasRenderingContext2D,
  pts: { x: number; y: number }[],
) {
  ctx.beginPath();
  ctx.moveTo(pts[0].x, pts[0].y);
  for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i].x, pts[i].y);
  ctx.stroke();
}
