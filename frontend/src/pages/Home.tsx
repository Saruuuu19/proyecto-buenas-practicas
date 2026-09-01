import { HeroSection } from "../components/home/HeroSection";
import { BenefitsBar } from "../components/home/BenefitsBar";
import { PromoBanner } from "../components/home/PromoBanner";
import { FeaturedProducts } from "../components/home/FeaturedProducts";
import { BrandsSection } from "../components/home/BrandsSection";
import { Newsletter } from "../components/home/Newsletter";

export function Home() {
  return (
    <>
      <HeroSection />
      <BenefitsBar />
      <PromoBanner />
      <FeaturedProducts />
      <BrandsSection />
      <Newsletter />
    </>
  );
}
