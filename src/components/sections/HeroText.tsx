'use client'

export default function HeroText() {
  return (
    <section className="fixed inset-x-0 top-0 px-[var(--section-px)] py-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pointer-events-none">
      <div className="flex bg-white/10 backdrop-blur-sm py-2 px-3 border border-white/10 rounded-sm pointer-events-auto">
        <h1 className="uppercase font-departure text-[clamp(8px,1.5vw,10px)] tracking-[0.2em] leading-[1.4] mix-blend-exclusion text-white">
          speculative future memories
        </h1>
      </div>
      <div className="flex bg-white/10 backdrop-blur-sm py-2 px-3 border border-white/10 rounded-sm pointer-events-auto">
        <p className="uppercase font-departure text-[clamp(8px,1.5vw,10px)] text-center mix-blend-exclusion tracking-widest">RZ00.rc-2044</p>
      </div>
    </section>
  )
}
