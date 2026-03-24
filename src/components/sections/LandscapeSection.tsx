'use client'

import React from 'react'

export default function LandscapeSection() {
    return (
        <section className="relative flex items-center justify-center min-h-screen">
            <div className="relative max-w-lg bg-white/3 backdrop-blur-xl border border-white/10 p-12 md:p-16 rounded-sm shadow-2xl overflow-hidden">
                {/* DECORATIVE TERMINAL HEADER */}
                <div className="absolute top-0 left-0 right-0 h-6 bg-white/5 border-b border-white/10 flex items-center px-4 justify-between">
                    <p className="font-departure text-[8px] uppercase tracking-widest text-white/20 mt-2">
                        scan_id: env_analysis_08.sh
                    </p>
                </div>

                <div className="mt-8 space-y-6">
                    {/* ANALYZER MESSAGE */}
                    <div className="space-y-2">
                        <div className="flex items-center gap-3">
                            <span className="font-departure text-[9px] text-accent tracking-widest">[ANALYZER.EXE]</span>
                            <span className="font-departure text-[8px] text-white/20">04:15:02</span>
                        </div>
                        <div className="bg-white/5 border border-white/5 p-3 rounded-xs max-w-[80%]">
                            <p className="font-departure text-[10px] text-white/60 uppercase tracking-widest leading-relaxed">
                                {">"} scanning horizon...<br />
                                {">"} detecting architectural anomalies<br />
                                {">"} calculating distance to void: 0.00km
                            </p>
                        </div>
                    </div>

                    {/* RESULT MESSAGE */}
                    <div className="pt-4 mb-4">
                        <div className="flex items-center gap-3">
                            <span className="font-departure text-[9px] text-white/80 uppercase tracking-widest">[DATA: RESULT]</span>
                            <span className="font-departure text-[8px] text-white/20">LIVE</span>
                        </div>
                        <div className="border-t mb-2 border-white/10 pt-4">
                            <p className="text-[11px] leading-relaxed tracking-wide font-light text-white/90 font-departure">
                                "While it becomes fiction, the landscape is what we already have as a memory. It’s what stays."
                            </p>
                        </div>
                        <div className="w-6 h-px mb-2 bg-white/20" />
                        <p className="font-departure text-[11px] leading-relaxed tracking-wide font-light text-white/70">
                            The impression as a panorama is so real that it can be confused with reality itself.
                        </p>
                    </div>

                    {/* SYSTEM FOOTER */}
                    <div className="pt-8">
                        <div className="w-12 h-px bg-white/20 mb-4" />
                        <div className="flex items-center justify-between">
                            <p className="font-departure text-[9px] uppercase tracking-widest text-white/20">
                                landscape_meta // analysis_buffer: 0.12ms
                            </p>
                            <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                        </div>
                    </div>
                </div>

                {/* SCANLINE OVERLAY */}
                <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-size-[100%_2px,3px_100%] z-10 opacity-30" />
            </div>
        </section >
    )
}
