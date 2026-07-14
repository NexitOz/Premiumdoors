"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Search, X, FileText } from "lucide-react";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { mainNav, siteConfig } from "@/config/site";
import { useUIStore } from "@/store/ui-store";
import { useQuoteStore } from "@/store/quote-store";
import { cn } from "@/lib/utils";
import { SearchOverlay } from "./SearchOverlay";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { isMobileNavOpen, setMobileNavOpen, isSearchOpen, setSearchOpen } = useUIStore();
  const quoteCount = useQuoteStore((s) => s.items.length);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileNavOpen(false);
  }, [pathname, setMobileNavOpen]);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 transition-[background,box-shadow,border-color] duration-500 ease-[cubic-bezier(.22,.9,.32,1)]",
          scrolled
            ? "border-b border-line bg-white/85 shadow-[var(--shadow-sm)] backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        )}
      >
        <Container>
          <div
            className={cn(
              "flex items-center gap-10 transition-[height] duration-500 ease-[cubic-bezier(.22,.9,.32,1)]",
              scrolled ? "h-[64px]" : "h-[84px]"
            )}
          >
            <Logo />

            <nav className="hidden items-center gap-8 lg:flex">
              {mainNav.map((item) => {
                const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "relative py-1.5 font-sans text-[14.5px] font-semibold text-graphite-soft transition-colors hover:text-graphite",
                      active && "text-graphite"
                    )}
                  >
                    {item.label}
                    {active && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute -bottom-0.5 left-0 h-[2px] w-full bg-accent"
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            <div className="ml-auto flex items-center gap-3">
              <div className="hidden text-right font-mono text-[13px] leading-tight text-graphite md:block">
                <a href={`tel:${siteConfig.phone.replace(/[^\d+]/g, "")}`} className="font-medium">
                  {siteConfig.phone}
                </a>
                <div className="font-sans text-[11px] font-medium text-graphite-faint">{siteConfig.phoneHours}</div>
              </div>

              <button
                aria-label="Поиск"
                onClick={() => setSearchOpen(true)}
                className="grid h-11 w-11 place-items-center rounded-xl border border-line bg-gradient-to-br from-white to-mist-2 text-graphite shadow-[var(--shadow-xs)] transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-sm)]"
              >
                <Search size={17} strokeWidth={1.8} />
              </button>

              <Link
                href="/configurator"
                aria-label="Список подбора"
                className="relative grid h-11 w-11 place-items-center rounded-xl border border-line bg-gradient-to-br from-white to-mist-2 text-graphite shadow-[var(--shadow-xs)] transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-sm)]"
              >
                <FileText size={17} strokeWidth={1.8} />
                {quoteCount > 0 && (
                  <span className="absolute -right-1.5 -top-1.5 grid h-[19px] min-w-[19px] place-items-center rounded-full bg-graphite px-1 font-mono text-[11px] font-bold text-white">
                    {quoteCount}
                  </span>
                )}
              </Link>

              <Button href="/podbor" size="sm" variant="primary" className="hidden sm:inline-flex">
                Подбор с ИИ
              </Button>

              <button
                aria-label="Меню"
                onClick={() => setMobileNavOpen(!isMobileNavOpen)}
                className="grid h-11 w-11 place-items-center rounded-xl border border-line bg-gradient-to-br from-white to-mist-2 text-graphite shadow-[var(--shadow-xs)] lg:hidden"
              >
                {isMobileNavOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
        </Container>
      </header>

      <AnimatePresence>
        {isMobileNavOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 0.9, 0.32, 1] }}
            className="fixed inset-x-0 top-[64px] z-30 overflow-hidden border-b border-line bg-white/95 backdrop-blur-xl lg:hidden"
          >
            <Container className="flex flex-col gap-1 py-6">
              {mainNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-xl px-3 py-3 font-display text-[19px] text-graphite transition-colors hover:bg-mist"
                >
                  {item.label}
                </Link>
              ))}
              <a href={`tel:${siteConfig.phone.replace(/[^\d+]/g, "")}`} className="mt-3 px-3 font-mono text-[15px] text-graphite">
                {siteConfig.phone}
              </a>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>

      <SearchOverlay open={isSearchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
