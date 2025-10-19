"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Package, Calendar, Home } from "lucide-react";

export const HowItWorksSimilar = () => {
  const steps = [
    {
      number: 1,
      title: "Crea il tuo pacco personalizzato",
      description: "Scegli la marca che compri abitualmente per il tuo pet. Il pacco può essere personalizzato aggiungendo accessori, snacks e giochi per rendere ancora più felice il tuo amico a quattro zampe.",
      icon: Package,
    },
    {
      number: 2,
      title: "Decidi la frequenza e abbonati",
      description: "Scegli la scadenza: ogni settimana, ogni due, ogni tre e abbonati al servizio che si occuperà da qui in avanti del cibo del tuo pet.",
      icon: Calendar,
    },
    {
      number: 3,
      title: "Ricevi tutto a casa tua",
      description: "Pensiamo noi a spedire e a far arrivare il pacco ad ogni scadenza impostata, direttamente davanti alla porta di casa tua. Semplice, comodo e puntuale.",
      icon: Home,
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#2D3748] mb-4">
            Come funziona
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Il tuo pacco personalizzato in 3 semplici passaggi
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          {/* Desktop Timeline */}
          <div className="hidden lg:block">
            <div className="relative">
              {/* Horizontal connecting line */}
              <div className="absolute top-20 left-[8%] right-[8%] h-0.5 bg-gradient-to-r from-[#FF6B35] via-[#FF6B35] to-[#FF6B35] opacity-20"></div>
              
              <div className="grid grid-cols-3 gap-8">
                {steps.map((step, index) => (
                  <div
                    key={step.number}
                    className="relative group"
                  >
                    {/* Step number circle */}
                    <div className="flex justify-center mb-6">
                      <div className="relative">
                        <div className="w-16 h-16 bg-[#FF6B35] rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg transform transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl">
                          {step.number}
                        </div>
                        {/* Pulse animation */}
                        <div className="absolute inset-0 w-16 h-16 bg-[#FF6B35] rounded-full animate-pulse opacity-20 scale-125"></div>
                      </div>
                    </div>

                    {/* Card */}
                    <Card className="h-full transform transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-xl border-2 border-transparent group-hover:border-[#FF6B35]/20">
                      <CardContent className="p-6 text-center">
                        <div className="mb-4 flex justify-center">
                          <div className="w-12 h-12 bg-[#FF6B35]/10 rounded-full flex items-center justify-center transform transition-all duration-300 group-hover:bg-[#FF6B35]/20">
                            <step.icon className="w-6 h-6 text-[#FF6B35]" />
                          </div>
                        </div>
                        <h3 className="text-xl font-semibold text-[#2D3748] mb-3">
                          {step.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                          {step.description}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Accordion Style */}
          <div className="lg:hidden space-y-4">
            {steps.map((step, index) => (
              <Card
                key={step.number}
                className="overflow-hidden transform transition-all duration-300 hover:shadow-lg border-l-4 border-l-[#FF6B35]"
              >
                <CardContent className="p-0">
                  <div className="flex items-start p-6">
                    {/* Step number and icon */}
                    <div className="flex-shrink-0 mr-4">
                      <div className="w-12 h-12 bg-[#FF6B35] rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md">
                        {step.number}
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-center mb-3">
                        <step.icon className="w-5 h-5 text-[#FF6B35] mr-2" />
                        <h3 className="text-lg font-semibold text-[#2D3748]">
                          {step.title}
                        </h3>
                      </div>
                      <p className="text-gray-600 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                  
                  {/* Progress indicator */}
                  <div className="h-1 bg-gray-100">
                    <div 
                      className="h-1 bg-gradient-to-r from-[#FF6B35] to-[#FF6B35]/70 transition-all duration-1000 ease-out"
                      style={{ width: `${((index + 1) / steps.length) * 100}%` }}
                    ></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to action */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-[#FF6B35] to-[#FF6B35]/80 rounded-full shadow-lg">
            <Package className="w-8 h-8 text-white" />
          </div>
          <p className="text-gray-600 text-lg">
            Inizia subito a creare il pacco perfetto per il tuo pet
          </p>
        </div>
      </div>
    </section>
  );
};