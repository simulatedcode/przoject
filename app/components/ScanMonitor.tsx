"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function ScanMonitor() {
    const scanLineRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // Continuous Scanning Line
        gsap.to(scanLineRef.current, {
            top: "100%",
            duration: 4,
            ease: "none",
            repeat: -1,
        });

        // Subtle Random Flickering
        const flicker = () => {
            gsap.to(containerRef.current, {
                opacity: 0.8 + Math.random() * 0.2,
                duration: 0.05 + Math.random() * 0.1,
                onComplete: flicker,
            });
        };
        flicker();
    }, { scope: containerRef });

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 pointer-events-none z-50 overflow-hidden"
        >


            {/* 2️⃣ CRT Scanlines Effect */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-size-[100%_4px,3px_100%]" />

            {/* 3️⃣ Vignette & Noise Overlay */}
            <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.5)]" />

        </div>
    );
}
