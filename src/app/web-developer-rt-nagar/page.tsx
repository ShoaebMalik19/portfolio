import type { Metadata } from "next";
import { LandingPage, type LandingContent } from "@/components/LandingPage";
import { NORTH_AREAS } from "@/data/areas";

const PATH = "/web-developer-rt-nagar";
const TITLE = "Website Developer in RT Nagar, Bangalore | Freelance | Shoaeb Malik";
const DESCRIPTION =
  "Freelance website and web app developer for RT Nagar, Hebbal and north Bangalore. Mohammed Shoaeb Malik builds fast, SEO-ready websites and AI features for local businesses.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: { title: TITLE, description: DESCRIPTION, url: PATH, type: "website", locale: "en_IN" },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION }
};

const content: LandingContent = {
  path: PATH,
  eyebrow: "RT Nagar · North Bangalore",
  h1: "Website developer",
  h1Accent: "in RT Nagar",
  intro: [
    "I'm Mohammed Shoaeb Malik, a freelance web and AI developer in north Bengaluru. I study at REVA University in north Bangalore, so RT Nagar, Hebbal, Sanjaynagar and Yelahanka are close by when it's easier to sit down and talk through a project.",
    "Shops, clinics, tutors, service businesses and startups in RT Nagar get the same work my other clients get: a fast, mobile-first website built to be found on Google, and features like enquiry forms, WhatsApp buttons or an AI chatbot when they help."
  ],
  areasTitle: "North Bangalore",
  areasNote: "Close to RT Nagar and easy to meet in person. I also work with clients across the rest of Bengaluru.",
  areas: NORTH_AREAS,
  services: [
    { title: "A website for your local business", body: "So people searching nearby find you, see what you offer and contact you in one tap." },
    { title: "Redesign an old website", body: "Make a slow or outdated site fast, mobile-friendly and easy to update." },
    { title: "Online bookings & enquiries", body: "Forms, WhatsApp hand-offs and simple dashboards so you never miss a customer." },
    { title: "AI features", body: "A chatbot that answers customer questions from your own information." }
  ],
  faq: [
    {
      q: "Is there a web developer near RT Nagar I can meet in person?",
      a: "Yes. I'm in north Bengaluru and can meet clients in and around RT Nagar, Hebbal and Sanjaynagar. Message me on WhatsApp to set a time."
    },
    {
      q: "What do I need to get started?",
      a: "Just tell me what your business does and what you want the website to do. I'll suggest a structure, and you send me your logo, photos and details when you have them."
    },
    {
      q: "Will the website work well on phones?",
      a: "Yes. Most local customers search on their phones, so every site I build is designed for mobile first and tested at phone sizes."
    }
  ]
};

export default function Page() {
  return <LandingPage c={content} />;
}
