import type { Module } from '../data'

const G = '#76B900'
const L = '#A3FF12'
const W = '#F4F6F2'
const B = '#273027'

/** Small animated technical diagrams keyed by topic. */
export default function Viz({ kind, className = '' }: { kind: Module['viz']; className?: string }) {
  return (
    <svg viewBox="0 0 240 140" className={className} fill="none" aria-hidden>
      {kind === 'net' && <Net />}
      {kind === 'attn' && <Attn />}
      {kind === 'loop' && <Loop />}
      {kind === 'shield' && <Shield />}
      {kind === 'vector' && <Vector />}
      {kind === 'grid' && <GridViz />}
    </svg>
  )
}

function Net() {
  const layers = [3, 5, 5, 2]
  const pts = layers.map((n, li) =>
    Array.from({ length: n }, (_, i) => ({ x: 30 + li * 60, y: 70 + (i - (n - 1) / 2) * 24 })),
  )
  return (
    <g>
      {pts.slice(0, -1).map((col, li) =>
        col.map((a, ai) =>
          pts[li + 1].map((b, bi) => (
            <line
              key={`${li}-${ai}-${bi}`}
              x1={a.x} y1={a.y} x2={b.x} y2={b.y}
              stroke={(ai + bi) % 3 === 0 ? G : B}
              strokeWidth="0.8"
              strokeDasharray={(ai + bi) % 3 === 0 ? '3 5' : undefined}
              className={(ai + bi) % 3 === 0 ? 'animate-dash' : ''}
            />
          )),
        ),
      )}
      {pts.flat().map((p, i) => (
        <rect key={i} x={p.x - 3} y={p.y - 3} width="6" height="6" fill="#050705" stroke={i % 4 === 0 ? L : W} strokeWidth="0.8" />
      ))}
    </g>
  )
}

function Attn() {
  const xs = Array.from({ length: 7 }, (_, i) => 24 + i * 32)
  return (
    <g>
      {xs.map((x, i) =>
        xs.map((x2, j) =>
          Math.abs(i - j) < 4 ? (
            <path
              key={`${i}-${j}`}
              d={`M${x} 30 C ${x} 75, ${x2} 65, ${x2} 110`}
              stroke={(i + j) % 4 === 0 ? L : G}
              strokeOpacity={(i + j) % 4 === 0 ? 0.9 : 0.25}
              strokeWidth="0.8"
            >
              <animate attributeName="stroke-opacity" values="0.1;0.9;0.1" dur={`${2 + ((i * 7 + j) % 5) * 0.4}s`} repeatCount="indefinite" />
            </path>
          ) : null,
        ),
      )}
      {xs.map((x, i) => (
        <g key={i}>
          <rect x={x - 10} y={18} width="20" height="12" stroke={W} strokeWidth="0.8" fill="#050705" />
          <rect x={x - 10} y={110} width="20" height="12" stroke={B} strokeWidth="0.8" fill="#111511" />
        </g>
      ))}
    </g>
  )
}

function Loop() {
  const labels = ['PLAN', 'ACT', 'OBSERVE', 'REFLECT']
  const pos = [
    [120, 22],
    [200, 70],
    [120, 118],
    [40, 70],
  ]
  return (
    <g>
      <ellipse cx="120" cy="70" rx="80" ry="48" stroke={B} strokeWidth="0.8" />
      <ellipse cx="120" cy="70" rx="80" ry="48" stroke={G} strokeWidth="0.8" strokeDasharray="4 8" className="animate-dash" />
      <circle r="3" fill={L}>
        <animateMotion dur="4s" repeatCount="indefinite" path="M120 22 A80 48 0 1 1 119.9 22" />
      </circle>
      {pos.map(([x, y], i) => (
        <g key={i}>
          <rect x={x - 26} y={y - 8} width="52" height="16" fill="#050705" stroke={W} strokeWidth="0.8" />
          <text x={x} y={y + 3} textAnchor="middle" fill={W} fontSize="7" fontFamily="JetBrains Mono" letterSpacing="1">
            {labels[i]}
          </text>
        </g>
      ))}
      <rect x="104" y="62" width="32" height="16" stroke={G} strokeWidth="0.8" />
      <text x="120" y="73" textAnchor="middle" fill={G} fontSize="7" fontFamily="JetBrains Mono">TOOL</text>
    </g>
  )
}

function Shield() {
  return (
    <g>
      {[0, 1, 2].map((i) => (
        <rect key={i} x={70 + i * 14} y={14 + i * 14} width={100 - i * 28} height={112 - i * 28} stroke={i === 2 ? L : i === 1 ? G : B} strokeWidth="0.8" />
      ))}
      <line x1="70" x2="170" y1="20" y2="20" stroke={L} strokeWidth="1">
        <animate attributeName="y1" values="16;124;16" dur="3s" repeatCount="indefinite" />
        <animate attributeName="y2" values="16;124;16" dur="3s" repeatCount="indefinite" />
      </line>
      {[30, 50, 90, 110].map((y, i) => (
        <g key={i}>
          <line x1="10" x2="66" y1={y} y2={y} stroke={i === 1 ? W : G} strokeWidth="0.8" strokeDasharray="3 4" className="animate-dash" />
          {i === 1 && (
            <path d="M60 44 l8 8 m0 -8 l-8 8" stroke={W} strokeWidth="1.2" transform="translate(-2 -2)" />
          )}
        </g>
      ))}
      <line x1="174" x2="230" y1="70" y2="70" stroke={G} strokeWidth="0.8" strokeDasharray="3 4" className="animate-dash" />
    </g>
  )
}

function Vector() {
  const pts = [
    [30, 30], [58, 98], [80, 50], [100, 120], [150, 28], [170, 100], [205, 60], [210, 118], [44, 64], [190, 30], [128, 106], [70, 20],
  ]
  const q = [128, 64]
  const near = [2, 10, 4]
  return (
    <g>
      <circle cx={q[0]} cy={q[1]} r="40" stroke={G} strokeWidth="0.8" strokeDasharray="2 4">
        <animate attributeName="r" values="30;48;30" dur="3.2s" repeatCount="indefinite" />
      </circle>
      {near.map((n) => (
        <line key={n} x1={q[0]} y1={q[1]} x2={pts[n][0]} y2={pts[n][1]} stroke={L} strokeWidth="0.8" />
      ))}
      {pts.map(([x, y], i) => (
        <rect key={i} x={x - 2.5} y={y - 2.5} width="5" height="5" fill={near.includes(i) ? L : 'none'} stroke={near.includes(i) ? L : W} strokeWidth="0.8" />
      ))}
      <rect x={q[0] - 5} y={q[1] - 5} width="10" height="10" stroke={L} strokeWidth="1" transform={`rotate(45 ${q[0]} ${q[1]})`} />
    </g>
  )
}

function GridViz() {
  const cols = 12
  const rows = 6
  return (
    <g>
      {Array.from({ length: cols * rows }, (_, i) => {
        const c = i % cols
        const r = Math.floor(i / cols)
        return (
          <rect key={i} x={12 + c * 18} y={16 + r * 18} width="14" height="14" stroke={B} strokeWidth="0.8" fill={G} fillOpacity="0">
            <animate
              attributeName="fill-opacity"
              values="0;0.85;0"
              dur="2.4s"
              begin={`${(c + r) * 0.08}s`}
              repeatCount="indefinite"
            />
          </rect>
        )
      })}
    </g>
  )
}
