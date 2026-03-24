'use client'

import React from 'react'

export default function PrologueSection() {
    return (
        <section className="relative flex items-center justify-center min-h-screen">
            <div className="relative max-w-lg bg-white/3 backdrop-blur-xl border border-white/10 p-12 md:p-16 rounded-sm shadow-2xl overflow-hidden">
                {/* DECORATIVE TERMINAL HEADER */}
                <div className="absolute top-0 left-0 right-0 h-6 bg-white/5 border-b border-white/10 flex items-center px-4 justify-between">
                    <p className="font-departure text-[8px] uppercase tracking-widest text-white/20 mt-2">
                        session: terminal_session_00.sh
                    </p>
                </div>

                <div className="mt-8 space-y-6">
                    {/* SYSTEM MESSAGES */}
                    <div className="space-y-2">
                        <div className="flex items-center gap-3">
                            <span className="font-departure text-[9px] text-accent tracking-widest">[README.md]</span>
                            <span className="font-departure text-[8px] text-white/20">2020</span>
                        </div>
                        <div className="bg-white/5 border border-white/5 p-3 rounded-xs max-w-[80%]">
                            <p className="font-departure text-[10px] text-white/60 uppercase tracking-widest leading-relaxed">
                                {">"} initiating boot sequence...<br />
                                {">"} accessing encrypted_archive/prologue.mem<br />
                                {">"} decrypting... status: success
                            </p>
                        </div>
                    </div>

                    {/* AUTHOR MESSAGE */}
                    <div className="pt-4 mb-4">
                        <div className="flex items-center gap-3">
                            <span className="font-departure text-[9px] text-white/80 uppercase tracking-widest">[AUTHOR: KM]</span>
                            <span className="font-departure text-[8px] text-white/20">04:12:18</span>
                        </div>
                        <div className="border-t mb-2 border-white/10 pt-4">
                            <p className="text-[11px] leading-relaxed tracking-wide font-light text-white/90 font-departure">
                                Our memories carry landscapes of inevitably solitude states. They are bringing us to the experience of abstract and absolute existence of presence and void.
                            </p>
                        </div>
                        <div className="w-6 h-px mb-2 bg-white/20" />
                        <p className="font-departure text-[11px] leading-relaxed tracking-wide font-light text-white/70">
                            What is that liminal realm and how is it constructed? Is it too fictional to believe that beauty can happen?
                        </p>
                    </div>

                    {/* SYSTEM FOOTER */}
                    <div className="pt-8">
                        <div className="w-12 h-px bg-white/20 mb-4" />
                        <p className="font-departure text-[9px] uppercase tracking-widest text-white/20">
                            Katarina Mladenović // .2024
                        </p>
                    </div>
                </div>

                {/* SCANLINE OVERLAY */}
                <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-size-[100%_2px,3px_100%] z-10 opacity-30" />
            </div>
        </section>
    )
}
