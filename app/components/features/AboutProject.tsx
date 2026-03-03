"use client"

import { ScrambleText } from "../ui/ScrambleText";

interface AboutProjectProps {
    scrambleHeader: number;
}

export function AboutProject({ scrambleHeader }: AboutProjectProps) {
    return (
        <div className="relative max-w-4xl mx-auto px-carbon-06 w-full min-h-dvh bg-primary flex flex-col justify-center py-carbon-13">

            <h1 className="text-carbon-11 sm:text-carbon-13 font-sans font-bold uppercase leading-[0.9] tracking-widest text-surface mb-carbon-10">
                <ScrambleText
                    text="In a Landscape"
                    trigger={scrambleHeader}
                    duration={1.2}
                />
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-[1fr_250px] gap-carbon-10 items-start">
                <div className="space-y-carbon-07 text-carbon-05 font-sans leading-relaxed text-surface/90 max-w-2xl">
                    <p>
                        You see beauty through romanticizing. Beauty appears in duality. Presence and absence. Clarity and blur. Reality and fiction. The image feels real, yet you sense illusion.
                    </p>
                    <p>
                        Perception becomes unstable. Your mind translates layers of subconscious input. The panorama looks convincing. It feels like a real place. But it comes from memory. This tension creates ambiguity.
                    </p>
                    <p>
                        The work questions the liminal realm. Where does the visible horizon lead you. What defines the line between memory and imagination. How does fiction become believable.
                    </p>
                    <p>
                        His landscapes carry solitude. They suggest both presence and void. They invite you to reflect on your own memories. You confront the space between what was and what is imagined.
                    </p>
                    <p className="text-surface font-semibold border-l-2 border-surface/30 pl-carbon-06 py-2 italic font-sans leading-relaxed">
                        Through screen printing, repetition, and layered imagery, Fahriza constructs a visual field where memory becomes landscape. The result is a space where illusion and reality coexist, and where beauty emerges from uncertainty.
                    </p>
                </div>

                <div className="flex flex-col gap-carbon-04 font-mono text-[10px] text-surface/60 uppercase tracking-widest pt-carbon-02">
                    <div className="flex justify-between border-b border-surface/20 pb-1">
                        <span>VERSION</span>
                        <span className="text-surface">0.1.6_REV_A</span>
                    </div>
                    <div className="flex justify-between border-b border-surface/20 pb-1">
                        <span>STATUS</span>
                        <span className="text-surface font-bold">STABLE</span>
                    </div>
                    <div className="flex justify-between border-b border-surface/20 pb-1">
                        <span>ENCRYPTION</span>
                        <span className="text-surface">AES-4096-PZK</span>
                    </div>
                    <div className="flex justify-between border-b border-surface/20 pb-1">
                        <span>LOCATION</span>
                        <span className="text-surface">MEMORY_V01</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
