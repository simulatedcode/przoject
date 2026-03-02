"use client";

import React, { useState, useEffect } from "react";

interface ScrambleTextProps {
    text: string;
    className?: string;
    delay?: number;
    duration?: number;
    scrambleSpeed?: number;
    trigger?: any;
}

const chars = "!@#$%^&*()_+-=[]{}|;:,.<>?0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

export function ScrambleText({
    text,
    className = "",
    delay = 0,
    duration = 0.8,
    scrambleSpeed = 40,
    trigger,
}: ScrambleTextProps) {
    const [mounted, setMounted] = useState(false);
    const [displayText, setDisplayText] = useState(text);
    const [isStarted, setIsStarted] = useState(false);
    const [isFinished, setIsFinished] = useState(false);

    // Initialize or Update when not scrambling
    useEffect(() => {
        setMounted(true);
        if (!isStarted || isFinished) {
            setDisplayText(text);
        }
    }, [text, isStarted, isFinished]);

    // Handle initial delay and trigger changes
    useEffect(() => {
        if (trigger !== undefined) {
            setIsStarted(false);
            setIsFinished(false);
            // Small timeout to ensure state transitions correctly
            const timer = setTimeout(() => setIsStarted(true), 10);
            return () => clearTimeout(timer);
        } else {
            const timer = setTimeout(() => {
                setIsStarted(true);
            }, delay * 1000);
            return () => clearTimeout(timer);
        }
    }, [delay, trigger]);

    useEffect(() => {
        if (!isStarted || isFinished) return;

        let frame = 0;
        const totalFrames = (duration * 1000) / scrambleSpeed;

        const interval = setInterval(() => {
            const scrambled = text.split("").map((char, i) => {
                if (char === " ") return " ";

                const progress = frame / totalFrames;
                const revealThreshold = (i / text.length) * 0.8;

                if (progress > revealThreshold + 0.1) {
                    return char;
                }

                return chars[Math.floor(Math.random() * chars.length)];
            }).join("");

            setDisplayText(scrambled);
            frame++;

            if (frame >= totalFrames) {
                setDisplayText(text);
                setIsFinished(true);
                clearInterval(interval);
            }
        }, scrambleSpeed);

        return () => clearInterval(interval);
    }, [isStarted, isFinished, text, duration, scrambleSpeed]);

    if (!mounted) return <span className={className}>{text}</span>;

    return <span className={className} suppressHydrationWarning>{displayText}</span>;
}
