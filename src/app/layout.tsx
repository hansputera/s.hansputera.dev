import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Free Shortener URL service",
  description: "Non-Profit Shortener URL service using Next.js + TailwindCSS + Firebase",
  creator: "Hanif Dwy Putra S",
  publisher: "Hanif Dwy Putra S",
  authors: {
    name: "Hanif Dwy Putra S",
    url: "https://hansputera.dev",
  },
  appLinks: {
    web: [{
      url: "https://hansputera.dev",
    }, {
      url: "https://s.hansputera.dev",
    }, {
      url: "https://github.com/hansputera/s.hansputera.dev"
    }],
  },
  referrer: 'same-origin',
  category: 'Web Development',
  keywords: ['Next.js', 'TailwindCSS', 'Firebase', 'Shortener URL', 'Non-Profit', 'Open Source', 'Free', 'URL', 'GitHub', 'Selfhost shortener url'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
