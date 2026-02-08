import type { Metadata } from "next";
import { AdminListingsContent } from "@/components/admin-listings-content";

export const metadata: Metadata = {
  title: "Gestion des annonces",
};

export default function AdminListingsPage() {
  return <AdminListingsContent />;
}
