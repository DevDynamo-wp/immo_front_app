"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function RegisterForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    accountType: "particulier",
    acceptTerms: false,
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert("Les mots de passe ne correspondent pas.");
      return;
    }
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
    router.push("/dashboard");
  }

  function updateForm(field: string, value: string | boolean) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {/* Account type */}
      <div>
        <label className="mb-1.5 block text-sm font-medium text-foreground">Type de compte</label>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => updateForm("accountType", "particulier")}
            className={`rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors ${
              form.accountType === "particulier"
                ? "border-primary bg-primary/5 text-primary"
                : "border-input text-muted-foreground hover:bg-secondary"
            }`}
          >
            Particulier
          </button>
          <button
            type="button"
            onClick={() => updateForm("accountType", "professionnel")}
            className={`rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors ${
              form.accountType === "professionnel"
                ? "border-primary bg-primary/5 text-primary"
                : "border-input text-muted-foreground hover:bg-secondary"
            }`}
          >
            Professionnel
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="firstName" className="mb-1.5 block text-sm font-medium text-foreground">Prenom</label>
          <input
            id="firstName"
            type="text"
            value={form.firstName}
            onChange={(e) => updateForm("firstName", e.target.value)}
            required
            className="h-11 w-full rounded-lg border border-input bg-background px-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <div>
          <label htmlFor="lastName" className="mb-1.5 block text-sm font-medium text-foreground">Nom</label>
          <input
            id="lastName"
            type="text"
            value={form.lastName}
            onChange={(e) => updateForm("lastName", e.target.value)}
            required
            className="h-11 w-full rounded-lg border border-input bg-background px-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      </div>

      <div>
        <label htmlFor="reg-email" className="mb-1.5 block text-sm font-medium text-foreground">Adresse email</label>
        <input
          id="reg-email"
          type="email"
          value={form.email}
          onChange={(e) => updateForm("email", e.target.value)}
          placeholder="vous@exemple.com"
          required
          className="h-11 w-full rounded-lg border border-input bg-background px-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      <div>
        <label htmlFor="reg-password" className="mb-1.5 block text-sm font-medium text-foreground">Mot de passe</label>
        <input
          id="reg-password"
          type="password"
          value={form.password}
          onChange={(e) => updateForm("password", e.target.value)}
          placeholder="Min. 8 caracteres"
          required
          minLength={8}
          className="h-11 w-full rounded-lg border border-input bg-background px-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      <div>
        <label htmlFor="confirm-password" className="mb-1.5 block text-sm font-medium text-foreground">Confirmer le mot de passe</label>
        <input
          id="confirm-password"
          type="password"
          value={form.confirmPassword}
          onChange={(e) => updateForm("confirmPassword", e.target.value)}
          required
          minLength={8}
          className="h-11 w-full rounded-lg border border-input bg-background px-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      <div className="flex items-start gap-2">
        <input
          id="terms"
          type="checkbox"
          checked={form.acceptTerms}
          onChange={(e) => updateForm("acceptTerms", e.target.checked)}
          required
          className="mt-1 h-4 w-4 rounded border-border accent-primary"
        />
        <label htmlFor="terms" className="text-sm text-muted-foreground">
          {"J'accepte les "}
          <a href="#" className="text-primary hover:underline">{"conditions generales d'utilisation"}</a>
          {" et la "}
          <a href="#" className="text-primary hover:underline">politique de confidentialite</a>
        </label>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="flex h-11 items-center justify-center rounded-lg bg-primary text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
      >
        {isLoading ? "Creation en cours..." : "Creer mon compte"}
      </button>
    </form>
  );
}
