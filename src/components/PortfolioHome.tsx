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
  useReducedMotion,
  MotionConfig,
  AnimatePresence,
  type Variants
} from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Github,
  Mail,
  MessageCircle,
  MapPin,
  ShieldCheck,
  BadgeCheck,
  BarChart3,
  Users,
  Code2,
  LayoutTemplate,
  Server,
  Cpu,
  Trophy
} from "lucide-react";
import { projects, ribbonShots, type Project } from "@/data/projects";
import { wins, internships, clientWork, type Role, type ExtLink } from "@/data/profile";
import { Menu, X } from "lucide-react";
import { ProjectBento } from "@/components/ProjectBento";
import { ScrollJourney, CountUp, RevealWords, ScrollBanner, EdgeLight, RoamingBot } from "@/components/ScrollFX";
import { FreelanceServices, FreelanceFAQ } from "@/components/Freelance";
import { Cormorant_Garamond } from "next/font/google";

const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["600"] });

const EMAIL = "shoaebmalik19@gmail.com";
// Server-side redirect: the WhatsApp number never appears in the page or bundle.
const WHATSAPP_PROJECT = "/go/whatsapp?t=project";
const WHATSAPP_HELLO = "/go/whatsapp";
const TELEGRAM = "https://t.me/SHOAEB19";
const X_PROFILE = "https://x.com/malik_shoa44572";

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
  { label: "Wins", href: "#wins" },
  { label: "Experience", href: "#experience" },
  { label: "Hire Me", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Progress Log", href: "#progress" },
  { label: "Expertise", href: "#expertise" },
  { label: "Contact", href: "#contact" }
];

/* ── Expertise groups ──────────────────────────────────────── */
const expertiseGroups = [
  {
    code: "01",
    title: "Programming Languages",
    icon: Code2,
    items: ["Python", "Java", "C", "JavaScript", "TypeScript", "HTML", "CSS"]
  },
  {
    code: "02",
    title: "Frontend",
    icon: LayoutTemplate,
    items: ["React", "Next.js", "Tailwind CSS"]
  },
  {
    code: "03",
    title: "Backend & APIs",
    icon: Server,
    items: ["Node.js", "Express", "Django", "Supabase", "REST APIs"]
  },
  {
    code: "04",
    title: "AI · Web3 · Tools",
    icon: Cpu,
    items: ["AI Integration", "Chatbots", "RAG", "Smart Contracts", "Docker", "Git", "GitHub", "Postman"]
  }
];

/* ── Progress log: credentials and community ───────────────── */
const progressItems = [
  {
    icon: BadgeCheck, title: "Oracle Certified Generative AI Professional",
    org: "Oracle", link: "https://catalog-education.oracle.com/pls/certview/sharebadge?id=BD7BAF5724C0D90062240DF9DF7E0EC310ED67B08F9BFD943D4DF0066F032153",
    details: ["Certified in practical generative AI foundations and use cases."]
  },
  {
    icon: BadgeCheck, title: "Oracle Certified Data Science Professional",
    org: "Oracle", link: "https://catalog-education.oracle.com/pls/certview/sharebadge?id=0A52CD37B7330566782AACB09BF0428E93391AC41E5522F92E450433F31BF865",
    details: ["Certified in data science workflows, modeling, and applied analysis."]
  },
  {
    icon: BarChart3, title: "Data Science Job Simulation",
    org: "Deloitte",
    details: ["Completed Deloitte's data science job simulation."]
  },
  {
    icon: Users, title: "AI-FI Club Member",
    details: ["Active contributor to a community building AI-focused events and products."]
  },
  {
    icon: Users, title: "IDC Club Member",
    details: ["Engaged in innovation-driven initiatives and collaborative development culture."]
  }
] as { icon: React.ComponentType<{ size?: number; className?: string }>; title: string; org?: string; link?: string; details: string[] }[];

