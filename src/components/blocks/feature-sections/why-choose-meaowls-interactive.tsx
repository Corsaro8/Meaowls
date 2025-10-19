"use client";

import React, { useState } from 'react';
import { Clock, Award, Users, Zap, HeartHandshake, CheckCircle, TrendingUp, Star } from 'lucide-react';

interface Feature {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  shortDescription: string;
  detailedDescription: string;
  benefits: string[];
  color: string;
}

interface Stat {
  number: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const features: Feature[] = [
  {
    id: 'delivery',
    icon: Clock,
    title: 'Consegna sempre puntuale',
    shortDescription: 'Ricevi i prodotti quando ne hai bisogno',
    detailedDescription: 'Garantiamo consegne puntuali entro 24-48 ore in tutta Italia. Il nostro sistema di logistics avanzato monitora ogni spedizione per assicurarti che il cibo del tuo pet arrivi sempre in tempo.',
    benefits: [
      'Consegna garantita 24-48h',
      'Tracking in tempo reale',
      'Notifiche di consegna',
      'Gestione automatica delle ricorrenze'
    ],
    color: 'orange'
  },
  {
    id: 'premium',
    icon: Award,
    title: 'Prodotti premium selezionati',
    shortDescription: 'Solo il meglio per i tuoi amici a quattro zampe',
    detailedDescription: 'Collaboriamo esclusivamente con i migliori brand del settore pet food. Ogni prodotto è accuratamente selezionato dal nostro team di esperti veterinari e nutrizionisti.',
    benefits: [
      'Oltre 50 brand premium',
      'Controllo qualità rigoroso',
      'Ingredienti naturali e genuini',
      'Certificazioni internazionali'
    ],
    color: 'blue'
  },
  {
    id: 'consultation',
    icon: Users,
    title: 'Consulenza personalizzata',
    shortDescription: 'Consigli su misura per il tuo pet',
    detailedDescription: 'I nostri esperti nutrizionisti creano piani alimentari personalizzati basati su età, razza, peso e preferenze del tuo animale. Ricevi consigli professionali sempre aggiornati.',
    benefits: [
      'Profilo nutrizionale personalizzato',
      'Consulenza veterinaria gratuita',
      'Piani alimentari su misura',
      'Monitoraggio benessere pet'
    ],
    color: 'green'
  },
  {
    id: 'flexibility',
    icon: Zap,
    title: 'Flessibilità totale',
    shortDescription: 'Modifica, pausa o cancella quando vuoi',
    detailedDescription: 'Adatta il servizio alle tue esigenze con la massima flessibilità. Cambia frequenza di consegna, quantità, prodotti o metti in pausa l\'abbonamento con un semplice click.',
    benefits: [
      'Modifiche illimitate',
      'Pausa abbonamento gratuita',
      'Cambio prodotti istantaneo',
      'Nessun vincolo contrattuale'
    ],
    color: 'purple'
  },
  {
    id: 'support',
    icon: HeartHandshake,
    title: 'Supporto clienti dedicato',
    shortDescription: 'Assistenza esperta sempre disponibile',
    detailedDescription: 'Il nostro team di supporto è sempre pronto ad aiutarti. Esperti del settore pet disponibili via chat, telefono o email per qualsiasi domanda o necessità.',
    benefits: [
      'Chat dal vivo 24/7',
      'Esperti del settore pet',
      'Supporto multicanale',
      'Risoluzione rapida problemi'
    ],
    color: 'red'
  }
];

const stats: Stat[] = [
  {
    number: '10.000+',
    label: 'Clienti soddisfatti',
    icon: Users
  },
  {
    number: '24-48h',
    label: 'Consegna garantita',
    icon: Clock
  },
  {
    number: '100%',
    label: 'Soddisfazione clienti',
    icon: Star
  },
  {
    number: '50+',
    label: 'Marche premium',
    icon: Award
  }
];

export const WhyChooseMeaowlsInteractive = () => {
  const [selectedFeature, setSelectedFeature] = useState<string>(features[0].id);

  const currentFeature = features.find(f => f.id === selectedFeature) || features[0];

  const getColorClasses = (color: string, isSelected: boolean) => {
    const colorMap = {
      orange: {
        bg: isSelected ? 'bg-orange-50' : 'bg-white',
        border: isSelected ? 'border-orange-500' : 'border-gray-200',
        text: isSelected ? 'text-orange-600' : 'text-gray-600',
        icon: isSelected ? 'text-orange-500' : 'text-gray-400',
        hover: 'hover:border-orange-300 hover:bg-orange-50'
      },
      blue: {
        bg: isSelected ? 'bg-blue-50' : 'bg-white',
        border: isSelected ? 'border-blue-500' : 'border-gray-200',
        text: isSelected ? 'text-blue-600' : 'text-gray-600',
        icon: isSelected ? 'text-blue-500' : 'text-gray-400',
        hover: 'hover:border-blue-300 hover:bg-blue-50'
      },
      green: {
        bg: isSelected ? 'bg-green-50' : 'bg-white',
        border: isSelected ? 'border-green-500' : 'border-gray-200',
        text: isSelected ? 'text-green-600' : 'text-gray-600',
        icon: isSelected ? 'text-green-500' : 'text-gray-400',
        hover: 'hover:border-green-300 hover:bg-green-50'
      },
      purple: {
        bg: isSelected ? 'bg-purple-50' : 'bg-white',
        border: isSelected ? 'border-purple-500' : 'border-gray-200',
        text: isSelected ? 'text-purple-600' : 'text-gray-600',
        icon: isSelected ? 'text-purple-500' : 'text-gray-400',
        hover: 'hover:border-purple-300 hover:bg-purple-50'
      },
      red: {
        bg: isSelected ? 'bg-red-50' : 'bg-white',
        border: isSelected ? 'border-red-500' : 'border-gray-200',
        text: isSelected ? 'text-red-600' : 'text-gray-600',
        icon: isSelected ? 'text-red-500' : 'text-gray-400',
        hover: 'hover:border-red-300 hover:bg-red-50'
      }
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.orange;
  };

  const getShowcaseColorClasses = (color: string) => {
    const colorMap = {
      orange: 'from-orange-50 to-orange-100 border-orange-200',
      blue: 'from-blue-50 to-blue-100 border-blue-200',
      green: 'from-green-50 to-green-100 border-green-200',
      purple: 'from-purple-50 to-purple-100 border-purple-200',
      red: 'from-red-50 to-red-100 border-red-200'
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.orange;
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Scopri tutti i vantaggi del nostro servizio di delivery premium per i tuoi amici a quattro zampe
          </p>
        </div>

        {/* Main Interactive Area */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {/* Feature Showcase - Left Side */}
          <div className="lg:col-span-2">
            <div className={`bg-gradient-to-br ${getShowcaseColorClasses(currentFeature.color)} border-2 rounded-2xl p-8 h-full transition-all duration-500 shadow-lg`}>
              <div className="flex items-start space-x-6">
                <div className={`p-4 rounded-xl bg-white shadow-md`}>
                  <currentFeature.icon className={`w-8 h-8 ${getColorClasses(currentFeature.color, true).icon}`} />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {currentFeature.title}
                  </h3>
                  <p className="text-gray-700 text-lg leading-relaxed mb-6">
                    {currentFeature.detailedDescription}
                  </p>
                  
                  {/* Benefits List */}
                  <div className="grid sm:grid-cols-2 gap-3">
                    {currentFeature.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <CheckCircle className={`w-5 h-5 ${getColorClasses(currentFeature.color, true).icon} flex-shrink-0`} />
                        <span className="text-gray-700 text-sm font-medium">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Feature Cards - Right Side */}
          <div className="space-y-4">
            {features.map((feature) => {
              const isSelected = selectedFeature === feature.id;
              const colors = getColorClasses(feature.color, isSelected);
              
              return (
                <div
                  key={feature.id}
                  onClick={() => setSelectedFeature(feature.id)}
                  className={`${colors.bg} ${colors.border} ${colors.hover} border-2 rounded-xl p-6 cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${isSelected ? 'shadow-lg scale-105' : 'shadow-sm'}`}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`p-2 rounded-lg ${isSelected ? 'bg-white shadow-sm' : 'bg-gray-50'
                      } ${isSelected ? 'ring-2 ring-offset-2 ring-blue-500' : ''}`}>
                      <feature.icon className={`w-6 h-6 ${isSelected ? 'text-blue-500' : 'text-gray-400'}`} />
                    </div>
                    <div className="flex-1">
                      <h4 className={`font-semibold ${colors.text} mb-1`}>
                        {feature.title}
                      </h4>
                      <p className={`text-sm ${colors.text} mb-3`}>
                        {feature.shortDescription}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl font-bold text-gray-900 mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};