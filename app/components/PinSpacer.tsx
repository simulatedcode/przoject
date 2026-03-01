"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function PinSpacer() {
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

    return (
        <section
            id="pin-spacer"
            className="min-h-screen w-full -z-10 pointer-events-none -mt-16 bg-linear-to-b from-primary-950 via-primary-900 to-primary-900/80"
        />
    );
}
