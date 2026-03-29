'use client'

import { useEffect } from 'react'
import gsap from 'gsap'
import { useWebGLStore } from '@/store/useWebGLStore'

export function useIntroSequence() {
  const phase = useWebGLStore((s) => s.phase)
  const setPhase = useWebGLStore((s) => s.setPhase)
  const setMode = useWebGLStore((s) => s.setMode)

  useEffect(() => {
    if (phase !== 'intro') return

    const tl = gsap.timeline({
      onComplete: () => {
        setPhase('landing')
      },
    })

    // 🎬 STORY TIMELINE (you will refine later)

    tl.call(() => setMode('BOOT'), [], 0)

    tl.call(() => setMode('LANDSCAPE_ANALYSIS'), [], 0.02)

    tl.call(() => setMode('SUBJECT_DETECTION'), [], 0.15)

    tl.call(() => setMode('MEMORY_RECONSTRUCTION'), [], 0.3)

    tl.call(() => setMode('SYSTEM_COLLAPSE'), [], 0.45)

    return () => {
      tl.kill()
    }
  }, [phase, setPhase, setMode])
}
