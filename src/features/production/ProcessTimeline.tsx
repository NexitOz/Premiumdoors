"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Trees, Scissors, Layers, PaintBucket, ShieldCheck, PackageCheck } from "lucide-react";

const STEPS = [
  {
    icon: Trees,
    title: "Отбор материала",
    description: "Плиты МДФ и массив хвои проходят входной контроль влажности и плотности перед раскроем.",
  },
  {
    icon: Scissors,
    title: "Раскрой и фрезеровка",
    description: "ЧПУ-станки вырезают заготовки и филёнки с точностью до 0,1 мм — основа ровной геометрии полотна.",
  },
  {
    icon: Layers,
    title: "Прессование и склейка",
    description: "Многослойная сборка каркаса под давлением: сотовое заполнение или клеёный брус в зависимости от модели.",
  },
  {
    icon: PaintBucket,
    title: "Покраска и шпонирование",
    description: "Автоматические покрасочные линии наносят эмаль в 3 слоя; шпон подбирается по рисунку среза.",
  },
  {
    icon: ShieldCheck,
    title: "Контроль качества",
    description: "34 контрольные точки: геометрия, прилегание кромки, качество покрытия, работа фурнитуры.",
  },
  {
    icon: PackageCheck,
    title: "Упаковка и отгрузка",
    description: "Каждое полотно упаковывается в защитный короб с угловыми протекторами перед отправкой.",
  },
];

gsap.registerPlugin(ScrollTrigger);

export function ProcessTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            transformOrigin: "top",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 70%",
              end: "bottom 60%",
              scrub: 0.6,
            },
          }
        );
      }

      const items = gsap.utils.toArray<HTMLElement>(".process-step");
      items.forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, x: i % 2 === 0 ? -30 : 30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 82%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <div className="absolute left-[27px] top-2 bottom-2 w-px bg-line md:left-1/2 md:-translate-x-1/2">
        <div ref={lineRef} className="h-full w-full bg-gradient-to-b from-accent to-accent-dim" />
      </div>

      <div className="flex flex-col gap-12">
        {STEPS.map((step, i) => (
          <div
            key={step.title}
            className={`process-step relative flex gap-6 md:w-1/2 ${
              i % 2 === 0 ? "md:pr-12" : "md:ml-auto md:flex-row-reverse md:pl-12 md:text-right"
            }`}
          >
            <span className="relative z-10 grid h-14 w-14 shrink-0 place-items-center rounded-2xl border border-line bg-white shadow-[var(--shadow-sm)]">
              <step.icon size={22} className="text-graphite" strokeWidth={1.6} />
              <span className="absolute -right-1.5 -top-1.5 grid h-6 w-6 place-items-center rounded-full bg-graphite font-mono text-[11px] font-bold text-white">
                {i + 1}
              </span>
            </span>
            <div>
              <h3 className="font-display text-[18px] text-graphite">{step.title}</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-graphite-soft">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
