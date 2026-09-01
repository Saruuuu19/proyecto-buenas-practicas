import { Headphones, Laptop, Watch, Keyboard } from "lucide-react";
import { categories } from "../../data/products";

const iconMap: Record<string, React.ReactNode> = {
  headphones: <Headphones className="h-7 w-7" />,
  laptop: <Laptop className="h-7 w-7" />,
  watch: <Watch className="h-7 w-7" />,
  keyboard: <Keyboard className="h-7 w-7" />,
};

export function CategoryGrid() {
  return (
    <section className="py-10">
      <div className="max-w-[1280px] mx-auto px-4 md:px-10">
        <h2 className="text-xl md:text-2xl font-semibold text-on-background mb-6">
          Explorar por Categoría
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <button
              key={cat.name}
              className="group flex flex-col items-center justify-center gap-3 p-6 bg-surface rounded-xl border border-outline-variant hover:border-primary hover:bg-primary/5 transition-all cursor-pointer"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                {iconMap[cat.icon]}
              </div>
              <div className="text-center">
                <span className="text-sm font-semibold text-on-surface block">
                  {cat.name}
                </span>
                <span className="text-xs text-on-surface-variant">
                  {cat.count} productos
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
