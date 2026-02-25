"use client";

import { useEffect, useState } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;':,./<>?";

interface ScrambleTextProps {
    text: string;
    duration?: number;
    delay?: number;
    onComplete?: () => void;
}

export function ScrambleText({ text, duration = 1500, delay = 0, onComplete }: ScrambleTextProps) {
    const [displayText, setDisplayText] = useState("");

    useEffect(() => {
        let startTime: number | null = null;
        let animationFrame: number;

        // Initialize with random characters
        setDisplayText(
            text.split("")
                .map((char) => (char === " " ? " " : CHARS[Math.floor(Math.random() * CHARS.length)]))
                .join("")
        );

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const elapsed = timestamp - startTime;

            if (elapsed < delay) {
                // Keep scrambling chaotically during the delay period
                setDisplayText(
                    text.split("")
                        .map((char) => (char === " " ? " " : CHARS[Math.floor(Math.random() * CHARS.length)]))
                        .join("")
                );
                animationFrame = requestAnimationFrame(animate);
                return;
            }

            // Calculate progress through the actual duration (0 to 1)
            const progress = Math.min((elapsed - delay) / duration, 1);

            // Re-build the string
            const nextText = text.split("").map((char, index) => {
                if (char === " ") return " ";

                // Characters resolve smoothly from left to right as progress increases
                const charResolveThresh = index / text.length;

                // Add a small random element so they don't resolve artificially perfectly
                if (progress >= charResolveThresh + (Math.random() * 0.1)) {
                    return char;
                }

                // Keep scrambling unresolved characters
                return CHARS[Math.floor(Math.random() * CHARS.length)];
            }).join("");

            setDisplayText(nextText);

            if (progress < 1) {
                // Loop until fully resolved
                animationFrame = requestAnimationFrame(animate);
            } else if (onComplete) {
                onComplete();
            }
        };

        // Start the animation loop
        animationFrame = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(animationFrame);
    }, [text, duration, delay]);

    return <>{displayText}</>;
}
