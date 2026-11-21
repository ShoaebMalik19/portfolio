import type { Metadata } from "next";
import { Cormorant_Garamond, Inter, Mrs_Saint_Delafield, Space_Grotesk } from "next/font/google";
import { ThemeProvider } from "@/components/providers";
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

export const metadata: Metadata = {
  metadataBase: new URL("https://shoaebmalik.in"),
  title: "Mohammed Shoaeb Malik | AI, Blockchain & Full-Stack Developer",
  description:
    "Portfolio of Mohammed Shoaeb Malik showcasing AI systems, blockchain products, full-stack applications, hackathon achievements, and software engineering projects.",
  keywords: [
    "Mohammed Shoaeb Malik",
    "Shoaeb Malik",
    "Mohammed Shoaeb Malik Portfolio",
    "Shoaeb Malik Developer",
    "Shoaeb Malik AI Developer",
    "Shoaeb Malik Blockchain Developer",
    "Shoaeb Malik Full Stack Developer"
  ],
  authors: [{ name: "Mohammed Shoaeb Malik" }],
  creator: "Mohammed Shoaeb Malik",
  alternates: {
    canonical: "https://shoaebmalik.in"
  },
  openGraph: {
    title: "Mohammed Shoaeb Malik | AI, Blockchain & Full-Stack Developer",
    description:
      "Portfolio of Mohammed Shoaeb Malik showcasing AI systems, blockchain products, full-stack applications, hackathon achievements, and software engineering projects.",
    url: "https://shoaebmalik.in",
    siteName: "Mohammed Shoaeb Malik Portfolio",
    type: "website",
    images: [
      {
        url: "/malik-black-suit (2).jpeg",
        width: 1182,
        height: 1040,
        alt: "Mohammed Shoaeb Malik in a black suit"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohammed Shoaeb Malik | AI, Blockchain & Full-Stack Developer",
    description:
      "Portfolio of Mohammed Shoaeb Malik showcasing AI systems, blockchain products, full-stack applications, hackathon achievements, and software engineering projects.",
    images: ["/malik-black-suit (2).jpeg"]
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${grotesk.variable} ${serif.variable} ${script.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Mohammed Shoaeb Malik",
              url: "https://shoaebmalik.in",
              sameAs: ["https://github.com/ShoaebMalik19", "https://t.me/SHOAEB19", "https://x.com/malik_shoa44572"],
              jobTitle: "Software Developer",
              worksFor: {
                "@type": "Organization",
                name: "Independent Developer"
              }
            })
          }}
        />
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} forcedTheme="dark">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
