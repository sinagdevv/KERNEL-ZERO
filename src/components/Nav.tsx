import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { NAV, TABS, scrollToId, type Tab } from '../data'
import { EASE } from './ui'

export function Wordmark({ className = '' }: { className?: string }) {
  return (
    <span className={`font-display text-[17px] font-semibold tracking-[-0.02em] ${className}`}>
      NV<span className="text-nv">/</span>GENESIS
    </span>
  )
}

export default function Nav({ tab, setTab }: { tab: Tab; setTab: (t: Tab) => void }) {
  const items = NAV[tab]
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
    items.forEach((n) => {
      const el = document.getElementById(n.id)
      if (el) io.observe(el)
    })
    return () => {
      window.removeEventListener('scroll', onScroll)
      io.disconnect()
    }
  }, [items])

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
        <div className="shell relative flex h-16 items-center justify-between">
          <button onClick={() => go('top')} className="shrink-0 cursor-pointer" aria-label="NVGENESIS, back to top">
            <Wordmark />
          </button>
          <nav aria-label="Primary" className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 lg:block">
            <ul className="flex items-center gap-8">
              {items.map((n) => (
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
          <div className="flex items-center justify-end gap-5">
          <div className="hidden items-center gap-1 border border-line p-0.5 sm:flex" role="tablist" aria-label="Site sections">
            {TABS.map((t) => (
              <button
                key={t.id}
                role="tab"
                aria-selected={tab === t.id}
                onClick={() => setTab(t.id)}
                className={`px-3 py-1.5 text-[13px] transition-colors cursor-pointer ${tab === t.id ? 'bg-paper text-obsidian' : 'text-mute hover:text-paper'}`}
              >
                {t.label}
              </button>
            ))}
          </div>
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
              <p className="mb-8 text-[13px] text-mute">Navigate</p>
              <ul className="border-t border-line">
                {items.map((n, i) => (
                  <motion.li
                    key={n.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + i * 0.06, duration: 0.5, ease: EASE }}
                    className="border-b border-line"
                  >
                    <button onClick={() => go(n.id)} className="flex w-full items-baseline gap-5 py-5 text-left cursor-pointer">
                      <span className="text-[13px] text-nv">0{i + 1}</span>
                      <span className="font-display text-[clamp(28px,8vw,48px)] font-medium tracking-[-0.03em]">{n.label}</span>
                    </button>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-10 flex gap-2" role="tablist">
                {TABS.map((t) => (
                  <button
                    key={t.id}
                    role="tab"
                    aria-selected={tab === t.id}
                    onClick={() => {
                      setTab(t.id)
                      setOpen(false)
                    }}
                    className={`border px-4 py-2 text-[14px] cursor-pointer ${tab === t.id ? 'border-paper bg-paper text-obsidian' : 'border-line text-mute'}`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
