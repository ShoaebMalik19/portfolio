"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  animate,
  type MotionValue,
  motion,
  useInView,
  useMotionValue,
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
  EDGE LIGHT
  A calm, straight light along the left edge of the screen that fills as
  you read. No crossings, nothing near the content. Desktop only.
*/
export function EdgeLight() {
  const { scrollYProgress } = useScroll();
  const top = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  return (
    <div aria-hidden className="pointer-events-none fixed bottom-6 left-1.5 top-24 z-40 hidden w-px lg:block">
      <div className="absolute inset-0 bg-white/[0.06]" />
      <motion.div className="absolute inset-x-0 top-0 origin-top bg-gradient-to-b from-transparent via-[#d7c7aa]/50 to-[#e8d6ae]" style={{ height: top }} />
      <motion.span
        className="absolute left-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#fffaf0] shadow-[0_0_12px_3px_rgba(215,199,170,0.7)]"
        style={{ top }}
      />
    </div>
  );
}

/*
  BYTE — the roaming robot
  Parks in the side margin beside each section, alternating sides, and
  does a looping flight across the page when you scroll into the next
  section: it grows mid-flight, barrel-rolls and lands. Each section has
  its own face and a short line. It looks at your cursor, gets startled
  by very fast scrolling, pulses gently with the scroll, and says hi
  when clicked (on wide screens, where it sits clear of the content).
*/
type Mood = "happy" | "star" | "focus" | "wink" | "excited" | "cool" | "curious" | "love" | "whoa";

const STOPS: { id: string; mood: Mood; say: string }[] = [
  { id: "about", mood: "happy", say: "Hi, I'm Byte! I'll show you around." },
  { id: "wins", mood: "star", say: "Three hackathon wins!" },
  { id: "experience", mood: "focus", say: "Real client work, live today." },
  { id: "services", mood: "wink", say: "Need a website? Psst, hire him." },
  { id: "projects", mood: "excited", say: "Try the filters!" },
  { id: "progress", mood: "cool", say: "Oracle certified." },
  { id: "expertise", mood: "curious", say: "The toolkit." },
  { id: "faq", mood: "curious", say: "Got questions?" },
  { id: "contact", mood: "love", say: "Say hello!" }
];

const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

