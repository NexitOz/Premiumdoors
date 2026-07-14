import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LeadForm } from "@/features/contacts/LeadForm";
import { MapPanel } from "@/features/contacts/MapPanel";
import { ContactMethods } from "@/features/contacts/ContactMethods";

export const metadata: Metadata = {
  title: "Контакты",
  description: "Свяжитесь с нами: телефон, WhatsApp, Telegram, email или заявка на бесплатный замер.",
  alternates: { canonical: "/contacts" },
};

export default function ContactsPage() {
  return (
    <div className="py-14">
      <Container>
        <SectionHeading
          eyebrow="Контакты"
          title="Свяжитесь с нами"
          description="Ответим на вопросы по подбору, замеру и монтажу — любым удобным способом."
          className="mb-10"
        />

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="flex flex-col gap-6">
            <ContactMethods />
            <MapPanel />
          </div>
          <LeadForm />
        </div>
      </Container>
    </div>
  );
}
