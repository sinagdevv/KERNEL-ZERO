import { motion } from 'motion/react'
import { ArrowDownRight, ArrowRight } from 'lucide-react'
import HeroCanvas from './HeroCanvas'
import { EASE, Magnetic, MaskLines } from './ui'
import { scrollToId } from '../data'

export default function Hero() {
  return (
    <section id="top" className="relative flex min-h-[100svh] flex-col overflow-hidden" >
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.6, delay: 0.3 }}
      >
        <HeroCanvas />
      </motion.div>
      {/* readability vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_60%,rgba(8,10,8,0.92)_0%,rgba(8,10,8,0.55)_45%,transparent_75%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-obsidian to-transparent" />

      <div className="shell relative flex flex-1 flex-col justify-end pb-24 pt-32 md:justify-center md:pb-20">
        <h1 className="font-display text-[clamp(44px,8vw,128px)] font-semibold leading-[0.95] tracking-[-0.04em]">
          <MaskLines
            animateNow
            delay={0.4}
            lines={[
              <>Stay ahead</>,
              <>
                of the{' '}
                <span className="text-nv">curve.</span>
              </>,
            ]}
          />
        </h1>

        <div className="mt-10 grid gap-10 md:grid-cols-12">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.0, ease: EASE }}
            className="max-w-[460px] text-[15px] leading-relaxed text-mute md:col-span-5"
          >
            NVGENESIS is a student group learning how AI systems actually work: language models, agents, retrieval, security and the GPUs underneath them.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.15, ease: EASE }}
            className="flex flex-wrap items-start gap-3 md:col-span-7 md:items-end"
          >
            <Magnetic onClick={() => scrollToId('overview')}>
              What we study <ArrowDownRight className="h-4 w-4 transition-transform duration-200 group-hover:rotate-[-45deg]" />
            </Magnetic>
            <Magnetic variant="ghost" onClick={() => scrollToId('professor')}>
              Meet the people <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Magnetic>
          </motion.div>
        </div>
      </div>

      <div className="shell relative flex items-end justify-between pb-6">
        <span />
        <button onClick={() => scrollToId('overview')} className="flex items-center gap-3 cursor-pointer" aria-label="Scroll to overview">
          <span className="text-[12px] text-mute">Scroll</span>
          <span className="relative h-10 w-px overflow-hidden bg-line">
            <span className="animate-scroll-line absolute inset-x-0 top-0 h-1/2 bg-lime" />
          </span>
        </button>
      </div>
    </section>
  )
}
