"use client";

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

export const HowItWorksDuplicate = () => {
  const steps = [
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
    <section className="py-20 bg-gradient-to-br from-orange-50 via-white to-orange-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Come funziona?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Te lo spieghiamo in tre semplici passaggi
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <Card 
              key={step.number}
              className="relative group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-white/80 backdrop-blur-sm border-0 shadow-lg"
            >
              <CardContent className="p-8">
                <div className="flex flex-col items-center text-center">
                  <div className="mb-6 relative">
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                      {step.number}
                    </div>
                    <div className="absolute -inset-2 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full opacity-20 scale-0 group-hover:scale-100 transition-all duration-300"></div>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-orange-600 transition-colors duration-300">
                    {step.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-4 text-gray-400">
            <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-orange-300"></div>
            <span className="text-sm font-medium">Semplice e veloce</span>
            <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-orange-300"></div>
          </div>
        </div>
      </div>
    </section>
  );
};