import { useRef, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import { gsap } from '@/utils/gsap'
// @ts-ignore
import { MeshSurfaceSampler } from 'three/examples/jsm/math/MeshSurfaceSampler'

// @ts-ignore
import vertexShader from '../../shaders/materials/hologram/vertex.glsl'
// @ts-ignore
import fragmentShader from '../../shaders/materials/hologram/fragment.glsl'

export default function HelasModel() {
  const pointsRef = useRef<THREE.Points>(null!)
  const { scene } = useGLTF('/models/helas.glb')

  // Extract geometry and sample 1M points
  const pointsGeometry = useMemo(() => {
    let mesh: THREE.Mesh | null = null
    scene.updateMatrixWorld()
    scene.traverse((node: any) => {
      if (node.isMesh && !mesh) mesh = node
    })

    if (!mesh) return new THREE.BufferGeometry()

    const sampler = new MeshSurfaceSampler(mesh).build()
    const count = 1000000 // 1 Million Points

    const positions = new Float32Array(count * 3)
    const normals = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)

    const _pos = new THREE.Vector3()
    const _normal = new THREE.Vector3()
    const baseColor = new THREE.Color('#E0521F') // secondary-500

    const targetMesh = mesh as THREE.Mesh

    for (let i = 0; i < count; i++) {
      sampler.sample(_pos, _normal)

      // Apply world matrix to sampled points
      _pos.applyMatrix4(targetMesh.matrixWorld)
      _normal.transformDirection(targetMesh.matrixWorld)

      const i3 = i * 3
      positions[i3 + 0] = _pos.x
      positions[i3 + 1] = _pos.y
      positions[i3 + 2] = _pos.z

      normals[i3 + 0] = _normal.x
      normals[i3 + 1] = _normal.y
      normals[i3 + 2] = _normal.z

      colors[i3 + 0] = baseColor.r
      colors[i3 + 1] = baseColor.g
      colors[i3 + 2] = baseColor.b
    }

    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geo.setAttribute('normal', new THREE.BufferAttribute(normals, 3))
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    return geo
  }, [scene])

  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uIntro: { value: 0 },
        uColor: { value: new THREE.Color('#E0521F') }, // secondary-500
        uPointSize: { value: 0.02 }
      },
      vertexShader,
      fragmentShader,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })
  }, [])

  useFrame((state) => {
    material.uniforms.uTime.value = state.clock.getElapsedTime()
  })

  useEffect(() => {
    gsap.fromTo(material.uniforms.uIntro,
      { value: 0 },
      {
        value: 1,
        duration: 4,
        ease: 'power4.inOut',
        delay: 0.2
      }
    )
  }, [material])

  return (
    <group position={[0, -0.0018, 2]} scale={0.1}>
      {pointsGeometry && (
        <points ref={pointsRef} geometry={pointsGeometry} material={material} />
      )}

      {/* Subtle bottom glow splash */}
      <pointLight
        position={[0, 0.5, 4]}
        intensity={20}
        distance={10}
        decay={2}
        color="#E0521F"
      />
    </group>
  )
}

useGLTF.preload('/models/helas.glb')
