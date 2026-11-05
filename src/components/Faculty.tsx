import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import Portrait from './Portrait'
import { ArrowUpRight } from 'lucide-react'
import { PROFESSOR_LINKEDIN } from '../data'
import { EASE, Marker, MaskLines, Reveal } from './ui'

export default function Faculty() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%'])

  return (
    <section id="professor" ref={ref} className="relative overflow-hidden pb-10 pt-2 md:pb-14 md:pt-4">
      <div className="shell relative">
        <Marker>Our professor</Marker>
        <div className="mt-5 grid gap-12 lg:mt-6 lg:grid-cols-12 lg:gap-0">
          <div className="lg:col-span-5">
            <motion.div
              initial={{ clipPath: 'inset(100% 0 0 0)' }}
              whileInView={{ clipPath: 'inset(0% 0 0 0)' }}
              viewport={{ once: true, margin: '-15% 0px' }}
              transition={{ duration: 1.1, ease: EASE }}
              className="relative aspect-[4/5] w-full max-w-[280px] overflow-hidden border border-line lg:max-w-[340px]"
            >
              <motion.div style={{ y: imgY }} className="absolute -inset-[6%]">
                <Portrait name="Sam Chughtai" seed={99} large className="h-full w-full" />
              </motion.div>
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
            <h2 className="font-display text-[clamp(36px,4.8vw,72px)] font-semibold leading-[0.98] tracking-[-0.04em]">
              <MaskLines lines={['Professor', 'Sam Chughtai']} />
            </h2>
            <Reveal delay={0.15}>
              <p className="mt-6 text-[17px] leading-relaxed text-paper">Instructor, AI class</p>
              <p className="mt-6 max-w-[500px] text-[16px] leading-relaxed text-mute">
                Professor Chughtai leads the class and sets its direction: what we build, what we read, and which questions we take on. His focus is
                that students understand how AI systems work and where they fail, not just how to prompt them.
              </p>
            </Reveal>
            <Reveal delay={0.25}>
              <a
                href={PROFESSOR_LINKEDIN}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-10 inline-flex w-fit items-center gap-2 border border-line px-5 py-3 text-[14px] transition-colors hover:border-nv hover:text-lime"
              >
                View LinkedIn profile <ArrowUpRight className="h-4 w-4" />
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
