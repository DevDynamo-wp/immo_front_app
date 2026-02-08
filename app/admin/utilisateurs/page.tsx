import type { Metadata } from "next";
import { AdminUsersContent } from "@/components/admin-users-content";

export const metadata: Metadata = {
  title: "Gestion des utilisateurs",
};

export default function AdminUsersPage() {
  return <AdminUsersContent />;
}
