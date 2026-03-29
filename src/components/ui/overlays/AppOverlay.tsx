'use client'

import { useWebGLStore } from '@/store/useWebGLStore'
import LoadingScreen from './LoadingScreen'

export default function AppOverlay() {
  const phase = useWebGLStore((s) => s.phase)

  return (
    <>
      {phase === 'loading' && <LoadingScreen />}
    </>
  )
}
