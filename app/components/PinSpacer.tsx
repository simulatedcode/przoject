"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function PinSpacer() {
    const sectionRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        gsap.to("#hero-wrapper", {
            y: "-100vh",
            ease: "none",
            scrollTrigger: {
                trigger: "#hero-trigger",
                start: "top top",
                endTrigger: "#pin-spacer",
                end: "bottom top",
                scrub: true,
            }
        });
    });

    // Cursor parallax — syncs with the Hero camera tilt direction
    // Mouse Y down → camera tilts down → PinSpacer nudges up (feels like scrolling forward)
    useEffect(() => {
        if (!sectionRef.current) return;

        const PARALLAX_STRENGTH = 28; // px range up/down
        const quickY = gsap.quickTo(sectionRef.current, "y", {
            duration: 0.8,
            ease: "power2.out",
        });

        const onMove = (e: MouseEvent) => {
            // NDC: -1 (top) to +1 (bottom)
            const ndcY = (e.clientY / window.innerHeight) * 2 - 1;
            // Invert: cursor at top → push spacer down (feels like leaning forward)
            quickY(-ndcY * PARALLAX_STRENGTH);
        };

        window.addEventListener("mousemove", onMove);
        return () => window.removeEventListener("mousemove", onMove);
    }, []);

    return (
        <section
            ref={sectionRef}
            id="pin-spacer"
            className="relative min-h-screen w-full -z-10 pointer-events-none -mt-16 bg-linear-to-b from-primary-950 via-primary-900 to-primary-900/80"
        >
            {/* Top-edge blend — meets the Hero bottom-fade to create a seamless blend */}
            <div
                className="absolute top-0 left-0 right-0 pointer-events-none"
                style={{
                    height: "30%",
                    background: "linear-gradient(to bottom, #1D2A22 0%, transparent 100%)",
                    zIndex: 1,
                }}
            />
        </section>
    );
}
