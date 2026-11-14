import { motion, useReducedMotion } from "motion/react"
import { ArrowUpRight } from "lucide-react"
import {
  NVIDIA_AVAILABLE,
  NVIDIA_CREDENTIALS,
  NVIDIA_FOCUS,
  NVIDIA_IN_COURSE,
  NVIDIA_LINKS,
} from "../research"
import { Marker, Reveal } from "./ui"

/** Original, illustrative diagram. Not an NVIDIA architecture drawing. */
function ComputeDiagram() {
  const reduce = useReducedMotion()
  const cols = 8
  const rows = 4

  return (
    <figure>
      <svg
        viewBox="0 0 480 360"
        className="w-full border border-line bg-carbon/30"
        role="img"
        aria-label="Illustrative diagram of a parallel processor: a grid of compute units above a shared cache and memory."
      >
        <text x="20" y="28" className="fill-mute font-mono text-[10px]" letterSpacing="1.4">
          PARALLEL COMPUTE UNITS
        </text>
        {Array.from({ length: rows * cols }, (_, i) => {
          const c = i % cols
          const r = Math.floor(i / cols)
          return (
            <motion.rect
              key={i}
              x={20 + c * 56}
              y={42 + r * 46}
              width="48"
              height="38"
              fill="none"
              strokeWidth="1"
              className="stroke-nv"
              initial={{ strokeOpacity: 0.3 }}
              animate={
                reduce
                  ? { strokeOpacity: 0.5 }
                  : { strokeOpacity: [0.25, 0.9, 0.25] }
              }
              transition={{
                duration: 3.2,
                repeat: Infinity,
                delay: (c + r) * 0.18,
                ease: "easeInOut",
              }}
            />
          )
        })}
        <text x="20" y="246" className="fill-mute font-mono text-[10px]" letterSpacing="1.4">
          SHARED CACHE
        </text>
        <rect x="20" y="254" width="440" height="22" fill="none" className="stroke-line" />
        <text x="20" y="302" className="fill-mute font-mono text-[10px]" letterSpacing="1.4">
          MEMORY
        </text>
        <rect x="20" y="310" width="440" height="26" fill="none" className="stroke-line" strokeDasharray="4 6" />
        <g className="stroke-line" strokeWidth="1">
          {[44, 156, 268, 380].map((x) => (
            <g key={x}>
              <line x1={x} y1="226" x2={x} y2="254" />
              <line x1={x} y1="276" x2={x} y2="310" />
            </g>
          ))}
        </g>
      </svg>
      <figcaption className="mt-3 label !text-[10px] leading-relaxed text-mute">
        ILLUSTRATIVE DIAGRAM — ORIGINAL KERNEL//ZERO ARTWORK. NOT AN NVIDIA
        ARCHITECTURE DIAGRAM.
      </figcaption>
    </figure>
  )
}

