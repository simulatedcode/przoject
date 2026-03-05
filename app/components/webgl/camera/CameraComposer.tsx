"use client";

import { CameraInput } from "./CameraInput";
import { CameraMotion } from "./CameraMotion";
import { CameraRig, type CameraData } from "./CameraRig";

interface CameraComposerProps {
    setCameraData: (data: CameraData) => void;
}

/**
 * The Studio-Level Camera Architecture Composer.
 * 
 * Flow:
 * 1. CameraInput: Captures raw GSAP/DOM triggers -> Updates State
 * 2. CameraMotion: Evaluates physics/momentum -> Updates State Targets
 * 3. CameraRig: Consumes Target State -> Applies directly to Three.js Camera
 */
export function CameraComposer({ setCameraData }: CameraComposerProps) {
    return (
        <>
            <CameraInput />
            <CameraMotion />
            <CameraRig setCameraData={setCameraData} />
        </>
    );
}
