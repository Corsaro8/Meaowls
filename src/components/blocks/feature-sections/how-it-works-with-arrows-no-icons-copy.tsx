"use client";

import React from "react";
import { ArrowRight } from "lucide-react";

const steps = [
  {
    step: 1,
    title: "Contattaci su WhatsApp",
    description: "Inviaci un messaggio con le tue date e le esigenze del tuo cucciolo. È veloce e facile!"
  },
  {
    step: 2,
    title: "Organizziamo un primo incontro",
    description: "Veniamo a casa tua gratuitamente per conoscere il tuo animale domestico e discutere i dettagli del servizio."
  },
  {
    step: 3,
    title: "Ti godi la tua vacanza",
    description: "Parti tranquillo sapendo che il tuo cucciolo riceverà tutte le cure e l'amore di cui ha bisogno mentre sei via."
  }
];

export const HowItWorksWithArrowsNoIconsCopy = () => {
  return (
    <div className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-heading font-bold text-gray-900 sm:text-4xl mb-4">
            Come funziona
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Prenotare il nostro servizio di pet sitting è semplice e veloce in soli 3 passaggi
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-16 md:space-y-0 md:grid md:grid-cols-3 md:gap-8">
          {steps.map((item, index) => (
            <div key={item.step} className="relative">
              {/* Step Card */}
              <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 border border-gray-100">
                {/* Step Number */}
                <div className="flex items-center justify-center w-12 h-12 bg-orange-500 text-white text-xl font-bold rounded-full mb-6">
                  {item.step}
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Arrow for desktop */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                  <div className="flex items-center justify-center w-8 h-8 bg-orange-500 rounded-full shadow-lg">
                    <ArrowRight className="w-4 h-4 text-white" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};