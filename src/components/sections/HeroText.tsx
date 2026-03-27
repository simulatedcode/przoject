'use client'

import { useSectionProgress } from '@/webgl/scene/utils/useSectionProgress'

export default function HeroText() {
  const t = useSectionProgress('hero')

  const opacity = t
  const y = 30 * (1 - t)
  const blur = (1 - t) * 8

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none px-6 mix-blend-exclusion">
      <div
        style={{
          opacity,
          transform: `translateY(${y}px)`,
          filter: `blur(${blur}px)`,
          transition: 'none',
        }}
        className="text-center mix-blend-exclusion"
      >
        <h1 className="font-departure text-3xl md:text-5xl lg:text-6xl uppercase tracking-widest text-white/90 mix-blend-exclusion">
          Speculative Future Memories
        </h1>
      </div>
    </div>
  )
}