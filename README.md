# Przoject | High-Fidelity 3D Portfolio

A premium, cinematic 3D portfolio website built with **Next.js**, **React Three Fiber**, and **GSAP**. This project features a solarpunk/sci-fi aesthetic with advanced shader effects and dynamic lighting.

## 🚀 Overview

This website is designed for high-performance 3D visualization in the browser. It integrates a custom 3D scene with cinematic lighting, post-processing effects, and a smooth scrolling experience.

### Key Features
- **Cinematic 3D Scene**: Fully immersive 3D environment using React Three Fiber.
- **Sci-Fi Shaders**: Advanced material shaders for futuristic visual effects.
- **Dynamic Lighting**: Real-time solar-tracked hemisphere lighting and sharp shadow contrast.
- **Smooth Navigation**: HUD-style interactive navigation system.
- **Performance Optimized**: Built for smooth 60fps interaction on modern hardware.
- **Content Managed**: Integrated with Sanity CMS for easy project updates.

## 🛠 Tech Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **3D Engine**: [Three.js](https://threejs.org/) / [@react-three/fiber](https://github.com/pmndrs/react-three-fiber)
- **Animations**: [GSAP](https://greensock.com/gsap/) (GreenSock)
- **Smooth Scroll**: [Lenis](https://github.com/darkroomengineering/lenis)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **CMS**: [Sanity](https://www.sanity.io/)

## 📦 Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/simulatedcode/przoject.git
   cd przoject
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Environment Variables:**
   Create a `.env.local` file with your Sanity credentials:
   ```env
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_id
   NEXT_PUBLIC_SANITY_DATASET=production
   SANITY_API_READ_TOKEN=your_token
   ```

## 💻 Development

Run the development server:
```bash
npm run dev
```

Visit `http://localhost:3000` to see the application.

## 🏗 Project Structure

- `app/`: Next.js App Router pages and routes.
- `components/3d/`: R3F components and 3D scenes.
- `components/ui/`: Interactive HUD and UI elements.
- `lib/`: Utility functions and Sanity client.
- `public/models/`: Compressed `.glb` / `.gltf` assets.

---

Built with precision for the modern web.
