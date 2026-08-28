import { HeroSection } from "../components/HeroSection";
import { CategoryGrid } from "../../products/components/CategoryGrid";
import { FeaturedProducts } from "../../products/components/FeaturedProducts";

export function HomePage() {
  return (
    <>
      <HeroSection />
      <CategoryGrid />
      <FeaturedProducts />
    </>
  );
}