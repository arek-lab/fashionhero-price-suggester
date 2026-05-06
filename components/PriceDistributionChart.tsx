import type { PriceBucket, PriceRange } from '@/types'

type Props = {
  distribution: PriceBucket[]
  priceRange: PriceRange
}

export function PriceDistributionChart({ distribution, priceRange }: Props) {
  const svgWidth = 520
  const svgHeight = 150
  const pl = 28  // padding left
  const pr = 8   // padding right
  const pt = 8   // padding top
  const pb = 28  // padding bottom

  const chartW = svgWidth - pl - pr
  const chartH = svgHeight - pt - pb

  const maxCount = Math.max(...distribution.map((b) => b.count))
  const n = distribution.length
  const gap = 4
  const barW = (chartW - gap * (n - 1)) / n

  return (
    <div>
      <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full" aria-label="Rozkład cen">
        {/* baseline */}
        <line
          x1={pl}
          y1={pt + chartH}
          x2={svgWidth - pr}
          y2={pt + chartH}
          stroke="#e5e5e5"
          strokeWidth="1"
        />

        {distribution.map((bucket, i) => {
          const bh = (bucket.count / maxCount) * chartH
          const x = pl + i * (barW + gap)
          const y = pt + chartH - bh
          const showLabel = i % 2 === 0

          return (
            <g key={bucket.label}>
              <rect
                x={x}
                y={y}
                width={barW}
                height={bh}
                fill={bucket.inSuggestedZone ? '#000' : '#d4d4d4'}
              />
              {showLabel && (
                <text
                  x={x + barW / 2}
                  y={svgHeight - 6}
                  textAnchor="middle"
                  fontSize="9"
                  fill="#999"
                >
                  {bucket.label}
                </text>
              )}
            </g>
          )
        })}

        {/* y-axis ticks */}
        {[0, Math.round(maxCount / 2), maxCount].map((tick) => {
          const y = pt + chartH - (tick / maxCount) * chartH
          return (
            <g key={tick}>
              <line x1={pl - 3} y1={y} x2={pl} y2={y} stroke="#ccc" strokeWidth="1" />
              <text x={pl - 5} y={y + 3} textAnchor="end" fontSize="9" fill="#aaa">
                {tick}
              </text>
            </g>
          )
        })}
      </svg>

      <div className="flex items-center gap-2 mt-2">
        <div className="w-3 h-3 bg-black flex-shrink-0" />
        <span className="text-[11px] text-[#666] uppercase tracking-wide">
          Sugerowana strefa: {priceRange.min}–{priceRange.max} zł
        </span>
        <span className="text-[11px] text-[#999] ml-1">
          (mediana ±20%)
        </span>
      </div>
    </div>
  )
}