/* ── About expandable items ────────────────────────────────── */
const aboutItems = [
  { key: "who", label: "Who I Am", body: "Builder first. Engineer second. I enjoy turning ideas into products that solve real-world problems." },
  { key: "build", label: "What I Build", body: "AI-integrated web apps, blockchain products and full-stack platforms, plus fixing products that don't work yet." },
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
    <motion.div className="pointer-events-none fixed inset-0 z-[100] mix-blend-screen" style={{ opacity }}>
      <motion.div
        className="absolute h-[240px] w-[240px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(215,199,170,0.10)_0%,transparent_70%)] blur-[20px]"
        style={{ x: springX, y: springY }}
      />
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════════
   ROOT COMPONENT
══════════════════════════════════════════════════════════════ */
export function PortfolioHome() {
  // One listener feeds the cursor position to whichever .spot card is under the pointer.
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>(".spot");
      if (!el) return;
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - r.left}px`);
      el.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    // reducedMotion="user": framer skips movement for visitors who ask for less
    // motion, while server and client still render identical markup.
    <MotionConfig reducedMotion="user">
    <main className="relative">
      <CursorGlow />
      <ScrollJourney />
      <EdgeLight />
      <RoamingBot />
      <TopNav />
      <Hero />

      <FloatingAbout />
      <ProofStrip />

      <Section id="wins" eyebrow="02" title="Hackathon" accent="Wins" intro="Three wins, each backed by a certificate, a photo from the event or a live app." bgClass="bg-bg-projects">
        <WinsGrid />
      </Section>

      <Section id="experience" eyebrow="03" title="Work &" accent="Experience" intro="Client sites that are live today, plus internships at a startup and a university lab." bgClass="bg-bg-progress">
        <ExperienceSplit />
      </Section>

      <FreelanceServices whatsappHref={WHATSAPP_PROJECT} />
      <ScrollBanner text="Websites · Web Apps · AI · Web3" />

      <Section id="projects" eyebrow="04" title="Featured" accent="Projects" intro="Hackathon builds and side projects across AI, blockchain and the web. Filter to see what is live." bgClass="bg-bg-projects">
        <div className="hidden lg:block">
          <ProjectBento />
        </div>
        <div className="lg:hidden">
          <ProjectShowcase />
        </div>
      </Section>

      <Section id="progress" eyebrow="05" title="Progress" accent="Log" intro="Certifications and the communities I build with." bgClass="bg-bg-progress">
        <ProgressLog />
      </Section>

      <Section id="expertise" eyebrow="06" title="Area of" accent="Expertise" intro="The tools I reach for, from the first prototype to production." bgClass="bg-bg-expertise">
        <ExpertiseGrid />
      </Section>

      <FreelanceFAQ />
      <ScrollBanner text="Let's build · Bengaluru" />

      <Section id="contact" eyebrow="07" title="Get in" accent="Touch" bgClass="bg-bg-contact">
        <ContactSection />
      </Section>

      <footer className="border-t border-border bg-bg-contact px-5 py-8 text-center font-display text-xs uppercase tracking-[0.32em] text-secondary/50 sm:px-8 lg:px-12 transition-colors duration-500">
        Mohammed Shoaeb Malik · Freelance web &amp; AI developer in Bengaluru, India
      </footer>
    </main>
    </MotionConfig>
  );
}

/* ══════════════════════════════════════════════════════════════
   HERO — cut-out portrait inside an orbiting ribbon of real work
══════════════════════════════════════════════════════════════ */
function Hero() {
  const reduce = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  // Leaving the hero: the portrait pushes towards you, the ribbon flies up and
  // apart, and the two text blocks slide off to their own sides.
  const portraitScale = useTransform(scrollYProgress, [0, 1], [1, 1.32]);
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const portraitBlur = useTransform(scrollYProgress, [0.35, 1], ["blur(0px)", "blur(6px)"]);
  const ribbonOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const ribbonY = useTransform(scrollYProgress, [0, 1], [0, -220]);
  const ribbonScale = useTransform(scrollYProgress, [0, 1], [1, 1.6]);
  const leftX = useTransform(scrollYProgress, [0, 1], [0, -260]);
  const rightX = useTransform(scrollYProgress, [0, 1], [0, 260]);
  const textFade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const ease = [0.22, 1, 0.36, 1] as const;

  return (
    <section ref={heroRef} className="relative overflow-hidden bg-bg-hero transition-colors duration-500 lg:h-[100svh] lg:min-h-[760px] lg:max-h-[1100px]">
      <BlueprintBackground />
      <div className="noise" />
      {/* Warm light behind the head */}
      <div
        className="pointer-events-none absolute left-1/2 top-[18%] h-[70vh] w-[70vh] -translate-x-1/2 rounded-full opacity-70 blur-[40px]"
        style={{ background: "radial-gradient(circle, rgba(215,199,170,0.14) 0%, rgba(143,184,200,0.05) 40%, transparent 70%)" }}
        aria-hidden
      />

      {/* Status pills */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.5, ease }}
        className="relative z-30 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 px-5 pt-24 text-[12px] text-secondary sm:pt-[92px]"
      >
        <span className="inline-flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          Open to <span className="text-primary">internships &amp; client work</span>
        </span>
        <span className="hidden h-4 w-px bg-border sm:block" />
        <span className="inline-flex items-center gap-1.5">
          <MapPin size={13} className="text-accent" /> Based in <span className="text-primary">Bengaluru, India</span>
        </span>
      </motion.div>

      {/* Stage: ribbon + portrait */}
      <div className="relative h-[58svh] min-h-[400px] sm:h-[66svh] lg:absolute lg:inset-0 lg:h-auto">
        <motion.div
          style={{ opacity: ribbonOpacity, y: ribbonY, scale: ribbonScale }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, delay: 0.3 }}
          className="absolute inset-x-0 top-[4%] lg:top-[19%]"
        >
          <WorkRibbon />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50, filter: "blur(14px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.1, delay: 0.1, ease }}
          className="absolute inset-x-0 bottom-0 z-10 flex justify-center"
        >
          <motion.div style={{ scale: portraitScale, y: portraitY, filter: portraitBlur }} className="origin-bottom">
            <CutoutPortrait />
          </motion.div>
        </motion.div>

        {/* Blend the cut edge into the page */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-[22%] bg-gradient-to-t from-bg-hero via-bg-hero/70 to-transparent" />
      </div>

      {/* Intro — bottom left */}
      <motion.div
        style={{ x: leftX, opacity: textFade }}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.45, ease }}
        className="relative z-30 -mt-10 px-5 sm:px-8 lg:absolute lg:bottom-14 lg:left-12 lg:mt-0 lg:max-w-[520px] lg:px-0"
      >
        <h1 className="font-serif text-[clamp(2.7rem,5vw,4.8rem)] font-medium leading-[0.98] tracking-[-0.01em] text-primary [text-shadow:0_6px_40px_rgba(0,0,0,0.85)]">
          <span className="mb-4 block font-mono text-[11px] uppercase not-italic tracking-[0.32em] text-secondary [text-shadow:none]">
            Hi, I&rsquo;m Mohammed Shoaeb Malik
          </span>
          AI &amp; Full-Stack
          <br />
          <span className="italic text-accent">Developer</span>
        </h1>
        <p className="mt-4 max-w-[30rem] text-[15px] leading-7 text-secondary [text-shadow:0_2px_18px_rgba(0,0,0,0.9)]">
          3&times; hackathon winner and freelance developer in Bangalore. I build AI-integrated web apps and
          blockchain products, and I make broken ones work.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <a
            href={WHATSAPP_PROJECT}
            target="_blank"
            rel="nofollow noopener noreferrer"
            data-cursor="interactive"
            className="group inline-flex items-center gap-3 rounded-full bg-primary py-1.5 pl-1.5 pr-5 text-[14px] font-medium text-background transition hover:bg-accent"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-background text-primary transition group-hover:translate-x-0.5">
              <ArrowRight size={15} />
            </span>
            Begin a project
          </a>
          <a
            href="#wins"
            data-cursor="interactive"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-white/[0.03] px-5 py-[11px] text-[14px] font-medium text-primary backdrop-blur-md transition hover:border-accent hover:text-accent"
          >
            See the wins
          </a>
        </div>
      </motion.div>

      {/* Quote + signature — bottom right */}
      <motion.figure
        style={{ x: rightX, opacity: textFade }}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.6, ease }}
        className="relative z-30 mx-5 mb-14 mt-10 max-w-[360px] sm:mx-8 lg:absolute lg:bottom-16 lg:right-12 lg:m-0"
      >
        <blockquote className="font-serif text-[clamp(1.25rem,1.7vw,1.55rem)] leading-[1.25] text-secondary [text-shadow:0_2px_18px_rgba(0,0,0,0.9)]">
          &ldquo;Build with discipline. <span className="text-primary">Measured by the value it creates.</span>&rdquo;
        </blockquote>
        <figcaption className="mt-1 font-script text-[46px] leading-none text-accent">Shoaeb</figcaption>
      </motion.figure>

      {/* Portrait hint + swap control */}
      <div className="absolute bottom-6 left-1/2 z-30 hidden -translate-x-1/2 flex-col items-center gap-3 lg:flex">
        <button
          type="button"
          onClick={() => window.dispatchEvent(new Event("portrait:swap"))}
          data-cursor="interactive"
          className="rounded-full border border-white/10 bg-black/40 px-4 py-1.5 font-display text-[10px] uppercase tracking-[0.24em] text-secondary backdrop-blur-md transition hover:border-accent hover:text-accent"
        >
          Hover the portrait &middot; or tap to swap
        </button>
        <div className="h-8 w-px overflow-hidden bg-border">
          <motion.span
            animate={reduce ? undefined : { y: ["-100%", "120%"] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="block h-1/2 w-px bg-accent"
          />
        </div>
      </div>
    </section>
  );
}

/*
  A ring of real project screens. The viewer sits inside the cylinder, so
  screens near the edges come towards you and the middle ones recede behind
  the portrait. Pure CSS 3D; pauses on hover; static with reduced motion.
*/
function WorkRibbon() {
  // Each screen appears twice, exactly opposite its twin, so a repeat is never in view.
  const cards = [...ribbonShots, ...ribbonShots];
  const step = 360 / cards.length;
  return (
    <div className="ribbon-stage" aria-label="Screens from projects I've shipped">
      <div className="ribbon-ring">
        {cards.map((c, i) => (
          <figure
            key={i}
            className="ribbon-card"
            style={{ transform: `rotateY(${i * step}deg) translateZ(calc(var(--ribbon-r) * -1))` }}
          >
            <Image
              src={c.src}
              alt={i < ribbonShots.length ? c.label : ""}
              fill
              sizes="340px"
              priority
              className="object-cover object-top"
            />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-3 pb-2 pt-6 font-display text-[10px] uppercase tracking-[0.2em] text-white/85">
              {c.label}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   CUT-OUT PORTRAIT with circular reveal lens
══════════════════════════════════════════════════════════════ */
function CutoutPortrait() {
  const ref = useRef<HTMLDivElement>(null);
  const [swapped, setSwapped] = useState(false);
  useEffect(() => {
    const flip = () => setSwapped((v) => !v);
    window.addEventListener("portrait:swap", flip);
    return () => window.removeEventListener("portrait:swap", flip);
  }, []);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const r = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 400, damping: 40 });
  const sy = useSpring(y, { stiffness: 400, damping: 40 });
  const sr = useSpring(r, { stiffness: 200, damping: 22 });
  const mask = useMotionTemplate`radial-gradient(circle ${sr}px at ${sx}px ${sy}px, black 58%, transparent 100%)`;

  const RENDER = { src: "/portrait/shoaeb-render.webp", alt: "Low-poly portrait of Mohammed Shoaeb Malik in a black suit and aviators" };
  const PHOTO = { src: "/portrait/shoaeb-photo.webp", alt: "Mohammed Shoaeb Malik smiling, in a cream suit" };
  const base = swapped ? PHOTO : RENDER;
  const reveal = swapped ? RENDER : PHOTO;

  const onMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (e.pointerType !== "mouse") return;
      const rect = ref.current?.getBoundingClientRect();
      if (!rect) return;
      x.set(e.clientX - rect.left);
      y.set(e.clientY - rect.top);
    },
    [x, y]
  );

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerEnter={(e) => e.pointerType === "mouse" && r.set(110)}
      onPointerLeave={() => r.set(0)}
      onClick={(e) => {
        if ((e.nativeEvent as PointerEvent).pointerType !== "mouse") setSwapped((s) => !s);
      }}
      className="relative aspect-[1082/839] h-[54svh] min-h-[340px] sm:h-[62svh] lg:h-[78svh] lg:max-h-[860px]"
    >
            <Image src={base.src} alt={base.alt} fill priority sizes="(min-width:1024px) 1100px, 100vw" className="object-contain object-bottom" />
      <motion.div className="absolute inset-0" style={{ WebkitMaskImage: mask, maskImage: mask }} aria-hidden>
        <Image src={reveal.src} alt="" fill sizes="(min-width:1024px) 1100px, 100vw" className="object-contain object-bottom" />
      </motion.div>
    </div>
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
   HACKATHON WINS
══════════════════════════════════════════════════════════════ */
function WinsGrid() {
  return (
    <SwipeRail label="Hackathon wins" desktopGrid="lg:grid-cols-3 lg:gap-4">
      {wins.map((w, i) => (
        <motion.article
          key={w.event}
          style={{ transformPerspective: 1200 }}
          initial={{ opacity: 0, y: 80, rotateX: -24, scale: 0.92 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ delay: i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="spot group card-premium relative flex flex-col overflow-hidden border border-border bg-card transition-all duration-500 hover:-translate-y-1 hover:border-accent/50"
        >
          {/* Visual header: project screen if there is one, otherwise a trophy plate */}
          <div className="relative h-32 overflow-hidden border-b border-border sm:h-40 lg:h-44">
            {w.image ? (
              <Image
                src={w.image}
                alt={`${w.project} screen`}
                fill
                sizes="(min-width:1024px) 400px, 100vw"
                className="object-cover object-top opacity-80 transition duration-700 group-hover:scale-[1.04] group-hover:opacity-100"
              />
            ) : (
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(215,199,170,0.16),transparent_60%)]">
                <span className="absolute -bottom-2 right-4 whitespace-nowrap font-serif text-[56px] italic leading-none text-accent/20 lg:-bottom-3 lg:right-5 lg:text-[72px]">
                  {w.project}
                </span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-black/50 px-3 py-1 font-display text-[10px] uppercase tracking-[0.22em] text-accent backdrop-blur-md">
              <Trophy size={12} /> Winner
            </span>
          </div>

          <div className="flex flex-1 flex-col p-5 lg:p-6">
            <h3 className="font-display text-[22px] font-semibold leading-tight text-primary lg:text-2xl">{w.event}</h3>
            {w.organiser && <p className="mt-1 text-xs uppercase tracking-[0.18em] text-secondary">{w.organiser}</p>}

            <p className="mt-4 font-serif text-2xl italic text-accent lg:mt-5">{w.project}</p>
            <p className="mt-1.5 text-sm leading-6 text-secondary lg:mt-2 lg:leading-7">{w.summary}</p>

            <dl className="mt-4 grid gap-2 border-t border-border pt-4 lg:mt-5">
              {w.facts.map((f) => (
                <div key={f.k} className="grid grid-cols-[5.5rem_1fr] gap-3 text-sm">
                  <dt className="font-display text-[10px] uppercase tracking-[0.2em] text-secondary/80 pt-[3px]">{f.k}</dt>
                  <dd className="text-primary/90">{f.v}</dd>
                </div>
              ))}
            </dl>

            {w.links.length > 0 && (
              <div className="mt-auto flex flex-wrap gap-2.5 pt-5 lg:gap-3 lg:pt-6">
                {w.links.map((l, j) => (
                  <LinkButton key={l.href} link={l} solid={j === 0} />
                ))}
              </div>
            )}
          </div>
        </motion.article>
      ))}
    </SwipeRail>
  );
}

function LinkButton({ link, solid }: { link: ExtLink; solid?: boolean }) {
  return (
    <a
      href={link.href}
      target="_blank"
      rel="noreferrer"
      data-cursor="interactive"
      onClick={(e) => e.stopPropagation()}
      className={
        solid
          ? "inline-flex items-center gap-1.5 bg-primary px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-background transition hover:bg-accent"
          : "inline-flex items-center gap-1.5 border border-border px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-primary transition hover:border-accent hover:text-accent"
      }
    >
      {link.label} <ArrowUpRight size={12} />
    </a>
  );
}

/* ══════════════════════════════════════════════════════════════
   EXPERIENCE — internships and client work, kept separate
══════════════════════════════════════════════════════════════ */
function ExperienceSplit() {
  const [tab, setTab] = useState<"intern" | "client">("client");
  const groups = [
    { key: "client" as const, title: "Client Work", note: "Delivered for paying clients and live businesses", roles: clientWork },
    { key: "intern" as const, title: "Internships", note: "Startup and university lab", roles: internships }
  ];
  return (
    <div>
      {/* Phones and tablets: one group at a time */}
      <div role="tablist" aria-label="Experience type" className="mb-5 grid grid-cols-2 gap-1 border border-border bg-card p-1 lg:hidden">
        {groups.map((g) => (
          <button
            key={g.key}
            role="tab"
            type="button"
            aria-selected={tab === g.key}
            onClick={() => setTab(g.key)}
            className={`flex items-center justify-center gap-2 py-2.5 font-display text-[11px] uppercase tracking-[0.18em] transition ${
              tab === g.key ? "bg-primary text-background" : "text-secondary"
            }`}
          >
            {g.title}
            <span className={tab === g.key ? "text-background/60" : "text-secondary/60"}>{g.roles.length}</span>
          </button>
        ))}
      </div>

      {/* Laptop: client work as a full row of three, internships as a full row of two */}
      <div className="grid gap-12 lg:gap-16">
        {groups.map((g) => (
          // min-w-0: a grid item otherwise grows to fit the rail's full scroll width.
          <div key={g.key} className={`min-w-0 ${tab === g.key ? "" : "hidden lg:block"}`}>
            <RoleColumn
              title={g.title}
              note={g.note}
              roles={g.roles}
              desktopGrid={g.key === "client" ? "lg:grid-cols-3 lg:gap-4" : "lg:grid-cols-2 lg:gap-4"}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function RoleColumn({ title, note, roles, desktopGrid }: { title: string; note: string; roles: Role[]; desktopGrid: string }) {
  return (
    <div>
      <div className="mb-5 hidden items-end justify-between gap-4 border-b border-accent/30 pb-3 lg:flex">
        <h3 className="font-display text-sm uppercase tracking-[0.28em] text-accent">{title}</h3>
        <p className="text-right text-[11px] uppercase tracking-[0.16em] text-secondary/70">{note}</p>
      </div>
      <SwipeRail label={title} desktopGrid={desktopGrid}>
        {roles.map((r, i) => (
          <motion.article
            key={r.org}
            style={{ transformPerspective: 1200 }}
            initial={{ opacity: 0, y: 60, rotateX: -18, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: i * 0.06, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="spot group card-premium flex h-full flex-col overflow-hidden border border-border bg-card transition duration-300 hover:border-accent/40"
          >
            {r.image && (
              <div className="relative h-32 overflow-hidden border-b border-border sm:h-36 lg:h-40">
                <Image
                  src={r.image}
                  alt={`${r.org} website`}
                  fill
                  sizes="(min-width:1024px) 600px, 100vw"
                  className="object-cover object-top opacity-70 brightness-[0.85] transition duration-700 group-hover:scale-[1.03] group-hover:opacity-100 group-hover:brightness-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1 font-display text-[10px] uppercase tracking-[0.2em] text-emerald-300 backdrop-blur-md">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Live
                </span>
              </div>
            )}
            <div className="p-5 lg:p-6">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <h4 className="font-display text-xl font-semibold text-primary">{r.org}</h4>
                  <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-secondary">{r.kind}</p>
                </div>
                {r.links.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {r.links.map((l) => (
                      <LinkButton key={l.href} link={l} />
                    ))}
                  </div>
                )}
              </div>
              <p className="mt-3 text-sm leading-6 text-secondary lg:mt-4 lg:leading-7">{r.summary}</p>
              {r.detail && <p className="mt-2 hidden text-sm leading-7 text-secondary/80 sm:block">{r.detail}</p>}
              {r.stack && (
                <ul className="mt-4 flex flex-wrap gap-2">
                  {r.stack.map((s) => (
                    <li key={s} className="border border-border bg-bg-hero px-3 py-1 text-[11px] text-secondary">
                      {s}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </motion.article>
        ))}
      </SwipeRail>
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
    <section id="about" className="relative px-5 py-10 sm:px-8 sm:py-12 lg:px-12 bg-bg-about transition-colors duration-500">
      <motion.div
        initial={{ opacity: 0, y: 46, scale: 0.97 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto max-w-4xl border border-border bg-card card-premium p-5 sm:p-8"
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
            <p className="mt-3 hidden text-sm leading-7 text-secondary sm:block">
              From blockchain products and AI-powered platforms to full-stack applications, I enjoy creating technology that people can actually use.
            </p>
          </div>

          {/* Expandable accordion */}
          <div className="grid content-start gap-2">
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
        <p className="text-xs uppercase tracking-[0.24em] text-secondary">
          <span className="lg:hidden">Swipe &middot; {projects.length} projects</span>
          <span className="hidden lg:inline">Drag or use arrows to browse</span>
        </p>
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
        className="horizontal-showcase -mx-5 snap-x snap-mandatory scroll-px-5 overflow-x-auto px-5 pb-5 sm:-mx-8 sm:scroll-px-8 sm:px-8 lg:-mx-12 lg:snap-none lg:px-12"
        style={{ cursor: "grab" }}
      >
        <div className="flex w-max gap-3 py-2 lg:gap-4">
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
      initial={{ opacity: 0, x: 80, rotateY: -14 }}
      whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: index * 0.04, duration: 0.52 }}
      onClick={() => {
        if (project.demo) window.open(project.demo, "_blank", "noopener,noreferrer");
      }}
      className={`spot group card-premium flex h-[430px] w-[80vw] max-w-[340px] shrink-0 snap-start flex-col overflow-hidden border border-border bg-card transition-all duration-500 hover:border-accent/50 sm:w-[330px] lg:h-[500px] lg:hover:w-[450px] ${
        project.demo ? "cursor-pointer" : ""
      }`}
    >
      {/* Screen */}
      <div className="relative h-[150px] shrink-0 overflow-hidden border-b border-border lg:h-[180px]">
        {project.image ? (
          <Image
            src={project.image}
            alt={`${project.name} screen`}
            fill
            sizes="450px"
            className="object-cover object-top opacity-75 transition duration-700 group-hover:scale-[1.05] group-hover:opacity-100"
          />
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(215,199,170,0.12),transparent_60%),linear-gradient(135deg,#0d0f14,#15161a)]">
            <span className="absolute bottom-3 left-4 font-serif text-5xl italic text-accent/20">{project.name}</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <p className="absolute left-4 top-4 font-display text-sm uppercase tracking-[0.28em] text-white/70">
          {String(index + 1).padStart(2, "0")}
        </p>
        {project.context && (
          <span className="absolute bottom-3 left-4 rounded-full border border-accent/40 bg-black/55 px-3 py-1 font-display text-[9px] uppercase tracking-[0.2em] text-accent backdrop-blur-md">
            {project.context}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col justify-between p-5">
        <div>
          <h3 className="font-display text-[22px] font-semibold leading-tight text-primary transition-colors group-hover:text-accent lg:text-[26px]">
            {project.name}
          </h3>
          <p className="mt-3 line-clamp-3 text-sm leading-7 text-secondary">{project.description}</p>
          {/* Phones have no hover, so the stack shows inline there; desktop reveals it on hover. */}
          <p className="mt-3 text-[11px] uppercase tracking-[0.14em] text-accent/80 lg:hidden">{project.techStack}</p>
          <div className="hidden max-h-0 gap-3 overflow-hidden opacity-0 transition-all duration-500 group-hover:mt-4 group-hover:max-h-40 group-hover:opacity-100 lg:grid">
            <ProjectPoint label="Tech Stack" body={project.techStack} />
          </div>
        </div>

        <div className="flex items-center gap-3 border-t border-border pt-4">
          {project.demo ? (
            <a
              href={project.demo}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1.5 bg-primary px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-background transition hover:bg-accent"
            >
              {project.demoLabel || "Live Demo"} <ArrowUpRight size={12} />
            </a>
          ) : project.demoLabel ? (
            <span className="inline-flex items-center bg-primary/20 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-primary">
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
          ) : (
            <span className="inline-flex items-center border border-border px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-secondary">
              {project.githubLabel || "Proprietary"}
            </span>
          )}
        </div>
      </div>
    </motion.article>
  );
}

/* ══════════════════════════════════════════════════════════════
   PROGRESS LOG — credentials and community
══════════════════════════════════════════════════════════════ */
function ProgressLog() {
  return (
    <SwipeRail label="Credentials and community" desktopGrid="lg:grid-cols-3 lg:gap-3" itemClass="w-[76%] max-w-[320px] sm:w-[42%]">
      {progressItems.map((item) => (
        <motion.article
          key={item.title}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="spot flex flex-col border border-border bg-card card-premium p-5 transition duration-300 hover:border-accent/40"
        >
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-accent/30 bg-accent/10 text-accent">
            <item.icon size={18} />
          </span>
          <h3 className="mt-5 font-display text-lg leading-snug text-primary">{item.title}</h3>
          <p className="mt-3 text-sm leading-6 text-secondary">{item.details[0]}</p>
          {item.org && (
            <div className="mt-auto flex items-center justify-between border-t border-white/10 pt-4 [margin-top:max(1.25rem,auto)]">
              <div className="flex flex-col">
                <span className="font-display text-[9px] uppercase tracking-[0.2em] text-secondary/70">Issued By</span>
                <span className="mt-1 text-xs text-primary/90">{item.org}</span>
              </div>
              {item.link && (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noreferrer"
                  className="group/link flex items-center gap-2 text-[11px] uppercase tracking-[0.12em] text-accent transition hover:text-primary"
                >
                  Verify Credential <ArrowRight size={14} className="transition group-hover/link:translate-x-1" />
                </a>
              )}
            </div>
          )}
        </motion.article>
      ))}
    </SwipeRail>
  );
}


/* ══════════════════════════════════════════════════════════════
   AREA OF EXPERTISE
══════════════════════════════════════════════════════════════ */
function ExpertiseGrid() {
  return (
    <div>
    <TechMarquee />
    <div className="grid gap-3 sm:grid-cols-2 lg:gap-5">
      {expertiseGroups.map((group, i) => (
        <motion.div
          key={group.code}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: i * 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="spot group card-premium rounded-none border border-border bg-card p-4 transition-all duration-300 sm:p-6 hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-[0_8px_32px_rgba(0,0,0,0.18)]"
        >
          {/* Category header */}
          <div className="mb-3 flex items-center gap-3 sm:mb-5">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-accent/30 bg-accent/10 text-accent">
              <group.icon size={16} />
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
          <ul className="flex flex-wrap gap-1.5 sm:gap-2">
            {group.items.map((item) => (
              <li
                key={item}
                className="border border-border bg-bg-hero px-2.5 py-1 text-[11px] sm:px-3 sm:py-1.5 font-medium text-secondary transition-all duration-200 hover:border-accent/60 hover:text-primary"
              >
                {item}
              </li>
            ))}
          </ul>
        </motion.div>
      ))}
    </div>
    </div>
  );
}

/* Two counter-scrolling rows of every tool, pausing on hover. */
function TechMarquee() {
  const all = expertiseGroups.flatMap((g) => g.items);
  const half = Math.ceil(all.length / 2);
  const rows = [all.slice(0, half), all.slice(half)];
  return (
    <div className="marquee-mask -mx-5 mb-8 grid gap-3 overflow-hidden sm:-mx-8 lg:-mx-12 lg:mb-12" aria-hidden>
      {rows.map((row, r) => (
        <div key={r} className={`marquee-track ${r === 1 ? "marquee-reverse" : ""}`}>
          {[...row, ...row, ...row, ...row].map((t, i) => (
            <span
              key={i}
              className="flex shrink-0 items-center gap-3 whitespace-nowrap font-serif text-[clamp(1.6rem,3.4vw,2.8rem)] italic leading-none text-primary/80"
            >
              {t}
              <span className="h-1.5 w-1.5 rounded-full bg-accent/70" />
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   CONTACT
══════════════════════════════════════════════════════════════ */
function ContactSection() {
  const links: { icon: React.ReactNode; label: string; value: string; href: string; wide?: boolean; hidden?: boolean }[] = [
    { icon: <Mail size={20} />, label: "Email", value: EMAIL, href: `mailto:${EMAIL}`, wide: true },
    { icon: <MessageCircle size={20} />, label: "WhatsApp", value: "Chat with me", href: WHATSAPP_HELLO, hidden: true },
    { icon: <TelegramIcon />, label: "Telegram", value: "@SHOAEB19", href: TELEGRAM },
    { icon: <XIcon />, label: "X", value: "@malik_shoa44572", href: X_PROFILE },
    { icon: <Github size={20} />, label: "GitHub", value: "ShoaebMalik19", href: "https://github.com/ShoaebMalik19" }
  ];

  return (
    <div>
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="mb-8 flex flex-col gap-5 sm:mb-10 sm:gap-6 lg:flex-row lg:items-end lg:justify-between"
      >
        <h3 className="max-w-[16ch] font-serif text-[clamp(2.2rem,4.4vw,3.8rem)] font-medium leading-[1.02] text-primary">
          Let&rsquo;s build something <span className="italic text-accent">worth shipping.</span>
        </h3>
        <div className="flex flex-col items-start gap-2 lg:items-end">
          <a
            href={WHATSAPP_PROJECT}
            target="_blank"
            rel="nofollow noopener noreferrer"
            data-cursor="interactive"
            className="group inline-flex items-center gap-3 rounded-full bg-primary py-1.5 pl-1.5 pr-5 text-[14px] font-medium text-background transition hover:bg-accent"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-background text-primary transition group-hover:translate-x-0.5">
              <ArrowRight size={15} />
            </span>
            Begin a project
          </a>
          <p className="text-xs uppercase tracking-[0.2em] text-secondary/70">Opens WhatsApp · internships · client projects</p>
        </div>
      </motion.div>
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-6">
      {links.map((link) => (
        <motion.a
          key={link.label}
          href={link.href}
          target={link.href.startsWith("mailto:") ? undefined : "_blank"}
          rel={link.hidden ? "nofollow noopener noreferrer" : "noopener noreferrer"}
          data-cursor="interactive"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className={`group card-premium flex flex-col items-center gap-3 border border-border bg-card px-3 py-6 transition-all hover:-translate-y-0.5 hover:border-accent/60 sm:gap-4 sm:px-6 sm:py-9 ${
            link.wide ? "col-span-2" : ""
          }`}
        >
          <span className="text-accent/75 transition group-hover:text-accent">{link.icon}</span>
          <div className="text-center">
            <p className="font-display text-xs uppercase tracking-[0.28em] text-secondary">{link.label}</p>
            <p
              className={`mt-2 break-all font-serif text-primary transition group-hover:text-accent ${
                link.wide ? "text-xl sm:text-2xl" : "text-base sm:text-lg"
              }`}
            >
              {link.value}
            </p>
          </div>
        </motion.a>
      ))}
    </div>
    </div>
  );
}



/* ══════════════════════════════════════════════════════════════
   SWIPE RAIL — horizontal snap scroller on phones and tablets,
   a normal grid on desktop. The next card always peeks in so it's
   obvious there is more, and the counter + dots say how much.
══════════════════════════════════════════════════════════════ */
function SwipeRail({
  children,
  desktopGrid,
  label,
  itemClass = "w-[84%] max-w-[380px] sm:w-[46%]"
}: {
  children: React.ReactNode[];
  desktopGrid: string;
  label: string;
  itemClass?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const count = children.length;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const first = el.firstElementChild as HTMLElement | null;
      if (!first) return;
      const step = first.offsetWidth + parseFloat(getComputedStyle(el).columnGap || "0");
      // At the far right the last card can't snap to the start, so mark it active there.
      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4;
      setActive(atEnd ? count - 1 : Math.min(count - 1, Math.round(el.scrollLeft / step)));
    };
    onScroll();
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [count]);

  const goTo = (i: number) => {
    const el = ref.current;
    const target = el?.children[i] as HTMLElement | undefined;
    if (!el || !target) return;
    el.scrollTo({ left: target.offsetLeft - parseFloat(getComputedStyle(el).paddingLeft), behavior: "smooth" });
  };

  return (
    <div>
      <div
        ref={ref}
        role="region"
        aria-label={label}
        className={`no-scrollbar relative -mx-5 flex snap-x snap-mandatory scroll-px-5 gap-3 overflow-x-auto px-5 pb-1 sm:-mx-8 sm:scroll-px-8 sm:px-8 lg:mx-0 lg:grid lg:snap-none lg:overflow-visible lg:px-0 lg:pb-0 ${desktopGrid}`}
      >
        {children.map((child, i) => (
          <div key={i} className={`flex shrink-0 snap-start [&>*]:w-full lg:w-auto lg:max-w-none ${itemClass}`}>
            {child}
          </div>
        ))}
      </div>

      {count > 1 && (
        <div className="mt-5 flex items-center justify-between lg:hidden">
          <span className="font-display text-[11px] tracking-[0.24em] text-secondary">
            <span className="text-primary">{String(active + 1).padStart(2, "0")}</span> / {String(count).padStart(2, "0")}
          </span>
          <div className="flex items-center gap-1.5">
            {Array.from({ length: count }, (_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Show item ${i + 1} of ${count}`}
                className="flex h-6 items-center px-0.5"
              >
                <span
                  className={`block h-[3px] rounded-full transition-all duration-300 ${
                    i === active ? "w-6 bg-accent" : "w-2.5 bg-white/20"
                  }`}
                />
              </button>
            ))}
          </div>
          <span className="flex items-center gap-1.5 font-display text-[10px] uppercase tracking-[0.24em] text-secondary/80">
            Swipe <ArrowRight size={12} className="swipe-nudge" />
          </span>
        </div>
      )}
    </div>
  );
}

