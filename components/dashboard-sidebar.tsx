"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  HomeIcon, HeartIcon, MailIcon, BarChartIcon,
  SettingsIcon, LogOutIcon, PlusIcon, UserIcon, SearchIcon
} from "./icons";

const sidebarLinks = [
  { href: "/dashboard", label: "Tableau de bord", icon: HomeIcon },
  { href: "/dashboard/annonces", label: "Mes annonces", icon: HomeIcon },
  { href: "/dashboard/favoris", label: "Mes favoris", icon: HeartIcon },
  { href: "/dashboard/recherches", label: "Recherches sauvegardees", icon: SearchIcon },
  { href: "/dashboard/messages", label: "Messagerie", icon: MailIcon },
  { href: "/dashboard/statistiques", label: "Statistiques", icon: BarChartIcon },
  { href: "/dashboard/profil", label: "Mon profil", icon: UserIcon },
  { href: "/dashboard/parametres", label: "Parametres", icon: SettingsIcon },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 shrink-0 lg:block">
      <div className="sticky top-24">
        {/* User info */}
        <div className="mb-6 flex items-center gap-3 rounded-xl border border-border bg-card p-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
            <UserIcon className="h-5 w-5 text-primary" />
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-foreground">Marie Dupont</p>
            <p className="truncate text-xs text-muted-foreground">Compte Particulier</p>
          </div>
        </div>

        {/* CTA */}
        <Link
          href="/publier"
          className="mb-4 flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          <PlusIcon className="h-4 w-4" />
          Nouvelle annonce
        </Link>

        {/* Navigation */}
        <nav className="flex flex-col gap-1">
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                )}
              >
                <link.icon className="h-4 w-4 shrink-0" />
                {link.label}
              </Link>
            );
          })}
        </nav>

        <hr className="my-4 border-border" />

        <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">
          <LogOutIcon className="h-4 w-4" />
          Se deconnecter
        </button>
      </div>
    </aside>
  );
}
