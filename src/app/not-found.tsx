import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] items-center py-20">
      <Container>
        <div className="flex flex-col items-start">
          <span className="font-mono text-[13px] uppercase tracking-[0.2em] text-accent-dim">Ошибка 404</span>
          <h1 className="mt-5 max-w-[560px] text-[clamp(32px,4.4vw,52px)] leading-[1.1] text-graphite">
            Такой двери в каталоге нет
          </h1>
          <p className="mt-5 max-w-[440px] text-[16px] leading-relaxed text-graphite-soft">
            Страница могла быть перемещена или удалена. Посмотрите каталог — там точно найдётся модель под ваш интерьер.
          </p>
          <div className="mt-8 flex gap-3">
            <Button href="/catalog" size="lg">
              Перейти в каталог
            </Button>
            <Button href="/" variant="light" size="lg">
              На главную
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
