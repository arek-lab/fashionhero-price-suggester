import { ListingForm } from '@/components/ListingForm'

export default function Page() {
  return (
    <div className="flex min-h-screen bg-white">
      {/* Fake sidebar */}
      <aside className="hidden md:flex flex-col w-52 border-r border-[#e5e5e5] bg-[#f5f5f5] flex-shrink-0">
        <div className="px-5 py-5 border-b border-[#e5e5e5]">
          <span className="text-xs font-bold uppercase tracking-widest">FashionHero</span>
          <p className="text-[9px] uppercase tracking-widest text-[#999] mt-0.5">Panel Sellera</p>
        </div>
        <nav className="py-3">
          {[
            { label: 'Produkty', active: true },
            { label: 'Zamówienia', active: false },
            { label: 'Statystyki', active: false },
            { label: 'Ustawienia', active: false },
          ].map(({ label, active }) => (
            <div
              key={label}
              className={`px-5 py-2.5 text-[10px] uppercase tracking-widest cursor-default ${
                active ? 'bg-white text-black font-bold border-r-2 border-black' : 'text-[#999]'
              }`}
            >
              {label}
            </div>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 px-6 md:px-10 py-8 max-w-2xl">
        {/* Breadcrumb */}
        <p className="text-[10px] uppercase tracking-widest text-[#999] mb-6">
          Produkty / Dodaj produkt
        </p>

        {/* Page heading */}
        <h1 className="text-xl font-bold uppercase tracking-widest mb-8">
          Dodaj produkt
        </h1>

        <ListingForm />
      </main>
    </div>
  )
}
