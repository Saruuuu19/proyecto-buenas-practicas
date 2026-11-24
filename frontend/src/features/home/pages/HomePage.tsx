import { HeroSection } from "../components/HeroSection";
import { BenefitsBar } from "../components/BenefitsBar";
import { WhyTechFlow } from "../components/WhyTechFlow";
import { PromoBanner } from "../components/PromoBanner";
import { FeaturedProducts } from "../../products/components/FeaturedProducts";
import { BrandsSection } from "../components/BrandsSection";
import { Newsletter } from "../components/Newsletter";

export function HomePage() {
  return (
    <>
      <HeroSection />
      <BenefitsBar />
      <PromoBanner />
      <FeaturedProducts />
      <WhyTechFlow />
      <BrandsSection />
      <Newsletter />
    </>
  );
}