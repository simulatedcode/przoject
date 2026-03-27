'use client'

import { useEffect } from 'react'
import { useWebGLStore } from '@/store/useWebGLStore'

export function useMousePosition() {
    const setMouse = useWebGLStore((state) => state.setMouse)

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            // Normalize to -1 to 1
            const x = (event.clientX / window.innerWidth) * 2 - 1
            const y = -(event.clientY / window.innerHeight) * 2 + 1
            setMouse({ x, y })
        }

        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [setMouse])

    return null
}

export function MouseTracker() {
    useMousePosition()
    return null
}
