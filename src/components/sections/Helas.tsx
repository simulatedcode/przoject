'use client'

import React from 'react'

export default function Helas() {
    return (
        <section className="relative h-screen px-10 flex flex-col justify-end pb-20">

            <div className="text-center mix-blend-exclusion">

                <h2 className="text-[12vw] md:text-[180px] font-black tracking-[-0.05em] leading-none uppercase">
                    HELAS
                </h2>

                <p className="mt-8 font-mono text-[10px] tracking-[0.2em] text-muted opacity-60 uppercase">
                    system status: <span className="text-accent">suspended</span>
                </p>

            </div>

        </section>
    )
}