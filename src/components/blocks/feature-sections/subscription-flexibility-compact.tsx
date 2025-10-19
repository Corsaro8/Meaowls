"use client";

import { Card, CardContent } from '@/components/ui/card';

export const SubscriptionFlexibilityCompact = () => {
  const features = [
    {
      title: "Prezzo su misura",
      description: "Ogni pet ha esigenze diverse. Scegli fra le nostre opzioni quella che meglio si adatta al tuo amico a quattro zampe e al tuo budget."
    },
    {
      title: "Flessibilità totale", 
      description: "Puoi modificare, sospendere o cancellare il tuo abbonamento in qualsiasi momento. Nessun vincolo, solo comodità."
    }
  ];

  return (
    <section className="bg-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-xl md:text-2xl font-bold text-center mb-8 font-inter">
          <span className="text-[#2D3748]">Abbonamento su </span>
          <span className="text-[#FF6B35]">misura</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
              <CardContent className="p-5">
                <h3 className="text-base md:text-lg font-semibold mb-3 text-[#FF6B35] font-inter">
                  {feature.title}
                </h3>
                <p className="text-[#2D3748] text-sm leading-relaxed font-inter">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};