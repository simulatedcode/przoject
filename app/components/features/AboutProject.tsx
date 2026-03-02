"use client"

import { ScrambleText } from "../ui/ScrambleText";

interface AboutProjectProps {
    scrambleHeader: number;
}

export function AboutProject({ scrambleHeader }: AboutProjectProps) {
    return (
        <div className="relative max-w-4xl mx-auto px-carbon-06 w-full min-h-dvh bg-primary flex flex-col justify-center">
            <div className="flex items-center gap-carbon-04 mb-carbon-04 font-mono text-carbon-03 text-surface uppercase tracking-[0.3em]">
                <span className="status-indicator-pulse">●</span>
                <span>PROJECT_INITIATED</span>
            </div>

            <h1 className="text-carbon-11 sm:text-carbon-13 font-sans font-bold leading-[0.9] tracking-tighter text-surface mb-carbon-07">
                <ScrambleText
                    text="PRZOJECT_01"
                    trigger={scrambleHeader}
                    duration={1.2}
                />
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-carbon-08">
                <div className="space-y-carbon-05">
                    <p className="text-carbon-05 font-sans leading-relaxed text-muted max-w-md">
                        A decentralized data architecture designed for the persistence of historical artifacts in high-entropy environments.
                    </p>
                    <p className="text-carbon-04 font-sans leading-relaxed text-muted/80 max-w-md border-l border-primary/20 pl-carbon-05 italic">
                        "When the network fragments, the local archive becomes the absolute truth."
                    </p>
                </div>

                <div className="flex flex-col justify-end gap-carbon-04 font-mono text-carbon-02 text-secondary/60 uppercase tracking-widest">
                    <div className="flex justify-between border-b border-border/20 pb-1">
                        <span>VERSION</span>
                        <span className="text-foreground">0.1.6_REV_A</span>
                    </div>
                    <div className="flex justify-between border-b border-border/20 pb-1">
                        <span>STATUS</span>
                        <span className="text-foreground font-bold">STABLE</span>
                    </div>
                    <div className="flex justify-between border-b border-border/20 pb-1">
                        <span>ENCRYPTION</span>
                        <span className="text-foreground">AES-4096-PZK</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
