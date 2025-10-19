import React from 'react';
import { HeartHandshake, Shield, User, Settings, Award, Truck, Clock, Phone, Headphones } from 'lucide-react';

interface FeatureItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  details?: string;
}

const FeatureItem: React.FC<FeatureItemProps> = ({ icon, title, description, details }) =>
<li className="flex items-start space-x-4">
    <div className="flex-shrink-0 w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
      {icon}
    </div>
    <div className="flex-1">
      <h3 className="text-lg font-semibold text-gray-900 mb-2 !whitespace-pre-line !whitespace-pre-line !whitespace-pre-line">{title}</h3>
      <p className="text-gray-600 leading-relaxed mb-2 !whitespace-pre-line !whitespace-pre-line !whitespace-pre-line !whitespace-pre-line !whitespace-pre-line">{description}</p>
      {details &&
    <p className="text-sm text-gray-500 leading-relaxed italic !whitespace-pre-line !whitespace-pre-line !whitespace-pre-line !whitespace-pre-line">{details}</p>
    }
    </div>
  </li>;


export const CareSuMisuraSection: React.FC = () => {
  const features = [
  {
    icon: <HeartHandshake className="w-6 h-6 text-orange-500" />,
    title: "",
    description:
    "",
    details: ""
  },
  {
    icon: <Shield className="w-6 h-6 text-orange-500" />,
    title: "",
    description:
    "",
    details: ""
  },
  {
    icon: <User className="w-6 h-6 text-orange-500" />,
    title: "",
    description:
    "",
    details: ""
  },
  {
    icon: <Settings className="w-6 h-6 text-orange-500" />,
    title: "Assistenza dedicata e consegne sempre puntuali",
    description:
    "Ogni marca è stata scelta dopo un'analisi dei processi produttivi, ingredienti e certificazione di qualità.",
    details: ""
  }];


  return (
    <section className="bg-gray-50 py-16 sm:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-900 mb-4 leading-relaxed !whitespace-pre-line !w-full !h-full !whitespace-pre-line !whitespace-pre-line"> 

          </h2>
        </div>
        
        {/* Layout principale: testo a sinistra, immagine a destra */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16">
          {/* Testo a sinistra */}
          <div>
            <p className="text-xl text-gray-600 leading-relaxed mb-6 !whitespace-pre-line">

            </p>
            <p className="text-xl text-gray-600 leading-relaxed !whitespace-pre-line">

            </p>
          </div>
          
          {/* Immagine a destra */}
          <div className="relative">
            <img
              src="/care-pet-illustration.png"
              alt="Cane e gatto felici insieme"
              className="w-full h-auto rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-300" />

            
            {/* Floating Info Cards */}
            <div className="absolute -bottom-4 -left-4 bg-white rounded-lg shadow-lg p-4 border border-gray-100">
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-500">24/48h</div>
                <div className="text-xs text-gray-600">Consegna Garantita</div>
              </div>
            </div>
            
            <div className="absolute -top-4 -right-4 bg-white rounded-lg shadow-lg p-4 border border-gray-100">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-500">100+</div>
                <div className="text-xs text-gray-600">Prodotti Premium</div>
              </div>
            </div>
          </div>
        </div>

        {/* Riquadro "Il nostro approccio" sotto */}
        <div className="max-w-5xl mx-auto mb-12">
          <div className="bg-white rounded-xl p-8 shadow-sm border-2 border-orange-500">
            <p className="text-base text-gray-700 leading-relaxed !w-[99.6%] !h-[232px]">
              <strong className="text-orange-600">Il nostro approccio</strong> va oltre la semplice vendita di prodotti: 
              creiamo una relazione di fiducia che dura nel tempo, accompagnando te e il tuo pet in ogni fase della vita. 
              Dai cuccioli agli animali senior, dalle esigenze più semplici a quelle più complesse, 
              siamo qui per offrirti soluzioni personalizzate che fanno la differenza ogni giorno.
            </p>
          </div>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div className="order-2 lg:order-1">
            <p className="text-lg sm:text-xl text-gray-600 leading-relaxed mb-8 lg:mb-12 !whitespace-pre-line">

            </p>
            <ul className="space-y-8 mb-10">
              {features.map((feature, index) =>
              <FeatureItem
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                details={feature.details} />

              )}
            </ul>
            
            {/* Additional Benefits Grid */}
            <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Vantaggi Esclusivi Meaowls</h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-4 text-sm">
                <div className="flex items-start space-x-3">
                  <Award className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="text-gray-800">Garanzia di Freschezza</strong>
                    <p className="text-gray-600">Tutti i prodotti sono controllati e garantiti per la massima freschezza e qualità.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Truck className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="text-gray-800">Consegna Ecosostenibile</strong>
                    <p className="text-gray-600">Packaging riciclabile e ottimizzazione delle rotte per ridurre l'impatto ambientale.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="text-gray-800">Flessibilità Totale</strong>
                    <p className="text-gray-600 text-sm">Modifica, pausa o cancella il tuo abbonamento in qualsiasi momento senza penali.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Phone className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="text-gray-800">Supporto Veterinario</strong>
                    <p className="text-gray-600">Consulenza gratuita con i nostri nutrizionisti per animali domestici.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Separate highlighted box for Customer Support */}
            <div className="bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-200 rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-center space-x-4">
                <div className="bg-red-100 rounded-full p-3">
                  <Headphones className="w-8 h-8 text-red-500" />
                </div>
                <div className="text-center">
                  <h4 className="text-xl font-bold text-gray-900 mb-2">Assistenza Continua</h4>
                  <p className="text-gray-700 leading-relaxed">
                    Meaowls offre un supporto continuo di assistenza per assicurarsi della soddisfazione dei clienti.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="order-1 lg:order-2">
            {/* Additional testimonial quote */}
            <div className="bg-orange-50 rounded-xl p-6 border border-orange-200">
              <blockquote className="text-center">
                <p className="text-gray-700 italic leading-relaxed mb-4">
                  "Con Meaowls ho finalmente trovato la tranquillità di sapere che il mio cane avrà sempre il cibo migliore, 
                  senza dovermi preoccupare di nulla. Il servizio è impeccabile e i prodotti di altissima qualità."
                </p>
                <cite className="text-sm font-semibold text-orange-600">— Maria, cliente Meaowls da 2 anni</cite>
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </section>);

};