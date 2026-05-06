@AGENTS.md

# FashionHero PriceSuggest — Project Config

PROJECT: FashionHero PriceSuggest
ROLE: Budujesz statyczny prototyp narzędzia do sugerowania cen dla nowych sellerów FashionHero — walidacja założeń produktowych, nie produkcja.

## Cel aplikacji

Nowi sellerzy (0–3 mies. aktywności) nie wiedzą jak wycenić produkty i tracą kilka godzin tygodniowo na ręczne research. Prototyp symuluje ekran tworzenia listingu z komponentem "Sugerowany zakres cenowy" — np. "150–280 PLN (na podstawie 47 podobnych produktów)". Dane zakresu hardcodowane z CSV (dresses, shoes). Cel: 5–8 wywiadów z nowymi sellerami — czy anchor cenowy zmienia ich decyzję?

## Wytyczne designu

Kopiuj design systemu z fashionhero.aiproductheroes.pl:
- Białe tło, dużo przestrzeni, zero dekoracji. Czysty serif/sans-serif mix, uppercase labele sekcji.
- Typografia: nagłówki uppercase tracking-widest, body czarny na białym, ceny pogrubione.
- Komponenty: proste bordery (#e5e5e5), brak zaokrąglonych rogów w kartach produktów, zdjęcia zajmują 60%+ karty.
- Paleta: biały (#fff), czarny (#000), szary akcent (#f5f5f5), zero kolorów brandowych poza czernią.

## Styl kodu

- TypeScript strict — żadnych `any`. Good: `price: number` Bad: `price: any`
- Named exports wszędzie. Good: `export function PriceWidget()` Bad: `export default function()`
- Komponenty w `/components`, dane mockowe w `/data/mock-prices.ts`
- Tailwind utility classes — nie pisz custom CSS jeśli istnieje klasa Tailwind
- `const` dla wszystkich zmiennych, które się nie zmieniają. Good: `const range = getRange()` Bad: `let range = getRange()`

## Reguły domenowe

- Zakres cenowy = mediana kategorii ±20% — nie zmieniaj tej formuły bez pytania
- Kategorie priorytetowe: `dresses`, `shoes` (największa liczba SKU, najgorsza marża w CSV)
- Ceny zawsze w PLN, format: `249 zł` (bez przecinka, spacja przed zł)
- Seller = niezależny sklep, nie pracownik FashionHero

## Model danych

```ts
type Category = 'shoes' | 'dresses' | 'jackets' | 'tops'

type PriceRange = {
  category: Category
  min: number        // mediana - 20%
  max: number        // mediana + 20%
  sampleSize: number // liczba podobnych produktów (wyświetlana sellerowi)
  median: number
}

type ListingDraft = {
  title: string
  category: Category
  suggestedRange: PriceRange
  sellerPrice?: number  // to co seller wpisze
}
```

## Granice

**ALWAYS:**
- Pokazuj komponent sugestii cenowej jako pierwszą rzecz widoczną po wyborze kategorii
- Wyświetlaj `sampleSize` ("na podstawie X podobnych produktów") — to buduje zaufanie do anchora
- Zachowaj wygląd 1:1 z fashionhero.aiproductheroes.pl — to prototyp do testów z prawdziwymi sellerami

**ASK FIRST:**
- Przed dodaniem jakiejkolwiek logiki backendu lub API (to ma być statyczny mockup)
- Przed zmianą formuły zakresu cenowego (mediana ±20%)
- Przed dodaniem nowych kategorii poza dresses i shoes

**NEVER:**
- Nie buduj prawdziwej integracji z bazą danych ani panelem sellera — dane są hardcodowane
- Nie dodawaj animacji ani loading states — to statyczny prototyp badawczy
- Nie zmieniaj designu na "bardziej nowoczesny" — musi wyglądać jak istniejąca apka FashionHero