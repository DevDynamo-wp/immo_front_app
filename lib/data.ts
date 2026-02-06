export type PropertyType = "appartement" | "maison" | "terrain" | "local-commercial";
export type TransactionType = "vente" | "location";
export type DPE = "A" | "B" | "C" | "D" | "E" | "F" | "G";

export interface Property {
  id: string;
  title: string;
  type: PropertyType;
  transaction: TransactionType;
  price: number;
  charges?: number;
  surface: number;
  rooms: number;
  bedrooms: number;
  description: string;
  address: string;
  city: string;
  postalCode: string;
  images: string[];
  dpe: DPE;
  floor?: number;
  totalFloors?: number;
  yearBuilt?: number;
  condition: string;
  features: string[];
  heating: string;
  agent: {
    name: string;
    agency: string;
    phone: string;
    avatar: string;
  };
  createdAt: string;
  views: number;
  isFeatured: boolean;
}

export const properties: Property[] = [
  {
    id: "1",
    title: "Appartement lumineux au coeur de Paris",
    type: "appartement",
    transaction: "vente",
    price: 485000,
    surface: 65,
    rooms: 3,
    bedrooms: 2,
    description: "Magnifique appartement de 3 pieces entierement renove, situe au 4eme etage avec ascenseur. Sejour lumineux donnant sur cour arboree, cuisine equipee, deux chambres avec parquet ancien. Cave et local a velos inclus.",
    address: "45 Rue de Rivoli",
    city: "Paris",
    postalCode: "75004",
    images: ["/images/properties/property-1.jpg"],
    dpe: "C",
    floor: 4,
    totalFloors: 6,
    yearBuilt: 1890,
    condition: "Renove",
    features: ["Ascenseur", "Parquet", "Cave", "Digicode"],
    heating: "Individuel gaz",
    agent: {
      name: "Marie Dupont",
      agency: "Immobilier Paris Centre",
      phone: "01 42 56 78 90",
      avatar: "",
    },
    createdAt: "2026-01-28",
    views: 234,
    isFeatured: true,
  },
  {
    id: "2",
    title: "Maison de charme avec jardin",
    type: "maison",
    transaction: "vente",
    price: 695000,
    surface: 145,
    rooms: 6,
    bedrooms: 4,
    description: "Belle maison en pierre avec jardin paysager de 500m2. Rez-de-chaussee avec grand sejour, cuisine ouverte et bureau. Etage avec 4 chambres et salle de bain. Garage double et dependance.",
    address: "12 Chemin des Vignes",
    city: "Lyon",
    postalCode: "69005",
    images: ["/images/properties/property-2.jpg"],
    dpe: "D",
    yearBuilt: 1935,
    condition: "Bon etat",
    features: ["Jardin", "Garage", "Terrasse", "Cheminee"],
    heating: "Central fioul",
    agent: {
      name: "Pierre Martin",
      agency: "Lyon Immobilier",
      phone: "04 72 34 56 78",
      avatar: "",
    },
    createdAt: "2026-01-25",
    views: 456,
    isFeatured: true,
  },
  {
    id: "3",
    title: "Penthouse avec terrasse panoramique",
    type: "appartement",
    transaction: "vente",
    price: 1250000,
    surface: 120,
    rooms: 4,
    bedrooms: 3,
    description: "Exceptionnel penthouse au dernier etage avec terrasse de 40m2 offrant une vue panoramique sur la ville. Prestations haut de gamme, domotique integree, cuisine sur mesure. Deux places de parking.",
    address: "8 Avenue Foch",
    city: "Paris",
    postalCode: "75016",
    images: ["/images/properties/property-3.jpg"],
    dpe: "B",
    floor: 8,
    totalFloors: 8,
    yearBuilt: 2020,
    condition: "Neuf",
    features: ["Terrasse", "Parking", "Domotique", "Ascenseur", "Gardien"],
    heating: "Individuel electrique",
    agent: {
      name: "Sophie Laurent",
      agency: "Prestige Immobilier",
      phone: "01 45 67 89 01",
      avatar: "",
    },
    createdAt: "2026-02-01",
    views: 789,
    isFeatured: true,
  },
  {
    id: "4",
    title: "Studio moderne quartier etudiant",
    type: "appartement",
    transaction: "location",
    price: 650,
    charges: 50,
    surface: 28,
    rooms: 1,
    bedrooms: 0,
    description: "Studio entierement meuble et equipe, ideal pour etudiant ou jeune actif. Kitchenette, salle d'eau avec douche, coin nuit separe. Proche universites et transports.",
    address: "23 Rue des Etudiants",
    city: "Bordeaux",
    postalCode: "33000",
    images: ["/images/properties/property-4.jpg"],
    dpe: "C",
    floor: 2,
    totalFloors: 4,
    yearBuilt: 2015,
    condition: "Tres bon etat",
    features: ["Meuble", "Interphone", "Double vitrage"],
    heating: "Individuel electrique",
    agent: {
      name: "Jean Moreau",
      agency: "Bordeaux Habitat",
      phone: "05 56 12 34 56",
      avatar: "",
    },
    createdAt: "2026-02-03",
    views: 123,
    isFeatured: false,
  },
  {
    id: "5",
    title: "Appartement familial avec balcon",
    type: "appartement",
    transaction: "location",
    price: 1200,
    charges: 150,
    surface: 85,
    rooms: 4,
    bedrooms: 3,
    description: "Grand appartement familial avec balcon et vue degagee. Sejour spacieux, cuisine separee equipee, trois chambres, salle de bain et WC separes. Place de parking en sous-sol.",
    address: "67 Boulevard Victor Hugo",
    city: "Nice",
    postalCode: "06000",
    images: ["/images/properties/property-5.jpg"],
    dpe: "D",
    floor: 5,
    totalFloors: 7,
    yearBuilt: 1975,
    condition: "Bon etat",
    features: ["Balcon", "Parking", "Cave", "Ascenseur"],
    heating: "Collectif gaz",
    agent: {
      name: "Isabelle Roux",
      agency: "Cote d'Azur Immo",
      phone: "04 93 45 67 89",
      avatar: "",
    },
    createdAt: "2026-02-04",
    views: 98,
    isFeatured: false,
  },
  {
    id: "6",
    title: "Loft industriel renove",
    type: "appartement",
    transaction: "vente",
    price: 380000,
    surface: 95,
    rooms: 3,
    bedrooms: 2,
    description: "Ancien atelier transforme en loft contemporain. Volumes exceptionnels avec 4m de hauteur sous plafond, murs en briques apparentes, verriere d'atelier. Cuisine ouverte design.",
    address: "15 Rue de l'Industrie",
    city: "Marseille",
    postalCode: "13002",
    images: ["/images/properties/property-6.jpg"],
    dpe: "C",
    floor: 1,
    totalFloors: 2,
    yearBuilt: 1920,
    condition: "Renove",
    features: ["Loft", "Hauteur sous plafond", "Briques", "Verriere"],
    heating: "Individuel electrique",
    agent: {
      name: "Thomas Bernard",
      agency: "Marseille Properties",
      phone: "04 91 23 45 67",
      avatar: "",
    },
    createdAt: "2026-01-30",
    views: 345,
    isFeatured: true,
  },
];

export const propertyTypes: { value: PropertyType; label: string }[] = [
  { value: "appartement", label: "Appartement" },
  { value: "maison", label: "Maison" },
  { value: "terrain", label: "Terrain" },
  { value: "local-commercial", label: "Local commercial" },
];

export const cities = [
  "Paris",
  "Lyon",
  "Marseille",
  "Bordeaux",
  "Nice",
  "Toulouse",
  "Nantes",
  "Strasbourg",
  "Montpellier",
  "Lille",
];
