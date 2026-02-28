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
            className="h-[150vh] w-full z-10 pointer-events-none bg-primary-950"
        />
    );
}
