"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ScrambleText } from "../ui/ScrambleText";
import { history } from "../../data/history";

export function HistoryPreview() {
    const [scrambleTitle, setScrambleTitle] = useState(0);
    const [scrambleLink, setScrambleLink] = useState(0);

    return (
        <section
            className="min-h-screen flex flex-col justify-center py-carbon-13 border-b border-border/30"
            onMouseEnter={() => setScrambleTitle(prev => prev + 1)}
        >
            <div className="max-w-4xl mx-auto px-carbon-06 w-full">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-carbon-10 gap-carbon-06">
                    <div>
                        <div className="font-mono text-carbon-02 text-muted uppercase tracking-widest mb-carbon-03">
                            DATA_RETRIEVAL_SEQUENCING
                        </div>
                        <h2 className="text-carbon-08 font-sans font-bold tracking-tight text-foreground leading-none">
                            <ScrambleText text="RECENT_HISTORY" trigger={scrambleTitle} duration={0.6} />
                        </h2>
                    </div>

                    <Link
                        href="/history"
                        className="font-mono text-carbon-03 text-primary hover:text-foreground transition-colors border-b border-primary/20 hover:border-foreground pb-1"
                        onMouseEnter={() => setScrambleLink(prev => prev + 1)}
                    >
                        <ScrambleText text="ACCESS_FULL_ARCHIVE" trigger={scrambleLink} duration={0.4} />
                    </Link>
                </div>

                <div className="space-y-carbon-06 mb-carbon-10">
                    {history.slice(0, 3).map((item, index) => (
                        <div
                            key={item.id}
                            className="group grid grid-cols-[auto_1fr_auto] gap-carbon-06 items-center py-carbon-04 border-b border-border/10 hover:border-primary/30 transition-colors"
                        >
                            <span className="font-mono text-carbon-02 text-muted/30">
                                {index.toString().padStart(2, '0')}
                            </span>
                            <div>
                                <h3 className="text-carbon-05 font-sans font-bold text-foreground group-hover:text-primary transition-colors">
                                    {item.title}
                                </h3>
                                <p className="text-carbon-03 font-sans text-muted/50">
                                    {item.location}
                                </p>
                            </div>
                            <span className="font-mono text-carbon-03 text-secondary/60">
                                {item.year}
                            </span>
                        </div>
                    ))}
                </div>

                <div className="flex items-center gap-carbon-04 opacity-30 select-none">
                    <div className="h-px flex-1 bg-border/50"></div>
                    <span className="font-mono text-[10px] text-muted tracking-[0.5em]">BUFFER_OVERFLOW_PREVENTED</span>
                    <div className="h-px flex-1 bg-border/50"></div>
                </div>
            </div>
        </section>
    );
}
