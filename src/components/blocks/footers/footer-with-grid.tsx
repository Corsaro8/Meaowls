import { cn } from "@/lib/utils";
import { Heart } from "lucide-react";
import Link from "next/link";
import React from "react";

export function FooterWithGrid() {
  return (
    <div className="bg-secondary dark:bg-card">
      <div className="w-full px-4 py-6">
        <div className="border-b border-border pb-2 dark:border-muted">
          <div className="mb-10 max-w-xl">
            <Logo className="justify-start" />
            <p className="mb-4 text-sm text-muted-foreground font-[var(--font-inter)]">
              Il delivery per i tuoi amici a quattro zampe. Consegne rapide di cibo di qualità per cani e gatti, direttamente a casa tua.
            </p>
            <div className="text-sm text-foreground/70 font-[var(--font-inter)]">
              Un servizio con{" "}
              <Heart className="inline h-4 w-4 text-primary" />{" "}
              per i tuoi animali domestici
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-10 border-b border-border pb-10 pt-10 md:grid-cols-4 dark:border-muted">
          <ul className="text-base font-medium text-foreground font-[var(--font-inter)]">
            <li className="mb-4 text-sm font-bold text-foreground">
              Servizio
            </li>
            {SERVIZIO.map((item, idx) => (
              <li key={"servizio" + idx} className="mb-4 text-sm font-normal">
                <Link
                  href={item.href}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="text-base font-medium text-foreground font-[var(--font-inter)]">
            <li className="mb-4 text-sm font-bold text-foreground">
              Supporto
            </li>
            {SUPPORTO.map((item, idx) => (
              <li key={"supporto" + idx} className="mb-4 text-sm font-normal">
                <Link
                  href={item.href}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="text-base font-medium text-foreground font-[var(--font-inter)]">
            <li className="mb-4 text-sm font-bold text-foreground">
              Azienda
            </li>
            {AZIENDA.map((item, idx) => (
              <li key={"azienda" + idx} className="mb-4 text-sm font-normal">
                <Link
                  href={item.href}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="text-base font-medium text-foreground font-[var(--font-inter)]">
            <li className="mb-4 text-sm font-bold text-foreground">
              Prodotti
            </li>
            {PRODOTTI.map((item, idx) => (
              <li key={"prodotti" + idx} className="mb-4 text-sm font-normal">
                <Link
                  href={item.href}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <p className="mb-4 pt-10 text-sm text-muted-foreground font-[var(--font-inter)]">
          &copy; {new Date().getFullYear()} meaowls. Tutti i diritti riservati.
        </p>
      </div>
    </div>
  );
}

const SERVIZIO = [
  { title: "Come funziona", href: "/come-funziona" },
  { title: "Abbonamenti", href: "/abbonamenti" },
  { title: "Consegne", href: "/consegne" },
  { title: "Zone di consegna", href: "/zone-consegna" },
];

const SUPPORTO = [
  { title: "FAQ", href: "/faq" },
  { title: "Contattaci", href: "/contatti" },
  { title: "Resi", href: "/resi" },
  { title: "Centro assistenza", href: "/assistenza" },
];

const AZIENDA = [
  { title: "Chi siamo", href: "/chi-siamo" },
  { title: "Lavora con noi", href: "/lavora-con-noi" },
  { title: "Privacy", href: "/privacy" },
  { title: "Termini e condizioni", href: "/termini" },
];

const PRODOTTI = [
  { title: "Cibo per cani", href: "/prodotti?animal=cane" },
  { title: "Cibo per gatti", href: "/prodotti?animal=gatto" },
  { title: "Marche", href: "/marche" },
  { title: "Snack e premi", href: "/prodotti?category=Snack" },
  { title: "Accessori", href: "/prodotti?category=Giochi" },
];

const Logo = ({ className }: { className?: string }) => {
  return (
    <Link
      href="/"
      className={cn(
        "flex flex-shrink-0 items-center justify-center space-x-2 py-6 text-center text-2xl font-bold text-foreground selection:bg-primary/20 font-[var(--font-inter)]",
        className
      )}
    >
      <div className="relative flex h-8 w-8 items-center justify-center rounded-md bg-primary text-sm text-primary-foreground antialiased md:h-6 md:w-6">
        <div className="absolute inset-x-0 -top-10 h-10 w-full rounded-full bg-primary/20 blur-xl" />
        <div className="relative z-20 text-sm">
          <Heart className="h-4 w-4" />
        </div>
      </div>
      <div className="flex items-center gap-2 font-[var(--font-inter)] text-xl text-foreground">
        meaowls
      </div>
    </Link>
  );
};