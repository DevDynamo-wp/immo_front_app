"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SearchIcon } from "./icons";

export function HeroSearch() {
  const router = useRouter();
  const [transaction, setTransaction] = useState<"vente" | "location">("vente");
  const [query, setQuery] = useState("");
  const [propertyType, setPropertyType] = useState("");

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    params.set("transaction", transaction);
    if (query) params.set("q", query);
    if (propertyType) params.set("type", propertyType);
    router.push(`/annonces?${params.toString()}`);
  }

  return (
    <div className="w-full max-w-3xl">
      {/* Transaction tabs */}
      <div className="mb-4 flex gap-2">
        <button
          onClick={() => setTransaction("vente")}
          className={`rounded-lg px-6 py-2.5 text-sm font-semibold transition-colors ${
            transaction === "vente"
              ? "bg-primary text-primary-foreground"
              : "bg-background/20 text-background hover:bg-background/30"
          }`}
        >
          Acheter
        </button>
        <button
          onClick={() => setTransaction("location")}
          className={`rounded-lg px-6 py-2.5 text-sm font-semibold transition-colors ${
            transaction === "location"
              ? "bg-primary text-primary-foreground"
              : "bg-background/20 text-background hover:bg-background/30"
          }`}
        >
          Louer
        </button>
      </div>

      {/* Search form */}
      <form onSubmit={handleSearch} className="flex flex-col gap-3 rounded-xl bg-background p-3 shadow-2xl md:flex-row md:items-center">
        <div className="flex-1">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ville, code postal, quartier..."
            className="h-12 w-full rounded-lg bg-secondary px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div className="md:w-48">
          <select
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
            className="h-12 w-full rounded-lg bg-secondary px-4 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">Type de bien</option>
            <option value="appartement">Appartement</option>
            <option value="maison">Maison</option>
            <option value="terrain">Terrain</option>
            <option value="local-commercial">Local commercial</option>
          </select>
        </div>
        <button
          type="submit"
          className="flex h-12 items-center justify-center gap-2 rounded-lg bg-primary px-8 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          <SearchIcon className="h-4 w-4" />
          <span>Rechercher</span>
        </button>
      </form>
    </div>
  );
}
