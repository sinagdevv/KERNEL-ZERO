import { motion } from "motion/react"
import { useState } from "react"
import { FACILITATORS } from "../data"
import { EASE, Marker, MaskLines, Reveal } from "./ui"

export default function Facilitators() {
  const [active, setActive] = useState(0)

  return (
    <section
      id="facilitators"
      className="relative overflow-hidden border-b border-line py-24 md:py-36"
    >
      <div className="shell">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <Marker>Student facilitators</Marker>
            <h2 className="mt-10 font-display text-[clamp(42px,7vw,112px)] font-semibold leading-[0.86] tracking-[-0.06em]">
              <MaskLines
                lines={[
                  "HELPING IDEAS",
                  <span className="text-mute">MOVE.</span>,
                ]}
              />
            </h2>
          </div>
          <Reveal className="lg:col-span-4 lg:pb-2" delay={0.1}>
            <p className="max-w-[320px] text-[16px] leading-relaxed text-mute">
              Helping ideas move from discussion to discovery.
            </p>
            <p className="label mt-6 text-nv">05 / STUDENT FACILITATORS</p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-4 md:mt-24 md:grid-cols-5">
          {FACILITATORS.map((person, index) => {
            const isActive = active === index
            return (
              <motion.button
                key={person.name}
                onClick={() => setActive(index)}
                onMouseEnter={() => setActive(index)}
                onFocus={() => setActive(index)}
                className={`group relative overflow-hidden border text-left transition-[border-color,background,transform] duration-500 ${
                  isActive
                    ? "border-nv bg-carbon/70 md:-translate-y-3"
                    : "border-line bg-carbon/20 hover:border-mute"
                }`}
                aria-label={`Focus ${person.name}`}
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-carbon">
                  <img
                    src={person.image}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className={`h-full w-full object-contain object-center transition-[filter,transform,opacity] duration-500 ${
                      isActive
                        ? "scale-[1.02] opacity-100"
                        : "opacity-75 grayscale-[0.2] group-hover:opacity-100 group-hover:grayscale-0"
                    }`}
                  />
                  <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_62%,rgba(5,7,5,0.24))]" />
                  <span className="pointer-events-none absolute bottom-4 left-4 h-8 w-8 border-b border-l border-nv/70" />
                </div>
                <span className="absolute left-4 top-4 label text-nv">
                  0{index + 1} / NODE
                </span>
                <span className="absolute right-4 top-4 h-8 w-8 border-r border-t border-line transition-colors group-hover:border-nv" />
                <div className="bg-obsidian/95 p-4">
                  <p className="label mb-3 text-mute">STUDENT FACILITATOR</p>
                  <p
                    className={`font-display text-[clamp(20px,2vw,28px)] font-medium leading-none tracking-[-0.035em] transition-colors ${
                      isActive ? "text-lime" : "text-paper"
                    }`}
                  >
                    {person.label}
                  </p>
                  <div
                    className={`mt-4 h-px bg-nv transition-transform duration-500 origin-left ${
                      isActive ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </div>
              </motion.button>
            )
          })}
        </div>
        <div className="mt-5 flex items-center justify-between label text-mute">
          <span>SELECT A NODE TO SHIFT FOCUS</span>
          <span>{FACILITATORS[active].name}</span>
        </div>
      </div>
    </section>
  )
}
