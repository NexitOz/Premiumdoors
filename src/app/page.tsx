import { Hero } from "@/features/hero/Hero";
import { CollectionsSection } from "@/features/home/CollectionsSection";
import { ToolsSection } from "@/features/home/ToolsSection";
import { FeaturedSection } from "@/features/home/FeaturedSection";
import { ProductionSection } from "@/features/home/ProductionSection";
import { GallerySection } from "@/features/home/GallerySection";
import { CTASection } from "@/features/home/CTASection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <CollectionsSection />
      <ToolsSection />
      <FeaturedSection />
      <ProductionSection />
      <GallerySection />
      <CTASection />
    </>
  );
}
