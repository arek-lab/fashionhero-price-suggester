'use client'

import { useEffect, useState } from 'react'
import { PriceDistributionChart } from './PriceDistributionChart'
import type { CategoryPriceData } from '@/types'

type Props = {
  data: CategoryPriceData
  onClose: () => void
  onSignUp?: () => void
}

export function PriceIntelligenceModal({ data, onClose, onSignUp }: Props) {
  const [selectedPlan, setSelectedPlan] = useState<'Basic' | 'Pro' | 'Profit'>('Pro')

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
        {/* Coming soon overlay — CTA */}
        <div className="absolute inset-0 z-10 flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.5)' }}>
          <div className="text-center px-8 py-8 w-full max-w-sm" style={{ backdropFilter: 'blur(16px)', background: 'rgba(255,255,255,0.92)' }}>
            <div className="w-8 h-px bg-black mx-auto mb-8" />
            <p className="text-[9px] uppercase tracking-[0.25em] text-[#999] mb-4">
              Wkrótce dostępne
            </p>
            <p className="text-base font-bold uppercase tracking-widest mb-2 leading-tight">
              Dobrze dobrana cena<br />to więcej sprzedaży
            </p>
            <p className="text-[11px] text-[#666] leading-relaxed mb-5">
              Wyprzedź konkurencję — wyceń produkty trafnie od pierwszego dnia.
            </p>
            <div className="grid grid-cols-3 gap-3 mb-5">
              {([['Basic', '29,99'], ['Pro', '49,99'], ['Profit', '99,99']] as const).map(([name, price]) => (
                <div
                  key={name}
                  onClick={() => setSelectedPlan(name)}
                  className={`border px-3 py-3 text-center cursor-pointer ${selectedPlan === name ? 'border-black' : 'border-[#e5e5e5]'}`}
                >
                  <p className="text-[9px] uppercase tracking-[0.2em] text-[#999] mb-1">{name}</p>
                  <p className="text-sm font-bold">{price} zł</p>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => { onSignUp?.(); onClose() }}
              className="w-full border border-black bg-black text-white text-[10px] uppercase tracking-widest py-3 hover:bg-white hover:text-black transition-colors"
            >
              Zapisz się na wcześniejszy dostęp<br />w promocyjnej cenie
            </button>
            <div className="w-8 h-px bg-black mx-auto mt-8" />
          </div>
        </div>
        {/* Header */}
        <div className="relative z-20 flex items-center justify-between px-5 py-4 border-b border-[#e5e5e5]">
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
                {product.imageUrl ? (
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full object-cover"
                    style={{ aspectRatio: '3/4', maxHeight: '120px' }}
                  />
                ) : (
                  <div
                    className="w-full"
                    style={{ backgroundColor: product.bgColor, aspectRatio: '3/4', maxHeight: '120px' }}
                  />
                )}
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
