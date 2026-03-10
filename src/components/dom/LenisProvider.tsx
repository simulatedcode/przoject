'use client'

import { useEffect } from "react"
import type { ReactNode } from "react"
import Lenis from "lenis"
import { useWebGLStore } from "@/store/useWebGLStore"

export default function LenisProvider({ children }: { children: ReactNode }) {
  const setProgress = useWebGLStore((state) => state.setProgress)

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

    lenis.on('scroll', (e: any) => {
      setProgress(e.progress)
    })

    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [setProgress])

  return children
}
