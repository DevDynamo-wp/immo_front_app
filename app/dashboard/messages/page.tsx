import type { Metadata } from "next";
import { UserIcon, MailIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Messagerie",
};

const conversations = [
  {
    id: 1,
    name: "Jean Moreau",
    lastMessage: "Bonjour, l'appartement est-il toujours disponible ? Je souhaiterais organiser une visite.",
    time: "Il y a 2h",
    unread: 2,
    property: "Appartement lumineux au coeur de Paris",
  },
  {
    id: 2,
    name: "Sophie Laurent",
    lastMessage: "Merci pour votre reponse. Serait-il possible de visiter samedi matin ?",
    time: "Il y a 5h",
    unread: 1,
    property: "Penthouse avec terrasse panoramique",
  },
  {
    id: 3,
    name: "Pierre Martin",
    lastMessage: "Parfait, merci pour les informations complementaires sur les charges.",
    time: "Hier",
    unread: 0,
    property: "Maison de charme avec jardin",
  },
  {
    id: 4,
    name: "Isabelle Roux",
    lastMessage: "Le DPE a-t-il ete realise recemment ?",
    time: "Il y a 3 jours",
    unread: 0,
    property: "Studio moderne quartier etudiant",
  },
];

export default function MessagesPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Messagerie</h1>
        <p className="mt-1 text-sm text-muted-foreground">{conversations.length} conversation(s)</p>
      </div>

      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <div className="divide-y divide-border">
          {conversations.map((conv) => (
            <button
              key={conv.id}
              className="flex w-full items-start gap-4 px-5 py-4 text-left transition-colors hover:bg-secondary/50"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                <UserIcon className="h-5 w-5 text-primary" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="mb-0.5 flex items-center justify-between gap-2">
                  <p className={`text-sm ${conv.unread > 0 ? "font-semibold text-foreground" : "font-medium text-foreground"}`}>
                    {conv.name}
                  </p>
                  <span className="shrink-0 text-xs text-muted-foreground">{conv.time}</span>
                </div>
                <p className="mb-1 text-xs text-primary">{conv.property}</p>
                <p className={`truncate text-sm ${conv.unread > 0 ? "text-foreground" : "text-muted-foreground"}`}>
                  {conv.lastMessage}
                </p>
              </div>
              {conv.unread > 0 && (
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
                  {conv.unread}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {conversations.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-card py-20 text-center">
          <MailIcon className="mb-4 h-12 w-12 text-muted-foreground/50" />
          <h3 className="mb-2 text-lg font-semibold text-foreground">Aucun message</h3>
          <p className="max-w-sm text-sm text-muted-foreground">
            Vos conversations avec les autres utilisateurs apparaitront ici.
          </p>
        </div>
      )}
    </div>
  );
}
