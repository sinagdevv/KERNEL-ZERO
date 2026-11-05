import { motion } from 'motion/react'
import { ArrowDownRight, ArrowRight } from 'lucide-react'
import HeroCanvas from './HeroCanvas'
import { EASE, Magnetic, MaskLines } from './ui'
import { scrollToId } from '../data'

export default function Hero() {
  return (
    <section id="top" className="relative flex min-h-[100svh] flex-col overflow-hidden" data-cursor="EXPLORE">
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

      {/* coordinate rules */}
      <div className="pointer-events-none absolute inset-0 hidden md:block">
        <div className="shell relative h-full">
          <span className="label absolute right-16 top-24 !text-[10px] text-mute/70">X 14.6091 / Y 121.0223</span>
          <span className="label absolute bottom-10 right-16 !text-[10px] text-mute/70">FIG.00 — TENSOR LATTICE</span>
        </div>
      </div>

      <div className="shell relative flex flex-1 flex-col justify-end pb-24 pt-32 md:justify-center md:pb-20">
        <motion.p
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: EASE }}
          className="label mb-8 flex items-center gap-3 text-mute"
        >
          <span className="h-px w-8 bg-nv" /> NATIONAL UNIVERSITY — FAIRVIEW
        </motion.p>

        <h1 className="font-display text-[clamp(44px,8.6vw,136px)] font-semibold leading-[0.9] tracking-[-0.045em]">
          <MaskLines
            animateNow
            delay={0.5}
            lines={[
              <>WE DON'T JUST</>,
              <>USE AI.</>,
              <>
                WE{' '}
                <span className="relative inline-block text-nv">
                  UNDERSTAND
                  <motion.span
                    className="absolute -bottom-[0.02em] left-0 h-[0.045em] w-full origin-left bg-lime"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.9, delay: 1.3, ease: EASE }}
                  />
                </span>
              </>,
              <>IT.</>,
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
            NVGENESIS is a collective of curious minds learning how intelligent systems think, learn, reason, and operate securely. From large language
            models to AI agents and security, we explore the technology shaping what comes next.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.15, ease: EASE }}
            className="flex flex-wrap items-start gap-3 md:col-span-7 md:items-end"
          >
            <Magnetic onClick={() => scrollToId('overview')}>
              EXPLORE OUR WORLD <ArrowDownRight className="h-4 w-4 transition-transform duration-200 group-hover:rotate-[-45deg]" />
            </Magnetic>
            <Magnetic variant="ghost" onClick={() => scrollToId('cohort')}>
              MEET THE COHORT <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Magnetic>
          </motion.div>
        </div>
      </div>

      <div className="shell relative flex items-end justify-between pb-6">
        <span className="label hidden !text-[10px] text-mute sm:block">NVG / ARTIFICIAL INTELLIGENCE / CLASS COLLECTIVE</span>
        <button onClick={() => scrollToId('overview')} className="flex items-center gap-3 cursor-pointer" aria-label="Scroll to overview">
          <span className="label !text-[10px] text-mute">SCROLL</span>
          <span className="relative h-10 w-px overflow-hidden bg-line">
            <span className="animate-scroll-line absolute inset-x-0 top-0 h-1/2 bg-lime" />
          </span>
        </button>
      </div>
    </section>
  )
}
