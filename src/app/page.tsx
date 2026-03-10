import Hero from '@/components/sections/Hero'
import Prologue from '@/components/sections/Prologue'
import Landscape from '@/components/sections/Landscape'
import PseudoMemories from '@/components/sections/PseudoMemories'
import Helas from '@/components/sections/Helas'

export default function Home() {
  return (
    <main className="scroll-container">
      <Hero />
      <Prologue />
      <Landscape />
      <PseudoMemories />
      <Helas />
    </main>
  )
}
