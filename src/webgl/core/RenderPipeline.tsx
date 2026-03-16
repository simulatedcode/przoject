import { EffectComposer, Bloom, Noise, Vignette, ChromaticAberration, Scanline, BrightnessContrast } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import { useControls } from 'leva'
import { useFrame } from '@react-three/fiber'
import { useState } from 'react'
import { useWebGLStore } from '@/store/useWebGLStore'
import { PixelOverlay } from '../post/effects/PixelOverlay'
import { AdditiveBlending } from 'three'

export default function RenderPipeline() {
  const intensity = useWebGLStore((state) => state.postFXIntensity)

  const { pixelSize, gridThickness, overlayOpacity } = useControls('Pixel Overlay', {
    pixelSize: { value: 3, min: 1, max: 20, step: 1 },
    gridThickness: { value: 0.17, min: 0, max: 0.2, step: 0.01 },
    overlayOpacity: { value: 0.6, min: 0, max: 1, step: 0.1 },
  })

  const [dynamicNoiseOpacity, setDynamicNoiseOpacity] = useState(0.22)

  useFrame((state) => {
    const time = state.clock.elapsedTime
    setDynamicNoiseOpacity(0.32 + Math.sin(time * 2) * 0.02)
  })

  return (
    <EffectComposer enableNormalPass>
      <Bloom
        intensity={0.6 * intensity}
        luminanceThreshold={0.8}
        mipmapBlur
      />

      <PixelOverlay
        pixelSize={pixelSize}
        gridThickness={gridThickness}
        opacity={overlayOpacity}
      />

      <ChromaticAberration
        offset={[0.0002, 0.0002]}
        blendFunction={BlendFunction.NORMAL}
      />

      <Scanline
        density={0.55}
        opacity={0.012}
        blendFunction={BlendFunction.SOFT_LIGHT}
      />

      <Noise
        opacity={dynamicNoiseOpacity}
        premultiply
        blendFunction={BlendFunction.SCREEN}
      />

      <Vignette
        eskil={false}
        offset={0.45}
        darkness={0.6}
      />
    </EffectComposer>
  )
}
