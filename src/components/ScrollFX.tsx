"use client";

import { useEffect, useRef, useState } from "react";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform
} from "framer-motion";


/* Thin gold reading-progress bar across the top of the screen. */
export function ScrollJourney() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.4 });
  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-[#8a7550] via-[#d7c7aa] to-[#f5ecd9]"
      style={{ scaleX: progress }}
    />
  );
}

/* Number that counts up from zero the first time it scrolls into view. */
export function CountUp({ to, pad = 2 }: { to: number; pad?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();
  const [n, setN] = useState(to);
  const started = useRef(false);

  useEffect(() => {
    if (!inView || started.current || reduce) return;
    started.current = true;
    const c = animate(0, to, { duration: 1.6, ease: [0.16, 1, 0.3, 1], onUpdate: (v) => setN(Math.round(v)) });
    return () => c.stop();
  }, [inView, reduce, to]);

  return <span ref={ref}>{String(n).padStart(pad, "0")}</span>;
}

/* Heading whose words rise out of a mask one after another. */
export function RevealWords({ text, className = "" }: { text: string; className?: string }) {
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.12em] align-bottom">
          <motion.span
            className="inline-block"
            initial={{ y: "110%", rotate: 4 }}
            whileInView={{ y: "0%", rotate: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.85, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            {w}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/* Card that tilts up out of the floor as it scrolls into view. */
export function TiltIn({ children, i = 0, className = "" }: { children: React.ReactNode; i?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      style={{ transformPerspective: 1200 }}
      initial={{ opacity: 0, y: 70, rotateX: -22, scale: 0.94 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.9, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

/*
  Huge outlined text that slides sideways as you scroll past it,
  used as a section divider.
*/
export function ScrollBanner({ text }: { text: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], ["8%", "-38%"]);
  const x2 = useTransform(scrollYProgress, [0, 1], ["-38%", "8%"]);
  return (
    <div ref={ref} aria-hidden className="relative overflow-hidden border-y border-border bg-[#070706] py-6 sm:py-10">
      <motion.p style={{ x }} className="banner-outline whitespace-nowrap font-display text-[16vw] font-bold uppercase leading-[0.9] lg:text-[9vw]">
        {text} · {text} ·
      </motion.p>
      <motion.p style={{ x: x2 }} className="whitespace-nowrap font-serif text-[9vw] italic leading-[1] text-[#d7c7aa]/80 lg:text-[5vw]">
        {text} · {text} · {text} ·
      </motion.p>
    </div>
  );
}

/*
  CIRCUIT TRACE
  A gold signal line that draws itself down the page as you read, like a
  trace on a circuit board. It runs only in the side margins, switches
  sides through the empty padding at the top of each section with 45°
  circuit bends, and lights a node as it reaches each section.
  The tip stays level with your reading position (60% down the screen).
  Desktop only; phones keep the progress bar.
*/
const TRACE_IDS = ["about", "wins", "experience", "services", "projects", "progress", "expertise", "faq", "contact"];

type Node = { x: number; y: number; id: string };

export function CircuitTrace() {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [geo, setGeo] = useState<{ w: number; h: number; d: string; nodes: Node[] } | null>(null);
  const [len, setLen] = useState(0);
  const samples = useRef<{ l: number; y: number }[]>([]);
  const target = useMotionValue(0);
  const drawn = useSpring(target, { stiffness: 90, damping: 22, mass: 0.5 });
  const dashOffset = useTransform(drawn, (v) => Math.max(0, len - v));
  const [tip, setTip] = useState<{ x: number; y: number } | null>(null);
  const [lit, setLit] = useState(0);

  // Build the path from where the sections actually are.
  useEffect(() => {
    const host = svgRef.current?.parentElement;
    if (!host) return;
    const build = () => {
      const w = host.clientWidth;
      const h = host.scrollHeight;
      const els = TRACE_IDS.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
      if (els.length < 2 || w < 1024) return setGeo(null);
      const hostTop = host.getBoundingClientRect().top + window.scrollY;
      // Gutter centre: halfway between the page edge and the content column.
      const content = Math.min(1280, w - 96);
      const gutter = Math.max(18, (w - content) / 4);
      const L = gutter;
      const R = w - gutter;
      const bend = 28;
      const nodes: Node[] = [];
      let side = L;
      let d = "";
      els.forEach((el, i) => {
        const top = el.getBoundingClientRect().top + window.scrollY - hostTop;
        const y = top + 44; // inside the section's top padding, above any heading
        if (i === 0) {
          d = `M ${side} ${y}`;
        } else {
          const next = side === L ? R : L;
          const dir = next > side ? 1 : -1;
          // run down the margin, bend 45° into the crossing, cross, bend back down
          d += ` L ${side} ${y - bend} L ${side + dir * bend} ${y} L ${next - dir * bend} ${y} L ${next} ${y + bend}`;
          side = next;
        }
        nodes.push({ x: side, y: i === 0 ? y : y + bend, id: el.id });
      });
      const lastEl = els[els.length - 1];
      const end = lastEl.getBoundingClientRect().bottom + window.scrollY - hostTop - 60;
      d += ` L ${side} ${end}`;
      setGeo({ w, h, d, nodes });
    };
    build();
    const ro = new ResizeObserver(() => build());
    ro.observe(host);
    window.addEventListener("resize", build);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", build);
    };
  }, []);

  // Measure the path and sample it so scroll position maps to a length.
  useEffect(() => {
    const p = pathRef.current;
    if (!p || !geo) return;
    const total = p.getTotalLength();
    setLen(total);
    const N = 600;
    samples.current = Array.from({ length: N + 1 }, (_, k) => {
      const l = (total * k) / N;
      return { l, y: p.getPointAtLength(l).y };
    });
  }, [geo]);

  useEffect(() => {
    if (!geo || !len) return;
    const host = svgRef.current?.parentElement;
    const onScroll = () => {
      if (!host) return;
      const hostTop = host.getBoundingClientRect().top + window.scrollY;
      const readY = window.scrollY + window.innerHeight * 0.6 - hostTop;
      const s = samples.current;
      let l = 0;
      for (let k = 0; k < s.length; k++) {
        if (s[k].y <= readY) l = s[k].l;
        else break;
      }
      target.set(l);
      setLit(geo.nodes.filter((n) => n.y <= readY).length);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [geo, len, target]);

  useMotionValueEvent(drawn, "change", (v) => {
    const p = pathRef.current;
    if (!p || !len) return;
    const pt = p.getPointAtLength(Math.min(len, Math.max(0, v)));
    setTip({ x: pt.x, y: pt.y });
  });

  return (
    <svg
      ref={svgRef}
      aria-hidden
      className="pointer-events-none absolute left-0 top-0 z-[6] hidden lg:block"
      width={geo?.w ?? 0}
      height={geo?.h ?? 0}
    >
      {geo && (
        <>
          <defs>
            <linearGradient id="trace-gold" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8a7550" />
              <stop offset="50%" stopColor="#e8d6ae" />
              <stop offset="100%" stopColor="#d7c7aa" />
            </linearGradient>
            <filter id="trace-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Unlit circuit: the full route, faint and dashed */}
          <path d={geo.d} fill="none" stroke="rgba(215,199,170,0.12)" strokeWidth={1} strokeDasharray="3 7" />

          {/* Lit signal, drawn up to your reading position */}
          <motion.path
            ref={pathRef}
            d={geo.d}
            fill="none"
            stroke="url(#trace-gold)"
            strokeWidth={1.5}
            strokeLinejoin="round"
            filter="url(#trace-glow)"
            strokeDasharray={len || 1}
            style={{ strokeDashoffset: dashOffset }}
          />

          {/* Section nodes */}
          {geo.nodes.map((n, i) => {
            const on = i < lit;
            return (
              <g key={n.id} transform={`translate(${n.x} ${n.y})`}>
                {on && <circle r={10} fill="none" stroke="rgba(215,199,170,0.35)" className="trace-ping" />}
                <rect
                  x={-4.5}
                  y={-4.5}
                  width={9}
                  height={9}
                  transform="rotate(45)"
                  fill={on ? "#d7c7aa" : "#0b0b0c"}
                  stroke={on ? "#f5ecd9" : "rgba(215,199,170,0.35)"}
                  strokeWidth={1}
                  style={{ transition: "fill .5s, stroke .5s" }}
                />
              </g>
            );
          })}

          {/* The travelling signal at the tip */}
          {tip && len > 0 && (
            <g transform={`translate(${tip.x} ${tip.y})`}>
              <circle r={16} fill="rgba(215,199,170,0.18)" />
              <circle r={7} fill="rgba(232,214,174,0.45)" filter="url(#trace-glow)" />
              <circle r={3} fill="#fffaf0" />
            </g>
          )}
        </>
      )}
    </svg>
  );
}
