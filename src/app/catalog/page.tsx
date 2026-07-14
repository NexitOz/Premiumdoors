import { Suspense } from "react";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CatalogView } from "@/features/catalog/CatalogView";
import { DOORS, COLLECTIONS } from "@/data/doors";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Каталог межкомнатных дверей",
  description:
    "Полный каталог межкомнатных дверей премиум-класса: скрытые, царговые, остеклённые и фрезерованные модели. Фильтры по коллекции, цене и остеклению.",
  alternates: { canonical: "/catalog" },
};

function itemListJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: DOORS.map((door, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${siteConfig.url}/product/${door.slug}`,
      name: door.name,
    })),
  };
}

export default function CatalogPage() {
  return (
    <div className="py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd()) }}
      />
      <Container>
        <SectionHeading
          eyebrow="Каталог"
          title="Все модели дверей"
          description={`${DOORS.length} моделей в ${COLLECTIONS.length} коллекциях — от полностью скрытых систем до остеклённых перегородок.`}
          className="mb-10"
        />
        <Suspense fallback={<div className="h-[600px]" />}>
          <CatalogView />
        </Suspense>
      </Container>
    </div>
  );
}
