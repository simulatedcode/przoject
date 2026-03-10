'use client'

import React from 'react'

export default function Landscape() {
    return (
        <section className="relative flex items-center justify-start min-h-screen px-10 md:px-20">
            <div className="max-w-4xl">
                <p className="font-doto text-sm tracking-[0.3em] mb-12 text-muted uppercase">
                    02 // in a landscape
                </p>
                <div className="space-y-8">
                    <h2 className="text-5xl md:text-7xl font-bold tracking-tight uppercase">
                        Infinite<br />Terrains
                    </h2>
                    <p className="max-w-md text-md font-mono leading-relaxed opacity-80">
                        A vast expanse of synthetic soil and digital atmosphere.
                        The horizon is a mathematical limit, an asymptotic curve
                        approaching a memory of reality.
                    </p>
                </div>
            </div>
        </section>
    )
}
