import { Effect } from 'postprocessing'
import { Uniform } from 'three'

import fragmentShader from '../../../shaders/PixelOverlay.frag'

export class PixelOverlayEffect extends Effect {
  constructor({ pixelSize = 4.0, gridThickness = 0.1, opacity = 1.0 } = {}) {
    super('PixelOverlayEffect', fragmentShader, {
      uniforms: new Map([
        ['uPixelSize', new Uniform(pixelSize)],
        ['uGridThickness', new Uniform(gridThickness)],
        ['uOpacity', new Uniform(opacity)]
      ])
    })
  }

  update(): void {
  }
}
