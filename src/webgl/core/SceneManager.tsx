'use client'

import { Suspense } from 'react'
import { useWebGLStore } from '@/store/useWebGLStore'
import CameraRig from '../camera/CameraRig'
import LightingSystem from '../systems/LightingSystem'
import Models from '../scene/Models'
import Ground from '../scene/Ground'

export default function SceneManager() {
  const mode = useWebGLStore((state) => state.mode)

  return (
    <>
      <CameraRig />
      <LightingSystem />
      
      <Suspense fallback={null}>
        <Models />
        <Ground />
      </Suspense>
    </>
  )
}
