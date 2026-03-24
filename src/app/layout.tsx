import type { Metadata } from "next";
import { IBM_Plex_Sans, IBM_Plex_Mono, Doto } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import CanvasRoot from "@/components/webgl/CanvasRoot";
import LenisProvider from "@/components/dom/LenisProvider";
import CustomCursor from "@/components/ui/CustomCursor";

const departureMono = localFont({
  src: '../../public/fonts/DepartureMono-Regular.woff',
  variable: '--font-departure',
});

const plexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700'],
  variable: '--font-sans'
})
const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-mono'
})
const doto = Doto({
  subsets: ['latin'],
  variable: '--font-doto'
})

export const metadata: Metadata = {
  title: "Przoject",
  description: "Speculative Future Memories",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${plexSans.variable} ${plexMono.variable} ${doto.variable} ${departureMono.variable} antialiased`}
      >
        <CanvasRoot />
        <CustomCursor />
        <LenisProvider>
          <div className="relative w-full mx-auto min-h-screen inset-0">
            {children}
          </div>
        </LenisProvider>
      </body>
    </html>
  );
}
