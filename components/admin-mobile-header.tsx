"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  ShieldIcon,
  MenuIcon,
  XIcon,
  HomeIcon,
  UsersIcon,
  BuildingIcon,
  AlertTriangleIcon,
  BarChartIcon,
  SettingsIcon,
  LogOutIcon,
} from "./icons";

const mobileLinks = [
  { href: "/admin", label: "Tableau de bord", icon: HomeIcon },
  { href: "/admin/utilisateurs", label: "Utilisateurs", icon: UsersIcon },
  { href: "/admin/annonces", label: "Annonces", icon: BuildingIcon },
  { href: "/admin/signalements", label: "Signalements", icon: AlertTriangleIcon },
  { href: "/admin/statistiques", label: "Statistiques", icon: BarChartIcon },
  { href: "/admin/parametres", label: "Parametres", icon: SettingsIcon },
];

export function AdminMobileHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <header className="sticky top-0 z-50 flex h-14 items-center justify-between border-b border-border bg-card px-4">
        <Link href="/admin" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-foreground">
            <ShieldIcon className="h-4 w-4 text-background" />
          </div>
          <span className="text-base font-bold text-foreground">Admin</span>
        </Link>
        <button
          onClick={() => setOpen(!open)}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-foreground hover:bg-secondary"
          aria-label="Menu"
        >
          {open ? <XIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
        </button>
      </header>

      {open && (
        <div className="fixed inset-0 top-14 z-40 bg-background/95 backdrop-blur-sm">
          <nav className="flex flex-col gap-1 p-4">
            {mobileLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/admin" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-foreground text-background"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  )}
                >
                  <link.icon className="h-5 w-5 shrink-0" />
                  {link.label}
                </Link>
              );
            })}
            <hr className="my-3 border-border" />
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground"
            >
              <HomeIcon className="h-5 w-5" />
              Voir le site
            </Link>
            <button className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground">
              <LogOutIcon className="h-5 w-5" />
              Se deconnecter
            </button>
          </nav>
        </div>
      )}
    </div>
  );
}
