import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/config/site";
import { Hero3DLoader } from "./Hero3DLoader";

export function Hero() {
  return (
    <section className="relative overflow-hidden pb-24 pt-14 md:pt-20">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-40 h-[640px] w-[640px] rounded-full opacity-60"
        style={{ background: "radial-gradient(circle, #ffffff 0%, rgba(255,255,255,0) 70%)" }}
      />
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <span className="inline-flex items-center gap-3 font-mono text-[12px] font-medium uppercase tracking-[0.22em] text-accent-dim">
              <span className="h-px w-6 bg-accent-dim" />
              Производитель дверей премиум-класса
            </span>

            <h1 className="mt-6 max-w-[640px] text-[clamp(36px,5vw,60px)] leading-[1.08] text-graphite text-balance">
              Дверь,
              <br />
              <span className="font-normal text-graphite-soft">спроектированная</span>
              <br />
              как <em className="not-italic text-accent-dim">архитектура</em>
            </h1>

            <p className="mt-7 max-w-[480px] text-[17px] leading-relaxed text-graphite-soft">
              Собственное производство, материалы без компромиссов и online-конструктор:
              покрутите дверь курсором, откройте её на нужный угол и примерьте в своём интерьере ещё до заказа.
            </p>

            <div className="mt-9 flex flex-wrap gap-3.5">
              <Button href="/configurator" size="lg">
                Примерить дверь
              </Button>
              <Button href="/catalog" variant="light" size="lg">
                Смотреть каталог
              </Button>
            </div>

            <div className="mt-14 flex max-w-[560px] gap-0 border-t border-line pt-7">
              <Stat value="20+" label="лет производства" />
              <Stat value="20 000" label="полотен на складе" />
              <Stat value="7 лет" label="гарантии на скрытые системы" />
            </div>
          </div>

          <div className="flex justify-center">
            <Hero3DLoader />
          </div>
        </div>
      </Container>
      <p className="sr-only">{siteConfig.description}</p>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex-1 border-l border-line pl-5 first:border-l-0 first:pl-0">
      <div className="font-mono text-[22px] font-medium text-graphite">{value}</div>
      <div className="mt-1 text-[12.5px] font-semibold text-graphite-faint">{label}</div>
    </div>
  );
}
