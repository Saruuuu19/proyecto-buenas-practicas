import { HeroSection } from "../components/HeroSection";
import { BenefitsBar } from "../components/BenefitsBar";
import { CategoryGrid } from "../../products/components/CategoryGrid";
import { PromoBanner } from "../components/PromoBanner";
import { FeaturedProducts } from "../../products/components/FeaturedProducts";
import { BrandsSection } from "../components/BrandsSection";
import { Newsletter } from "../components/Newsletter";

export function HomePage() {
  return (
    <>
      <HeroSection />
      <BenefitsBar />
      <CategoryGrid />
      <PromoBanner />
      <FeaturedProducts />
      <BrandsSection />
      <Newsletter />
    </>
  );
}