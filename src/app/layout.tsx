import type { Metadata } from "next";
import { Cormorant_Garamond, Inter, Mrs_Saint_Delafield, Space_Grotesk } from "next/font/google";
import { ThemeProvider } from "@/components/providers";
import { FAQ } from "@/data/faq";
import { ALL_AREAS } from "@/data/areas";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const grotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-grotesk", display: "swap" });
const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap"
});
const script = Mrs_Saint_Delafield({ subsets: ["latin"], weight: "400", variable: "--font-script", display: "swap" });

const SITE = "https://www.shoaebmalik.in";
const TITLE = "Mohammed Shoaeb Malik | Freelance Web & AI Developer in Bangalore";
const DESCRIPTION =
  "Mohammed Shoaeb Malik is a freelance full-stack web and AI developer in Bangalore (Bengaluru). 3x hackathon winner building fast, SEO-ready websites, Next.js web apps, AI chatbots and blockchain apps for businesses and founders.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: TITLE,
  description: DESCRIPTION,
  applicationName: "Mohammed Shoaeb Malik",
  keywords: [
    "freelance web developer in Bangalore",
    "freelance web developer Bengaluru",
    "freelance full stack developer Bangalore",
    "website developer in Bangalore",
    "web developer for small business Bangalore",
    "website developer RT Nagar",
    "web developer RT Nagar Bangalore",
    "web developer Hebbal",
    "website developer north Bangalore",
    "AI developer Bangalore",
    "AI chatbot developer Bangalore",
    "Next.js developer Bangalore",
    "React developer Bangalore",
    "hire freelance developer Bangalore",
    "blockchain developer Bangalore",
    "Mohammed Shoaeb Malik",
    "Shoaeb Malik",
    "Shoaeb Malik developer",
    "Shoaeb Malik portfolio"
  ],
  authors: [{ name: "Mohammed Shoaeb Malik", url: SITE }],
  creator: "Mohammed Shoaeb Malik",
  publisher: "Mohammed Shoaeb Malik",
  category: "technology",
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 }
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE,
    siteName: "Mohammed Shoaeb Malik",
    locale: "en_IN",
    type: "profile",
    firstName: "Mohammed Shoaeb",
    lastName: "Malik",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    creator: "@malik_shoa44572"
  },
  other: {
    "geo.region": "IN-KA",
    "geo.placename": "Bengaluru"
  }
};

const PERSON_ID = `${SITE}/#person`;
const ADDRESS = { "@type": "PostalAddress", addressLocality: "Bengaluru", addressRegion: "Karnataka", addressCountry: "IN" };
const STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": PERSON_ID,
      name: "Mohammed Shoaeb Malik",
      alternateName: ["Shoaeb Malik", "MD Shoaeb Malik"],
      url: SITE,
      image: `${SITE}/portrait/shoaeb-photo.webp`,
      jobTitle: "Freelance Full-Stack Web & AI Developer",
      description: DESCRIPTION,
      address: ADDRESS,
      alumniOf: { "@type": "CollegeOrUniversity", name: "REVA University" },
      knowsAbout: [
        "Web development", "Next.js", "React", "TypeScript", "Python", "Django", "Supabase",
        "AI integration", "Chatbots", "Retrieval-augmented generation", "Blockchain", "Smart contracts", "SEO"
      ],
      award: [
        "Winner, Decode SIH (organised by OSCode)",
        "Winner, DevTrack HackSprint",
        "Winner, Katha Hackathon"
      ],
      sameAs: ["https://github.com/ShoaebMalik19", "https://t.me/SHOAEB19", "https://x.com/malik_shoa44572"]
    },
    {
      "@type": "ProfessionalService",
      "@id": `${SITE}/#service`,
      name: "Mohammed Shoaeb Malik: Freelance Web & AI Development",
      url: SITE,
      image: `${SITE}/portrait/shoaeb-photo.webp`,
      description:
        "Freelance web and AI development in Bangalore: business websites, full-stack web apps, AI chatbots and integrations, app rescue, and blockchain apps.",
      founder: { "@id": PERSON_ID },
      address: ADDRESS,
      areaServed: [
        { "@type": "City", name: "Bengaluru" },
        ...ALL_AREAS.map((a) => ({ "@type": "Place", name: `${a}, Bengaluru` })),
        { "@type": "Country", name: "India" }
      ],
      serviceType: [
        "Freelance web development", "Website design and development", "Web application development",
        "AI chatbot development", "AI integration", "Blockchain development"
      ]
    },
    {
      "@type": "WebSite",
      "@id": `${SITE}/#website`,
      url: SITE,
      name: "Mohammed Shoaeb Malik",
      inLanguage: "en-IN",
      publisher: { "@id": PERSON_ID }
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE}/#faq`,
      mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } }))
    }
  ]
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-IN"
      suppressHydrationWarning
      className={`${inter.variable} ${grotesk.variable} ${serif.variable} ${script.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(STRUCTURED_DATA) }}
        />
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} forcedTheme="dark">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
