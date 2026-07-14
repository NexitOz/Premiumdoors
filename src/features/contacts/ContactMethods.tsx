import { Phone, Mail, MessageCircle, Send } from "lucide-react";
import { siteConfig } from "@/config/site";

const METHODS = [
  {
    icon: Phone,
    label: "Телефон",
    value: siteConfig.phone,
    hint: siteConfig.phoneHours,
    href: `tel:${siteConfig.phone.replace(/[^\d+]/g, "")}`,
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "Написать нам",
    hint: "Ответим в течение часа",
    href: siteConfig.whatsapp,
  },
  {
    icon: Send,
    label: "Telegram",
    value: "Написать нам",
    hint: "Онлайн-консультация",
    href: siteConfig.telegram,
  },
  {
    icon: Mail,
    label: "Email",
    value: siteConfig.email,
    hint: "Для сотрудничества и дилеров",
    href: `mailto:${siteConfig.email}`,
  },
];

export function ContactMethods() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {METHODS.map((m) => (
        <a
          key={m.label}
          href={m.href}
          target={m.href.startsWith("http") ? "_blank" : undefined}
          rel={m.href.startsWith("http") ? "noopener noreferrer" : undefined}
          className="group flex items-start gap-3.5 rounded-2xl border border-line bg-white p-5 shadow-[var(--shadow-xs)] transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)]"
        >
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-line bg-gradient-to-br from-white to-mist-2">
            <m.icon size={18} className="text-graphite" strokeWidth={1.7} />
          </span>
          <div>
            <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-graphite-faint">{m.label}</div>
            <div className="mt-1 font-display text-[15px] text-graphite group-hover:text-accent-dim">{m.value}</div>
            <div className="mt-0.5 text-[12px] text-graphite-faint">{m.hint}</div>
          </div>
        </a>
      ))}
    </div>
  );
}
