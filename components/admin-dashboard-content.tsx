"use client";

import Link from "next/link";
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell,
} from "recharts";
import {
  UsersIcon, BuildingIcon, EyeIcon, AlertTriangleIcon,
  TrendingUpIcon, ArrowRightIcon, DollarIcon, ClockIcon,
} from "./icons";
import {
  adminStats, monthlyStats, listingsByType, listingsByCity,
  adminListings, adminReports,
} from "@/lib/admin-data";
import { formatPrice } from "@/lib/utils";

const kpiCards = [
  {
    label: "Utilisateurs total",
    value: adminStats.totalUsers.toLocaleString("fr-FR"),
    change: `+${adminStats.newUsersThisMonth} ce mois`,
    growth: adminStats.userGrowth,
    icon: UsersIcon,
    color: "#0b6e4f",
    bgColor: "bg-primary/10",
  },
  {
    label: "Annonces actives",
    value: adminStats.activeListings.toLocaleString("fr-FR"),
    change: `${adminStats.pendingListings} en attente`,
    growth: 5.4,
    icon: BuildingIcon,
    color: "#2563eb",
    bgColor: "bg-blue-50",
  },
  {
    label: "Vues totales",
    value: (adminStats.totalViews / 1000).toFixed(1) + "k",
    change: `+${adminStats.viewsGrowth}% ce mois`,
    growth: adminStats.viewsGrowth,
    icon: EyeIcon,
    color: "#d97706",
    bgColor: "bg-amber-50",
  },
  {
    label: "Signalements ouverts",
    value: adminStats.openReports.toString(),
    change: "A traiter",
    growth: -15,
    icon: AlertTriangleIcon,
    color: "#dc2626",
    bgColor: "bg-red-50",
  },
];

const PIE_COLORS = ["#0b6e4f", "#2563eb", "#d97706", "#8b5cf6"];

export function AdminDashboardContent() {
  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Tableau de bord</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Vue d{"'"}ensemble de la plateforme ImmoMarket
        </p>
      </div>

      {/* KPI Cards */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpiCards.map((kpi) => (
          <div
            key={kpi.label}
            className="flex items-start gap-4 rounded-xl border border-border bg-card p-5"
          >
            <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${kpi.bgColor}`}>
              <kpi.icon className="h-6 w-6" style={{ color: kpi.color }} />
            </div>
            <div className="min-w-0">
              <p className="text-2xl font-bold text-foreground">{kpi.value}</p>
              <p className="text-sm text-muted-foreground">{kpi.label}</p>
              <div className="mt-1 flex items-center gap-1">
                <TrendingUpIcon
                  className="h-3 w-3"
                  style={{ color: kpi.growth >= 0 ? "#16a34a" : "#dc2626" }}
                />
                <span className="text-xs" style={{ color: kpi.growth >= 0 ? "#16a34a" : "#dc2626" }}>
                  {kpi.change}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="mb-8 grid gap-6 xl:grid-cols-2">
        {/* Growth Chart */}
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-foreground">Croissance utilisateurs</h2>
              <p className="text-sm text-muted-foreground">Evolution sur 6 mois</p>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyStats} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#6b7280" }} />
                <YAxis tick={{ fontSize: 12, fill: "#6b7280" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                    fontSize: "13px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="users"
                  stroke="#0b6e4f"
                  strokeWidth={2.5}
                  dot={{ r: 4, fill: "#0b6e4f" }}
                  name="Utilisateurs"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Listings by City Chart */}
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-foreground">Annonces par ville</h2>
              <p className="text-sm text-muted-foreground">Repartition geographique</p>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={listingsByCity} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="city" tick={{ fontSize: 11, fill: "#6b7280" }} />
                <YAxis tick={{ fontSize: 12, fill: "#6b7280" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                    fontSize: "13px",
                  }}
                />
                <Bar dataKey="count" fill="#0b6e4f" radius={[4, 4, 0, 0]} name="Annonces" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Second Row: Pie chart + Recent Activity */}
      <div className="mb-8 grid gap-6 xl:grid-cols-3">
        {/* Listing Types Pie */}
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="mb-4">
            <h2 className="font-semibold text-foreground">Types de biens</h2>
            <p className="text-sm text-muted-foreground">Repartition par categorie</p>
          </div>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={listingsByType}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  dataKey="count"
                  nameKey="type"
                >
                  {listingsByType.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                    fontSize: "13px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 flex flex-wrap gap-3">
            {listingsByType.map((item, i) => (
              <div key={item.type} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: PIE_COLORS[i] }} />
                {item.type} ({item.percentage}%)
              </div>
            ))}
          </div>
        </div>

        {/* Pending Listings */}
        <div className="rounded-xl border border-border bg-card xl:col-span-2">
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <div>
              <h2 className="font-semibold text-foreground">Annonces en attente</h2>
              <p className="text-sm text-muted-foreground">Necessitent une validation</p>
            </div>
            <Link
              href="/admin/annonces"
              className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
            >
              Voir tout <ArrowRightIcon className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="divide-y divide-border">
            {adminListings
              .filter((l) => l.status === "en-attente")
              .slice(0, 4)
              .map((listing) => (
                <div key={listing.id} className="flex items-center gap-4 px-5 py-3">
                  <div className="h-12 w-16 shrink-0 overflow-hidden rounded-lg bg-muted">
                    <img src={listing.image} alt="" className="h-full w-full object-cover" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-foreground">{listing.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {listing.city} - {listing.owner} - {formatPrice(listing.price)}
                      {listing.transaction === "Location" ? "/mois" : ""}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <ClockIcon className="h-3 w-3" />
                    {new Date(listing.createdAt).toLocaleDateString("fr-FR")}
                  </div>
                  <div className="flex gap-2">
                    <button className="rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90">
                      Approuver
                    </button>
                    <button className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-foreground hover:bg-secondary">
                      Rejeter
                    </button>
                  </div>
                </div>
              ))}
            {adminListings.filter((l) => l.status === "en-attente").length === 0 && (
              <div className="px-5 py-8 text-center text-sm text-muted-foreground">
                Aucune annonce en attente de validation.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Recent Reports */}
      <div className="rounded-xl border border-border bg-card">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <div>
            <h2 className="font-semibold text-foreground">Signalements recents</h2>
            <p className="text-sm text-muted-foreground">Derniers signalements a traiter</p>
          </div>
          <Link
            href="/admin/signalements"
            className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
          >
            Voir tout <ArrowRightIcon className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="divide-y divide-border">
          {adminReports
            .filter((r) => r.status === "nouveau" || r.status === "en-cours")
            .slice(0, 3)
            .map((report) => (
              <div key={report.id} className="flex items-center gap-4 px-5 py-3">
                <div
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                    report.status === "nouveau" ? "bg-red-50" : "bg-amber-50"
                  }`}
                >
                  <AlertTriangleIcon
                    className={`h-4 w-4 ${
                      report.status === "nouveau" ? "text-red-500" : "text-amber-500"
                    }`}
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-foreground">
                    {report.listingTitle}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Signale par {report.reportedBy} - {report.description.slice(0, 60)}...
                  </p>
                </div>
                <span
                  className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    report.status === "nouveau"
                      ? "bg-red-100 text-red-700"
                      : "bg-amber-100 text-amber-700"
                  }`}
                >
                  {report.status === "nouveau" ? "Nouveau" : "En cours"}
                </span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
