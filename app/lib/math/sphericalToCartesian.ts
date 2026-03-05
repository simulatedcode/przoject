import * as THREE from "three";

/**
 * Convert spherical coordinates to a Cartesian THREE.Vector3.
 *
 * @param distance - Radius from origin
 * @param polar    - Vertical angle (0 = top, π = bottom)
 * @param azimuth  - Horizontal angle
 */
export function sphericalToCartesian(
    distance: number,
    polar: number,
    azimuth: number,
): THREE.Vector3 {
    return new THREE.Vector3(
        distance * Math.sin(polar) * Math.sin(azimuth),
        distance * Math.cos(polar),
        distance * Math.sin(polar) * Math.cos(azimuth),
    );
}
