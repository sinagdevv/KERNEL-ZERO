import { motion, useReducedMotion, useScroll, useTransform } from "motion/react"
import { ArrowUpRight } from "lucide-react"
import { useRef } from "react"
import { BRAND, PROFESSOR_LINKEDIN } from "../data"
import { EASE, Marker, MaskLines, Reveal } from "./ui"

function FacultyGeometry() {
  return (
    <svg
      viewBox="0 0 720 720"
      className="absolute inset-0 h-full w-full opacity-70"
      aria-hidden
    >
      <g fill="none" stroke="#273027" strokeWidth="1">
        {Array.from({ length: 11 }, (_, i) => (
          <circle
            key={i}
            cx="430"
            cy="330"
            r={90 + i * 28}
            strokeDasharray={i % 2 ? "2 10" : undefined}
          />
        ))}
        <path d="M20 620H700M90 520H680M180 420H700M310 100V650M460 50V700M590 140V670" />
      </g>
      <circle cx="430" cy="330" r="3" fill="#A3FF12" />
      <circle
        cx="430"
        cy="330"
        r="140"
        fill="none"
        stroke="#76B900"
        strokeDasharray="3 16"
      />
    </svg>
  )
}

export default function Faculty() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })
  const imageY = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"])

  return (
    <section
      id="professor"
      ref={ref}
      className="relative overflow-hidden border-b border-line pb-24 pt-16 md:pb-36 md:pt-24"
    >
      <div className="shell">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Marker>Professor spotlight</Marker>
          <span className="label text-mute">01 / THE MENTOR</span>
        </div>
        <div className="mt-12 grid items-center gap-12 lg:grid-cols-12 lg:gap-0">
          <div className="relative min-h-[560px] overflow-hidden border border-line bg-carbon/30 lg:col-span-7 lg:min-h-[720px]">
            <FacultyGeometry />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_65%_38%,rgba(118,185,0,0.18),transparent_38%),linear-gradient(120deg,transparent_50%,rgba(5,7,5,0.86))]" />
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-12% 0px" }}
              transition={{ duration: 0.9, ease: EASE }}
              style={{ y: reduce ? 0 : imageY }}
              className="absolute inset-x-[7%] bottom-0 top-[8%] flex items-end justify-center"
            >
              <img
                src="/portraits/sam-chughtai-cutout.png"
                alt="Sam Chughtai"
                className="h-full w-full object-contain object-bottom drop-shadow-[0_0_36px_rgba(118,185,0,0.14)]"
              />
            </motion.div>
            <div className="absolute left-5 top-5 label text-nv">
              K//0 / FACULTY_NODE
            </div>
            <div className="absolute bottom-5 left-5 right-5 flex justify-between label text-mute">
              <span>RUNTIME AUTHORITY</span>
              <span>DECISION PROVENANCE</span>
            </div>
          </div>

          <div className="relative z-10 lg:col-span-5 lg:-ml-16">
            <div className="border border-line bg-obsidian/95 p-7 md:p-10">
              <span className="label text-nv">{BRAND.institution}</span>
              <h2 className="mt-7 font-display text-[clamp(44px,6vw,90px)] font-semibold leading-[0.86] tracking-[-0.06em]">
                <MaskLines lines={["Sam", "Chughtai"]} />
              </h2>
              <Reveal delay={0.18}>
                <p className="mt-8 font-display text-[20px] leading-snug text-paper/85">
                  Professor / Class Mentor
                </p>
                <p className="mt-6 text-[16px] leading-relaxed text-mute">
                  Professor Sam Chughtai guides our exploration of artificial
                  intelligence, with professional interests spanning agentic and
                  physical AI, governance, runtime authority, and decision
                  provenance. His perspective connects classroom learning with
                  the challenges of building accountable intelligent systems.
                </p>
              </Reveal>
              <Reveal delay={0.28}>
                <a
                  href={PROFESSOR_LINKEDIN}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-9 inline-flex items-center gap-2 border border-line px-5 py-3 label text-paper transition-colors hover:border-nv hover:text-lime"
                >
                  View LinkedIn profile <ArrowUpRight className="h-4 w-4" />
                </a>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
