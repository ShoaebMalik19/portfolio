import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Mohammed Shoaeb Malik",
              url: "https://shoaebmalik.in",
              sameAs: ["https://github.com/ShoaebMalik19"],
              jobTitle: "Software Developer",
              worksFor: {
                "@type": "Organization",
                name: "Independent Developer"
              }
            })
          }}
        />
        {children}
      </body>
    </html>
  );
}
