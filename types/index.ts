export type Category = 'shoes' | 'dresses' | 'jackets' | 'tops'

export type PriceRange = {
  category: Category
  min: number
  max: number
  sampleSize: number
  median: number
}

export type ListingDraft = {
  title: string
  category: Category
  suggestedRange: PriceRange
  sellerPrice?: number
}

export type MockProduct = {
  id: string
  name: string
  price: number
  category: Category
  bgColor: string
  imageUrl?: string
}

export type PriceBucket = {
  label: string
  min: number
  max: number
  count: number
  inSuggestedZone: boolean
}

export type CategoryPriceData = {
  category: Category
  label: string
  products: MockProduct[]
  priceRange: PriceRange
  averagePrice: number
  trendPercent: number
  distribution: PriceBucket[]
}
