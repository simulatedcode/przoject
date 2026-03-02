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
                    end: "+=200%", // 2 viewports
                    scrub: true,
                    pin: contentRef.current,
                    pinSpacing: true,
                },
            });

            // Phase 1: wait 1 viewport (no visual change)
            tl.to({}, { duration: 1 });

            // Phase 2: fade in
            tl.fromTo(
                contentRef.current,
                { opacity: 0 },
                { opacity: 1, ease: "none", duration: 1 }
            );
            // Phase 3: slide wrapper up
            tl.to(wrapperRef.current, {
                y: "-100vh",
                ease: "none",
                duration: 1,
            });
        }, heroRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={heroRef} className="hero">
            {/* Sticky background */}
            <div ref={wrapperRef} className="hero_wrapper">
                <div className="helas pointer-events-none">
                    <Helas />
                </div>
            </div>

            {/* Pinned content */}
            <div
                ref={contentRef}
                className="absolute inset-0 z-10 w-full min-h-screen bg-primary pointer-events-none opacity-0"
            >
                <div className="pointer-events-auto w-full pb-carbon-13">
                    <AboutProject scrambleHeader={scrambleHeader} />
                </div>
            </div>
        </section>
    );
}