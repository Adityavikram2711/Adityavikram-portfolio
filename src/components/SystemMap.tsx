import { useEffect, useRef, type RefObject } from "react";

interface MapNode {
  id: string;
  label: string;
  x: number;
  y: number;
}

const NODES: MapNode[] = [
  { id: "dsa", label: "DSA", x: 0.72, y: 0.1 },
  { id: "cpp", label: "C++", x: 0.64, y: 0.28 },
  { id: "systems", label: "SYSTEMS", x: 0.8, y: 0.36 },
  { id: "networking", label: "Networking", x: 0.96, y: 0.24 },
  { id: "fullstack", label: "Full-Stack", x: 0.6, y: 0.74 },
  { id: "devops", label: "DevOps", x: 0.91, y: 0.66 },
  { id: "aiml", label: "AI / ML", x: 0.78, y: 0.88 },
];

const EDGES: [string, string][] = [
  ["dsa", "cpp"],
  ["dsa", "systems"],
  ["cpp", "systems"],
  ["systems", "networking"],
  ["systems", "devops"],
  ["systems", "fullstack"],
  ["fullstack", "aiml"],
];

const DECOR_POINTS = [
  { x: 0.6, y: 0.5 },
  { x: 0.86, y: 0.14 },
  { x: 0.6, y: 0.75 },
  { x: 0.99, y: 0.46 },
  { x: 0.87, y: 0.9 },
  { x: 0.73, y: 0.46 },
  { x: 0.85, y: 0.55 },
];

const NODE_BASE_ALPHA = 0.55;
const NODE_ACTIVE_ALPHA = 0.95;
const LINE_BASE_ALPHA = 0.24;
const LINE_ACTIVE_ALPHA = 0.5;
const LABEL_BASE_ALPHA = 0.5;
const LABEL_ACTIVE_ALPHA = 0.92;
const PROXIMITY_RADIUS = 170;
const EASE = 0.08;
const PARALLAX_MAX = 8;
// Matches the Hero's own `lg:` breakpoint, where the terminal also appears —
// below this the layout is single-column and there's no safe open space for the map.
const MIN_WIDTH_FOR_MAP = 1024;

interface SystemMapProps {
  containerRef: RefObject<HTMLElement | null>;
}

