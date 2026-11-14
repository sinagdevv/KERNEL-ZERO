import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react"
import { useRef } from "react"
import { Marker } from "./ui"

export default function Patents() {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const x = useSpring(mx, { stiffness: 80, damping: 20 })
  const y = useSpring(my, { stiffness: 80, damping: 20 })

  const onMove = (e: React.PointerEvent) => {
    if (reduce || e.pointerType !== "mouse") return
    const r = ref.current!.getBoundingClientRect()
    mx.set(((e.clientX - r.left) / r.width - 0.5) * 36)
    my.set(((e.clientY - r.top) / r.height - 0.5) * 24)
  }

  return (
    <section
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={() => {
        mx.set(0)
        my.set(0)
      }}
      className="group relative flex min-h-[100svh] items-center overflow-hidden pb-20 pt-28"
    >
      <div
        aria-hidden
        className="grid-bg pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_72%)]"
      />
      <div className="shell relative grid gap-10 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-7">
          <Marker>RESEARCH ARCHIVE / FUTURE WORK</Marker>
          <h1 className="mt-10 font-display text-[clamp(40px,6.5vw,104px)] font-semibold leading-[0.9] tracking-[-0.055em]">
            THE NEXT <span className="text-mute">BREAKTHROUGH?</span>
          </h1>
          <p className="mt-8 max-w-[520px] text-[17px] leading-relaxed text-mute">
            Under the research leadership of Professor Sam Chughtai, our team
            is exploring new approaches to security and governance in agentic
            AI systems. Details of ongoing intellectual property work remain
            undisclosed.
          </p>
          <p className="mt-10 border-l border-nv pl-4 label text-paper">
            UPCOMING RESEARCH / DETAILS UNDISCLOSED
          </p>
          <p className="mt-4 max-w-[420px] label !text-[10px] leading-relaxed text-mute opacity-100 transition-opacity duration-500 lg:opacity-0 lg:group-hover:opacity-100 lg:group-focus-within:opacity-100">
            No filing, status or technical detail is being published at this
            time.
          </p>
        </div>

        <div
          className="relative flex items-center justify-center lg:col-span-5"
          aria-hidden
        >
          <svg
            viewBox="0 0 400 400"
            className="absolute h-full w-full max-w-[420px] text-line"
            fill="none"
            stroke="currentColor"
          >
            <rect x="20" y="20" width="360" height="360" strokeDasharray="4 10" />
            <path d="M20 200H380M200 20V380" />
            <motion.circle
              cx="200"
              cy="200"
              r="150"
              className="text-nv"
              initial={reduce ? false : { pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2.4, ease: [0.22, 1, 0.36, 1] }}
            />
          </svg>
          <motion.span
            style={{ x, y }}
            className="relative select-none font-display text-[clamp(200px,32vw,420px)] font-semibold leading-none text-paper"
          >
            ?
          </motion.span>
        </div>
      </div>
    </section>
  )
}
