"use client";

import { ShoppingCart, Heart } from "lucide-react";

export const TwoMainOptions = () => {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#2D3748] mb-4 font-inter">
            Scegli il Percorso Ideale
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-inter">
            Due modi per trovare il cibo perfetto per il tuo amico a quattro zampe
          </p>
        </div>

        {/* Options Container */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {/* Option 1: Choose Food */}
          <div 
            className="text-center p-6 rounded-xl hover:bg-gray-50 transition-all duration-300 hover:shadow-lg"
          >
            <div className="w-16 h-16 bg-[#FF6B35] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <ShoppingCart className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-[#2D3748] mb-2 font-inter">
              Conosci già il suo cibo?
            </h3>
            <p className="text-[#FF6B35] font-medium mb-4 font-inter">
              Scegli tra le Migliori Marche
            </p>
            <p className="text-gray-600 leading-relaxed font-inter">
              Hai già individuato il cibo perfetto per il tuo amico? Seleziona direttamente 
              tra le nostre marche premium e attiva la consegna automatica.
            </p>
          </div>

          {/* Option 2: Consultation */}
          <div 
            className="text-center p-6 rounded-xl hover:bg-gray-50 transition-all duration-300 hover:shadow-lg"
          >
            <div className="w-16 h-16 bg-[#FF6B35] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-[#2D3748] mb-2 font-inter">
              Vuoi il meglio per lui?
            </h3>
            <p className="text-[#FF6B35] font-medium mb-4 font-inter">
              Lascia che ti Consigliamo Noi
            </p>
            <p className="text-gray-600 leading-relaxed font-inter">
              Descrivi il profilo del tuo animale e i nostri esperti selezioneranno il cibo 
              e gli integratori più adatti alle sue esigenze specifiche.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};