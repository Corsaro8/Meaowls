"use client";

import React from 'react';
import { Dog, Cat, Package, Calendar } from 'lucide-react';
import { Button } from "@/components/ui/button";

const subscriptions = [
  {
    id: 1,
    name: "Abbonamento di Pepe",
    petType: "Cane",
    icon: Dog,
    items: [
      "Trainer Natural Medium Adult Manzo 12kg",
      "Royal Canin Training Snack 2x110g"
    ],
    price: 38.24,
    frequency: "Ogni 2 settimane",
    day: "Domenica"
  },
  {
    id: 2,
    name: "Abbonamento di Briciola",
    petType: "Gatto",
    icon: Cat,
    items: [
      "Monge Monoprotein Tacchino 80g x6",
      "Lettiera Cat Fresh Classic 8lt"
    ],
    price: 10.69,
    frequency: "Ogni settimana",
    day: "Lunedì"
  }
];

export const SubscriptionExamplesSimple = () => {
  return (
    <section className="relative py-16 bg-gradient-to-br from-orange-50 via-gray-50 to-orange-50 overflow-hidden">
      {/* Elementi decorativi sinistra */}
      <div className="absolute left-0 top-0 bottom-0 w-32 pointer-events-none hidden lg:block">
        <div className="absolute top-20 left-4 text-6xl opacity-20">🐾</div>
        <div className="absolute top-40 left-8 text-5xl opacity-15">🦴</div>
        <div className="absolute top-64 left-2 text-7xl opacity-20">🐕</div>
        <div className="absolute top-96 left-6 text-5xl opacity-15">🥣</div>
        <div className="absolute bottom-32 left-4 text-6xl opacity-20">🐾</div>
      </div>

      {/* Elementi decorativi destra */}
      <div className="absolute right-0 top-0 bottom-0 w-32 pointer-events-none hidden lg:block">
        <div className="absolute top-32 right-6 text-6xl opacity-20">🐈</div>
        <div className="absolute top-56 right-2 text-5xl opacity-15">🐾</div>
        <div className="absolute top-80 right-8 text-7xl opacity-20">🎁</div>
        <div className="absolute bottom-40 right-4 text-5xl opacity-15">🦴</div>
        <div className="absolute bottom-20 right-7 text-6xl opacity-20">🐾</div>
      </div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
            Abbonamento su misura
          </h2>
          <p className="text-lg text-gray-600">
            Personalizza il tuo piano per il tuo amico a quattro zampe
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {subscriptions.map((sub) => {
            const Icon = sub.icon;
            return (
              <div key={sub.id} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
                  <div className="w-12 h-12 rounded-full bg-[#FF6B35]/10 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-[#FF6B35]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">{sub.name}</h3>
                    <p className="text-sm text-gray-500">{sub.petType}</p>
                  </div>
                </div>

                <div className="space-y-3 mb-5">
                  <div className="flex items-start gap-2">
                    <Package className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" />
                    <div className="text-sm text-gray-600">
                      {sub.items.map((item, idx) => (
                        <div key={idx} className="mb-1">{item}</div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span>{sub.frequency} - {sub.day}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div>
                    <span className="text-2xl font-bold text-gray-800">€{sub.price.toFixed(2)}</span>
                    <span className="text-sm text-gray-500">/consegna</span>
                  </div>
                  <Button className="bg-[#FF6B35] hover:bg-[#e55a28] text-white">
                    Modifica
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <Button size="lg" className="bg-[#FF6B35] hover:bg-[#e55a28] text-white px-8">
            Crea il tuo abbonamento personalizzato
          </Button>
        </div>
      </div>
    </section>
  );
};