import { EffectComposer, Bloom, Noise, Vignette, ChromaticAberration, Scanline } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import { useThree } from '@react-three/fiber'
import { useWebGLStore } from '@/store/useWebGLStore'
import CRTShaderPass from '../post/CRTShaderPass'

export default function RenderPipeline() {
  const intensity = useWebGLStore((state) => state.postFXIntensity)
  const { gl } = useThree()

  return (
    <EffectComposer enableNormalPass multisampling={gl.xr?.isPresenting ? 0 : 4}>
      <Bloom
        intensity={1.2 * intensity}
        luminanceThreshold={0.6}
        mipmapBlur
        luminanceSmoothing={0.98}
      />

      <ChromaticAberration
        offset={[0.0002 * intensity, 0.0002 * intensity]}
        blendFunction={BlendFunction.NORMAL}
      />

      <Scanline
        density={0.55}
        opacity={0.012}
        blendFunction={BlendFunction.SOFT_LIGHT}
      />

      <Noise
        opacity={0.32}
        premultiply
        blendFunction={BlendFunction.SCREEN}
      />

      <Vignette
        eskil={false}
        offset={0.45}
        darkness={0.6}
      />

      <CRTShaderPass intensity={0.098} />
    </EffectComposer>
  )
}
