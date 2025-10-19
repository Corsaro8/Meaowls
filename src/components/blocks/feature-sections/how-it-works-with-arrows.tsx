"use client";

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronRight } from 'lucide-react';

interface StepData {
  number: number;
  title: string;
  description: string;
}

export const HowItWorksWithArrows: React.FC = () => {
  const steps: StepData[] = [
    {
      number: 1,
      title: "Crea il tuo pacco personalizzato",
      description: "Scegli tra oltre 100 prodotti di qualità per il tuo amico a quattro zampe. Crocchette, snack, giochi e accessori: tutto quello che serve per rendere felice il tuo pet."
    },
    {
      number: 2,
      title: "Decidi la frequenza e abbonati",
      description: "Scegli ogni quanto ricevere il tuo pacco: mensile, bimestrale o trimestrale. Puoi modificare, saltare o cancellare il tuo abbonamento in qualsiasi momento."
    },
    {
      number: 3,
      title: "Ricevi tutto a casa tua",
      description: "Il tuo pacco personalizzato arriva direttamente a casa tua, quando vuoi tu. Niente più code, niente più dimenticanze: tutto quello che serve per il tuo pet è sempre a portata di mano."
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#2D3748] mb-4 font-inter">
            Come funziona
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-inter">
            Il tuo pacco personalizzato in 3 semplici passaggi
          </p>
        </div>

        {/* Steps */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-6 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <React.Fragment key={step.number}>
              <div className="flex-1 w-full max-w-sm">
                <Card className="h-full border-2 border-gray-200 hover:border-[#FF6B35] transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 bg-white">
                  <CardContent className="p-8 text-center">
                    {/* Number Circle */}
                    <div className="w-16 h-16 bg-[#FF6B35] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                      <span className="text-2xl font-bold text-white font-inter">
                        {step.number}
                      </span>
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-xl font-semibold text-[#2D3748] mb-4 font-inter">
                      {step.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-gray-600 leading-relaxed font-inter">
                      {step.description}
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Arrow (only between steps and only on desktop) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:flex items-center justify-center">
                  <ChevronRight className="w-8 h-8 text-[#FF6B35] animate-pulse" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};