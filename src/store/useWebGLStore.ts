import { create } from 'zustand'

export type Phase = 'loading' | 'intro' | 'landing'

export interface IntroState {
  progress: number
  glitch: number
  flash: number
}

export interface WebGLState {
  // 🔴 MASTER FLOW CONTROL
  phase: Phase
  setPhase: (phase: Phase) => void

  // 🟢 LOADING
  progress: number
  setProgress: (progress: number) => void

  // 🟡 SCROLL / INTERACTION
  scrollProgress: number
  setScrollProgress: (scrollProgress: number) => void

  // 🧠 NARRATIVE MODE
  mode: 'BOOT' | 'LANDSCAPE_ANALYSIS' | 'SUBJECT_DETECTION' | 'MEMORY_RECONSTRUCTION' | 'SYSTEM_COLLAPSE'
  setMode: (mode: WebGLState['mode']) => void

  // 🎛 POST FX
  postFXIntensity: number
  setPostFXIntensity: (postFXIntensity: number) => void

  // 🎬 SCENE CONTROL
  sceneIndex: number
  setSceneIndex: (sceneIndex: number) => void

  // 🖱 INPUT
  mouse: { x: number; y: number }
  setMouse: (mouse: { x: number; y: number }) => void

  // 🎞 INTRO MICRO STATE
  introState: IntroState
  setIntroState: (introState: Partial<IntroState>) => void
}

export const useWebGLStore = create<WebGLState>((set) => ({
  // 🔴 MASTER FLOW CONTROL
  phase: 'loading',
  setPhase: (phase) => set({ phase }),

  // 🟢 LOADING
  progress: 0,
  setProgress: (progress) =>
    set({ progress: Math.min(Math.max(progress, 0), 100) }),

  // 🟡 SCROLL
  scrollProgress: 0,
  setScrollProgress: (scrollProgress) => set({ scrollProgress }),

  // 🧠 MODE
  mode: 'BOOT',
  setMode: (mode) => set({ mode }),

  // 🖱 INPUT
  mouse: { x: 0, y: 0 },
  setMouse: (mouse) => set({ mouse }),

  // 🎛 POST FX
  postFXIntensity: 1,
  setPostFXIntensity: (postFXIntensity) => set({ postFXIntensity }),

  // 🎬 SCENE
  sceneIndex: 0,
  setSceneIndex: (sceneIndex) => set({ sceneIndex }),

  // 🎞 INTRO
  introState: {
    progress: 0,
    glitch: 0,
    flash: 0,
  },
  setIntroState: (introState) =>
    set((state) => ({
      introState: { ...state.introState, ...introState },
    })),
}))
