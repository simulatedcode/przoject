/**
 * Maps raw section progress (0→1) to transition value.
 * Smoothing is already applied by useSectionProgress.
 */
export function textTiming(progress: number): number {
    return progress
}