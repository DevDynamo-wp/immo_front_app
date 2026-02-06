import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { RegisterForm } from "@/components/register-form";
import { HomeIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Inscription",
  description: "Creez votre compte ImmoMarket pour publier des annonces et sauvegarder vos favoris.",
};

export default function InscriptionPage() {
  return (
    <>
      <Header />
      <main className="flex min-h-[calc(100vh-200px)] items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary">
              <HomeIcon className="h-6 w-6 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">Creer un compte</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Rejoignez ImmoMarket pour acceder a toutes les fonctionnalites
            </p>
          </div>

          <RegisterForm />

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Vous avez deja un compte ?{" "}
            <Link href="/connexion" className="font-medium text-primary hover:underline">
              Se connecter
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
