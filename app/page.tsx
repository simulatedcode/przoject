"use client";

import { useState } from "react";
import { Hero } from "./components/sections/Hero";
import { Artist } from "./components/sections/Artist";
import { HistoryPreview } from "./components/sections/HistoryPreview";
import { Expertise } from "./components/sections/Expertise";
import { Contact } from "./components/sections/Contact";
import { IntroLoader } from "./components/ui/IntroLoader";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      {!isLoaded && <IntroLoader onComplete={() => setIsLoaded(true)} />}

      <main className={`max-w-full mx-auto selection:bg-primary/20 selection:text-primary overflow-x-hidden transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0 h-screen overflow-hidden'}`}>
        <Hero />
        <Artist />
        <HistoryPreview />
        <Expertise />
        <Contact />
      </main>
    </>
  );
}
