import { motion } from 'motion/react'
import { EASE, Marker, MaskLines, Reveal } from './ui'

const PILLARS = [
  { k: 'QUESTION', t: 'Challenge assumptions. Understand why intelligent systems behave the way they do.' },
  { k: 'BUILD', t: 'Turn ideas into experiments, workflows, models, and technical understanding.' },
  { k: 'SECURE', t: 'Explore how to make intelligent systems safer, more reliable, and accountable.' },
]

function Glyph({ i }: { i: number }) {
  const s = { stroke: '#76B900', strokeWidth: 1, fill: 'none' }
  return (
    <svg viewBox="0 0 80 80" className="h-16 w-16" aria-hidden>
      {i === 0 && (
        <g {...s}>
          <path d="M10 70 L40 40 L70 70 M40 40 L40 10 M40 40 L22 22 M40 40 L58 22" stroke="#263026" />
          <circle cx="40" cy="10" r="3" fill="#A3FF12" stroke="none" />
          <circle cx="40" cy="40" r="4" />
          <path d="M40 40 L58 22" strokeDasharray="3 3" className="animate-dash" />
        </g>
      )}
      {i === 1 && (
        <g {...s}>
          <rect x="12" y="52" width="56" height="16" stroke="#263026" />
          <rect x="20" y="34" width="40" height="16" stroke="#263026" />
          <rect x="28" y="16" width="24" height="16" />
          <rect x="36" y="22" width="8" height="4" fill="#A3FF12" stroke="none" />
        </g>
      )}
      {i === 2 && (
        <g {...s}>
          <rect x="8" y="8" width="64" height="64" stroke="#263026" />
          <rect x="20" y="20" width="40" height="40" stroke="#263026" />
          <rect x="32" y="32" width="16" height="16" />
          <rect x="37" y="37" width="6" height="6" fill="#A3FF12" stroke="none" />
        </g>
      )}
    </svg>
  )
}

export default function Principles() {
  return (
    <section className="relative border-t border-line py-24 md:py-36">
      <div className="shell">
        <Marker>06 / OUR PRINCIPLES</Marker>
        <h2 className="mt-10 font-display text-[clamp(38px,7vw,120px)] font-semibold leading-[0.9] tracking-[-0.05em]">
          <MaskLines lines={['QUESTION.', <span className="text-mute">BUILD.</span>, <>UNDERSTAND<span className="text-nv">.</span></>]} />
        </h2>

        <div className="mt-20 md:mt-28">
          {PILLARS.map((p, i) => (
            <div key={p.k} className="relative">
              <motion.span
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, margin: '-10% 0px' }}
                transition={{ duration: 1.1, ease: EASE }}
                className="absolute left-0 top-0 block h-px w-full origin-left bg-line"
              />
              <motion.span
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, margin: '-10% 0px' }}
                transition={{ duration: 0.9, delay: 0.3, ease: EASE }}
                className="absolute left-0 top-0 block h-px w-24 origin-left bg-nv"
              />
              <div className="grid gap-6 py-10 md:grid-cols-12 md:gap-8 md:py-16">
                <Reveal className="md:col-span-2">
                  <span className="label text-nv">0{i + 1} /</span>
                </Reveal>
                <Reveal className="md:col-span-5" delay={0.06}>
                  <p className="font-display text-[clamp(48px,7.5vw,128px)] font-semibold leading-[0.85] tracking-[-0.055em]">{p.k}</p>
                </Reveal>
                <Reveal className="flex items-end gap-6 md:col-span-5 md:justify-between" delay={0.12}>
                  <p className="max-w-[360px] font-display text-[clamp(18px,1.6vw,24px)] leading-snug tracking-[-0.015em] text-paper/80">{p.t}</p>
                  <Glyph i={i} />
                </Reveal>
              </div>
            </div>
          ))}
          <span className="block h-px w-full bg-line" />
        </div>
      </div>
    </section>
  )
}
