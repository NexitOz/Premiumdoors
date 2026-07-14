import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { AISelectView } from "@/features/ai-select/AISelectView";

export const metadata: Metadata = {
  title: "Подбор двери с ИИ-ассистентом",
  description:
    "Ответьте на несколько вопросов о стиле, помещении и бюджете — ассистент подберёт 5 моделей дверей с объяснением, почему они подходят именно вам.",
  alternates: { canonical: "/podbor" },
};

export default function PodborPage() {
  return (
    <div className="py-16">
      <Container>
        <AISelectView />
      </Container>
    </div>
  );
}
