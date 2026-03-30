'use client'

import { useEffect } from 'react'
import { useWebGLStore } from '@/store/useWebGLStore'

export function useViewport() {
  const setViewport = useWebGLStore((state) => state.setViewport)

  useEffect(() => {
    const handleResize = () => {
      setViewport({
        width: window.innerWidth,
        height: window.innerHeight,
        dpr: window.devicePixelRatio,
      })
    }

    handleResize()

    window.addEventListener('resize', handleResize)
    window.addEventListener('devicepixelratiochange', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('devicepixelratiochange', handleResize)
    }
  }, [setViewport])

  return null
}

export function ViewportTracker() {
  useViewport()
  return null
}
