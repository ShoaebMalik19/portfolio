import type { Metadata } from "next";
import { LandingPage, type LandingContent } from "@/components/LandingPage";
import { ALL_AREAS } from "@/data/areas";

const PATH = "/freelance-web-developer-bangalore";
const TITLE = "Freelance Web Developer in Bangalore | Websites, Web Apps & AI | Shoaeb Malik";
const DESCRIPTION =
  "Hire Mohammed Shoaeb Malik, a freelance web developer in Bangalore (Bengaluru) for fast, SEO-ready business websites, Next.js web apps and AI chatbots. Three live client sites and three hackathon wins.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: { title: TITLE, description: DESCRIPTION, url: PATH, type: "website", locale: "en_IN" },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION }
};

const content: LandingContent = {
  path: PATH,
  eyebrow: "Bengaluru · taking freelance projects",
  h1: "Freelance web developer",
  h1Accent: "in Bangalore",
  intro: [
    "I'm Mohammed Shoaeb Malik, a full-stack web and AI developer based in Bengaluru. I build websites and web apps for Bangalore businesses and founders, and I fix products that other people started but couldn't finish.",
    "My client work is live today: the ExpressLink Logistics website, the Fhoneify phone resale platform and Digital Goggle. I've also won three hackathons, including Decode SIH organised by OSCode, where I handled the AI integration."
  ],
  areasTitle: "Across Bangalore",
  areasNote:
    "I work with clients all over Bengaluru, in person when it helps and remotely the rest of the time, and with clients anywhere in India.",
  areas: ALL_AREAS,
  services: [
    { title: "Business websites", body: "Fast, mobile-first websites with clean SEO so local customers can find you on Google." },
    { title: "Web apps & SaaS", body: "Full-stack Next.js, React and Supabase apps, from the first version to launch." },
    { title: "AI chatbots & integration", body: "Chatbots and RAG search grounded in your own documents, built into your site or product." },
    { title: "Fix or finish an existing app", body: "Take over a broken or half-built project and make it work end to end, like Fhoneify." },
    { title: "Blockchain apps", body: "Smart-contract apps, wallets and on-chain verification, like the award-winning Proof.Market." }
  ],
  faq: [
    {
      q: "How do I hire a freelance web developer in Bangalore?",
      a: "Tap Begin a project to message me on WhatsApp, or email me with what you want to build. I'll reply with questions, a plan and next steps."
    },
    {
      q: "Do you only work with businesses in Bangalore?",
      a: "No. I'm based in Bengaluru and happy to meet clients around the city, but I also work remotely with clients anywhere in India."
    },
    {
      q: "Can you build a website that ranks on Google?",
      a: "I build every site with fast loading, mobile-first layouts, proper page titles, structured data and a sitemap, which are the technical foundations Google needs to index and rank a site."
    },
    {
      q: "What technologies do you use?",
      a: "Mostly Next.js, React, TypeScript, Tailwind CSS and Supabase for the web, Python and Django for backends and AI work, and LLM APIs for chatbots and RAG."
    }
  ]
};

export default function Page() {
  return <LandingPage c={content} />;
}
