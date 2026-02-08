"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  AlertTriangleIcon, CheckCircleIcon, ClockIcon, XCircleIcon,
  SearchIcon, EyeIcon, CalendarIcon, UserIcon,
} from "./icons";
import { adminReports, reportReasonLabels, type ReportStatus } from "@/lib/admin-data";

const statusConfig: Record<ReportStatus, { label: string; class: string; icon: typeof CheckCircleIcon }> = {
  nouveau: { label: "Nouveau", class: "bg-red-100 text-red-700", icon: AlertTriangleIcon },
  "en-cours": { label: "En cours", class: "bg-amber-100 text-amber-700", icon: ClockIcon },
  resolu: { label: "Resolu", class: "bg-green-100 text-green-700", icon: CheckCircleIcon },
  rejete: { label: "Rejete", class: "bg-muted text-muted-foreground", icon: XCircleIcon },
};

const filterTabs: { value: string; label: string }[] = [
  { value: "all", label: "Tous" },
  { value: "nouveau", label: "Nouveaux" },
  { value: "en-cours", label: "En cours" },
  { value: "resolu", label: "Resolus" },
  { value: "rejete", label: "Rejetes" },
];

export function AdminReportsContent() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [expandedReport, setExpandedReport] = useState<string | null>(null);

  const filtered = adminReports.filter((r) => {
    const matchesSearch =
      r.listingTitle.toLowerCase().includes(search.toLowerCase()) ||
      r.reportedBy.toLowerCase().includes(search.toLowerCase()) ||
      r.description.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || r.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Signalements</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Gerez les signalements des utilisateurs
        </p>
      </div>

      {/* Stats */}
      <div className="mb-6 grid gap-3 sm:grid-cols-4">
        {[
          { label: "Nouveaux", value: adminReports.filter((r) => r.status === "nouveau").length, icon: AlertTriangleIcon, bg: "bg-red-50", color: "text-red-500" },
          { label: "En cours", value: adminReports.filter((r) => r.status === "en-cours").length, icon: ClockIcon, bg: "bg-amber-50", color: "text-amber-600" },
          { label: "Resolus", value: adminReports.filter((r) => r.status === "resolu").length, icon: CheckCircleIcon, bg: "bg-green-50", color: "text-green-600" },
          { label: "Rejetes", value: adminReports.filter((r) => r.status === "rejete").length, icon: XCircleIcon, bg: "bg-muted", color: "text-muted-foreground" },
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
            placeholder="Rechercher un signalement..."
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
      </div>

      {/* Report cards */}
      <div className="flex flex-col gap-3">
        {filtered.map((report) => {
          const config = statusConfig[report.status];
          const isExpanded = expandedReport === report.id;

          return (
            <div key={report.id} className="overflow-hidden rounded-xl border border-border bg-card">
              {/* Header row */}
              <button
                onClick={() => setExpandedReport(isExpanded ? null : report.id)}
                className="flex w-full items-center gap-4 px-5 py-4 text-left transition-colors hover:bg-secondary/30"
              >
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                  report.status === "nouveau" ? "bg-red-50" : report.status === "en-cours" ? "bg-amber-50" : report.status === "resolu" ? "bg-green-50" : "bg-muted"
                }`}>
                  <config.icon className={`h-5 w-5 ${
                    report.status === "nouveau" ? "text-red-500" : report.status === "en-cours" ? "text-amber-500" : report.status === "resolu" ? "text-green-600" : "text-muted-foreground"
                  }`} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="truncate text-sm font-semibold text-foreground">
                      {report.listingTitle}
                    </p>
                    <span className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${config.class}`}>
                      {config.label}
                    </span>
                  </div>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {reportReasonLabels[report.reason]} - Signale par {report.reportedBy}
                  </p>
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <CalendarIcon className="h-3 w-3" />
                  {new Date(report.createdAt).toLocaleDateString("fr-FR")}
                </div>
              </button>

              {/* Expanded details */}
              {isExpanded && (
                <div className="border-t border-border bg-secondary/20 px-5 py-4">
                  <div className="mb-4 grid gap-4 sm:grid-cols-2">
                    <div>
                      <p className="mb-1 text-xs font-semibold uppercase text-muted-foreground">Motif</p>
                      <p className="text-sm text-foreground">{reportReasonLabels[report.reason]}</p>
                    </div>
                    <div>
                      <p className="mb-1 text-xs font-semibold uppercase text-muted-foreground">Signale par</p>
                      <div className="flex items-center gap-2">
                        <UserIcon className="h-3.5 w-3.5 text-muted-foreground" />
                        <span className="text-sm text-foreground">{report.reportedBy}</span>
                        <span className="text-xs text-muted-foreground">({report.reportedByEmail})</span>
                      </div>
                    </div>
                  </div>
                  <div className="mb-4">
                    <p className="mb-1 text-xs font-semibold uppercase text-muted-foreground">Description</p>
                    <p className="text-sm text-foreground">{report.description}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button className="flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-xs font-medium text-primary-foreground hover:bg-primary/90">
                      <EyeIcon className="h-3.5 w-3.5" />
                      Voir l{"'"}annonce
                    </button>
                    {(report.status === "nouveau" || report.status === "en-cours") && (
                      <>
                        <button className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-xs font-medium text-foreground hover:bg-secondary">
                          <ClockIcon className="h-3.5 w-3.5" />
                          Marquer en cours
                        </button>
                        <button className="flex items-center gap-1.5 rounded-lg bg-green-600 px-3 py-2 text-xs font-medium text-primary-foreground hover:bg-green-700">
                          <CheckCircleIcon className="h-3.5 w-3.5" />
                          Resoudre
                        </button>
                        <button className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-xs font-medium text-muted-foreground hover:bg-secondary">
                          <XCircleIcon className="h-3.5 w-3.5" />
                          Rejeter
                        </button>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
        {filtered.length === 0 && (
          <div className="rounded-xl border border-border bg-card py-12 text-center text-sm text-muted-foreground">
            Aucun signalement ne correspond a vos criteres.
          </div>
        )}
      </div>
    </div>
  );
}
