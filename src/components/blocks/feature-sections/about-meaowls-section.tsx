"use client";

import Image from "next/image";

export const AboutMeaowlsSection = () => {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto flex flex-col gap-10">
        {/* Nuovo Titolo */}
        <h2 className="text-3xl lg:text-4xl font-bold text-[#2D3748] leading-tight text-center mb-4">
          Cosa è <span style={{ color: '#FF6B35' }}>Meaowls</span>
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image Column */}
          <div className="order-2 lg:order-1">
            <div className="relative w-full h-96 lg:h-[500px] rounded-lg overflow-hidden shadow-lg">
              <Image
                src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/1752673132414-h3tt9bsk6a.jpg"
                alt="Cani e gatti felici"
                fill
                className="object-cover transition-transform duration-300 hover:scale-105"
                priority
              />
            </div>
          </div>

          {/* Content Column: testo introduttivo aggiornato */}
          <div className="order-1 lg:order-2 space-y-6">
            <div className="text-lg text-[#2D3748] leading-relaxed">
              <p className="mb-0">
                <span style={{ color: '#FF6B35', fontWeight: 600 }}>Meaowls</span> è il primo servizio in Italia che ti consegna ogni mese tutto il necessario per prenderti cura del tuo amico a 4 zampe senza correre al supermercato all'ultimo momento o renderti conto che hai finito le scorte.
              </p>
            </div>
          </div>
        </div>
        {/* Elenco puntato sotto il contenuto principale */}
        <div className="max-w-2xl mx-auto mt-8">
          <ul className="list-disc list-inside space-y-3 text-[#2D3748] text-base lg:text-lg">
            <li>Ricevi a casa solo cibo di qualità premium per cani e gatti</li>
            <li>Offriamo le migliori marche come Purina, Monge, Almo Nature</li>
            <li>Se non sai cosa scegliere o vuoi un consiglio, compila il questionario e ti forniremo raccomandazioni in base alle esigenze del tuo amico a 4 zampe</li>
            <li>Assistenza dedicata e consegne sempre puntuali</li>
          </ul>
        </div>
      </div>
    </section>
  );
};