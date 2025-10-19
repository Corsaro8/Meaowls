"use client";

import React from 'react';
import { Card } from "@/components/ui/card";

const steps = [
  {
    number: 1,
    title: "Crea il tuo pacco personalizzato",
    description: "Scegli tra una vasta selezione di prodotti per cani e gatti, personalizza il tuo pacco in base alle esigenze del tuo amico a quattro zampe.",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/d1111b7e-c722-4451-bcb9-81243c18f800/generated_images/simple-flat-icon-illustration-of-a-custo-4a9d4062-20250714145334.jpg",
    bgGradient: "from-blue-50 to-blue-100",
    numberColor: "text-blue-600"
  },
  {
    number: 2,
    title: "Decidi la frequenza e abbonati",
    description: "Scegli la scadenza: ogni settimana, ogni due, ogni tre e abbonati al servizio che si occuperà da qui in avanti del cibo del tuo pet.",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/d1111b7e-c722-4451-bcb9-81243c18f800/generated_images/simple-flat-icon-illustration-of-a-calen-2749c913-20250714145342.jpg",
    bgGradient: "from-green-50 to-green-100",
    numberColor: "text-green-600"
  },
  {
    number: 3,
    title: "Ricevi tutto a casa tua",
    description: "I tuoi prodotti arrivano direttamente alla tua porta, confezionati con cura e pronti per rendere felice il tuo animale domestico.",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/d1111b7e-c722-4451-bcb9-81243c18f800/generated_images/simple-flat-icon-illustration-of-a-house-0fba070e-20250714145351.jpg",
    bgGradient: "from-purple-50 to-purple-100",
    numberColor: "text-purple-600"
  }
];

export const HowItWorksThreeSteps = () => {
  return (
    <section className="w-full py-16 bg-gradient-to-b from-gray-50 to-white font-inter">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <div key={step.number} className="relative group">
              {/* Connecting line (desktop only) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-20 left-full w-full h-0.5 bg-gradient-to-r from-gray-200 to-gray-100 z-0 transform translate-x-6"></div>
              )}
              
              <Card className="relative z-10 p-8 text-center bg-white hover:shadow-lg transition-all duration-300 hover:scale-105 rounded-xl border border-gray-100">
                {/* Step number with colored background */}
                <div className={`w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br ${step.bgGradient} flex items-center justify-center shadow-sm`}>
                  <span className={`text-3xl font-bold ${step.numberColor}`}>
                    {step.number}
                  </span>
                </div>

                {/* Step image */}
                <div className="mb-6">
                  <img 
                    src={step.image} 
                    alt={step.title}
                    className="w-24 h-24 mx-auto rounded-full object-cover shadow-md hover:shadow-lg transition-shadow duration-300"
                  />
                </div>

                {/* Step content */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-900 leading-tight">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    {step.description}
                  </p>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksThreeSteps;