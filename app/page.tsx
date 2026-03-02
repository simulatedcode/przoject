"use client";

import { useRef, useEffect } from "react";
import { Hero } from "./components/sections/Hero";
import { Artist } from "./components/sections/Artist";
import { HistoryPreview } from "./components/sections/HistoryPreview";
import { Expertise } from "./components/sections/Expertise";
import { Contact } from "./components/sections/Contact";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // ScrollTrigger configuration for sections (if any)
    gsap.to(containerRef.current, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      },
    });
  }, []);

  return (
    <main ref={containerRef} className="flex min-h-screen flex-col bg-background selection:bg-primary/20 selection:text-primary overflow-x-hidden">
      <Hero />
      <Artist />
      <HistoryPreview />
      <Expertise />
      <Contact />
    </main>
  );
}