export function RoamingBot() {
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const sx = useSpring(x, { stiffness: 520, damping: 46, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 520, damping: 46, mass: 0.6 });
  const scale = useSpring(1, { stiffness: 380, damping: 26 });
  const rotate = useSpring(0, { stiffness: 380, damping: 30 });
  const opacity = useSpring(0, { stiffness: 200, damping: 30 });
  const lookX = useSpring(0, { stiffness: 300, damping: 24 });
  const lookY = useSpring(0, { stiffness: 300, damping: 24 });

  const [mood, setMood] = useState<Mood>("happy");
  const [bubble, setBubble] = useState<{ text: string; left: boolean } | null>(null);
  const [size, setSize] = useState(64);
  const [clickable, setClickable] = useState(false);

  const st = useRef({ stop: -1, flying: false, startled: 0, lastY: 0, lastT: 0, side: "right" as "left" | "right", bx: 0, by: 0, reduce: false });
  const bubbleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const say = useCallback((text: string, left: boolean, ms = 2600) => {
    if (window.innerWidth < 1024) return;
    if (bubbleTimer.current) clearTimeout(bubbleTimer.current);
    setBubble({ text, left });
    bubbleTimer.current = setTimeout(() => setBubble(null), ms);
  }, []);

  useEffect(() => {
    st.current.reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let tops: number[] = [];
    let heroEnd = 0;
    let w = window.innerWidth;
    let vh = window.innerHeight;
    let sz = 64;

    const measure = () => {
      w = window.innerWidth;
      vh = window.innerHeight;
      tops = STOPS.map((s) => {
        const el = document.getElementById(s.id);
        return el ? el.getBoundingClientRect().top + window.scrollY : Number.POSITIVE_INFINITY;
      });
      heroEnd = Number.isFinite(tops[0]) ? tops[0] : vh;
      const desktop = w >= 1024;
      const gutter = desktop ? (w - Math.min(1280, w - 96)) / 2 : 0;
      sz = desktop ? Math.round(Math.min(96, Math.max(48, gutter * 0.85))) : 40;
      setSize(sz);
      setClickable(desktop && gutter >= 72);
      update();
    };

    const parkX = (side: "left" | "right") => {
      const desktop = w >= 1024;
      const gutter = desktop ? (w - Math.min(1280, w - 96)) / 2 : 0;
      const inset = desktop ? Math.max(sz / 2 + 8, gutter / 2) : sz / 2 + 4;
      return side === "left" ? inset : w - inset;
    };
    const parkY = () => (w >= 1024 ? vh * 0.58 : vh * 0.8);

    const update = () => {
      const s = st.current;
      const mid = window.scrollY + vh * 0.55;
      const band = vh * 0.5;
      const sideOf = (k: number): "left" | "right" => (k % 2 === 0 ? "right" : "left");

      // Hidden in the hero; fades in as About arrives.
      opacity.set(window.scrollY + vh * 0.85 < heroEnd ? 0 : 1);

      // Which stop are we parked at, or which hop are we in the middle of?
      let parked = 0;
      let hop = -1;
      let f = 0;
      for (let j = 1; j < tops.length; j++) {
        const start = tops[j] - band / 2;
        const t = (mid - start) / band;
        if (t >= 1) parked = j;
        else if (t > 0) {
          hop = j;
          f = t;
          break;
        }
      }

      const py = parkY();
      if (s.reduce) {
        x.set(parkX("right"));
        y.set(py);
        scale.set(1);
        rotate.set(0);
      } else if (hop > 0) {
        const from = parkX(sideOf(hop - 1));
        const to = parkX(sideOf(hop));
        const e = ease(f);
        const arc = Math.sin(Math.PI * f);
        const dir = to > from ? 1 : -1;
        x.set(from + (to - from) * e);
        y.set(py - arc * vh * 0.24);
        scale.set(1 + arc * 0.6);
        rotate.set(dir * 360 * e);
      } else {
        // Parked: gently breathe with the scroll so it always feels alive.
        const breathe = Math.sin(window.scrollY / 90) * 0.07;
        x.set(parkX(sideOf(parked)));
        y.set(py + Math.sin(window.scrollY / 140) * 6);
        scale.set(1 + breathe);
        rotate.set(Math.round(rotate.get() / 360) * 360 + Math.sin(window.scrollY / 110) * 6);
      }

      const flying = hop > 0;
      const side = sideOf(hop > 0 ? hop : parked);
      s.side = side;
      s.bx = x.get();
      s.by = y.get();

      // Startled by very fast scrolling.
      const now = performance.now();
      const v = Math.abs(window.scrollY - s.lastY) / Math.max(1, now - s.lastT);
      s.lastY = window.scrollY;
      s.lastT = now;
      if (v > 4.5) s.startled = now + 700;

      const nextMood: Mood = now < s.startled || flying ? "whoa" : STOPS[parked].mood;
      setMood((m) => (m === nextMood ? m : nextMood));

      if (!flying && parked !== s.stop && window.scrollY + vh * 0.85 >= heroEnd) {
        s.stop = parked;
        say(STOPS[parked].say, side === "right");
      }
      if (flying && bubbleTimer.current) {
        clearTimeout(bubbleTimer.current);
        setBubble(null);
      }
      s.flying = flying;
    };

    const onMouse = (e: MouseEvent) => {
      const s = st.current;
      const dx = e.clientX - s.bx;
      const dy = e.clientY - s.by;
      const d = Math.hypot(dx, dy) || 1;
      lookX.set((dx / d) * 3);
      lookY.set((dy / d) * 2.2);
    };

    measure();
    const t = setTimeout(measure, 1200);
    const ro = new ResizeObserver(measure);
    ro.observe(document.body);
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", measure);
    window.addEventListener("mousemove", onMouse, { passive: true });
    return () => {
      clearTimeout(t);
      ro.disconnect();
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", measure);
      window.removeEventListener("mousemove", onMouse);
    };
  }, [x, y, scale, rotate, opacity, lookX, lookY, say]);

  const onClick = () => {
    setMood("love");
    scale.set(1.35);
    setTimeout(() => scale.set(1), 260);
    say("Hey! Scroll and I'll show you around.", st.current.side === "right", 2200);
  };

  return (
    <motion.div aria-hidden className="pointer-events-none fixed left-0 top-0 z-[45]" style={{ x: sx, y: sy, opacity }}>
      <div className="relative" style={{ width: 0, height: 0 }}>
        <AnimatePresence>
          {bubble && (
            <motion.div
              key={bubble.text}
              initial={{ opacity: 0, scale: 0.8, y: 6 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 420, damping: 28 }}
              className={`absolute w-max max-w-[240px] rounded-2xl border border-[#d7c7aa]/40 bg-[#0b0b0c]/90 px-3 py-1.5 font-display text-[11px] tracking-wide text-[#f5ecd9] shadow-[0_8px_30px_rgba(0,0,0,0.5)] backdrop-blur ${
                bubble.left ? "origin-right" : "origin-left"
              }`}
              style={{
                top: -size * 1.25,
                ...(bubble.left ? { right: -size * 0.35 } : { left: -size * 0.35 })
              }}
            >
              {bubble.text}
            </motion.div>
          )}
        </AnimatePresence>
        <motion.button
          type="button"
          tabIndex={-1}
          onClick={onClick}
          className={`absolute block ${clickable ? "pointer-events-auto cursor-pointer" : ""}`}
          style={{ width: size, height: size * 1.1, left: -size / 2, top: -size * 0.55, scale, rotate }}
        >
          <ByteFace mood={mood} lookX={lookX} lookY={lookY} />
        </motion.button>
      </div>
    </motion.div>
  );
}

