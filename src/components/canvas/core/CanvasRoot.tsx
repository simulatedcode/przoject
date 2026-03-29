'use client'

import { Canvas } from '@react-three/fiber'
import { useState, useMemo } from 'react'
import { PerformanceMonitor } from '@react-three/drei'
import * as THREE from 'three'

import SceneManager from './SceneManager'
import RenderPipeline from './RenderPipeline'
import { MouseTracker } from '@/hooks/useMousePosition'
import LoadingBridge from './LoadingBridge'

function setupShaderDebugging(gl: THREE.WebGLRenderer) {
  const glContext = gl.getContext()
  if (!glContext) return

  const originalShaderSource = glContext.shaderSource.bind(glContext)
  const originalCompileShader = glContext.compileShader.bind(glContext)

  glContext.shaderSource = function (shader: WebGLShader, source: string) {
    return originalShaderSource(shader, source)
  }

  glContext.compileShader = function (shader: WebGLShader) {
    const result = originalCompileShader(shader)
    const status = glContext.getShaderParameter(shader, glContext.COMPILE_STATUS)

    if (!status) {
      const type = glContext.getShaderParameter(shader, glContext.SHADER_TYPE)
      const typeStr = type === glContext.VERTEX_SHADER ? 'Vertex' : 'Fragment'
      const log = glContext.getShaderInfoLog(shader)

      console.error(`[Shader Error] ${typeStr} Shader:`)
      console.error('Log:', log)
    }

    return result
  }
}

export default function CanvasRoot() {

  const [dpr, setDpr] = useState(1.5)

  const glConfig = useMemo(() => ({
    antialias: false,
    powerPreference: 'high-performance' as WebGLPowerPreference,
    toneMapping: THREE.ACESFilmicToneMapping,
    toneMappingExposure: 1.25,
    alpha: true,
    stencil: false,
    depth: true,
    failIfMajorPerformanceCaveat: false,
  }), [])

  return (

    <Canvas
      camera={{
        fov: 35,
        near: 0.1,
        far: 100
      }}
      dpr={dpr}
      shadows={{ type: THREE.PCFShadowMap }}
      gl={glConfig}
      onCreated={({ gl }) => {
        setupShaderDebugging(gl)
      }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none'
      }}
    >
      <LoadingBridge />

      {/* Performance scaling */}
      <PerformanceMonitor
        onIncline={() => setDpr(Math.min(window.devicePixelRatio, 2))}
        onDecline={() => setDpr(1)}
        flipflops={3}
      />

      {/* Orchestration */}
      <MouseTracker />
      <SceneManager />

      {/* Render Pipeline */}
      <RenderPipeline />

      {/* Atmosphere */}
      <color attach="background" args={['#050608']} />
      <fog attach="fog" args={['#050608', 10, 30]} />

    </Canvas>

  )
}
