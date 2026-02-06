"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { properties, propertyTypes } from "@/lib/data";
import type { PropertyType, TransactionType } from "@/lib/data";
import { PropertyCard } from "./property-card";
import { SearchIcon, FilterIcon, GridIcon, ListIcon, XIcon } from "./icons";

export function ListingsContent() {
  const searchParams = useSearchParams();

  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [transaction, setTransaction] = useState<TransactionType | "">(
    (searchParams.get("transaction") as TransactionType) || ""
  );
  const [type, setType] = useState<PropertyType | "">(
    (searchParams.get("type") as PropertyType) || ""
  );
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [surfaceMin, setSurfaceMin] = useState("");
  const [roomsMin, setRoomsMin] = useState("");
  const [sortBy, setSortBy] = useState<string>("date");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let results = [...properties];

    if (query) {
      const q = query.toLowerCase();
      results = results.filter(
        (p) =>
          p.city.toLowerCase().includes(q) ||
          p.postalCode.includes(q) ||
          p.title.toLowerCase().includes(q) ||
          p.address.toLowerCase().includes(q)
      );
    }

    if (transaction) {
      results = results.filter((p) => p.transaction === transaction);
    }

    if (type) {
      results = results.filter((p) => p.type === type);
    }

    if (priceMin) {
      results = results.filter((p) => p.price >= Number(priceMin));
    }
    if (priceMax) {
      results = results.filter((p) => p.price <= Number(priceMax));
    }
    if (surfaceMin) {
      results = results.filter((p) => p.surface >= Number(surfaceMin));
    }
    if (roomsMin) {
      results = results.filter((p) => p.rooms >= Number(roomsMin));
    }

    // Sort
    switch (sortBy) {
      case "price-asc":
        results.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        results.sort((a, b) => b.price - a.price);
        break;
      case "surface":
        results.sort((a, b) => b.surface - a.surface);
        break;
      case "date":
      default:
        results.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
    }

    return results;
  }, [query, transaction, type, priceMin, priceMax, surfaceMin, roomsMin, sortBy]);

  const activeFiltersCount = [transaction, type, priceMin, priceMax, surfaceMin, roomsMin].filter(Boolean).length;

  function clearFilters() {
    setTransaction("");
    setType("");
    setPriceMin("");
    setPriceMax("");
    setSurfaceMin("");
    setRoomsMin("");
  }

  return (
    <div>
      {/* Search bar and controls */}
      <div className="mb-6">
        <h1 className="mb-4 text-2xl font-bold text-foreground md:text-3xl">Annonces immobilieres</h1>
        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ville, code postal, quartier..."
              className="h-11 w-full rounded-lg border border-input bg-background pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex h-11 items-center gap-2 rounded-lg border px-4 text-sm font-medium transition-colors ${
                showFilters || activeFiltersCount > 0
                  ? "border-primary bg-primary/5 text-primary"
                  : "border-input text-foreground hover:bg-secondary"
              }`}
            >
              <FilterIcon className="h-4 w-4" />
              Filtres
              {activeFiltersCount > 0 && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                  {activeFiltersCount}
                </span>
              )}
            </button>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="h-11 rounded-lg border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="date">Plus recentes</option>
              <option value="price-asc">Prix croissant</option>
              <option value="price-desc">Prix decroissant</option>
              <option value="surface">Surface</option>
            </select>
          </div>
        </div>
      </div>

      {/* Filters panel */}
      {showFilters && (
        <div className="mb-6 rounded-xl border border-border bg-card p-4 md:p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-semibold text-foreground">Filtres avances</h3>
            {activeFiltersCount > 0 && (
              <button onClick={clearFilters} className="flex items-center gap-1 text-sm text-primary hover:underline">
                <XIcon className="h-3.5 w-3.5" />
                Effacer les filtres
              </button>
            )}
          </div>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Transaction</label>
              <select
                value={transaction}
                onChange={(e) => setTransaction(e.target.value as TransactionType | "")}
                className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="">Tout</option>
                <option value="vente">Vente</option>
                <option value="location">Location</option>
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Type de bien</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as PropertyType | "")}
                className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="">Tout</option>
                {propertyTypes.map((pt) => (
                  <option key={pt.value} value={pt.value}>{pt.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Prix minimum</label>
              <input
                type="number"
                value={priceMin}
                onChange={(e) => setPriceMin(e.target.value)}
                placeholder="0"
                className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Prix maximum</label>
              <input
                type="number"
                value={priceMax}
                onChange={(e) => setPriceMax(e.target.value)}
                placeholder="Illimite"
                className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Surface min (m2)</label>
              <input
                type="number"
                value={surfaceMin}
                onChange={(e) => setSurfaceMin(e.target.value)}
                placeholder="0"
                className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Pieces min</label>
              <select
                value={roomsMin}
                onChange={(e) => setRoomsMin(e.target.value)}
                className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="">Tout</option>
                <option value="1">1+</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
                <option value="4">4+</option>
                <option value="5">5+</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Results count */}
      <div className="mb-4">
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">{filtered.length}</span> annonce{filtered.length !== 1 ? "s" : ""} trouvee{filtered.length !== 1 ? "s" : ""}
        </p>
      </div>

      {/* Results grid */}
      {filtered.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-card py-20 text-center">
          <SearchIcon className="mb-4 h-12 w-12 text-muted-foreground/50" />
          <h3 className="mb-2 text-lg font-semibold text-foreground">Aucune annonce trouvee</h3>
          <p className="mb-4 max-w-sm text-sm text-muted-foreground">
            Essayez de modifier vos criteres de recherche ou de supprimer certains filtres.
          </p>
          <button
            onClick={clearFilters}
            className="rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Effacer les filtres
          </button>
        </div>
      )}
    </div>
  );
}
