'use client'

import { useMemo } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import { useWebGLStore } from '@/store/useWebGLStore'
import type { WebGLState } from '@/store/useWebGLStore'
import { CameraController } from './CameraController'
import { useActiveSection } from '../scene/scroll/useActiveSection'
import { getSectionState } from '../scene/director/getSectionState'

export default function CameraRig() {
  const { camera } = useThree()
  const scrollProgress = useWebGLStore((state: WebGLState) => state.scrollProgress)
  const mouse = useWebGLStore((state: WebGLState) => state.mouse)
  const phase = useWebGLStore((state: WebGLState) => state.phase)
  const mode = useWebGLStore((state: WebGLState) => state.mode)
  const introState = useWebGLStore((state: WebGLState) => state.introState)
  const controller = useMemo(() => new CameraController(), [])
  const section = useActiveSection(['hero', 'prologue', 'landscape', 'memories'])

  useFrame(() => {
    const { index, progress } = section.current
    const state = getSectionState(index, progress)

    const dynamicConfig = {
      x: state.camera.position[0],
      y: state.camera.position[1],
      z: state.camera.position[2],
      tx: state.camera.target[0],
      ty: state.camera.target[1],
      tz: state.camera.target[2],
      parallaxFactor: 0.15,
    }

    controller.update(camera, mouse, scrollProgress, dynamicConfig, introState, mode, phase)
  })

  return null
}
