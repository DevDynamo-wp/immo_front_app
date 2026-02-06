import type { Metadata } from "next";
import { ProfileForm } from "@/components/profile-form";

export const metadata: Metadata = {
  title: "Mon profil",
};

export default function ProfilPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Mon profil</h1>
        <p className="mt-1 text-sm text-muted-foreground">Gerez vos informations personnelles et vos coordonnees</p>
      </div>
      <ProfileForm />
    </div>
  );
}
