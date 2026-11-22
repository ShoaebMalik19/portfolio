"use client";

import { useEffect, useRef, useState } from "react";
import {
  animate,
  motion,
  useInView,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform
} from "framer-motion";

/* Sections the travelling orb stops at, in page order. */
const STOPS = [
  { id: "about", label: "About" },
  { id: "wins", label: "Wins" },
  { id: "experience", label: "Experience" },
  { id: "services", label: "Hire me" },
  { id: "projects", label: "Projects" },
  { id: "progress", label: "Credentials" },
  { id: "expertise", label: "Expertise" },
  { id: "faq", label: "FAQ" },
  { id: "contact", label: "Contact" }
];

/*
  SCROLL JOURNEY
  A glowing gold orb rides a rail down the left edge as you scroll, like a
  ball rolling down the page. Each section is a stop on the rail; the stop
  you're in lights up and names itself. Phones get a thin progress bar.
*/
export function ScrollJourney() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.4 });
  const top = useTransform(progress, [0, 1], ["0%", "100%"]);
  const [stops, setStops] = useState<{ id: string; label: string; at: number }[]>([]);
  const [active, setActive] = useState("");

  useEffect(() => {
    const measure = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max <= 0) return;
      setStops(
        STOPS.flatMap((s) => {
          const el = document.getElementById(s.id);
          return el ? [{ ...s, at: Math.min(1, Math.max(0, (el.offsetTop - 80) / max)) }] : [];
        })
      );
    };
    measure();
    const t = setTimeout(measure, 1500);
    window.addEventListener("resize", measure);
    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", measure);
    };
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    let cur = "";
    for (const s of stops) if (v >= s.at - 0.002) cur = s.id;
    setActive(cur);
  });

  return (
    <>
      {/* Phones and tablets: gold progress bar under the nav */}
      <motion.div
        aria-hidden
        className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-[#8a7550] via-[#d7c7aa] to-[#f5ecd9] xl:hidden"
        style={{ scaleX: progress }}
      />

      {/* Desktop: the rail */}
      <nav
        aria-label="Page progress"
        className="pointer-events-none fixed bottom-[12vh] left-5 top-[16vh] z-40 hidden w-6 xl:block"
      >
        <div className="absolute bottom-0 left-1/2 top-0 w-px -translate-x-1/2 bg-white/10" />
        <motion.div
          className="absolute left-1/2 top-0 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-[#d7c7aa]/70 to-[#d7c7aa]"
          style={{ height: top }}
        />
        {stops.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className="group pointer-events-auto absolute left-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center"
            style={{ top: `${s.at * 100}%` }}
          >
            <span
              className={`block h-2 w-2 rounded-full border transition-all duration-500 ${
                active === s.id ? "scale-125 border-[#d7c7aa] bg-[#d7c7aa]" : "border-white/25 bg-[#0b0b0c]"
              }`}
            />
            <span
              className={`absolute left-5 -translate-x-1 whitespace-nowrap rounded-full bg-black/80 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.24em] opacity-0 backdrop-blur transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 ${
                active === s.id ? "text-[#d7c7aa]" : "text-white/60"
              }`}
            >
              {s.label}
            </span>
          </a>
        ))}
      </nav>
    </>
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
  FLYING ORB
  A metallic gold ball that swoops left and right across the whole page as
  you scroll, with a comet trail of lagging ghosts. It appears once you
  leave the hero and never blocks clicks.
*/
export function FlyingOrb() {
  const { scrollYProgress } = useScroll();
  const p = useSpring(scrollYProgress, { stiffness: 70, damping: 18, mass: 0.6 });
  const [vw, setVw] = useState(1440);

  useEffect(() => {
    const on = () => setVw(window.innerWidth);
    on();
    window.addEventListener("resize", on);
    return () => window.removeEventListener("resize", on);
  }, []);

  const amp = vw < 768 ? vw * 0.34 : vw * 0.4;
  const x = useTransform(p, (v) => Math.sin(v * Math.PI * 7) * amp);
  const y = useTransform(p, (v) => Math.cos(v * Math.PI * 4) * 16); // vh
  const yv = useTransform(y, (v) => `${v}vh`);
  const rotate = useTransform(p, [0, 1], [0, 2160]);
  const scale = useTransform(p, (v) => 1 + Math.abs(Math.cos(v * Math.PI * 7)) * 0.35);
  const opacity = useTransform(scrollYProgress, [0.04, 0.09, 0.97, 1], [0, 1, 1, 0.4]);

  const ghosts = [0.55, 0.4, 0.28, 0.18, 0.1];
  const g1x = useSpring(x, { stiffness: 140, damping: 22 });
  const g2x = useSpring(x, { stiffness: 90, damping: 22 });
  const g3x = useSpring(x, { stiffness: 60, damping: 22 });
  const g4x = useSpring(x, { stiffness: 40, damping: 22 });
  const g5x = useSpring(x, { stiffness: 26, damping: 22 });
  const g1y = useSpring(yv, { stiffness: 140, damping: 22 });
  const g2y = useSpring(yv, { stiffness: 90, damping: 22 });
  const g3y = useSpring(yv, { stiffness: 60, damping: 22 });
  const g4y = useSpring(yv, { stiffness: 40, damping: 22 });
  const g5y = useSpring(yv, { stiffness: 26, damping: 22 });
  const trail = [
    [g1x, g1y],
    [g2x, g2y],
    [g3x, g3y],
    [g4x, g4y],
    [g5x, g5y]
  ] as const;

  const size = vw < 768 ? 34 : 58;

  return (
    <motion.div aria-hidden className="pointer-events-none fixed left-1/2 top-[52vh] z-[45] mix-blend-screen motion-reduce:hidden" style={{ opacity }}>
      {trail.map(([tx, ty], i) => (
        <motion.span
          key={i}
          className="absolute rounded-full"
          style={{
            x: tx,
            y: ty,
            width: size * (1 - i * 0.12),
            height: size * (1 - i * 0.12),
            marginLeft: -(size * (1 - i * 0.12)) / 2,
            marginTop: -(size * (1 - i * 0.12)) / 2,
            opacity: ghosts[i],
            background: "radial-gradient(circle, rgba(232,214,174,0.55), rgba(215,199,170,0) 70%)",
            filter: `blur(${2 + i * 2}px)`
          }}
        />
      ))}
      <motion.span className="absolute" style={{ x, y: yv, scale }}>
        <span
          className="absolute rounded-full"
          style={{
            width: size * 3,
            height: size * 3,
            left: -size * 1.5,
            top: -size * 1.5,
            background: "radial-gradient(circle, rgba(215,199,170,0.35), transparent 65%)",
            filter: "blur(10px)"
          }}
        />
        <motion.span
          className="absolute block rounded-full"
          style={{
            rotate,
            width: size,
            height: size,
            left: -size / 2,
            top: -size / 2,
            background:
              "radial-gradient(circle at 32% 28%, #fffaf0 0%, #f0dfb8 18%, #c9a96e 45%, #7a5f36 75%, #2e2312 100%)",
            boxShadow: "0 0 40px rgba(215,199,170,0.65), inset -6px -8px 18px rgba(0,0,0,0.45)"
          }}
        >
          {/* Seam lines so the spin reads like a ball */}
          <span className="absolute inset-[18%] rounded-full border border-black/20" />
          <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-black/15" />
        </motion.span>
      </motion.span>
    </motion.div>
  );
}
