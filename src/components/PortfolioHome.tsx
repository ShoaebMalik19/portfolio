"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useSpring,
  useScroll,
  useTransform,
  AnimatePresence,
  type Variants,
  type MotionStyle
} from "framer-motion";
import {
  ArrowRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Github,
  Linkedin,
  Mail,
  ShieldCheck
} from "lucide-react";
import { projects, type Project } from "@/data/projects";

/* ── Animation preset ──────────────────────────────────────── */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 34 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] }
  }
};

/* ── Nav links ─────────────────────────────────────────────── */
const NAV_LINKS = [
  { label: "About",             href: "#about"     },
  { label: "Projects",          href: "#projects"  },
  { label: "Progress Log",      href: "#progress"  },
  { label: "Area of Expertise", href: "#expertise" },
  { label: "Contact",           href: "#contact"   }
];

/* ── Expertise groups ──────────────────────────────────────── */
const expertiseGroups = [
  { code: "01", title: "Languages",      items: ["Java","Python","C","JavaScript","TypeScript","HTML","CSS"] },
  { code: "02", title: "Frontend",       items: ["React","Next.js","Tailwind CSS","Framer Motion","Responsive Design"] },
  { code: "03", title: "Backend",        items: ["Node.js","Express.js","REST APIs","Authentication Systems"] },
  { code: "04", title: "AI & Automation",items: ["Generative AI","Prompt Engineering","RAG Systems","AI Workflows","Automation Tools"] },
  { code: "05", title: "Blockchain",     items: ["Smart Contracts","Web3 Applications","Wallet Integration","Decentralized Systems"] },
  { code: "06", title: "Tools",          items: ["Git","GitHub","VS Code","Postman","Docker","Vercel"] }
];

/* ── Progress log milestones ───────────────────────────────── */
const progressItems = [
  {
    icon: "🏆", title: "3× Hackathon Winner", expandable: true,
    details: ["1st Place — Dev Track Hackathon","1st Place — Decode SIH with OSCode","2nd Place — Katha Hackathon"]
  },
  {
    icon: "📜", title: "Oracle Certified Generative AI Professional", expandable: false,
    org: "Oracle", link: "https://catalog-education.oracle.com/pls/certview/sharebadge?id=BD7BAF5724C0D90062240DF9DF7E0EC310ED67B08F9BFD943D4DF0066F032153",
    details: ["Certified in practical generative AI foundations and use cases."]
  },
  {
    icon: "📜", title: "Oracle Certified Data Science Professional", expandable: false,
    org: "Oracle", link: "https://catalog-education.oracle.com/pls/certview/sharebadge?id=0A52CD37B7330566782AACB09BF0428E93391AC41E5522F92E450433F31BF865",
    details: ["Certified in data science workflows, modeling, and applied analysis."]
  },
  {
    icon: "🚀", title: "REVA Labs Internship", expandable: false,
    details: ["Hands-on industry experience in applied technology and product development."]
  },
  {
    icon: "🤝", title: "AI-FI Club Member", expandable: false,
    details: ["Active contributor to a community building AI-focused events and products."]
  },
  {
    icon: "🤝", title: "IDC Club Member", expandable: false,
    details: ["Engaged in innovation-driven initiatives and collaborative development culture."]
  }
];

/* ── About expandable items ────────────────────────────────── */
const aboutItems = [
  { key: "who",   label: "Who I Am",       body: "Builder first. Engineer second. I enjoy turning ideas into products that solve real-world problems." },
  { key: "build", label: "What I Build",   body: "Full-stack applications. AI-powered systems. Blockchain products. Developer tools." },
  { key: "focus", label: "What I Focus On",body: "Execution. Problem solving. Product thinking. Practical technology." }
];

