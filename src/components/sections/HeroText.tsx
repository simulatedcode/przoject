'use client'

export default function HeroText() {
  return (
    <section className="fixed inset-x-0 top-0 px-(--section-px) py-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pointer-events-none">
      <div className="flex flex-col gap-2">
        <div className="flex bg-white/5 backdrop-blur-md py-1.5 px-3 border border-white/10 rounded-xs pointer-events-auto">
          <h1 className="uppercase font-departure text-[clamp(8px,1.2vw,9px)] tracking-[0.2em] leading-none text-white/90">
            [ system_access: authorized ]
          </h1>
        </div>
        <div className="flex bg-white/10 backdrop-blur-xl py-2 px-4 border border-white/10 rounded-sm pointer-events-auto shadow-2xl">
          <h2 className="uppercase font-departure text-[clamp(10px,2vw,12px)] tracking-[0.3em] leading-tight text-white font-bold">
            speculative future memories
          </h2>
        </div>
      </div>

      <div className="flex flex-col items-end gap-2">
        <div className="flex bg-white/5 backdrop-blur-md py-1 px-2 border border-white/5 rounded-xs pointer-events-auto">
          <p className="uppercase font-departure text-[8px] tracking-[0.2em] text-white/40">
            node: alpha-01 // v.16.1.6
          </p>
        </div>
        <div className="flex bg-white/10 backdrop-blur-xl py-2 px-3 border border-white/10 rounded-sm pointer-events-auto shadow-2xl">
          <p className="uppercase font-departure text-[clamp(9px,1.5vw,10px)] tracking-[0.25em] text-white">
            RZ00.rc-2044
          </p>
        </div>
      </div>
    </section>
  )
}
