export function BrandsSection() {
  const brands = [
    { name: "Apple", svg: <AppleLogo /> },
    { name: "Samsung", svg: <SamsungLogo /> },
    { name: "Sony", svg: <SonyLogo /> },
    { name: "Xiaomi", svg: <XiaomiLogo /> },
    { name: "Logitech", svg: <LogitechLogo /> },
    { name: "JBL", svg: <JBLLogo /> },
  ];

  return (
    <section className="py-10 border-t border-outline-variant">
      <div className="max-w-[1280px] mx-auto px-4 md:px-10">
        <h2 className="text-center text-sm font-semibold text-on-surface-variant uppercase tracking-widest mb-8">
          Marcas que confian en nosotros
        </h2>
        <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16">
          {brands.map((brand) => (
            <div
              key={brand.name}
              className="flex items-center text-on-surface-variant/30 hover:text-on-surface-variant transition-colors duration-300 cursor-pointer"
            >
              {brand.svg}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AppleLogo() {
  return (
    <svg viewBox="0 0 120 40" className="h-7 w-auto fill-current">
      <text x="0" y="30" fontFamily="system-ui, -apple-system, sans-serif" fontSize="28" fontWeight="600" letterSpacing="-1">
        Apple
      </text>
    </svg>
  );
}

function SamsungLogo() {
  return (
    <svg viewBox="0 0 140 40" className="h-7 w-auto fill-current">
      <text x="0" y="30" fontFamily="system-ui, -apple-system, sans-serif" fontSize="24" fontWeight="700" letterSpacing="2">
        SAMSUNG
      </text>
    </svg>
  );
}

function SonyLogo() {
  return (
    <svg viewBox="0 0 110 40" className="h-7 w-auto fill-current">
      <text x="0" y="30" fontFamily="system-ui, -apple-system, sans-serif" fontSize="28" fontWeight="700" letterSpacing="3">
        SONY
      </text>
    </svg>
  );
}

function XiaomiLogo() {
  return (
    <svg viewBox="0 0 120 40" className="h-7 w-auto fill-current">
      <text x="0" y="30" fontFamily="system-ui, -apple-system, sans-serif" fontSize="24" fontWeight="600" letterSpacing="1">
        Xiaomi
      </text>
    </svg>
  );
}

function LogitechLogo() {
  return (
    <svg viewBox="0 0 160 40" className="h-7 w-auto fill-current">
      <text x="0" y="30" fontFamily="system-ui, -apple-system, sans-serif" fontSize="24" fontWeight="600" letterSpacing="0.5">
        logitech
      </text>
    </svg>
  );
}

function JBLLogo() {
  return (
    <svg viewBox="0 0 90 40" className="h-7 w-auto fill-current">
      <text x="0" y="32" fontFamily="system-ui, -apple-system, sans-serif" fontSize="32" fontWeight="900" letterSpacing="2">
        JBL
      </text>
    </svg>
  );
}
