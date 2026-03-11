'use client'

import React from 'react'

export default function HelasSection() {
    return (
        <section className="relative h-screen flex items-center justify-center">
            <div className="relative mx-auto bg-white/10 backdrop-blur-sm py-2 px-3 border border-white/10 rounded-sm">
                <p className="font-mono text-[10px] tracking-[0.2em] opacity-60 uppercase">
                    object: <span className="text-muted">helas</span>
                    <span className='px-2 text-white/60'>/</span>
                    <span>system status:</span>
                    <span className="text-muted px-2">suspended</span>
                </p>
            </div>

        </section>
    )
}