"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";

export const HowItWorksStepsWithChoice = () => {
  const [selectedOption, setSelectedOption] = useState<'know' | 'advice' | null>(null);

  const knowSteps = [
    {
      number: "01",
      title: "Scegli il prodotto",
      description: "Naviga tra i nostri prodotti premium e trova quello perfetto per il tuo pet."
    },
    {
      number: "02", 
      title: "Scegli la scadenza",
      description: "Scegli la scadenza: ogni settimana, ogni due, ogni tre e abbonati al servizio che si occuperà da qui in avanti del cibo del tuo pet."
    },
    {
      number: "03",
      title: "Ricevi a casa",
      description: "Spedizione rapida e sicura direttamente a casa tua con tracking completo."
    }
  ];

  const adviceSteps = [
    {
      number: "01",
      title: "Raccontaci del tuo pet",
      description: "Condividi informazioni su età, razza, dimensioni e preferenze del tuo animale."
    },
    {
      number: "02",
      title: "Ricevi consigli personalizzati", 
      description: "I nostri esperti analizzano le tue informazioni e creano raccomandazioni su misura."
    },
    {
      number: "03", 
      title: "Scopri la soluzione perfetta",
      description: "Ricevi prodotti selezionati specificamente per il benessere del tuo pet."
    }
  ];

  const currentSteps = selectedOption === 'advice' ? adviceSteps : knowSteps;

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Titolo e sottotitolo */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#2D3748] mb-4 font-[Inter]">Come funziona</h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto font-[Inter]">Semplice, veloce e pensato per te e il tuo pet</p>
        </div>

        {/* Bottoni scelta */}
        <div className="flex flex-col md:flex-row gap-6 justify-center items-center mb-12">
          <button
            onClick={() => setSelectedOption('know')}
            className={`w-full md:w-auto px-8 py-5 rounded-full text-lg font-bold font-[Inter] transition-all duration-200 border-0 focus:outline-none focus:ring-4 scale-105 hover:scale-110 shadow-lg ${selectedOption === 'know' ? 'bg-[#FF6B35] text-white focus:ring-[#FF6B35]/30' : 'bg-[#FF6B35] text-white hover:bg-[#e55a2b] focus:ring-[#FF6B35]/10'}`}
            style={{ boxShadow: '0 4px 32px 0 rgba(255,107,53,0.10)' }}
          >
            So già cosa voglio
          </button>
          <button
            onClick={() => setSelectedOption('advice')}
            className={`w-full md:w-auto px-8 py-5 rounded-full text-lg font-bold font-[Inter] transition-all duration-200 border-0 focus:outline-none focus:ring-4 scale-105 hover:scale-110 shadow-lg ${selectedOption === 'advice' ? 'bg-[#2D3748] text-white focus:ring-[#2D3748]/30' : 'bg-[#2D3748] text-white hover:bg-[#111827] focus:ring-[#2D3748]/10'}`}
            style={{ boxShadow: '0 4px 32px 0 rgba(45,55,72,0.10)' }}
          >
            Voglio consigli personalizzati
          </button>
        </div>

        {selectedOption && (
          <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16">
            {currentSteps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 w-80 h-64 flex flex-col justify-center text-center border-2 border-[#FF6B35]/10">
                  <div className="mb-6">
                    <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-[#FF6B35] to-[#FF934F] flex items-center justify-center shadow-lg">
                      <span className="text-2xl font-bold text-white">
                        {step.number}
                      </span>
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-[#2D3748] mb-4 font-[Inter]">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed font-[Inter]">
                    {step.description}
                  </p>
                </div>
                {index < currentSteps.length - 1 && (
                  <div className="hidden lg:block mx-8">
                    <ArrowRight className="w-8 h-8 text-[#FF6B35]" />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Messaggio default se non selezionato nulla */}
        {!selectedOption && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-500 font-[Inter]">
              Scegli una delle opzioni qui sopra per vedere i diversi passaggi
            </p>
          </div>
        )}
      </div>
    </section>
  );
};