'use client'

import { useWebGLStore } from '@/store/useWebGLStore'
import { useEffect, useRef, useState } from 'react'

export default function LoadingScreen() {
  const progress = useWebGLStore((s) => s.progress)

  const [displayProgress, setDisplayProgress] = useState(0)

  const progressRef = useRef(progress)
  const startTime = useRef<number | null>(null)

  // keep latest real progress
  useEffect(() => {
    progressRef.current = progress
  }, [progress])

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

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black text-white">
      <div className="w-75">
        <p className="mb-2 text-sm opacity-70">INITIALIZING SYSTEM</p>

        <div className="h-1 w-full bg-white/20 overflow-hidden">
          <div
            className="h-full bg-white"
            style={{ width: `${clamped}%` }}
          />
        </div>

        <p className="mt-2 text-xs opacity-50">
          {Math.floor(clamped)}%
        </p>
      </div>
    </div>
  )
}
