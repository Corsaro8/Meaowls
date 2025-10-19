"use client";

import { PawPrint, Handshake, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

interface StepCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  stepNumber: number;
}

const StepCard = ({ icon, title, description, stepNumber }: StepCardProps) => (
  <div className="relative group">
    <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="relative">
          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center group-hover:bg-orange-200 transition-colors duration-300">
            <div className="text-orange-600 w-8 h-8">
              {icon}
            </div>
          </div>
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-orange-600 text-white text-xs font-semibold rounded-full flex items-center justify-center">
            {stepNumber}
          </div>
        </div>
        
        <div className="space-y-2">
          <h3 className="font-semibold text-xl text-gray-900 group-hover:text-orange-600 transition-colors duration-300">
            {title}
          </h3>
          <p className="text-gray-600 leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
  </div>
);

export const HowItWorksPetProfileSection = () => {
  const steps = [
    {
      icon: <PawPrint className="w-full h-full" />,
      title: "Descrivi il profilo del tuo pet",
      description: "Razza, età, peso, sensibilità, intolleranze, allergie, storia clinica: il nostro team analizza ogni dettaglio per offrirti un consiglio nutrizionale davvero personalizzato."
    },
    {
      icon: <Handshake className="w-full h-full" />,
      title: "Ricevi la nostra proposta",
      description: "In base alle informazioni del tuo pet, ti proponiamo una selezione di prodotti specificamente studiati per le sue esigenze nutrizionali e di salute."
    },
    {
      icon: <ShoppingCart className="w-full h-full" />,
      title: "Personalizza e ordina con facilità",
      description: "Modifica le quantità, scegli la frequenza di consegna e completa il tuo ordine. La nutrizione perfetta per il tuo pet è a portata di clic."
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-orange-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">
            <span className="text-orange-600">Come funziona</span>{" "}
            <span className="text-gray-900">per il tuo pet</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Tre semplici passaggi per garantire al tuo amico a quattro zampe una nutrizione su misura
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {steps.map((step, index) => (
            <StepCard
              key={index}
              icon={step.icon}
              title={step.title}
              description={step.description}
              stepNumber={index + 1}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button 
            size="lg" 
            className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <PawPrint className="w-5 h-5 mr-2" />
            Descrivi il profilo del tuo pet
          </Button>
        </div>
      </div>
    </section>
  );
};