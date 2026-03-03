"use client"

import { ScrambleText } from "../ui/ScrambleText";

interface AboutProjectProps {
    scrambleHeader: number;
}

export function AboutProject({ scrambleHeader }: AboutProjectProps) {
    return (
        <div className="relative max-w-4xl mx-auto px-carbon-06 w-full min-h-dvh bg-project-200 flex flex-col justify-center py-carbon-13">

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
                        In A Landscape unfolds within the framework of Speculative Memory Fiction. It approaches landscape not as scenery, but as a constructed memory-system—an image shaped by repetition and inheritance. Drawing tension from the romantic visual legacy associated with Raden Saleh, the project repositions the sublime as procedural rather than transcendental.
                    </p>
                    <p>
                        The horizon does not promise harmony or collapse. It behaves like a rendered terrain where history flickers between documentation and fabrication. Memory is not retrieved—it is composed. Identity does not emerge from geography, but from the circulation of images that define it.
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
