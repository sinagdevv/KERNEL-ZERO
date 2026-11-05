import { useEffect, useRef } from 'react'

type V3 = { x: number; y: number; z: number }

function rng(seed: number) {
  return () => {
    seed = (seed * 16807) % 2147483647
    return (seed - 1) / 2147483646
  }
}

/**
 * Procedural tensor lattice: warped 3D grid of nodes, sparse structured edges,
 * a deep dust field, and pulses travelling along edges. Pauses offscreen.
 */
export default function HeroCanvas() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current!
    const ctx = canvas.getContext('2d')!
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const mobile = window.innerWidth < 768
    const rand = rng(42)

    const N = mobile ? 5 : 7
    const half = (N - 1) / 2
    const nodes: V3[] = []
    for (let i = 0; i < N; i++)
      for (let j = 0; j < N; j++)
        for (let k = 0; k < N; k++) nodes.push({ x: (i - half) / half, y: (j - half) / half, z: (k - half) / half })
    const idx = (i: number, j: number, k: number) => i * N * N + j * N + k
    const edges: [number, number][] = []
    for (let i = 0; i < N; i++)
      for (let j = 0; j < N; j++)
        for (let k = 0; k < N; k++) {
          const onShell = i === 0 || j === 0 || k === 0 || i === N - 1 || j === N - 1 || k === N - 1
          const p = onShell ? 0.75 : 0.3
          if (i < N - 1 && rand() < p) edges.push([idx(i, j, k), idx(i + 1, j, k)])
          if (j < N - 1 && rand() < p) edges.push([idx(i, j, k), idx(i, j + 1, k)])
          if (k < N - 1 && rand() < p) edges.push([idx(i, j, k), idx(i, j, k + 1)])
          if (i < N - 1 && j < N - 1 && rand() < 0.06) edges.push([idx(i, j, k), idx(i + 1, j + 1, k)])
        }

    const dust: V3[] = Array.from({ length: mobile ? 900 : 2600 }, () => {
      const r = 1.3 + rand() * 2.6
      const t = rand() * Math.PI * 2
      const ph = Math.acos(2 * rand() - 1)
      return { x: r * Math.sin(ph) * Math.cos(t), y: r * Math.sin(ph) * Math.sin(t) * 0.7, z: r * Math.cos(ph) }
    })
    const pulses = Array.from({ length: mobile ? 14 : 36 }, () => ({
      e: Math.floor(rand() * edges.length),
      t: rand(),
      s: 0.004 + rand() * 0.01,
    }))

    let w = 0, h = 0, dpr = 1
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 1.75)
      w = canvas.clientWidth
      h = canvas.clientHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)

    const mouse = { x: 0, y: 0, sx: 0, sy: 0 }
    const onMove = (e: PointerEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1
      mouse.y = (e.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener('pointermove', onMove)

    const proj = new Float32Array(nodes.length * 3)
    const project = (p: V3, ry: number, rx: number, cx: number, cy: number, S: number, out: Float32Array, o: number) => {
      const cY = Math.cos(ry), sY = Math.sin(ry), cX = Math.cos(rx), sX = Math.sin(rx)
      const x1 = p.x * cY - p.z * sY
      const z1 = p.x * sY + p.z * cY
      const y1 = p.y * cX - z1 * sX
      const z2 = p.y * sX + z1 * cX
      const d = 4.2 / (4.2 + z2)
      out[o] = cx + x1 * S * d
      out[o + 1] = cy + y1 * S * d
      out[o + 2] = z2
    }
    const tmp = new Float32Array(3)

    let raf = 0
    let running = true
    let start = performance.now()

    const draw = (now: number) => {
      const t = reduce ? 8 : (now - start) / 1000
      mouse.sx += (mouse.x - mouse.sx) * 0.04
      mouse.sy += (mouse.y - mouse.sy) * 0.04
      const wide = w >= 1024
      const cx = wide ? w * 0.7 : w * 0.5
      const cy = wide ? h * 0.5 : h * 0.42
      const S = Math.min(w, h) * (wide ? 0.3 : 0.32)
      const ry = t * 0.07 + mouse.sx * 0.45
      const rx = -0.42 + mouse.sy * 0.25 + Math.sin(t * 0.2) * 0.05

      ctx.clearRect(0, 0, w, h)

      // dust field
      for (let i = 0; i < dust.length; i++) {
        project(dust[i], ry * 0.6, rx * 0.6, cx - mouse.sx * 30, cy - mouse.sy * 20, S, tmp, 0)
        const a = Math.max(0, 0.5 - (tmp[2] + 3) * 0.08)
        if (a <= 0.02) continue
        ctx.fillStyle = i % 9 === 0 ? `rgba(118,185,0,${a})` : `rgba(245,247,243,${a * 0.55})`
        const s = tmp[2] < 0 ? 1.4 : 0.9
        ctx.fillRect(tmp[0], tmp[1], s, s)
      }

      // warped lattice
      const warped: V3 = { x: 0, y: 0, z: 0 }
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i]
        const k = 0.12
        warped.x = n.x + Math.sin(t * 0.5 + n.y * 2.2) * k
        warped.y = n.y + Math.sin(t * 0.4 + n.z * 2.0) * k * 0.8
        warped.z = n.z + Math.cos(t * 0.45 + n.x * 2.4) * k
        project(warped, ry, rx, cx, cy, S, proj, i * 3)
      }

      ctx.lineWidth = 0.7
      for (let b = 0; b < 3; b++) {
        ctx.beginPath()
        for (const [a, c] of edges) {
          const z = (proj[a * 3 + 2] + proj[c * 3 + 2]) / 2
          const bucket = z < -0.4 ? 2 : z < 0.4 ? 1 : 0
          if (bucket !== b) continue
          ctx.moveTo(proj[a * 3], proj[a * 3 + 1])
          ctx.lineTo(proj[c * 3], proj[c * 3 + 1])
        }
        ctx.strokeStyle = `rgba(118,185,0,${[0.1, 0.22, 0.42][b]})`
        ctx.stroke()
      }

      for (let i = 0; i < nodes.length; i++) {
        const z = proj[i * 3 + 2]
        const a = 0.25 + (1 - (z + 1.4) / 2.8) * 0.65
        const s = z < 0 ? 2.2 : 1.5
        ctx.fillStyle = `rgba(245,247,243,${a})`
        ctx.fillRect(proj[i * 3] - s / 2, proj[i * 3 + 1] - s / 2, s, s)
      }

      // pulses
      for (const p of pulses) {
        if (!reduce) p.t += p.s
        if (p.t > 1) {
          p.t = 0
          p.e = Math.floor(Math.random() * edges.length)
        }
        const [a, c] = edges[p.e]
        const x = proj[a * 3] + (proj[c * 3] - proj[a * 3]) * p.t
        const y = proj[a * 3 + 1] + (proj[c * 3 + 1] - proj[a * 3 + 1]) * p.t
        ctx.fillStyle = 'rgba(163,255,18,0.18)'
        ctx.fillRect(x - 3, y - 3, 6, 6)
        ctx.fillStyle = '#A3FF12'
        ctx.fillRect(x - 1.2, y - 1.2, 2.4, 2.4)
      }

      if (running && !reduce) raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)

    const io = new IntersectionObserver(([e]) => {
      const was = running
      running = e.isIntersecting
      if (running && !was && !reduce) raf = requestAnimationFrame(draw)
    })
    io.observe(canvas)
    const onVis = () => {
      if (document.hidden) running = false
      else if (!running) {
        running = true
        if (!reduce) raf = requestAnimationFrame(draw)
      }
    }
    document.addEventListener('visibilitychange', onVis)

    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('visibilitychange', onVis)
    }
  }, [])

  return <canvas ref={ref} aria-hidden className="absolute inset-0 h-full w-full" />
}
