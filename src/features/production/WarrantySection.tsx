import { FileCheck2 } from "lucide-react";

const TERMS = [
  { label: "Полотно и покрытие", value: "5–7 лет в зависимости от коллекции" },
  { label: "Фурнитура и петли", value: "2 года" },
  { label: "Скрытые системы Minima", value: "7 лет" },
  { label: "Гарантийный ремонт", value: "выезд мастера в течение 5 рабочих дней" },
];

export function WarrantySection() {
  return (
    <div className="grid gap-8 rounded-3xl border border-line bg-white p-8 shadow-[var(--shadow-sm)] md:grid-cols-[auto_1fr] md:p-10">
      <div className="flex items-start gap-4 md:w-[220px] md:flex-col">
        <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-mist">
          <FileCheck2 size={24} className="text-graphite" strokeWidth={1.6} />
        </span>
        <div>
          <h3 className="font-display text-[19px] text-graphite">Гарантия и документы</h3>
          <p className="mt-2 text-[13.5px] leading-relaxed text-graphite-soft">
            Сертификаты соответствия и полный пакет документов на партию предоставляются на этапе заключения
            договора и по запросу.
          </p>
        </div>
      </div>
      <div className="grid gap-px overflow-hidden rounded-2xl bg-line sm:grid-cols-2">
        {TERMS.map((t) => (
          <div key={t.label} className="bg-white p-5">
            <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-graphite-faint">{t.label}</div>
            <div className="mt-1.5 text-[14px] text-graphite">{t.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
