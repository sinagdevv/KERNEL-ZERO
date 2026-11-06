import { AnimatePresence, motion } from "motion/react"
import { ArrowUpRight, Grid2X2, List, Search, X } from "lucide-react"
import { useMemo, useState } from "react"
import { initials, STUDENTS } from "../data"
import { EASE, Marker, MaskLines, Reveal } from "./ui"

function markFor(index: number) {
  const rotation = (index * 37) % 360
  const inset = 18 + (index % 4) * 7
  return (
    <svg
      viewBox="0 0 100 100"
      className="h-16 w-16 text-nv transition-transform duration-500 group-hover:rotate-45"
      aria-hidden
    >
      <rect
        x="8"
        y="8"
        width="84"
        height="84"
        fill="none"
        stroke="currentColor"
        strokeOpacity=".35"
      />
      <rect
        x={inset}
        y={inset}
        width={100 - inset * 2}
        height={100 - inset * 2}
        fill="none"
        stroke="currentColor"
        strokeDasharray="2 7"
        transform={`rotate(${rotation} 50 50)`}
      />
      <path d={`M50 8v84M8 50h84`} stroke="currentColor" strokeOpacity=".28" />
      <circle cx="50" cy="50" r={5 + (index % 3) * 2} fill="currentColor" />
    </svg>
  )
}

export default function Cohort() {
  const [query, setQuery] = useState("")
  const [sort, setSort] = useState<"index" | "alpha">("index")
  const [view, setView] = useState<"grid" | "list">("grid")
  const list = useMemo(() => {
    const filtered = STUDENTS.map((name, index) => ({ name, index })).filter(
      ({ name }) => name.toLowerCase().includes(query.trim().toLowerCase()),
    )
    return sort === "alpha"
      ? filtered.sort((a, b) => a.name.localeCompare(b.name))
      : filtered
  }, [query, sort])

  return (
    <section id="cohort" className="relative py-24 md:py-36">
      <div className="shell">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Marker>The intelligence index</Marker>
            <h2 className="mt-10 font-display text-[clamp(44px,7vw,112px)] font-semibold leading-[0.86] tracking-[-0.06em]">
              <MaskLines
                lines={[
                  "16 MINDS.",
                  <span className="text-mute">ONE SHARED</span>,
                  "CURIOSITY.",
                ]}
              />
            </h2>
          </div>
          <Reveal className="self-end lg:col-span-4" delay={0.1}>
            <p className="max-w-[360px] text-[16px] leading-relaxed text-mute">
              A photography-free directory for a cohort learning to understand
              intelligence from the inside out.
            </p>
            <p className="label mt-6 text-nv">
              16 CONFIRMED STUDENTS / NO SOCIAL LINKS
            </p>
          </Reveal>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-y border-line py-3 md:mt-20 sm:flex-row sm:items-center sm:justify-between">
          <label className="flex flex-1 items-center gap-3 px-1 sm:max-w-sm">
            <Search className="h-4 w-4 shrink-0 text-mute" />
            <span className="sr-only">Search students by name</span>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search the index"
              className="w-full bg-transparent py-2 text-[15px] text-paper outline-none placeholder:text-mute"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="text-mute hover:text-paper cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </label>
          <div className="flex flex-wrap items-center gap-3">
            <span className="label !text-[10px] text-mute" aria-live="polite">
              {String(list.length).padStart(2, "0")} / {STUDENTS.length} SHOWN
            </span>
            <button
              onClick={() => setSort(sort === "index" ? "alpha" : "index")}
              className="label border border-line px-3 py-2 !text-[10px] text-mute transition-colors hover:border-nv hover:text-paper cursor-pointer"
              aria-label={`Sort ${
                sort === "index" ? "alphabetically" : "by student number"
              }`}
            >
              {sort === "index" ? "SORT A–Z" : "SORT INDEX"}
            </button>
            <div
              className="flex border border-line"
              role="group"
              aria-label="View mode"
            >
              <button
                onClick={() => setView("grid")}
                aria-pressed={view === "grid"}
                className={`p-2 transition-colors cursor-pointer ${
                  view === "grid"
                    ? "bg-paper text-obsidian"
                    : "text-mute hover:text-paper"
                }`}
              >
                <Grid2X2 className="h-4 w-4" />
              </button>
              <button
                onClick={() => setView("list")}
                aria-pressed={view === "list"}
                className={`p-2 transition-colors cursor-pointer ${
                  view === "list"
                    ? "bg-paper text-obsidian"
                    : "text-mute hover:text-paper"
                }`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait" initial={false}>
          {view === "grid" ? (
            <motion.ul
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-8 grid gap-px border-l border-t border-line sm:grid-cols-2 lg:grid-cols-4"
            >
              {list.map(({ name, index }, order) => (
                <motion.li
                  key={name}
                  layout
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{
                    duration: 0.35,
                    delay: Math.min(order, 8) * 0.025,
                    ease: EASE,
                  }}
                  className="group relative min-h-[210px] border-b border-r border-line bg-carbon/15 p-5 transition-colors hover:bg-carbon/70"
                >
                  <div className="flex items-start justify-between">
                    <span className="label text-nv">
                      {String(index + 1).padStart(3, "0")} /
                    </span>
                    <span className="font-display text-2xl font-medium tracking-[-0.04em] text-mute transition-colors group-hover:text-lime">
                      {initials(name)}
                    </span>
                  </div>
                  <div className="absolute bottom-5 left-5 right-5">
                    <div className="mb-3">{markFor(index)}</div>
                    <p className="font-display text-[19px] leading-tight tracking-[-0.025em] transition-colors group-hover:text-lime">
                      {name}
                    </p>
                    <p className="label mt-2 !text-[9px] text-mute">
                      COHORT / KERNEL//ZERO
                    </p>
                  </div>
                </motion.li>
              ))}
            </motion.ul>
          ) : (
            <motion.ul
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-4"
            >
              {list.map(({ name, index }, order) => (
                <motion.li
                  key={name}
                  layout
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.3,
                    delay: Math.min(order, 8) * 0.025,
                    ease: EASE,
                  }}
                  className="border-b border-line"
                >
                  <div className="group grid grid-cols-[4rem_1fr_auto] items-center gap-4 py-5 transition-colors hover:bg-carbon/60 md:grid-cols-12">
                    <span className="label pl-2 text-nv md:col-span-1">
                      {String(index + 1).padStart(3, "0")}
                    </span>
                    <span className="font-display text-[clamp(22px,3vw,40px)] font-medium tracking-[-0.04em] transition-transform duration-200 group-hover:translate-x-1.5 md:col-span-8">
                      {name}
                    </span>
                    <span className="label text-mute md:col-span-2">
                      {initials(name)} / COHORT
                    </span>
                    <ArrowUpRight className="mr-2 h-5 w-5 text-mute transition-transform group-hover:rotate-45 group-hover:text-lime" />
                  </div>
                </motion.li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
        {list.length === 0 && (
          <div className="py-20 text-center">
            <p className="label text-mute">NO MATCH FOR “{query}”</p>
            <button
              onClick={() => setQuery("")}
              className="label mt-4 text-nv underline-offset-4 hover:underline cursor-pointer"
            >
              CLEAR SEARCH
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
