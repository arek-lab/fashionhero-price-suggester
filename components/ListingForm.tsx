'use client'

import { useState } from 'react'
import { PriceIntelligenceModal } from './PriceIntelligenceModal'
import { mockPriceData, priceRanges } from '@/data/mock-prices'
import type { Category } from '@/types'

const CATEGORY_LABELS: Record<Category, string> = {
  shoes: 'Buty',
  dresses: 'Sukienki',
  jackets: 'Kurtki',
  tops: 'Topy',
}

const CATEGORIES: Category[] = ['shoes', 'dresses', 'jackets', 'tops']

export function ListingForm() {
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState<Category | ''>('')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [signedUp, setSignedUp] = useState(false)

  const selectedRange = category ? priceRanges[category] : null
  const modalData = category && mockPriceData[category] ? mockPriceData[category] : null
  const hasIntelligenceData = Boolean(modalData)

  return (
    <>
      <form onSubmit={(e) => e.preventDefault()} noValidate>
        {/* Section: Informacje podstawowe */}
        <div className="mb-8">
          <p className="text-[10px] uppercase tracking-widest text-[#999] mb-4 pb-2 border-b border-[#e5e5e5]">
            Informacje podstawowe
          </p>

          <div className="mb-5">
            <label className="block text-[10px] uppercase tracking-widest text-[#666] mb-1.5">
              Nazwa produktu
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="np. Sneakersy skórzane białe"
              className="w-full border border-[#e5e5e5] px-3 py-2 text-sm outline-none focus:border-black transition-colors"
            />
          </div>

          <div className="mb-5">
            <label className="block text-[10px] uppercase tracking-widest text-[#666] mb-1.5">
              Kategoria
            </label>
            <select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value as Category | '')
                setModalOpen(false)
              }}
              className="w-full border border-[#e5e5e5] px-3 py-2 text-sm outline-none focus:border-black transition-colors bg-white appearance-none cursor-pointer"
            >
              <option value="">Wybierz kategorię</option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {CATEGORY_LABELS[cat]}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Section: Cena — suggested range appears immediately after category selected */}
        <div className="mb-8">
          <p className="text-[10px] uppercase tracking-widest text-[#999] mb-4 pb-2 border-b border-[#e5e5e5]">
            Cena
          </p>

          {/* Suggested range — shown as first visible thing after category selection */}
          {selectedRange && (
            <div className="bg-[#f5f5f5] border border-[#e5e5e5] px-4 py-3 mb-4">
              <p className="text-[10px] uppercase tracking-widest text-[#999] mb-1">
                Sugerowany zakres cenowy
              </p>
              <p className="text-base font-bold">
                {selectedRange.min}–{selectedRange.max} PLN
              </p>
              <p className="text-[11px] text-[#666] mt-0.5">
                na podstawie {selectedRange.sampleSize} podobnych produktów
              </p>
            </div>
          )}

          {signedUp && (
            <div className="bg-[#f5f5f5] border border-[#e5e5e5] px-4 py-3 mb-4">
              <p className="text-[10px] uppercase tracking-widest text-[#999] mb-1">Wcześniejszy dostęp</p>
              <p className="text-sm font-bold">Dziękujemy za zapisanie się!</p>
              <p className="text-[11px] text-[#666] mt-0.5">Powiadomimy Cię, gdy funkcja będzie dostępna.</p>
            </div>
          )}

          <div className="flex items-end gap-3">
            <div className="flex-1">
              <label className="block text-[10px] uppercase tracking-widest text-[#666] mb-1.5">
                Twoja cena (PLN)
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="0"
                  min="0"
                  className="w-full border border-[#e5e5e5] px-3 py-2 text-sm outline-none focus:border-black transition-colors pr-8"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-[#999]">
                  zł
                </span>
              </div>
            </div>

            {/* Button: disabled when no category or no mock data */}
            <button
              type="button"
              onClick={() => { if (hasIntelligenceData) setModalOpen(true) }}
              disabled={!hasIntelligenceData}
              title={
                !category
                  ? 'Najpierw wybierz kategorię'
                  : !hasIntelligenceData
                  ? 'Dane dostępne dla kategorii Buty i Sukienki'
                  : undefined
              }
              className={`relative text-[10px] uppercase tracking-widest border px-3 py-2 whitespace-nowrap transition-colors ${
                hasIntelligenceData
                  ? 'border-black bg-black text-white hover:bg-white hover:text-black cursor-pointer'
                  : 'border-[#bbb] bg-[#bbb] text-white cursor-not-allowed'
              }`}
            >
              {hasIntelligenceData && (
                <span className="absolute -top-2.5 -right-2.5 bg-red-600 text-white text-[8px] uppercase tracking-widest px-1.5 py-0.5 leading-none">
                  Nowość
                </span>
              )}
              Sprawdź ceny<br className="hidden sm:inline" /> konkurencji
            </button>
          </div>
        </div>

        {/* Section: Opis */}
        <div className="mb-8">
          <p className="text-[10px] uppercase tracking-widest text-[#999] mb-4 pb-2 border-b border-[#e5e5e5]">
            Opis
          </p>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Opisz swój produkt — materiał, wymiary, stan..."
            rows={4}
            className="w-full border border-[#e5e5e5] px-3 py-2 text-sm outline-none focus:border-black transition-colors resize-none"
          />
        </div>

        {/* Section: Zdjęcia */}
        <div className="mb-8">
          <p className="text-[10px] uppercase tracking-widest text-[#999] mb-4 pb-2 border-b border-[#e5e5e5]">
            Zdjęcia
          </p>
          <div className="grid grid-cols-4 gap-3">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="border border-dashed border-[#e5e5e5] bg-[#f5f5f5] flex items-center justify-center cursor-pointer hover:border-black transition-colors"
                style={{ aspectRatio: '3/4' }}
              >
                <span className="text-[#ccc] text-xl">+</span>
              </div>
            ))}
          </div>
          <p className="text-[10px] text-[#999] mt-2">
            Dodaj do 8 zdjęć. Pierwsze zdjęcie będzie miniaturą.
          </p>
        </div>

        {/* Submit */}
        <div className="pt-4 border-t border-[#e5e5e5]">
          <button
            type="submit"
            className="bg-black text-white text-[10px] uppercase tracking-widest px-8 py-3 hover:bg-[#333] transition-colors"
          >
            Opublikuj produkt
          </button>
        </div>
      </form>

      {/* Modal — outside form so backdrop doesn't trigger submit */}
      {modalOpen && modalData && (
        <PriceIntelligenceModal
          data={modalData}
          onClose={() => setModalOpen(false)}
          onSignUp={() => setSignedUp(true)}
        />
      )}
    </>
  )
}
