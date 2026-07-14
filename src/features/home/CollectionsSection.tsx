import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { DoorGlyph } from "@/components/ui/DoorGlyph";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { COLLECTIONS, DOORS } from "@/data/doors";

const REPRESENTATIVE_HEX: Record<string, string> = {
  minima: "#f4f3ef",
  atelier: "#161616",
  monolith: "#4a3a30",
  vetro: "#2c2e32",
  concrete: "#c9c2b6",
};

export function CollectionsSection() {
  return (
    <section className="py-24">
      <Container>
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Коллекции"
            title="Пять систем — на любой характер интерьера"
            description="От полностью скрытых дверей до царговых моделей с алюминиевыми молдингами."
          />
          <Link
            href="/catalog"
            className="inline-flex items-center gap-2 font-sans text-[14px] font-semibold text-graphite hover:text-accent-dim"
          >
            Весь каталог <ArrowUpRight size={16} />
          </Link>
        </div>

        <RevealGroup className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5" stagger={0.07}>
          {COLLECTIONS.map((c) => {
            const count = DOORS.filter((d) => d.collection === c.id).length;
            const system = DOORS.find((d) => d.collection === c.id)?.system ?? "classic";
            return (
              <RevealItem key={c.id}>
                <Link
                  href={`/catalog?collection=${c.id}`}
                  className="group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-[var(--shadow-sm)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[var(--shadow-lg)]"
                >
                  <div className="flex items-center justify-center bg-gradient-to-b from-mist to-mist-2 py-8">
                    <DoorGlyph
                      hex={REPRESENTATIVE_HEX[c.id]}
                      system={system}
                      className="h-[150px] w-auto drop-shadow-[0_14px_16px_rgba(15,17,20,0.14)] transition-transform duration-500 group-hover:-translate-y-1"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="font-display text-[17px] text-graphite">{c.name}</h3>
                    <p className="mt-1.5 flex-1 text-[13px] leading-relaxed text-graphite-soft">
                      {c.description}
                    </p>
                    <span className="mt-4 font-mono text-[11.5px] text-graphite-faint">
                      {count} {count === 1 ? "модель" : "моделей"}
                    </span>
                  </div>
                </Link>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </Container>
    </section>
  );
}
