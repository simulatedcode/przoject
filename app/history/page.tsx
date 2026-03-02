"use client";

import React from "react";
import Link from "next/link";
import { history } from "../data/history";
import { ScrambleText } from "../components/ui/ScrambleText";

interface HistoryItemProps {
    item: typeof history[0];
}

function HistoryItem({ item }: HistoryItemProps) {
    const [scrambleActive, setScrambleActive] = React.useState(0);

    return (
        <article
            className="group grid grid-cols-1 md:grid-cols-[100px_1fr] gap-carbon-04 border-l-2 border-border pl-carbon-05 py-carbon-02 hover:border-primary transition-all duration-500"
            onMouseEnter={() => setScrambleActive(prev => prev + 1)}
        >
            {/* Year / Date */}
            <div className="font-mono text-carbon-05 text-secondary pt-1 opacity-70 group-hover:opacity-100">
                {item.year}
            </div>

            {/* Content */}
            <div className="space-y-carbon-02">
                <h2 className="text-carbon-06 font-sans font-bold text-foreground leading-tight group-hover:text-primary transition-colors inline-block cursor-default">
                    <ScrambleText text={item.title} trigger={scrambleActive} duration={0.5} />
                </h2>
                <div className="flex flex-wrap items-center gap-carbon-04 text-carbon-03 font-mono text-muted">
                    <span className="bg-surface-brighter px-carbon-02 py-px">
                        LOC: {item.location || "N/A"}
                    </span>
                    <span className="opacity-50">DATE: {item.date}</span>
                </div>
                {item.description && (
                    <p className="text-carbon-04 font-sans text-muted mt-carbon-03 max-w-2xl leading-relaxed">
                        {item.description}
                    </p>
                )}
            </div>
        </article>
    );
}

export default function HistoryPage() {
    const [mounted, setMounted] = React.useState(false);
    const [dateStamp, setDateStamp] = React.useState("--/--/----");

    React.useEffect(() => {
        setMounted(true);
        setDateStamp(new Date().toLocaleDateString());
    }, []);

    const [scrambleBack, setScrambleBack] = React.useState(0);

    return (
        <main className="min-h-screen pt-carbon-11 pb-carbon-10 px-carbon-06 max-w-4xl mx-auto">
            {/* Header section */}
            <header className="mb-carbon-10 border-b border-border pb-carbon-04 flex flex-col sm:flex-row sm:items-end justify-between gap-carbon-04">
                <div className="relative">
                    <h1 className="text-carbon-08 sm:text-carbon-09 font-sans font-bold tracking-tight text-primary">
                        RECORD_ARCHIVE
                    </h1>
                </div>
                <div className="flex flex-col sm:items-end gap-carbon-02 font-mono uppercase tracking-widest leading-none">
                    <Link
                        href="/"
                        className="text-carbon-03 text-muted hover:text-primary transition-colors mb-carbon-01"
                        onMouseEnter={() => setScrambleBack(prev => prev + 1)}
                    >
                        <ScrambleText text="[BACK_TO_HOME]" trigger={scrambleBack} duration={0.4} />
                    </Link>
                    <div className="flex gap-carbon-04 text-carbon-02 sm:text-carbon-03 text-muted/60">
                        <span className="status-indicator-pulse text-primary/80">SEC_STATUS: UNAUTHORIZED_ACCESS_DETECTED</span>
                        <span className="opacity-50">|</span>
                        <span>STAMP: {dateStamp}</span>
                    </div>
                </div>
            </header>

            {/* History List */}
            <div className="space-y-carbon-08">
                {history.map((item) => (
                    <HistoryItem key={item.id} item={item} />
                ))}
            </div>

            {/* Footer decorator */}
            <footer className="mt-carbon-13 pt-carbon-06 border-t border-border text-center opacity-30">
                <p className="font-mono text-[10px] text-muted uppercase tracking-widest">
                    END_OF_RECORD_SET // TOTAL_ENTRIES: {mounted ? history.length : "--"}
                </p>
            </footer>
        </main>
    );
}
