"use client";

import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

import { createScrollTimeline } from "@/app/lib/animation/scrollTimeline";
import { CameraState } from "./CameraState";

gsap.registerPlugin(ScrollTrigger);

const BASE_POLAR = 1.45;
const BASE_AZIMUTHAL = 0;

/**
 * CameraInput captures raw scrolling input and stores it into the shared `CameraState`.
 * It manages the GSAP ScrollTrigger timeline.
 */
export function CameraInput() {
    useEffect(() => {
        // --- Scroll Tracking ---
        const { cleanup: cleanupScroll } = createScrollTimeline({
            trigger: document.documentElement,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
            onUpdate: (self) => {
                const progress = self.progress;

                // Sync global state
                CameraState.progress = progress;
                CameraState.velocity = self.getVelocity();

                // Calculate base targets based on scroll position
                CameraState.polar = BASE_POLAR + progress * 0.19; // MAX_POLAR = 1.64
                CameraState.azimuthal = BASE_AZIMUTHAL + progress * 1.2;
            },
        });

        // --- Mouse / Pointer Tracking ---
        const handlePointerMove = (e: PointerEvent) => {
            // Normalize to -1 to 1 based on screen size
            CameraState.cursorX = (e.clientX / window.innerWidth) * 2 - 1;
            CameraState.cursorY = -(e.clientY / window.innerHeight) * 2 + 1;
        };

        window.addEventListener("pointermove", handlePointerMove, { passive: true });

        return () => {
            cleanupScroll();
            window.removeEventListener("pointermove", handlePointerMove);
        };
    }, []);

    return null; // Logic-only component
}
