import { AnimatePresence, motion } from 'motion/react'
import { ArrowUpRight, ChevronLeft, ChevronRight, LayoutGrid, List, Search, X } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { STUDENTS } from '../data'
import Portrait from './Portrait'
import { GithubIcon, GmailIcon, LinkedinIcon } from './SocialIcons'
import { EASE, Marker, MaskLines, Reveal } from './ui'

const pad = (n: number) => String(n).padStart(2, '0')

export default function Cohort() {
  const [q, setQ] = useState('')
  const [view, setView] = useState<'grid' | 'list'>('grid')
  const [sel, setSel] = useState<number | null>(null)

  const list = useMemo(
    () => STUDENTS.map((name, i) => ({ name, i })).filter((s) => s.name.toLowerCase().includes(q.trim().toLowerCase())),
    [q],
  )

  return (
    <section id="cohort" className="relative border-t border-line py-24 md:py-36">
      <div className="shell">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Marker>The minds</Marker>
            <h2 className="mt-10 font-display text-[clamp(38px,6vw,96px)] font-semibold leading-[0.92] tracking-[-0.045em]">
              <MaskLines lines={['THE PEOPLE', 'BEHIND NVGENESIS.']} />
            </h2>
          </div>
          <Reveal className="self-end lg:col-span-4" delay={0.1}>
            <p className="label text-nv">14 MINDS / ONE COLLECTIVE</p>
            <p className="mt-4 max-w-[360px] text-[15px] leading-relaxed text-mute">
              Different minds. Shared curiosity. One journey into artificial intelligence.
            </p>
          </Reveal>
        </div>

        {/* controls */}
        <div className="mt-14 flex flex-col gap-3 border-y border-line py-3 sm:flex-row sm:items-center sm:justify-between md:mt-20">
          <label className="flex flex-1 items-center gap-3 px-1 sm:max-w-sm">
            <Search className="h-4 w-4 shrink-0 text-mute" />
            <span className="sr-only">Search students by name</span>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search by name"
              className="w-full bg-transparent py-2 text-[14px] text-paper outline-none placeholder:text-mute"
            />
            {q && (
              <button onClick={() => setQ('')} aria-label="Clear search" className="text-mute hover:text-paper cursor-pointer">
                <X className="h-4 w-4" />
              </button>
            )}
          </label>
          <div className="flex items-center justify-between gap-6">
            <span className="label !text-[10px] text-mute" aria-live="polite">
              {pad(list.length)} / 14 SHOWN
            </span>
            <div className="flex border border-line" role="group" aria-label="View mode">
              {(['grid', 'list'] as const).map((v) => (
                <button
                  key={v}
                  onClick={() => setView(v)}
                  aria-pressed={view === v}
                  className={`label flex items-center gap-2 px-3 py-2 !text-[10px] transition-colors duration-200 cursor-pointer ${
                    view === v ? 'bg-paper text-obsidian' : 'text-mute hover:text-paper'
                  }`}
                >
                  {v === 'grid' ? <LayoutGrid className="h-3.5 w-3.5" /> : <List className="h-3.5 w-3.5" />}
                  {v === 'grid' ? 'GRID' : 'DIRECTORY'}
                </button>
              ))}
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {view === 'grid' ? (
            <motion.ul
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="mt-8 grid grid-cols-1 gap-x-4 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            >
              <AnimatePresence>
                {list.map((s, k) => (
                  <motion.li
                    key={s.name}
                    layout
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    viewport={{ once: true, margin: '-5% 0px' }}
                    transition={{ duration: 0.55, delay: (k % 4) * 0.07, ease: EASE }}
                  >
                    <StudentCard name={s.name} index={s.i} onOpen={() => setSel(s.i)} />
                  </motion.li>
                ))}
                {!q && (
                  <motion.li
                    key="note"
                    layout
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="flex flex-col justify-between border border-dashed border-line p-6 sm:col-span-2 lg:col-span-1 xl:col-span-2"
                  >
                    <span className="label !text-[10px] text-nv">NOTE / PORTRAITS</span>
                    <p className="mt-10 max-w-[380px] font-display text-[22px] leading-tight tracking-[-0.02em] text-paper/90">
                      Abstract placeholders stand in until each student approves their own photograph.
                    </p>
                    <span className="label mt-8 !text-[10px] text-mute">FACULTY LISTED SEPARATELY — SEE 04 / THE MENTOR</span>
                  </motion.li>
                )}
              </AnimatePresence>
            </motion.ul>
          ) : (
            <motion.ul
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="mt-4"
            >
              {list.map((s, k) => (
                <motion.li
                  key={s.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.45, delay: k * 0.05, ease: EASE }}
                  className="border-b border-line"
                >
                  <button
                    onClick={() => setSel(s.i)}
                    data-cursor="OPEN"
                    className="group grid w-full grid-cols-[3rem_1fr_auto] items-center gap-4 py-5 text-left transition-colors duration-200 hover:bg-carbon/60 md:grid-cols-12 cursor-pointer"
                  >
                    <span className="label pl-2 text-mute transition-colors group-hover:text-nv md:col-span-1">{pad(s.i + 1)}</span>
                    <span className="font-display text-[clamp(20px,2.6vw,36px)] font-medium tracking-[-0.03em] transition-transform duration-[240ms] group-hover:translate-x-1.5 md:col-span-10">
                      {s.name}
                    </span>
                    <span className="flex justify-end pr-2 md:col-span-1">
                      <ArrowUpRight className="h-5 w-5 text-mute transition-transform duration-[240ms] group-hover:rotate-45 group-hover:text-lime" strokeWidth={1.25} />
                    </span>
                  </button>
                </motion.li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>

        {list.length === 0 && (
          <div className="flex flex-col items-center py-20 text-center">
            <p className="label text-mute">NO MATCH FOR "{q}"</p>
            <button onClick={() => setQ('')} className="label mt-4 text-nv underline-offset-4 hover:underline cursor-pointer">
              CLEAR SEARCH
            </button>
          </div>
        )}
      </div>

      <StudentOverlay index={sel} onClose={() => setSel(null)} onNav={(d) => setSel((s) => (s === null ? s : (s + d + 14) % 14))} />
    </section>
  )
}

function StudentCard({ name, index, onOpen }: { name: string; index: number; onOpen: () => void }) {
  return (
    <button onClick={onOpen} data-cursor="OPEN" className="group block w-full text-left cursor-pointer" aria-label={`Open profile for ${name}`}>
      <div className="relative aspect-[4/5] overflow-hidden border border-line">
        <div className="h-full w-full transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.05]">
          <Portrait name={name} seed={index} className="h-full w-full" />
        </div>
        {/* accent geometry */}
        <span className="absolute left-0 top-0 h-px w-0 bg-nv transition-[width] duration-500 group-hover:w-full" />
        <span className="absolute bottom-0 right-0 h-0 w-px bg-nv transition-[height] duration-500 group-hover:h-full" />
        <span className="absolute bottom-4 right-4 h-6 w-6 translate-x-2 translate-y-2 border-b border-r border-lime opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100" />
        <span className="label absolute right-4 top-4 !text-[10px] text-mute">{pad(index + 1)}</span>
        <div className="absolute inset-x-0 bottom-0 translate-y-3 p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <span className="label flex items-center gap-2 !text-[10px] text-lime">
            VIEW PROFILE <ArrowUpRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>
      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <p className="font-display text-[20px] font-medium leading-tight tracking-[-0.025em] transition-colors duration-200 group-hover:text-lime">{name}</p>
        </div>
        <span className="label pt-1 !text-[10px] text-mute">N{pad(index + 1)}</span>
      </div>
    </button>
  )
}

function StudentOverlay({ index, onClose, onNav }: { index: number | null; onClose: () => void; onNav: (d: number) => void }) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const lastFocus = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (index === null) return
    lastFocus.current ??= document.activeElement as HTMLElement
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onNav(1)
      if (e.key === 'ArrowLeft') onNav(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [index, onClose, onNav])

  useEffect(() => {
    if (index === null) {
      document.body.style.overflow = ''
      lastFocus.current?.focus()
      lastFocus.current = null
    }
  }, [index])

  return (
    <AnimatePresence>
      {index !== null && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-end justify-center bg-obsidian/80 backdrop-blur-md md:items-center md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="student-name"
            onClick={(e) => e.stopPropagation()}
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="relative grid max-h-[92svh] w-full max-w-4xl overflow-y-auto border border-line bg-obsidian md:grid-cols-2"
          >
            <div className="relative aspect-[4/5] max-h-[46svh] w-full overflow-hidden border-b border-line md:max-h-none md:border-b-0 md:border-r">
              <AnimatePresence mode="wait">
                <motion.div
                  key={index}
                  initial={{ clipPath: 'inset(0 0 100% 0)' }}
                  animate={{ clipPath: 'inset(0 0 0% 0)' }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="h-full w-full"
                >
                  <Portrait name={STUDENTS[index]} seed={index} large className="h-full w-full" />
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="flex flex-col p-6 md:p-10">
              <div className="flex items-center justify-between">
                <span className="label !text-[10px] text-nv">PROFILE / N{pad(index + 1)}</span>
                <button ref={closeRef} onClick={onClose} aria-label="Close profile" className="-mr-2 p-2 text-mute transition-colors hover:text-paper cursor-pointer">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <AnimatePresence mode="wait">
                <motion.h3
                  key={index}
                  id="student-name"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3, ease: EASE }}
                  className="mt-10 font-display text-[clamp(34px,4.4vw,56px)] font-semibold leading-[0.95] tracking-[-0.04em] md:mt-16"
                >
                  {STUDENTS[index]}
                </motion.h3>
              </AnimatePresence>
              <dl className="mt-10 border-t border-line">
                {[
                  ['ROLE', 'Student'],
                  ['COLLECTIVE', 'NVGENESIS'],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-4 border-b border-line py-3">
                    <dt className="label !text-[10px] text-mute">{k}</dt>
                    <dd className="text-right text-[14px]">{v}</dd>
                  </div>
                ))}
                <div className="flex items-center justify-between gap-4 border-b border-line py-3">
                  <dt className="label !text-[10px] text-mute">SOCIALS</dt>
                  <dd className="flex gap-2">
                    {[
                      { name: 'GitHub', Icon: GithubIcon },
                      { name: 'Gmail', Icon: GmailIcon },
                      { name: 'LinkedIn', Icon: LinkedinIcon },
                    ].map(({ name, Icon }) => (
                      <span
                        key={name}
                        role="img"
                        aria-label={`${name} (not added yet)`}
                        title={`${name} — not added yet`}
                        className="flex h-9 w-9 items-center justify-center border border-dashed border-line text-mute"
                      >
                        <Icon className="h-4 w-4" />
                      </span>
                    ))}
                  </dd>
                </div>
              </dl>
              <div className="mt-auto flex items-center justify-between pt-10">
                <span className="label !text-[10px] text-mute">{pad(index + 1)} / 14</span>
                <div className="flex gap-2">
                  <button onClick={() => onNav(-1)} aria-label="Previous student" className="border border-line p-2.5 transition-colors hover:border-nv hover:text-lime cursor-pointer">
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button onClick={() => onNav(1)} aria-label="Next student" className="border border-line p-2.5 transition-colors hover:border-nv hover:text-lime cursor-pointer">
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
