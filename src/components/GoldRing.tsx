import { forwardRef, type CSSProperties } from 'react'

interface GoldRingProps {
  className?: string
  size?: number | string
  rotation?: number
  opacity?: number
  label?: string
  style?: CSSProperties
}

const GoldRing = forwardRef<SVGSVGElement, GoldRingProps>(function GoldRing(
  { className = '', size = 'min(72vh, 62vw)', rotation = -25, opacity = 1, label, style },
  ref,
) {
  return (
    <svg
      ref={ref}
      className={`absolute pointer-events-none ${className}`}
      style={{
        width: size,
        height: size,
        transform: `rotate(${rotation}deg)`,
        opacity,
        ...style,
      }}
      viewBox="0 0 400 400"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <filter id="ringGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFD700" />
          <stop offset="50%" stopColor="#C9A227" />
          <stop offset="100%" stopColor="#FFD700" />
        </linearGradient>
      </defs>
      <circle cx="200" cy="200" r="170" stroke="url(#goldGradient)" strokeWidth="3" strokeLinecap="round" strokeDasharray="750 320" strokeDashoffset="40" filter="url(#ringGlow)" opacity="0.9" />
      <circle cx="200" cy="200" r="155" stroke="#FFD700" strokeWidth="1" strokeLinecap="round" strokeDasharray="680 390" strokeDashoffset="50" opacity="0.5" />
      <circle cx="200" cy="30" r="4" fill="#FFD700" opacity="0.8" />
      <circle cx="200" cy="370" r="3" fill="#FFD700" opacity="0.6" />
      {label ? (
        <text x="200" y="205" textAnchor="middle" dominantBaseline="middle" fill="#FFD700" fontSize="11" fontFamily="IBM Plex Mono, monospace" letterSpacing="0.08em" opacity="0.7">
          {label}
        </text>
      ) : null}
    </svg>
  )
})

export default GoldRing
