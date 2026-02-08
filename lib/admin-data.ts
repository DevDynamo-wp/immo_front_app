export type UserRole = "particulier" | "professionnel" | "agent" | "admin";
export type UserStatus = "actif" | "suspendu" | "en-attente";
export type ListingStatus = "active" | "en-attente" | "rejetee" | "expiree";
export type ReportStatus = "nouveau" | "en-cours" | "resolu" | "rejete";
export type ReportReason = "contenu-inapproprie" | "fausse-annonce" | "doublon" | "spam" | "autre";

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  phone: string;
  city: string;
  listingsCount: number;
  createdAt: string;
  lastLogin: string;
  avatar: string;
}

export interface AdminListing {
  id: string;
  title: string;
  type: string;
  transaction: string;
  price: number;
  city: string;
  surface: number;
  status: ListingStatus;
  owner: string;
  ownerEmail: string;
  image: string;
  createdAt: string;
  views: number;
  reports: number;
}

export interface Report {
  id: string;
  reason: ReportReason;
  description: string;
  listingId: string;
  listingTitle: string;
  reportedBy: string;
  reportedByEmail: string;
  status: ReportStatus;
  createdAt: string;
}

export const adminUsers: AdminUser[] = [
  {
    id: "u1",
    name: "Marie Dupont",
    email: "marie.dupont@email.com",
    role: "particulier",
    status: "actif",
    phone: "06 12 34 56 78",
    city: "Paris",
    listingsCount: 3,
    createdAt: "2025-09-15",
    lastLogin: "2026-02-07",
    avatar: "",
  },
  {
    id: "u2",
    name: "Pierre Martin",
    email: "pierre.martin@lyon-immo.fr",
    role: "professionnel",
    status: "actif",
    phone: "04 72 34 56 78",
    city: "Lyon",
    listingsCount: 12,
    createdAt: "2025-06-20",
    lastLogin: "2026-02-08",
    avatar: "",
  },
  {
    id: "u3",
    name: "Sophie Laurent",
    email: "sophie@prestige-immo.fr",
    role: "agent",
    status: "actif",
    phone: "01 45 67 89 01",
    city: "Paris",
    listingsCount: 28,
    createdAt: "2025-03-10",
    lastLogin: "2026-02-08",
    avatar: "",
  },
  {
    id: "u4",
    name: "Jean Moreau",
    email: "jean.moreau@email.com",
    role: "particulier",
    status: "en-attente",
    phone: "05 56 12 34 56",
    city: "Bordeaux",
    listingsCount: 0,
    createdAt: "2026-02-05",
    lastLogin: "2026-02-05",
    avatar: "",
  },
  {
    id: "u5",
    name: "Isabelle Roux",
    email: "isabelle.roux@email.com",
    role: "particulier",
    status: "suspendu",
    phone: "04 93 45 67 89",
    city: "Nice",
    listingsCount: 1,
    createdAt: "2025-11-08",
    lastLogin: "2026-01-15",
    avatar: "",
  },
  {
    id: "u6",
    name: "Thomas Bernard",
    email: "thomas@marseille-prop.fr",
    role: "professionnel",
    status: "actif",
    phone: "04 91 23 45 67",
    city: "Marseille",
    listingsCount: 8,
    createdAt: "2025-07-22",
    lastLogin: "2026-02-06",
    avatar: "",
  },
  {
    id: "u7",
    name: "Claire Fontaine",
    email: "claire.fontaine@email.com",
    role: "particulier",
    status: "actif",
    phone: "03 88 12 34 56",
    city: "Strasbourg",
    listingsCount: 2,
    createdAt: "2025-10-30",
    lastLogin: "2026-02-04",
    avatar: "",
  },
  {
    id: "u8",
    name: "Luc Perrier",
    email: "luc.perrier@toulouse-hab.fr",
    role: "agent",
    status: "actif",
    phone: "05 61 23 45 67",
    city: "Toulouse",
    listingsCount: 15,
    createdAt: "2025-04-18",
    lastLogin: "2026-02-07",
    avatar: "",
  },
];

