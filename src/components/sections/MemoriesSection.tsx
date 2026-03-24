'use client'

import React from 'react'

export default function MemoriesSection() {
    return (
        <section className="relative flex items-center justify-center min-h-screen px-(--section-px)">
            <div className="relative max-w-lg bg-white/3 backdrop-blur-xl border border-white/10 p-12 md:p-16 rounded-sm shadow-2xl overflow-hidden">
                {/* DECORATIVE TERMINAL HEADER */}
                <div className="absolute top-0 left-0 right-0 h-6 bg-white/5 border-b border-white/10 flex items-center px-4 justify-between">
                    <p className="font-departure text-[8px] uppercase tracking-widest text-white/20 mt-2">
                        db_query: memory_fragments.mem
                    </p>
                </div>

                <div className="mt-8 space-y-6">
                    {/* ARCHIVE START */}
                    <div className="space-y-2">
                        <div className="flex items-center gap-3">
                            <span className="font-departure text-[9px] text-accent tracking-widest">[ARCHIVE.DB]</span>
                            <span className="font-departure text-[8px] text-white/20">RETRIEVING</span>
                        </div>
                        <div className="bg-white/5 border border-white/5 p-3 rounded-xs max-w-[80%]">
                            <p className="font-departure text-[10px] text-white/60 uppercase tracking-widest leading-relaxed">
                                {">"} 5 pseudo_memory_fragments found<br />
                                {">"} integrity: verified
                            </p>
                        </div>
                    </div>

                    {/* FRAGMENT LIST */}
                    <div className="space-y-4 pt-4">
                        <div className="border-t border-white/10 pt-4">
                            <span className="font-departure text-[9px] text-white/40 block mb-1">[FRAGMENT:01]</span>
                            <p className="text-[11px] font-departure leading-relaxed text-white/90">
                                "The smell of rain on a highway that doesn't exist anymore."
                            </p>
                        </div>
                        <div className="border-t border-white/10 pt-4">
                            <span className="font-departure text-[9px] text-white/40 block mb-1">[FRAGMENT:02]</span>
                            <p className="text-[11px] font-departure leading-relaxed text-white/70">
                                "A flickering neon light from a storefront selling dreams."
                            </p>
                        </div>
                        <div className="border-t border-white/10 pt-4">
                            <span className="font-departure text-[9px] text-white/40 block mb-1">[FRAGMENT:03]</span>
                            <p className="text-[11px] font-departure leading-relaxed text-white/60">
                                "Voices of friends echoed in a room that was never built."
                            </p>
                        </div>
                    </div>

                    {/* SYSTEM FOOTER */}
                    <div className="pt-8">
                        <div className="w-12 h-px bg-white/20 mb-4" />
                        <p className="font-departure text-[9px] uppercase tracking-widest text-white/20">
                            query_complete // limit_reached
                        </p>
                    </div>
                </div>

                {/* SCANLINE OVERLAY */}
                <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-size-[100%_2px,3px_100%] z-10 opacity-30" />
            </div>
        </section>
    )
}
