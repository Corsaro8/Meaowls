export const CommitmentSection = () => {
  return (
    <section className="relative py-16 lg:py-24 bg-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900">
            Il Nostro Impegno per te e il tuo Pet
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-600">
            Mettiamo al centro il benessere del tuo compagno a quattro zampe con un servizio
            trasparente, flessibile e davvero su misura.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-xl border border-[var(--color-border)] bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900">Qualità certificata</h3>
            <p className="mt-2 text-sm text-gray-600">
              Selezioniamo solo marche affidabili e formulazioni bilanciate, con ingredienti
              chiari e adatti alle esigenze del tuo pet.
            </p>
          </div>

          <div className="rounded-xl border border-[var(--color-border)] bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900">Piano su misura</h3>
            <p className="mt-2 text-sm text-gray-600">
              Dalla scelta del cibo alla frequenza di consegna: tutto è personalizzato
              in base a età, razza, stile di vita e preferenze.
            </p>
          </div>

          <div className="rounded-xl border border-[var(--color-border)] bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900">Assistenza dedicata</h3>
            <p className="mt-2 text-sm text-gray-600">
              Il nostro team è al tuo fianco per consigli, sostituzioni rapide e
              ottimizzazioni del piano in qualsiasi momento.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};