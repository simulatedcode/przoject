'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

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

export default function Header() {
  const time = useJakartaTime()

  return (
    <header className="fixed w-full z-100 px-6 py-4 flex items-center justify-between">
      {/* LEFT */}
      <Link href="/" className='font-bold tracking-widest uppercase text-white/80 hover:text-white transition-colors duration-200'>PRZOJECT</Link>

      {/* RIGHT */}
      <div className="text-sm text-white/60 font-departure">
        <span className="text-[9px]">Local time</span>
        <p>{time}</p>
      </div>
    </header>
  )
}
