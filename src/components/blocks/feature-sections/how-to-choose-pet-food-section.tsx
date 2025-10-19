import { PawPrint, HeartPulse, UtensilsCrossed, Stethoscope } from "lucide-react";

export const HowToChoosePetFoodSection = () => {
  return (
    <section className="relative py-12 lg:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 lg:mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold tracking-tight">Come Scegliere il Cibo Perfetto per il Tuo Amico</h2>
          <p className="mt-3 text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto">
            Segui questi semplici passi per individuare l'alimentazione più adatta alle esigenze uniche del tuo cane o del tuo gatto.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-[var(--color-secondary)] text-[var(--color-foreground)] p-2 rounded-xl">
                <PawPrint className="h-5 w-5" />
              </div>
              <h3 className="font-semibold">Profilo del tuo Pet</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Considera età, taglia, livello di attività e stato di sterilizzazione: sono la base per definire il fabbisogno energetico.
            </p>
          </div>

          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-[var(--color-secondary)] text-[var(--color-foreground)] p-2 rounded-xl">
                <HeartPulse className="h-5 w-5" />
              </div>
              <h3 className="font-semibold">Esigenze e Obiettivi</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Supporto digestivo, controllo del peso, pelo e pelle, articolazioni: scegli ricette mirate agli obiettivi di benessere.
            </p>
          </div>

          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-[var(--color-secondary)] text-[var(--color-foreground)] p-2 rounded-xl">
                <UtensilsCrossed className="h-5 w-5" />
              </div>
              <h3 className="font-semibold">Preferenze e Sensibilità</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Valuta gusto e texture preferiti e verifica intolleranze o allergie (es. cereali, proteine specifiche) per evitare fastidi.
            </p>
          </div>

          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-[var(--color-secondary)] text-[var(--color-foreground)] p-2 rounded-xl">
                <Stethoscope className="h-5 w-5" />
              </div>
              <h3 className="font-semibold">Consiglio dell'Esperto</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              In caso di patologie o dubbi, confrontati con il veterinario. I nostri specialisti possono guidarti nella scelta.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};