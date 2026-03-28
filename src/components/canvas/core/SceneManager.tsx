'use client'

import CameraRig from '../camera/CameraRig'
import LightingSystem from '../systems/LightingSystem'
import MainScene from '../scene/MainScene'

export default function SceneManager() {
  return (
    <>
      <CameraRig />
      <LightingSystem />
      <MainScene />
    </>
  )
}
