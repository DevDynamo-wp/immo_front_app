import type { Metadata } from "next";
import Link from "next/link";
import { properties } from "@/lib/data";
import { formatPrice } from "@/lib/utils";
import { EyeIcon, HeartIcon, MailIcon, HomeIcon, ArrowRightIcon, PlusIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Tableau de bord",
};

const statsCards = [
  { label: "Annonces actives", value: "3", icon: HomeIcon, color: "text-primary", bgColor: "bg-primary/10" },
  { label: "Total des vues", value: "1 234", icon: EyeIcon, color: "text-blue-600", bgColor: "bg-blue-50" },
  { label: "Favoris recus", value: "47", icon: HeartIcon, color: "text-red-500", bgColor: "bg-red-50" },
  { label: "Messages recus", value: "12", icon: MailIcon, color: "text-amber-600", bgColor: "bg-amber-50" },
];

const recentMessages = [
  { from: "Jean Moreau", subject: "Question sur l'appartement Rue de Rivoli", time: "Il y a 2h", unread: true },
  { from: "Sophie Laurent", subject: "Visite possible samedi ?", time: "Il y a 5h", unread: true },
  { from: "Pierre Martin", subject: "Merci pour les informations", time: "Hier", unread: false },
];

export default function DashboardPage() {
  const userProperties = properties.slice(0, 3);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Tableau de bord</h1>
          <p className="mt-1 text-sm text-muted-foreground">Bienvenue Marie, voici un resume de votre activite.</p>
        </div>
        <Link
          href="/publier"
          className="hidden items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 sm:flex"
        >
          <PlusIcon className="h-4 w-4" />
          Nouvelle annonce
        </Link>
      </div>

      {/* Stats */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statsCards.map((stat) => (
          <div key={stat.label} className="flex items-center gap-4 rounded-xl border border-border bg-card p-4">
            <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.bgColor}`}>
              <stat.icon className={`h-6 w-6 ${stat.color}`} />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* My listings */}
        <section className="rounded-xl border border-border bg-card">
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <h2 className="font-semibold text-foreground">Mes annonces recentes</h2>
            <Link href="/dashboard/annonces" className="flex items-center gap-1 text-sm text-primary hover:underline">
              Voir tout <ArrowRightIcon className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="divide-y divide-border">
            {userProperties.map((prop) => (
              <Link
                key={prop.id}
                href={`/annonces/${prop.id}`}
                className="flex items-center gap-4 px-5 py-3 transition-colors hover:bg-secondary/50"
              >
                <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-muted">
                  <img src={prop.images[0]} alt="" className="h-full w-full object-cover" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-foreground">{prop.title}</p>
                  <p className="text-xs text-muted-foreground">{prop.city} - {formatPrice(prop.price)}{prop.transaction === "location" ? "/mois" : ""}</p>
                </div>
                <span className="shrink-0 rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-700">
                  Active
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Recent messages */}
        <section className="rounded-xl border border-border bg-card">
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <h2 className="font-semibold text-foreground">Messages recents</h2>
            <Link href="/dashboard/messages" className="flex items-center gap-1 text-sm text-primary hover:underline">
              Voir tout <ArrowRightIcon className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="divide-y divide-border">
            {recentMessages.map((msg, i) => (
              <div key={i} className="flex items-start gap-3 px-5 py-3">
                <div className={`mt-1 h-2 w-2 shrink-0 rounded-full ${msg.unread ? "bg-primary" : "bg-transparent"}`} />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className={`truncate text-sm ${msg.unread ? "font-semibold text-foreground" : "text-muted-foreground"}`}>
                      {msg.from}
                    </p>
                    <span className="shrink-0 text-xs text-muted-foreground">{msg.time}</span>
                  </div>
                  <p className="truncate text-sm text-muted-foreground">{msg.subject}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
