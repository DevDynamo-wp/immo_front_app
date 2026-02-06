import type { Metadata } from "next";
import { properties } from "@/lib/data";
import { PropertyCard } from "@/components/property-card";
import { HeartIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Mes favoris",
};

export default function FavorisPage() {
  // Simulate user favorites
  const favoriteProperties = properties.slice(0, 4);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Mes favoris</h1>
        <p className="mt-1 text-sm text-muted-foreground">{favoriteProperties.length} bien(s) sauvegarde(s)</p>
      </div>

      {favoriteProperties.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2">
          {favoriteProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-card py-20 text-center">
          <HeartIcon className="mb-4 h-12 w-12 text-muted-foreground/50" />
          <h3 className="mb-2 text-lg font-semibold text-foreground">Aucun favori</h3>
          <p className="max-w-sm text-sm text-muted-foreground">
            Parcourez les annonces et cliquez sur le coeur pour sauvegarder vos biens preferes.
          </p>
        </div>
      )}
    </div>
  );
}
