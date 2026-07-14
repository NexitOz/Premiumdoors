import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GalleryGrid } from "@/features/gallery/GalleryGrid";

export const metadata: Metadata = {
  title: "Галерея интерьеров",
  description: "Реализованные проекты с дверями ATRIUM: смотрите фото до/после и модель, установленную в каждом интерьере.",
  alternates: { canonical: "/gallery" },
};

export default function GalleryPage() {
  return (
    <div className="py-14">
      <Container>
        <SectionHeading
          eyebrow="Галерея"
          title="Двери в реализованных интерьерах"
          description="Нажмите на фотографию, чтобы посмотреть помещение до и после установки, и узнать, какая модель использована."
          className="mb-10"
        />
        <GalleryGrid />
      </Container>
    </div>
  );
}
