"use client";

import { useState } from "react";
import Hero from "./features/hero/Hero";
import Intro from "./features/intro/Intro";
import Works from "./features/works/Works";
import PinSpacer from "./components/PinSpacer";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <main className="relative w-full">
      {!isLoaded && <Intro onComplete={() => setIsLoaded(true)} />}

      {/* Background Cinematic Scene */}
      <div id="hero-wrapper" className="fixed inset-0 flex flex-col items-center justify-center pointer-events-none z-0">
        <Hero isLoaded={isLoaded} />
      </div>

      {/* Scrollable Content Layers */}
      <div className="relative z-10">
        {/* Spacer for Hero Intro Section - Scoped trigger for 3D Camera Path */}
        <section id="hero-trigger" className="h-[200vh] pointer-events-none" />

        {/* Strategic "Hold" phase before section transition */}
        <PinSpacer />

        {/* Works Section appears as we scroll */}
        <Works />
      </div>
    </main>
  );
}
