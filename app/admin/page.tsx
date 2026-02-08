import type { Metadata } from "next";
import { AdminDashboardContent } from "@/components/admin-dashboard-content";

export const metadata: Metadata = {
  title: "Tableau de bord Admin",
};

export default function AdminDashboardPage() {
  return <AdminDashboardContent />;
}
