import { siteConfig } from "@/config/site";
import type { DoorModel } from "@/types/door";

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: siteConfig.fullName,
    url: siteConfig.url,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    description: siteConfig.description,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Москва",
      addressCountry: "RU",
    },
    sameAs: [siteConfig.social.instagram, siteConfig.social.pinterest].filter(
      (x) => x && x !== "#"
    ),
  };
}

export function productJsonLd(door: DoorModel, url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: door.name,
    description: door.description,
    image: `${siteConfig.url}/og-image.png`,
    sku: door.slug,
    brand: { "@type": "Brand", name: siteConfig.fullName },
    offers: {
      "@type": "Offer",
      url,
      priceCurrency: "RUB",
      price: door.basePrice,
      availability: "https://schema.org/InStock",
    },
    aggregateRating: door.reviewsCount
      ? {
          "@type": "AggregateRating",
          ratingValue: door.rating,
          reviewCount: door.reviewsCount,
        }
      : undefined,
  };
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