/* Brand marks (lucide has no Telegram or X icons) */
function TelegramIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden>
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden>
      <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
    </svg>
  );
}

/* ══════════════════════════════════════════════════════════════
   PROOF STRIP — the numbers, all counted from the data files
══════════════════════════════════════════════════════════════ */
function ProofStrip() {
  const stats = [
    { n: wins.length, label: "Hackathon wins", href: "#wins" },
    { n: clientWork.length, label: "Live client sites", href: "#experience" },
    { n: internships.length, label: "Internships", href: "#experience" },
    { n: projects.length, label: "Projects built", href: "#projects" }
  ];
  return (
    <div className="border-y border-border bg-bg-about px-5 sm:px-8 lg:px-12">
      <div className="mx-auto grid max-w-7xl grid-cols-2 lg:grid-cols-4">
        {stats.map((st, i) => (
          <a
            key={st.label}
            href={st.href}
            className={`group flex items-end gap-3 py-6 transition-colors hover:bg-white/[0.02] sm:py-8 lg:justify-center ${
              i % 2 === 1 ? "border-l border-border pl-5" : "pr-5"
            } ${i >= 2 ? "border-t border-border lg:border-t-0" : ""} ${i === 2 ? "lg:border-l lg:pl-5" : ""}`}
          >
            <span className="font-serif text-5xl leading-none text-primary transition-colors group-hover:text-accent sm:text-6xl">
              <CountUp to={st.n} />
            </span>
            <span className="pb-1 font-mono text-[10px] uppercase leading-4 tracking-[0.2em] text-secondary">{st.label}</span>
          </a>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   SHARED HELPERS
══════════════════════════════════════════════════════════════ */
function Section({ id, eyebrow, title, accent, intro, children, bgClass = "" }: {
  id: string; eyebrow: string; title: string; accent?: string; intro?: string; children: React.ReactNode; bgClass?: string;
}) {
  return (
    <section id={id} className={`relative overflow-clip px-5 py-14 sm:px-8 sm:py-20 lg:px-12 lg:py-28 transition-colors duration-500 ${bgClass}`}>
      {/* Oversized outlined section number, desktop only */}
      <span
        aria-hidden
        className="ghost-num pointer-events-none absolute -right-4 top-6 hidden select-none font-display text-[15rem] font-bold leading-none lg:block"
      >
        {eyebrow}
      </span>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-90px" }}
        variants={fadeUp}
        className="relative mx-auto max-w-7xl"
      >
        <div className="mb-8 grid gap-4 sm:mb-12 lg:grid-cols-[1.3fr_1fr] lg:items-end lg:gap-12">
          <div>
            <p className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.32em] text-secondary">
              <span className="text-accent">{eyebrow}</span>
              <span className="h-px w-10 bg-[rgba(215,199,170,0.5)]" />
              {id === "progress" ? "credentials" : id}
            </p>
            <h2 className="mt-4 font-serif text-[2.7rem] font-medium leading-[0.98] text-primary sm:text-6xl lg:text-7xl">
              <RevealWords text={title} />
              {accent && (
                <>
                  {" "}
                  <span className="italic text-accent">
                    <RevealWords text={accent} />
                  </span>
                </>
              )}
            </h2>
          </div>
          {intro && <p className="max-w-md text-[15px] leading-7 text-secondary lg:justify-self-end lg:text-right">{intro}</p>}
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
