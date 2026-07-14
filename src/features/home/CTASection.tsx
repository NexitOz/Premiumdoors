import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function CTASection() {
  return (
    <section className="pb-24">
      <Container>
        <div className="relative flex flex-col items-start justify-between gap-8 overflow-hidden rounded-[32px] bg-gradient-to-br from-graphite to-[#22242a] p-10 shadow-[var(--shadow-xl)] md:flex-row md:items-center md:p-14">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full opacity-30 blur-3xl"
            style={{ background: "radial-gradient(circle, #a3793f, transparent 70%)" }}
          />
          <div className="relative max-w-[480px]">
            <h2 className="text-[clamp(22px,2.6vw,32px)] leading-[1.2] text-mist">
              Не уверены в выборе? Пришлите фото — подберём за вас
            </h2>
            <p className="mt-3 max-w-[420px] text-[15px] text-graphite-mist/70">
              Дизайнер бесплатно подберёт 3–4 модели под ваш интерьер и пришлёт варианты в мессенджер в течение часа.
            </p>
          </div>
          <div className="relative flex flex-wrap gap-3">
            <Button href="/contacts" variant="light" size="lg">
              Получить подбор
            </Button>
            <Button href="/podbor" variant="ghost-inverse" size="lg" className="text-mist">
              Попробовать ИИ-подбор
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
