import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { ProcessTimeline } from "@/features/production/ProcessTimeline";
import { QualityStats } from "@/features/production/QualityStats";
import { WarrantySection } from "@/features/production/WarrantySection";

export const metadata: Metadata = {
  title: "Производство",
  description: "Собственное производство межкомнатных дверей: от отбора материала до контроля качества и упаковки.",
  alternates: { canonical: "/production" },
};

export default function ProductionPage() {
  return (
    <div className="py-14">
      <Container>
        <div className="mb-14 flex flex-col items-start gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Производство"
            title="От материала до готовой двери — на одной площадке"
            description="Мы не собираем двери из готовых импортных комплектов — раскрой, прессование, покраска и контроль качества происходят на нашем производстве."
          />
          <Button href="/contacts" variant="light" size="lg" className="shrink-0">
            Заказать замер
          </Button>
        </div>

        <div className="mb-20">
          <QualityStats />
        </div>

        <div className="mb-20">
          <SectionHeading eyebrow="Этапы" title="Как рождается дверь" className="mb-12" />
          <ProcessTimeline />
        </div>

        <WarrantySection />
      </Container>
    </div>
  );
}
