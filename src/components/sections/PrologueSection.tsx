'use client'

import React from 'react'

export default function PrologueSection() {
    return (
        <section className="relative flex items-center justify-center min-h-screen px-[var(--section-px)]">
            <div className="max-w-xl text-center mix-blend-exclusion">
                <p className="font-departure text-[clamp(0.6rem,2vw,0.875rem)] tracking-[0.25em] text-center mb-8 opacity-50 uppercase">
                    [ prologue ]
                </p>
                <p className="text-lg md:text-xl leading-relaxed tracking-wide mb-8 font-light text-center">
                    Our memories carry landscapes of inevitably solitude states.
                    They are bringing us to the experience of abstract and absolute existence of presence and void.
                    What is that liminal realm and how is it constructed?
                    Is it too fictional to believe that beauty can happen?
                </p>
                <p className="font-departure text-sm leading-relaxed tracking-wide font-light text-center">
                    Katarina Mladenović
                </p>
            </div>
        </section>
    )
}
