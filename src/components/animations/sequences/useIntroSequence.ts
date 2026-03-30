'use client'

import { useEffect } from 'react'
import gsap from 'gsap'
import { useWebGLStore } from '@/store/useWebGLStore'

export function useIntroSequence() {
  const phase = useWebGLStore((s) => s.phase)
  const setPhase = useWebGLStore((s) => s.setPhase)
  const setMode = useWebGLStore((s) => s.setMode)
  const setIntroState = useWebGLStore((s) => s.setIntroState)

  useEffect(() => {
    if (phase !== 'intro') return

    const tl = gsap.timeline({
      onComplete: () => {
        setPhase('landing')
      },
    })

    // 🎬 STORY TIMELINE
    // 0.0s: BOOT
    tl.call(() => setMode('BOOT'), [], 0)
    
    // Glitch Burst at BOOT
    tl.to({}, {
      duration: 0.4,
      onStart: () => setIntroState({ glitch: 0.4 }),
      onComplete: () => setIntroState({ glitch: 0 })
    }, 0.1)

    // 1.5s: ANALYSIS
    tl.call(() => setMode('ANALYSIS'), [], 1.5)
    
    // Quick Glitch at transition
    tl.to({}, {
      duration: 0.1,
      onStart: () => setIntroState({ glitch: 0.2 }),
      onComplete: () => setIntroState({ glitch: 0 })
    }, 1.5)

    // 3.0s: MEMORY
    tl.call(() => setMode('MEMORY'), [], 3.0)

    // 4.5s: COLLAPSE
    tl.call(() => setMode('COLLAPSE'), [], 4.5)
    
    // Long glitch burst during COLLAPSE
    tl.to({}, {
      duration: 0.8,
      onStart: () => setIntroState({ glitch: 0.4 }),
      onComplete: () => setIntroState({ glitch: 0 })
    }, 4.6)

    return () => {
      tl.kill()
    }
  }, [phase, setPhase, setMode, setIntroState])
}
