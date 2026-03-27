# AGENTS.md

This file provides guidelines and instructions for agentic coding assistants operating in this repository.

## Project Overview

This is a Next.js 16 + React 19 WebGL project featuring:
- 3D rendering with React Three Fiber/Drei
- Scroll-driven animations with GSAP and Lenis
- State management with Zustand
- Tailwind CSS v4 styling

### Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js 16.1.6 |
| UI Library | React 19.2.3 |
| 3D Engine | Three.js 0.183.2 |
| 3D React | @react-three/fiber 9.5.0 |
| 3D Helpers | @react-three/drei 10.7.7 |
| Animations | GSAP 3.14.2 |
| Scroll | Lenis 1.3.18 |
| State | Zustand 5.0.11 |
| Styling | Tailwind CSS v4 |
| Language | TypeScript (strict mode) |

## Build/Lint/Test Commands

```bash
# Development
npm run dev              # Start dev server on localhost:3000

# Production
npm run build            # Build for production
npm run start            # Start production server

# Linting
npm run lint             # Run ESLint (eslint-config-next with types)
npm run lint -- --fix    # Fix linting issues automatically
```

### Running a Single Test

No test framework is currently configured. If adding tests, use:
```bash
# Vitest (recommended for this stack)
npx vitest run src/specific/test.file.ts

# Jest
npx jest src/specific/test.file.ts

# With watch mode
npx vitest src/specific/test.file.ts
```

### Type Checking

```bash
# Run TypeScript type checking (built into Next.js build)
npx tsc --noEmit
```

## Project Structure

```
src/
├── app/                 # Next.js App Router pages
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Home page
│   └── globals.css      # Global styles + Tailwind
├── components/          # React components
│   ├── canvas/          # Three.js canvas components
│   ├── ui/              # HTML/CSS UI components
│   └── animations/      # GSAP animation components
├── store/               # Zustand stores
│   └── useWebGLStore.ts # Main WebGL state store
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions
├── shaders/             # GLSL shader files
└── public/              # Static assets
```

## Code Style Guidelines

### General Conventions

- **Language**: TypeScript (strict mode enabled)
- **File Extensions**: `.tsx` for React components, `.ts` for utilities/types
- **Path Alias**: Use `@/*` to import from `./src/*`
- **Component Pattern**: Client components use `'use client'` directive

### Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `CameraRig.tsx`, `HeroText.tsx` |
| Utilities/Hooks | camelCase | `useScrollRig.ts`, `gsap.ts` |
| State stores | camelCase | `useWebGLStore.ts` |
| Types/Interfaces | PascalCase | `WebGLState`, `AssetRegistry` |
| CSS Classes | kebab-case | `hero-wrap`, `scroll-container` |
| CSS Variables | kebab-case | `--primary-500`, `--bg-main` |
| Shader files | kebab-case | `vertex.glsl`, `fragment.glsl` |

### TypeScript

- Use explicit TypeScript types; avoid `any`
- Prefer interfaces for object shapes
- Use type imports for types only: `import type { SomeType } from 'module'`
- Store state interfaces define both shape and methods:

```typescript
export interface WebGLState {
    progress: number
    setProgress: (progress: number) => void
    // ...
}
```

### React Components

- Default export for page/component files
- Named exports for utility hooks and classes
- Use `use client` directive for all client-side components
- Prefer `useMemo` and `useCallback` for expensive computations and callbacks
- Wrap async operations in `useEffect` with proper cleanup
- Use `forwardRef` when refs need to be passed to child components

### Imports

Group imports in this order:
1. React imports (`react`, `react-dom`)
2. External libraries (`@react-three/fiber`, `gsap`, etc.)
3. Internal path aliases (`@/components`, `@/store`, `@/hooks`)
4. Relative imports (`./`, `../`)

```typescript
// Correct order
import { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import gsap from 'gsap'
import { useWebGLStore } from '@/store/useWebGLStore'
import { someUtility } from '@/lib/utils'
import type { SomeType } from '@/types'
import { CameraRig } from './CameraRig'
```

Use `import` for side-effects and values, `import type` for types only.

### CSS/Tailwind

- Tailwind CSS v4 with `@import "tailwindcss"`
- Define custom properties in `:root` for theming
- Use `@theme inline` to expose CSS vars to Tailwind
- Use arbitrary values sparingly; prefer custom properties
- Utility classes for layout/styling; CSS variables for theming
- Use CSS modules or inline styles for dynamic values

### State Management (Zustand)

- Single store file: `src/store/useWebGLStore.ts`
- Define interface with all state and methods
- Use `create<InterfaceName>` for type safety
- Select specific state slices: `useStore((s) => s.property)`
- Avoid subscribing to entire store; use selectors

```typescript
// Good - selects only needed property
const progress = useStore((s) => s.progress)

// Bad - subscribes to entire store
const { progress, setProgress } = useStore()
```

### WebGL/Three.js

- Use `@react-three/fiber` for React integration
- Leva for runtime parameter controls during development
- Preload assets with `useGLTF.preload()` and `useTexture.preload()`
- Use `useFrame` for animation loops
- Use `Suspense` with `fallback={null}` for async loading
- Dispose geometries and materials when unmounting
- Use `instancedMesh` for repeated geometry
- Minimize state updates in animation loops

### Shaders/GLSL

- Store shaders in `src/shaders/` directory
- Use `.glsl`, `.vert`, or `.frag` extensions
- Import as raw strings: `import shader from '@/shaders/shader.glsl?raw'`
- Webpack handles GLSL files via custom config in `next.config.ts`
- Test shaders in isolation before integrating

### Animations (GSAP + Lenis)

- Initialize Lenis in a dedicated hook or component
- Sync GSAP ScrollTrigger with Lenis
- Use `gsap.context()` for cleanup in React
- Respect `prefers-reduced-motion` media query
- Use `requestAnimationFrame` for smooth updates
- Avoid animating layout properties; use transforms

### Error Handling

- Wrap WebGL operations in try/catch with fallback values
- Check for null/undefined in refs before operations
- Handle SSR safely: check `typeof window !== 'undefined'`
- Use `prefer-reduced-motion` media query for animations
- Provide graceful degradation for WebGL failures

### Performance Guidelines

- Use `React.memo` for static components
- Minimize re-renders with proper state selection
- Lazy load heavy components with `next/dynamic`
- Use `dpr` prop to limit device pixel ratio
- Compress textures and use appropriate formats
- Monitor frame rate in development with stats.js

## Formatting

- 4-space indentation
- Single quotes for JSX attributes and string literals
- Trailing commas in multi-line objects/arrays
- No semicolons in JS/TS files
- Max line length: 120 characters (soft)
- Use Prettier for code formatting (if configured)

## Git Conventions

- Use meaningful commit messages
- Create feature branches for new features
- Run `npm run lint` before committing
- Verify build succeeds before pushing

## Editor Setup

Recommended VS Code extensions:
- ESLint
- Prettier
- Tailwind CSS IntelliSense
- Three.js React JSX
- TypeScript Vue Plugin (for syntax highlighting)
