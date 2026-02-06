import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { DashboardSidebar } from "@/components/dashboard-sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <div className="mx-auto flex max-w-7xl gap-8 px-4 py-8 lg:px-8">
        <DashboardSidebar />
        <main className="min-w-0 flex-1">{children}</main>
      </div>
      <Footer />
    </>
  );
}
