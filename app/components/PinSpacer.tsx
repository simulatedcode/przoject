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
                trigger: "#pin-spacer",
                start: "top bottom",
                end: "bottom top",
                scrub: 1.5,
            }
        });
    });

    return (
        <section
            id="pin-spacer"
            className="min-h-screen w-full z-10 pointer-events-none bg-linear-to-t from-primary-950 via-primary-900/80 mask-to-b"
        />
    );
}
