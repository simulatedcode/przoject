import { EffectComposer, Bloom, Noise, Vignette, ChromaticAberration, Scanline } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import { useFrame } from '@react-three/fiber'
import { useState } from 'react'
import { useWebGLStore } from '@/store/useWebGLStore'

export default function RenderPipeline() {
  const intensity = useWebGLStore((state) => state.postFXIntensity)

  const [dynamicNoiseOpacity, setDynamicNoiseOpacity] = useState(0.22)

  useFrame((state) => {
    const time = state.clock.elapsedTime
    setDynamicNoiseOpacity(0.32 + Math.sin(time * 2) * 0.02)
  })

  return (
    <EffectComposer enableNormalPass>
      <Bloom
        intensity={1.2 * intensity}
        luminanceThreshold={0.5}
        mipmapBlur
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
