import { sections } from './directorConfig'
import { lerpVec3 } from '../utils/lerp'
import { shapeProgress } from '../utils/math'

export function getSectionState(index: number, progress: number) {
    const current = sections[index]
    const next = sections[index + 1] || current

    const t = shapeProgress(progress)

    return {
        camera: {
            position: lerpVec3(current.camera.position, next.camera.position, t),
            target: lerpVec3(current.camera.target, next.camera.target, t),
        },
        shader: {
            brightness:
                current.shader.brightness[0] +
                (current.shader.brightness[1] - current.shader.brightness[0]) * t,
        },
    }
}