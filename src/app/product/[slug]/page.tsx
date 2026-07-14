import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { ProductView } from "@/features/product/ProductView";
import { DOORS, getDoorBySlug } from "@/data/doors";
import { productJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { siteConfig } from "@/config/site";
import { formatPrice } from "@/lib/utils";

export function generateStaticParams() {
  return DOORS.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const door = getDoorBySlug(slug);
  if (!door) return {};

  const title = `${door.name} — ${door.shortDescription}`;
  const description = `${door.description} Цена от ${formatPrice(door.basePrice)}.`;

  return {
    title,
    description,
    alternates: { canonical: `/product/${door.slug}` },
    openGraph: { title, description, url: `${siteConfig.url}/product/${door.slug}` },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const door = getDoorBySlug(slug);
  if (!door) notFound();

  const url = `${siteConfig.url}/product/${door.slug}`;

  return (
    <div className="py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd(door, url)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Главная", url: siteConfig.url },
              { name: "Каталог", url: `${siteConfig.url}/catalog` },
              { name: door.name, url },
            ])
          ),
        }}
      />
      <Container>
        <ProductView door={door} />
      </Container>
    </div>
  );
}
