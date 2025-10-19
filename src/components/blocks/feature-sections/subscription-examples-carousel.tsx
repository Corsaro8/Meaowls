"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Dog, Cat, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface SubscriptionItem {
  name: string;
  price: number;
  calculation?: string;
}

interface SubscriptionExample {
  id: string;
  name: string;
  icon: 'Dog' | 'Cat';
  items: SubscriptionItem[];
  total: number;
  frequency: string;
  deliveryDay: string;
  timeslot: string;
  backgroundColor: string;
}

const subscriptionExamples: SubscriptionExample[] = [
  {
    id: '1',
    name: 'Pacchetto Cane Attivo',
    icon: 'Dog',
    items: [
      { name: 'Crocchette Premium', price: 45, calculation: '3kg × €15/kg' },
      { name: 'Snack Training', price: 18 },
      { name: 'Giocattolo Interattivo', price: 22 }
    ],
    total: 85,
    frequency: 'Mensile',
    deliveryDay: 'Ogni 15',
    timeslot: '14:00-16:00',
    backgroundColor: 'bg-blue-50'
  },
  {
    id: '2',
    name: 'Pacchetto Gatto Indoor',
    icon: 'Cat',
    items: [
      { name: 'Cibo Umido Selezione', price: 32, calculation: '24 lattine' },
      { name: 'Lettiera Naturale', price: 16 },
      { name: 'Tiragraffi Mini', price: 28 }
    ],
    total: 76,
    frequency: 'Bisettimanale',
    deliveryDay: 'Martedì',
    timeslot: '10:00-12:00',
    backgroundColor: 'bg-purple-50'
  },
  {
    id: '3',
    name: 'Pacchetto Multi-Pet',
    icon: 'Dog',
    items: [
      { name: 'Crocchette Cane Grande', price: 52, calculation: '5kg × €10.40/kg' },
      { name: 'Cibo Gatto Sterilizzato', price: 38, calculation: '36 bustine' },
      { name: 'Antiparassitari', price: 24 },
      { name: 'Accessori Vari', price: 19 }
    ],
    total: 133,
    frequency: 'Mensile',
    deliveryDay: 'Ogni 1°',
    timeslot: '16:00-18:00',
    backgroundColor: 'bg-green-50'
  }
];

export const SubscriptionExamplesCarousel: React.FC = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  
  const handleScroll = (direction: 'left' | 'right') => {
    const scrollAmount = 320; // Approximate card width + gap
    const newPosition = direction === 'left' 
      ? Math.max(0, scrollPosition - scrollAmount)
      : scrollPosition + scrollAmount;
    
    setScrollPosition(newPosition);
    
    const element = document.getElementById('carousel-container');
    if (element) {
      element.scrollTo({
        left: newPosition,
        behavior: 'smooth'
      });
    }
  };

  const renderIcon = (iconName: 'Dog' | 'Cat') => {
    const IconComponent = iconName === 'Dog' ? Dog : Cat;
    return <IconComponent size={32} className="text-[#FF6B35]" />;
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-12">
      {/* Title */}
      <div className="text-center mb-12">
        <h2 className="text-2xl md:text-3xl font-semibold text-[#2D3748] mb-2">
          Esempi di Abbonamenti Reali
        </h2>
        <p className="text-[#A0AEC0] text-base">
          Scopri come altri clienti hanno personalizzato i loro abbonamenti
        </p>
      </div>

      {/* Carousel Container */}
      <div className="relative">
        {/* Navigation Buttons */}
        <button
          onClick={() => handleScroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-3 hover:shadow-xl transition-shadow duration-200 border border-[#E2E8F0]"
          aria-label="Previous"
        >
          <ChevronLeft size={20} className="text-[#2D3748]" />
        </button>
        
        <button
          onClick={() => handleScroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-3 hover:shadow-xl transition-shadow duration-200 border border-[#E2E8F0]"
          aria-label="Next"
        >
          <ChevronRight size={20} className="text-[#2D3748]" />
        </button>

        {/* Carousel */}
        <div
          id="carousel-container"
          className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide mx-12"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
        >
          {subscriptionExamples.map((example) => (
            <motion.div
              key={example.id}
              whileHover={{
                scale: 1.04,
                boxShadow: '0 20px 40px rgba(255, 107, 53, 0.1)'
              }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="flex-none w-80 snap-start"
            >
              <Card className="h-full border border-[#E2E8F0] shadow-sm hover:shadow-lg hover:border-[#FF6B35] transition-all duration-200 bg-white">
                <CardContent className="p-8">
                  {/* Header */}
                  <div className="flex items-start gap-4 mb-8">
                    <div className="w-16 h-16 rounded-full bg-[#FF6B35]/10 flex items-center justify-center flex-shrink-0">
                      {renderIcon(example.icon)}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-[#2D3748] mb-2 leading-tight">
                        {example.name}
                      </h3>
                    </div>
                  </div>

                  {/* Items */}
                  <div className="space-y-4 mb-8">
                    {example.items.map((item, index) => (
                      <div key={index} className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="text-[#2D3748] font-medium text-sm">
                            {item.name}
                          </div>
                          {item.calculation && (
                            <div className="text-[#A0AEC0] text-xs mt-1">
                              {item.calculation}
                            </div>
                          )}
                        </div>
                        <div className="text-[#2D3748] font-medium text-sm ml-4">
                          €{item.price}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Total */}
                  <div className="border-t border-[#E2E8F0] pt-6 mb-8">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold text-[#2D3748]">
                        Totale
                      </span>
                      <span className="text-2xl font-bold text-[#FF6B35]">
                        €{example.total}
                      </span>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-[#A0AEC0]">Frequenza</span>
                      <span className="text-[#2D3748] font-medium">
                        {example.frequency}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#A0AEC0]">Consegna</span>
                      <span className="text-[#2D3748] font-medium">
                        {example.deliveryDay}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#A0AEC0]">Orario</span>
                      <span className="text-[#2D3748] font-medium">
                        {example.timeslot}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};