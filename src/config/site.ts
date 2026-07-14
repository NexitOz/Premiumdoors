export const siteConfig = {
  name: "ATRIUM",
  fullName: "ATRIUM Doors",
  tagline: "Двери, спроектированные как архитектура",
  description:
    "Межкомнатные двери премиум-класса от производителя. Онлайн-конструктор, примерка в интерьере, подбор с ИИ-ассистентом.",
  url: "https://premiumdoors.example",
  phone: "+7 (495) 000-00-00",
  phoneHours: "ежедневно, 9:00–21:00",
  email: "studio@atrium-doors.ru",
  address: "Москва, шоурум на карте",
  whatsapp: "https://wa.me/74950000000",
  telegram: "https://t.me/atrium_doors",
  social: {
    instagram: "#",
    pinterest: "#",
  },
} as const;

export const mainNav = [
  { label: "Каталог", href: "/catalog" },
  { label: "Конструктор", href: "/configurator" },
  { label: "Подбор с ИИ", href: "/podbor" },
  { label: "Интерьеры", href: "/gallery" },
  { label: "Производство", href: "/production" },
  { label: "Контакты", href: "/contacts" },
] as const;

export const footerNav = {
  catalog: [
    { label: "Скрытые двери", href: "/catalog?system=hidden" },
    { label: "Царговые двери", href: "/catalog?system=tsarga" },
    { label: "Остеклённые модели", href: "/catalog?glass=true" },
    { label: "Двери под покраску", href: "/catalog?finish=paint" },
  ],
  company: [
    { label: "О производстве", href: "/production" },
    { label: "Галерея интерьеров", href: "/gallery" },
    { label: "Гарантия и сервис", href: "/production#warranty" },
    { label: "Дилерам", href: "/contacts" },
  ],
  support: [
    { label: "Конструктор online", href: "/configurator" },
    { label: "Подбор с ИИ", href: "/podbor" },
    { label: "Контакты", href: "/contacts" },
  ],
} as const;
