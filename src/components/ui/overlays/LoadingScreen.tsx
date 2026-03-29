'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import * as THREE from 'three'
import { useWebGLStore } from '@/store/useWebGLStore'

import CRTShaderPass from '@/components/canvas/post/CRTShaderPass'

export default function LoadingScreen() {
  const progress = useWebGLStore((s) => s.progress)
  const setLoadingFinished = useWebGLStore((s) => s.setLoadingFinished)
  const loadingFinished = useWebGLStore((s) => s.loadingFinished)

  const [displayProgress, setDisplayProgress] = useState(0)

  const progressRef = useRef(progress)
  const startTime = useRef<number | null>(null)

  // keep latest progress
  useEffect(() => {
    progressRef.current = progress
  }, [progress])

  // smooth cinematic progression
  useEffect(() => {
    let raf: number

    const update = () => {
      if (startTime.current === null) {
        startTime.current = performance.now()
      }

      let currentProgress = 0

      setDisplayProgress((prev) => {
        const elapsed =
          startTime.current !== null
            ? (performance.now() - startTime.current) / 1000
            : 0

        const timeProgress = Math.min((elapsed / 1.2) * 95, 95)

        const target =
          progressRef.current >= 100
            ? 100
            : Math.max(progressRef.current, timeProgress)

        const next = THREE.MathUtils.lerp(prev, target, 0.08)
        currentProgress = next

        if (Math.abs(target - next) < 0.1) return target

        return next
      })

      // Trigger store side-effect outside the state updater
      if (currentProgress > 99.9 && progressRef.current === 100 && !loadingFinished) {
        setLoadingFinished(true)
      }

      raf = requestAnimationFrame(update)
    }

    update()
    return () => cancelAnimationFrame(raf)
  }, [loadingFinished, setLoadingFinished])

  const BAR_LENGTH = 30
  const activeChars = Math.floor((displayProgress / 100) * BAR_LENGTH)

  const getStatus = (p: number) => {
    if (p < 25) return 'INITIALIZING_KERNEL...'
    if (p < 50) return 'LOADING_ASSET_BUFFER...'
    if (p < 75) return 'COMPILING_SHADER_PIPELINE...'
    if (p < 100) return 'RECONSTRUCTING_NEURAL_MAPPING...'
    return 'SYSTEM_READY'
  }

  return (
    <div className="fixed inset-0 z-100 bg-[#0A0F10] overflow-hidden">
      <Canvas camera={{ position: [0, 0, 4], fov: 70 }} dpr={[1, 1.5]}>
        <color attach="background" args={['#0A0F10']} />

        <group scale={1}>
          {/* HEADER */}
          <Text
            position={[-1.5, 1.0, 0]}
            fontSize={0.07}
            fillOpacity={0.6}
            anchorX="left"
            font="/fonts/DepartureMono-Regular.woff"
          >
            PRZOJECT_OS_V1.6.1 // SYSTEM_INIT
          </Text>

          {/* STATUS LOG */}
          <Text
            position={[-1.5, 0.5, 0]}
            fontSize={0.10}
            fillOpacity={0.4}
            anchorX="left"
            font="/fonts/DepartureMono-Regular.woff"
          >
            {getStatus(displayProgress)}
          </Text>

          {/* PERCENTAGE */}
          <Text
            position={[1.5, 0.5, 0]}
            fontSize={0.10}
            fillOpacity={0.4}
            anchorX="right"
            font="/fonts/DepartureMono-Regular.woff"
          >
            {Math.floor(displayProgress)}%
          </Text>

          {/* PROGRESS BAR (Refined Spacing) */}
          <group position={[-1.5, 0.1, 0]}>
            {/* Outline / Empty Bar */}
            <Text
              fontSize={0.16}
              fillOpacity={0.05}
              anchorX="left"
              font="/fonts/DepartureMono-Regular.woff"
            >
              [{'⠶'.repeat(BAR_LENGTH)}]
            </Text>

            {/* Filled Part */}
            <Text
              fontSize={0.16}
              fillOpacity={0.9}
              anchorX="left"
              font="/fonts/DepartureMono-Regular.woff"
            >
              {'⠶'.repeat(activeChars)}
            </Text>

            {/* The leading '[' needs to be accounted for if it's the same color */}
            {/* Actually, let's keep it simple: */}
            <Text
              fontSize={0.16}
              fillOpacity={1.0}
              anchorX="left"
              font="/fonts/DepartureMono-Regular.woff"
              position={[-0.1, 0, 0]} // Nudge to match outline
            >
              [
            </Text>
          </group>

          {/* FOOTER */}
          <Text
            position={[-1.5, -0.6, 0]}
            fontSize={0.07}
            fillOpacity={0.15}
            anchorX="left"
            font="/fonts/DepartureMono-Regular.woff"
          >
            _ AWAITING_INPUT_SEQUENCE...
          </Text>
        </group>

        <EffectComposer multisampling={0}>
          <Bloom intensity={0.05} luminanceThreshold={0.4} radius={0.7} />
          <CRTShaderPass  intensity={0.095}/>
        </EffectComposer>
      </Canvas>
    </div>
  )
}
