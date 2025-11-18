import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { Toaster } from "@/components/ui/sonner";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kto dla kogo?",
  description: "Wylosuj osobę, której zrobisz prezent",
  category: "website",
  keywords: [
    "patryk makarewicz",
    "makadev",
    "prezent",
    "prezenty",
    "losowanie",
    "losowanie prezentu",
  ],
  authors: [
    { name: "Patryk Makarewicz" },
    {
      name: "Patryk Makarewicz",
      url: "https://www.linkedin.com/in/patryk-makarewicz/",
    },
  ],
  openGraph: {
    title: "Kto dla kogo?",
    description: "Wylosuj osobę, której zrobisz prezent",
    images: ["/cover.png"],
    url: "https://kto-dla-kogo.vercel.app",
    siteName: "Kto dla kogo?",
  },
  metadataBase: new URL("https://kto-dla-kogo.vercel.app"),
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
