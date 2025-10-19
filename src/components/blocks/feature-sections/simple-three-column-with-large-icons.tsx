import { Truck, Heart, Award } from 'lucide-react'

const features = [
  {
    name: 'Consegna Comoda',
    description:
      'Ricevi il cibo per il tuo amico a quattro zampe direttamente a casa tua. Consegna veloce e sicura, senza stress per te e il tuo pet.',
    href: '#',
    icon: Truck,
  },
  {
    name: 'Cibo di Qualità',
    description:
      'Solo i migliori marchi premium per garantire una nutrizione completa e bilanciata. Ingredienti selezionati per la salute del tuo pet.',
    href: '#',
    icon: Award,
  },
  {
    name: 'Personalizzato',
    description:
      'Ogni pet è unico. Creiamo un piano nutrizionale personalizzato basato su età, razza, peso e preferenze del tuo amico peloso.',
    href: '#',
    icon: Heart,
  },
]

export default function SimpleThreeColumnWithLargeIcons() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          {/* Titolo rimosso su richiesta */}
          <p className="mt-6 text-lg/8 text-[#2D3748] font-[var(--font-inter)]">
            Scopri i vantaggi del nostro servizio di consegna cibo per animali domestici, pensato per prendersi cura del tuo pet nel migliore dei modi.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col">
                <dt className="text-base/7 font-semibold text-[#2D3748] font-[var(--font-inter)]">
                  <div className="mb-6 flex size-10 items-center justify-center rounded-lg bg-[#FF6B35]">
                    <feature.icon aria-hidden="true" className="size-6 text-white" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-1 flex flex-auto flex-col text-base/7 text-[#2D3748] font-[var(--font-inter)]">
                  <p className="flex-auto">{feature.description}</p>
                  <p className="mt-6">
                    <a href={feature.href} className="text-sm/6 font-semibold text-[#FF6B35] hover:text-[#e55a2b] font-[var(--font-inter)]">
                      Scopri di più <span aria-hidden="true">→</span>
                    </a>
                  </p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}