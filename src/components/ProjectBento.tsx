"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import { projects, type Project } from "@/data/projects";

/*
  Every project visible at once in a bento grid, no scroll-jacking.
  Filter tabs re-flow the grid with shared-layout animation.
  The first project in the current filter gets the big tile.
*/

const TAGS: Record<string, string[]> = {
  Synapse: ["ai", "chain"],
  "PayShard Wallet": ["chain"],
  TruthStamp: ["chain"],
  "Proof.Market": ["chain"],
  "AI-FI Platform": ["web"],
  LakshyaAI: ["ai"],
  "Feedback Analyzer": ["ai"],
  "Crime Detector": ["ai"],
  "Trading RAG": ["ai"]
};

const FILTERS = [
  { key: "all", label: "All" },
  { key: "live", label: "Live demos" },
  { key: "ai", label: "AI" },
  { key: "chain", label: "Blockchain" }
] as const;

type FilterKey = (typeof FILTERS)[number]["key"];

function matches(p: Project, f: FilterKey) {
  if (f === "all") return true;
  if (f === "live") return Boolean(p.demo);
  return (TAGS[p.name] ?? []).includes(f);
}

export function ProjectBento() {
  const [filter, setFilter] = useState<FilterKey>("all");
  const list = useMemo(() => projects.filter((p) => matches(p, filter)), [filter]);

  return (
    <LayoutGroup>
      <div role="tablist" aria-label="Filter projects" className="mb-8 flex flex-wrap items-center gap-2">
        {FILTERS.map((f) => {
          const count = projects.filter((p) => matches(p, f.key)).length;
          const on = f.key === filter;
          return (
            <button
              key={f.key}
              role="tab"
              type="button"
              aria-selected={on}
              onClick={() => setFilter(f.key)}
              className={`relative rounded-full px-4 py-2 font-display text-[11px] uppercase tracking-[0.2em] transition-colors ${
                on ? "text-background" : "text-secondary hover:text-primary"
              }`}
            >
              {on && (
                <motion.span
                  layoutId="bento-pill"
                  className="absolute inset-0 rounded-full bg-primary"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                />
              )}
              <span className="relative">
                {f.label} <span className={on ? "text-background/60" : "text-secondary/50"}>{count}</span>
              </span>
            </button>
          );
        })}
      </div>

      <motion.ul layout className="grid grid-flow-dense grid-cols-12 gap-4">
        <AnimatePresence mode="popLayout" initial={false}>
          {list.map((p, i) => (
            <BentoTile key={p.name} project={p} big={i === 0} />
          ))}
        </AnimatePresence>
      </motion.ul>
    </LayoutGroup>
  );
}

function BentoTile({ project: p, big }: { project: Project; big: boolean }) {
  return (
    <motion.li
      layout
      initial={{ opacity: 0, scale: 0.92, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
      transition={{ type: "spring", stiffness: 260, damping: 30 }}
      className={big ? "col-span-12 row-span-2 xl:col-span-6" : "col-span-6 xl:col-span-3"}
    >
      <article className="spot group card-premium flex h-full flex-col overflow-hidden border border-border bg-card transition-colors duration-300 hover:border-accent/50">
        <div className={`relative shrink-0 overflow-hidden border-b border-border ${big ? "h-[300px] xl:h-[500px]" : "h-[150px]"}`}>
          {p.image ? (
            <Image
              src={p.image}
              alt={`${p.name} screen`}
              fill
              sizes={big ? "(min-width:1280px) 640px, 100vw" : "(min-width:1280px) 320px, 50vw"}
              className="object-cover object-top opacity-80 transition duration-700 group-hover:scale-[1.06] group-hover:opacity-100"
            />
          ) : (
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(215,199,170,0.14),transparent_60%),linear-gradient(135deg,#0d0f14,#15161a)]">
              <span className={`absolute left-4 top-10 font-serif italic leading-none text-accent/25 ${big ? "text-7xl" : "text-4xl"}`}>
                {p.name}
              </span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
          {p.demo && (
            <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1 font-display text-[9px] uppercase tracking-[0.2em] text-emerald-300 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Live
            </span>
          )}
          {p.context && (
            <span className="absolute bottom-3 left-4 max-w-[90%] truncate rounded-full border border-accent/40 bg-black/55 px-3 py-1 font-display text-[9px] uppercase tracking-[0.2em] text-accent backdrop-blur-md">
              {p.context}
            </span>
          )}
        </div>

        <div className="flex flex-1 flex-col p-5">
          <h3 className={`font-display font-semibold leading-tight text-primary transition-colors group-hover:text-accent ${big ? "text-3xl" : "text-lg"}`}>
            {p.name}
          </h3>
          <p className={`mt-2 text-sm leading-6 text-secondary ${big ? "" : "line-clamp-2"}`}>{p.description}</p>
          <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.14em] text-accent/75">{p.techStack}</p>

          <div className="mt-auto flex flex-wrap items-center gap-2 pt-5">
            {p.demo ? (
              <a
                href={p.demo}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 bg-primary px-3.5 py-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-background transition hover:bg-accent"
              >
                {p.demoLabel || "Live Demo"} <ArrowUpRight size={12} />
              </a>
            ) : p.demoLabel ? (
              <span className="inline-flex items-center bg-primary/15 px-3.5 py-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-primary/80">
                {p.demoLabel}
              </span>
            ) : null}
            {p.github ? (
              <a
                href={p.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 border border-border px-3.5 py-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-primary transition hover:border-accent hover:text-accent"
              >
                <Github size={12} /> {p.githubLabel || "GitHub"}
              </a>
            ) : null}
          </div>
        </div>
      </article>
    </motion.li>
  );
}
