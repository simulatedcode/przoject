'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Tracks how far a section element has scrolled through the viewport center.
 * Returns a value from 0→1 as the element enters the center of the screen,
 * then 1→0 as it exits — producing a symmetric entrance+exit curve.
 *
 * @param id - The DOM id of the section element to observe
 */
export function useSectionProgress(id: string): number {
    const [progress, setProgress] = useState(0)
    const rafRef = useRef<number | null>(null)
    const prevRef = useRef(0)

    useEffect(() => {
        const update = () => {
            const el = document.getElementById(id)
            if (!el) return

            const rect = el.getBoundingClientRect()
            const vh = window.innerHeight
            const center = vh * 0.5

            // How far the *center of the element* is from the center of the viewport
            const elCenter = rect.top + rect.height * 0.5
            const dist = Math.abs(elCenter - center)

            // Visible range: fade in over half a viewport on approach, fade out on departure
            const range = vh * 0.6

            const raw = 1 - Math.min(dist / range, 1)
            // smoothstep
            const p = raw * raw * (3 - 2 * raw)

            if (Math.abs(p - prevRef.current) > 0.001) {
                prevRef.current = p
                setProgress(p)
            }
        }

        const onScroll = () => {
            if (rafRef.current !== null) return
            rafRef.current = requestAnimationFrame(() => {
                rafRef.current = null
                update()
            })
        }

        update()
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => {
            window.removeEventListener('scroll', onScroll)
            if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
        }
    }, [id])

    return progress
}
