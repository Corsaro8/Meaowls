"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { PawPrint, Sparkles, ChevronRight, Crown } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface PetSubscription {
  id: string;
  name: string;
  type: 'dog' | 'cat';
  personality: string;
  cost: number;
  items: string[];
  image: string;
  badge?: string;
}

const pets: PetSubscription[] = [
  {
    id: 'luna',
    name: 'Luna',
    type: 'cat',
    personality: 'La Regina della Casa',
    cost: 29,
    items: ['Cibo premium grain-free', 'Giochi interattivi', 'Trattamenti naturali'],
    image: '🐱',
    badge: 'Più popolare'
  },
  {
    id: 'bruno',
    name: 'Bruno',
    type: 'dog',
    personality: 'Il Guardiano Dolce',
    cost: 35,
    items: ['Crocchette al salmone', 'Snack artigli', 'Accessori per il riposo'],
    image: '🐕',
    badge: 'Best value'
  }
];

const PetCard = ({ pet }: { pet: PetSubscription }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ 
        scale: 1.02, 
        transition: { duration: 0.2 } 
      }}
      className="relative group"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#FF6B35]/20 to-orange-200/20 rounded-xl blur-lg group-hover:blur-xl transition-all duration-300 opacity-0 group-hover:opacity-100" />
      
      <div className="relative bg-white/80 backdrop-blur-lg border border-white/20 rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300">
        {pet.badge && (
          <div className="absolute top-3 right-3 bg-gradient-to-r from-[#FF6B35] to-orange-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
            {pet.badge}
          </div>
        )}
        
        <div className="flex items-center mb-3">
          <motion.div 
            className="text-3xl mr-3"
            whileHover={{ rotate: 10 }}
            transition={{ duration: 0.2 }}
          >
            {pet.image}
          </motion.div>
          <div>
            <h3 className="font-bold text-base text-gray-800">{pet.name}</h3>
            <p className="text-xs text-gray-600">{pet.type === 'dog' ? 'Cane' : 'Gatto'}</p>
          </div>
        </div>
        
        <p className="text-[#FF6B35] font-medium text-xs mb-2 italic">"{pet.personality}"</p>
        
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-3 h-3 text-yellow-500" />
          <span className="text-xs text-gray-700 font-medium">Personalizzato</span>
        </div>
        
        <ul className="text-xs text-gray-600 space-y-0.5 mb-3">
          {pet.items.slice(0, 2).map((item, idx) => (
            <li key={idx} className="flex items-start">
              <PawPrint className="w-2.5 h-2.5 text-[#FF6B35] mt-0.5 mr-1.5 flex-shrink-0" />
              <span className="leading-tight">{item}</span>
            </li>
          ))}
        </ul>
        
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xl font-bold text-gray-800">€{pet.cost}</span>
            <span className="text-xs text-gray-600">/mese</span>
          </div>
          <Button 
            size="sm" 
            className="bg-gradient-to-r from-[#FF6B35] to-orange-500 hover:from-orange-500 hover:to-[#FF6B35] text-white font-medium text-xs h-8"
          >
            Scopri <ChevronRight className="ml-1 w-3 h-3" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export const SubscriptionSuMisuraSection = () => {
  return (
    <div className="relative py-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-orange-50/30">
      <div className="max-w-5xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="inline-block mb-2"
          >
            <Crown className="w-8 h-8 text-[#FF6B35] mx-auto" />
          </motion.div>
          
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
            Abbonamento su <span className="text-[#FF6B35]">misura</span>
          </h2>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
            per te e per il tuo amico a quattro zampe
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
          {pets.map((pet, index) => (
            <motion.div
              key={pet.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <PetCard pet={pet} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};