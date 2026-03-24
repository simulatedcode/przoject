'use client'

import { useMemo } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import { useWebGLStore } from '@/store/useWebGLStore'
import { CameraController } from './CameraController'

const CAMERA_CONFIG = {
  x: 0,
  y: 0.65,
  z: 6.8,
  tx: 0.1,
  ty: 0.65,
  tz: 0,
  parallaxFactor: 0.25,
}

export default function CameraRig() {
 
  const { camera } = useThree()
  const scrollProgress = useWebGLStore((state: any) => state.scrollProgress)
  const mouse = useWebGLStore((state: any) => state.mouse)
  const controller = useMemo(() => new CameraController(), [])
 
  useFrame(() => {
    controller.update(camera, mouse, scrollProgress, CAMERA_CONFIG)
  })
 
  return null
}
