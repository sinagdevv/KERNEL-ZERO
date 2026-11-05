import { motion, useMotionValue, useSpring, useReducedMotion } from 'motion/react'
import { useEffect, useRef, useState, type ReactNode } from 'react'

export const EASE = [0.22, 1, 0.36, 1] as const

export function Marker({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`flex items-center gap-3 text-[13px] text-mute ${className}`}>
      <span className="h-px w-8 bg-nv" />
      <span>{children}</span>
    </div>
  )
}

export function Reveal({
  children,
  delay = 0,
  y = 24,
  className = '',
}: {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
}) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.65, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}

/** Line-by-line masked heading reveal. */
export function MaskLines({
  lines,
  className = '',
  delay = 0,
  animateNow = false,
}: {
  lines: ReactNode[]
  className?: string
  delay?: number
  animateNow?: boolean
}) {
  const reduce = useReducedMotion()
  return (
    <span className={className}>
      {lines.map((l, i) => (
        <span key={i} className="block overflow-hidden pb-[0.06em]">
          <motion.span
            className="block"
            initial={reduce ? { opacity: 0 } : { y: '105%' }}
            {...(animateNow
              ? { animate: { y: 0, opacity: 1 } }
              : { whileInView: { y: 0, opacity: 1 }, viewport: { once: true, margin: '-10% 0px' } })}
            transition={{ duration: 0.75, delay: delay + i * 0.08, ease: EASE }}
          >
            {l}
          </motion.span>
        </span>
      ))}
    </span>
  )
}

export function Magnetic({
  children,
  className = '',
  onClick,
  variant = 'primary',
  ariaLabel,
}: {
  children: ReactNode
  className?: string
  onClick?: () => void
  variant?: 'primary' | 'ghost'
  ariaLabel?: string
}) {
  const ref = useRef<HTMLButtonElement>(null)
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 18 })
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 18 })
  const base =
    'group relative inline-flex items-center gap-3 px-6 py-4 label !text-[12px] transition-colors duration-200 chamfer cursor-pointer'
  const v =
    variant === 'primary'
      ? 'bg-nv text-obsidian hover:bg-lime'
      : 'text-paper bg-transparent shadow-[inset_0_0_0_1px_var(--color-line)] hover:shadow-[inset_0_0_0_1px_var(--color-mute)]'
  return (
    <motion.button
      ref={ref}
      style={{ x, y }}
      aria-label={ariaLabel}
      data-cursor="OPEN"
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect()
        x.set((e.clientX - r.left - r.width / 2) * 0.18)
        y.set((e.clientY - r.top - r.height / 2) * 0.25)
      }}
      onMouseLeave={() => {
        x.set(0)
        y.set(0)
      }}
      onClick={onClick}
      className={`${base} ${v} ${className}`}
    >
      {children}
    </motion.button>
  )
}

export function useInView<T extends Element>(margin = '0px') {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { rootMargin: margin })
    io.observe(el)
    return () => io.disconnect()
  }, [margin])
  return [ref, inView] as const
}

/** Minimal technical cursor; desktop fine pointers only. Native cursor stays visible. */
export function Cursor() {
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 500, damping: 40 })
  const sy = useSpring(y, { stiffness: 500, damping: 40 })
  const [label, setLabel] = useState<string | null>(null)
  const [enabled, setEnabled] = useState(false)
  const reduce = useReducedMotion()

  useEffect(() => {
    const mq = window.matchMedia('(pointer: fine) and (min-width: 1024px)')
    setEnabled(mq.matches && !reduce)
    const move = (e: PointerEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      const t = (e.target as HTMLElement).closest?.('[data-cursor]') as HTMLElement | null
      setLabel(t?.dataset.cursor ?? null)
    }
    window.addEventListener('pointermove', move)
    return () => window.removeEventListener('pointermove', move)
  }, [x, y, reduce])

  if (!enabled) return null
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[100] mix-blend-difference"
      style={{ x: sx, y: sy }}
    >
      <motion.div
        className="-translate-x-1/2 -translate-y-1/2 border border-lime"
        animate={{ width: label ? 64 : 22, height: label ? 64 : 22, rotate: label ? 45 : 0 }}
        transition={{ duration: 0.22, ease: EASE }}
      />
      {label && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="label absolute left-10 top-4 whitespace-nowrap !text-[10px] text-lime"
        >
          {label}
        </motion.span>
      )}
    </motion.div>
  )
}

export function Corners({ className = '' }: { className?: string }) {
  const c = 'absolute h-2.5 w-2.5 border-nv'
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 ${className}`}>
      <span className={`${c} left-0 top-0 border-l border-t`} />
      <span className={`${c} right-0 top-0 border-r border-t`} />
      <span className={`${c} bottom-0 left-0 border-b border-l`} />
      <span className={`${c} bottom-0 right-0 border-b border-r`} />
    </div>
  )
}
