"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useSpring,
  useScroll,
  useTransform,
  useMotionTemplate,
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
// import { ThemeToggle } from "@/components/ThemeToggle"; // Disabled for V1
import { Menu, X } from "lucide-react";
import { useTheme } from "next-themes";
import { Cormorant_Garamond } from "next/font/google";

const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["600"] });

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
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Progress Log", href: "#progress" },
  { label: "Area of Expertise", href: "#expertise" },
  { label: "Contact", href: "#contact" }
];

/* ── Expertise groups ──────────────────────────────────────── */
const expertiseGroups = [
  {
    code: "01",
    title: "Programming Languages",
    icon: "</>",
    items: ["Python", "Java", "C", "JavaScript", "TypeScript", "HTML", "CSS"]
  },
  {
    code: "02",
    title: "Frontend",
    icon: "◻",
    items: ["React", "Next.js", "Tailwind CSS"]
  },
  {
    code: "03",
    title: "Backend & APIs",
    icon: "⬡",
    items: ["Node.js", "Express", "REST APIs"]
  },
  {
    code: "04",
    title: "AI · Web3 · Tools",
    icon: "⬬",
    items: ["AI Automation", "RAG", "Smart Contracts", "Docker", "Git", "GitHub", "Postman"]
  }
];

/* ── Progress log milestones ───────────────────────────────── */
const progressItems = [
  {
    icon: "🏆", title: "3× Hackathon Winner", expandable: true,
    details: ["1st Place — Dev Track Hackathon", "1st Place — Decode SIH with OSCode", "2nd Place — Katha Hackathon"]
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
  { key: "who", label: "Who I Am", body: "Builder first. Engineer second. I enjoy turning ideas into products that solve real-world problems." },
  { key: "build", label: "What I Build", body: "Full-stack applications. AI-powered systems. Blockchain products. Developer tools." },
  { key: "focus", label: "What I Focus On", body: "Execution. Problem solving. Product thinking. Practical technology." }
];

/* ══════════════════════════════════════════════════════════════
   CURSOR GLOW
══════════════════════════════════════════════════════════════ */
function CursorGlow() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const opacity = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 400, damping: 28, mass: 0.1 });
  const springY = useSpring(y, { stiffness: 400, damping: 28, mass: 0.1 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      opacity.set(1);
    };
    const handleMouseLeave = () => opacity.set(0);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseout", handleMouseLeave);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseout", handleMouseLeave);
    };
  }, [x, y, opacity]);

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-[100] mix-blend-screen"
      style={{ opacity }}
    >
      <motion.div
        className="absolute h-[240px] w-[240px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.12)_0%,transparent_70%)] blur-[20px]"
        style={{ x: springX, y: springY }}
      />
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════════
   ROOT COMPONENT
