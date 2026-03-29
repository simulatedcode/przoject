'use client'

import { useEffect } from 'react'
import { useProgress } from '@react-three/drei'
import { useWebGLStore } from '@/store/useWebGLStore'
import LoadingScreen from './LoadingScreen'

export default function AppOverlay() {
  const { progress } = useProgress()

  const phase = useWebGLStore((s) => s.phase)
  const setPhase = useWebGLStore((s) => s.setPhase)
  const setProgress = useWebGLStore((s) => s.setProgress)
  const loadingFinished = useWebGLStore((s) => s.loadingFinished)

  useEffect(() => {
    setProgress(progress)

    // 🔥 START INTRO WHEN VISUAL LOADING IS DONE
    if (loadingFinished && progress >= 100 && phase === 'loading') {
      setPhase('intro')
    }

    // 🔥 OPTIONAL: ensure landing only after full load
    if (progress >= 100 && phase === 'intro') {
      const id = setTimeout(() => {
        setPhase('landing')
      }, 500)

      return () => clearTimeout(id)
    }
  }, [progress, phase, setPhase, setProgress, loadingFinished])

  return (
    <>
      {phase === 'loading' && <LoadingScreen />}
    </>
  )
}
