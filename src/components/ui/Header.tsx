'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useWebGLStore } from '@/store/useWebGLStore'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()'

function useJakartaTime() {
  const [time, setTime] = useState<string>('')

  useEffect(() => {
    const updateTime = () => {
      const formatter = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Asia/Jakarta',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })

      setTime(formatter.format(new Date()))
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)

    return () => clearInterval(interval)
  }, [])

  return time
}

function useTextScramble(text: string, duration: number = 2000) {
  const [displayText, setDisplayText] = useState(text)
  const [isAnimating, setIsAnimating] = useState(true)

  useEffect(() => {
    let frame = 0
    const startTime = Date.now()

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)

      if (progress < 0.5) {
        const scrambled = text
          .split('')
          .map((char, i) => {
            if (i < Math.floor(progress * 2 * text.length)) {
              return text[i]
            }
            return CHARS[Math.floor(Math.random() * CHARS.length)]
          })
          .join('')
        setDisplayText(scrambled)
      } else {
        setDisplayText(text)
        setIsAnimating(false)
      }

      if (progress < 1) {
        frame = requestAnimationFrame(animate)
      }
    }

    frame = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(frame)
  }, [text, duration])

  return { displayText, isAnimating }
}

export default function Header() {
  const time = useJakartaTime()
  const setHeaderAnimationComplete = useWebGLStore((s) => s.setHeaderAnimationComplete)
  const { displayText, isAnimating } = useTextScramble('PRZOJECT', 1500)

  useEffect(() => {
    if (!isAnimating) {
      setHeaderAnimationComplete(true)
    }
  }, [isAnimating, setHeaderAnimationComplete])

  return (
    <header className="fixed w-full z-100 px-6 py-4 flex items-center justify-between">
      {/* LEFT */}
      <Link href="/" className='font-bold tracking-widest uppercase text-white/80 hover:text-white transition-colors duration-200'>
        {displayText}
      </Link>

      {/* RIGHT */}
      <div className="text-sm text-white/60 font-departure">
        <span className="text-[9px]">Local time</span>
        <p>{time}</p>
      </div>
    </header>
  )
}
