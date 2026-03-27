'use client'

import { useRef, useEffect, useState, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import * as THREE from 'three'
import { ScreenMaterial } from './ScreenMaterial'
import { GlassMaterial } from './GlassMaterial'
import { useScreenPlayback } from './useScreenPlayback'
import { useIntroSequence } from './useIntroSequence'
import { useWebGLStore } from '@/store/useWebGLStore'
import { extend } from '@react-three/fiber'

extend({ ScreenMaterial, GlassMaterial })

const IMAGES = [
  '/images/panorama.png',
  '/images/ohm.png',
  '/images/helas.png'
]

export default function BigScreen() {
  const shaderRef = useRef<any>(null)
  const glassRef = useRef<any>(null)
  const lightRef = useRef<THREE.RectAreaLight>(null)

  const textures = useTexture(IMAGES)

  const { size } = useThree()
  const aspect = size.width / size.height
  const isMobile = aspect < 1.0

  const firstTexture = textures[0] as THREE.Texture
  const { width, height } = (firstTexture.image as any) || { width: 3840, height: 1100 }
  const textureRatio = width / height

  const BASE_HEIGHT = isMobile ? 4.5 : 7.5
  const dynamicWidth = BASE_HEIGHT * textureRatio
  const dynamicHeight = BASE_HEIGHT

  useEffect(() => {
    textures.forEach((tex) => {
      tex.colorSpace = THREE.SRGBColorSpace
      tex.wrapS = THREE.RepeatWrapping
      tex.wrapT = THREE.RepeatWrapping
      tex.minFilter = THREE.LinearFilter
      tex.magFilter = THREE.LinearFilter
      tex.generateMipmaps = false
    })
  }, [textures])

  const introState = useIntroSequence(shaderRef)
  const setIntroState = useWebGLStore((s) => s.setIntroState)

  useEffect(() => {
    const interval = setInterval(() => {
      const s = introState.current
      setIntroState({
        phase: s.phase,
        progress: s.progress,
        glitch: s.glitch,
        flash: s.flash,
        done: s.done,
      })
    }, 50)
    return () => clearInterval(interval)
  }, [introState, setIntroState])

  const [playbackEnabled, setPlaybackEnabled] = useState(false)

  useEffect(() => {
    const handle = setInterval(() => {
      if (introState.current.done && !playbackEnabled) {
        setPlaybackEnabled(true)
      }
    }, 100)
    return () => clearInterval(handle)
  }, [introState, playbackEnabled])

  useScreenPlayback(textures, shaderRef, playbackEnabled)

  const timer = useMemo(() => new THREE.Timer(), [])

  useFrame(() => {
    timer.update()
    if (!shaderRef.current || !lightRef.current) return
    const brightness = shaderRef.current.uniforms.uBrightness.value || 1.8
    lightRef.current.intensity = 2.0 + brightness * 1.0

    if (glassRef.current) {
      glassRef.current.uniforms.uTime.value = timer.getElapsed()
    }
  }, 1)

  return (
    <group position={[0, 3.8, -16]}>
      <mesh position={[0, 0, 0]}>
        <planeGeometry args={[dynamicWidth, dynamicHeight]} />
        <screenMaterial
          ref={shaderRef}
          transparent
          uResolution={[3840, 1100]}
          side={THREE.DoubleSide}
        />
      </mesh>

      <mesh position={[0, 0, -0.05]}>
        <planeGeometry args={[dynamicWidth * 1.05, dynamicHeight * 1.05]} />
        <meshBasicMaterial
          transparent
          opacity={0.04}
          color="#aaccff"
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      <mesh position={[0, 0, 0.005]}>
        <planeGeometry args={[dynamicWidth + 0.05, dynamicHeight + 0.05]} />
        <glassMaterial
          ref={glassRef}
          transparent
          uColor="#ccddff"
          uOpacity={0.08}
          uResolution={[1920, 1080]}
        />
      </mesh>

      <rectAreaLight
        ref={lightRef}
        position={[0, 0, 0.5]}
        width={dynamicWidth}
        height={dynamicHeight}
        intensity={35}
        color="#ffffff"
      />

      <group>
        <mesh position={[-dynamicWidth / 2, dynamicHeight / 2, 0.01]}>
          <boxGeometry args={[0.5, 0.02, 0.05]} />
          <meshStandardMaterial color="#fff" emissive="#fff" emissiveIntensity={2} />
        </mesh>
        <mesh position={[-dynamicWidth / 2, dynamicHeight / 2, 0.01]}>
          <boxGeometry args={[0.02, 0.5, 0.05]} />
          <meshStandardMaterial color="#fff" emissive="#fff" emissiveIntensity={2} />
        </mesh>

        <mesh position={[dynamicWidth / 2, -dynamicHeight / 2, 0.01]}>
          <boxGeometry args={[0.5, 0.02, 0.05]} />
          <meshStandardMaterial color="#fff" emissive="#fff" emissiveIntensity={2} />
        </mesh>
        <mesh position={[dynamicWidth / 2, -dynamicHeight / 2, 0.01]}>
          <boxGeometry args={[0.02, 0.5, 0.05]} />
          <meshStandardMaterial color="#fff" emissive="#fff" emissiveIntensity={2} />
        </mesh>
      </group>
    </group>
  )
}
