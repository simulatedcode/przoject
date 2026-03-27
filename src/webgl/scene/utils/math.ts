export function shapeProgress(t: number) {
    return Math.min(Math.max((t - 0.2) / 0.6, 0), 1)
}