export default function Nvidia() {
  const verified = Object.entries(NVIDIA_CREDENTIALS)

  return (
    <section
      id="nvidia"
      className="border-b border-line py-20 md:py-32"
      aria-labelledby="nvidia-heading"
    >
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <Marker>RESEARCH INFRASTRUCTURE / ACCELERATED COMPUTING</Marker>
            <h2
              id="nvidia-heading"
              className="mt-8 font-display text-[clamp(34px,4.6vw,72px)] font-semibold leading-[0.92] tracking-[-0.05em]"
            >
              EXPLORING INTELLIGENCE AT THE ARCHITECTURAL LEVEL.
            </h2>
            <Reveal delay={0.1}>
              <p className="mt-8 max-w-[560px] text-[16px] leading-relaxed text-paper/85">
                Beyond AI applications, our research explores the computing
                architectures, development tools, and technical foundations
                that enable intelligent systems. NVIDIA's developer ecosystem
                supports our learning through technical resources, tools, and
                educational materials.
              </p>
              <p className="mt-4 max-w-[560px] text-[14px] leading-relaxed text-mute">
                NVIDIA Developer accounts were introduced early in our
                coursework, providing access to a broader ecosystem of
                developer resources for studying AI and accelerated computing.
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-6">
            <ComputeDiagram />
            <dl className="mt-6 grid gap-4 border-t border-line pt-5 text-[14px] sm:grid-cols-2">
              <div>
                <dt className="label !text-[10px] text-mute">Course research track</dt>
                <dd className="mt-1.5 label !text-[11px] leading-snug text-lime">
                  NVIDIA ARCHITECTURE RESEARCH
                </dd>
              </div>
              <div>
                <dt className="label !text-[10px] text-mute">Research focus</dt>
                <dd className="mt-1.5 leading-snug text-paper">
                  NVIDIA GPU Architecture &amp; Accelerated AI
                </dd>
              </div>
            </dl>
          </div>
        </div>

        <ul className="mt-16 grid border-y border-line sm:grid-cols-2 lg:grid-cols-4">
          {NVIDIA_FOCUS.map((f) => (
            <li
              key={f.n}
              className="border-b border-line p-5 last:border-b-0 sm:[&:nth-child(2)]:border-r-0 sm:odd:border-r lg:border-b-0 lg:border-r lg:last:border-r-0 lg:[&:nth-child(2)]:border-r"
            >
              <p className="label !text-[10px] text-nv">{f.n}</p>
              <p className="mt-2 label !text-[12px] text-paper">{f.name.toUpperCase()}</p>
              <p className="mt-2 text-[13px] leading-snug text-mute">{f.note}</p>
            </li>
          ))}
        </ul>

        <div className="mt-16 grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h3 className="label text-nv">NVIDIA DEVELOPER ECOSYSTEM</h3>
            <p className="mt-5 max-w-[460px] text-[15px] leading-relaxed text-paper/85">
              As part of our early AI coursework, we established NVIDIA
              Developer accounts to explore technical learning resources,
              documentation, development tools, and the broader
              accelerated-computing ecosystem.
            </p>
            <ul className="mt-6 flex flex-col gap-2">
              {NVIDIA_LINKS.map((l) => (
                <li key={l.url}>
                  <a
                    href={l.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between gap-4 border border-line px-4 py-3 text-[14px] transition-colors hover:border-nv"
                  >
                    {l.label}
                    <ArrowUpRight className="h-4 w-4 shrink-0 text-nv" aria-hidden />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:col-span-7">
            <div>
              <h3 className="label !text-[11px] text-mute">AVAILABLE THROUGH THE PROGRAM</h3>
              <p className="mt-2 text-[12px] text-mute">As described by NVIDIA.</p>
              <ul className="mt-4 border-t border-line">
                {NVIDIA_AVAILABLE.map((a) => (
                  <li key={a} className="border-b border-line py-2.5 text-[14px] text-paper/85">
                    {a}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="label !text-[11px] text-mute">IN THIS COURSE</h3>
              <p className="mt-2 text-[12px] text-mute">What KERNEL//ZERO covers.</p>
              <ul className="mt-4 border-t border-line">
                {NVIDIA_IN_COURSE.map((a) => (
                  <li key={a} className="border-b border-line py-2.5 text-[14px] text-paper/85">
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {verified.length > 0 && (
          <ul className="mt-12 border-t border-line">
            {verified.map(([name, c]) => (
              <li key={name} className="border-b border-line py-4 text-[14px]">
                <p className="font-display text-[20px] tracking-[-0.02em]">{name}</p>
                <p className="mt-1 text-mute">
                  {[
                    c.developerAccountVerified && "NVIDIA developer account verified",
                    c.researchInvolvement,
                    c.architectureDesignation,
                  ]
                    .filter(Boolean)
                    .join(" · ")}
                </p>
                {c.publicProfileUrl && (
                  <a
                    href={c.publicProfileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center gap-1 text-nv hover:text-lime"
                  >
                    Public profile <ArrowUpRight className="h-4 w-4" aria-hidden />
                  </a>
                )}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-12 max-w-[760px] border-l border-line pl-4 text-[12px] leading-relaxed text-mute">
          <p>
            The course research track is an academic focus of the KERNEL//ZERO
            class. It is not an NVIDIA job title, certification, or
            appointment. Listing a resource does not mean a student used it,
            completed a course, or ran on specific hardware, and no individual
            account details are published here.
          </p>
          <p className="mt-2">
            KERNEL//ZERO is an independent academic initiative. It is not
            affiliated with, sponsored, or endorsed by NVIDIA. NVIDIA is a
            trademark of NVIDIA Corporation.
          </p>
        </div>
      </div>
    </section>
  )
}
