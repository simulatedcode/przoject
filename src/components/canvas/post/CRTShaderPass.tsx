'use client'

import { forwardRef, useEffect, useMemo } from 'react'
import { useThree } from '@react-three/fiber'
import { CRTEffect } from './effects/CRTEffect'
import { useWebGLStore } from '@/store/useWebGLStore'
import type { Effect } from 'postprocessing'

const MODE_MAP = {
  BOOT: 'BOOT',
  ANALYSIS: 'ANALYSIS',
  MEMORY: 'MEMORY',
  COLLAPSE: 'COLLAPSE',
  LANDSCAPE_ANALYSIS: 'LANDSCAPE_ANALYSIS',
} as const

interface CRTShaderPassProps {
  intensity?: number
}

const CRTShaderPass = forwardRef<Effect, CRTShaderPassProps>(({ intensity = 1.0 }, ref) => {
  const { size } = useThree()

  const mode = useWebGLStore((s) => s.mode)
  const glitch = useWebGLStore((s) => s.introState.glitch)

  const effect = useMemo(() => new CRTEffect({ intensity }), [intensity])

  useEffect(() => {
    effect.setResolution(size.width, size.height)
  }, [effect, size])

  useEffect(() => {
    effect.setMode(MODE_MAP[mode])
  }, [effect, mode])

  useEffect(() => {
    effect.setGlitch(glitch)
  }, [effect, glitch])

  return <primitive ref={ref} object={effect} dispose={null} />
})

CRTShaderPass.displayName = 'CRTShaderPass'

export default CRTShaderPass
