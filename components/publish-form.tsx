"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { propertyTypes } from "@/lib/data";

const steps = ["Type de bien", "Informations", "Photos", "Validation"];

export function PublishForm() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    transaction: "vente",
    type: "appartement",
    title: "",
    price: "",
    charges: "",
    surface: "",
    rooms: "",
    bedrooms: "",
    address: "",
    city: "",
    postalCode: "",
    description: "",
    floor: "",
    totalFloors: "",
    yearBuilt: "",
    condition: "",
    dpe: "",
    heating: "",
    features: [] as string[],
  });

  function updateForm(field: string, value: string | string[]) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function toggleFeature(feature: string) {
    setForm((prev) => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter((f) => f !== feature)
        : [...prev.features, feature],
    }));
  }

  async function handleSubmit() {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    alert("Annonce soumise avec succes ! Elle sera publiee apres validation.");
    router.push("/dashboard/annonces");
  }

  const featureOptions = [
    "Ascenseur", "Parking", "Cave", "Balcon", "Terrasse", "Jardin",
    "Piscine", "Gardien", "Digicode", "Interphone", "Meuble",
    "Double vitrage", "Cheminee", "Climatisation",
  ];

  return (
    <div>
      {/* Progress steps */}
      <div className="mb-8 flex items-center gap-2">
        {steps.map((s, i) => (
          <div key={s} className="flex flex-1 items-center gap-2">
            <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
              i <= step ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
            }`}>
              {i + 1}
            </div>
            <span className={`hidden text-sm md:block ${i <= step ? "font-medium text-foreground" : "text-muted-foreground"}`}>
              {s}
            </span>
            {i < steps.length - 1 && <div className={`h-0.5 flex-1 ${i < step ? "bg-primary" : "bg-border"}`} />}
          </div>
        ))}
      </div>

      {/* Step 0: Type */}
      {step === 0 && (
        <div className="rounded-xl border border-border bg-card p-6">
          <h2 className="mb-4 text-lg font-semibold text-foreground">Type de transaction</h2>
          <div className="mb-6 grid grid-cols-2 gap-3">
            {["vente", "location"].map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => updateForm("transaction", t)}
                className={`rounded-lg border p-4 text-sm font-medium transition-colors ${
                  form.transaction === t
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-input text-muted-foreground hover:bg-secondary"
                }`}
              >
                {t === "vente" ? "Vente" : "Location"}
              </button>
            ))}
          </div>
          <h2 className="mb-4 text-lg font-semibold text-foreground">Type de bien</h2>
          <div className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-4">
            {propertyTypes.map((pt) => (
              <button
                key={pt.value}
                type="button"
                onClick={() => updateForm("type", pt.value)}
                className={`rounded-lg border p-4 text-sm font-medium transition-colors ${
                  form.type === pt.value
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-input text-muted-foreground hover:bg-secondary"
                }`}
              >
                {pt.label}
              </button>
            ))}
          </div>
          <div className="flex justify-end">
            <button onClick={() => setStep(1)} className="rounded-lg bg-primary px-8 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
              Suivant
            </button>
          </div>
        </div>
      )}

      {/* Step 1: Info */}
      {step === 1 && (
        <div className="rounded-xl border border-border bg-card p-6">
          <h2 className="mb-4 text-lg font-semibold text-foreground">Informations du bien</h2>
          <div className="flex flex-col gap-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">Titre de l{"'"}annonce</label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => updateForm("title", e.target.value)}
                placeholder="Ex: Bel appartement 3 pieces avec balcon"
                className="h-11 w-full rounded-lg border border-input bg-background px-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">
                  {form.transaction === "location" ? "Loyer mensuel" : "Prix de vente"}
                </label>
                <input
                  type="number"
                  value={form.price}
                  onChange={(e) => updateForm("price", e.target.value)}
                  placeholder="0"
                  className="h-11 w-full rounded-lg border border-input bg-background px-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">Surface (m2)</label>
                <input
                  type="number"
                  value={form.surface}
                  onChange={(e) => updateForm("surface", e.target.value)}
                  className="h-11 w-full rounded-lg border border-input bg-background px-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">Nombre de pieces</label>
                <input
                  type="number"
                  value={form.rooms}
                  onChange={(e) => updateForm("rooms", e.target.value)}
                  className="h-11 w-full rounded-lg border border-input bg-background px-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">Chambres</label>
                <input
                  type="number"
                  value={form.bedrooms}
                  onChange={(e) => updateForm("bedrooms", e.target.value)}
                  className="h-11 w-full rounded-lg border border-input bg-background px-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">DPE</label>
                <select
                  value={form.dpe}
                  onChange={(e) => updateForm("dpe", e.target.value)}
                  className="h-11 w-full rounded-lg border border-input bg-background px-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="">Selectionner</option>
                  {["A", "B", "C", "D", "E", "F", "G"].map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">Etat</label>
                <select
                  value={form.condition}
                  onChange={(e) => updateForm("condition", e.target.value)}
                  className="h-11 w-full rounded-lg border border-input bg-background px-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="">Selectionner</option>
                  <option value="neuf">Neuf</option>
                  <option value="renove">Renove</option>
                  <option value="bon-etat">Bon etat</option>
                  <option value="a-renover">A renover</option>
                </select>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">Adresse</label>
                <input
                  type="text"
                  value={form.address}
                  onChange={(e) => updateForm("address", e.target.value)}
                  className="h-11 w-full rounded-lg border border-input bg-background px-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">Ville</label>
                <input
                  type="text"
                  value={form.city}
                  onChange={(e) => updateForm("city", e.target.value)}
                  className="h-11 w-full rounded-lg border border-input bg-background px-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">Code postal</label>
                <input
                  type="text"
                  value={form.postalCode}
                  onChange={(e) => updateForm("postalCode", e.target.value)}
                  className="h-11 w-full rounded-lg border border-input bg-background px-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">Description</label>
              <textarea
                value={form.description}
                onChange={(e) => updateForm("description", e.target.value)}
                rows={4}
                placeholder="Decrivez votre bien en detail..."
                className="w-full rounded-lg border border-input bg-background p-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">Equipements</label>
              <div className="flex flex-wrap gap-2">
                {featureOptions.map((f) => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => toggleFeature(f)}
                    className={`rounded-full border px-3 py-1.5 text-sm transition-colors ${
                      form.features.includes(f)
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-input text-muted-foreground hover:bg-secondary"
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-6 flex justify-between">
            <button onClick={() => setStep(0)} className="rounded-lg border border-border px-6 py-2.5 text-sm font-medium text-foreground hover:bg-secondary">
              Precedent
            </button>
            <button onClick={() => setStep(2)} className="rounded-lg bg-primary px-8 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
              Suivant
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Photos */}
      {step === 2 && (
        <div className="rounded-xl border border-border bg-card p-6">
          <h2 className="mb-4 text-lg font-semibold text-foreground">Photos du bien</h2>
          <p className="mb-4 text-sm text-muted-foreground">Ajoutez entre 3 et 20 photos de votre bien. La premiere photo sera utilisee comme image principale.</p>
          <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="flex aspect-[4/3] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-secondary/50 text-muted-foreground transition-colors hover:border-primary hover:bg-primary/5"
              >
                <svg className="mb-2 h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                <span className="text-xs">Ajouter une photo</span>
              </div>
            ))}
          </div>
          <div className="flex justify-between">
            <button onClick={() => setStep(1)} className="rounded-lg border border-border px-6 py-2.5 text-sm font-medium text-foreground hover:bg-secondary">
              Precedent
            </button>
            <button onClick={() => setStep(3)} className="rounded-lg bg-primary px-8 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
              Suivant
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Validation */}
      {step === 3 && (
        <div className="rounded-xl border border-border bg-card p-6">
          <h2 className="mb-4 text-lg font-semibold text-foreground">Verification et publication</h2>
          <p className="mb-6 text-sm text-muted-foreground">
            Verifiez les informations de votre annonce avant de la soumettre. Elle sera publiee apres validation par notre equipe (sous 24h).
          </p>

          <div className="mb-6 rounded-lg bg-secondary/50 p-4">
            <h3 className="mb-2 font-medium text-foreground">{form.title || "Titre non renseigne"}</h3>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
              <span>{form.transaction === "vente" ? "Vente" : "Location"}</span>
              <span>{form.type}</span>
              {form.price && <span>{form.price} EUR{form.transaction === "location" ? "/mois" : ""}</span>}
              {form.surface && <span>{form.surface} m2</span>}
              {form.rooms && <span>{form.rooms} pieces</span>}
              {form.city && <span>{form.city} {form.postalCode}</span>}
            </div>
            {form.features.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1">
                {form.features.map((f) => (
                  <span key={f} className="rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">{f}</span>
                ))}
              </div>
            )}
          </div>

          <div className="mb-6 rounded-lg border border-border bg-primary/5 p-4">
            <p className="text-sm text-foreground">
              En publiant cette annonce, vous confirmez que les informations fournies sont exactes et que vous disposez des droits necessaires pour publier ce bien.
            </p>
          </div>

          <div className="flex justify-between">
            <button onClick={() => setStep(2)} className="rounded-lg border border-border px-6 py-2.5 text-sm font-medium text-foreground hover:bg-secondary">
              Precedent
            </button>
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="rounded-lg bg-primary px-8 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
            >
              {isSubmitting ? "Publication en cours..." : "Publier l'annonce"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
