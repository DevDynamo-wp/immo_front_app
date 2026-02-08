"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { formatPrice, formatArea } from "@/lib/utils";
import {
  SearchIcon, BuildingIcon, EyeIcon, MapPinIcon, CheckCircleIcon,
  ClockIcon, XCircleIcon, AlertTriangleIcon, MoreVerticalIcon,
  TrashIcon, BanIcon, EditIcon,
} from "./icons";
import { adminListings, type ListingStatus } from "@/lib/admin-data";

const statusConfig: Record<ListingStatus, { label: string; class: string }> = {
  active: { label: "Active", class: "bg-green-100 text-green-700" },
  "en-attente": { label: "En attente", class: "bg-amber-100 text-amber-700" },
  rejetee: { label: "Rejetee", class: "bg-red-100 text-red-700" },
  expiree: { label: "Expiree", class: "bg-muted text-muted-foreground" },
};

const filterTabs: { value: string; label: string }[] = [
  { value: "all", label: "Toutes" },
  { value: "active", label: "Actives" },
  { value: "en-attente", label: "En attente" },
  { value: "rejetee", label: "Rejetees" },
  { value: "expiree", label: "Expirees" },
];

export function AdminListingsContent() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const filtered = adminListings.filter((l) => {
    const matchesSearch =
      l.title.toLowerCase().includes(search.toLowerCase()) ||
      l.owner.toLowerCase().includes(search.toLowerCase()) ||
      l.city.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || l.status === statusFilter;
    const matchesType = typeFilter === "all" || l.type.toLowerCase() === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Annonces</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Gerez les {adminListings.length} annonces de la plateforme
        </p>
      </div>

      {/* Stats */}
      <div className="mb-6 grid gap-3 sm:grid-cols-4">
        {[
          { label: "Actives", value: adminListings.filter((l) => l.status === "active").length, icon: CheckCircleIcon, bg: "bg-green-50", color: "text-green-600" },
          { label: "En attente", value: adminListings.filter((l) => l.status === "en-attente").length, icon: ClockIcon, bg: "bg-amber-50", color: "text-amber-600" },
          { label: "Rejetees", value: adminListings.filter((l) => l.status === "rejetee").length, icon: XCircleIcon, bg: "bg-red-50", color: "text-red-500" },
          { label: "Signalees", value: adminListings.filter((l) => l.reports > 0).length, icon: AlertTriangleIcon, bg: "bg-orange-50", color: "text-orange-500" },
        ].map((stat) => (
          <div key={stat.label} className="flex items-center gap-3 rounded-xl border border-border bg-card p-4">
            <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${stat.bg}`}>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </div>
            <div>
              <p className="text-xl font-bold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Rechercher une annonce, proprietaire, ville..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-input bg-background py-2.5 pl-10 pr-4 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
          />
        </div>

        <div className="flex gap-1 rounded-lg bg-secondary/70 p-1">
          {filterTabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setStatusFilter(tab.value)}
              className={cn(
                "rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
                statusFilter === tab.value
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="rounded-lg border border-input bg-background px-3 py-2.5 text-sm text-foreground outline-none focus:border-primary"
        >
          <option value="all">Tous types</option>
          <option value="appartement">Appartement</option>
          <option value="maison">Maison</option>
          <option value="terrain">Terrain</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/40">
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Annonce</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Proprietaire</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Prix</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Statut</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Vues</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Signalements</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Date</th>
                <th className="px-4 py-3 text-right font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((listing) => (
                <tr key={listing.id} className="transition-colors hover:bg-secondary/30">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-16 shrink-0 overflow-hidden rounded-lg bg-muted">
                        <img src={listing.image} alt="" className="h-full w-full object-cover" />
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-foreground">{listing.title}</p>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <MapPinIcon className="h-3 w-3" />
                          {listing.city} - {listing.type} - {formatArea(listing.surface)}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-sm text-foreground">{listing.owner}</p>
                    <p className="text-xs text-muted-foreground">{listing.ownerEmail}</p>
                  </td>
                  <td className="px-4 py-3 font-semibold text-foreground">
                    {formatPrice(listing.price)}
                    {listing.transaction === "Location" && (
                      <span className="font-normal text-muted-foreground">/mois</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${statusConfig[listing.status].class}`}>
                      {statusConfig[listing.status].label}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <EyeIcon className="h-3.5 w-3.5" />
                      {listing.views}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    {listing.reports > 0 ? (
                      <span className="flex items-center gap-1 text-red-500">
                        <AlertTriangleIcon className="h-3.5 w-3.5" />
                        {listing.reports}
                      </span>
                    ) : (
                      <span className="text-muted-foreground">0</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {new Date(listing.createdAt).toLocaleDateString("fr-FR")}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="relative inline-block">
                      <button
                        onClick={() => setOpenMenu(openMenu === listing.id ? null : listing.id)}
                        className="rounded-lg p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground"
                        aria-label="Actions"
                      >
                        <MoreVerticalIcon className="h-4 w-4" />
                      </button>
                      {openMenu === listing.id && (
                        <div className="absolute right-0 top-full z-10 mt-1 w-44 rounded-lg border border-border bg-card py-1 shadow-lg">
                          <button className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-foreground hover:bg-secondary">
                            <EyeIcon className="h-3.5 w-3.5" />
                            Voir l{"'"}annonce
                          </button>
                          <button className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-foreground hover:bg-secondary">
                            <EditIcon className="h-3.5 w-3.5" />
                            Modifier
                          </button>
                          {listing.status === "en-attente" && (
                            <>
                              <button className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-green-600 hover:bg-secondary">
                                <CheckCircleIcon className="h-3.5 w-3.5" />
                                Approuver
                              </button>
                              <button className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-red-500 hover:bg-secondary">
                                <XCircleIcon className="h-3.5 w-3.5" />
                                Rejeter
                              </button>
                            </>
                          )}
                          {listing.status === "active" && (
                            <button className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-amber-600 hover:bg-secondary">
                              <BanIcon className="h-3.5 w-3.5" />
                              Desactiver
                            </button>
                          )}
                          <hr className="my-1 border-border" />
                          <button className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-destructive hover:bg-secondary">
                            <TrashIcon className="h-3.5 w-3.5" />
                            Supprimer
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="py-12 text-center text-sm text-muted-foreground">
            Aucune annonce ne correspond a vos criteres.
          </div>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
        <p>{filtered.length} annonce(s) affichee(s)</p>
        <div className="flex gap-1">
          <button className="rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground hover:bg-secondary">
            Precedent
          </button>
          <button className="rounded-lg border border-primary bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground">
            1
          </button>
          <button className="rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground hover:bg-secondary">
            Suivant
          </button>
        </div>
      </div>
    </div>
  );
}
