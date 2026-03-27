import HeroText from '@/components/sections/HeroText'
import PrologueSection from '@/components/sections/PrologueSection'
import LandscapeSection from '@/components/sections/LandscapeSection'
import MemoriesSection from '@/components/sections/MemoriesSection'

export default function Home() {
  return (
    <main className="scroll-container">
      <section id="hero" className="hero-wrap inset-0">
        <HeroText />
      </section>

      <section id="prologue">
        <PrologueSection />
      </section>

      <section id="landscape">
        <LandscapeSection />
      </section>

      <section id="memories">
        <MemoriesSection />
      </section>

    </main>
  )
}
