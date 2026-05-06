'use client'

import { useEffect } from 'react'
import { PriceDistributionChart } from './PriceDistributionChart'
import type { CategoryPriceData } from '@/types'

type Props = {
  data: CategoryPriceData
  onClose: () => void
}

export function PriceIntelligenceModal({ data, onClose }: Props) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [onClose])

  const trendUp = data.trendPercent >= 0
  const trendLabel = trendUp
    ? `↑ +${data.trendPercent}% vs poprzedni miesiąc`
    : `↓ ${data.trendPercent}% vs poprzedni miesiąc`

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 overflow-y-auto py-8 px-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="relative bg-white w-full max-w-xl border border-[#e5e5e5]">
        {/* Sticker */}
        <div
          className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none"
        >
          <div
            className="relative bg-[#fffde7] border border-[#e5e5e5] px-7 py-5 max-w-xs text-center pointer-events-auto"
            style={{ transform: 'rotate(-1.5deg)', boxShadow: '3px 4px 12px rgba(0,0,0,0.13), 0 1px 2px rgba(0,0,0,0.07)' }}
          >
            {/* Tape — top-left */}
            <div className="absolute -top-3 -left-3" style={{ transform: 'rotate(-38deg)' }}>
              <div style={{ width: 38, height: 14, background: 'rgba(210,230,255,0.55)', borderTop: '1px solid rgba(180,210,255,0.4)', borderBottom: '1px solid rgba(180,210,255,0.4)', backdropFilter: 'blur(1px)' }} />
            </div>
            {/* Tape — top-right */}
            <div className="absolute -top-3 -right-3" style={{ transform: 'rotate(38deg)' }}>
              <div style={{ width: 38, height: 14, background: 'rgba(210,230,255,0.55)', borderTop: '1px solid rgba(180,210,255,0.4)', borderBottom: '1px solid rgba(180,210,255,0.4)', backdropFilter: 'blur(1px)' }} />
            </div>
            {/* Tape — bottom-left */}
            <div className="absolute -bottom-3 -left-3" style={{ transform: 'rotate(38deg)' }}>
              <div style={{ width: 38, height: 14, background: 'rgba(210,230,255,0.55)', borderTop: '1px solid rgba(180,210,255,0.4)', borderBottom: '1px solid rgba(180,210,255,0.4)', backdropFilter: 'blur(1px)' }} />
            </div>
            {/* Tape — bottom-right */}
            <div className="absolute -bottom-3 -right-3" style={{ transform: 'rotate(-38deg)' }}>
              <div style={{ width: 38, height: 14, background: 'rgba(210,230,255,0.55)', borderTop: '1px solid rgba(180,210,255,0.4)', borderBottom: '1px solid rgba(180,210,255,0.4)', backdropFilter: 'blur(1px)' }} />
            </div>

            <p className="text-[9px] uppercase tracking-widest text-[#999] mb-2">Informacja</p>
            <p className="text-sm font-bold uppercase tracking-widest mb-3 leading-snug">
              Dziękujemy za zainteresowanie
            </p>
            <p className="text-xs text-[#444] leading-relaxed">
              Rozwiązanie jest w fazie testów. Poinformujemy Cię, kiedy będzie mogło Cię wspierać.
            </p>
          </div>
        </div>
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#e5e5e5]">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-[#999] mb-0.5">
              Analiza rynku
            </p>
            <h2 className="text-sm font-bold uppercase tracking-widest">
              Ceny konkurencji — {data.label}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Zamknij"
            className="text-[#999] hover:text-black transition-colors text-xl leading-none"
          >
            ×
          </button>
        </div>

        {/* Stats — visible first, no scroll needed on mobile */}
        <div className="flex items-stretch border-b border-[#e5e5e5]">
          <div className="flex-1 px-5 py-3 border-r border-[#e5e5e5]">
            <p className="text-[10px] uppercase tracking-widest text-[#999] mb-1">
              Cena średnia
            </p>
            <p className="text-xl font-bold tracking-tight">
              {data.averagePrice} zł
            </p>
          </div>
          <div className="flex-1 px-5 py-3">
            <p className="text-[10px] uppercase tracking-widest text-[#999] mb-1">
              Trend
            </p>
            <p className={`text-sm font-bold ${trendUp ? 'text-black' : 'text-[#666]'}`}>
              {trendLabel}
            </p>
          </div>
        </div>

        {/* Distribution chart */}
        <div className="px-5 pt-4 pb-3 border-b border-[#e5e5e5]">
          <p className="text-[10px] uppercase tracking-widest text-[#999] mb-3">
            Rozkład cen — {data.priceRange.sampleSize} produktów
          </p>
          <PriceDistributionChart
            distribution={data.distribution}
            priceRange={data.priceRange}
          />
        </div>

        {/* Product grid — exactly 6 thumbnails */}
        <div className="px-5 py-4">
          <p className="text-[10px] uppercase tracking-widest text-[#999] mb-3">
            Podobne produkty
          </p>
          <div className="grid grid-cols-3 gap-3">
            {data.products.slice(0, 6).map((product) => (
              <div key={product.id} className="border border-[#e5e5e5]">
                {/* Image placeholder — takes 65% of card height */}
                <div
                  className="w-full"
                  style={{ backgroundColor: product.bgColor, aspectRatio: '3/4', maxHeight: '120px' }}
                />
                {/* Product info */}
                <div className="px-2 py-1.5 bg-white">
                  <p className="text-[10px] text-[#666] leading-tight truncate">
                    {product.name}
                  </p>
                  <p className="text-xs font-bold mt-0.5">{product.price} zł</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 bg-[#f5f5f5] border-t border-[#e5e5e5]">
          <p className="text-[10px] text-[#999]">
            Na podstawie {data.priceRange.sampleSize} aktywnych listingów w kategorii {data.label}.
            Dane aktualizowane raz dziennie.
          </p>
        </div>
      </div>
    </div>
  )
}
