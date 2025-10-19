import Image from 'next/image';

export function ProblemSectionTwoColumns() {
  return (
    <section className="py-16 bg-gradient-to-b from-orange-50 to-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Left Column - Context */}
          <div className="bg-[#F5E6D3] rounded-3xl p-8 lg:p-12 flex items-center">
            <div>
              <p className="text-gray-700 text-lg leading-relaxed font-['Poppins',sans-serif]">
                Un numero significativo di famiglie italiane possiede cani e gatti.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed mt-4 font-['Poppins',sans-serif]">
                Questo significa che potenzialmente molte persone si trovano in una situazione in cui dover gestire l'acquisto del cibo per il proprio animale.
              </p>
            </div>
          </div>

          {/* Right Column - Problem */}
          <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-lg border-2 border-orange-100">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#8B4513] mb-6 font-['Poppins',sans-serif]">
              Il problema
            </h2>
            
            <div className="space-y-6 mb-8">
              <p className="text-gray-700 leading-relaxed font-['Poppins',sans-serif]">
                <span className="font-semibold">Troppe opzioni, poco tempo:</span> c'è la difficoltà di trovare prodotti specifici e di qualità per il proprio animale domestico. 
              </p>
              
              <p className="text-gray-700 leading-relaxed font-['Poppins',sans-serif]">
                La vita moderna è spesso frenetica e piena di impegni, il che non si adatta perfettamente alle esigenze di salute e alle preferenze del nostro amico peloso.
              </p>
            </div>

            {/* Dog Image */}
            <div className="relative w-full h-48 lg:h-64">
              <Image 
                src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=800&auto=format&fit=crop"
                alt="Cane sdraiato"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}