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

  headerStarted: boolean
  headerAnimationComplete: boolean
  startHeader: () => void
  completeHeader: () => void

  // 🟢 LOADING
  progress: number
  setProgress: (progress: number) => void
  loadingFinished: boolean
  setLoadingFinished: (finished: boolean) => void

  // 🟡 SCROLL / INTERACTION
  scrollProgress: number
  setScrollProgress: (scrollProgress: number) => void

  // 🧠 NARRATIVE MODE
  mode: 'BOOT' | 'ANALYSIS' | 'MEMORY' | 'COLLAPSE'
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

  headerStarted: false,
  headerAnimationComplete: false,

  startHeader: () =>
    set((state) =>
      state.headerStarted ? state : { headerStarted: true }
    ),

  completeHeader: () =>
    set((state) =>
      state.headerAnimationComplete
        ? state
        : { headerAnimationComplete: true }
    ),

  // 🟢 LOADING
  progress: 0,
  setProgress: (progress) => set({ progress }),
  loadingFinished: false,
  setLoadingFinished: (loadingFinished) => set({ loadingFinished }),

  // 🟡 SCROLL
  scrollProgress: 0,
  setScrollProgress: (scrollProgress) => set({ scrollProgress }),

  // 🧠 MODE
  mode: 'BOOT',
  setMode: (mode) => set({ mode }),

  // 🎛 POST FX
  postFXIntensity: 1,
  setPostFXIntensity: (postFXIntensity) => set({ postFXIntensity }),

  // 🎬 SCENE
  sceneIndex: 0,
  setSceneIndex: (sceneIndex) => set({ sceneIndex }),

  // 🖱 INPUT
  mouse: { x: 0, y: 0 },
  setMouse: (mouse) => set({ mouse }),

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
