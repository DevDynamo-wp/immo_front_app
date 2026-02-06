import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { PublishForm } from "@/components/publish-form";

export const metadata: Metadata = {
  title: "Deposer une annonce",
  description: "Publiez votre annonce immobiliere gratuitement sur ImmoMarket.",
};

export default function PublierPage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-3xl px-4 py-8 lg:px-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground md:text-3xl">Deposer une annonce</h1>
          <p className="mt-2 text-muted-foreground">
            Remplissez les informations ci-dessous pour publier votre bien sur ImmoMarket.
          </p>
        </div>
        <PublishForm />
      </main>
      <Footer />
    </>
  );
}
