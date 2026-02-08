"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  HomeIcon,
  UsersIcon,
  BuildingIcon,
  AlertTriangleIcon,
  BarChartIcon,
  SettingsIcon,
  LogOutIcon,
  ShieldIcon,
} from "./icons";

const sidebarLinks = [
  { href: "/admin", label: "Tableau de bord", icon: HomeIcon },
  { href: "/admin/utilisateurs", label: "Utilisateurs", icon: UsersIcon },
  { href: "/admin/annonces", label: "Annonces", icon: BuildingIcon },
  { href: "/admin/signalements", label: "Signalements", icon: AlertTriangleIcon },
  { href: "/admin/statistiques", label: "Statistiques", icon: BarChartIcon },
  { href: "/admin/parametres", label: "Parametres", icon: SettingsIcon },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 border-r border-border bg-card lg:block">
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center gap-3 border-b border-border px-6">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-foreground">
            <ShieldIcon className="h-5 w-5 text-background" />
          </div>
          <div>
            <span className="text-lg font-bold tracking-tight text-foreground">ImmoMarket</span>
            <p className="text-xs text-muted-foreground">Administration</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <div className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Navigation
          </div>
          <div className="flex flex-col gap-1">
            {sidebarLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/admin" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-foreground text-background"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  )}
                >
                  <link.icon className="h-4 w-4 shrink-0" />
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="mt-6 mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Liens rapides
          </div>
          <div className="flex flex-col gap-1">
            <Link
              href="/"
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              <HomeIcon className="h-4 w-4 shrink-0" />
              Voir le site
            </Link>
          </div>
        </nav>

        {/* Footer */}
        <div className="border-t border-border p-3">
          <div className="mb-3 flex items-center gap-3 rounded-lg px-3 py-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
              <ShieldIcon className="h-4 w-4 text-primary" />
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-foreground">Admin Principal</p>
              <p className="truncate text-xs text-muted-foreground">admin@immomarket.fr</p>
            </div>
          </div>
          <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">
            <LogOutIcon className="h-4 w-4" />
            Se deconnecter
          </button>
        </div>
      </div>
    </aside>
  );
}
