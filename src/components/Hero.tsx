import { motion } from "motion/react"
import { ArrowDownRight, ArrowRight } from "lucide-react"
import HeroCanvas from "./HeroCanvas"
import { BRAND, scrollToId } from "../data"
import { EASE, Magnetic, MaskLines } from "./ui"

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col overflow-hidden"
    >
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.6, delay: 0.3 }}
      >
        <HeroCanvas />
      </motion.div>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_60%,rgba(5,7,5,0.94)_0%,rgba(5,7,5,0.62)_42%,transparent_76%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-obsidian to-transparent" />

      <div className="shell relative flex flex-1 flex-col justify-center pb-16 pt-32 md:pb-20">
        <div className="mb-8 flex items-center gap-3">
          <span className="h-px w-10 bg-nv" />
          <span className="label text-paper">{BRAND.institution}</span>
        </div>
        <h1 className="max-w-[1100px] font-display text-[clamp(52px,10.8vw,164px)] font-semibold leading-[0.84] tracking-[-0.065em]">
          <MaskLines
            animateNow
            delay={0.4}
            lines={[
              "INTELLIGENCE",
              "BEGINS AT",
              <span className="text-nv">THE CORE.</span>,
            ]}
          />
        </h1>

        <div className="mt-12 grid gap-10 md:grid-cols-12 md:items-end">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.0, ease: EASE }}
            className="max-w-[500px] text-[16px] leading-relaxed text-mute md:col-span-5"
          >
            {BRAND.name} is an AI class collective exploring how intelligent
            systems learn, reason, interact, and operate securely.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.15, ease: EASE }}
            className="flex flex-wrap items-start gap-3 md:col-span-7 md:justify-end"
          >
            <Magnetic onClick={() => scrollToId("learn")}>
              Explore the class{" "}
              <ArrowDownRight className="h-4 w-4 transition-transform duration-200 group-hover:rotate-[-45deg]" />
            </Magnetic>
            <Magnetic variant="ghost" onClick={() => scrollToId("professor")}>
              Meet the people{" "}
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Magnetic>
          </motion.div>
        </div>
      </div>

      <div className="shell relative flex items-end justify-between pb-6">
        <span className="label text-mute">{BRAND.secondaryTagline}</span>
        <button
          onClick={() => scrollToId("learn")}
          aria-label="Scroll to what we learn"
          className="group flex items-center gap-3 text-mute transition-colors hover:text-paper cursor-pointer"
        >
          <span className="label !text-[10px]">Scroll to enter</span>
          <span className="flex h-8 w-8 items-center justify-center border border-line transition-colors group-hover:border-nv">
            <ArrowDownRight className="h-4 w-4 text-nv" />
          </span>
        </button>
      </div>
    </section>
  )
}
