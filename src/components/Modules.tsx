import { AnimatePresence, motion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { useState } from 'react'
import { MODULES } from '../data'
import Viz from './Viz'
import { EASE, Marker, MaskLines, Reveal } from './ui'

export default function Modules() {
  const [open, setOpen] = useState<number | null>(null)
  const [hover, setHover] = useState<number | null>(null)

  return (
    <section id="learn" className="relative border-t border-line py-24 md:py-36">
      <div className="shell">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Marker>02 / OUR DISCIPLINES</Marker>
            <h2 className="mt-10 font-display text-[clamp(38px,6vw,96px)] font-semibold leading-[0.92] tracking-[-0.045em]">
              <MaskLines lines={['THE TECHNOLOGY', 'BEHIND INTELLIGENCE.']} />
            </h2>
          </div>
          <Reveal className="self-end lg:col-span-4" delay={0.15}>
            <p className="max-w-[360px] text-[15px] leading-relaxed text-mute">
              Our classroom explores the ideas, architectures, and challenges behind today's AI systems.
            </p>
            <p className="label mt-6 !text-[10px] text-mute">06 MODULES / SELECT TO EXPAND</p>
          </Reveal>
        </div>

        <ul className="mt-16 border-t border-line md:mt-24">
          {MODULES.map((m, i) => {
            const isOpen = open === i
            const isHover = hover === i
            return (
              <motion.li
                key={m.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-5% 0px' }}
                transition={{ duration: 0.6, delay: i * 0.06, ease: EASE }}
                className="relative border-b border-line"
              >
                <button
                  id={`mod-btn-${i}`}
                  aria-expanded={isOpen}
                  aria-controls={`mod-panel-${i}`}
                  onClick={() => setOpen(isOpen ? null : i)}
                  onMouseEnter={() => setHover(i)}
                  onMouseLeave={() => setHover(null)}
                  data-cursor={isOpen ? 'CLOSE' : 'OPEN'}
                  className={`group relative grid w-full grid-cols-[auto_1fr_auto] items-center gap-4 py-6 text-left transition-colors duration-[240ms] md:grid-cols-12 md:gap-6 md:py-9 cursor-pointer ${
                    isOpen || isHover ? 'bg-carbon/60' : ''
                  }`}
                >
                  <span
                    className={`absolute bottom-[-1px] left-0 h-px w-full origin-left bg-nv transition-transform duration-500 ${
                      isOpen || isHover ? 'scale-x-100' : 'scale-x-0'
                    }`}
                  />
                  <span className={`label pl-2 transition-colors duration-200 md:col-span-1 md:pl-4 ${isOpen || isHover ? 'text-nv' : 'text-mute'}`}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span
                    className={`font-display text-[clamp(22px,3.4vw,52px)] font-medium leading-[1.02] tracking-[-0.035em] transition-transform duration-[260ms] md:col-span-6 ${
                      isHover ? 'translate-x-1.5' : ''
                    }`}
                  >
                    {m.name}
                  </span>
                  <span className="label hidden text-mute md:col-span-4 md:block">{m.tag}</span>
                  <span className="flex justify-end pr-2 md:col-span-1 md:pr-4">
                    <ArrowUpRight
                      className={`h-6 w-6 transition-transform duration-[260ms] ${isOpen ? 'rotate-[135deg] text-lime' : isHover ? 'rotate-45 text-paper' : 'text-mute'}`}
                      strokeWidth={1.25}
                    />
                  </span>
                </button>

                {/* hover preview (desktop) */}
                <AnimatePresence>
                  {isHover && !isOpen && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.96, x: 10 }}
                      animate={{ opacity: 1, scale: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.22, ease: EASE }}
                      className="pointer-events-none absolute right-[16%] top-1/2 z-10 hidden w-56 -translate-y-1/2 border border-line bg-obsidian p-3 xl:block"
                    >
                      <Viz kind={m.viz} className="w-full" />
                    </motion.div>
                  )}
                </AnimatePresence>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`mod-panel-${i}`}
                      role="region"
                      aria-labelledby={`mod-btn-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: EASE }}
                      className="overflow-hidden bg-carbon/60"
                    >
                      <div className="grid gap-10 px-2 pb-10 pt-2 md:grid-cols-12 md:gap-6 md:px-4 md:pb-14">
                        <div className="md:col-span-5 md:col-start-2">
                          <p className="label mb-4 text-nv md:hidden">{m.tag}</p>
                          <p className="text-[17px] leading-relaxed text-paper/90">{m.desc}</p>
                          <p className="label mt-8 !text-[10px] text-mute">KEY CONCEPTS</p>
                          <ul className="mt-3 border-t border-line">
                            {m.concepts.map((c, ci) => (
                              <motion.li
                                key={c}
                                initial={{ opacity: 0, x: -8 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.15 + ci * 0.06, duration: 0.45, ease: EASE }}
                                className="flex items-center gap-4 border-b border-line py-3 text-[14px]"
                              >
                                <span className="label !text-[10px] text-nv">{String.fromCharCode(65 + ci)}</span>
                                {c}
                              </motion.li>
                            ))}
                          </ul>
                        </div>
                        <div className="md:col-span-5 md:col-start-8">
                          <div className="relative border border-line bg-obsidian p-4">
                            <div className="mb-2 flex justify-between">
                              <span className="label !text-[10px] text-mute">DIAGRAM / {String(i + 1).padStart(2, '0')}</span>
                              <span className="label !text-[10px] text-nv">LIVE</span>
                            </div>
                            <Viz kind={m.viz} className="w-full" />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.li>
            )
          })}
        </ul>
        <p className="label mt-6 !text-[10px] text-mute">LEARNING AREAS EXPLORED IN CLASS — A WORK IN PROGRESS, NOT A LIST OF MASTERED SKILLS.</p>
      </div>
    </section>
  )
}
