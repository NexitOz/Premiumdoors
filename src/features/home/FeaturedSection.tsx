import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductCard } from "@/features/catalog/ProductCard";
import { DOORS } from "@/data/doors";

export function FeaturedSection() {
  const featured = DOORS.filter((d) => d.isBestseller).slice(0, 4);

  return (
    <section className="bg-mist-2/60 py-24">
      <Container>
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <SectionHeading eyebrow="Бестселлеры" title="Модели, которые выбирают чаще всего" />
          <Link
            href="/catalog"
            className="inline-flex items-center gap-2 font-sans text-[14px] font-semibold text-graphite hover:text-accent-dim"
          >
            Все двери <ArrowUpRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((door, i) => (
            <ProductCard key={door.slug} door={door} index={i} />
          ))}
        </div>
      </Container>
    </section>
  );
}
