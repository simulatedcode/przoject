'use client'

import React from 'react'

export default function LandscapeSection() {
    return (
        <section className="relative flex items-center justify-start min-h-screen px-[var(--section-px)]">
            <div className="max-w-4xl">
                <p className="font-departure text-[clamp(0.6rem,2vw,0.875rem)] tracking-[0.3em] mb-12 text-muted uppercase">
                    02 // in a landscape
                </p>
                <div className="space-y-8">
                    <h2 className="text-5xl md:text-7xl font-bold tracking-tight uppercase">
                        collective<br />memory
                    </h2>
                    <p className="max-w-md text-md font-mono leading-relaxed opacity-80">
                        While it becomes fiction, the impression as a panorama is so real that it can be confused with reality itself.
                    </p>
                </div>
            </div>
        </section>
    )
}