export function SystemMap({ containerRef }: SystemMapProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
    const staticMode = reducedMotion || coarsePointer;
    const showDecor = !coarsePointer;

    const accentBlue = readCssColor("--color-accent-blue", "79,124,255");
    const accentCyan = readCssColor("--color-accent-cyan", "63,214,208");

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const brightness = new Map<string, number>(NODES.map((n) => [n.id, 0]));
    const mouse = { x: -9999, y: -9999, active: false };
    const parallax = { x: 0, y: 0 };

    function resize() {
      if (!container || !canvas) return;
      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function nodePos(n: MapNode) {
      return { x: n.x * width, y: n.y * height };
    }

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      if (width < MIN_WIDTH_FOR_MAP) return;
      ctx.save();
      ctx.translate(parallax.x, parallax.y);

      // decorative points (static, very faint, no labels)
      if (showDecor) {
        ctx.fillStyle = `rgba(${accentBlue}, 0.16)`;
        for (const p of DECOR_POINTS) {
          ctx.beginPath();
          ctx.arc(p.x * width, p.y * height, 1.6, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // edges
      for (const [aId, bId] of EDGES) {
        const a = NODES.find((n) => n.id === aId)!;
        const b = NODES.find((n) => n.id === bId)!;
        const pa = nodePos(a);
        const pb = nodePos(b);
        const t = Math.max(brightness.get(aId) ?? 0, brightness.get(bId) ?? 0);
        const alpha = LINE_BASE_ALPHA + (LINE_ACTIVE_ALPHA - LINE_BASE_ALPHA) * t;
        ctx.strokeStyle = `rgba(${accentBlue}, ${alpha})`;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(pa.x, pa.y);
        ctx.lineTo(pb.x, pb.y);
        ctx.stroke();
      }

      // nodes + labels
      ctx.font = "11px 'JetBrains Mono', ui-monospace, Menlo, monospace";
      ctx.textBaseline = "middle";
      for (const n of NODES) {
        const t = brightness.get(n.id) ?? 0;
        const p = nodePos(n);
        const nodeAlpha = NODE_BASE_ALPHA + (NODE_ACTIVE_ALPHA - NODE_BASE_ALPHA) * t;
        const radius = 3.4 + t * 2.2;

        const glowRadius = radius + 9 + t * 8;
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glowRadius);
        gradient.addColorStop(0, `rgba(${accentCyan}, ${0.22 + 0.3 * t})`);
        gradient.addColorStop(1, `rgba(${accentCyan}, 0)`);
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, glowRadius, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `rgba(${accentCyan}, ${nodeAlpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fill();

        const labelAlpha = LABEL_BASE_ALPHA + (LABEL_ACTIVE_ALPHA - LABEL_BASE_ALPHA) * t;
        ctx.fillStyle = `rgba(238, 241, 246, ${labelAlpha})`;
        ctx.textAlign = p.x > width - 70 ? "right" : "left";
        ctx.fillText(n.label, p.x + (p.x > width - 70 ? -8 : 8), p.y);
      }

      ctx.restore();
    }

    function updateBrightness() {
      let changed = false;
      for (const n of NODES) {
        const p = nodePos(n);
        let target = 0;
        if (mouse.active) {
          const dist = Math.hypot(mouse.x - p.x, mouse.y - p.y);
          if (dist < PROXIMITY_RADIUS) {
            target = 1 - dist / PROXIMITY_RADIUS;
          }
        }
        const current = brightness.get(n.id) ?? 0;
        const next = current + (target - current) * EASE;
        if (Math.abs(next - current) > 0.001) changed = true;
        brightness.set(n.id, next);
      }

      const targetParallaxX = mouse.active && width > 0 ? (mouse.x / width - 0.5) * 2 * PARALLAX_MAX : 0;
      const targetParallaxY = mouse.active && height > 0 ? (mouse.y / height - 0.5) * 2 * PARALLAX_MAX : 0;
      parallax.x += (targetParallaxX - parallax.x) * EASE;
      parallax.y += (targetParallaxY - parallax.y) * EASE;

      return changed;
    }

    let rafId = 0;
    let running = false;

    function loop() {
      if (!running) return;
      if (width < MIN_WIDTH_FOR_MAP) {
        stop();
        draw();
        return;
      }
      updateBrightness();
      draw();
      rafId = requestAnimationFrame(loop);
    }

    function start() {
      if (running) return;
      running = true;
      rafId = requestAnimationFrame(loop);
    }

    function stop() {
      running = false;
      if (rafId) cancelAnimationFrame(rafId);
    }

    function handleMouseMove(e: MouseEvent) {
      const rect = container!.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    }

    function handleMouseLeave() {
      mouse.active = false;
    }

    resize();
    draw();

    let observer: ResizeObserver | undefined;
    let intersectionObserver: IntersectionObserver | undefined;

    if (!staticMode) {
      container.addEventListener("mousemove", handleMouseMove);
      container.addEventListener("mouseleave", handleMouseLeave);

      let isVisible = false;
      intersectionObserver = new IntersectionObserver(
        (entries) => {
          isVisible = !!entries[0]?.isIntersecting;
          if (isVisible && width >= MIN_WIDTH_FOR_MAP) start();
          else stop();
        },
        { threshold: 0.05 }
      );
      intersectionObserver.observe(container);

      if (typeof ResizeObserver !== "undefined") {
        observer = new ResizeObserver(() => {
          resize();
          draw();
          if (isVisible && width >= MIN_WIDTH_FOR_MAP) start();
          else stop();
        });
        observer.observe(container);
      } else {
        window.addEventListener("resize", resize);
      }
    } else {
      if (typeof ResizeObserver !== "undefined") {
        observer = new ResizeObserver(() => {
          resize();
          draw();
        });
        observer.observe(container);
      } else {
        window.addEventListener("resize", () => {
          resize();
          draw();
        });
      }
    }

    return () => {
      stop();
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
      observer?.disconnect();
      intersectionObserver?.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, [containerRef]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-0 hidden lg:block"
      aria-hidden="true"
    />
  );
}

function readCssColor(varName: string, fallback: string): string {
  if (typeof window === "undefined") return fallback;
  const hex = getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
  const rgb = hexToRgb(hex);
  return rgb ?? fallback;
}

function hexToRgb(hex: string): string | null {
  const match = /^#([0-9a-f]{6})$/i.exec(hex);
  if (!match) return null;
  const int = parseInt(match[1], 16);
  const r = (int >> 16) & 255;
  const g = (int >> 8) & 255;
  const b = int & 255;
  return `${r},${g},${b}`;
}
