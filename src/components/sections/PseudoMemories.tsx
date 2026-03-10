'use client'

import React from 'react'

export default function PseudoMemories() {
    return (
        <section className="relative flex items-end justify-end min-h-screen px-10 md:px-20 pb-20">
            <div className="max-w-2xl text-right mix-blend-exclusion">
                <p className="font-mono text-xs tracking-[0.3em] mb-12 opacity-40 uppercase">
                    03 // pseudo memories
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
                    <div className="space-y-4">
                        <span className="font-mono text-[10px] opacity-30 uppercase">[ fragment_01 ]</span>
                        <p className="text-sm leading-relaxed italic">
                            "The smell of rain on hot asphalt,
                            translated into a frequency
                            I can no longer hear."
                        </p>
                    </div>
                    <div className="space-y-4 pt-12">
                        <span className="font-mono text-[10px] opacity-30 uppercase">[ fragment_02 ]</span>
                        <p className="text-sm leading-relaxed italic">
                            "Faces dissolving in a sea of static.
                            Familiar voices lost in the
                            quantization noise."
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}
