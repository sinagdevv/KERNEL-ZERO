import { motion, useMotionValueEvent, useScroll, useTransform } from 'motion/react'
import { useRef, useState } from 'react'
import { Marker, Reveal, MaskLines } from './ui'

const STAGES = ['INPUT', 'PROCESSING', 'REASONING', 'OUTPUT']
const COLS = [4, 6, 5, 2]

export default function Manifesto() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const [stage, setStage] = useState(0)
  const [frac, setFrac] = useState(0)
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setFrac(v)
    setStage(Math.min(3, Math.floor(v * 4.2)))
  })
  const x1 = useTransform(scrollYProgress, [0, 1], ['0%', '-12%'])
  const x2 = useTransform(scrollYProgress, [0, 1], ['-6%', '4%'])

  const W = 480, H = 380
  const pts = COLS.map((n, c) => Array.from({ length: n }, (_, i) => ({ x: 50 + c * 127, y: H / 2 + (i - (n - 1) / 2) * 52 })))

  return (
    <section id="overview" ref={ref} className="relative border-t border-line lg:h-[240vh]">
      <div className="lg:sticky lg:top-0 lg:flex lg:h-screen lg:items-center">
        <div className="shell grid gap-14 py-24 lg:grid-cols-12 lg:gap-10 lg:py-0">
          <div className="lg:col-span-6">
            <Marker>Our origin</Marker>
            <h2 className="mt-10 overflow-hidden font-display text-[clamp(38px,5.2vw,76px)] font-semibold leading-[0.88] tracking-[-0.05em]">
              <motion.span style={{ x: x1 }} className="block whitespace-nowrap">
                <MaskLines lines={['Intelligence']} />
              </motion.span>
              <motion.span style={{ x: x2 }} className="block whitespace-nowrap text-mute">
                <MaskLines lines={["isn't magic."]} delay={0.08} />
              </motion.span>
              <span className="block whitespace-nowrap">
                <MaskLines lines={[<>It's engineered<span className="text-nv">.</span></>]} delay={0.16} />
              </span>
            </h2>
            <Reveal delay={0.2}>
              <p className="mt-10 max-w-[520px] text-[16px] leading-relaxed text-mute">
                NVGENESIS brings together students who want to look beyond AI interfaces and understand the systems underneath. We study how models
                learn, how agents make decisions, and how intelligent technologies can be built responsibly.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <p className="label mt-10 flex flex-wrap gap-x-3 gap-y-2 !text-[10px] text-mute">
                {['CURIOSITY', 'EXPERIMENTATION', 'ENGINEERING', 'RESPONSIBILITY'].map((w, i) => (
                  <span key={w} className="flex gap-3">
                    <span className={i === stage ? 'text-paper' : ''}>{w}</span>
                    {i < 3 && <span className="text-line">/</span>}
                  </span>
                ))}
              </p>
            </Reveal>
          </div>

          <Reveal className="lg:col-span-6" delay={0.1}>
            <div className="relative border border-line bg-carbon/40 p-5 md:p-8">
              <div className="flex items-center justify-between">
                <span className="label !text-[10px] text-mute">Forward pass</span>
                <span className="label !text-[10px] text-nv">Step {stage + 1} of 4</span>
              </div>
              <svg viewBox={`0 0 ${W} ${H}`} className="mt-4 w-full" aria-label={`Neural computation diagram, active stage ${STAGES[stage]}`} role="img">
                {pts.slice(0, -1).map((col, c) =>
                  col.map((a, ai) =>
                    pts[c + 1].map((b, bi) => {
                      const lit = c < stage
                      const hot = c === stage - 1
                      return (
                        <line
                          key={`${c}-${ai}-${bi}`}
                          x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                          stroke={lit ? (hot ? '#A3FF12' : '#76B900') : '#263026'}
                          strokeOpacity={lit ? (hot ? 0.75 : 0.35) : 1}
                          strokeWidth="0.8"
                          strokeDasharray={hot ? '4 6' : undefined}
                          className={hot ? 'animate-dash' : ''}
                          style={{ transition: 'stroke 400ms, stroke-opacity 400ms' }}
                        />
                      )
                    }),
                  ),
                )}
                {pts.map((col, c) =>
                  col.map((p, i) => (
                    <g key={`${c}-${i}`}>
                      <rect
                        x={p.x - 6} y={p.y - 6} width="12" height="12"
                        fill={c === stage ? '#A3FF12' : '#080A08'}
                        stroke={c <= stage ? '#76B900' : '#8B938C'}
                        strokeWidth="1"
                        style={{ transition: 'fill 400ms, stroke 400ms' }}
                      />
                    </g>
                  )),
                )}
                {STAGES.map((s, c) => (
                  <text
                    key={s} x={50 + c * 127} y={H - 8} textAnchor="middle"
                    fill={c <= stage ? '#F5F7F3' : '#8B938C'}
                    fontSize="10" fontFamily="JetBrains Mono" letterSpacing="1.5"
                  >
                    {s}
                  </text>
                ))}
              </svg>
              <div className="mt-6 flex items-center gap-3">
                {STAGES.map((s, i) => (
                  <div key={s} className="flex flex-1 items-center gap-3">
                    <div className="relative h-px flex-1 bg-line">
                      <div
                        className="absolute inset-y-0 left-0 bg-nv"
                        style={{ width: `${Math.max(0, Math.min(1, frac * 4.2 - i)) * 100}%` }}
                      />
                    </div>
                    {i < 3 && <span className="label !text-[10px] text-mute">→</span>}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
