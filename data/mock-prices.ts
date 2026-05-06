import type { CategoryPriceData, MockProduct, PriceBucket, PriceRange } from '@/types'

// Shoes — median 399 zł, zone 319–479 zł (mediana ±20%)
const shoesPriceRange: PriceRange = {
  category: 'shoes',
  min: 319,
  max: 479,
  sampleSize: 47,
  median: 399,
}

const shoesProducts: MockProduct[] = [
  { id: 's1', name: 'Sneakersy skórzane', price: 219, category: 'shoes', bgColor: '#e8e4de', imageUrl: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8c2hvZXN8ZW58MHx8MHx8fDA%3D' },
  { id: 's2', name: 'Derby klasyczne', price: 289, category: 'shoes', bgColor: '#ddd8d0', imageUrl: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHNob2VzfGVufDB8fDB8fHww' },
  { id: 's3', name: 'Botki Chelsea', price: 349, category: 'shoes', bgColor: '#d4cec8', imageUrl: 'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHNob2VzfGVufDB8fDB8fHww' },
  { id: 's4', name: 'Sneakersy białe', price: 399, category: 'shoes', bgColor: '#f0ede8', imageUrl: 'https://images.unsplash.com/photo-1595341888016-a392ef81b7de?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHNob2VzfGVufDB8fDB8fHww' },
  { id: 's5', name: 'Kozaki wysokie', price: 449, category: 'shoes', bgColor: '#c8c2ba', imageUrl: 'https://images.unsplash.com/photo-1539185441755-769473a23570?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHNob2VzfGVufDB8fDB8fHww' },
  { id: 's6', name: 'Sandały płaskie', price: 549, category: 'shoes', bgColor: '#e0d8ce', imageUrl: 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHNob2VzfGVufDB8fDB8fHww' },
]

// zone: 319–479 — mark buckets overlapping with zone
const shoesDistribution: PriceBucket[] = [
  { label: '150', min: 150, max: 199, count: 2, inSuggestedZone: false },
  { label: '200', min: 200, max: 249, count: 3, inSuggestedZone: false },
  { label: '250', min: 250, max: 299, count: 5, inSuggestedZone: false },
  { label: '300', min: 300, max: 349, count: 8, inSuggestedZone: true },
  { label: '350', min: 350, max: 399, count: 12, inSuggestedZone: true },
  { label: '400', min: 400, max: 449, count: 10, inSuggestedZone: true },
  { label: '450', min: 450, max: 499, count: 7, inSuggestedZone: true },
  { label: '500', min: 500, max: 549, count: 4, inSuggestedZone: false },
  { label: '550', min: 550, max: 599, count: 2, inSuggestedZone: false },
]

// Dresses — median 259 zł, zone 207–311 zł (mediana ±20%)
const dressesPriceRange: PriceRange = {
  category: 'dresses',
  min: 207,
  max: 311,
  sampleSize: 63,
  median: 259,
}

const dressesProducts: MockProduct[] = [
  { id: 'd1', name: 'Sukienka midi', price: 149, category: 'dresses', bgColor: '#ece8e2' },
  { id: 'd2', name: 'Sukienka letnia', price: 189, category: 'dresses', bgColor: '#e4ddd6' },
  { id: 'd3', name: 'Sukienka z dekoltem', price: 239, category: 'dresses', bgColor: '#dcd5cc' },
  { id: 'd4', name: 'Sukienka kopertowa', price: 259, category: 'dresses', bgColor: '#f2ede8' },
  { id: 'd5', name: 'Sukienka wieczorowa', price: 299, category: 'dresses', bgColor: '#cec7bf' },
  { id: 'd6', name: 'Sukienka maxi', price: 349, category: 'dresses', bgColor: '#e8e0d8' },
]

// zone: 207–311 — mark buckets overlapping with zone
const dressesDistribution: PriceBucket[] = [
  { label: '100', min: 100, max: 149, count: 3, inSuggestedZone: false },
  { label: '150', min: 150, max: 199, count: 7, inSuggestedZone: false },
  { label: '200', min: 200, max: 249, count: 14, inSuggestedZone: true },
  { label: '250', min: 250, max: 299, count: 16, inSuggestedZone: true },
  { label: '300', min: 300, max: 349, count: 9, inSuggestedZone: true },
  { label: '350', min: 350, max: 399, count: 4, inSuggestedZone: false },
]

export const mockPriceData: Record<string, CategoryPriceData> = {
  shoes: {
    category: 'shoes',
    label: 'Buty',
    products: shoesProducts,
    priceRange: shoesPriceRange,
    averagePrice: 399,
    trendPercent: 8,
    distribution: shoesDistribution,
  },
  dresses: {
    category: 'dresses',
    label: 'Sukienki',
    products: dressesProducts,
    priceRange: dressesPriceRange,
    averagePrice: 246,
    trendPercent: -3,
    distribution: dressesDistribution,
  },
}

export const priceRanges: Record<string, PriceRange> = {
  shoes: shoesPriceRange,
  dresses: dressesPriceRange,
  jackets: { category: 'jackets', min: 279, max: 418, sampleSize: 31, median: 349 },
  tops: { category: 'tops', min: 95, max: 143, sampleSize: 88, median: 119 },
}
