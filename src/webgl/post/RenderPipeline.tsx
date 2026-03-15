import { EffectComposer, Bloom, Noise, Vignette, ChromaticAberration, Scanline, BrightnessContrast } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import { useControls } from 'leva'
import { useWebGLStore } from '@/store/useWebGLStore'
import { PixelOverlay } from './effects/PixelOverlay'

export default function RenderPipeline() {
  const intensity = useWebGLStore((state) => state.postFXIntensity)

  const { pixelSize, gridThickness, overlayOpacity } = useControls('Pixel Overlay', {
    pixelSize: { value: 3, min: 1, max: 20, step: 1 },
    gridThickness: { value: 0.20, min: 0, max: 0.2, step: 0.01 },
    overlayOpacity: { value: 0.8, min: 0, max: 1, step: 0.1 },
  })

  return (
    <EffectComposer enableNormalPass>
      <Bloom
        intensity={0.5 * intensity}
        luminanceThreshold={0.6}
        mipmapBlur
      />

      <PixelOverlay
        pixelSize={pixelSize}
        gridThickness={gridThickness}
        opacity={overlayOpacity}
      />

      <ChromaticAberration
        offset={[0.0001, 0.0001]}
        blendFunction={BlendFunction.NORMAL}
      />

      <Scanline
        density={0.85}
        opacity={0.08}
        blendFunction={BlendFunction.OVERLAY}
      />

      <Noise
        opacity={0.5}
        premultiply
        blendFunction={BlendFunction.NORMAL}
      />

      <Vignette
        eskil={false}
        offset={0.45}
        darkness={0.6}
      />
    </EffectComposer>
  )
}
