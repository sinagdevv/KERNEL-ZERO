import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import Portrait from './Portrait'
import { EASE, Marker, MaskLines, Reveal } from './ui'

export default function Faculty() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const bgX = useTransform(scrollYProgress, [0, 1], ['8%', '-18%'])
  const imgY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%'])

  return (
    <section id="professor" ref={ref} className="relative overflow-hidden border-t border-line py-24 md:py-36">
      <motion.span
        aria-hidden
        style={{ x: bgX }}
        className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 select-none whitespace-nowrap font-display text-[32vw] font-bold leading-none tracking-[-0.06em] text-transparent [-webkit-text-stroke:1px_#263026]"
      >
        MENTOR
      </motion.span>
      <div className="shell relative">
        <Marker>04 / THE MENTOR</Marker>
        <div className="mt-12 grid gap-12 lg:mt-16 lg:grid-cols-12 lg:gap-0">
          <div className="lg:col-span-5">
            <motion.div
              initial={{ clipPath: 'inset(100% 0 0 0)' }}
              whileInView={{ clipPath: 'inset(0% 0 0 0)' }}
              viewport={{ once: true, margin: '-15% 0px' }}
              transition={{ duration: 1.1, ease: EASE }}
              className="relative aspect-[4/5] overflow-hidden border border-line"
            >
              <motion.div style={{ y: imgY }} className="absolute -inset-[6%]">
                <Portrait name="Sam Chugthai" seed={99} large className="h-full w-full" />
              </motion.div>
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between border-t border-line bg-obsidian/80 px-4 py-3 backdrop-blur-sm">
                <span className="label !text-[10px] text-mute">PORTRAIT / AWAITING APPROVED PHOTO</span>
                <span className="h-1.5 w-1.5 bg-nv" />
              </div>
            </motion.div>
          </div>
          <div className="relative hidden lg:col-span-1 lg:flex lg:justify-center">
            <motion.span
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: EASE }}
              className="block h-full w-px origin-top bg-line"
            />
          </div>
          <div className="flex flex-col justify-center lg:col-span-6">
            <h2 className="font-display text-[clamp(38px,5.4vw,84px)] font-semibold leading-[0.92] tracking-[-0.045em]">
              <MaskLines lines={['GUIDED BY', <>CURIOSITY<span className="text-nv">.</span></>]} />
            </h2>
            <Reveal delay={0.15}>
              <div className="mt-14 border-t border-line pt-8">
                <p className="label text-nv">AI CLASS PROFESSOR</p>
                <p className="mt-4 font-display text-[clamp(30px,3.6vw,52px)] font-medium leading-none tracking-[-0.035em]">
                  Professor Sam Chugthai
                </p>
                <p className="label mt-4 !text-[10px] text-mute">NATIONAL UNIVERSITY – FAIRVIEW</p>
              </div>
            </Reveal>
            <Reveal delay={0.25}>
              <p className="mt-10 max-w-[480px] text-[17px] leading-relaxed text-mute">
                Guiding NVGENESIS as we explore the foundations, possibilities, and responsibilities of artificial intelligence.
              </p>
            </Reveal>
            <Reveal delay={0.35}>
              <div className="mt-12 grid max-w-[480px] grid-cols-3 border-y border-line">
                {['FOUNDATIONS', 'POSSIBILITIES', 'RESPONSIBILITIES'].map((w, i) => (
                  <div key={w} className={`py-4 ${i > 0 ? 'border-l border-line pl-3' : ''}`}>
                    <span className="label block !text-[9px] text-nv">0{i + 1}</span>
                    <span className="label mt-1 block !text-[9px] text-paper sm:!text-[10px]">{w}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
