'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useWebGLStore } from '@/store/useWebGLStore'

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const mouse = useWebGLStore((state) => state.mouse)
  const setX = useRef<((val: number) => void) | null>(null)
  const setY = useRef<((val: number) => void) | null>(null)

  useEffect(() => {
    if (!cursorRef.current) return

    const xSetter = gsap.quickSetter(cursorRef.current, 'x', 'px')
    const ySetter = gsap.quickSetter(cursorRef.current, 'y', 'px')
    setX.current = xSetter as (val: number) => void
    setY.current = ySetter as (val: number) => void
  }, [])

  useEffect(() => {
    if (!setX.current || !setY.current) return

    const x = (mouse.x + 1) * window.innerWidth / 2
    const y = (-mouse.y + 1) * window.innerHeight / 2

    setX.current(x)
    setY.current(y)
  }, [mouse])

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-8 h-8 -ml-4 -mt-4 z-9999 flex items-center justify-center pointer-events-none"
    >
      <div className="w-6 h-6 bg-accent opacity-90" />
    </div>
  )
}
