import { create } from 'zustand'

export interface IntroState {
    phase: number
    progress: number
    glitch: number
    flash: number
    done: boolean
}

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
    mouse: { x: number; y: number }
    setMouse: (mouse: { x: number; y: number }) => void
    introState: IntroState
    setIntroState: (introState: IntroState) => void
}

export const useWebGLStore = create<WebGLState>((set) => ({
    progress: 0,
    setProgress: (progress) => set({ progress }),
    scrollProgress: 0,
    setScrollProgress: (scrollProgress) => set({ scrollProgress }),
    mode: 'BOOT',
    setMode: (mode) => set({ mode }),
    mouse: { x: 0, y: 0 },
    setMouse: (mouse) => set({ mouse }),
    postFXIntensity: 1,
    setPostFXIntensity: (postFXIntensity) => set({ postFXIntensity }),
    sceneIndex: 0,
    setSceneIndex: (sceneIndex) => set({ sceneIndex }),
    introState: { phase: 0, progress: 0, glitch: 0, flash: 0, done: false },
    setIntroState: (introState) => set({ introState }),
}))
