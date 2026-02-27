"use client";

import { useState } from "react";
import Hero from "./features/hero/Hero";
import Intro from "./features/intro/Intro";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <main className="relative w-full h-[300vh]">
      {!isLoaded && <Intro onComplete={() => setIsLoaded(true)} />}
      <div className="fixed inset-0 flex flex-col items-center justify-center pointer-events-none">
        <Hero isLoaded={isLoaded} />
      </div>
    </main>
  );
}
