"use client";

import React from 'react';
import { HeartHandshake, Shield, User, Settings, Award, Truck, Clock, Phone, Headphones, Heart, RefreshCw } from 'lucide-react';

export const CareSuMisuraAlternativeSection = () => {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-orange-50 via-white to-red-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Image */}
        <div className="text-center mb-16">
          <div className="relative inline-block mb-8">
            <img
              src="/placeholder.svg?height=400&width=600"
              alt="Care personalizzata per animali domestici"
              className="w-full max-w-2xl mx-auto h-80 object-cover rounded-3xl shadow-2xl"
            />
            <div className="absolute -top-4 -right-4 bg-orange-500 text-white px-4 py-2 rounded-full font-semibold shadow-lg">
              24/48h
            </div>
            <div className="absolute -bottom-4 -left-4 bg-red-500 text-white px-4 py-2 rounded-full font-semibold shadow-lg">
              100+ Prodotti Premium
            </div>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Care su Misura per ogni Pet
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Ogni pet è unico, proprio come i suoi bisogni nutrizionali. Da cuccioli energici a senior più tranquilli, 
            da gatti indoor a cani sempre in movimento - offriamo soluzioni personalizzate che si adattano perfettamente 
            al carattere, all'età e alle esigenze specifiche del tuo compagno a quattro zampe.
          </p>
        </div>

        {/* Il nostro approccio */}
        <div className="mb-16 text-center">
          <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6">
            Il nostro approccio
          </h3>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Non crediamo nelle soluzioni universali. Il nostro team di esperti nutrizionisti veterinari 
            analizza attentamente il profilo del tuo pet per creare un piano alimentare su misura che 
            evolve insieme a lui, garantendo sempre il massimo benessere e la gioia di ogni pasto.
          </p>
        </div>

        {/* Features in horizontal cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {[
            {
              icon: HeartHandshake,
              title: "Consulenza Personalizzata",
              description: "Esperti nutrizionisti veterinari creano il piano perfetto per il tuo pet"
            },
            {
              icon: Shield,
              title: "Qualità Garantita",
              description: "Solo ingredienti premium selezionati e testati per la massima sicurezza"
            },
            {
              icon: User,
              title: "Profilo Individuale",
              description: "Ogni pet ha il suo profilo unico con preferenze e necessità specifiche"
            },
            {
              icon: Settings,
              title: "Adattamento Continuo",
              description: "Il piano si evolve seguendo la crescita e i cambiamenti del tuo amico"
            }
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
            >
              <div className="flex flex-col items-center text-center">
                <div className="bg-gradient-to-br from-orange-500 to-red-500 p-3 rounded-xl mb-4">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2 text-lg">
                  {feature.title}
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Vantaggi Esclusivi - Large Cards */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Vantaggi Esclusivi Meaowls
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                icon: Award,
                title: "Ingredienti Premium",
                description: "Selezioniamo solo il meglio: carni fresche, cereali integrali e superfood per una nutrizione completa e bilanciata"
              },
              {
                icon: Truck,
                title: "Consegna Gratuita",
                description: "Spedizione sempre gratuita in tutta Italia con consegne programmate che non ti faranno mai rimanere senza cibo"
              },
              {
                icon: Clock,
                title: "Flessibilità Totale",
                description: "Modifica, pausa o cancella la tua sottoscrizione in qualsiasi momento. La libertà di scegliere quando e come"
              },
              {
                icon: Phone,
                title: "Supporto Dedicato",
                description: "Il nostro team di esperti è sempre disponibile per consigli personalizzati e supporto immediato"
              }
            ].map((benefit, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-white to-orange-50 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-orange-100"
              >
                <div className="flex items-start space-x-4">
                  <div className="bg-gradient-to-br from-orange-500 to-red-500 p-4 rounded-2xl flex-shrink-0">
                    <benefit.icon className="h-10 w-10 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-3">
                      {benefit.title}
                    </h4>
                    <p className="text-gray-600 leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Assistenza Continua */}
        <div className="bg-gradient-to-r from-violet-200 to-purple-300 rounded-3xl p-8 lg:p-12 text-center text-gray-800 mb-16">
          <div className="flex justify-center mb-6">
            <div className="bg-white/20 p-4 rounded-2xl">
              <Headphones className="h-12 w-12 text-gray-700" />
            </div>
          </div>
          <h3 className="text-2xl lg:text-3xl font-bold mb-4">
            Assistenza Continua
          </h3>
          <p className="text-lg opacity-90 max-w-2xl mx-auto leading-relaxed">
            Il nostro servizio clienti specializzato è sempre al tuo fianco. Hai domande sulla nutrizione del tuo pet? 
            Dubbi su quale prodotto scegliere? I nostri esperti sono pronti ad aiutarti 7 giorni su 7.
          </p>
        </div>

        {/* Il Nostro Impegno per te e il tuo Pet */}
        <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-12 mb-16">
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Il Nostro Impegno per te e il tuo Pet
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div className="text-center group">
              <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-orange-200 transition-colors duration-300">
                <Clock className="w-10 h-10 text-orange-600" />
              </div>
              <h4 className="text-2xl font-semibold text-gray-900 mb-4">Risparmio di Tempo</h4>
              <p
                className="text-lg text-gray-600 leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: "Non più <strong>code al supermercato</strong> o corse dell'ultimo minuto. Il cibo arriva direttamente a casa tua quando ne hai bisogno."
                }} />
            </div>
            
            <div className="text-center group">
              <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-orange-200 transition-colors duration-300">
                <Shield className="w-10 h-10 text-orange-600" />
              </div>
              <h4 className="text-2xl font-semibold text-gray-900 mb-4">Garanzia di Qualità</h4>
              <p className="text-lg text-gray-600 leading-relaxed">
                Solo i migliori prodotti per il benessere del tuo amico a quattro zampe, 
                con controlli di qualità rigorosi.
              </p>
            </div>
            
            <div className="text-center group">
              <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-orange-200 transition-colors duration-300">
                <Heart className="w-10 h-10 text-orange-600" />
              </div>
              <h4 className="text-2xl font-semibold text-gray-900 mb-4">Cura e Attenzione</h4>
              <p
                className="text-lg text-gray-600 leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: "<strong>Un team dedicato</strong> sempre a tua disposizione per consigli, supporto e per assicurarsi che tu e il tuo pet siate sempre soddisfatti."
                }} />
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-orange-200 transition-colors duration-300">
                <RefreshCw className="w-10 h-10 text-orange-600" />
              </div>
              <h4 className="text-2xl font-semibold text-gray-900 mb-4">Massima Flessibilità</h4>
              <p
                className="text-lg text-gray-600 leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: "<strong>Libertà totale</strong> nella scelta dei prodotti. Modifica, sospendi o disdici il tuo abbonamento in qualsiasi momento, senza vincoli o penali."
                }} />
            </div>
          </div>
        </div>

        {/* Testimonial */}
        <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-xl border border-gray-100 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="text-6xl text-orange-500 mb-4">"</div>
            <blockquote className="text-xl lg:text-2xl text-gray-700 font-medium italic mb-6 leading-relaxed">
              Con Meaowls ho finalmente trovato la soluzione perfetta per Luna e Micio. 
              La personalizzazione è incredibile e i risultati si vedono: pelo più lucido, 
              più energia e appetito sempre al top!
            </blockquote>
            <div className="flex items-center justify-center space-x-2">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">M</span>
              </div>
              <div>
                <cite className="text-gray-900 font-semibold text-lg not-italic">
                  Maria, cliente Meaowls da 2 anni
                </cite>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};