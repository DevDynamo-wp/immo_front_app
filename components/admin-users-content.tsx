"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  SearchIcon, UsersIcon, UserIcon, MailIcon, MapPinIcon,
  CalendarIcon, BanIcon, CheckCircleIcon, ClockIcon, EditIcon,
  MoreVerticalIcon,
} from "./icons";
import { adminUsers, type UserRole, type UserStatus } from "@/lib/admin-data";

const roleLabels: Record<UserRole, string> = {
  particulier: "Particulier",
  professionnel: "Professionnel",
  agent: "Agent",
  admin: "Admin",
};

const roleColors: Record<UserRole, string> = {
  particulier: "bg-blue-100 text-blue-700",
  professionnel: "bg-purple-100 text-purple-700",
  agent: "bg-primary/10 text-primary",
  admin: "bg-foreground text-background",
};

const statusColors: Record<UserStatus, string> = {
  actif: "bg-green-100 text-green-700",
  suspendu: "bg-red-100 text-red-700",
  "en-attente": "bg-amber-100 text-amber-700",
};

const statusLabels: Record<UserStatus, string> = {
  actif: "Actif",
  suspendu: "Suspendu",
  "en-attente": "En attente",
};

const filterTabs: { value: string; label: string }[] = [
  { value: "all", label: "Tous" },
  { value: "actif", label: "Actifs" },
  { value: "en-attente", label: "En attente" },
  { value: "suspendu", label: "Suspendus" },
];

export function AdminUsersContent() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [roleFilter, setRoleFilter] = useState("all");
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  const filtered = adminUsers.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.city.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || u.status === statusFilter;
    const matchesRole = roleFilter === "all" || u.role === roleFilter;
    return matchesSearch && matchesStatus && matchesRole;
  });

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Utilisateurs</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Gerez les {adminUsers.length} utilisateurs de la plateforme
        </p>
      </div>

      {/* Stats Row */}
      <div className="mb-6 grid gap-3 sm:grid-cols-4">
        {[
          { label: "Total", value: adminUsers.length, icon: UsersIcon, bg: "bg-primary/10", color: "text-primary" },
          { label: "Actifs", value: adminUsers.filter((u) => u.status === "actif").length, icon: CheckCircleIcon, bg: "bg-green-50", color: "text-green-600" },
          { label: "En attente", value: adminUsers.filter((u) => u.status === "en-attente").length, icon: ClockIcon, bg: "bg-amber-50", color: "text-amber-600" },
          { label: "Suspendus", value: adminUsers.filter((u) => u.status === "suspendu").length, icon: BanIcon, bg: "bg-red-50", color: "text-red-500" },
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
        {/* Search */}
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Rechercher un utilisateur..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-input bg-background py-2.5 pl-10 pr-4 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
          />
        </div>

        {/* Status tabs */}
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

        {/* Role filter */}
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="rounded-lg border border-input bg-background px-3 py-2.5 text-sm text-foreground outline-none focus:border-primary"
        >
          <option value="all">Tous les roles</option>
          <option value="particulier">Particulier</option>
          <option value="professionnel">Professionnel</option>
          <option value="agent">Agent</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/40">
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Utilisateur</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Role</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Statut</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Ville</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Annonces</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Inscription</th>
                <th className="px-4 py-3 text-right font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((user) => (
                <tr key={user.id} className="transition-colors hover:bg-secondary/30">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10">
                        <UserIcon className="h-4 w-4 text-primary" />
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-foreground">{user.name}</p>
                        <p className="truncate text-xs text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${roleColors[user.role]}`}>
                      {roleLabels[user.role]}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColors[user.status]}`}>
                      {statusLabels[user.status]}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPinIcon className="h-3.5 w-3.5" />
                      {user.city}
                    </div>
                  </td>
                  <td className="px-4 py-3 font-medium text-foreground">{user.listingsCount}</td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {new Date(user.createdAt).toLocaleDateString("fr-FR")}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="relative inline-block">
                      <button
                        onClick={() => setSelectedUser(selectedUser === user.id ? null : user.id)}
                        className="rounded-lg p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground"
                        aria-label="Actions"
                      >
                        <MoreVerticalIcon className="h-4 w-4" />
                      </button>
                      {selectedUser === user.id && (
                        <div className="absolute right-0 top-full z-10 mt-1 w-44 rounded-lg border border-border bg-card py-1 shadow-lg">
                          <button className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-foreground hover:bg-secondary">
                            <UserIcon className="h-3.5 w-3.5" />
                            Voir le profil
                          </button>
                          <button className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-foreground hover:bg-secondary">
                            <EditIcon className="h-3.5 w-3.5" />
                            Modifier
                          </button>
                          <button className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-foreground hover:bg-secondary">
                            <MailIcon className="h-3.5 w-3.5" />
                            Envoyer un message
                          </button>
                          <hr className="my-1 border-border" />
                          {user.status === "suspendu" ? (
                            <button className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-green-600 hover:bg-secondary">
                              <CheckCircleIcon className="h-3.5 w-3.5" />
                              Reactiver
                            </button>
                          ) : (
                            <button className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-destructive hover:bg-secondary">
                              <BanIcon className="h-3.5 w-3.5" />
                              Suspendre
                            </button>
                          )}
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
            Aucun utilisateur ne correspond a vos criteres.
          </div>
        )}
      </div>

      {/* Pagination placeholder */}
      <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
        <p>{filtered.length} utilisateur(s) affiche(s)</p>
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
