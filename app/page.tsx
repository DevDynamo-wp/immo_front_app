import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { HeroSearch } from "@/components/hero-search";
import { PropertyCard } from "@/components/property-card";
import { properties } from "@/lib/data";
import { ArrowRightIcon, BuildingIcon, ShieldIcon, ZapIcon, SearchIcon, HomeIcon, MapPinIcon } from "@/components/icons";

const featuredProperties = properties.filter((p) => p.isFeatured);
const latestProperties = properties.slice(0, 6);

const stats = [
  { value: "15 000+", label: "Annonces actives" },
  { value: "8 500+", label: "Utilisateurs inscrits" },
  { value: "2 300+", label: "Transactions reussies" },
  { value: "98%", label: "Satisfaction client" },
];

const features = [
  {
    icon: SearchIcon,
    title: "Recherche intelligente",
    description: "Des filtres avances et une recherche geographique pour trouver le bien qui correspond exactement a vos criteres.",
  },
  {
    icon: ShieldIcon,
    title: "Annonces verifiees",
    description: "Chaque annonce est moderee et validee pour garantir la fiabilite des informations et votre securite.",
  },
  {
    icon: ZapIcon,
    title: "Contact direct",
    description: "Contactez directement les proprietaires et agents immobiliers via notre formulaire integre.",
  },
];

const popularCities = [
  { name: "Paris", count: 4520 },
  { name: "Lyon", count: 2130 },
  { name: "Marseille", count: 1840 },
  { name: "Bordeaux", count: 1250 },
  { name: "Nice", count: 980 },
  { name: "Toulouse", count: 870 },
];

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative flex min-h-[540px] items-center justify-center overflow-hidden lg:min-h-[620px]">
          <Image
            src="/images/hero-bg.jpg"
            alt="Vue aerienne de la ville"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-foreground/60" />
          <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center px-4 py-20 text-center">
            <h1 className="mb-4 max-w-2xl text-4xl font-bold leading-tight tracking-tight text-background md:text-5xl lg:text-6xl text-balance">
              Trouvez le bien immobilier ideal
            </h1>
            <p className="mb-8 max-w-lg text-lg leading-relaxed text-background/80">
              Des milliers d{"'"}annonces verifiees pour votre prochain achat, vente ou location.
            </p>
            <HeroSearch />
          </div>
        </section>

        {/* Stats Section */}
        <section className="border-b border-border bg-secondary">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 py-10 md:grid-cols-4 lg:px-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl font-bold text-primary md:text-3xl">{stat.value}</p>
                <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Properties */}
        <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-bold text-foreground md:text-3xl">Annonces en vedette</h2>
              <p className="mt-2 text-muted-foreground">Les biens selectionnes par notre equipe</p>
            </div>
            <Link
              href="/annonces"
              className="hidden items-center gap-1 text-sm font-medium text-primary hover:underline md:flex"
            >
              Voir tout
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {featuredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
          <div className="mt-6 text-center md:hidden">
            <Link
              href="/annonces"
              className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
            >
              Voir toutes les annonces
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>
        </section>

        {/* How it works */}
        <section className="bg-secondary">
          <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
            <div className="mb-12 text-center">
              <h2 className="text-2xl font-bold text-foreground md:text-3xl">Pourquoi ImmoMarket ?</h2>
              <p className="mt-2 text-muted-foreground">Une plateforme concue pour simplifier votre recherche immobiliere</p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              {features.map((feature) => (
                <div key={feature.title} className="flex flex-col items-center rounded-xl bg-card p-8 text-center shadow-sm">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                    <feature.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-foreground">{feature.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Latest Properties */}
        <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-bold text-foreground md:text-3xl">Dernieres annonces</h2>
              <p className="mt-2 text-muted-foreground">Les biens recemment publies sur la plateforme</p>
            </div>
            <Link
              href="/annonces"
              className="hidden items-center gap-1 text-sm font-medium text-primary hover:underline md:flex"
            >
              Voir tout
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {latestProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </section>

        {/* Popular cities */}
        <section className="bg-secondary">
          <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
            <div className="mb-8 text-center">
              <h2 className="text-2xl font-bold text-foreground md:text-3xl">Recherches populaires</h2>
              <p className="mt-2 text-muted-foreground">Les villes les plus recherchees par nos utilisateurs</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
              {popularCities.map((city) => (
                <Link
                  key={city.name}
                  href={`/annonces?q=${city.name}`}
                  className="group flex flex-col items-center rounded-xl border border-border bg-card p-6 text-center transition-all hover:border-primary hover:shadow-md"
                >
                  <MapPinIcon className="mb-2 h-6 w-6 text-primary" />
                  <h3 className="font-semibold text-foreground">{city.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{city.count.toLocaleString("fr-FR")} annonces</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-primary">
          <div className="mx-auto flex max-w-7xl flex-col items-center px-4 py-16 text-center lg:px-8">
            <BuildingIcon className="mb-4 h-12 w-12 text-primary-foreground/80" />
            <h2 className="mb-3 text-2xl font-bold text-primary-foreground md:text-3xl text-balance">
              Vous avez un bien a vendre ou a louer ?
            </h2>
            <p className="mb-8 max-w-md text-primary-foreground/80">
              Publiez votre annonce gratuitement et touchez des milliers d{"'"}acheteurs et locataires potentiels.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/publier"
                className="rounded-lg bg-background px-8 py-3 text-sm font-semibold text-primary transition-colors hover:bg-background/90"
              >
                Deposer une annonce
              </Link>
              <Link
                href="#"
                className="rounded-lg border border-primary-foreground/30 px-8 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-foreground/10"
              >
                En savoir plus
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
