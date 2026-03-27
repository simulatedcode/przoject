import React, { forwardRef, useMemo } from 'react'
import { PixelOverlayEffect } from './PixelOverlayEffect'

interface PixelOverlayProps {
  pixelSize?: number
  gridThickness?: number
  opacity?: number
}

export const PixelOverlay = forwardRef<any, PixelOverlayProps>(({ pixelSize = 0.3, gridThickness = 0.18, opacity = 0.6 }, ref) => {
  const effect = useMemo(() => new PixelOverlayEffect({ pixelSize, gridThickness, opacity }), [pixelSize, gridThickness, opacity])
  return <primitive ref={ref} object={effect} dispose={null} />
})

PixelOverlay.displayName = 'PixelOverlay'
