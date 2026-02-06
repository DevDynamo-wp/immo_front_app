import type { Metadata } from "next";
import Link from "next/link";
import { properties } from "@/lib/data";
import { formatPrice, formatArea } from "@/lib/utils";
import { PlusIcon, EyeIcon, MapPinIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Mes annonces",
};

const statuses = [
  { label: "Active", class: "bg-green-100 text-green-700" },
  { label: "Active", class: "bg-green-100 text-green-700" },
  { label: "En attente", class: "bg-yellow-100 text-yellow-700" },
];

export default function MesAnnoncesPage() {
  const userProperties = properties.slice(0, 3);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Mes annonces</h1>
          <p className="mt-1 text-sm text-muted-foreground">{userProperties.length} annonce(s) au total</p>
        </div>
        <Link
          href="/publier"
          className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
        >
          <PlusIcon className="h-4 w-4" />
          Nouvelle annonce
        </Link>
      </div>

      {/* Listings table */}
      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/50">
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Bien</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Prix</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Statut</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Vues</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Date</th>
                <th className="px-4 py-3 text-right font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {userProperties.map((prop, i) => (
                <tr key={prop.id} className="transition-colors hover:bg-secondary/30">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-16 shrink-0 overflow-hidden rounded-lg bg-muted">
                        <img src={prop.images[0]} alt="" className="h-full w-full object-cover" />
                      </div>
                      <div className="min-w-0">
                        <p className="truncate font-medium text-foreground">{prop.title}</p>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <MapPinIcon className="h-3 w-3" />
                          {prop.city} - {formatArea(prop.surface)}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-semibold text-foreground">
                    {formatPrice(prop.price)}
                    {prop.transaction === "location" && <span className="font-normal text-muted-foreground">/mois</span>}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${statuses[i].class}`}>
                      {statuses[i].label}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <EyeIcon className="h-3.5 w-3.5" />
                      {prop.views}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {new Date(prop.createdAt).toLocaleDateString("fr-FR")}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/annonces/${prop.id}`}
                        className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-foreground hover:bg-secondary"
                      >
                        Voir
                      </Link>
                      <button className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-foreground hover:bg-secondary">
                        Modifier
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
