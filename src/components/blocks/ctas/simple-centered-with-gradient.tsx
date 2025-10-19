export default function SimpleCenteredWithGradient() {
    return (
      <div className="relative isolate overflow-hidden bg-gradient-to-br from-[#FF6B35] to-white">
        <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-4xl font-semibold tracking-tight text-balance text-white sm:text-5xl font-[var(--font-inter)]">
              Inizia oggi il tuo abbonamento
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg/8 text-pretty text-white/90 font-[var(--font-inter)]">
              I tuoi amici a quattro zampe meritano il meglio. Consegna gratuita per il primo ordine.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="#"
                className="rounded-md bg-white/15 px-3.5 py-2.5 text-sm font-semibold text-white inset-ring inset-ring-white/5 hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white font-[var(--font-inter)]"
              >
                Inizia l'abbonamento
              </a>
              <a href="#" className="text-sm/6 font-semibold text-white hover:text-white/80 font-[var(--font-inter)]">
                Scopri di più <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
        <svg
          viewBox="0 0 1024 1024"
          aria-hidden="true"
          className="absolute top-1/2 left-1/2 -z-10 size-256 -translate-x-1/2 mask-[radial-gradient(closest-side,white,transparent)]"
        >
          <circle r={512} cx={512} cy={512} fill="url(#8d958450-c69f-4251-94bc-4e091a323369)" fillOpacity="0.7" />
          <defs>
            <radialGradient id="8d958450-c69f-4251-94bc-4e091a323369">
              <stop stopColor="#FF6B35" />
              <stop offset={1} stopColor="#FFFFFF" />
            </radialGradient>
          </defs>
        </svg>
      </div>
    )
  }