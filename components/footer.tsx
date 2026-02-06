import Link from "next/link";
import { HomeIcon } from "./icons";

const footerLinks = {
  "Rechercher": [
    { label: "Acheter", href: "/annonces?transaction=vente" },
    { label: "Louer", href: "/annonces?transaction=location" },
    { label: "Neuf", href: "/annonces?condition=neuf" },
    { label: "Prestige", href: "/annonces?prestige=true" },
  ],
  "Proprietaires": [
    { label: "Publier une annonce", href: "/publier" },
    { label: "Estimer mon bien", href: "#" },
    { label: "Guide du vendeur", href: "#" },
    { label: "Guide du bailleur", href: "#" },
  ],
  "Professionnels": [
    { label: "Offres agences", href: "#" },
    { label: "Espace pro", href: "#" },
    { label: "API", href: "#" },
    { label: "Partenariats", href: "#" },
  ],
  "A propos": [
    { label: "Qui sommes-nous", href: "#" },
    { label: "Contact", href: "#" },
    { label: "Carrieres", href: "#" },
    { label: "Presse", href: "#" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                <HomeIcon className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold font-sans">ImmoMarket</span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed opacity-70">
              La plateforme immobiliere qui simplifie vos projets. Achat, vente, location : trouvez le bien ideal.
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="mb-3 text-sm font-semibold">{title}</h3>
              <ul className="flex flex-col gap-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm opacity-70 transition-opacity hover:opacity-100"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-background/10 pt-8 md:flex-row">
          <p className="text-sm opacity-60">
            2026 ImmoMarket. Tous droits reserves.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="text-sm opacity-60 hover:opacity-100">
              Mentions legales
            </Link>
            <Link href="#" className="text-sm opacity-60 hover:opacity-100">
              CGU
            </Link>
            <Link href="#" className="text-sm opacity-60 hover:opacity-100">
              Confidentialite
            </Link>
            <Link href="#" className="text-sm opacity-60 hover:opacity-100">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
