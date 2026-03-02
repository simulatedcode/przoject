import type { Metadata } from "next";
import { IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { ScanLine } from "./components/ui/ScanLine";
import { SmoothScroll } from "./components/ui/SmoothScroll";

const ibmPlexSans = IBM_Plex_Sans({
  variable: "--font-ibm-plex-sans",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Archival System | PRZOJECT",
  description: "Dystopian data persistence and architectural archive.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${ibmPlexSans.variable} ${ibmPlexMono.variable} antialiased relative selection:bg-primary/30 selection:text-primary`}>
        <div className="grain-overlay vignette" aria-hidden="true" />
        <ScanLine />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
