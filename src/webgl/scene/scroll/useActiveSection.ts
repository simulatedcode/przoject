'use client'

import { useEffect, useRef, useState } from 'react'

export function useActiveSection(ids: string[]) {
    const [, setTick] = useState(0)
    const state = useRef({
        index: 0,
        progress: 0,
    })

    useEffect(() => {
        const handleScroll = () => {
            const vh = window.innerHeight
            let changed = false

            ids.forEach((id, i) => {
                const el = document.getElementById(id)
                if (!el) return

                const rect = el.getBoundingClientRect()
                const top = rect.top
                const height = rect.height

                if (top <= vh * 0.5 && top + height > vh * 0.5) {
                    const raw = (vh * 0.5 - top) / height
                    const progress = Math.min(Math.max(raw, 0), 1)
                    
                    if (state.current.index !== i || state.current.progress !== progress) {
                        state.current.index = i
                        state.current.progress = progress
                        changed = true
                    }
                }
            })
            
            if (changed) {
                setTick(t => t + 1)
            }
        }

        handleScroll()
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [ids])

    return state
} 