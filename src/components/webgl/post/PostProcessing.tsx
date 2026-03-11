import {
    EffectComposer,
    Bloom,
    Noise,
    Vignette,
    ChromaticAberration,
    Scanline
} from '@react-three/postprocessing'

interface PostProcessingProps {
    performance: number
}

export default function PostProcessing({ performance }: PostProcessingProps) {

    return (
        <EffectComposer enableNormalPass={performance > 0.5}>

            <Bloom
                intensity={0.45 * performance}
                luminanceThreshold={0.4}
                luminanceSmoothing={0.9}
                mipmapBlur={performance > 0.5}
            />

            <Noise opacity={0.18 * performance} />

            <Scanline
                opacity={0.35 * performance}
                density={2}
            />

            <Vignette
                eskil={false}
                offset={0.1}
                darkness={0.7}
            />

            <ChromaticAberration
                offset={[0.001 * performance, 0.002 * performance]}
            />

        </EffectComposer>
    )
}