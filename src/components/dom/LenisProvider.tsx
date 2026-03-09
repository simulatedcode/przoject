'use client'

import { useEffect } from "react"
import type { ReactNode } from "react"
import Lenis from "lenis"

export default function LenisProvider({ children }: { children: ReactNode }) {

  useEffect(() => {

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches

    if (prefersReducedMotion) {
      return
    }

    const lenis = new Lenis()
    let rafId = 0

    function raf(time: number) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }

    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
    }

  }, [])

  return children
}
