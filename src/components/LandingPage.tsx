import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, ArrowUpRight, MapPin, Trophy } from "lucide-react";
import { clientWork, wins } from "@/data/profile";
import { LANDING_PAGES, SITE } from "@/data/areas";

/*
  Server-rendered landing page for local searches. Plain, fast HTML with the
  same look as the home page; every claim points at real, linked work.
*/

export type LandingContent = {
  path: string;
  eyebrow: string;
  h1: string;
  h1Accent: string;
  intro: string[];
  areasTitle: string;
  areas: string[];
  areasNote: string;
  services: { title: string; body: string }[];
  faq: { q: string; a: string }[];
};

const WHATSAPP = "/go/whatsapp?t=project";

export function LandingPage({ c }: { c: LandingContent }) {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
          { "@type": "ListItem", position: 2, name: `${c.h1} ${c.h1Accent}`, item: `${SITE}${c.path}` }
        ]
      },
      {
        "@type": "Service",
        name: `${c.h1} ${c.h1Accent}`,
        url: `${SITE}${c.path}`,
        provider: { "@id": `${SITE}/#person` },
        areaServed: c.areas.map((a) => ({ "@type": "Place", name: `${a}, Bengaluru` })),
        serviceType: c.services.map((s) => s.title)
      },
      {
        "@type": "FAQPage",
        mainEntity: c.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } }))
      }
    ]
  };

  return (
    <main className="min-h-screen bg-bg-hero text-primary">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <header className="border-b border-border px-5 py-5 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <Link href="/" className="font-serif text-2xl tracking-[0.35em] text-primary">
            SHOAEB
          </Link>
          <Link href="/" className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-secondary hover:text-accent">
            <ArrowLeft size={14} /> Portfolio
          </Link>
        </div>
      </header>

      <section className="px-5 pb-16 pt-14 sm:px-8 lg:px-12 lg:pb-24 lg:pt-20">
        <div className="mx-auto max-w-6xl">
          <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.3em] text-secondary">
            <MapPin size={13} className="text-accent" /> {c.eyebrow}
          </p>
          <h1 className="mt-5 max-w-4xl font-serif text-[2.7rem] font-medium leading-[1] sm:text-6xl lg:text-7xl">
            {c.h1} <span className="italic text-accent">{c.h1Accent}</span>
          </h1>
          <div className="mt-7 max-w-2xl space-y-4 text-[16px] leading-7 text-secondary">
            {c.intro.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={WHATSAPP}
              target="_blank"
              rel="nofollow noopener noreferrer"
              className="group inline-flex items-center gap-3 rounded-full bg-primary py-1.5 pl-1.5 pr-5 text-[14px] font-medium text-background transition hover:bg-accent"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-background text-primary">
                <ArrowRight size={15} />
              </span>
              Begin a project
            </a>
            <Link
              href="/#projects"
              className="inline-flex items-center rounded-full border border-border px-5 py-[11px] text-[14px] font-medium transition hover:border-accent hover:text-accent"
            >
              See my work
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-bg-projects px-5 py-14 sm:px-8 lg:px-12 lg:py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-serif text-4xl font-medium sm:text-5xl">
            Live client <span className="italic text-accent">work</span>
          </h2>
          <ul className="mt-8 grid gap-4 md:grid-cols-3">
            {clientWork.map((r) => (
              <li key={r.org} className="overflow-hidden border border-border bg-card">
                {r.image && (
                  <div className="relative h-36 border-b border-border">
                    <Image src={r.image} alt={`${r.org} website`} fill sizes="(min-width:768px) 360px, 100vw" className="object-cover object-top" />
                  </div>
                )}
                <div className="p-5">
                  <h3 className="font-display text-lg font-semibold">{r.org}</h3>
                  <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-secondary">{r.kind}</p>
                  <p className="mt-3 text-sm leading-6 text-secondary">{r.summary}</p>
                  {r.links[0] && (
                    <a href={r.links[0].href} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-1 text-xs uppercase tracking-[0.14em] text-accent hover:text-primary">
                      {r.links[0].label} <ArrowUpRight size={12} />
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ul>
          <ul className="mt-8 grid gap-3 sm:grid-cols-3">
            {wins.map((w) => (
              <li key={w.event} className="flex items-center gap-3 border border-border bg-card px-4 py-3 text-sm">
                <Trophy size={16} className="shrink-0 text-accent" />
                <span>
                  Winner, <strong className="font-medium text-primary">{w.event}</strong>
                  {w.organiser ? <span className="text-secondary"> ({w.organiser.replace("Organised by ", "by ")})</span> : null}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-border px-5 py-14 sm:px-8 lg:px-12 lg:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2">
          <div>
            <h2 className="font-serif text-4xl font-medium sm:text-5xl">
              What I <span className="italic text-accent">build</span>
            </h2>
            <ul className="mt-8 space-y-5">
              {c.services.map((s) => (
                <li key={s.title} className="border-l-2 border-accent/40 pl-4">
                  <h3 className="font-display text-lg font-semibold">{s.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-secondary">{s.body}</p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-serif text-4xl font-medium sm:text-5xl">{c.areasTitle}</h2>
            <p className="mt-4 text-sm leading-6 text-secondary">{c.areasNote}</p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {c.areas.map((a) => (
                <li key={a} className="border border-border bg-card px-3 py-1.5 text-sm text-secondary">
                  {a}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-bg-progress px-5 py-14 sm:px-8 lg:px-12 lg:py-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-serif text-4xl font-medium sm:text-5xl">
            Common <span className="italic text-accent">questions</span>
          </h2>
          <div className="mt-8 divide-y divide-border border-y border-border">
            {c.faq.map((f) => (
              <details key={f.q} className="group py-5">
                <summary className="cursor-pointer list-none font-display text-lg text-primary marker:hidden group-open:text-accent">
                  {f.q}
                </summary>
                <p className="mt-3 text-[15px] leading-7 text-secondary">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-border px-5 py-10 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 text-sm text-secondary sm:flex-row sm:items-center sm:justify-between">
          <p>Mohammed Shoaeb Malik · Freelance web &amp; AI developer in Bengaluru</p>
          <nav className="flex flex-wrap gap-4">
            <Link href="/" className="hover:text-accent">Portfolio</Link>
            {LANDING_PAGES.filter((l) => l.href !== c.path).map((l) => (
              <Link key={l.href} href={l.href} className="hover:text-accent">
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      </footer>
    </main>
  );
}
