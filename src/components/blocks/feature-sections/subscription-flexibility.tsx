import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

export const SubscriptionFeatureSection = () => {
  return (
    <section className="py-12 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-8">
          <h2 
            className="text-xl md:text-2xl font-semibold text-gray-800 mb-4"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Abbonamento su misura, per te e per il tuo amico a quattro zampe
          </h2>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Point 1 - Prezzo su misura */}
          <Card className="border-0 shadow-sm bg-white">
            <CardContent className="p-5">
              <h3 
                className="text-lg md:text-xl font-semibold text-gray-800 mb-3"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Prezzo su misura
              </h3>
              <p 
                className="text-gray-600 leading-relaxed text-sm md:text-base"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                L'abbonamento non ha un costo fisso, ma corrisponde esattamente al prezzo del pacco che hai creato. Decidi tu cosa c'è dentro e quanto spendere.
              </p>
            </CardContent>
          </Card>

          {/* Point 2 - Flessibilità totale */}
          <Card className="border-0 shadow-sm bg-white">
            <CardContent className="p-5">
              <h3 
                className="text-lg md:text-xl font-semibold text-gray-800 mb-3"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Flessibilità totale
              </h3>
              <p 
                className="text-gray-600 leading-relaxed text-sm md:text-base"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Sei tu a impostare la scadenza di ogni consegna. Puoi scegliere di ricevere il tuo pacco ogni mese, ogni due mesi, o come preferisci, senza alcun vincolo.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default SubscriptionFeatureSection;