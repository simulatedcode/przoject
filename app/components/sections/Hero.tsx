"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { AboutProject } from "../features/AboutProject";
import { Helas } from "../features/Helas";

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const [scrambleHeader, setScrambleHeader] = useState(0);

  const heroRef = useRef<HTMLElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!heroRef.current || !wrapperRef.current || !contentRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "+=300%", // Total scroll distance (300dvh total - 100dvh visible)
          scrub: true,
          pin: contentRef.current,
          pinSpacing: true,
        },
      });

      // phase 1 — idle
      tl.to({}, { duration: 1.5 });

      // phase 2 — reveal
      tl.fromTo(
        contentRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.5, ease: "none" }
      );

      // phase 3 — exit
      tl.to(contentRef.current, {
        yPercent: -100,
        duration: 2,
        ease: "none",
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="hero inset-0">
      {/* Sticky background */}
      <div ref={wrapperRef} className="hero_wrapper z-100">
        <div className="helas pointer-events-none">
          <Helas />
        </div>
      </div>

      {/* Pinned content */}
      <div
        ref={contentRef}
        className="absolute inset-0 z-10 w-full min-h-dvh bg-project-200 backdrop-blur-sm pointer-events-none opacity-0 mix-blend-screen"
      >
        <div className="pointer-events-auto z-10 pb-carbon-05">
          <AboutProject scrambleHeader={scrambleHeader} />
        </div>
      </div>
    </section>
  );
}
