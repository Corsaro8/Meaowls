"use client";

import { Calendar, Heart, Bell, Settings, Truck, Shield } from 'lucide-react';

interface Feature {
  icon: React.ElementType;
  title: string;
  description: string;
  color: string;
}

const features: Feature[] = [
  {
    icon: Calendar,
    title: "Programmazione personalizzata",
    description: "Consegne su misura per le tue esigenze.",
    color: "#8B5CF6"
  },
  {
    icon: Heart,
    title: "Selezione automatica",
    description: "Prodotti preferiti salvati nel profilo del tuo Pet.",
    color: "#EC4899"
  },
  {
    icon: Bell,
    title: "Notifiche smart",
    description: "Email e SMS 3 giorni prima di ogni consegna.",
    color: "#10B981"
  },
  {
    icon: Settings,
    title: "Gestione flessibile",
    description: "Modifica o sospendi con un click.",
    color: "#3B82F6"
  },
  {
    icon: Truck,
    title: "Consegna gratuita",
    description: "Per ordini superiori a 25 euro.",
    color: "#F59E0B"
  },
  {
    icon: Shield,
    title: "Garanzia 100%",
    description: "Soddisfatti o rimborsati.",
    color: "#EF4444"
  }
];

export const ServiceFeaturesSection = () => {
  return (
    <section className="relative isolate overflow-hidden bg-gray-900 px-6 py-24 sm:py-32 lg:px-8">
      {/* Background Image */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gray-900/40 mix-blend-multiply" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto max-w-5xl">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-[#2D3748] mb-4 leading-tight">
            Il Nostro Servizio: {' '}
            <span className="text-[#FF6B35]">Semplicità per la Tua Vita!</span>
          </h2>
          <p className="text-base md:text-lg text-[#2D3748] max-w-3xl mx-auto leading-relaxed">
            Una soluzione completa per semplificare la tua vita e assicurarti che il tuo amico a quattro zampe non resti mai senza il suo cibo preferito.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={index}
                className="group bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:transform hover:-translate-y-1 border border-gray-100"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <IconComponent 
                        className="w-5 h-5 group-hover:scale-110 transition-all duration-300" 
                        style={{ color: feature.color }}
                      />
                      <h3 className="text-lg font-semibold text-[#2D3748] group-hover:text-[#FF6B35] transition-colors duration-300">
                        {feature.title}
                      </h3>
                    </div>
                    <p className="text-[#2D3748] text-opacity-80 leading-relaxed text-sm">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};