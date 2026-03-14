import { EffectComposer, Bloom, Noise, Vignette, ChromaticAberration, Scanline, BrightnessContrast } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import { useControls } from 'leva'
import { useWebGLStore } from '@/store/useWebGLStore'
import { PixelOverlay } from './effects/PixelOverlay'

export default function RenderPipeline() {
  const intensity = useWebGLStore((state) => state.postFXIntensity)

  const { pixelSize, gridThickness, overlayOpacity } = useControls('Pixel Overlay', {
    pixelSize: { value: 10.0, min: 1, max: 20, step: 1 },
    gridThickness: { value: 0.05, min: 0, max: 0.2, step: 0.01 },
    overlayOpacity: { value: 0.6, min: 0, max: 1, step: 0.1 },
  })

  return (
    <EffectComposer enableNormalPass>
      <Bloom
        intensity={1.5 * intensity}
        luminanceThreshold={0.4}
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
        density={1.8}
        opacity={0.8}
        blendFunction={BlendFunction.OVERLAY}
      />
      <Noise
        opacity={0.22}
        premultiply
        blendFunction={BlendFunction.SOFT_LIGHT}
      />
      <Vignette
        eskil={false}
        offset={0.25}
        darkness={0.2}
      />
    </EffectComposer>
  )
}
