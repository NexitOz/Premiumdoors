import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RoomScene } from "@/components/ui/RoomScene";
import { Reveal } from "@/components/motion/Reveal";
import { INTERIORS } from "@/data/interiors";

export function GallerySection() {
  const items = INTERIORS.slice(0, 3);

  return (
    <section className="py-24">
      <Container>
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Реализованные проекты"
            title="Двери в настоящих интерьерах"
            description="На каждой фотографии — модель, которая установлена в этом проекте."
          />
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 font-sans text-[14px] font-semibold text-graphite hover:text-accent-dim"
          >
            Вся галерея <ArrowUpRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {items.map((item, i) => (
            <Reveal key={item.id} delay={i * 0.08}>
              <Link href={`/gallery#${item.id}`} className="group block overflow-hidden rounded-3xl border border-line shadow-[var(--shadow-sm)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[var(--shadow-lg)]">
                <RoomScene interior={item} className="aspect-[4/5] transition-transform duration-700 group-hover:scale-[1.03]" />
                <div className="bg-white p-5">
                  <div className="font-display text-[15px] text-graphite">{item.title}</div>
                  <div className="mt-1 text-[12.5px] text-graphite-faint">
                    {item.roomType} · {item.style}
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
