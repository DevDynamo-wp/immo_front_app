import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ListingsContent } from "@/components/listings-content";

export const metadata: Metadata = {
  title: "Annonces immobilieres",
  description: "Parcourez toutes les annonces immobilieres disponibles : vente, location, appartements, maisons et plus.",
};

export default function AnnoncesPage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
        <ListingsContent />
      </main>
      <Footer />
    </>
  );
}
