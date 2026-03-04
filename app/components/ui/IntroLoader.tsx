"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrambleText } from "./ScrambleText";

interface IntroLoaderProps {
    onComplete: () => void;
}

export function IntroLoader({ onComplete }: IntroLoaderProps) {
    const loaderRef = useRef<HTMLDivElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    const [progress, setProgress] = useState(0);
    const [phase, setPhase] = useState(0);

    const phases = [
        "ESTABLISHING_CONNECTION...",
        "DECRYPTING_ASSETS...",
        "INITIALIZING_ENVIRONMENT...",
        "SYSTEM_READY"
    ];

    useEffect(() => {
        // Prevent body scrolling while loading
        document.body.style.overflow = "hidden";

        // Simulated fake loading progress
        let currentProgress = 0;
        const progressInterval = setInterval(() => {
            currentProgress += Math.random() * 15;

            if (currentProgress >= 100) {
                currentProgress = 100;
                clearInterval(progressInterval);
                setPhase(3); // SYSTEM_READY

                // Trigger exit animation
                setTimeout(() => {
                    playExitAnimation();
                }, 800);
            } else if (currentProgress > 60) {
                setPhase(2);
            } else if (currentProgress > 30) {
                setPhase(1);
            }

            setProgress(Math.floor(currentProgress));
        }, 300);

        return () => {
            clearInterval(progressInterval);
            document.body.style.overflow = "auto";
        };
    }, []);

    const playExitAnimation = () => {
        if (!loaderRef.current || !progressRef.current || !textRef.current) return;

        const tl = gsap.timeline({
            onComplete: () => {
                document.body.style.overflow = "auto";
                onComplete();
            }
        });

        tl.to(textRef.current, {
            y: -20,
            opacity: 0,
            duration: 0.4,
            ease: "sine.inOut"
        })
            .to(progressRef.current, {
                scaleX: 0,
                transformOrigin: "right",
                duration: 0.5,
                ease: "power3.inOut"
            }, "-=0.2")
            .to(loaderRef.current, {
                yPercent: -100,
                duration: 0.8,
                ease: "power3.inOut" // Equivalent to an expressive exit
            }, "+=0.1");
    };

    return (
        <div
            ref={loaderRef}
            className="relative w-full min-h-dvh mx-auto flex flex-col items-center justify-center bg-background text-primary font-mono select-none"
        >
            <div className="w-full max-w-md px-8 flex flex-col gap-8">
                {/* Text Scramble Readout */}
                <div ref={textRef} className="flex flex-col gap-2">
                    <div className="text-xs tracking-widest text-muted/50">SEQUENCE_INITIATION</div>
                    <div className="text-sm tracking-widest text-secondary h-6">
                        <ScrambleText
                            text={phases[phase]}
                            trigger={phase} // Retrigger scramble on phase change
                            duration={0.6}
                            scrambleSpeed={30}
                        />
                    </div>
                </div>

                {/* Progress Bar & Percentage */}
                <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-end text-xs tracking-widest">
                        <span className="text-muted">MEMORY_ALLOCATION</span>
                        <span className="text-primary">{progress}%</span>
                    </div>
                    <div className="h-[2px] w-full bg-surface/30 relative overflow-hidden">
                        <div
                            ref={progressRef}
                            className="absolute top-0 left-0 h-full bg-primary"
                            style={{ width: `${progress}%`, transition: 'width 0.3s ease-out' }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
