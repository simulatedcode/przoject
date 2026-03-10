'use client';

import React from 'react';

/**
 * Sticky Footer Reveal Effect (Method 1 from Olivier Larose)
 * Uses a relative wrapper with clip-path as a "window"
 * and a fixed inner container that becomes visible as you scroll.
 */
export default function Footer() {
    return (
        <div
            className="relative h-[10vh]"
            style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
        >
            <footer
                className="fixed h-[10vh] bottom-0 left-0 w-full mx-auto flex items-center justify-center border-t bg-black border-white/10 select-none pointer-events-none"
            >
                <div className="h-screen px-10 flex items-center justify-center">
                    <p className="font-mono text-[10px] tracking-[0.2em] text-white/40 uppercase">
                        © Speculative Future Memories. 2026
                    </p>
                </div>
            </footer>
        </div>
    );
}
