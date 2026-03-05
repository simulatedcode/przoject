"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrambleText } from "./ScrambleText";

interface IntroLoaderProps {
    onComplete: () => void;
}

export function IntroLoader({ onComplete }: IntroLoaderProps) {
    const loaderRef = useRef<HTMLDivElement>(null);
    const progressBarRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    const progressValue = useRef({ value: 0 });

    const [progress, setProgress] = useState(0);

    const phases = [
        "ESTABLISHING_CONNECTION...",
        "DECRYPTING_ASSETS...",
        "INITIALIZING_ENVIRONMENT...",
        "SYSTEM_READY",
    ];

    const getPhase = (p: number) => {
        if (p < 30) return 0;
        if (p < 60) return 1;
        if (p < 100) return 2;
        return 3;
    };

    useEffect(() => {
        document.body.style.overflow = "hidden";

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                onComplete: playExitAnimation,
            });

            tl.to(progressValue.current, {
                value: 100,
                duration: 3.2,
                ease: "power2.out",
                onUpdate: () => {
                    const p = Math.floor(progressValue.current.value);
                    setProgress(p);

                    if (progressBarRef.current) {
                        progressBarRef.current.style.width = `${p}%`;
                    }
                },
            });
        }, loaderRef);

        return () => {
            ctx.revert();
            document.body.style.overflow = "auto";
        };
    }, []);

    const playExitAnimation = () => {
        if (!loaderRef.current) return;

        const tl = gsap.timeline({
            onComplete: () => {
                document.body.style.overflow = "auto";
                onComplete();
            },
        });

        tl.to(textRef.current, {
            y: -20,
            opacity: 0,
            duration: 0.4,
            ease: "power2.out",
        })
            .to(
                progressBarRef.current,
                {
                    scaleX: 0,
                    transformOrigin: "right",
                    duration: 0.4,
                    ease: "power3.inOut",
                },
                "-=0.2"
            )
            .to(loaderRef.current, {
                yPercent: -100,
                duration: 0.9,
                ease: "power3.inOut",
            });
    };

    const phase = getPhase(progress);

    return (
        <div
            ref={loaderRef}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-background text-primary font-mono select-none"
        >
            <div className="w-full max-w-md px-8 flex flex-col gap-8">

                {/* Terminal Text */}
                <div ref={textRef} className="flex flex-col gap-2">
                    <div className="text-xs tracking-widest text-muted/50">
                        SEQUENCE_INITIATION
                    </div>

                    <div className="text-sm tracking-widest text-secondary h-6">
                        <ScrambleText
                            text={phases[phase]}
                            trigger={phase}
                            duration={0.6}
                            scrambleSpeed={30}
                        />
                    </div>
                </div>

                {/* Progress */}
                <div className="flex flex-col gap-2">

                    <div className="flex justify-between text-xs tracking-widest">
                        <span className="text-muted">MEMORY_ALLOCATION</span>
                        <span className="text-primary">{progress}%</span>
                    </div>

                    <div className="h-[2px] w-full bg-surface/30 overflow-hidden">

                        <div
                            ref={progressBarRef}
                            className="h-full bg-primary"
                            style={{ width: "0%" }}
                        />

                    </div>
                </div>
            </div>
        </div>
    );
}