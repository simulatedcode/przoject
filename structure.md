# Project Folder Structure

This project follows a specialized structure designed for High-Performance WebGL and Cinematic React applications, aligning with the core requirements of `AGENTS.md`.

## Directory Overview

```text
src/
├── app/                 # Next.js App Router (Pages, Layouts, API)
│   ├── layout.tsx       # Root layout with Lenis & WebGL provider
│   ├── page.tsx         # Home page (Hero section + Scroll trigger)
│   └── globals.css      # Tailwind v4 Global Styles
│
├── components/          # React Components
│   ├── canvas/          # WebGL/Three.js Components
│   │   ├── scene/       # Main Scene, Environments, Models
│   │   ├── post/        # Post-Processing Effects & Passes
│   │   └── core/        # WebGL Hooks, State, and Utilities (e.g., CanvasRoot)
│   │
│   ├── ui/              # Dystopian UI Components (HTML/CSS)
│   │   ├── base/        # Buttons, Inputs, Layout primitives
│   │   └── overlays/    # HUD, Navigation, Terminal overlays
│   │
│   ├── animations/      # GSAP-driven Animation Components
│   │   └── sequences/   # Cinematic Intro/Outro sequences
│   │
│   └── shared/          # Common reusable UI components
│
├── shaders/             # Raw GLSL Shader Files (.vert, .frag)
│   ├── post/            # Post-processing shaders
│   └── effects/         # Custom material shaders
│
├── store/               # Zustand Global State Management
│   └── useWebGLStore.ts # Core 3D/Animation state
│
├── hooks/               # Custom React Hooks
│   ├── useLenis.ts      # Scroll logic
│   └── useScrollRig.ts  # WebGL/GSAP sync logic
│
├── lib/                 # Utility Functions (Standard Tools)
│   ├── gsap.ts          # GSAP configuration & registration
│   ├── math.ts          # 3D Math & Lerping utilities
│   └── utils.ts         # Generic helpers
│
├── types/               # TypeScript Definitions & Interfaces
│
├── assets/              # Source assets (Icons, local images)
│
└── public/              # Static Assets (Fonts, 3D Models, Textures)
```

## Core Principles

1.  **Canvas Isolation**: All WebGL-related React components are isolated in `src/components/canvas`.
2.  **Shader Locality**: GLSL files are stored in `src/shaders` for clean separation from logic.
3.  **Animation Centralization**: Cinematic sequences and GSAP-specific components reside in `src/components/animations`.
4.  **Dystopian UI**: UI components use Tailwind v4 and maintain a consistent "terminal" aesthetic.
5.  **State Logic**: Global orchestration (e.g. scroll progress, asset loading) is managed via `useWebGLStore.ts`.
