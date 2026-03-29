'use client'

import { useWebGLStore } from '@/store/useWebGLStore'
import { useEffect, useRef, useState } from 'react'

export default function LoadingScreen() {
  const progress = useWebGLStore((s) => s.progress)

  const [displayProgress, setDisplayProgress] = useState(0)

  const progressRef = useRef(progress)
  const startTime = useRef<number | null>(null)

  const setLoadingFinished = useWebGLStore((s) => s.setLoadingFinished)
  const loadingFinished = useWebGLStore((s) => s.loadingFinished)

  // keep latest real progress
  useEffect(() => {
    progressRef.current = progress
  }, [progress])

  // detect visual completion
  useEffect(() => {
    if (progress === 100 && displayProgress >= 99.9 && !loadingFinished) {
      setLoadingFinished(true)
    }
  }, [progress, displayProgress, loadingFinished, setLoadingFinished])

  // smooth + time-based loop
  useEffect(() => {
    let raf: number

    const update = () => {
      // safe initialization (no impure render)
      if (startTime.current === null) {
        startTime.current = performance.now()
      }

      setDisplayProgress((prev) => {
        const elapsed =
          startTime.current !== null
            ? (performance.now() - startTime.current) / 1000
            : 0

        // time-driven progress (0 → 95 over ~1.2s)
        const timeProgress = Math.min((elapsed / 1.2) * 95, 95)

        // combine real + time
        const target =
          progressRef.current === 100
            ? 100
            : Math.max(progressRef.current, timeProgress)

        const diff = target - prev

        // snap when close
        if (Math.abs(diff) < 0.1) return target

        return prev + diff * 0.08
      })

      raf = requestAnimationFrame(update)
    }

    update()

    return () => cancelAnimationFrame(raf)
  }, [])

  const clamped =
    progress === 100
      ? 100
      : Math.min(displayProgress, 99)

  const BAR_LENGTH = 30
  const activeChars = Math.floor((clamped / 100) * BAR_LENGTH)

  const getStatus = (p: number) => {
    if (p < 25) return 'INITIALIZING_KERNEL...'
    if (p < 50) return 'LOADING_ASSET_BUFFER...'
    if (p < 75) return 'COMPILING_SHADER_PIPELINE...'
    if (p < 100) return 'RECONSTRUCTING_NEURAL_MAPPING...'
    return 'SYSTEM_READY'
  }

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black text-white font-mono uppercase tracking-widest text-[11px]">
      {/* SCANLINE OVERLAY */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] z-101 bg-size-[100%_2px,3px_100%] opacity-20" />

      <div className="w-80 space-y-4">
        <div className="flex justify-between items-end border-b border-white/10 pb-1 opacity-60">
          <span>PRZOJECT</span>
          <span></span>
        </div>

        <div className="space-y-1">
          <div className="flex justify-between items-center text-white/40">
            <span>{getStatus(clamped)}</span>
            <span>{Math.floor(clamped)}%</span>
          </div>

          <div className="text-[13px] drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] font-mono">
            <span className="text-white/90">
              [{'⠶'.repeat(activeChars)}
            </span>
            <span className="text-white/20">
              {'⠶'.repeat(BAR_LENGTH - activeChars)}]
            </span>
          </div>
        </div>

        <div className="text-white/20 pt-2 flex items-center gap-1">
          <span className="animate-pulse">_</span>
          <span>AWAITING_INPUT</span>
        </div>
      </div>
    </div>
  )
}
