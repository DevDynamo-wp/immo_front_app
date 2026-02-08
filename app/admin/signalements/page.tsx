import type { Metadata } from "next";
import { AdminReportsContent } from "@/components/admin-reports-content";

export const metadata: Metadata = {
  title: "Signalements",
};

export default function AdminReportsPage() {
  return <AdminReportsContent />;
}