══════════════════════════════════════════════════════════════ */
export function PortfolioHome() {
  const { scrollYProgress } = useScroll();
  const heroScale = useTransform(scrollYProgress, [0, 0.22], [1, 0.97]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.28], [1, 0.25]);

  // Portrait-specific scroll animation — strong cinematic shrink
  const portraitScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.55]);
  const portraitY = useTransform(scrollYProgress, [0, 0.3], [0, -260]);
  const portraitOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.88]);

  // Quote-specific scroll animation
  const quoteOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.4]);

  return (
    <main className="relative">
      <CursorGlow />
      <TopNav />



      {/* ── HERO ───────────────────────────────────────────── */}
      <section className="relative min-h-screen overflow-hidden bg-bg-hero transition-colors duration-500">
        <BlueprintBackground />
        <div className="noise" />

        {/* Cinematic poster composition */}
        <motion.div
          style={{ scale: heroScale, opacity: heroOpacity }}
          className="relative z-10 flex flex-col items-center"
        >
          {/* Portrait — slightly lower, ensuring hairline is visible */}
          <motion.div
            initial={{ opacity: 0, y: 40, filter: "blur(20px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
            className="w-full pt-16 sm:pt-20"
          >
            <motion.div style={{ scale: portraitScale, y: portraitY, opacity: portraitOpacity }}>
              <SpotlightPortrait />
            </motion.div>
          </motion.div>

          {/* Statement — protected by gradient and text-shadow */}
          <div
            className="relative z-20 -mt-20 w-full px-5 text-center sm:-mt-28 sm:px-8"
          >
            <div
              className="pointer-events-none absolute inset-0 -z-10"
              style={{ background: "radial-gradient(ellipse at center, var(--hero-text-bg, rgba(7,7,6,0.55)) 0%, transparent 75%)" }}
            />
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.82, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-[clamp(2rem,5vw,4.5rem)] font-semibold uppercase leading-[1.05] tracking-[-0.02em] text-primary [text-shadow:0_4px_32px_rgba(0,0,0,0.8)]"
            >
              Build with discipline.<br />
              <span className="text-accent">Measured by the value it creates.</span>
            </motion.h1>

            {/* Sub-line — pillars */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.68, delay: 0.36, ease: [0.22, 1, 0.36, 1] }}
              className="mx-auto mt-4 max-w-lg font-display text-xs uppercase tracking-[0.38em] text-secondary sm:text-sm [text-shadow:0_2px_16px_rgba(0,0,0,0.8)]"
            >
              Full-Stack&nbsp;&bull;&nbsp;AI&nbsp;Automation&nbsp;&bull;&nbsp;Blockchain
            </motion.p>

            {/* Name — small, secondary */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.48 }}
              className="mt-2 font-display text-xs uppercase tracking-[0.42em] text-primary/30"
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
                className="group inline-flex items-center gap-3 bg-primary px-5 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-background transition hover:bg-accent"
              >
                View Projects
                <ArrowRight size={16} className="transition group-hover:translate-x-1" />
              </a>
              <a
                href="#contact"
                data-cursor="interactive"
                className="inline-flex items-center gap-3 border border-border bg-card px-5 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-primary backdrop-blur-md transition hover:border-accent hover:text-accent"
              >
                Get In Touch
              </a>
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <div className="mt-12 mb-6 flex flex-col items-center opacity-60">
            <motion.span
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              className="mb-4 font-display text-[10px] uppercase tracking-[0.4em] text-secondary"
            >
              Scroll Down
            </motion.span>
            <div className="h-12 w-px overflow-hidden bg-border">
              <motion.span
                animate={{ y: ["-100%", "120%"] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                className="block h-1/2 w-px bg-accent"
              />
            </div>
          </div>
        </motion.div>
      </section>

      <FloatingAbout />

      <Section id="projects" eyebrow="02" title="Featured Projects" bgClass="bg-bg-projects">
        <ProjectShowcase />
      </Section>

      <Section id="progress" eyebrow="03" title="Progress Log" bgClass="bg-bg-progress">
        <ProgressLog />
      </Section>

      <Section id="expertise" eyebrow="04" title="Area of Expertise" bgClass="bg-bg-expertise">
        <ExpertiseGrid />
      </Section>

      <Section id="contact" eyebrow="05" title="Contact" bgClass="bg-bg-contact">
        <ContactSection />
      </Section>

      <footer className="border-t border-border bg-bg-contact px-5 py-8 text-center font-display text-xs uppercase tracking-[0.32em] text-secondary/50 sm:px-8 lg:px-12 transition-colors duration-500">
        Mohammed Shoaeb Malik
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
    <>
      <motion.nav
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed inset-x-0 top-0 z-50 flex items-center justify-between px-5 py-4 transition-all duration-500 sm:px-8 lg:px-12 ${scrolled ? "border-b border-border backdrop-blur-xl" : ""
          }`}
        style={scrolled ? { background: "var(--bg-primary)", opacity: 1 } : {}}
      >
        <motion.a
          href="#"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          data-cursor="interactive"
          className={`${cormorant.className} group flex flex-col items-center transition-opacity duration-500 hover:opacity-70`}
        >
          <span
            className="border-b border-[#C8A96A] pb-1 text-[26px] text-[#F6F1E8]"
            style={{ letterSpacing: "0.35em", marginRight: "-0.35em" }}
          >
            SHOAEB
          </span>
        </motion.a>

        {/* Desktop Menu */}
        <div className="hidden items-center gap-6 lg:flex">
          <ul className="flex items-center gap-6">
            {NAV_LINKS.map((link) => {
              const id = link.href.replace("#", "");
              const isActive = activeSection === id;
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    data-cursor="interactive"
                    className={`relative font-display text-xs uppercase tracking-[0.22em] transition ${isActive ? "text-accent" : "text-secondary hover:text-primary"
                      }`}
                  >
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-indicator"
                        className="absolute -bottom-1 left-0 right-0 h-px bg-accent"
                      />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>
          {/* <ThemeToggle /> Disabled for V1 */}
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-4 lg:hidden">
          {/* <ThemeToggle /> Disabled for V1 */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="text-primary"
            aria-label="Open Menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[60] flex flex-col bg-background px-5 py-6 sm:px-8"
          >
            <div className="flex items-center justify-between">
              <span className="font-display text-xs uppercase tracking-[0.38em] text-accent">Menu</span>
              <button onClick={() => setMobileMenuOpen(false)} className="text-primary">
                <X size={24} />
              </button>
            </div>
            <ul className="mt-12 flex flex-col gap-8">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="font-display text-2xl uppercase tracking-[0.1em] text-primary transition hover:text-accent"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-auto">
              {/* <ThemeToggle /> Disabled for V1 */}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
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
          <rect x="0" y="0" width="90" height="34" rx="2" />
          <rect x="110" y="0" width="90" height="34" rx="2" />
          <rect x="55" y="58" width="90" height="34" rx="2" />
          <rect x="55" y="108" width="90" height="22" rx="2" opacity="0.5" />
          <line x1="90" y1="17" x2="110" y2="17" />
          <line x1="100" y1="34" x2="100" y2="58" />
          <line x1="100" y1="92" x2="100" y2="108" />
          <text x="10" y="21" fontSize="8" fill="#d7c7aa" fontFamily="monospace">UI / Client</text>
          <text x="118" y="21" fontSize="8" fill="#d7c7aa" fontFamily="monospace">API Gateway</text>
          <text x="66" y="79" fontSize="8" fill="#d7c7aa" fontFamily="monospace">Microservice</text>
          <text x="68" y="123" fontSize="7" fill="#d7c7aa" fontFamily="monospace" opacity="0.7">Database</text>
        </g>
      </svg>

      {/* TOP RIGHT — code fragment */}
      <svg className="absolute" style={{ top: 52, right: "6%", opacity: 0.057, overflow: "visible" }} width="310" height="100" xmlns="http://www.w3.org/2000/svg">
        <g fontFamily="monospace" fontSize="9" fill="#8fb8c8">
          <text x="0" y="12" opacity="0.9">{"const chain = new Web3(rpcUrl);"}</text>
          <text x="0" y="28" opacity="0.75">{"async function deployContract(abi) {"}</text>
          <text x="16" y="44" opacity="0.65">{"const instance = new chain.eth"}</text>
          <text x="16" y="60" opacity="0.65">{"  .Contract(abi);"}</text>
          <text x="16" y="76" opacity="0.55">{"return instance.deploy().send();"}</text>
          <text x="0" y="92" opacity="0.75">{" }"}</text>
        </g>
      </svg>

      {/* MID LEFT — neural network / AI diagram */}
      <svg className="absolute" style={{ top: "38%", left: 28, opacity: 0.053, overflow: "visible" }} width="160" height="120" xmlns="http://www.w3.org/2000/svg">
        <g stroke="#8fb8c8" strokeWidth="0.55" fill="none">
          {/* Input layer */}
          {[20, 50, 80].map((y, i) => <circle key={i} cx="20" cy={y} r="7" />)}
          {/* Hidden layer */}
          {[15, 42, 68, 95].map((y, i) => <circle key={i} cx="80" cy={y} r="7" />)}
          {/* Output layer */}
          {[35, 65].map((y, i) => <circle key={i} cx="140" cy={y} r="7" />)}
          {/* Connections input→hidden */}
          {[20, 50, 80].map(y1 => [15, 42, 68, 95].map(y2 => <line key={`${y1}-${y2}`} x1="27" y1={y1} x2="73" y2={y2} opacity="0.3" />))}
          {/* Connections hidden→output */}
          {[15, 42, 68, 95].map(y1 => [35, 65].map(y2 => <line key={`${y1}-${y2}`} x1="87" y1={y1} x2="133" y2={y2} opacity="0.3" />))}
          <text x="10" y="108" fontSize="7" fill="#8fb8c8" fontFamily="monospace">Input</text>
          <text x="65" y="108" fontSize="7" fill="#8fb8c8" fontFamily="monospace">Hidden</text>
          <text x="125" y="108" fontSize="7" fill="#8fb8c8" fontFamily="monospace">Out</text>
        </g>
      </svg>

      {/* MID RIGHT — RAG pipeline */}
      <svg className="absolute" style={{ top: "35%", right: "4%", opacity: 0.052, overflow: "visible" }} width="200" height="140" xmlns="http://www.w3.org/2000/svg">
        <g stroke="#d7c7aa" strokeWidth="0.65" fill="none">
          <rect x="0" y="0" width="80" height="26" rx="2" />
          <rect x="0" y="46" width="80" height="26" rx="2" />
          <rect x="0" y="92" width="80" height="26" rx="2" />
          <rect x="120" y="46" width="80" height="26" rx="2" />
          <line x1="80" y1="13" x2="120" y2="59" />
          <line x1="80" y1="59" x2="120" y2="59" />
          <line x1="80" y1="105" x2="120" y2="59" />
          <text x="6" y="17" fontSize="7.5" fill="#d7c7aa" fontFamily="monospace">Vector DB</text>
          <text x="6" y="63" fontSize="7.5" fill="#d7c7aa" fontFamily="monospace">Embedder</text>
          <text x="6" y="109" fontSize="7.5" fill="#d7c7aa" fontFamily="monospace">LLM Prompt</text>
          <text x="126" y="63" fontSize="7.5" fill="#d7c7aa" fontFamily="monospace">Response</text>
        </g>
      </svg>

      {/* BOTTOM LEFT — UI wireframe */}
      <svg className="absolute" style={{ bottom: "12%", left: 36, opacity: 0.054, overflow: "visible" }} width="230" height="138" xmlns="http://www.w3.org/2000/svg">
        <g stroke="#8fb8c8" strokeWidth="0.6" fill="none">
          <rect x="0" y="0" width="210" height="128" rx="3" />
          <rect x="8" y="8" width="194" height="18" rx="2" opacity="0.6" />
          <rect x="8" y="34" width="94" height="86" rx="2" opacity="0.5" />
          <rect x="110" y="34" width="94" height="40" rx="2" opacity="0.5" />
          <rect x="110" y="82" width="94" height="38" rx="2" opacity="0.4" />
          <line x1="16" y1="52" x2="94" y2="52" strokeWidth="0.4" opacity="0.45" />
          <line x1="16" y1="68" x2="78" y2="68" strokeWidth="0.4" opacity="0.45" />
          <line x1="16" y1="84" x2="86" y2="84" strokeWidth="0.4" opacity="0.45" />
          <line x1="16" y1="100" x2="72" y2="100" strokeWidth="0.4" opacity="0.35" />
        </g>
      </svg>

      {/* BOTTOM RIGHT — blockchain/merkle tree */}
      <svg className="absolute" style={{ bottom: "14%", right: "4%", opacity: 0.056, overflow: "visible" }} width="200" height="120" xmlns="http://www.w3.org/2000/svg">
        <g stroke="#d7c7aa" strokeWidth="0.65" fill="none">
          <rect x="75" y="0" width="50" height="22" rx="2" />
          <rect x="20" y="46" width="50" height="22" rx="2" />
          <rect x="130" y="46" width="50" height="22" rx="2" />
          <rect x="0" y="92" width="40" height="20" rx="2" opacity="0.65" />
          <rect x="50" y="92" width="40" height="20" rx="2" opacity="0.65" />
          <rect x="110" y="92" width="40" height="20" rx="2" opacity="0.65" />
          <rect x="160" y="92" width="40" height="20" rx="2" opacity="0.65" />
          <line x1="100" y1="22" x2="45" y2="46" />
          <line x1="100" y1="22" x2="155" y2="46" />
          <line x1="45" y1="68" x2="20" y2="92" />
          <line x1="45" y1="68" x2="70" y2="92" />
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
          <rect x="0" y="0" width="72" height="24" rx="2" />
          <rect x="92" y="0" width="72" height="24" rx="2" />
          <rect x="184" y="0" width="72" height="24" rx="2" />
          <line x1="72" y1="12" x2="92" y2="12" />
          <line x1="164" y1="12" x2="184" y2="12" />
          <text x="8" y="15" fontSize="7.5" fill="#8fb8c8" fontFamily="monospace">Ingest</text>
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
   SPOTLIGHT PORTRAIT (Circular Reveal)
══════════════════════════════════════════════════════════════ */
function SpotlightPortrait() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const maskRadius = useMotionValue(0);

  // Smooth mask values for the reveal
  const smoothX = useSpring(mouseX, { stiffness: 400, damping: 40 });
  const smoothY = useSpring(mouseY, { stiffness: 400, damping: 40 });
  const smoothRadius = useSpring(maskRadius, { stiffness: 200, damping: 20 });

  const maskImage = useMotionTemplate`radial-gradient(circle ${smoothRadius}px at ${smoothX}px ${smoothY}px, black 55%, transparent 100%)`;

  useEffect(() => setMounted(true), []);

  const onMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  }, [mouseX, mouseY]);

  if (!mounted) return <div className="h-[60vh] min-h-[440px] w-full" />;

  const isDark = theme !== "light";

  // CORRECTED FILENAMES — black suit is (2).jpeg, white suit is suite.jpeg
  const BLACK_SUIT = "/malik-black-suit (2).jpeg";
  const WHITE_SUIT = "/malik-white-suite.jpeg";

  // Base is the current theme's default. Reveal is the opposite.
  const baseSrc = isDark ? BLACK_SUIT : WHITE_SUIT;
  const revealSrc = isDark ? WHITE_SUIT : BLACK_SUIT;

  // The white suit needs slight alignment adjustment relative to the black suit
  const whiteSuitStyle = { transform: "scale(1.025) translate(-0.4%, 1.2%)", transformOrigin: "center top" } as const;
  const baseStyle = isDark ? {} : whiteSuitStyle;
  const revealStyle = isDark ? whiteSuitStyle : {};

  return (
    <div
      ref={containerRef}
      onPointerMove={onMove}
      onPointerEnter={() => maskRadius.set(81)}
      onPointerLeave={() => maskRadius.set(0)}
      className="group relative mx-auto h-[60vh] min-h-[440px] w-full max-w-[1080px] sm:h-[70vh] lg:h-[75vh]"
      aria-label="Interactive portrait — hover to reveal alternate portrait"
      style={{ touchAction: "none" }}
    >
      {/* Preload both images to prevent flicker on theme switch */}
      <link rel="preload" as="image" href={BLACK_SUIT} />
      <link rel="preload" as="image" href={WHITE_SUIT} />

      <div className="absolute inset-0">
        {/* BASE portrait */}
        <div className="absolute inset-0">
          <Image
            src={baseSrc}
            alt="Mohammed Shoaeb Malik portrait"
            fill
            priority
            unoptimized
            sizes="(min-width: 1024px) 1080px, 100vw"
            className="object-cover"
            style={{ objectPosition: "50% 25%", ...baseStyle }}
          />
        </div>

        {/* REVEAL portrait — circular mask follows cursor */}
        <motion.div
          className="absolute inset-0 z-10"
          style={{ WebkitMaskImage: maskImage, maskImage: maskImage }}
        >
          <Image
            src={revealSrc}
            alt="Mohammed Shoaeb Malik alternate portrait"
            fill
            priority
            unoptimized
            sizes="(min-width: 1024px) 1080px, 100vw"
            className="object-cover"
            style={{ objectPosition: "50% 25%", ...revealStyle }}
          />
        </motion.div>
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
    <section id="about" className="relative px-5 py-12 sm:px-8 lg:px-12 bg-bg-about transition-colors duration-500">
      <motion.div
        initial={{ opacity: 0, y: 46, scale: 0.97 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto max-w-4xl border border-border bg-card card-premium p-6 sm:p-8"
      >
        <div className="mb-6 flex items-center justify-between gap-4">
          <p className="font-display text-xs uppercase tracking-[0.34em] text-secondary">01 — About</p>
          <ShieldCheck className="text-accent/60" size={20} />
        </div>

        <div className="grid gap-7 lg:grid-cols-[1fr_1.15fr]">
          {/* Headline */}
          <div>
            <h2 className="font-display text-3xl leading-tight text-primary sm:text-[2.2rem]">
              I&rsquo;m Shoaeb,<br />
              <span className="text-accent">Product Builder.</span>
            </h2>
            <p className="mt-5 text-sm leading-7 text-secondary">
              I build products at the intersection of software, AI, and emerging technologies.
            </p>
            <p className="mt-3 text-sm leading-7 text-secondary">
              My focus is simple: identify meaningful problems, design practical solutions, and turn ideas into working systems.
            </p>
            <p className="mt-3 text-sm leading-7 text-secondary">
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
                  className="w-full text-left border border-border bg-card px-4 py-3 transition hover:border-accent/30"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-display text-xs uppercase tracking-[0.22em] text-accent">
                      {item.label}
                    </span>
                    <ChevronDown
                      size={14}
                      className={`shrink-0 text-secondary transition duration-300 ${isOpen ? "rotate-180 text-accent" : ""}`}
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
                        className="overflow-hidden pt-3 text-sm leading-6 text-secondary"
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
  const trackRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollStart = useRef(0);

  const onMouseDown = (e: React.MouseEvent) => {
    if (!trackRef.current) return;
    isDragging.current = true;
    startX.current = e.clientX;
    scrollStart.current = trackRef.current.scrollLeft;
    trackRef.current.style.cursor = "grabbing";
    trackRef.current.style.userSelect = "none";
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !trackRef.current) return;
    trackRef.current.scrollLeft = scrollStart.current + (startX.current - e.clientX);
  };
  const endDrag = () => {
    isDragging.current = false;
    if (trackRef.current) {
      trackRef.current.style.cursor = "grab";
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
        <p className="text-xs uppercase tracking-[0.24em] text-secondary">Drag or use arrows to browse</p>
        <div className="flex gap-2">
          {([-1, 1] as const).map((dir) => (
            <button
              key={dir}
              onClick={() => scroll(dir)}
              data-cursor="interactive"
              aria-label={dir === -1 ? "Previous" : "Next"}
              className="flex h-9 w-9 items-center justify-center border border-border bg-card card-premium text-primary transition hover:border-accent hover:text-accent"
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
  return (
    <motion.article
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: index * 0.04, duration: 0.52 }}
      onClick={() => {
        if (project.demo) window.open(project.demo, "_blank", "noopener,noreferrer");
      }}
      className={`group card-premium h-[480px] w-[300px] shrink-0 border border-border bg-card p-5 transition-all duration-500 hover:w-[420px] hover:border-accent/50 sm:w-[330px] sm:hover:w-[450px] flex flex-col justify-between ${project.demo ? "cursor-pointer" : ""
        }`}
    >
      <div>
        <p className="font-display text-sm uppercase tracking-[0.28em] text-secondary">
          {String(index + 1).padStart(2, "0")}
        </p>
        <h3 className="mt-5 font-display text-3xl font-semibold text-primary transition-colors group-hover:text-accent">
          {project.name}
        </h3>
        <p className="mt-4 text-sm leading-7 text-secondary line-clamp-3">{project.description}</p>
      </div>
      <div className="grid max-h-0 gap-4 overflow-hidden opacity-0 transition-all duration-500 group-hover:max-h-72 group-hover:opacity-100">
        <ProjectPoint label="Description" body={project.description} />
        <ProjectPoint label="Tech Stack" body={project.techStack} />
      </div>
      <div className="flex items-center gap-3 border-t border-border pt-4">
        {project.demo ? (
          <a
            href={project.demo}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center bg-primary px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-background transition hover:bg-accent"
          >
            {project.demoLabel || "Live Demo"}
          </a>
        ) : project.demoLabel ? (
          <span className="inline-flex items-center bg-primary/20 text-primary px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.1em]">
            {project.demoLabel}
          </span>
        ) : null}

        {project.github ? (
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-2 border border-border px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-primary transition hover:border-accent hover:text-accent"
          >
            <Github size={12} /> {project.githubLabel || "GitHub"}
          </a>
        ) : project.githubLabel ? (
          <span className="inline-flex items-center border border-border px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-secondary">
            {project.githubLabel}
          </span>
        ) : (
          <span className="inline-flex items-center border border-border px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-secondary">
            Proprietary
          </span>
        )}
      </div>
    </motion.article>
  );
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
            className={`border border-border bg-card card-premium p-5 transition duration-300 hover:border-accent/40 ${item.expandable ? "cursor-pointer" : ""
              }`}
          >
            <div className="flex items-start justify-between gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-accent/28 bg-accent/10 text-xl">
                {item.icon}
              </span>
              {item.expandable && (
                <ChevronDown
                  size={14}
                  className={`mt-3 shrink-0 text-secondary transition duration-300 ${isOpen ? "rotate-180 text-accent" : ""}`}
                />
              )}
            </div>
            <h3 className="mt-5 font-display text-lg leading-snug text-primary">{item.title}</h3>
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
                      <p key={d} className="border-l border-accent/25 pl-3 text-sm leading-6 text-secondary">{d}</p>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            {!item.expandable && (
              <>
                <p className="mt-3 text-sm leading-6 text-secondary">{item.details[0]}</p>
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
    <div className="grid gap-5 sm:grid-cols-2">
      {expertiseGroups.map((group, i) => (
        <motion.div
          key={group.code}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: i * 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="group card-premium rounded-none border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-[0_8px_32px_rgba(0,0,0,0.18)]"
        >
          {/* Category header */}
          <div className="mb-5 flex items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center border border-accent/25 bg-accent/8 font-mono text-xs text-accent">
              {group.icon}
            </span>
            <div>
              <p className="font-display text-[9px] uppercase tracking-[0.36em] text-secondary">
                {group.code}
              </p>
              <h3 className="font-display text-xs uppercase tracking-[0.22em] text-primary">
                {group.title}
              </h3>
            </div>
          </div>

          {/* Tech pills */}
          <ul className="flex flex-wrap gap-2">
            {group.items.map((item) => (
              <li
                key={item}
                className="border border-border bg-bg-hero px-3 py-1.5 text-[11px] font-medium text-secondary transition-all duration-200 hover:border-accent/60 hover:text-primary"
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
    { icon: <Github size={20} />, label: "GitHub", value: "github.com/ShoaebMalik19", href: "https://github.com/ShoaebMalik19" },
    { icon: <Linkedin size={20} />, label: "LinkedIn", value: "linkedin.com/in/shoaebmalik", href: "https://linkedin.com/in/shoaebmalik" },
    { icon: <Mail size={20} />, label: "Email", value: "shoaebmalik19@gmail.com", href: "mailto:shoaebmalik19@gmail.com" }
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
          className="group card-premium flex flex-col items-center gap-4 border border-border bg-card px-6 py-8 transition-all hover:border-accent/60 hover:-translate-y-0.5"
        >
          <span className="text-accent/75 transition group-hover:text-accent">{link.icon}</span>
          <div className="text-center">
            <p className="font-display text-xs uppercase tracking-[0.28em] text-secondary">{link.label}</p>
            <p className="mt-1 text-sm text-secondary transition group-hover:text-primary">{link.value}</p>
          </div>
        </motion.a>
      ))}
    </div>
  );
}



/* ══════════════════════════════════════════════════════════════
   SHARED HELPERS
══════════════════════════════════════════════════════════════ */
function Section({ id, eyebrow, title, children, bgClass = "" }: {
  id: string; eyebrow: string; title: string; children: React.ReactNode; bgClass?: string;
}) {
  return (
    <section id={id} className={`relative px-5 py-20 sm:px-8 sm:py-24 lg:px-12 transition-colors duration-500 ${bgClass}`}>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-90px" }}
        variants={fadeUp}
        className="mx-auto max-w-7xl"
      >
        <div className="mb-10 flex items-end justify-between gap-6 border-b border-border pb-6">
          <div>
            <p className="font-display text-sm uppercase tracking-[0.3em] text-secondary">{eyebrow}</p>
            <h2 className="mt-3 font-display text-4xl font-semibold text-primary sm:text-6xl">{title}</h2>
          </div>
          <ShieldCheck className="hidden text-accent/60 sm:block" size={26} />
        </div>
        {children}
      </motion.div>
    </section>
  );
}

function ProjectPoint({ label, body }: { label: string; body: string }) {
  return (
    <div className="border-l-2 border-accent/30 pl-4">
      <p className="font-display text-xs uppercase tracking-[0.22em] text-accent">{label}</p>
      <p className="mt-1.5 text-sm leading-6 text-secondary">{body}</p>
    </div>
  );
}
