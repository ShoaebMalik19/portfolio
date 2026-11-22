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
  const spin = useTransform(progress, [0, 1], [0, 1080]);
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
        {/* The orb */}
        <motion.div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2" style={{ top }}>
          <span className="absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#d7c7aa]/25 blur-xl" />
          <motion.span
            className="relative block h-4 w-4 rounded-full shadow-[0_0_18px_rgba(215,199,170,0.9)]"
            style={{
              rotate: spin,
              background: "conic-gradient(from 0deg, #f5ecd9, #a8916a, #f5ecd9, #6f5d3e, #f5ecd9)"
            }}
          />
        </motion.div>
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
