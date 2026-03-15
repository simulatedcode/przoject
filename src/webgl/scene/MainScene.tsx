'use client'

import { Suspense } from 'react'
import Models from './Models'
import Ground from './Ground'
import Environment from './Environment'

export default function MainScene() {
  return (
    <group>
      <Environment />
      <Suspense fallback={null}>
        <Models />
        <Ground />
      </Suspense>
    </group>
  )
}
