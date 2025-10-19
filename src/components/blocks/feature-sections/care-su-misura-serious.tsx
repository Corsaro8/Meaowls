import React from 'react';
import { Heart, Truck, Shield, Phone, Star, Users, Leaf, HeadphonesIcon } from 'lucide-react';

export const CareSuMisuraSerious = () => {
  return (
    <div className="bg-white py-16">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Care su Misura per ogni Pet
          </h2>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Ogni animale domestico è unico, con specifiche esigenze alimentari e di salute che richiedono attenzione personalizzata.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed max-w-3xl mx-auto">
            Il nostro approccio va oltre la semplice vendita di prodotti: ci impegniamo a comprendere le necessità individuali di ogni pet, offrendo soluzioni alimentari studiate su misura per garantire il massimo benessere e la migliore qualità di vita.
          </p>
        </div>

        {/* Main Features Section */}
        <div className="mb-20">
          <div className="space-y-12">
            {/* Feature 1 */}
            <div className="border-b border-gray-200 pb-12">
              <div className="flex items-start gap-6">
                <div className="bg-gray-100 p-4 rounded-lg">
                  <Heart className="h-8 w-8 text-gray-700" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                    Analisi Personalizzata delle Esigenze
                  </h3>
                  <p className="text-gray-700 text-lg mb-4">
                    Ogni pet ha bisogni nutrizionali specifici basati su età, razza, peso, livello di attività e condizioni di salute.
                  </p>
                  <p className="text-gray-600">
                    Il nostro team di esperti veterinari e nutrizionisti analizza il profilo completo del tuo animale per creare un piano alimentare su misura, considerando eventuali allergie, intolleranze o patologie specifiche che richiedono un'alimentazione mirata.
                  </p>
                </div>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="border-b border-gray-200 pb-12">
              <div className="flex items-start gap-6">
                <div className="bg-gray-100 p-4 rounded-lg">
                  <Shield className="h-8 w-8 text-gray-700" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                    Selezione di Prodotti Premium
                  </h3>
                  <p className="text-gray-700 text-lg mb-4">
                    Collaboriamo esclusivamente con i migliori produttori europei, garantendo ingredienti di alta qualità e processi produttivi certificati.
                  </p>
                  <p className="text-gray-600">
                    Ogni prodotto viene accuratamente selezionato e testato dal nostro laboratorio interno. Offriamo solo alimenti che rispettano i più rigidi standard di sicurezza alimentare, con tracciabilità completa della filiera e certificazioni internazionali di qualità.
                  </p>
                </div>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="border-b border-gray-200 pb-12">
              <div className="flex items-start gap-6">
                <div className="bg-gray-100 p-4 rounded-lg">
                  <Star className="h-8 w-8 text-gray-700" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                    Monitoraggio Continuo del Benessere
                  </h3>
                  <p className="text-gray-700 text-lg mb-4">
                    Il nostro servizio non si limita alla consegna: monitoriamo costantemente il benessere del tuo pet attraverso check-up nutrizionali regolari.
                  </p>
                  <p className="text-gray-600">
                    Riceverai report dettagliati sui progressi del tuo animale e suggerimenti per ottimizzare la sua alimentazione. Il nostro team rimane sempre a disposizione per consulenze telefoniche e aggiustamenti del piano alimentare in base all'evoluzione delle esigenze del tuo pet.
                  </p>
                </div>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="pb-4">
              <div className="flex items-start gap-6">
                <div className="bg-gray-100 p-4 rounded-lg">
                  <Users className="h-8 w-8 text-gray-700" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                    Supporto Veterinario Specializzato
                  </h3>
                  <p className="text-gray-700 text-lg mb-4">
                    Un team di veterinari nutrizionisti è sempre disponibile per consulenze specialistiche e supporto nella gestione di problematiche alimentari complesse.
                  </p>
                  <p className="text-gray-600">
                    Offriamo consulenze gratuite per la gestione di diete terapeutiche, problemi digestivi, allergie alimentari e piani nutrizionali per pet con esigenze speciali. Il nostro approccio scientifico garantisce risultati misurabili e duraturi nel tempo.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Advantages Grid */}
        <div className="mb-20">
          <h3 className="text-2xl font-semibold text-gray-900 mb-12 text-center">
            I Nostri Vantaggi Competitivi
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-8 rounded-lg">
              <div className="flex items-center gap-4 mb-4">
                <Shield className="h-6 w-6 text-gray-700" />
                <h4 className="text-xl font-semibold text-gray-900">Garanzia di Freschezza</h4>
              </div>
              <p className="text-gray-700">
                Tutti i nostri prodotti sono conservati in magazzini climatizzati e spediti con packaging termico per mantenere la qualità ottimale durante il trasporto.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-lg">
              <div className="flex items-center gap-4 mb-4">
                <Leaf className="h-6 w-6 text-gray-700" />
                <h4 className="text-xl font-semibold text-gray-900">Consegna Ecosostenibile</h4>
              </div>
              <p className="text-gray-700">
                Utilizziamo veicoli elettrici per le consegne urbane e packaging 100% riciclabile, riducendo l'impatto ambientale di ogni spedizione.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-lg">
              <div className="flex items-center gap-4 mb-4">
                <Truck className="h-6 w-6 text-gray-700" />
                <h4 className="text-xl font-semibold text-gray-900">Flessibilità Totale</h4>
              </div>
              <p className="text-gray-700">
                Modifica, sospendi o annulla il tuo abbonamento in qualsiasi momento. Puoi anche cambiare la frequenza di consegna secondo le tue esigenze.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-lg">
              <div className="flex items-center gap-4 mb-4">
                <HeadphonesIcon className="h-6 w-6 text-gray-700" />
                <h4 className="text-xl font-semibold text-gray-900">Supporto Veterinario</h4>
              </div>
              <p className="text-gray-700">
                Accesso gratuito a consulenze veterinarie specializzate in nutrizione animale, disponibili dal lunedì al venerdì dalle 9:00 alle 18:00.
              </p>
            </div>
          </div>
        </div>

        {/* Customer Support Section */}
        <div className="mb-16 bg-gray-50 p-12 rounded-lg">
          <div className="text-center">
            <Phone className="h-12 w-12 text-gray-700 mx-auto mb-6" />
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Assistenza Clienti Dedicata
            </h3>
            <p className="text-gray-700 text-lg leading-relaxed max-w-2xl mx-auto">
              Il nostro team di customer care è specializzato in nutrizione animale e sempre pronto ad aiutarti. 
              Ricevi supporto personalizzato per ogni esigenza del tuo pet, dalla scelta del prodotto giusto 
              alla risoluzione di eventuali problematiche alimentari.
            </p>
          </div>
        </div>

        {/* Testimonial */}
        <div className="text-center">
          <div className="bg-white border border-gray-200 p-12 rounded-lg max-w-3xl mx-auto">
            <blockquote className="text-xl text-gray-700 italic mb-6 leading-relaxed">
              "Da quando ho iniziato a utilizzare questo servizio, la salute del mio Golden Retriever è migliorata notevolmente. 
              La personalizzazione del piano alimentare e il supporto veterinario hanno fatto la differenza. 
              Finalmente un servizio che comprende davvero le esigenze dei nostri amici a quattro zampe."
            </blockquote>
            <cite className="text-gray-900 font-semibold text-lg">
              — Maria, Cliente dal 2023
            </cite>
          </div>
        </div>
      </div>
    </div>
  );
};