'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { useWebGLStore } from '@/store/useWebGLStore'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()'

/* =========================
   JAKARTA TIME
========================= */
function useJakartaTime() {
  const [time, setTime] = useState('')

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Asia/Jakarta',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    })

    const updateTime = () => {
      setTime(formatter.format(new Date()))
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)

    return () => clearInterval(interval)
  }, [])

  return time
}

/* =========================
   TEXT SCRAMBLE (SAFE)
========================= */
function useTextScramble(
  text: string,
  duration: number,
  start: boolean,
  onComplete?: () => void
) {
  const [displayText, setDisplayText] = useState(text)

  const hasRun = useRef(false)
  const frameRef = useRef<number | null>(null)

  useEffect(() => {
    if (!start || hasRun.current) return
    hasRun.current = true

    const startTime = performance.now()

    const animate = () => {
      const elapsed = performance.now() - startTime
      const progress = Math.min(elapsed / duration, 1)

      const revealCount = Math.floor(progress * text.length)

      const scrambled = text
        .split('')
        .map((_, i) => {
          if (i < revealCount) return text[i]
          return CHARS[Math.floor(Math.random() * CHARS.length)]
        })
        .join('')

      setDisplayText(progress < 1 ? scrambled : text)

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate)
      } else {
        // ✅ SAFE CALLBACK (prevents render-phase update error)
        if (onComplete) {
          setTimeout(onComplete, 0)
        }
      }
    }

    frameRef.current = requestAnimationFrame(animate)

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current)
    }
  }, [start, text, duration, onComplete])

  return displayText
}

/* =========================
   HEADER
========================= */
export default function Header() {
  const time = useJakartaTime()

  // 🔴 GLOBAL TIMELINE
  const phase = useWebGLStore((s) => s.phase)

  const headerStarted = useWebGLStore((s) => s.headerStarted)
  const startHeader = useWebGLStore((s) => s.startHeader)

  const headerComplete = useWebGLStore((s) => s.headerAnimationComplete)
  const completeHeader = useWebGLStore((s) => s.completeHeader)

  // 🔥 START HEADER WHEN INTRO PHASE BEGINS
  useEffect(() => {
    if (phase === 'intro' && !headerStarted) {
      startHeader()
    }
  }, [phase, headerStarted, startHeader])

  // 🔥 SCRAMBLE TEXT (CONTROLLED)
  const displayText = useTextScramble(
    'PRZOJECT',
    1200,
    headerStarted,
    () => {
      if (!headerComplete) {
        completeHeader()
      }
    }
  )

  return (
    <header className="fixed w-full z-99 px-6 py-4 flex items-center justify-between">
      {/* LEFT */}
      <Link
        href="/"
        className="font-bold tracking-widest uppercase text-white/80 hover:text-white transition-colors duration-200"
      >
        {displayText}
      </Link>

      {/* RIGHT */}
      <div className="text-sm text-white/60 font-departure text-right">
        <span className="text-[9px] block">Local time</span>
        <p>{time}</p>
      </div>
    </header>
  )
}
