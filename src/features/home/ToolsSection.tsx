import Link from "next/link";
import { Camera, Sparkles, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";

export function ToolsSection() {
  return (
    <section className="py-24">
      <Container>
        <SectionHeading
          eyebrow="Онлайн-инструменты"
          title="Прежде чем заказать — примерьте"
          description="Два инструмента, которые снимают главный вопрос: «а как это будет выглядеть у меня дома»."
          className="mb-12"
        />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <ToolCard
            href="/configurator"
            icon={<Camera size={22} strokeWidth={1.6} />}
            eyebrow="Конструктор"
            title="Примерка двери в вашем интерьере"
            description="Загрузите фото комнаты, привяжите дверь к плоскости стены по четырём точкам — освещение и тени подстроятся под фото автоматически."
            cta="Открыть конструктор"
          />
          <ToolCard
            href="/podbor"
            icon={<Sparkles size={22} strokeWidth={1.6} />}
            eyebrow="ИИ-ассистент"
            title="Подобрать дверь по параметрам интерьера"
            description="Ответьте на несколько вопросов о стиле, помещении и бюджете — ассистент предложит 5 моделей с объяснением, почему они подходят именно вам."
            cta="Пройти подбор"
            dark
          />
        </div>
      </Container>
    </section>
  );
}

function ToolCard({
  href,
  icon,
  eyebrow,
  title,
  description,
  cta,
  dark = false,
}: {
  href: string;
  icon: React.ReactNode;
  eyebrow: string;
  title: string;
  description: string;
  cta: string;
  dark?: boolean;
}) {
  return (
    <Reveal>
      <Link
        href={href}
        className={`group relative flex h-full flex-col overflow-hidden rounded-[32px] p-9 shadow-[var(--shadow-md)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[var(--shadow-xl)] ${
          dark ? "bg-obsidian text-mist" : "border border-line bg-white text-graphite"
        }`}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full opacity-40 blur-3xl transition-transform duration-700 group-hover:scale-110"
          style={{
            background: dark
              ? "radial-gradient(circle, rgba(163,121,63,0.35), transparent 70%)"
              : "radial-gradient(circle, rgba(163,121,63,0.14), transparent 70%)",
          }}
        />
        <div
          className={`mb-8 grid h-14 w-14 place-items-center rounded-2xl ${
            dark ? "border border-white/15 bg-white/5" : "border border-line bg-gradient-to-br from-white to-mist-2 shadow-[var(--shadow-xs)]"
          }`}
        >
          {icon}
        </div>
        <span className={`font-mono text-[11.5px] uppercase tracking-[0.18em] ${dark ? "text-accent-soft" : "text-accent-dim"}`}>
          {eyebrow}
        </span>
        <h3 className="mt-3 max-w-[380px] font-display text-[24px] leading-[1.2]">{title}</h3>
        <p className={`mt-3 max-w-[420px] flex-1 text-[14.5px] leading-relaxed ${dark ? "text-graphite-mist/75" : "text-graphite-soft"}`}>
          {description}
        </p>
        <div className={`mt-8 inline-flex items-center gap-2 font-sans text-[14px] font-semibold ${dark ? "text-mist" : "text-graphite"}`}>
          {cta}
          <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
        </div>
      </Link>
    </Reveal>
  );
}
