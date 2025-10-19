"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const HowItWorksWithArrowsNoIcons = () => {
  return (
    <section className="py-8 bg-gradient-to-b from-white to-slate-50 overflow-hidden relative">
      <div className="w-full px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6">
            Come Funziona
          </h2>
          <p className="text-xl text-slate-600 mx-auto max-w-3xl">
            Inizia subito con Meaowls in 3 semplici passaggi
          </p>
        </div>

        {/* Steps - New Layout: Floating 3D Cards with Different Elevations */}
        <div className="relative perspective-1000">
          <div className="grid md:grid-cols-3 gap-8 md:gap-16 w-full">
            
            {/* Step 1 - Floating High */}
            <div className="relative transform md:-translate-y-8 hover:translate-y-0 transition-all duration-700 ease-out">
              <div className="bg-white p-8 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 border-l-4 border-blue-500 transform hover:scale-110 hover:-rotate-1 relative z-20">
                {/* Floating shadow */}
                <div className="absolute inset-0 bg-blue-100 rounded-3xl -z-10 transform translate-x-2 translate-y-2 opacity-50"></div>
                
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full font-bold text-2xl mb-8 shadow-lg transform -translate-y-4">
                  1
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-6">
                  Crea il tuo pacco
                </h3>
                <p className="text-slate-600 leading-relaxed text-lg">
                  Scegli il prodotto preferito del tuo pet, aggiungi accessori, snack e giochi per creare un'esperienza completa. Tutto su misura per le sue esigenze.
                </p>
              </div>
            </div>

            {/* Step 2 - Floating Middle */}
            <div className="relative transform md:translate-y-4 hover:translate-y-0 transition-all duration-700 ease-out">
              <div className="bg-white p-8 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 border-l-4 border-green-500 transform hover:scale-110 hover:rotate-1 relative z-10">
                {/* Floating shadow */}
                <div className="absolute inset-0 bg-green-100 rounded-3xl -z-10 transform translate-x-3 translate-y-3 opacity-50"></div>
                
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full font-bold text-2xl mb-8 shadow-lg transform -translate-y-4">
                  2
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-6">
                  Scegli la frequenza
                </h3>
                <p className="text-slate-600 leading-relaxed text-lg">
                  Decidi quando ricevere il pacco: ogni settimana, ogni due, ogni mese o qando vuoi tu. Flessibile e adattabile al tuo stile di vita. Modifica o disdici quando vuoi.
                </p>
              </div>
            </div>

            {/* Step 3 - Floating Low */}
            <div className="relative transform md:-translate-y-4 hover:translate-y-0 transition-all duration-700 ease-out">
              <div className="bg-white p-8 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 border-l-4 border-purple-500 transform hover:scale-110 hover:-rotate-1 relative z-30">
                {/* Floating shadow */}
                <div className="absolute inset-0 bg-purple-100 rounded-3xl -z-10 transform translate-x-1 translate-y-1 opacity-50"></div>
                
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-full font-bold text-2xl mb-8 shadow-lg transform -translate-y-4">
                  3
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-6">
                  Tutto a casa tua
                </h3>
                <p className="text-slate-600 leading-relaxed text-lg">
                  Pensiamo noi a tutto! Il pacco arriva automaticamente davanti alla tua porta ad ogni scadenza, senza stress o costi aggiuntivi.
                </p>
              </div>
            </div>
          </div>

          {/* Floating arrows between cards - Hidden on mobile */}
          <div className="hidden md:block">
            <ArrowRight className="absolute top-1/2 left-1/3 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-blue-400 animate-pulse opacity-70" />
            <ArrowRight className="absolute top-1/2 left-2/3 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-green-400 animate-pulse opacity-70" />
          </div>

          {/* Background decorative elements */}
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full opacity-20 blur-2xl"></div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-gradient-to-br from-green-200 to-blue-200 rounded-full opacity-20 blur-2xl"></div>
        </div>

        {/* Frase dopo gli step */}
        <div className="text-center mt-16">
          <p className="text-lg md:text-xl text-gray-700 mx-auto max-w-3xl mb-8">
            Con Meaowls, trasformiamo quella che spesso è una preoccupazione ricorrente in una tranquillità
          </p>
          
          {/* Pulsante INIZIA grande */}
          <Button 
            onClick={() => {
              document.getElementById('cibo-perfetto')?.scrollIntoView({ behavior: 'smooth' });
            }}
            size="lg"
            className="bg-[#FF6B35] hover:bg-[#FF6B35]/90 text-white font-bold text-2xl px-16 py-8 rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300"
          >
            INIZIA
          </Button>
        </div>
      </div>
    </section>
  );
};