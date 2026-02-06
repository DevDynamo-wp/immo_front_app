"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { cn, formatPrice, formatArea } from "@/lib/utils";
import type { Property } from "@/lib/data";
import { HeartIcon, MapPinIcon, BedIcon, RulerIcon, DoorIcon } from "./icons";

export function PropertyCard({ property }: { property: Property }) {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-shadow hover:shadow-lg">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Link href={`/annonces/${property.id}`}>
          <Image
            src={property.images[0]}
            alt={property.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </Link>

        {/* Badges */}
        <div className="absolute left-3 top-3 flex gap-2">
          <span className={cn(
            "rounded-md px-2.5 py-1 text-xs font-semibold",
            property.transaction === "vente"
              ? "bg-primary text-primary-foreground"
              : "bg-accent text-accent-foreground"
          )}>
            {property.transaction === "vente" ? "Vente" : "Location"}
          </span>
          {property.isFeatured && (
            <span className="rounded-md bg-foreground/80 px-2.5 py-1 text-xs font-semibold text-background">
              En vedette
            </span>
          )}
        </div>

        {/* Favorite */}
        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm transition-colors hover:bg-background"
          aria-label={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
        >
          <HeartIcon className={cn("h-4 w-4", isFavorite ? "text-destructive" : "text-foreground")} filled={isFavorite} />
        </button>

        {/* DPE Badge */}
        <div className="absolute bottom-3 left-3">
          <span className={cn(
            "rounded-md px-2 py-0.5 text-xs font-bold text-card",
            property.dpe === "A" && "bg-green-500",
            property.dpe === "B" && "bg-green-400",
            property.dpe === "C" && "bg-yellow-400",
            property.dpe === "D" && "bg-yellow-500",
            property.dpe === "E" && "bg-orange-400",
            property.dpe === "F" && "bg-orange-500",
            property.dpe === "G" && "bg-red-500",
          )}>
            DPE {property.dpe}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        {/* Price */}
        <div className="mb-1">
          <span className="text-xl font-bold text-foreground">
            {formatPrice(property.price)}
          </span>
          {property.transaction === "location" && (
            <span className="text-sm text-muted-foreground">/mois</span>
          )}
          {property.charges && (
            <span className="ml-1 text-sm text-muted-foreground">
              + {formatPrice(property.charges)} charges
            </span>
          )}
        </div>

        {/* Title */}
        <Link href={`/annonces/${property.id}`}>
          <h3 className="mb-2 line-clamp-1 text-sm font-semibold text-foreground transition-colors hover:text-primary">
            {property.title}
          </h3>
        </Link>

        {/* Location */}
        <div className="mb-3 flex items-center gap-1 text-sm text-muted-foreground">
          <MapPinIcon className="h-3.5 w-3.5 shrink-0" />
          <span className="truncate">{property.city} ({property.postalCode})</span>
        </div>

        {/* Features */}
        <div className="mt-auto flex items-center gap-4 border-t border-border pt-3">
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <RulerIcon className="h-3.5 w-3.5" />
            <span>{formatArea(property.surface)}</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <DoorIcon className="h-3.5 w-3.5" />
            <span>{property.rooms} p.</span>
          </div>
          {property.bedrooms > 0 && (
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <BedIcon className="h-3.5 w-3.5" />
              <span>{property.bedrooms} ch.</span>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
