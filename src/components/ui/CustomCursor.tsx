'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useWebGLStore } from '@/store/useWebGLStore'

export default function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null)
    const mouse = useWebGLStore((state) => state.mouse)
    const setterRef = useRef<{ x: Function, y: Function } | null>(null)

    useEffect(() => {
        if (!cursorRef.current) return
        
        // Create high-performance setters
        setterRef.current = {
            x: gsap.quickSetter(cursorRef.current, 'x', 'px'),
            y: gsap.quickSetter(cursorRef.current, 'y', 'px')
        }
    }, [])

    useEffect(() => {
        if (!setterRef.current) return

        // Map normalized -1/1 back to screen coordinates
        const x = (mouse.x + 1) * window.innerWidth / 2
        const y = (-mouse.y + 1) * window.innerHeight / 2

        // Direct update via quickSetter (bypasses full GSAP engine overhead)
        setterRef.current.x(x)
        setterRef.current.y(y)
    }, [mouse])

    return (
        <div
            ref={cursorRef}
            className="fixed top-0 left-0 w-8 h-8 -ml-4 -mt-4 z-9999 flex items-center justify-center pointer-events-none"
        >
            <div className="w-6 h-6 bg-accent opacity-20" />
        </div>
    )
}
