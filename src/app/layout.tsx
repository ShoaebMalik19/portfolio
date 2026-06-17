import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://shoaebmalik.in"),
  title: "shoaebmalik.in | Mohammed Shoaeb Malik",
  description:
    "The personal brand and premium founder portfolio of Mohammed Shoaeb Malik, building products across AI, blockchain, and full-stack systems.",
  keywords: [
    "Mohammed Shoaeb Malik",
    "AI products",
    "blockchain",
    "full-stack developer",
    "product builder",
    "Bengaluru"
  ],
  authors: [{ name: "Mohammed Shoaeb Malik" }],
  creator: "Mohammed Shoaeb Malik",
  openGraph: {
    title: "shoaebmalik.in | Mohammed Shoaeb Malik",
    description:
      "Building products across AI, blockchain, and full-stack systems.",
    type: "website",
    images: [
      {
        url: "/malik-black-suit (2).jpeg",
        width: 1182,
        height: 1040,
        alt: "Mohammed Shoaeb Malik in a black suit"
      }
    ]
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
