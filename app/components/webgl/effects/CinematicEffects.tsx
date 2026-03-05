"use client";

import React from "react";
import { EffectComposer, Bloom, Noise, HueSaturation, BrightnessContrast, Vignette } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";

export function CinematicEffects() {
    return (
        <EffectComposer enableNormalPass multisampling={4}>
            <Bloom blendFunction={BlendFunction.ADD} intensity={1.2} luminanceThreshold={0.5} luminanceSmoothing={0.9} mipmapBlur={true} />
            {/* Sci-Fi Color Grading: Desaturate slightly, tint towards cyan/green, boost contrast */}
            <HueSaturation blendFunction={BlendFunction.NORMAL} hue={0.05} saturation={-0.2} />
            <BrightnessContrast brightness={0.05} contrast={0.2} />
            <Vignette eskil={false} offset={0.08} darkness={0.5} />
            <Noise premultiply opacity={0.5 * 2} />
        </EffectComposer>
    );
}
