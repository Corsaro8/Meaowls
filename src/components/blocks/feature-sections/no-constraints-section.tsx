"use client";

import React from 'react';
import { Check, ArrowRight, ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export function NoConstraintsSection() {
  const router = useRouter();

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-orange-50/20 to-white !w-full !h-[545px]">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">
            Abbonamento su misura
          </h2>
          <p className="text-base text-slate-600">
            Per te e per il tuo amico a quattro zampe
          </p>
        </div>

        {/* Two separate cards */}
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          {/* Card 1: Prezzo trasparente */}
          <div className="bg-white rounded-xl p-6 shadow-sm border-2 border-[#FFB89A]">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-1">
                <div className="w-8 h-8 bg-[#FFE0D6] rounded-full flex items-center justify-center">
                  <Check className="w-5 h-5 text-[#D97B5D]" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-1">
                  Prezzo trasparente
                </h3>
                <div className="text-sm text-slate-600">
                  <div>
                    L'abbonamento <span className="font-semibold text-[#FF6B35]">non ha un costo fisso</span> ma corrisponde <span className="font-semibold text-[#FF6B35]">esattamente al prezzo del pacco che hai creato</span>.
                  </div>
                  <div className="flex justify-center my-2">
                    <ArrowDown className="w-4 h-4 text-[#FF6B35]" />
                  </div>
                  <div>
                    Decidi tu cosa c'è dentro e quanto spendere.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Flessibilità totale */}
          <div className="bg-white rounded-xl p-6 shadow-sm border-2 border-[#FFB89A]">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-1">
                <div className="w-8 h-8 bg-[#FFE0D6] rounded-full flex items-center justify-center">
                  <Check className="w-5 h-5 text-[#D97B5D]" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-1">
                  Flessibilità totale
                </h3>
                <p className="text-sm text-slate-600 !whitespace-pre-line">Sei tu a impostare la scadenza di ogni consegna. <span className="font-semibold text-[#FF6B35]">Puoi scegliere ogni quanto riceverlo</span> ( ogni settimana, ogni due, ogni tre o ogni quattro ) e decidere giorno della settimana e orario.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to action */}
        <div className="text-center">
          <Button
            onClick={() => router.push("/il-mio-pet?tab=abbonamenti")}
            size="lg"
            className="bg-[#FFB89A] hover:bg-[#FFA080] text-black px-6 py-4 text-sm rounded-xl transition-all duration-200 group shadow-md hover:shadow-xl">
            Gestisci il tuo abbonamento
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
          </Button>
          <p className="text-sm text-slate-800 mt-4">
            Nessun vincolo - <span className="font-semibold">non crediamo nei contratti rigidi: la tua libertà di scelta è sempre garantita</span> - Puoi modificare o cancellare quando vuoi
          </p>
        </div>
      </div>
    </section>);

}