'use client'

import { useEffect, useRef } from 'react'

type MouseState = {
    x: number
    y: number
}

export function useMouse(): MouseState {

    const mouse = useRef<MouseState>({
        x: 0,
        y: 0
    })

    useEffect(() => {

        const handleMouseMove = (event: MouseEvent) => {

            const x = (event.clientX / window.innerWidth) * 2 - 1
            const y = -(event.clientY / window.innerHeight) * 2 + 1

            mouse.current.x = x
            mouse.current.y = y
        }

        window.addEventListener('mousemove', handleMouseMove)

        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
        }

    }, [])

    return mouse.current
}