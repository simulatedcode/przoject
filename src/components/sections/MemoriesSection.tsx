'use client'

import React from 'react'

export default function MemoriesSection() {
    return (
        <section className="relative flex items-end justify-end min-h-screen px-[var(--section-px)] pb-[var(--section-pb)]">
            <div className="max-w-2xl text-right mix-blend-exclusion">
                <p className="font-departure text-[clamp(0.6rem,2vw,0.875rem)] tracking-[0.3em] mb-12 text-muted uppercase">
                    03 // pseudo memories
                </p>
                <div className="space-y-[clamp(1rem,4vw,2rem)]">

                    {/* FRAGMENT 01 */}
                    <div className="flex items-center gap-12">

                        {/* LEFT : TEXT */}
                        <div className="max-w-[24ch]">
                            <span className="font-departure text-[10px] opacity-30 uppercase tracking-[0.2em]">
                                [ fragment_01 ]
                            </span>

                            <p className="text-sm leading-relaxed italic">
                                "The smell of rain on hot asphalt,
                                translated into a frequency
                                I can no longer hear."
                            </p>
                        </div>

                        {/* RIGHT : IMAGE */}
                        <div className="relative w-[80px] aspect-square">
                            <img
                                src="/images/memories.jpg"
                                className="absolute inset-0 w-full h-full object-cover"
                                alt="fragment 01"
                            />
                        </div>

                    </div>


                    {/* FRAGMENT 02 */}
                    <div className="flex items-center gap-12">

                        {/* LEFT : TEXT */}
                        <div className="max-w-[24ch]">
                            <span className="font-departure text-[10px] opacity-30 uppercase tracking-[0.2em]">
                                [ fragment_02 ]
                            </span>

                            <p className="text-sm leading-relaxed italic">
                                "Faces dissolving in a sea of static.
                                Familiar voices lost in the
                                quantization noise."
                            </p>
                        </div>

                        {/* RIGHT : IMAGE */}
                        <div className="relative w-[80px] aspect-square">
                            <img
                                src="/images/panorama.jpg"
                                className="absolute inset-0 w-full h-full object-cover"
                                alt="fragment 02"
                            />
                        </div>

                    </div>

                </div>
            </div>

        </section>
    )
}
