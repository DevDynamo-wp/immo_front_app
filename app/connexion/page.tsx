import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { LoginForm } from "@/components/login-form";
import { HomeIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Connexion",
  description: "Connectez-vous a votre compte ImmoMarket pour gerer vos annonces et favoris.",
};

export default function ConnexionPage() {
  return (
    <>
      <Header />
      <main className="flex min-h-[calc(100vh-200px)] items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary">
              <HomeIcon className="h-6 w-6 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">Connexion</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Connectez-vous a votre compte ImmoMarket
            </p>
          </div>

          <LoginForm />

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Pas encore de compte ?{" "}
            <Link href="/inscription" className="font-medium text-primary hover:underline">
              Creer un compte
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
