import { AnimatePresence, motion } from 'motion/react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useRef, useState } from 'react'
import { ROADMAP } from '../data'
import Viz from './Viz'
import { EASE, Marker, MaskLines, Reveal } from './ui'

export default function Roadmap() {
  const [active, setActive] = useState(0)
  const btns = useRef<(HTMLButtonElement | null)[]>([])
  const n = ROADMAP.length
  const item = ROADMAP[active]

  const select = (i: number, focus = false) => {
    const k = (i + n) % n
    setActive(k)
    btns.current[k]?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
    if (focus) btns.current[k]?.focus()
  }

  return (
    <section id="roadmap" className="relative border-t border-line py-24 md:py-36">
      <div className="shell">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Marker>07 / THE ROAD AHEAD</Marker>
            <h2 className="mt-10 font-display text-[clamp(38px,6vw,96px)] font-semibold leading-[0.92] tracking-[-0.045em]">
              <MaskLines lines={["WHAT WE'RE", 'EXPLORING NEXT.']} />
            </h2>
          </div>
          <Reveal className="flex items-end justify-between gap-6 lg:col-span-4 lg:flex-col lg:items-start lg:justify-end" delay={0.1}>
            <p className="max-w-[340px] text-[14px] leading-relaxed text-mute">A thematic learning roadmap — the territory we're curious about, not an official academic schedule.</p>
            <div className="flex gap-2">
              <button onClick={() => select(active - 1)} aria-label="Previous topic" className="border border-line p-3 transition-colors hover:border-nv hover:text-lime cursor-pointer">
                <ArrowLeft className="h-4 w-4" />
              </button>
              <button onClick={() => select(active + 1)} aria-label="Next topic" className="border border-line p-3 transition-colors hover:border-nv hover:text-lime cursor-pointer">
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </Reveal>
        </div>

        {/* timeline */}
        <Reveal delay={0.1}>
          <div className="relative mt-16 overflow-x-auto pb-2 [scrollbar-width:none] md:mt-24" data-cursor="DRAG">
            <div className="relative min-w-[760px]">
              <div className="absolute left-[8.33%] right-[8.33%] top-[7px] h-px bg-line" />
              <motion.div
                className="absolute left-[8.33%] top-[7px] h-px bg-nv"
                animate={{ width: `${(active / (n - 1)) * 83.33}%` }}
                transition={{ duration: 0.6, ease: EASE }}
              />
              <div role="tablist" aria-label="Roadmap topics" className="relative grid grid-cols-6">
                {ROADMAP.map((r, i) => {
                  const on = i === active
                  const passed = i <= active
                  return (
                    <button
                      key={r.title}
                      ref={(el) => {
                        btns.current[i] = el
                      }}
                      role="tab"
                      aria-selected={on}
                      aria-controls="roadmap-panel"
                      tabIndex={on ? 0 : -1}
                      onClick={() => select(i)}
                      onKeyDown={(e) => {
                        if (e.key === 'ArrowRight') select(i + 1, true)
                        if (e.key === 'ArrowLeft') select(i - 1, true)
                      }}
                      className="group flex flex-col items-center text-center cursor-pointer"
                    >
                      <span className="relative flex h-[15px] w-[15px] items-center justify-center">
                        {on && <span className="animate-pulse-dot absolute inset-0 bg-lime/30" />}
                        <span
                          className={`h-[9px] w-[9px] rotate-45 border transition-all duration-300 ${
                            on ? 'scale-150 border-lime bg-lime' : passed ? 'border-nv bg-nv' : 'border-mute bg-obsidian group-hover:border-paper'
                          }`}
                        />
                      </span>
                      <span className={`label mt-6 !text-[10px] ${on ? 'text-nv' : 'text-mute'}`}>T.0{i + 1}</span>
                      <span className={`mt-2 px-2 font-display text-[17px] font-medium tracking-[-0.02em] transition-colors ${on ? 'text-paper' : 'text-mute group-hover:text-paper'}`}>
                        {r.title}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </Reveal>

        <div id="roadmap-panel" role="tabpanel" className="mt-14 border border-line bg-carbon/40">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="grid md:grid-cols-12"
            >
              <div className="p-6 md:col-span-7 md:p-10">
                <span className="label !text-[10px] text-nv">TOPIC 0{active + 1} / 0{n}</span>
                <h3 className="mt-6 font-display text-[clamp(30px,4vw,56px)] font-semibold leading-none tracking-[-0.04em]">{item.title}</h3>
                <p className="mt-6 max-w-[520px] text-[16px] leading-relaxed text-mute">{item.summary}</p>
                <p className="label mt-10 !text-[10px] text-mute">CORE CONCEPTS</p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {item.concepts.map((c, i) => (
                    <motion.li
                      key={c}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + i * 0.06 }}
                      className="label border border-line px-3 py-2 !text-[10px] text-paper"
                    >
                      {c}
                    </motion.li>
                  ))}
                </ul>
              </div>
              <div className="flex items-center border-t border-line p-6 md:col-span-5 md:border-l md:border-t-0 md:p-10">
                <Viz kind={item.viz} className="w-full" />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
