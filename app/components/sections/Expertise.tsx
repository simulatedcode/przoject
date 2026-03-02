"use client";

import React, { useState, useEffect, useRef } from "react";
import { ScrambleText } from "../ui/ScrambleText";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const expertise = [
    { category: "ARCHIVE_SYSTEMS", skills: ["Next.js 15", "React 19", "Server Actions", "Streaming"] },
    { category: "VISUAL_PROCESSING", skills: ["Tailwind CSS", "GSAP", "Three.js", "Shaders"] },
    { category: "CORE_ARCHITECTURE", skills: ["TypeScript", "Distributed Data", "API Design", "Security"] },
    { category: "NEURAL_INTERFACES", skills: ["UI/UX Design", "Motion Systems", "Accessibility", "Aesthetics"] },
];

export function Expertise() {
    const [scrambleTitle, setScrambleTitle] = useState(0);
    const [mounted, setMounted] = useState(false);
    const [randomWidths, setRandomWidths] = useState<number[]>([]);

    const sectionRef = useRef<HTMLElement>(null);
    const groupsRef = useRef<HTMLDivElement[]>([]);

    useEffect(() => {
        setMounted(true);
        // Generate stable random widths once on mount
        setRandomWidths([...Array(4)].map(() => 60 + Math.random() * 30));

        const ctx = gsap.context(() => {
            gsap.from(groupsRef.current, {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                    toggleActions: "play none none reverse",
                },
                y: 30,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: "power2.out",
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="min-h-screen flex flex-col justify-center py-carbon-13 border-b border-border/30 px-carbon-06"
            onMouseEnter={() => setScrambleTitle(prev => prev + 1)}
        >
            <div className="max-w-4xl mx-auto">
                <div className="mb-carbon-10">
                    <div className="font-mono text-carbon-02 text-muted uppercase tracking-widest mb-carbon-03">
                        CAPABILITY_MATRIX
                    </div>
                    <h2 className="text-carbon-08 font-sans font-bold tracking-tight text-foreground leading-none">
                        <ScrambleText text="EXPERT_SYSTEMS" trigger={scrambleTitle} duration={0.6} />
                    </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-carbon-08">
                    {expertise.map((group, i) => (
                        <div
                            key={i}
                            ref={el => { if (el) groupsRef.current[i] = el; }}
                            className="space-y-carbon-06"
                        >
                            <h3 className="font-mono text-carbon-03 text-primary uppercase tracking-[0.2em] border-b border-primary/20 pb-carbon-02">
                                {group.category}
                            </h3>
                            <ul className="space-y-carbon-03">
                                {group.skills.map((skill, si) => (
                                    <li key={si} className="group flex items-center gap-carbon-03 text-carbon-04 font-sans text-muted hover:text-foreground transition-colors cursor-default">
                                        <span className="w-1 h-1 bg-secondary/50 group-hover:bg-primary group-hover:scale-125 transition-all"></span>
                                        {skill}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="mt-carbon-12 grid grid-cols-2 md:grid-cols-4 gap-carbon-04 opacity-20">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="h-2 bg-border/30 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-primary/50 transition-all duration-1000 ease-out"
                                style={{ width: mounted ? `${randomWidths[i]}%` : "0%" }}
                            ></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
