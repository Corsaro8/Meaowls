"use client";

import { Button } from "@/components/ui/button";
import { Smartphone, Calendar, Truck } from "lucide-react";

export const HowItWorksCleanStyle = () => {
  return (
    <section className="py-12 bg-[#FF6B35] !w-full !h-full">
      <div className="mx-auto px-4 !w-[1280px] !h-full !max-w-screen-xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 animate-in fade-in duration-700 !w-full !h-full !whitespace-pre-line">Come Funziona

          </h2>
        </div>

        {/* Three Columns */}
        <div className="grid md:grid-cols-3 gap-8 mb-10">
          
          {/* Step 1 - Crea il tuo pacco */}
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-20 h-20 flex items-center justify-center">
                <Smartphone className="w-12 h-12 text-white stroke-[2.5]" />
              </div>
            </div>
            <h3 className="text-lg font-bold text-white mb-3 uppercase">
              Crea il tuo pacco
            </h3>
            <p className="text-white text-sm leading-relaxed !whitespace-pre-line">Scegli il prodotto preferito del tuo pet, aggiungi accessori, snack e giochi per creare un'esperienza completa. Tutto su misura per le sue esigenze.

            </p>
          </div>

          {/* Step 2 - Scegli la frequenza */}
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-20 h-20 flex items-center justify-center">
                <Calendar className="w-12 h-12 text-white stroke-[2.5]" />
              </div>
            </div>
            <h3 className="text-lg font-bold text-white mb-3 uppercase">
              Scegli la frequenza
            </h3>
            <p className="text-white text-sm leading-relaxed">
              Decidi quando ricevere il pacco: ogni settimana, ogni due settimane, ogni mese o quando vuoi tu. Modifica o disdici in qualsiasi momento.
            </p>
          </div>

          {/* Step 3 - Tutto a casa tua */}
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-20 h-20 flex items-center justify-center">
                <Truck className="w-12 h-12 text-white stroke-[2.5]" />
              </div>
            </div>
            <h3 className="text-lg font-bold text-white mb-3 uppercase">
              Tutto a casa tua
            </h3>
            <p className="text-white text-sm leading-relaxed !whitespace-pre-line !whitespace-pre-line !whitespace-pre-line">Pensiamo noi a tutto! Il pacco arriva automaticamente davanti alla tua porta ad ogni scadenza, senza stress o costi aggiuntivi.

            </p>
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center mt-16 !w-full !h-9">
          <Button
            onClick={() => {
              document.getElementById('cibo-perfetto')?.scrollIntoView({ behavior: 'smooth' });
            }}
            size="sm"
            className="bg-white hover:bg-gray-100 text-[#FF6B35] font-semibold text-sm px-6 rounded-lg shadow-lg uppercase !w-[215px] !h-full">
            Scopri il piano per te
          </Button>
        </div>
      </div>
    </section>);

};