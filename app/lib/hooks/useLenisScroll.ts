"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export interface LenisScrollOptions {
    duration?: number;
    smoothWheel?: boolean;
    syncTouch?: boolean;
    wheelMultiplier?: number;
    touchMultiplier?: number;
    infinite?: boolean;
}

/**
 * Initialise Lenis smooth scrolling and sync with GSAP ScrollTrigger.
 * Call once at the layout level.
 */
export function useLenisScroll(options: LenisScrollOptions = {}) {
    useEffect(() => {
        const lenis = new Lenis({
            duration: options.duration ?? 1.2,
            smoothWheel: options.smoothWheel ?? true,
            syncTouch: options.syncTouch ?? true,
            wheelMultiplier: options.wheelMultiplier ?? 1,
            touchMultiplier: options.touchMultiplier ?? 2,
            infinite: options.infinite ?? false,
        });

        // Lenis RAF loop
        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        // Sync ScrollTrigger on every Lenis scroll event
        lenis.on("scroll", ScrollTrigger.update);

        // GSAP ticker also drives Lenis for timeline sync
        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });
        gsap.ticker.lagSmoothing(0);

        return () => {
            lenis.destroy();
        };
    }, []);
}
