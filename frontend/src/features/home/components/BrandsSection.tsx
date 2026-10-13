const brands = [
  { name: "Apple", logo: "🍎" },
  { name: "Samsung", logo: "📱" },
  { name: "Sony", logo: "🎵" },
  { name: "Xiaomi", logo: "⚡" },
  { name: "Logitech", logo: "🖱️" },
  { name: "JBL", logo: "🔊" },
];

export function BrandsSection() {
  return (
    <section
      aria-label="Marcas que confían en nosotros"
      className="py-10 border-t border-outline-variant"
    >
      <div className="max-w-[1280px] mx-auto px-4 md:px-10">
        <h2 className="text-center text-body-sm font-semibold text-on-surface-variant uppercase tracking-widest mb-8">
          Marcas que confían en nosotros
        </h2>
        <ul className="flex flex-wrap items-center justify-center gap-8 md:gap-14">
          {brands.map((brand) => (
            <li
              key={brand.name}
              className="flex items-center gap-2 text-on-surface-variant/40 hover:text-on-surface-variant transition-colors cursor-pointer"
            >
              <span className="text-2xl" aria-hidden="true">
                {brand.logo}
              </span>
              <span className="text-body-lg font-semibold">{brand.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}