import Link from "next/link";
import { Logo } from "./Logo";
import { Container } from "@/components/ui/Container";
import { footerNav, siteConfig } from "@/config/site";

export function Footer() {
  return (
    <footer className="border-t border-obsidian-line bg-obsidian pb-10 pt-20 text-graphite-mist">
      <Container>
        <div className="grid grid-cols-2 gap-10 border-b border-obsidian-line pb-16 md:grid-cols-5">
          <div className="col-span-2">
            <Logo dark />
            <p className="mt-5 max-w-[280px] text-[14px] leading-relaxed text-graphite-mist/70">
              {siteConfig.description}
            </p>
            <div className="mt-6 flex gap-3">
              {["IG", "PIN"].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/15 font-mono text-[11px] text-graphite-mist transition-colors hover:border-accent-soft hover:text-accent-soft"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          <FooterCol title="Каталог" items={footerNav.catalog} />
          <FooterCol title="Компания" items={footerNav.company} />
          <div>
            <h4 className="mb-4 font-mono text-[12px] uppercase tracking-[0.16em] text-white">Контакты</h4>
            <ul className="flex flex-col gap-2.5 text-[14px] text-graphite-mist/80">
              <li>
                <a href={`tel:${siteConfig.phone.replace(/[^\d+]/g, "")}`} className="hover:text-white">
                  {siteConfig.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${siteConfig.email}`} className="hover:text-white">
                  {siteConfig.email}
                </a>
              </li>
              <li>{siteConfig.address}</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-3 pt-8 text-[12.5px] text-graphite-mist/50 md:flex-row md:items-center">
          <span>© {new Date().getFullYear()} {siteConfig.fullName}. Все права защищены.</span>
          <div className="flex gap-5">
            <Link href="/privacy" className="hover:text-graphite-mist">Политика конфиденциальности</Link>
            <Link href="/offer" className="hover:text-graphite-mist">Публичная оферта</Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}

function FooterCol({ title, items }: { title: string; items: readonly { label: string; href: string }[] }) {
  return (
    <div>
      <h4 className="mb-4 font-mono text-[12px] uppercase tracking-[0.16em] text-white">{title}</h4>
      <ul className="flex flex-col gap-2.5 text-[14px] text-graphite-mist/80">
        {items.map((item) => (
          <li key={item.href}>
            <Link href={item.href} className="hover:text-white">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
