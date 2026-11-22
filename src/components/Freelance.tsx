"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Bot, Boxes, Globe, Plus, Rocket, Wrench } from "lucide-react";
import { RevealWords, TiltIn } from "@/components/ScrollFX";
import { FAQ } from "@/data/faq";

/*
  Freelance services + FAQ. Written for people in Bangalore searching for a
  freelance web / AI developer, and every claim points at real work.
  The FAQ text is also emitted as FAQPage structured data in layout.tsx,
  so keep the two in sync (both read from FAQ below).
*/


const SERVICES = [
  {
    icon: Globe,
    title: "Business websites",
    body: "Fast, mobile-first, SEO-ready sites that bring in enquiries.",
    proof: "ExpressLink Logistics · live"
  },
  {
    icon: Boxes,
    title: "Web apps & SaaS",
    body: "Full-stack Next.js, React and Supabase apps, from first version to launch.",
    proof: "Fhoneify · Digital Goggle"
  },
  {
    icon: Bot,
    title: "AI integration",
    body: "Chatbots, RAG search over your documents and LLM features inside your product.",
    proof: "LakshyaAI · Decode SIH winner"
  },
  {
    icon: Wrench,
    title: "Rescue & fix",
    body: "Take over a broken or half-built app and make it actually work.",
    proof: "Fhoneify · 3-month paid engagement"
  },
  {
    icon: Rocket,
    title: "Web3 & blockchain",
    body: "Smart-contract apps, wallets and on-chain proofs.",
    proof: "Proof.Market · DevTrack HackSprint winner"
  }
];

const STEPS = ["Talk", "Plan", "Build", "Launch"];

export function FreelanceServices({ whatsappHref }: { whatsappHref: string }) {
  return (
    <section id="services" className="relative overflow-hidden bg-[#070706] px-5 py-16 sm:px-8 sm:py-24 lg:px-12 lg:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full opacity-60 blur-[80px]"
        style={{ background: "radial-gradient(circle, rgba(215,199,170,0.16), transparent 65%)" }}
      />
      <div className="relative mx-auto max-w-7xl">
        <p className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.32em] text-secondary">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          Taking freelance projects · Bengaluru
        </p>
        <h2 className="mt-5 max-w-5xl font-serif text-[2.6rem] font-medium leading-[1] text-primary sm:text-6xl lg:text-[5.4rem]">
          <RevealWords text="Freelance Web & AI Developer" />{" "}
          <span className="italic text-accent">
            <RevealWords text="in Bangalore." />
          </span>
        </h2>
        <p className="mt-6 max-w-2xl text-[15px] leading-7 text-secondary sm:text-base">
          I help Bangalore businesses and founders ship websites, web apps and AI features that work. Three live
          client sites, three hackathon wins, and code you can see on GitHub.
        </p>

        <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
          {SERVICES.map((sv, i) => (
            <li key={sv.title} className={i < 2 ? "lg:col-span-3" : "lg:col-span-2"}>
              <TiltIn i={i % 3} className="h-full">
                <article className="spot group card-premium flex h-full flex-col border border-border bg-card p-6 transition-colors duration-300 hover:border-accent/50 sm:p-7">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-accent/30 bg-accent/10 text-accent transition-transform duration-500 group-hover:rotate-[360deg]">
                    <sv.icon size={19} />
                  </span>
                  <h3 className="mt-6 font-display text-xl font-semibold text-primary sm:text-2xl">{sv.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-secondary">{sv.body}</p>
                  <p className="mt-auto pt-6 font-mono text-[10px] uppercase tracking-[0.2em] text-accent/80">{sv.proof}</p>
                </article>
              </TiltIn>
            </li>
          ))}
        </ul>

        <div className="mt-12 flex flex-col gap-8 border-t border-border pt-10 lg:flex-row lg:items-center lg:justify-between">
          <ol className="flex flex-wrap items-center gap-x-3 gap-y-2 font-display text-[11px] uppercase tracking-[0.28em] text-secondary">
            {STEPS.map((st, i) => (
              <li key={st} className="flex items-center gap-3">
                <span className="text-accent">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-primary">{st}</span>
                {i < STEPS.length - 1 && <span className="h-px w-6 bg-white/20" />}
              </li>
            ))}
          </ol>
          <a
            href={whatsappHref}
            target="_blank"
            rel="nofollow noopener noreferrer"
            className="group inline-flex w-fit items-center gap-3 rounded-full bg-primary py-1.5 pl-1.5 pr-6 text-[15px] font-medium text-background transition hover:bg-accent"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-background text-primary transition group-hover:translate-x-1">
              <ArrowRight size={16} />
            </span>
            Begin a project
          </a>
        </div>
      </div>
    </section>
  );
}

export function FreelanceFAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="relative bg-bg-progress px-5 py-16 sm:px-8 sm:py-24 lg:px-12">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-secondary">
            <span className="text-accent">FAQ</span> · hiring a freelancer
          </p>
          <h2 className="mt-4 font-serif text-[2.6rem] font-medium leading-[1] text-primary sm:text-6xl">
            <RevealWords text="Questions," /> <span className="italic text-accent"><RevealWords text="answered." /></span>
          </h2>
          <p className="mt-5 max-w-sm text-[15px] leading-7 text-secondary">
            What people in Bangalore usually ask before hiring a freelance developer.
          </p>
        </div>
        <div className="border-t border-border">
          {FAQ.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} className="border-b border-border">
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-start justify-between gap-6 py-6 text-left"
                  >
                    <span className={`font-display text-lg leading-snug transition-colors sm:text-xl ${isOpen ? "text-accent" : "text-primary"}`}>
                      {f.q}
                    </span>
                    <Plus
                      size={20}
                      className={`mt-1 shrink-0 text-accent transition-transform duration-500 ${isOpen ? "rotate-[135deg]" : ""}`}
                    />
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-2xl pb-6 text-[15px] leading-7 text-secondary">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
