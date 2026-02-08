import type { Metadata } from "next";
import { AdminSidebar } from "@/components/admin-sidebar";
import { AdminMobileHeader } from "@/components/admin-mobile-header";

export const metadata: Metadata = {
  title: {
    default: "Administration | ImmoMarket",
    template: "%s | Admin ImmoMarket",
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-muted/30">
      <AdminSidebar />
      <AdminMobileHeader />
      <main className="lg:pl-64">
        <div className="mx-auto max-w-7xl px-4 py-6 lg:px-8 lg:py-8">
          {children}
        </div>
      </main>
    </div>
  );
}
