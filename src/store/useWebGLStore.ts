import { create } from 'zustand'

export type Phase = 'loading' | 'intro' | 'landing'

export interface IntroState {
  progress: number
  glitch: number
  flash: number
}

export type Breakpoint = 'mobile' | 'tablet' | 'desktop'

export interface Viewport {
  width: number
  height: number
  dpr: number
  breakpoint: Breakpoint
}

export interface WebGLState {
  // 🔴 MASTER FLOW CONTROL
  phase: Phase
  setPhase: (phase: Phase) => void

  // 📐 VIEWPORT
  viewport: Viewport
  setViewport: (viewport: Partial<Viewport>) => void

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
  mode: 'BOOT' | 'ANALYSIS' | 'MEMORY' | 'COLLAPSE' | 'LANDSCAPE_ANALYSIS'
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

const getBreakpoint = (width: number): Breakpoint => {
  if (width < 768) return 'mobile'
  if (width < 1024) return 'tablet'
  return 'desktop'
}

const getInitialViewport = (): Viewport => {
  if (typeof window === 'undefined') {
    return { width: 1920, height: 1080, dpr: 1, breakpoint: 'desktop' }
  }
  return {
    width: window.innerWidth,
    height: window.innerHeight,
    dpr: window.devicePixelRatio,
    breakpoint: getBreakpoint(window.innerWidth),
  }
}

export const useWebGLStore = create<WebGLState>((set) => ({
  // 🔴 MASTER FLOW CONTROL
  phase: 'loading',
  setPhase: (phase) => set({ phase }),

  // 📐 VIEWPORT
  viewport: getInitialViewport(),
  setViewport: (viewport) =>
    set((state) => {
      const newViewport = { ...state.viewport, ...viewport }
      if (viewport.width !== undefined) {
        newViewport.breakpoint = getBreakpoint(viewport.width)
      }
      return { viewport: newViewport }
    }),

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
