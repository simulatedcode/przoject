'use client'

import { useProgress } from '@react-three/drei'
import { useEffect, useRef } from 'react'
import { useWebGLStore } from '@/store/useWebGLStore'

export default function LoadingBridge() {
  const { progress } = useProgress()

  const setProgress = useWebGLStore((s) => s.setProgress)
  const setPhase = useWebGLStore((s) => s.setPhase)
  const phase = useWebGLStore((s) => s.phase)

  const triggered = useRef(false)

  useEffect(() => {
    setProgress(progress)

    if (progress >= 100 && phase === 'loading' && !triggered.current) {
      triggered.current = true
      setPhase('intro')
    }
  }, [progress, phase, setProgress, setPhase])

  return null
}
