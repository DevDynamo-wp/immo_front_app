"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { cn, formatPrice, formatArea } from "@/lib/utils";
import type { Property } from "@/lib/data";
import { PropertyCard } from "./property-card";
import {
  HeartIcon, ShareIcon, MapPinIcon, BedIcon, RulerIcon, DoorIcon,
  ChevronLeftIcon, EyeIcon, CalendarIcon, FlagIcon, PhoneIcon, MailIcon, UserIcon
} from "./icons";

export function PropertyDetail({
  property,
  similarProperties,
}: {
  property: Property;
  similarProperties: Property[];
}) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [contactForm, setContactForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [showPhone, setShowPhone] = useState(false);

  function handleContactSubmit(e: React.FormEvent) {
    e.preventDefault();
    alert("Message envoye avec succes ! L'agent vous recontactera bientot.");
    setContactForm({ name: "", email: "", phone: "", message: "" });
  }

  return (
    <div>
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground">Accueil</Link>
        <span>/</span>
        <Link href="/annonces" className="hover:text-foreground">Annonces</Link>
        <span>/</span>
        <span className="truncate text-foreground">{property.title}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Main content */}
        <div className="lg:col-span-2">
          {/* Image */}
          <div className="relative mb-6 aspect-[16/10] overflow-hidden rounded-xl">
            <Image
              src={property.images[0]}
              alt={property.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 66vw"
            />
            {/* Image overlay actions */}
            <div className="absolute right-4 top-4 flex gap-2">
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm transition-colors hover:bg-background"
                aria-label={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
              >
                <HeartIcon className={cn("h-5 w-5", isFavorite ? "text-destructive" : "text-foreground")} filled={isFavorite} />
              </button>
              <button
                className="flex h-10 w-10 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm transition-colors hover:bg-background"
                aria-label="Partager"
              >
                <ShareIcon className="h-5 w-5 text-foreground" />
              </button>
            </div>
            {/* Badges */}
            <div className="absolute left-4 top-4 flex gap-2">
              <span className={cn(
                "rounded-md px-3 py-1.5 text-sm font-semibold",
                property.transaction === "vente"
                  ? "bg-primary text-primary-foreground"
                  : "bg-accent text-accent-foreground"
              )}>
                {property.transaction === "vente" ? "Vente" : "Location"}
              </span>
            </div>
          </div>

          {/* Title and price */}
          <div className="mb-6">
            <div className="mb-2 flex flex-wrap items-start justify-between gap-4">
              <h1 className="text-2xl font-bold text-foreground md:text-3xl">{property.title}</h1>
              <div className="text-right">
                <p className="text-2xl font-bold text-primary md:text-3xl">
                  {formatPrice(property.price)}
                  {property.transaction === "location" && <span className="text-base font-normal text-muted-foreground">/mois</span>}
                </p>
                {property.charges && (
                  <p className="text-sm text-muted-foreground">+ {formatPrice(property.charges)} charges</p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <MapPinIcon className="h-4 w-4" />
              <span>{property.address}, {property.city} {property.postalCode}</span>
            </div>
          </div>

          {/* Key info */}
          <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="flex flex-col items-center rounded-lg border border-border bg-card p-4">
              <RulerIcon className="mb-1 h-5 w-5 text-primary" />
              <span className="text-lg font-bold text-foreground">{formatArea(property.surface)}</span>
              <span className="text-xs text-muted-foreground">Surface</span>
            </div>
            <div className="flex flex-col items-center rounded-lg border border-border bg-card p-4">
              <DoorIcon className="mb-1 h-5 w-5 text-primary" />
              <span className="text-lg font-bold text-foreground">{property.rooms}</span>
              <span className="text-xs text-muted-foreground">Pieces</span>
            </div>
            <div className="flex flex-col items-center rounded-lg border border-border bg-card p-4">
              <BedIcon className="mb-1 h-5 w-5 text-primary" />
              <span className="text-lg font-bold text-foreground">{property.bedrooms}</span>
              <span className="text-xs text-muted-foreground">Chambres</span>
            </div>
            <div className="flex flex-col items-center rounded-lg border border-border bg-card p-4">
              <span className={cn(
                "mb-1 flex h-6 w-6 items-center justify-center rounded text-xs font-bold text-card",
                property.dpe === "A" && "bg-green-500",
                property.dpe === "B" && "bg-green-400",
                property.dpe === "C" && "bg-yellow-400",
                property.dpe === "D" && "bg-yellow-500",
                property.dpe === "E" && "bg-orange-400",
                property.dpe === "F" && "bg-orange-500",
                property.dpe === "G" && "bg-red-500",
              )}>
                {property.dpe}
              </span>
              <span className="text-lg font-bold text-foreground">DPE {property.dpe}</span>
              <span className="text-xs text-muted-foreground">Energie</span>
            </div>
          </div>

          {/* Description */}
          <section className="mb-6">
            <h2 className="mb-3 text-lg font-semibold text-foreground">Description</h2>
            <p className="leading-relaxed text-muted-foreground">{property.description}</p>
          </section>

          {/* Details */}
          <section className="mb-6">
            <h2 className="mb-3 text-lg font-semibold text-foreground">Caracteristiques</h2>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
              <DetailRow label="Type" value={property.type.charAt(0).toUpperCase() + property.type.slice(1)} />
              <DetailRow label="Surface" value={formatArea(property.surface)} />
              <DetailRow label="Pieces" value={String(property.rooms)} />
              <DetailRow label="Chambres" value={String(property.bedrooms)} />
              {property.floor !== undefined && <DetailRow label="Etage" value={`${property.floor}/${property.totalFloors}`} />}
              {property.yearBuilt && <DetailRow label="Annee de construction" value={String(property.yearBuilt)} />}
              <DetailRow label="Etat" value={property.condition} />
              <DetailRow label="Chauffage" value={property.heating} />
              <DetailRow label="DPE" value={`Classe ${property.dpe}`} />
            </div>
          </section>

          {/* Features */}
          <section className="mb-6">
            <h2 className="mb-3 text-lg font-semibold text-foreground">Equipements</h2>
            <div className="flex flex-wrap gap-2">
              {property.features.map((feature) => (
                <span key={feature} className="rounded-full border border-border bg-secondary px-3 py-1.5 text-sm text-secondary-foreground">
                  {feature}
                </span>
              ))}
            </div>
          </section>

          {/* Meta info */}
          <div className="mb-6 flex flex-wrap gap-4 border-t border-border pt-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <CalendarIcon className="h-4 w-4" />
              <span>Publiee le {new Date(property.createdAt).toLocaleDateString("fr-FR")}</span>
            </div>
            <div className="flex items-center gap-1">
              <EyeIcon className="h-4 w-4" />
              <span>{property.views} vues</span>
            </div>
            <button className="flex items-center gap-1 text-destructive hover:underline">
              <FlagIcon className="h-4 w-4" />
              Signaler l{"'"}annonce
            </button>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 flex flex-col gap-6">
            {/* Agent card */}
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <UserIcon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">{property.agent.name}</p>
                  <p className="text-sm text-muted-foreground">{property.agent.agency}</p>
                </div>
              </div>
              <button
                onClick={() => setShowPhone(!showPhone)}
                className="mb-3 flex w-full items-center justify-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
              >
                <PhoneIcon className="h-4 w-4" />
                {showPhone ? property.agent.phone : "Voir le telephone"}
              </button>
            </div>

            {/* Contact form */}
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="mb-4 text-lg font-semibold text-foreground">Contacter l{"'"}agent</h3>
              <form onSubmit={handleContactSubmit} className="flex flex-col gap-3">
                <input
                  type="text"
                  placeholder="Votre nom"
                  value={contactForm.name}
                  onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                  required
                  className="h-10 rounded-lg border border-input bg-background px-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <input
                  type="email"
                  placeholder="Votre email"
                  value={contactForm.email}
                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  required
                  className="h-10 rounded-lg border border-input bg-background px-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <input
                  type="tel"
                  placeholder="Votre telephone"
                  value={contactForm.phone}
                  onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                  className="h-10 rounded-lg border border-input bg-background px-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <textarea
                  placeholder="Votre message..."
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  required
                  rows={4}
                  className="rounded-lg border border-input bg-background p-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  defaultValue={`Bonjour, je suis interesse(e) par votre bien "${property.title}". Pourriez-vous me donner plus d'informations ?`}
                />
                <button
                  type="submit"
                  className="flex h-11 items-center justify-center gap-2 rounded-lg bg-primary text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  <MailIcon className="h-4 w-4" />
                  Envoyer le message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Similar properties */}
      {similarProperties.length > 0 && (
        <section className="mt-12 border-t border-border pt-8">
          <h2 className="mb-6 text-2xl font-bold text-foreground">Biens similaires</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {similarProperties.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-secondary p-3">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="font-medium text-foreground">{value}</p>
    </div>
  );
}
