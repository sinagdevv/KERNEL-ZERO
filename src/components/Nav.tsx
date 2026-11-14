import { AnimatePresence, motion } from "motion/react"
import { useEffect, useState } from "react"
import { BRAND, NAV, TABS, scrollToId, type Tab } from "../data"
import { EASE } from "./ui"

export function Monogram({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 36 36" aria-hidden className={className}>
      <path d="M6 26V10h4v6l8-6h6l-9 7 10 9h-6l-9-8v8H6Z" fill="currentColor" />
      <path d="M25 7v22" stroke="#A3FF12" strokeWidth="2" />
      <circle
        cx="31"
        cy="22"
        r="4.5"
        fill="none"
        stroke="#76B900"
        strokeWidth="2"
      />
    </svg>
  )
}

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-2 font-display text-[16px] font-semibold tracking-[-0.03em] ${className}`}
    >
      <Monogram className="h-7 w-7 text-paper" />
      <span>
        KERNEL<span className="text-nv">//</span>ZERO
      </span>
    </span>
  )
}

export default function Nav({
  tab,
  setTab,
}: {
  tab: Tab
  setTab: (t: Tab) => void
}) {
  const items = NAV[tab]
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState("overview")

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    )
    items.forEach(
      (n) =>
        document.getElementById(n.id) &&
        io.observe(document.getElementById(n.id)!),
    )
    return () => {
      window.removeEventListener("scroll", onScroll)
      io.disconnect()
    }
  }, [items])

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false)
    window.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", onKey)
    }
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
          scrolled && !open
            ? "border-b border-line bg-obsidian/75 backdrop-blur-md"
            : "border-b border-transparent"
        }`}
      >
        <div className="shell relative flex h-16 items-center justify-between">
          <button
            onClick={() => (tab === "program" ? go("top") : setTab("program"))}
            className="shrink-0 cursor-pointer"
            aria-label={`${BRAND.name}, back to top`}
          >
            <Wordmark />
          </button>
          <nav
            aria-label="Primary"
            className="mx-4 hidden min-w-0 flex-1 justify-center xl:flex"
          >
            <ul className="flex items-center gap-5">
              {items.map((n) => (
                <li key={n.id}>
                  <button
                    onClick={() => go(n.id)}
                    className={`group relative py-2 text-[13px] transition-colors duration-200 cursor-pointer ${
                      active === n.id
                        ? "text-paper"
                        : "text-mute hover:text-paper"
                    }`}
                  >
                    {n.label}
                    <span
                      className={`absolute -bottom-0.5 left-0 h-px w-full origin-left bg-nv transition-transform duration-[240ms] ${
                        active === n.id
                          ? "scale-x-100"
                          : "scale-x-0 group-hover:scale-x-100"
                      }`}
                    />
                  </button>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex items-center justify-end gap-5">
            <nav
              aria-label="Pages"
              className="hidden shrink-0 items-center gap-0.5 border border-line p-0.5 lg:flex"
            >
              {TABS.map((t) => (
                <button
                  key={t.id}
                  aria-current={tab === t.id ? "page" : undefined}
                  onClick={() => setTab(t.id)}
                  className={`whitespace-nowrap px-2.5 py-1.5 text-[13px] transition-colors cursor-pointer ${
                    tab === t.id
                      ? "bg-paper text-obsidian"
                      : "text-mute hover:text-paper"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </nav>
            <button
              className="relative flex h-10 w-10 items-center justify-center lg:hidden cursor-pointer"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((o) => !o)}
            >
              <span
                className={`absolute h-px w-6 bg-paper transition-transform duration-300 ${
                  open ? "rotate-45" : "-translate-y-1"
                }`}
              />
              <span
                className={`absolute h-px w-6 bg-paper transition-transform duration-300 ${
                  open ? "-rotate-45" : "translate-y-1"
                }`}
              />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col bg-obsidian lg:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            <div className="grid-bg pointer-events-none absolute inset-0 opacity-40" />
            <nav
              aria-label="Mobile"
              className="shell relative flex flex-1 flex-col justify-center pt-16"
            >
              <p className="mb-8 label text-mute">Navigate</p>
              <ul className="border-t border-line">
                {TABS.map((t, i) => (
                  <motion.li
                    key={t.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.15 + i * 0.06,
                      duration: 0.5,
                      ease: EASE,
                    }}
                    className="border-b border-line"
                  >
                    <button
                      aria-current={tab === t.id ? "page" : undefined}
                      onClick={() => {
                        setTab(t.id)
                        setOpen(false)
                      }}
                      className="flex w-full items-baseline gap-5 py-3.5 text-left cursor-pointer"
                    >
                      <span className="label text-nv">0{i + 1}</span>
                      <span
                        className={`font-display text-[clamp(26px,7vw,40px)] font-medium tracking-[-0.03em] ${
                          tab === t.id ? "text-lime" : ""
                        }`}
                      >
                        {t.label}
                      </span>
                    </button>
                  </motion.li>
                ))}
              </ul>
              {items.length > 0 && (
                <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
                  {items.map((n) => (
                    <li key={n.id}>
                      <button
                        onClick={() => go(n.id)}
                        className="label text-mute hover:text-paper cursor-pointer"
                      >
                        {n.label}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
