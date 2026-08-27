import { Headphones, Laptop, Watch, Keyboard } from "lucide-react";
import { categories } from "../../data/products";

const iconMap: Record<string, React.ReactNode> = {
  headphones: <Headphones className="h-8 w-8" />,
  laptop: <Laptop className="h-8 w-8" />,
  watch: <Watch className="h-8 w-8" />,
  keyboard: <Keyboard className="h-8 w-8" />,
};

export function CategoryGrid() {
  return (
    <section className="py-12">
      <div className="max-w-[1280px] mx-auto px-4 md:px-10">
        <h2 className="text-headline-lg md:text-headline-lg font-semibold text-on-background mb-6">
          Shop by Category
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <button
              key={cat.name}
              className="flex flex-col items-center justify-center gap-3 p-6 bg-surface rounded-xl border border-outline-variant hover:border-primary hover:bg-surface-container-low transition-all cursor-pointer"
            >
              <div className="text-primary">{iconMap[cat.icon]}</div>
              <span className="text-body-md font-medium text-on-surface">
                {cat.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
