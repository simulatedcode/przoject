import HeroText from '@/components/sections/HeroText'
import PrologueSection from '@/components/sections/PrologueSection'
import LandscapeSection from '@/components/sections/LandscapeSection'
import MemoriesSection from '@/components/sections/MemoriesSection'
import HelasSection from '@/components/sections/HelasSection'

export default function Home() {
  return (
    <main className="scroll-container">
      <div className='hero-wrap inset-0'>
        <HeroText />
      </div>
      <PrologueSection />
      <LandscapeSection />
      <MemoriesSection />
      <HelasSection />
    </main>
  )
}