export const adminListings: AdminListing[] = [
  {
    id: "l1",
    title: "Appartement lumineux au coeur de Paris",
    type: "Appartement",
    transaction: "Vente",
    price: 485000,
    city: "Paris",
    surface: 65,
    status: "active",
    owner: "Marie Dupont",
    ownerEmail: "marie.dupont@email.com",
    image: "/images/properties/property-1.jpg",
    createdAt: "2026-01-28",
    views: 234,
    reports: 0,
  },
  {
    id: "l2",
    title: "Maison de charme avec jardin",
    type: "Maison",
    transaction: "Vente",
    price: 695000,
    city: "Lyon",
    surface: 145,
    status: "active",
    owner: "Pierre Martin",
    ownerEmail: "pierre.martin@lyon-immo.fr",
    image: "/images/properties/property-2.jpg",
    createdAt: "2026-01-25",
    views: 456,
    reports: 0,
  },
  {
    id: "l3",
    title: "Penthouse avec terrasse panoramique",
    type: "Appartement",
    transaction: "Vente",
    price: 1250000,
    city: "Paris",
    surface: 120,
    status: "en-attente",
    owner: "Sophie Laurent",
    ownerEmail: "sophie@prestige-immo.fr",
    image: "/images/properties/property-3.jpg",
    createdAt: "2026-02-01",
    views: 0,
    reports: 0,
  },
  {
    id: "l4",
    title: "Studio moderne quartier etudiant",
    type: "Appartement",
    transaction: "Location",
    price: 650,
    city: "Bordeaux",
    surface: 28,
    status: "active",
    owner: "Jean Moreau",
    ownerEmail: "jean.moreau@email.com",
    image: "/images/properties/property-4.jpg",
    createdAt: "2026-02-03",
    views: 123,
    reports: 2,
  },
  {
    id: "l5",
    title: "Appartement familial avec balcon",
    type: "Appartement",
    transaction: "Location",
    price: 1200,
    city: "Nice",
    surface: 85,
    status: "rejetee",
    owner: "Isabelle Roux",
    ownerEmail: "isabelle.roux@email.com",
    image: "/images/properties/property-5.jpg",
    createdAt: "2026-02-04",
    views: 0,
    reports: 3,
  },
  {
    id: "l6",
    title: "Loft industriel renove",
    type: "Appartement",
    transaction: "Vente",
    price: 380000,
    city: "Marseille",
    surface: 95,
    status: "active",
    owner: "Thomas Bernard",
    ownerEmail: "thomas@marseille-prop.fr",
    image: "/images/properties/property-6.jpg",
    createdAt: "2026-01-30",
    views: 345,
    reports: 0,
  },
  {
    id: "l7",
    title: "Villa contemporaine avec piscine",
    type: "Maison",
    transaction: "Vente",
    price: 890000,
    city: "Toulouse",
    surface: 200,
    status: "en-attente",
    owner: "Luc Perrier",
    ownerEmail: "luc.perrier@toulouse-hab.fr",
    image: "/images/properties/property-1.jpg",
    createdAt: "2026-02-06",
    views: 0,
    reports: 0,
  },
  {
    id: "l8",
    title: "Maison alsacienne renovee",
    type: "Maison",
    transaction: "Vente",
    price: 420000,
    city: "Strasbourg",
    surface: 130,
    status: "expiree",
    owner: "Claire Fontaine",
    ownerEmail: "claire.fontaine@email.com",
    image: "/images/properties/property-2.jpg",
    createdAt: "2025-12-15",
    views: 567,
    reports: 0,
  },
];

export const adminReports: Report[] = [
  {
    id: "r1",
    reason: "fausse-annonce",
    description: "Les photos ne correspondent pas au bien. J'ai visite et c'est completement different.",
    listingId: "l4",
    listingTitle: "Studio moderne quartier etudiant",
    reportedBy: "Antoine Lefevre",
    reportedByEmail: "antoine.l@email.com",
    status: "nouveau",
    createdAt: "2026-02-07",
  },
  {
    id: "r2",
    reason: "contenu-inapproprie",
    description: "Description avec langage offensant et discriminatoire.",
    listingId: "l5",
    listingTitle: "Appartement familial avec balcon",
    reportedBy: "Nathalie Costa",
    reportedByEmail: "nathalie.c@email.com",
    status: "en-cours",
    createdAt: "2026-02-06",
  },
  {
    id: "r3",
    reason: "doublon",
    description: "Cette annonce est un doublon d'une annonce deja publiee par un autre utilisateur.",
    listingId: "l4",
    listingTitle: "Studio moderne quartier etudiant",
    reportedBy: "Franck Dubois",
    reportedByEmail: "franck.d@email.com",
    status: "nouveau",
    createdAt: "2026-02-05",
  },
  {
    id: "r4",
    reason: "fausse-annonce",
    description: "Le prix affiche ne correspond pas au prix reel. Tentative d'arnaque.",
    listingId: "l5",
    listingTitle: "Appartement familial avec balcon",
    reportedBy: "Julie Mercier",
    reportedByEmail: "julie.m@email.com",
    status: "resolu",
    createdAt: "2026-02-03",
  },
  {
    id: "r5",
    reason: "spam",
    description: "Annonce publiee plusieurs fois avec des titres differents.",
    listingId: "l5",
    listingTitle: "Appartement familial avec balcon",
    reportedBy: "Marc Blanc",
    reportedByEmail: "marc.b@email.com",
    status: "rejete",
    createdAt: "2026-02-01",
  },
];

export const reportReasonLabels: Record<ReportReason, string> = {
  "contenu-inapproprie": "Contenu inapproprie",
  "fausse-annonce": "Fausse annonce",
  "doublon": "Doublon",
  "spam": "Spam",
  "autre": "Autre",
};

export const adminStats = {
  totalUsers: 1247,
  newUsersThisMonth: 89,
  userGrowth: 12.5,
  totalListings: 3456,
  activeListings: 2890,
  pendingListings: 45,
  totalViews: 156789,
  viewsGrowth: 8.3,
  totalMessages: 4521,
  messagesThisMonth: 387,
  openReports: 3,
  revenue: 45600,
  revenueGrowth: 15.2,
};

export const monthlyStats = [
  { month: "Sep", users: 820, listings: 2100, views: 98000 },
  { month: "Oct", users: 910, listings: 2350, views: 112000 },
  { month: "Nov", users: 980, listings: 2600, views: 125000 },
  { month: "Dec", users: 1050, listings: 2800, views: 130000 },
  { month: "Jan", users: 1158, listings: 3100, views: 145000 },
  { month: "Fev", users: 1247, listings: 3456, views: 156789 },
];

export const listingsByType = [
  { type: "Appartement", count: 1890, percentage: 54.7 },
  { type: "Maison", count: 987, percentage: 28.6 },
  { type: "Terrain", count: 342, percentage: 9.9 },
  { type: "Local commercial", count: 237, percentage: 6.8 },
];

export const listingsByCity = [
  { city: "Paris", count: 856 },
  { city: "Lyon", count: 423 },
  { city: "Marseille", count: 389 },
  { city: "Bordeaux", count: 312 },
  { city: "Nice", count: 278 },
  { city: "Toulouse", count: 245 },
  { city: "Nantes", count: 198 },
  { city: "Strasbourg", count: 167 },
];