function ByteFace({ mood, lookX, lookY }: { mood: Mood; lookX: MotionValue<number>; lookY: MotionValue<number> }) {
  const eyeFill = "#f5ecd9";
  const L = -8;
  const R = 8;
  const EY = -3;
  const eyes = (() => {
    switch (mood) {
      case "happy":
        return (
          <g fill="none" stroke={eyeFill} strokeWidth={2.2} strokeLinecap="round">
            <path d={`M ${L - 3.5} ${EY + 1} Q ${L} ${EY - 4} ${L + 3.5} ${EY + 1}`} />
            <path d={`M ${R - 3.5} ${EY + 1} Q ${R} ${EY - 4} ${R + 3.5} ${EY + 1}`} />
          </g>
        );
      case "star":
        return (
          <g fill="#ffe6a3">
            {[L, R].map((cx) => (
              <path
                key={cx}
                transform={`translate(${cx} ${EY})`}
                d="M0 -4.6 L1.3 -1.4 L4.6 -1.4 L1.9 0.6 L2.9 4 L0 2 L-2.9 4 L-1.9 0.6 L-4.6 -1.4 L-1.3 -1.4 Z"
              />
            ))}
          </g>
        );
      case "love":
        return (
          <g fill="#ff8fa3">
            {[L, R].map((cx) => (
              <path key={cx} transform={`translate(${cx} ${EY})`} d="M0 3.6 C-5 0 -4.5 -4 -2 -4 C-0.8 -4 0 -3 0 -2 C0 -3 0.8 -4 2 -4 C4.5 -4 5 0 0 3.6 Z" />
            ))}
          </g>
        );
      case "cool":
        return (
          <g>
            <rect x={L - 5.5} y={EY - 3.5} width={11} height={7} rx={2.5} fill="#050505" stroke={eyeFill} strokeWidth={1} />
            <rect x={R - 5.5} y={EY - 3.5} width={11} height={7} rx={2.5} fill="#050505" stroke={eyeFill} strokeWidth={1} />
            <line x1={L + 5.5} y1={EY - 1} x2={R - 5.5} y2={EY - 1} stroke={eyeFill} strokeWidth={1.2} />
            <line x1={L - 3} y1={EY - 2} x2={L} y2={EY - 2} stroke="#ffffff" strokeOpacity={0.6} strokeWidth={1} />
          </g>
        );
      case "whoa":
        return (
          <g fill="none" stroke={eyeFill} strokeWidth={1.8}>
            <circle cx={L} cy={EY} r={4} />
            <circle cx={R} cy={EY} r={4} />
            <circle cx={L} cy={EY} r={1.2} fill={eyeFill} />
            <circle cx={R} cy={EY} r={1.2} fill={eyeFill} />
          </g>
        );
      case "wink":
        return (
          <motion.g style={{ x: lookX, y: lookY }}>
            <rect x={L - 2.5} y={EY - 4} width={5} height={7.5} rx={2.5} fill={eyeFill} />
            <path d={`M ${R - 3.5} ${EY} Q ${R} ${EY + 3} ${R + 3.5} ${EY}`} fill="none" stroke={eyeFill} strokeWidth={2.2} strokeLinecap="round" />
          </motion.g>
        );
      case "focus":
        return (
          <motion.g style={{ x: lookX, y: lookY }} fill={eyeFill}>
            <rect x={L - 3.5} y={EY - 1.5} width={7} height={3.2} rx={1.6} />
            <rect x={R - 3.5} y={EY - 1.5} width={7} height={3.2} rx={1.6} />
          </motion.g>
        );
      case "curious":
        return (
          <motion.g style={{ x: lookX, y: lookY }} fill={eyeFill}>
            <circle cx={L} cy={EY} r={3.8} />
            <circle cx={R} cy={EY - 0.5} r={2.4} />
          </motion.g>
        );
      case "excited":
      default:
        return (
          <motion.g style={{ x: lookX, y: lookY }} className="bot-blink">
            <rect x={L - 2.8} y={EY - 4.5} width={5.6} height={8.5} rx={2.8} fill={eyeFill} />
            <rect x={R - 2.8} y={EY - 4.5} width={5.6} height={8.5} rx={2.8} fill={eyeFill} />
            <circle cx={L + 1} cy={EY - 2.4} r={1.1} fill="#050505" />
            <circle cx={R + 1} cy={EY - 2.4} r={1.1} fill="#050505" />
          </motion.g>
        );
    }
  })();

  const mouth = (() => {
    switch (mood) {
      case "whoa":
        return <ellipse cx={0} cy={8} rx={2.6} ry={3.2} fill="#050505" stroke="#d7c7aa" strokeWidth={1.2} />;
      case "excited":
      case "star":
      case "love":
        return <path d="M -5.5 5.5 Q 0 12 5.5 5.5 Z" fill="#d7c7aa" />;
      case "focus":
        return <line x1={-3.5} y1={7} x2={3.5} y2={7} stroke="#d7c7aa" strokeWidth={1.6} strokeLinecap="round" />;
      case "curious":
        return <path d="M -3 7.5 Q 1 5.5 4 8" fill="none" stroke="#d7c7aa" strokeWidth={1.6} strokeLinecap="round" />;
      default:
        return <path d="M -4.5 6 Q 0 10 4.5 6" fill="none" stroke="#d7c7aa" strokeWidth={1.8} strokeLinecap="round" />;
    }
  })();

  const blush = mood === "love" || mood === "happy" || mood === "wink";

  return (
    <svg viewBox="-32 -38 64 70" width="100%" height="100%" className="overflow-visible drop-shadow-[0_6px_18px_rgba(0,0,0,0.55)]">
      <defs>
        <radialGradient id="byte-glow">
          <stop offset="0%" stopColor="rgba(232,214,174,0.45)" />
          <stop offset="100%" stopColor="rgba(232,214,174,0)" />
        </radialGradient>
        <linearGradient id="byte-shell" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2a241a" />
          <stop offset="100%" stopColor="#100d09" />
        </linearGradient>
      </defs>
      <circle r={34} fill="url(#byte-glow)" />
      <g className="bot-bob">
        <line x1={0} y1={-21} x2={0} y2={-30} stroke="#d7c7aa" strokeWidth={2} strokeLinecap="round" />
        <circle cx={0} cy={-32} r={3.4} fill={mood === "love" ? "#ff8fa3" : "#fffaf0"} className="bot-led" />
        <rect x={-29} y={-8} width={5} height={13} rx={2.5} fill="#d7c7aa" />
        <rect x={24} y={-8} width={5} height={13} rx={2.5} fill="#d7c7aa" />
        <rect x={-25} y={-21} width={50} height={40} rx={14} fill="url(#byte-shell)" stroke="#e8d6ae" strokeWidth={1.8} />
        <rect x={-19} y={-14} width={38} height={27} rx={9} fill="#050505" />
        <path d="M -16 -11 Q -10 -13 -4 -11" stroke="#ffffff" strokeOpacity={0.12} strokeWidth={2} fill="none" strokeLinecap="round" />
        {eyes}
        {mouth}
        {blush && (
          <g fill="#ff8fa3" opacity={0.45}>
            <ellipse cx={-14} cy={5} rx={2.6} ry={1.6} />
            <ellipse cx={14} cy={5} rx={2.6} ry={1.6} />
          </g>
        )}
      </g>
    </svg>
  );
}
