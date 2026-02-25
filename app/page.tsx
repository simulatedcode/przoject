"use client";

import { useState, useRef } from "react";
import Hero from "./features/hero/Hero";
import { ScrambleText } from "./components/ScrambleText";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Parallax fade effect on scroll for the text wrapper
    gsap.to(textRef.current, {
      opacity: 0,
      y: -150,
      scale: 0.9,
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: document.documentElement,
        start: "top top",
        end: "bottom bottom",
        scrub: 2, // Heavy, buttery smooth lag
      },
    });
  });

  return (
    <main className="relative w-full h-[300vh]">
      <div className="fixed inset-0 flex flex-col items-center justify-center pointer-events-none">
        <Hero isLoaded={isLoaded} />
        <div ref={textRef} className="text-center">
          <h1 className="text-xl font-mono uppercase tracking-[0.6em] mix-blend-difference text-white">
            <ScrambleText
              text="Przoject 840313RZ"
              duration={1500}
              delay={100}
              onComplete={() => setIsLoaded(true)}
            />
          </h1>
        </div>
      </div>
    </main>
  );
}
