"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrambleText } from "../../components/ScrambleText";

interface IntroProps {
    onComplete: () => void;
}

// Ensure type definitions for navigator.connection
declare global {
    interface Navigator {
        readonly connection?: {
            readonly downlink: number;
            readonly rtt: number;
            readonly effectiveType: 'slow-2g' | '2g' | '3g' | '4g';
            readonly saveData: boolean;
        };
    }
}

export default function Intro({ onComplete }: IntroProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const percentRef = useRef<HTMLDivElement>(null);
    const [duration, setDuration] = useState(1500); // Default fallback
    const [percentage, setPercentage] = useState(0);

    useEffect(() => {
        // Read the network connection speed
        if (typeof navigator !== "undefined" && "connection" in navigator && navigator.connection) {
            const conn = navigator.connection;

            // Adjust loading duration based on connection type
            switch (conn.effectiveType) {
                case 'slow-2g':
                case '2g':
                    setDuration(3500); // Slower loading logic for older/slower networks
                    break;
                case '3g':
                    setDuration(2500); // Medium network 
                    break;
                case '4g':
                default:
                    // Check actual downlink speed (Mb/s) for fast networks
                    if (conn.downlink >= 10) {
                        setDuration(1000); // Ultra fast network
                    } else if (conn.downlink >= 2) {
                        setDuration(1500); // Good normal network
                    } else {
                        setDuration(2000); // Slower 4g
                    }
                    break;
            }
        }
    }, []);

    // Percentage counter animation logic
    useEffect(() => {
        let startTime: number;
        let animationFrame: number;
        const delay = 500; // Match the ScrambleText delay

        const animate = (time: number) => {
            if (!startTime) startTime = time;
            const elapsed = time - startTime;

            if (elapsed > delay) {
                const progress = Math.min((elapsed - delay) / duration, 1);
                setPercentage(Math.floor(progress * 100));
            }

            if (elapsed < duration + delay + 500) {
                animationFrame = requestAnimationFrame(animate);
            }
        };

        animationFrame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrame);
    }, [duration]);

    useGSAP(() => {
        // Masking text reveal
        gsap.fromTo(
            [textRef.current, percentRef.current],
            { y: "100%", opacity: 0 },
            {
                y: "0%",
                opacity: 1,
                duration: 1,
                stagger: 0.1,
                ease: "power3.out",
                delay: 0.2
            }
        );
    }, { scope: containerRef });

    const handleScrambleComplete = () => {
        // Masking text hide
        gsap.to([textRef.current, percentRef.current], {
            y: "-100%",
            opacity: 0,
            duration: 0.8,
            stagger: 0.05,
            ease: "power3.in",
            onComplete: () => {
                gsap.to(containerRef.current, {
                    opacity: 0,
                    duration: 0.5,
                    onComplete: onComplete
                });
            }
        });
    };

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#1D2A22] pointer-events-none"
        >
            <div className="flex flex-col items-center gap-4">
                <div className="overflow-hidden">
                    <div ref={textRef} className="text-center">
                        <h1 className="text-xl font-mono uppercase tracking-[0.6em] text-white mix-blend-difference">
                            <ScrambleText
                                text="PRZOJECT 840313RZ"
                                duration={duration}
                                delay={500}
                                onComplete={handleScrambleComplete}
                            />
                        </h1>
                    </div>
                </div>

                <div className="overflow-hidden">
                    <div ref={percentRef} className="text-center">
                        <span className="text-sm font-mono tracking-widest text-[#84A990] opacity-80">
                            {percentage < 10 && "0"}
                            {percentage}%
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
