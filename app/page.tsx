"use client";

import { Hero } from "./components/sections/Hero";
import { Artist } from "./components/sections/Artist";
import { HistoryPreview } from "./components/sections/HistoryPreview";
import { Expertise } from "./components/sections/Expertise";
import { Contact } from "./components/sections/Contact";

export default function Home() {
  return (
    <main className="max-w-full mx-auto selection:bg-primary/20 selection:text-primary overflow-x-hidden">
      <Hero />
      <Artist />
      <HistoryPreview />
      <Expertise />
      <Contact />
    </main>
  );
}
