"use client";

import { useState } from "react";
import { ScrambleText } from "../ui/ScrambleText";
import DystopianBackground from "../layout/DystopianBackground";

export function Artist() {
    const [scrambleTitle, setScrambleTitle] = useState(0);

    return (
        <DystopianBackground>
            <section
                className="min-h-screen flex flex-col justify-center py-carbon-13 border-b border-border/30 px-carbon-06"
                onMouseEnter={() => setScrambleTitle(prev => prev + 1)}
            >
                <div className="max-w-4xl mx-auto w-full grid grid-cols-1 md:grid-cols-[200px_1fr] gap-carbon-10">
                    <aside className="space-y-carbon-06">
                        <div className="font-mono text-carbon-02 text-muted uppercase tracking-widest border-b border-border/30 pb-carbon-02 mb-carbon-04">
                            ENTITY_PROFILE
                        </div>

                        <div className="space-y-carbon-04 font-mono text-carbon-03">
                            <div className="space-y-1">
                                <span className="text-muted/50 text-[10px] block uppercase">DESIGNATION</span>
                                <span className="text-primary block">M_FAHRIZA_ANSYARI</span>
                            </div>
                            <div className="space-y-1">
                                <span className="text-muted/50 text-[10px] block uppercase">ROLE</span>
                                <span className="text-secondary block">VISUAL_ARTIST</span>
                            </div>
                            <div className="space-y-1">
                                <span className="text-muted/50 text-[10px] block uppercase">LOCATION</span>
                                <span className="text-foreground block">SECTOR_YG_ID</span>
                            </div>
                        </div>
                    </aside>

                    <div className="max-w-2xl">
                        <h2 className="text-carbon-08 font-sans font-bold tracking-tight text-foreground mb-carbon-06">
                            <ScrambleText text="THE_ARTIST" trigger={scrambleTitle} duration={0.6} />
                        </h2>

                        <div className="space-y-carbon-06 text-carbon-05 font-sans leading-relaxed text-muted">
                            <p>
                                M. Fahriza Ansyari is an illustrator and visual artist working across screen printing and spatial media. For over four years, his practice has navigated the tension between material process and conceptual inquiry. By combining tactile print techniques with speculative spatial environments, he constructs visual systems that oscillate between physical presence and metaphysical suggestion.
                            </p>
                            <p>
                                His work explores landscape as ideology, memory as fabrication, and image as a site of cultural inheritance. Moving fluidly between craft and speculation, he treats the surface not merely as medium, but as territory.
                            </p>
                        </div>

                        <div className="mt-carbon-08 p-carbon-05 bg-surface/30 border border-border/50 rounded-sm">
                            <div className="flex items-center gap-carbon-04 text-carbon-02 font-mono text-secondary uppercase tracking-widest mb-carbon-02">
                                <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
                                <span>CURRENT_DIRECTIVE: SPECULATIVE_MEMORY_FICTION</span>
                            </div>
                            <p className="text-carbon-03 font-sans text-muted/70 italic">
                                Navigating the tension between material process and conceptual inquiry.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </DystopianBackground>
    );
}
