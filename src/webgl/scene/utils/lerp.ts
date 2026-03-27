export function lerp(a: number, b: number, t: number) {
    return a + (b - a) * t
}

export function lerpVec3(a: number[], b: number[], t: number) {
    return [
        lerp(a[0], b[0], t),
        lerp(a[1], b[1], t),
        lerp(a[2], b[2], t),
    ]
}