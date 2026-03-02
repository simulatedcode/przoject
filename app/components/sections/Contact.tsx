"use client";

import React, { useState, useRef, useEffect } from "react";
import { ScrambleText } from "../ui/ScrambleText";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function Contact() {
    const [scrambleTitle, setScrambleTitle] = useState(0);
    const [scrambleInquiry, setScrambleInquiry] = useState(0);
    const sectionRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(contentRef.current, {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 90%",
                    toggleActions: "play none none reverse",
                },
                y: 30,
                opacity: 0,
                duration: 1,
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
            <div ref={contentRef} className="max-w-4xl mx-auto px-carbon-06 w-full">
                <div>
                    <div>
                        <div className="font-mono text-carbon-02 text-muted uppercase tracking-widest mb-carbon-03">
                            UPLINK_PROTOCOL
                        </div>
                        <h2 className="text-carbon-08 font-sans font-bold tracking-tight text-foreground leading-none mb-carbon-08">
                            <ScrambleText text="ESTABLISH_CONTACT" trigger={scrambleTitle} duration={0.6} />
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-carbon-10">
                            <div className="space-y-carbon-06">
                                <p className="text-carbon-05 font-sans leading-relaxed text-muted max-w-sm">
                                    Ready to initiate a data collaboration or request specific archival access. Direct inquiry recommended.
                                </p>
                                <a
                                    href="mailto:archive@riza.org"
                                    className="inline-block group"
                                    onMouseEnter={() => setScrambleInquiry(prev => prev + 1)}
                                >
                                    <div className="text-carbon-06 font-sans font-bold text-primary group-hover:text-foreground transition-colors mb-1">
                                        <ScrambleText text="INITIATE_INQUIRY" trigger={scrambleInquiry} duration={0.4} />
                                    </div>
                                    <div className="text-carbon-03 font-mono text-muted tracking-widest">archive@riza.org</div>
                                </a>
                            </div>

                            <div className="grid grid-cols-2 gap-carbon-06 font-mono text-carbon-03 tracking-widest">
                                <div className="space-y-carbon-04">
                                    <div className="text-muted/30 text-[10px] uppercase">PROJECTS</div>
                                    <ul className="space-y-carbon-02">
                                        <li><a href="#" className="text-muted hover:text-primary transition-colors">GITHUB</a></li>
                                        <li><a href="#" className="text-muted hover:text-primary transition-colors">BEHANCE</a></li>
                                        <li><a href="#" className="text-muted hover:text-primary transition-colors">DRIBBBLE</a></li>
                                    </ul>
                                </div>
                                <div className="space-y-carbon-04">
                                    <div className="text-muted/30 text-[10px] uppercase">NETWORK</div>
                                    <ul className="space-y-carbon-02">
                                        <li><a href="#" className="text-muted hover:text-primary transition-colors">LINKEDIN</a></li>
                                        <li><a href="#" className="text-muted hover:text-primary transition-colors">LAST_FM</a></li>
                                        <li><a href="#" className="text-muted hover:text-primary transition-colors">READ_CV</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-carbon-13 pt-carbon-08 border-t border-border/20 flex flex-col sm:flex-row justify-between items-center gap-carbon-06 font-mono text-[10px] text-muted/40 uppercase tracking-[0.4em]">
                        <div>© 2026 PRZOJECT_ARCHIVE // BINARY_VER_2.0</div>
                        <div className="flex gap-carbon-08">
                            <span>SECTOR: YG</span>
                            <span>LAT: -7.7956</span>
                            <span>LONG: 110.3695</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
