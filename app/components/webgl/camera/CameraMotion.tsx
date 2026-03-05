"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MathUtils } from "three";
import { CameraState } from "./CameraState";

/**
 * CameraMotion transforms raw input from CameraState into smoothed, physical properties
 * like inertia and physical tilt. It runs every frame and calculates intermediate targets.
 */
export function CameraMotion() {
    const smoothVelocity = useRef(0);
    const smoothCursorX = useRef(0);
    const smoothCursorY = useRef(0);

    useFrame((_, delta) => {
        // ─── SMOOTHING ────────────────────────────────────────────────────────
        // Very low damping for cursor = slow, "floaty", cinematic lag
        smoothCursorX.current = MathUtils.damp(smoothCursorX.current, CameraState.cursorX, 2, delta);
        smoothCursorY.current = MathUtils.damp(smoothCursorY.current, CameraState.cursorY, 2, delta);

        // Faster damping for scroll velocity = responsive but weighted inertia
        smoothVelocity.current = MathUtils.damp(smoothVelocity.current, CameraState.velocity, 4, delta);
        const clampedVelocity = MathUtils.clamp(smoothVelocity.current, -3000, 3000);

        // ─── MAXMILKIN PARALLAX & TILT LOGIC ──────────────────────────────────

        // 1. Cursor Parallax (The core "floating" feel when hovering around)
        // Mouse X makes the camera roll slightly (tilt Z)
        const cursorTiltZ = smoothCursorX.current * -0.05;

        // Mouse Y pushes the camera slightly up/down (Polar offset)
        // Mouse X pushes the camera slightly left/right (Azimuthal offset)
        const cursorPolarOffset = smoothCursorY.current * -0.08;
        const cursorAzimuthalOffset = smoothCursorX.current * -0.08;

        // 2. Scroll Inertia (The "weight" when scrubbing through the timeline)
        const scrollTiltZ = clampedVelocity * 0.00002;
        const scrollPolarOffset = clampedVelocity * 0.000015;

        // ─── COMBINING ────────────────────────────────────────────────────────
        CameraState.tiltZ = cursorTiltZ + scrollTiltZ;
        CameraState.polarOffset = cursorPolarOffset + scrollPolarOffset;
        CameraState.azimuthalOffset = cursorAzimuthalOffset;

        // ─── DECAY ────────────────────────────────────────────────────────────
        CameraState.velocity = MathUtils.damp(CameraState.velocity, 0, 4, delta);
    });

    return null;
}