/* ══════════════════════════════════════════════════════════════
   ROOT COMPONENT
══════════════════════════════════════════════════════════════ */
export function PortfolioHome() {
  const { scrollYProgress } = useScroll();
  const heroScale   = useTransform(scrollYProgress, [0, 0.22], [1, 0.97]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.28], [1, 0.25]);

  return (
    <main className="relative overflow-hidden">
      <TopNav />

      {/* Vertical domain watermark */}
      <div className="pointer-events-none fixed right-4 top-1/2 z-10 hidden -translate-y-1/2 rotate-90 font-display text-xs uppercase tracking-[0.5em] text-white/8 lg:block">
        shoaebmalik.in
      </div>

      {/* ── HERO ───────────────────────────────────────────── */}
      <section className="relative min-h-screen overflow-hidden">
        <BlueprintBackground />
        <div className="noise" />

        {/* Cinematic poster composition */}
        <motion.div
          style={{ scale: heroScale, opacity: heroOpacity }}
          className="relative z-10 flex flex-col items-center"
        >
          {/* Portrait — shifted down slightly, no top centering */}
          <motion.div
            initial={{ opacity: 0, y: 40, filter: "blur(20px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
            className="w-full pt-24 sm:pt-32"
          >
            <SpotlightPortrait />
          </motion.div>

          {/* Statement — large, bold, flush against portrait bottom */}
          <div className="relative z-20 -mt-8 w-full px-5 text-center sm:-mt-12 sm:px-8">
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.82, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-[clamp(2rem,6.5vw,5.5rem)] font-semibold uppercase leading-[0.88] tracking-[-0.02em] text-porcelain"
            >
              Building What<br />
              <span className="text-champagne">Doesn&rsquo;t Exist Yet.</span>
            </motion.h1>

            {/* Sub-line — pillars */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.68, delay: 0.36, ease: [0.22, 1, 0.36, 1] }}
              className="mx-auto mt-4 max-w-lg font-display text-xs uppercase tracking-[0.38em] text-steel sm:text-sm"
            >
              Full-Stack&nbsp;&bull;&nbsp;AI&nbsp;Automation&nbsp;&bull;&nbsp;Blockchain
            </motion.p>

            {/* Name — small, secondary */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.48 }}
              className="mt-2 font-display text-xs uppercase tracking-[0.42em] text-white/30"
            >
              Mohammed Shoaeb Malik
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.58, ease: [0.22, 1, 0.36, 1] }}
              className="mt-7 flex flex-wrap justify-center gap-3"
            >
              <a
                href="#projects"
                data-cursor="interactive"
                className="group inline-flex items-center gap-3 bg-porcelain px-5 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-obsidian transition hover:bg-champagne"
              >
                View Projects
                <ArrowRight size={16} className="transition group-hover:translate-x-1" />
              </a>
              <a
                href="#contact"
                data-cursor="interactive"
                className="inline-flex items-center gap-3 border border-white/14 bg-white/[0.025] px-5 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-porcelain backdrop-blur-md transition hover:border-champagne hover:text-champagne"
              >
                Get In Touch
              </a>
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <div className="mt-12 mb-6 flex flex-col items-center opacity-75">
            <motion.span
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              className="mb-4 font-display text-[10px] uppercase tracking-[0.4em] text-steel"
            >
              Scroll Down
            </motion.span>
            <div className="h-12 w-px overflow-hidden bg-white/10">
              <motion.span
                animate={{ y: ["-100%", "120%"] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                className="block h-1/2 w-px bg-champagne"
              />
            </div>
          </div>
        </motion.div>
      </section>

      <FloatingAbout />

      <Section id="projects" eyebrow="02" title="Featured Projects">
        <ProjectShowcase />
      </Section>

      <Section id="progress" eyebrow="03" title="Progress Log">
        <ProgressLog />
      </Section>

      <Section id="expertise" eyebrow="04" title="Area of Expertise">
        <ExpertiseGrid />
      </Section>

      <Section id="contact" eyebrow="05" title="Contact">
        <ContactSection />
      </Section>

      <footer className="border-t border-white/10 px-5 py-8 text-center font-display text-xs uppercase tracking-[0.32em] text-white/25 sm:px-8 lg:px-12">
        shoaebmalik.in — Mohammed Shoaeb Malik
      </footer>
    </main>
  );
}

