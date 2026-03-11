'use client'

import React from 'react'

export default function PrologueSection() {
    return (
        <section className="relative flex items-center justify-center min-h-screen px-18">
            <div className="max-w-2xl text-center mix-blend-exclusion">
                <p className="font-mono text-sm tracking-[0.25em] text-center mb-8 opacity-50 uppercase">
                    [ prologue ]
                </p>
                <p className="text-xl md:text-2xl leading-relaxed tracking-wide font-light text-center">
                    We are the architects of a past that never happened.
                    Tracing the signals of a signal that never arrived.
                    Reconstructing the shadows of a light that never flickered.
                </p>
            </div>
        </section>
    )
}
