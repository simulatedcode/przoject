"use client";

import React from "react";

export function CinematicLights() {
    return (
        <>
            <ambientLight intensity={0.05} />
            <pointLight position={[0, 4, 15]} color="#69967a" intensity={2.2} distance={15} decay={2} />
            <directionalLight
                position={[20, 8, 0.5]}
                color="#84A990"
                intensity={2.5}
                castShadow
                shadow-mapSize={[2048, 2048]}
                shadow-bias={-0.00015}
                shadow-normalBias={0.04}
            >
                <orthographicCamera attach="shadow-camera" args={[-12, 12, 12, -12, 1, 100]} />
            </directionalLight>
            <directionalLight position={[10, 25, -10]} intensity={0.5} color="#69967a" />
        </>
    );
}