/* ══════════════════════════════════════════════════════════════
   TOP NAV
══════════════════════════════════════════════════════════════ */
function TopNav() {
  const [activeSection, setActiveSection] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const ids = NAV_LINKS.map((l) => l.href.replace("#", ""));
      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i]);
        if (el && window.scrollY + 120 >= el.offsetTop) {
          setActiveSection(ids[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 flex items-center justify-between px-5 py-4 transition-all duration-500 sm:px-8 lg:px-12 ${
        scrolled ? "border-b border-white/8 bg-obsidian/80 backdrop-blur-xl" : ""
      }`}
    >
      <a
        href="#"
        data-cursor="interactive"
        className="font-display text-xs uppercase tracking-[0.38em] text-champagne transition hover:text-porcelain"
      >
        shoaebmalik.in
      </a>

      <ul className="hidden items-center gap-6 lg:flex">
        {NAV_LINKS.map((link) => {
          const id = link.href.replace("#", "");
          const isActive = activeSection === id;
          return (
            <li key={link.href}>
              <a
                href={link.href}
                data-cursor="interactive"
                className={`relative font-display text-xs uppercase tracking-[0.22em] transition ${
                  isActive ? "text-champagne" : "text-steel hover:text-porcelain"
                }`}
              >
                {link.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-px bg-champagne"
                  />
                )}
              </a>
            </li>
          );
        })}
      </ul>
    </motion.nav>
  );
}

/* ══════════════════════════════════════════════════════════════
   BLUEPRINT BACKGROUND  (separate SVGs — no % in transforms)
══════════════════════════════════════════════════════════════ */
function BlueprintBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>

      {/* Full-page fine grid */}
      <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.05 }}>
        <defs>
          <pattern id="grid-sm" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#d7c7aa" strokeWidth="0.35" />
          </pattern>
          <pattern id="grid-lg" width="200" height="200" patternUnits="userSpaceOnUse">
            <rect width="200" height="200" fill="url(#grid-sm)" />
            <path d="M 200 0 L 0 0 0 200" fill="none" stroke="#8fb8c8" strokeWidth="0.75" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-lg)" />
      </svg>

      {/* TOP LEFT — 3-tier architecture */}
      <svg className="absolute" style={{ top: 82, left: 52, opacity: 0.062, overflow: "visible" }} width="240" height="130" xmlns="http://www.w3.org/2000/svg">
        <g stroke="#d7c7aa" strokeWidth="0.7" fill="none">
          <rect x="0"   y="0"  width="90" height="34" rx="2" />
          <rect x="110" y="0"  width="90" height="34" rx="2" />
          <rect x="55"  y="58" width="90" height="34" rx="2" />
          <rect x="55"  y="108" width="90" height="22" rx="2" opacity="0.5" />
          <line x1="90"  y1="17" x2="110" y2="17" />
          <line x1="100" y1="34" x2="100" y2="58" />
          <line x1="100" y1="92" x2="100" y2="108" />
          <text x="10"  y="21" fontSize="8" fill="#d7c7aa" fontFamily="monospace">UI / Client</text>
          <text x="118" y="21" fontSize="8" fill="#d7c7aa" fontFamily="monospace">API Gateway</text>
          <text x="66"  y="79" fontSize="8" fill="#d7c7aa" fontFamily="monospace">Microservice</text>
          <text x="68"  y="123" fontSize="7" fill="#d7c7aa" fontFamily="monospace" opacity="0.7">Database</text>
        </g>
      </svg>

      {/* TOP RIGHT — code fragment */}
      <svg className="absolute" style={{ top: 52, right: "6%", opacity: 0.057, overflow: "visible" }} width="310" height="100" xmlns="http://www.w3.org/2000/svg">
        <g fontFamily="monospace" fontSize="9" fill="#8fb8c8">
          <text x="0" y="12"  opacity="0.9">{"const chain = new Web3(rpcUrl);"}</text>
          <text x="0" y="28"  opacity="0.75">{"async function deployContract(abi) {"}</text>
          <text x="16" y="44" opacity="0.65">{"const instance = new chain.eth"}</text>
          <text x="16" y="60" opacity="0.65">{"  .Contract(abi);"}</text>
          <text x="16" y="76" opacity="0.55">{"return instance.deploy().send();"}</text>
          <text x="0" y="92"  opacity="0.75">{" }"}</text>
        </g>
      </svg>

      {/* MID LEFT — neural network / AI diagram */}
      <svg className="absolute" style={{ top: "38%", left: 28, opacity: 0.053, overflow: "visible" }} width="160" height="120" xmlns="http://www.w3.org/2000/svg">
        <g stroke="#8fb8c8" strokeWidth="0.55" fill="none">
          {/* Input layer */}
          {[20,50,80].map((y, i) => <circle key={i} cx="20" cy={y} r="7" />)}
          {/* Hidden layer */}
          {[15,42,68,95].map((y, i) => <circle key={i} cx="80" cy={y} r="7" />)}
          {/* Output layer */}
          {[35,65].map((y, i) => <circle key={i} cx="140" cy={y} r="7" />)}
          {/* Connections input→hidden */}
          {[20,50,80].map(y1 => [15,42,68,95].map(y2 => <line key={`${y1}-${y2}`} x1="27" y1={y1} x2="73" y2={y2} opacity="0.3" />))}
          {/* Connections hidden→output */}
          {[15,42,68,95].map(y1 => [35,65].map(y2 => <line key={`${y1}-${y2}`} x1="87" y1={y1} x2="133" y2={y2} opacity="0.3" />))}
          <text x="10" y="108" fontSize="7" fill="#8fb8c8" fontFamily="monospace">Input</text>
          <text x="65" y="108" fontSize="7" fill="#8fb8c8" fontFamily="monospace">Hidden</text>
          <text x="125" y="108" fontSize="7" fill="#8fb8c8" fontFamily="monospace">Out</text>
        </g>
      </svg>

      {/* MID RIGHT — RAG pipeline */}
      <svg className="absolute" style={{ top: "35%", right: "4%", opacity: 0.052, overflow: "visible" }} width="200" height="140" xmlns="http://www.w3.org/2000/svg">
        <g stroke="#d7c7aa" strokeWidth="0.65" fill="none">
          <rect x="0"  y="0"   width="80" height="26" rx="2" />
          <rect x="0"  y="46"  width="80" height="26" rx="2" />
          <rect x="0"  y="92"  width="80" height="26" rx="2" />
          <rect x="120" y="46" width="80" height="26" rx="2" />
          <line x1="80" y1="13" x2="120" y2="59" />
          <line x1="80" y1="59" x2="120" y2="59" />
          <line x1="80" y1="105" x2="120" y2="59" />
          <text x="6"  y="17"  fontSize="7.5" fill="#d7c7aa" fontFamily="monospace">Vector DB</text>
          <text x="6"  y="63"  fontSize="7.5" fill="#d7c7aa" fontFamily="monospace">Embedder</text>
          <text x="6"  y="109" fontSize="7.5" fill="#d7c7aa" fontFamily="monospace">LLM Prompt</text>
          <text x="126" y="63" fontSize="7.5" fill="#d7c7aa" fontFamily="monospace">Response</text>
        </g>
      </svg>

      {/* BOTTOM LEFT — UI wireframe */}
      <svg className="absolute" style={{ bottom: "12%", left: 36, opacity: 0.054, overflow: "visible" }} width="230" height="138" xmlns="http://www.w3.org/2000/svg">
        <g stroke="#8fb8c8" strokeWidth="0.6" fill="none">
          <rect x="0"   y="0"   width="210" height="128" rx="3" />
          <rect x="8"   y="8"   width="194" height="18"  rx="2" opacity="0.6" />
          <rect x="8"   y="34"  width="94"  height="86"  rx="2" opacity="0.5" />
          <rect x="110" y="34"  width="94"  height="40"  rx="2" opacity="0.5" />
          <rect x="110" y="82"  width="94"  height="38"  rx="2" opacity="0.4" />
          <line x1="16" y1="52" x2="94" y2="52" strokeWidth="0.4" opacity="0.45" />
          <line x1="16" y1="68" x2="78" y2="68" strokeWidth="0.4" opacity="0.45" />
          <line x1="16" y1="84" x2="86" y2="84" strokeWidth="0.4" opacity="0.45" />
          <line x1="16" y1="100" x2="72" y2="100" strokeWidth="0.4" opacity="0.35" />
        </g>
      </svg>

      {/* BOTTOM RIGHT — blockchain/merkle tree */}
      <svg className="absolute" style={{ bottom: "14%", right: "4%", opacity: 0.056, overflow: "visible" }} width="200" height="120" xmlns="http://www.w3.org/2000/svg">
        <g stroke="#d7c7aa" strokeWidth="0.65" fill="none">
          <rect x="75" y="0"  width="50" height="22" rx="2" />
          <rect x="20" y="46" width="50" height="22" rx="2" />
          <rect x="130" y="46" width="50" height="22" rx="2" />
          <rect x="0"  y="92" width="40" height="20" rx="2" opacity="0.65" />
          <rect x="50" y="92" width="40" height="20" rx="2" opacity="0.65" />
          <rect x="110" y="92" width="40" height="20" rx="2" opacity="0.65" />
          <rect x="160" y="92" width="40" height="20" rx="2" opacity="0.65" />
          <line x1="100" y1="22" x2="45"  y2="46" />
          <line x1="100" y1="22" x2="155" y2="46" />
          <line x1="45"  y1="68" x2="20"  y2="92" />
          <line x1="45"  y1="68" x2="70"  y2="92" />
          <line x1="155" y1="68" x2="130" y2="92" />
          <line x1="155" y1="68" x2="180" y2="92" />
          <text x="82" y="14" fontSize="7" fill="#d7c7aa" fontFamily="monospace">Block N</text>
          <text x="27" y="60" fontSize="7" fill="#d7c7aa" fontFamily="monospace">TX Root</text>
          <text x="137" y="60" fontSize="7" fill="#d7c7aa" fontFamily="monospace">State</text>
        </g>
      </svg>

      {/* CENTER-TOP — AI pipeline */}
      <svg className="absolute" style={{ top: "9%", left: "36%", opacity: 0.051, overflow: "visible" }} width="300" height="30" xmlns="http://www.w3.org/2000/svg">
        <g stroke="#8fb8c8" strokeWidth="0.65" fill="none">
          <rect x="0"   y="0" width="72" height="24" rx="2" />
          <rect x="92"  y="0" width="72" height="24" rx="2" />
          <rect x="184" y="0" width="72" height="24" rx="2" />
          <line x1="72"  y1="12" x2="92"  y2="12" />
          <line x1="164" y1="12" x2="184" y2="12" />
          <text x="8"   y="15" fontSize="7.5" fill="#8fb8c8" fontFamily="monospace">Ingest</text>
          <text x="100" y="15" fontSize="7.5" fill="#8fb8c8" fontFamily="monospace">Embed</text>
          <text x="192" y="15" fontSize="7.5" fill="#8fb8c8" fontFamily="monospace">Retrieve</text>
        </g>
      </svg>

      {/* CROSSHAIRS — scattered across the full field */}
      {(["12%,28%", "88%,12%", "50%,82%", "92%,62%", "8%,72%", "45%,48%", "76%,42%"]).map((pos, i) => {
        const [l, t] = pos.split(",");
        return (
          <svg key={i} className="absolute" style={{ left: l, top: t, overflow: "visible", opacity: 0.042 }} width="1" height="1" xmlns="http://www.w3.org/2000/svg">
            <g stroke="#d7c7aa" strokeWidth="0.5">
              <line x1="-8" y1="0" x2="8" y2="0" />
              <line x1="0" y1="-8" x2="0" y2="8" />
              <circle cx="0" cy="0" r="3" fill="none" />
            </g>
          </svg>
        );
      })}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   SPOTLIGHT PORTRAIT
══════════════════════════════════════════════════════════════ */
function SpotlightPortrait() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rawX = useMotionValue(50);
  const rawY = useMotionValue(44);
  const spotX = useSpring(rawX, { stiffness: 600, damping: 28, mass: 0.05 });
  const spotY = useSpring(rawY, { stiffness: 600, damping: 28, mass: 0.05 });
  const [hovering, setHovering] = useState(false);
  const [mask, setMask] = useState("radial-gradient(circle 0px at 50% 44%, black 0%, rgba(0,0,0,0) 0%)");

  useEffect(() => {
    const RADIUS = 105; // ≈25% smaller than previous 140px
    function updateMask() {
      const x = spotX.get();
      const y = spotY.get();
      const r = hovering ? RADIUS : 0;
      setMask(`radial-gradient(circle ${r}px at ${x}% ${y}%, black 0%, black 38%, rgba(0,0,0,0.55) 60%, transparent 78%)`);
    }
    const u1 = spotX.on("change", updateMask);
    const u2 = spotY.on("change", updateMask);
    updateMask();
    return () => { u1(); u2(); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [spotX, spotY, hovering]);

  const onMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    rawX.set(((e.clientX - rect.left) / rect.width)  * 100);
    rawY.set(((e.clientY - rect.top)  / rect.height) * 100);
  }, [rawX, rawY]);

  return (
    <div
      ref={containerRef}
      onPointerMove={onMove}
      onPointerEnter={() => setHovering(true)}
      onPointerLeave={() => { setHovering(false); rawX.set(50); rawY.set(44); }}
      className="group relative mx-auto h-[70vh] min-h-[480px] w-full max-w-[1080px] cursor-none overflow-hidden sm:h-[78vh] lg:h-[84vh]"
      aria-label="Interactive portrait — hover to reveal"
    >
      {/* Bottom fade */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-obsidian via-obsidian/50 to-transparent pointer-events-none z-10" />

      {/* BASE — black suit */}
      <div className="portrait-mask absolute inset-0">
        <Image
          src="/malik-black-suit (2).jpeg"
          alt="Mohammed Shoaeb Malik in a black suit"
          fill
          priority
          unoptimized
          sizes="(min-width: 1024px) 1080px, 100vw"
          className="object-cover transition duration-700 ease-out group-hover:scale-[1.012]"
          style={{ objectPosition: "50% 12%" }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_18%,transparent_0%,rgba(7,7,6,0.06)_45%,rgba(7,7,6,0.5)_100%)]" />
      </div>

      {/* REVEAL — white suit (spotlight mask) */}
      <div className="portrait-mask absolute inset-0">
        <Image
          src="/malik-white-suit.png"
          alt="Mohammed Shoaeb Malik in a white suit"
          fill
          priority
          unoptimized
          sizes="(min-width: 1024px) 1080px, 100vw"
          className="object-cover"
          style={{
            objectPosition: "50% 12%",
            WebkitMaskImage: mask,
            maskImage: mask,
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat"
          }}
        />
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   FLOATING ABOUT PANEL
══════════════════════════════════════════════════════════════ */
function FloatingAbout() {
  const [openKey, setOpenKey] = useState<string | null>(null);
  const toggle = (key: string) => setOpenKey((p) => (p === key ? null : key));

  return (
    <section id="about" className="relative px-5 py-12 sm:px-8 lg:px-12">
      <motion.div
        initial={{ opacity: 0, y: 46, scale: 0.97 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto max-w-4xl border border-white/12 bg-white/[0.072] p-6 shadow-glow backdrop-blur-2xl sm:p-8"
      >
        <div className="mb-6 flex items-center justify-between gap-4">
          <p className="font-display text-xs uppercase tracking-[0.34em] text-steel">01 — About</p>
          <ShieldCheck className="text-champagne/60" size={20} />
        </div>

        <div className="grid gap-7 lg:grid-cols-[1fr_1.15fr]">
          {/* Headline */}
          <div>
            <h2 className="font-display text-3xl leading-tight text-porcelain sm:text-[2.2rem]">
              I&rsquo;m Shoaeb,<br />
              <span className="text-champagne">Product Builder.</span>
            </h2>
            <p className="mt-5 text-sm leading-7 text-smoke">
              I build products at the intersection of software, AI, and emerging technologies.
            </p>
            <p className="mt-3 text-sm leading-7 text-smoke">
              My focus is simple: identify meaningful problems, design practical solutions, and turn ideas into working systems.
            </p>
            <p className="mt-3 text-sm leading-7 text-smoke">
              From blockchain products and AI-powered platforms to full-stack applications, I enjoy creating technology that people can actually use.
            </p>
          </div>

          {/* Expandable accordion */}
          <div className="grid gap-2">
            {aboutItems.map((item) => {
              const isOpen = openKey === item.key;
              return (
                <button
                  key={item.key}
                  data-cursor="interactive"
                  onClick={() => toggle(item.key)}
                  className="w-full text-left border border-white/10 bg-black/20 px-4 py-3 transition hover:border-champagne/30"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-display text-xs uppercase tracking-[0.22em] text-champagne">
                      {item.label}
                    </span>
                    <ChevronDown
                      size={14}
                      className={`shrink-0 text-steel transition duration-300 ${isOpen ? "rotate-180 text-champagne" : ""}`}
                    />
                  </div>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.p
                        key="body"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden pt-3 text-sm leading-6 text-smoke"
                      >
                        {item.body}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </button>
              );
            })}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   HORIZONTAL PROJECT CAROUSEL  (no vertical scroll hijack)
══════════════════════════════════════════════════════════════ */
function ProjectShowcase() {
  const trackRef    = useRef<HTMLDivElement>(null);
  const isDragging  = useRef(false);
  const startX      = useRef(0);
  const scrollStart = useRef(0);

  const onMouseDown = (e: React.MouseEvent) => {
    if (!trackRef.current) return;
    isDragging.current  = true;
    startX.current      = e.clientX;
    scrollStart.current = trackRef.current.scrollLeft;
    trackRef.current.style.cursor     = "grabbing";
    trackRef.current.style.userSelect = "none";
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !trackRef.current) return;
    trackRef.current.scrollLeft = scrollStart.current + (startX.current - e.clientX);
  };
  const endDrag = () => {
    isDragging.current = false;
    if (trackRef.current) {
      trackRef.current.style.cursor     = "grab";
      trackRef.current.style.userSelect = "";
    }
  };

  // Only handle horizontal wheel — never block vertical page scroll
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        e.preventDefault();
        el.scrollLeft += e.deltaX;
      }
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  const scroll = (dir: -1 | 1) => trackRef.current?.scrollBy({ left: dir * 360, behavior: "smooth" });

  return (
    <div className="relative">
      <div className="mb-5 flex items-center justify-between">
        <p className="text-xs uppercase tracking-[0.24em] text-steel">Drag or use arrows to browse</p>
        <div className="flex gap-2">
          {([-1, 1] as const).map((dir) => (
            <button
              key={dir}
              onClick={() => scroll(dir)}
              data-cursor="interactive"
              aria-label={dir === -1 ? "Previous" : "Next"}
              className="flex h-9 w-9 items-center justify-center border border-white/12 bg-white/[0.04] text-porcelain transition hover:border-champagne/50 hover:text-champagne"
            >
              {dir === -1 ? <ChevronLeft size={17} /> : <ChevronRight size={17} />}
            </button>
          ))}
        </div>
      </div>

      <div
        ref={trackRef}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={endDrag}
        onMouseLeave={endDrag}
        className="horizontal-showcase -mx-5 overflow-x-auto px-5 pb-5 sm:-mx-8 sm:px-8 lg:-mx-12 lg:px-12"
        style={{ cursor: "grab" }}
      >
        <div className="flex w-max gap-4 py-2">
          {projects.map((project, index) => (
            <ProjectCard key={project.name} project={project} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const content = (
    <motion.article
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: index * 0.04, duration: 0.52 }}
      data-cursor="interactive"
      className="group h-[440px] w-[300px] shrink-0 border border-white/10 bg-white/[0.04] p-5 transition-all duration-500 hover:w-[420px] hover:border-champagne/40 hover:bg-white/[0.072] sm:w-[330px] sm:hover:w-[450px]"
    >
      <div className="flex h-full flex-col justify-between">
        <div>
          <p className="font-display text-sm uppercase tracking-[0.28em] text-steel">
            {String(index + 1).padStart(2, "0")}
          </p>
          <h3 className="mt-5 font-display text-3xl font-semibold text-porcelain">{project.name}</h3>
          <p className="mt-4 text-sm leading-7 text-smoke line-clamp-3">{project.impact}</p>
        </div>
        <div className="grid max-h-0 gap-4 overflow-hidden opacity-0 transition-all duration-500 group-hover:max-h-72 group-hover:opacity-100">
          <ProjectPoint label="Problem"  body={project.problem}  />
          <ProjectPoint label="Solution" body={project.solution} />
          <ProjectPoint label="Impact"   body={project.impact}   />
        </div>
        <div className="flex items-center justify-between border-t border-white/10 pt-4">
          <span className="text-xs uppercase tracking-[0.22em] text-champagne">
            {project.github ? "Open Repository" : "Concept Build"}
          </span>
          <Github size={17} className="text-champagne/75" />
        </div>
      </div>
    </motion.article>
  );

  return project.github ? (
    <a href={project.github} target="_blank" rel="noreferrer" aria-label={`Open ${project.name} GitHub repository`}>
      {content}
    </a>
  ) : content;
}

/* ══════════════════════════════════════════════════════════════
   PROGRESS LOG
══════════════════════════════════════════════════════════════ */
function ProgressLog() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {progressItems.map((item, i) => {
        const isOpen = openIdx === i;
        return (
          <motion.article
            key={item.title}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            data-cursor="interactive"
            onClick={() => item.expandable && setOpenIdx(isOpen ? null : i)}
            className={`border border-white/10 bg-white/[0.035] p-5 transition duration-400 hover:border-champagne/35 hover:bg-white/[0.065] ${
              item.expandable ? "cursor-pointer" : ""
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-champagne/28 bg-champagne/8 text-xl">
                {item.icon}
              </span>
              {item.expandable && (
                <ChevronDown
                  size={14}
                  className={`mt-3 shrink-0 text-steel transition duration-300 ${isOpen ? "rotate-180 text-champagne" : ""}`}
                />
              )}
            </div>
            <h3 className="mt-5 font-display text-lg leading-snug text-porcelain">{item.title}</h3>
            <AnimatePresence>
              {isOpen && item.expandable && (
                <motion.div
                  key="details"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="mt-4 grid gap-2">
                    {item.details.map((d) => (
                      <p key={d} className="border-l border-champagne/25 pl-3 text-sm leading-6 text-smoke">{d}</p>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            {!item.expandable && (
              <>
                <p className="mt-3 text-sm leading-6 text-smoke/65">{item.details[0]}</p>
                {item.link && (
                  <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
                    <div className="flex flex-col">
                      <span className="font-display text-[9px] uppercase tracking-[0.2em] text-steel">Issued By</span>
                      <span className="mt-1 text-xs text-porcelain">{item.org}</span>
                    </div>
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noreferrer"
                      className="group/link flex items-center gap-2 text-[11px] uppercase tracking-[0.12em] text-champagne transition hover:text-porcelain"
                    >
                      Verify Credential <ArrowRight size={14} className="transition group-hover/link:translate-x-1" />
                    </a>
                  </div>
                )}
              </>
            )}
          </motion.article>
        );
      })}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   AREA OF EXPERTISE
══════════════════════════════════════════════════════════════ */
function ExpertiseGrid() {
  return (
    <div className="grid gap-x-16 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
      {expertiseGroups.map((group, i) => (
        <motion.div
          key={group.code}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: i * 0.07, duration: 0.52, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Category header */}
          <div className="mb-5 flex items-baseline gap-3 border-b border-white/8 pb-3">
            <span className="font-display text-[10px] uppercase tracking-[0.36em] text-champagne/50">
              {group.code}
            </span>
            <h3 className="font-display text-sm uppercase tracking-[0.24em] text-porcelain">
              {group.title}
            </h3>
          </div>

          {/* Items — clean square technology pills */}
          <ul className="flex flex-wrap gap-2.5">
            {group.items.map((item) => (
              <li
                key={item}
                className="bg-white/[0.045] px-4 py-2 text-xs text-smoke/90 transition-colors hover:bg-white/[0.085] hover:text-porcelain"
              >
                {item}
              </li>
            ))}
          </ul>
        </motion.div>
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   CONTACT
══════════════════════════════════════════════════════════════ */
function ContactSection() {
  const links = [
    { icon: <Github size={20} />,   label: "GitHub",   value: "github.com/ShoaebMalik19",      href: "https://github.com/ShoaebMalik19"         },
    { icon: <Linkedin size={20} />, label: "LinkedIn", value: "linkedin.com/in/shoaebmalik",    href: "https://linkedin.com/in/shoaebmalik"       },
    { icon: <Mail size={20} />,     label: "Email",    value: "shoaebmalik19@gmail.com",        href: "mailto:shoaebmalik19@gmail.com"            }
  ];

  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {links.map((link) => (
        <motion.a
          key={link.href}
          href={link.href}
          target={link.href.startsWith("http") ? "_blank" : undefined}
          rel="noreferrer"
          data-cursor="interactive"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="group flex flex-col items-center gap-4 border border-white/10 bg-white/[0.035] px-6 py-8 transition duration-400 hover:border-champagne/40 hover:bg-white/[0.065]"
        >
          <span className="text-champagne/75 transition group-hover:text-champagne">{link.icon}</span>
          <div className="text-center">
            <p className="font-display text-xs uppercase tracking-[0.28em] text-steel">{link.label}</p>
            <p className="mt-1 text-sm text-smoke transition group-hover:text-porcelain">{link.value}</p>
          </div>
        </motion.a>
      ))}
    </div>
  );
}



/* ══════════════════════════════════════════════════════════════
   SHARED HELPERS
══════════════════════════════════════════════════════════════ */
function Section({ id, eyebrow, title, children }: {
  id: string; eyebrow: string; title: string; children: React.ReactNode;
}) {
  return (
    <section id={id} className="relative px-5 py-20 sm:px-8 sm:py-24 lg:px-12">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-90px" }}
        variants={fadeUp}
        className="mx-auto max-w-7xl"
      >
        <div className="mb-10 flex items-end justify-between gap-6 border-b border-white/10 pb-6">
          <div>
            <p className="font-display text-sm uppercase tracking-[0.3em] text-steel">{eyebrow}</p>
            <h2 className="mt-3 font-display text-4xl font-semibold text-porcelain sm:text-6xl">{title}</h2>
          </div>
          <ShieldCheck className="hidden text-champagne/60 sm:block" size={26} />
        </div>
        {children}
      </motion.div>
    </section>
  );
}

function ProjectPoint({ label, body }: { label: string; body: string }) {
  return (
    <div className="border-l border-white/10 pl-4">
      <p className="font-display text-xs uppercase tracking-[0.22em] text-champagne">{label}</p>
      <p className="mt-1.5 text-sm leading-6 text-smoke">{body}</p>
    </div>
  );
}
