import { create } from 'zustand'

export interface WebGLState {
    progress: number
    setProgress: (progress: number) => void
    scrollProgress: number
    setScrollProgress: (scrollProgress: number) => void
    mode: 'BOOT' | 'LANDSCAPE_ANALYSIS' | 'SUBJECT_DETECTION' | 'MEMORY_RECONSTRUCTION' | 'SYSTEM_COLLAPSE'
    setMode: (mode: WebGLState['mode']) => void
    postFXIntensity: number
    setPostFXIntensity: (postFXIntensity: number) => void
    sceneIndex: number
    setSceneIndex: (sceneIndex: number) => void
}

export const useWebGLStore = create<WebGLState>((set) => ({
    progress: 0,
    setProgress: (progress) => set({ progress }),
    scrollProgress: 0,
    setScrollProgress: (scrollProgress) => set({ scrollProgress }),
    mode: 'BOOT',
    setMode: (mode) => set({ mode }),
    postFXIntensity: 1,
    setPostFXIntensity: (postFXIntensity) => set({ postFXIntensity }),
    sceneIndex: 0,
    setSceneIndex: (sceneIndex) => set({ sceneIndex }),
}))
