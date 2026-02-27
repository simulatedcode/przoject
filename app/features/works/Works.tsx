"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrambleTextPlugin } from "gsap-trial/dist/ScrambleTextPlugin";
import TransitionLink from "../../components/TransitionLink";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger, ScrambleTextPlugin);
}

// Reusable component for the interactive split-text list row
function WorkListItem({
    id,
    year,
    status,
    leftWord,
    rightWord,
    imageSrc,
    altText,
    imageWidth = "w-[60vw] max-w-[800px]",
    imageHeight = "h-[400px]",
    imageXOffset = 0,
}: {
    id: string;
    year: string;
    status: string;
    leftWord: string;
    rightWord: string;
    imageSrc: string;
    altText: string;
    imageWidth?: string;
    imageHeight?: string;
    imageXOffset?: number;
}) {
    const rowRef = useRef<HTMLDivElement>(null);
    const leftTextRef = useRef<HTMLSpanElement>(null);
    const rightTextRef = useRef<HTMLSpanElement>(null);
    const imageContainerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);

    return (
        <div
            ref={rowRef}
            className="group relative flex items-center justify-between w-full border-t border-[#84A990]/20 hover:border-[#84A990]/50 transition-colors duration-500 py-12 px-8 cursor-pointer z-50 overflow-hidden"
            onMouseEnter={() => {
                // Background darkens slightly for focus
                gsap.to(overlayRef.current, { opacity: 0.8, duration: 0.5 });

                // Split text apart dynamically to edges
                gsap.to(leftTextRef.current, { x: "-30vw", duration: 0.8, ease: "power4.out" });
                gsap.to(rightTextRef.current, { x: "30vw", duration: 0.8, ease: "power4.out" });

                // Unclip and scale Image
                gsap.fromTo(
                    imageContainerRef.current,
                    {
                        clipPath: "polygon(50% 0%, 50% 0%, 50% 100%, 50% 100%)",
                        x: 0
                    },
                    {
                        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                        x: imageXOffset,
                        duration: 0.8,
                        ease: "power4.out"
                    }
                );

                // Slowly scale image up cinematic
                gsap.fromTo(
                    imageRef.current,
                    { scale: 1 },
                    { scale: 1.05, duration: 1.5, ease: "power3.out" }
                );
            }}
            onMouseLeave={() => {
                // Remove focus background
                gsap.to(overlayRef.current, { opacity: 0, duration: 0.5 });

                // Return text to center
                gsap.to(leftTextRef.current, { x: 0, duration: 0.8, ease: "power4.out" });
                gsap.to(rightTextRef.current, { x: 0, duration: 0.8, ease: "power4.out" });

                // Hide image
                gsap.to(imageContainerRef.current, {
                    clipPath: "polygon(50% 0%, 50% 0%, 50% 100%, 50% 100%)",
                    x: 0,
                    duration: 0.5,
                    ease: "power3.in"
                });

                // Smoothly return zoom to normal
                gsap.to(imageRef.current, { scale: 0.9, duration: 0.8, delay: 0.2, ease: "power3.out" });
            }}
        >
            {/* Hover Darken Overlay */}
            <div ref={overlayRef} className="absolute inset-0 bg-[#0A0F0C] opacity-0 pointer-events-none -z-10" />

            {/* Hidden Image Container exactly in middle of the row */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                <div
                    ref={imageContainerRef}
                    className={`relative ${imageWidth} ${imageHeight} overflow-hidden`}
                    style={{ clipPath: "polygon(50% 0%, 50% 0%, 50% 100%, 50% 100%)" }}
                >
                    <img
                        ref={imageRef}
                        src={imageSrc}
                        alt={altText}
                        className="w-full h-full object-cover origin-center mix-blend-screen opacity-90"
                    />
                    {/* Sci-Fi scanline overlay on image */}
                    <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.25)_50%)] bg-size-[100%_4px] pointer-events-none" />
                </div>
            </div>

            {/* Left Metadata Column */}
            <div className="flex flex-col gap-1 w-32 font-mono text-[10px] text-[#84A990]/60 uppercase tracking-widest z-10 transition-opacity duration-300 group-hover:opacity-30">
                <span>[ ID: {id} ]</span>
                <span>{year}</span>
            </div>

            {/* Center Massive Title */}
            <h2 className="flex-1 flex items-center justify-center gap-4 text-3xl md:text-5xl lg:text-7xl font-bold uppercase text-[#D5E2D9] tracking-tighter mix-blend-difference z-20 whitespace-nowrap">
                <span ref={leftTextRef} className="block will-change-transform leading-none">{leftWord}</span>
                <span ref={rightTextRef} className="block will-change-transform leading-none text-transparent" style={{ WebkitTextStroke: "1px #84A990" }}>{rightWord}</span>
            </h2>

            {/* Right Metadata Column */}
            <div className="flex flex-col items-end gap-1 w-32 font-mono text-[10px] text-[#84A990]/60 uppercase tracking-widest z-10 transition-opacity duration-300 group-hover:opacity-30">
                <span>FILE_STATUS</span>
                <span className="text-[#D5E2D9] group-hover:text-[#84A990] transition-colors">{status}</span>
            </div>
        </div>
    );
}

export default function Works() {
    const listRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!listRef.current) return;

        // Reveal effect for list rows as they scroll in
        const rows = gsap.utils.toArray<HTMLElement>('.work-list-row');

        rows.forEach((row, index) => {
            ScrollTrigger.create({
                trigger: row,
                start: "top 100%",
                animation: gsap.fromTo(
                    row,
                    { opacity: 0, filter: "blur(5px)" },
                    { opacity: 1, filter: "blur(0px)", duration: 0.8, ease: "power3.out" }
                ),
                once: true
            });
        });

    }, { scope: listRef });

    return (
        <section
            id="works-section"
            className="relative w-full min-h-screen bg-[#0A0F0C] z-10 py-32 flex flex-col items-center justify-start"
        >
            <div className="w-full flex flex-col gap-8">

                {/* Header for list */}
                <div className="flex justify-between items-end w-full border-b-2 border-[#84A990]/40 pb-4 px-8 font-mono text-xs text-[#84A990] tracking-widest uppercase">
                    <span>SYS.ARCHIVE</span>

                    <span>16 ENTRIES [FILTERED]</span>
                </div>

                {/* List Container */}
                <div ref={listRef} className="flex flex-col w-full border-b border-[#84A990]/20">
                    <TransitionLink href="/about" className="work-list-row opacity-0 block">
                        <WorkListItem
                            id="01"
                            year="2026.1"
                            status="RESTORED"
                            leftWord="IN A"
                            rightWord="LANDSCAPE"
                            imageSrc="/images/panorama.jpg"
                            altText="In A Landscape"
                            imageWidth="w-[100vw] max-w-[700px]"
                            imageHeight="h-[350px]"
                            imageXOffset={-130}
                        />
                    </TransitionLink>

                    <TransitionLink href="/about" className="work-list-row opacity-0 block">
                        <WorkListItem
                            id="02"
                            year="2025.8"
                            status="CORRUPTED"
                            leftWord="PSEUDO"
                            rightWord="MEMORIES"
                            imageSrc="/images/memories.jpg"
                            altText="Pseudo Memories"
                            imageWidth="w-[100vw] max-w-[700px]"
                            imageHeight="h-[500px]"
                            imageXOffset={0}
                        />
                    </TransitionLink>
                </div>

            </div>
        </section>
    );
}
