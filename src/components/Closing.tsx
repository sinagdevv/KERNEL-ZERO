import { motion, useReducedMotion } from "motion/react"

import { ArrowUp } from "lucide-react"

import { NAV, scrollToId } from "../data"

import { Wordmark } from "./Nav"

import { Magnetic, MaskLines, Reveal } from "./ui"

import { BRAND } from "../data"

function Geometry() {
  const reduce = useReducedMotion()

  const rings = [0, 1, 2, 3, 4, 5]

  return (
    <svg viewBox="0 0 800 800" className="h-full w-full" aria-hidden>
      {/* perspective floor */}
      <g stroke="#273027" strokeWidth="1">
        {Array.from({ length: 17 }, (_, i) => (
          <line key={`v${i}`} x1={400} y1={420} x2={-400 + i * 100} y2={800} />
        ))}
        {[440, 470, 515, 580, 670, 800].map((y) => (
          <line key={y} x1={0} x2={800} y1={y} y2={y} />
        ))}
      </g>
      {rings.map((r) => (
        <motion.g
          key={r}
          style={{ originX: "400px", originY: "360px" }}
          animate={reduce ? undefined : { rotate: r % 2 ? -360 : 360 }}
          transition={{
            duration: 60 + r * 18,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <rect
            x={400 - (60 + r * 46)}
            y={360 - (60 + r * 46)}
            width={(60 + r * 46) * 2}
            height={(60 + r * 46) * 2}
            fill="none"
            stroke={r === 2 ? "#76B900" : "#273027"}
            strokeOpacity={r === 2 ? 0.6 : 1}
            strokeWidth="1"
            transform={`rotate(${r * 15} 400 360)`}
            strokeDasharray={r % 2 ? "4 10" : undefined}
          />
          <rect
            x={400 + (60 + r * 46) - 3}
            y={357}
            width="6"
            height="6"
            fill={r === 2 ? "#A3FF12" : "#969F96"}
          />
        </motion.g>
      ))}
    </svg>
  )
}

export default function Closing() {
  return (
    <>
      <section className="relative flex min-h-[100svh] items-center overflow-hidden border-t border-line py-24">
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-80">
          <div className="aspect-square h-[130%] max-w-none md:h-[140%]">
            <Geometry />
          </div>
        </div>
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(8,10,8,0.85)_0%,rgba(8,10,8,0.3)_60%,transparent_100%)]" />
        <div className="shell relative text-center">
          <h2 className="font-display text-[clamp(44px,9.5vw,168px)] font-semibold leading-[0.88] tracking-[-0.055em]">
            <MaskLines
              lines={[
                "THE FUTURE DOESN'T",
                <>
                  BUILD ITSELF<span className="text-nv">.</span>
                </>,
              ]}
            />
          </h2>
          <Reveal delay={0.2}>
            <p className="label mt-10 text-mute">
              {BRAND.name} — {BRAND.tagline}
            </p>
          </Reveal>
          <Reveal delay={0.3} className="mt-12 flex justify-center">
            <Magnetic onClick={() => scrollToId("top")}>
              BACK TO THE BEGINNING{" "}
              <ArrowUp className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5" />
            </Magnetic>
          </Reveal>
        </div>
      </section>

      <footer className="border-t border-line">
        <div className="shell grid gap-12 py-16 md:grid-cols-12">
          <div className="md:col-span-5">
            <Wordmark className="text-[28px]" />
            <p className="label mt-6 !text-[10px] text-mute">
              AI CLASS COLLECTIVE
            </p>
            <p className="label mt-2 !text-[10px] text-mute">
              GUIDED BY PROFESSOR SAM CHUGTHAI
            </p>
          </div>
          <nav aria-label="Footer" className="md:col-span-4">
            <p className="label !text-[10px] text-nv">INDEX</p>
            <ul className="mt-4 grid grid-cols-2 gap-y-3">
              {[...NAV.program, ...NAV.people].map((n) => (
                <li key={n.id}>
                  <button
                    onClick={() => scrollToId(n.id)}
                    className="group relative text-[14px] text-mute transition-colors hover:text-paper cursor-pointer"
                  >
                    {n.label}
                    <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-nv transition-transform duration-[240ms] group-hover:scale-x-100" />
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="shell flex flex-col gap-3 border-t border-line py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="label !text-[10px] text-paper">
            BUILT ON CURIOSITY. DRIVEN BY INTELLIGENCE.
          </p>
          <p className="label !text-[10px] text-mute">
            K//0 © {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </>
  )
}
