"use client";

import { useState } from "react";
import { UserIcon } from "./icons";

export function ProfileForm() {
  const [form, setForm] = useState({
    firstName: "Marie",
    lastName: "Dupont",
    email: "marie.dupont@exemple.com",
    phone: "06 12 34 56 78",
    bio: "Particulier a la recherche de biens immobiliers sur Paris et sa region.",
  });
  const [isSaving, setIsSaving] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSaving(false);
    alert("Profil mis a jour avec succes !");
  }

  function updateForm(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  return (
    <div className="max-w-2xl">
      {/* Avatar */}
      <div className="mb-8 flex items-center gap-4 rounded-xl border border-border bg-card p-6">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
          <UserIcon className="h-10 w-10 text-primary" />
        </div>
        <div>
          <p className="font-semibold text-foreground">{form.firstName} {form.lastName}</p>
          <p className="text-sm text-muted-foreground">Compte Particulier</p>
          <button className="mt-2 text-sm font-medium text-primary hover:underline">
            Changer la photo
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6 rounded-xl border border-border bg-card p-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="prof-first" className="mb-1.5 block text-sm font-medium text-foreground">Prenom</label>
            <input
              id="prof-first"
              type="text"
              value={form.firstName}
              onChange={(e) => updateForm("firstName", e.target.value)}
              className="h-11 w-full rounded-lg border border-input bg-background px-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div>
            <label htmlFor="prof-last" className="mb-1.5 block text-sm font-medium text-foreground">Nom</label>
            <input
              id="prof-last"
              type="text"
              value={form.lastName}
              onChange={(e) => updateForm("lastName", e.target.value)}
              className="h-11 w-full rounded-lg border border-input bg-background px-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        </div>

        <div>
          <label htmlFor="prof-email" className="mb-1.5 block text-sm font-medium text-foreground">Adresse email</label>
          <input
            id="prof-email"
            type="email"
            value={form.email}
            onChange={(e) => updateForm("email", e.target.value)}
            className="h-11 w-full rounded-lg border border-input bg-background px-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        <div>
          <label htmlFor="prof-phone" className="mb-1.5 block text-sm font-medium text-foreground">Telephone</label>
          <input
            id="prof-phone"
            type="tel"
            value={form.phone}
            onChange={(e) => updateForm("phone", e.target.value)}
            className="h-11 w-full rounded-lg border border-input bg-background px-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        <div>
          <label htmlFor="prof-bio" className="mb-1.5 block text-sm font-medium text-foreground">Bio</label>
          <textarea
            id="prof-bio"
            value={form.bio}
            onChange={(e) => updateForm("bio", e.target.value)}
            rows={3}
            className="w-full rounded-lg border border-input bg-background p-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSaving}
            className="rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
          >
            {isSaving ? "Enregistrement..." : "Enregistrer les modifications"}
          </button>
        </div>
      </form>
    </div>
  );
}
