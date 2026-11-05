import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { NAV, scrollToId } from '../data'
import { EASE } from './ui'

export function Wordmark({ className = '' }: { className?: string }) {
  return (
    <span className={`font-display text-[17px] font-semibold tracking-[-0.02em] ${className}`}>
      NV<span className="text-nv">/</span>GENESIS
    </span>
  )
}

export function Status() {
  return (
    <span className="label flex items-center gap-2 !text-[10px] text-mute">
      <span className="animate-pulse-dot h-1.5 w-1.5 bg-lime" />
      SYSTEM ONLINE
    </span>
  )
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState<string>('overview')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    NAV.forEach((n) => {
      const el = document.getElementById(n.id)
      if (el) io.observe(el)
    })
    return () => {
      window.removeEventListener('scroll', onScroll)
      io.disconnect()
    }
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const go = (id: string) => {
    setOpen(false)
    setTimeout(() => scrollToId(id), open ? 300 : 0)
  }

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
        className={`fixed inset-x-0 top-0 z-50 transition-[background,border-color,backdrop-filter] duration-300 ${
          scrolled && !open ? 'border-b border-line bg-obsidian/70 backdrop-blur-md' : 'border-b border-transparent'
        }`}
      >
        <div className="shell flex h-16 items-center justify-between">
          <button onClick={() => go('top')} className="cursor-pointer" aria-label="NVGENESIS, back to top">
            <Wordmark />
          </button>
          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-8">
              {NAV.map((n) => (
                <li key={n.id}>
                  <button
                    onClick={() => go(n.id)}
                    className={`group relative py-2 text-[13px] transition-colors duration-200 cursor-pointer ${
                      active === n.id ? 'text-paper' : 'text-mute hover:text-paper'
                    }`}
                  >
                    {n.label}
                    <span
                      className={`absolute -bottom-0.5 left-0 h-px w-full origin-left bg-nv transition-transform duration-[240ms] ${
                        active === n.id ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                      }`}
                    />
                  </button>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex items-center gap-5">
            <span className="hidden sm:block">
              <Status />
            </span>
            <button
              className="relative flex h-10 w-10 items-center justify-center lg:hidden cursor-pointer"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              onClick={() => setOpen((o) => !o)}
            >
              <span className={`absolute h-px w-6 bg-paper transition-transform duration-300 ${open ? 'rotate-45' : '-translate-y-1'}`} />
              <span className={`absolute h-px w-6 bg-paper transition-transform duration-300 ${open ? '-rotate-45' : 'translate-y-1'}`} />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col bg-obsidian lg:hidden"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            <div className="grid-bg pointer-events-none absolute inset-0 opacity-40" />
            <nav aria-label="Mobile" className="shell relative flex flex-1 flex-col justify-center pt-16">
              <p className="label mb-8 text-mute">INDEX / NAVIGATION</p>
              <ul className="border-t border-line">
                {NAV.map((n, i) => (
                  <motion.li
                    key={n.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + i * 0.06, duration: 0.5, ease: EASE }}
                    className="border-b border-line"
                  >
                    <button onClick={() => go(n.id)} className="flex w-full items-baseline gap-5 py-5 text-left cursor-pointer">
                      <span className="label text-nv">0{i + 1}</span>
                      <span className="font-display text-[clamp(28px,8vw,48px)] font-medium tracking-[-0.03em]">{n.label}</span>
                    </button>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-10 flex items-center justify-between">
                <Status />
                <span className="label text-mute">NU — FAIRVIEW</span>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
