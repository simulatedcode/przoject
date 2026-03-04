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

            // Phase 1: Wait (Exactly 100vh of scroll travel)
            // Background is pinned, no visual change to content
            tl.to({}, { duration: 0.2 });

            // Phase 2: Reveal (Fade content in over 100vh)
            tl.fromTo(contentRef.current, {
                opacity: 0,
                ease: "power1.out",
                duration: 1,
            }, {
                opacity: 1,
                ease: "none",
                duration: 1.8,
            });

            // Phase 3: Transition out happens naturally as the pin ends 
            // after the 200% scroll travel. The 300dvh height ensures 
            // there is 100vh of 'natural' scroll to the Artist section.

            tl.to(contentRef.current, {
                yPercent: -100,
                ease: "none",
                duration: 1,
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
                <div className="pointer-events-auto z-10">
                    <AboutProject scrambleHeader={scrambleHeader} />
                </div>
            </div>
        </section>
    );
}