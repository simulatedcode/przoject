// app/components/webgl/camera/CameraState.ts
export const CameraState = {
    // Scroll progress (0 to 1)
    progress: 0,

    // Scroll speed / velocity
    velocity: 0,

    // Cursor position normalized (-1 to 1)
    cursorX: 0,
    cursorY: 0,

    // Angles
    polar: 1.55,
    azimuthal: -1.02,

    // Target computed rotation and tilt
    tiltZ: 0,
    polarOffset: 0,
    azimuthalOffset: 0,

    // Distance from center
    distance: 8,
};
