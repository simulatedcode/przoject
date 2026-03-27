import '@react-three/fiber'
import { Object3DNode, MaterialNode } from '@react-three/fiber'
import * as THREE from 'three'
import { ScreenMaterial } from '../webgl/screen/ScreenMaterial'
import { GlassMaterial } from '../webgl/screen/GlassMaterial'
import { ScreenVideoMaterial } from '../webgl/screen/ScreenVideoMaterial'

declare module '@react-three/fiber' {
  interface ThreeElements {
    screenMaterial: MaterialNode<typeof ScreenMaterial, typeof ScreenMaterial>
    glassMaterial: MaterialNode<typeof GlassMaterial, typeof GlassMaterial>
    screenVideoMaterial: MaterialNode<typeof ScreenVideoMaterial, typeof ScreenVideoMaterial>
  }
}
