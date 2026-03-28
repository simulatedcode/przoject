export const sections = [
    {
        id: 'hero',

        // 🎬 SHOT 1 — Arrival / Observation
        camera: {
            position: [0, 0.6, 5.2],
            target: [0, 1.2, 0],
        },

        shader: {
            brightness: [0.85, 0.95],
        },
    },

    {
        id: 'prologue',

        // 🎬 SHOT 2 — Slow push-in (emotional engagement)
        camera: {
            position: [0.15, 0.25, 3.2],
            target: [0, 0.1, 0],
        },

        shader: {
            brightness: [0.95, 1.05],
        },
    },

    {
        id: 'landscape',

        // 🎬 SHOT 3 — Lateral shift (breathing space)
        camera: {
            position: [-0.6, 0.35, 3.0],
            target: [0, 0.1, 0],
        },

        shader: {
            brightness: [1.0, 0.95],
        },
    },

    {
        id: 'memories',

        // 🎬 SHOT 4 — Pull back + center (reflection)
        camera: {
            position: [0, 0.1, 5.0],
            target: [0, 0.05, 0],
        },

        shader: {
            brightness: [0.95, 1.0],
        },
    },
]