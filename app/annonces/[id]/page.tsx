import { notFound } from "next/navigation";
import { properties } from "@/lib/data";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { PropertyDetail } from "@/components/property-detail";
import type { Metadata } from "next";

export function generateStaticParams() {
  return properties.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const property = properties.find((p) => p.id === id);
  if (!property) return { title: "Annonce introuvable" };
  return {
    title: property.title,
    description: property.description.slice(0, 160),
  };
}

export default async function PropertyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const property = properties.find((p) => p.id === id);

  if (!property) {
    notFound();
  }

  const similarProperties = properties
    .filter((p) => p.id !== property.id && (p.city === property.city || p.type === property.type))
    .slice(0, 3);

  return (
    <>
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
        <PropertyDetail property={property} similarProperties={similarProperties} />
      </main>
      <Footer />
    </>
  );
}
