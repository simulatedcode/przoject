import { create } from 'zustand'

interface WebGLState {
    progress: number
    setProgress: (progress: number) => void
    mode: 'BOOT' | 'LANDSCAPE_ANALYSIS' | 'SUBJECT_DETECTION' | 'MEMORY_RECONSTRUCTION' | 'SYSTEM_COLLAPSE'
    setMode: (mode: WebGLState['mode']) => void
}

export const useWebGLStore = create<WebGLState>((set) => ({
    progress: 0,
    setProgress: (progress) => set({ progress }),
    mode: 'BOOT',
    setMode: (mode) => set({ mode }),
}))
