import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ConfiguratorView } from "@/features/room-visualizer/ConfiguratorView";

export const metadata: Metadata = {
  title: "Конструктор — примерка двери в интерьере",
  description:
    "Загрузите фото своей комнаты и примерьте дверь на месте: перспективная привязка к проёму, автоподбор освещения и цветовой температуры под фото.",
  alternates: { canonical: "/configurator" },
};

export default function ConfiguratorPage() {
  return (
    <div className="py-14">
      <Container>
        <SectionHeading
          eyebrow="Онлайн-примерка"
          title="Впишите дверь в свой интерьер"
          description="Никаких «а вдруг не подойдёт». Загрузите фото стены и передвиньте четыре точки — дверь встанет в перспективу проёма."
          className="mb-10"
        />
        <ConfiguratorView />
      </Container>
    </div>
  );
}
