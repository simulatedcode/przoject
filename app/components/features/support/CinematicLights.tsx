"use client";

import React from "react";

export function CinematicLights() {
    return (
        <>
            <ambientLight intensity={0.05} />
            <pointLight position={[0, 4, 15]} color="#69967a" intensity={3} distance={20} decay={2} />
            <directionalLight
                position={[38, 8, 0.5]}
                color="#84A990"
                intensity={2.5}
                castShadow
                shadow-mapSize={[4096, 4096]}
                shadow-bias={-0.0001}
                shadow-normalBias={0.05}
            >
                <orthographicCamera attach="shadow-camera" args={[-15, 15, 15, -15, 20, 100]} />
            </directionalLight>
            <directionalLight position={[20, 10, -10]} intensity={0.5} color="#69967a" />
        </>
    );
}
