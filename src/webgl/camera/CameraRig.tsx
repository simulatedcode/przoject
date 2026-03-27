'use client'

import { useMemo } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import { useWebGLStore } from '@/store/useWebGLStore'
import { CameraController } from './CameraController'

const CAMERA_CONFIG = {
  x: 0,
  y: 0.65,
  z: 4.5,
  tx: 0,
  ty: 0.65,
  tz: 0,
  parallaxFactor: 0.15,
}

export default function CameraRig() {

  const { camera } = useThree()
  const scrollProgress = useWebGLStore((state: any) => state.scrollProgress)
  const mouse = useWebGLStore((state: any) => state.mouse)
  const introState = useWebGLStore((state: any) => state.introState)
  const controller = useMemo(() => new CameraController(), [])

  useFrame(() => {
    controller.update(camera, mouse, scrollProgress, CAMERA_CONFIG, introState)
  })

  return null
}
