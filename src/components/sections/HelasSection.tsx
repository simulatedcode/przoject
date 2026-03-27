'use client'

import React from 'react'

export default function HelasSection() {
    return (
        <section className="relative h-screen flex items-center justify-center">
            <div className="relative max-w-lg bg-white/3 backdrop-blur-xl border border-white/10 p-12 md:p-16 rounded-sm shadow-2xl overflow-hidden">
                {/* DECORATIVE TERMINAL HEADER */}
                <div className="absolute top-0 left-0 right-0 h-6 bg-white/5 border-b border-white/10 flex items-center px-4 justify-between">
                    <p className="font-departure text-[8px] uppercase tracking-widest text-white/20 mt-2">
                        monitor_id: object_helas_v3.sh
                    </p>
                </div>

                <div className="mt-8 space-y-6">
                    {/* MONITOR MESSAGE */}
                    <div className="space-y-2">
                        <div className="flex items-center gap-3">
                            <span className="font-departure text-[9px] text-accent tracking-widest">[MONITOR.V3]</span>
                            <span className="font-departure text-[8px] text-white/20">ACTIVE</span>
                        </div>
                        <div className="bg-white/5 border border-white/5 p-3 rounded-xs max-w-[80%]">
                            <p className="font-departure text-[10px] text-white/60 uppercase tracking-widest leading-relaxed">
                                {">"} tracking helas_v3 coordinate system<br />
                                {">"} status: suspended_indefinitely<br />
                                {">"} integrity: 98.4% [stable]
                            </p>
                        </div>
                    </div>

                    {/* ALERT/STATUS MESSAGE */}
                    <div className="pt-4 mb-4">
                        <div className="flex items-center gap-3">
                            <span className="font-departure text-[9px] text-red-400 uppercase tracking-widest">[ALERT: LOG]</span>
                            <span className="font-departure text-[8px] text-white/20">04:18:12</span>
                        </div>
                        <div className="border-t mb-2 border-red-500/20 pt-4 flex items-center gap-4">
                            <div className="w-8 h-8 rounded-full border border-red-500/30 flex items-center justify-center animate-pulse">
                                <div className="w-2 h-2 bg-red-500/40 rounded-full blur-[1px]" />
                            </div>
                            <h2 className="text-xl font-bold tracking-tighter uppercase text-white font-departure">
                                HELAS<span className="text-red-500/60">_V3</span>
                            </h2>
                        </div>
                        <div className="w-6 h-px mb-2 bg-white/10" />
                        <p className="font-departure text-[11px] leading-relaxed tracking-wide font-light text-white/70">
                            Primary object detected in digital amber. System integrity verified via recursive checksum.
                        </p>
                    </div>

                    {/* SYSTEM FOOTER */}
                    <div className="pt-8">
                        <div className="w-12 h-px bg-white/20 mb-4" />
                        <p className="font-departure text-[9px] uppercase tracking-widest text-white/20">
                            heartbeat_active // sync_index: 0x4F22A
                        </p>
                    </div>
                </div>

                {/* SCANLINE OVERLAY */}
                <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-size-[100%_2px,3px_100%] z-10 opacity-30" />
            </div>
        </section>
    )
}