import { Suspense } from "react";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CatalogView } from "@/features/catalog/CatalogView";
import { DOORS, COLLECTIONS } from "@/data/doors";

export const metadata: Metadata = {
  title: "Каталог межкомнатных дверей",
  description:
    "Полный каталог межкомнатных дверей премиум-класса: скрытые, царговые, остеклённые и фрезерованные модели. Фильтры по коллекции, цене и остеклению.",
  alternates: { canonical: "/catalog" },
};

export default function CatalogPage() {
  return (
    <div className="py-14">
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
