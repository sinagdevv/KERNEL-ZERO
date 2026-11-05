import { initials } from '../data'

/** Consistent abstract monochrome portrait placeholder: scan-line silhouette + initials. */
export default function Portrait({ name, seed = 0, className = '', large = false }: { name: string; seed?: number; className?: string; large?: boolean }) {
  const id = `p-${seed}-${large ? 'l' : 's'}`
  const gap = 4 + (seed % 3)
  return (
    <svg viewBox="0 0 300 375" className={className} preserveAspectRatio="xMidYMid slice" aria-hidden>
      <defs>
        <pattern id={`${id}-scan`} width="300" height={gap} patternUnits="userSpaceOnUse">
          <rect width="300" height="1" fill="#F5F7F3" />
        </pattern>
        <clipPath id={`${id}-sil`}>
          <circle cx="150" cy={150 + (seed % 4) * 2} r="62" />
          <path d="M30 375 C 40 270, 95 238, 150 238 C 205 238, 260 270, 270 375 Z" />
        </clipPath>
        <linearGradient id={`${id}-fade`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F5F7F3" stopOpacity="0.55" />
          <stop offset="1" stopColor="#F5F7F3" stopOpacity="0.08" />
        </linearGradient>
        <mask id={`${id}-m`}>
          <rect width="300" height="375" fill={`url(#${id}-fade)`} />
        </mask>
      </defs>
      <rect width="300" height="375" fill="#121612" />
      <g stroke="#263026" strokeWidth="1">
        <line x1="150" y1="0" x2="150" y2="375" />
        <line x1="0" y1="150" x2="300" y2="150" />
        <circle cx="150" cy="150" r="96" fill="none" strokeDasharray="2 6" />
      </g>
      <g clipPath={`url(#${id}-sil)`} mask={`url(#${id}-m)`}>
        <rect width="300" height="375" fill={`url(#${id}-scan)`} />
      </g>
      <text x="18" y="32" fill="#8B938C" fontSize={large ? 13 : 15} fontFamily="JetBrains Mono" letterSpacing="2">
        {initials(name)}
      </text>
    </svg>
  )
}
