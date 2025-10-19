"use client";

import { useState, useEffect } from "react";
import { motion } from "@/lib/framer-motion-shim";
import { Heart, Star, PawPrint, User, Sparkles, Bone, Home, Car, MapPin, Coffee } from "lucide-react";

interface OwnerChoice {
  lifestyle: string;
  mobility: string;
  schedule: string;
  preferences: string;
}

interface PetChoice {
  energy: string;
  sociability: string;
  needs: string;
  preferences: string;
}

export default function AbbonamentoSecton() {
  const [ownerChoices, setOwnerChoices] = useState<OwnerChoice>({
    lifestyle: '',
    mobility: '',
    schedule: '',
    preferences: ''
  });

  const [petChoices, setPetChoices] = useState<PetChoice>({
    energy: '',
    sociability: '',
    needs: '',
    preferences: ''
  });

  const [isAnimating, setIsAnimating] = useState(false);

  const lifestyleOptions = [
    { icon: Home, label: 'Casalingo', color: 'from-orange-400 to-pink-500' },
    { icon: Car, label: 'Viaggiatore', color: 'from-blue-400 to-cyan-500' },
    { icon: Coffee, label: 'Urban Chic', color: 'from-purple-400 to-indigo-500' }
  ];

  const energyOptions = [
    { icon: Sparkles, label: 'Hyper', color: 'from-yellow-400 to-orange-500' },
    { icon: Star, label: 'Balance', color: 'from-green-400 to-emerald-500' },
    { icon: PawPrint, label: 'Calm Soul', color: 'from-pink-400 to-purple-500' }
  ];

  const handleOwnerSelect = (category: keyof OwnerChoice, value: string) => {
    setIsAnimating(true);
    setOwnerChoices(prev => ({ ...prev, [category]: value }));
    setTimeout(() => setIsAnimating(false), 300);
  };

  const handlePetSelect = (category: keyof PetChoice, value: string) => {
    setIsAnimating(true);
    setPetChoices(prev => ({ ...prev, [category]: value }));
    setTimeout(() => setIsAnimating(false), 300);
  };

  const getConnectionStrength = () => {
    const ownerTotal = Object.values(ownerChoices).filter(v => v).length;
    const petTotal = Object.values(petChoices).filter(v => v).length;
    return Math.round(((ownerTotal + petTotal) / 8) * 100);
  };

  return (
    <div className="min-h-screen py-16 px-8 bg-gradient-to-br from-gray-50 via-white to-orange-50">
      {/* Hero Section with Dynamic Title */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-5xl md:text-7xl font-bold mb-4">
          <span className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 bg-clip-text text-transparent">
            Abbonamento su misura
          </span>
        </h1>
        <p className="text-2xl text-gray-600">per te e per il tuo amico a quattro zampe</p>
        <motion.div 
          className="inline-block mt-6 px-6 py-3 bg-white rounded-full shadow-lg border border-orange-100"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Heart className="inline-block text-pink-500 mr-2" size={20} />
          <span className="text-gray-700">{getConnectionStrength()}% di corrispondenza</span>
        </motion.div>
      </motion.div>

      {/* Split Screen Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-7xl mx-auto">
        {/* Left Column - Owner Profile */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-5"
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-gray-100">
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center mr-4">
                <User className="text-white" size={28} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800">Il tuo stile</h3>
                <p className="text-gray-500">Personalizza il tuo profilo</p>
              </div>
            </div>

            {/* Owner Cards */}
            <div className="space-y-6">
              {renderOwnerCards()}
            </div>
          </div>
        </motion.div>

        {/* Center - Connection Point */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="lg:col-span-2 flex items-center justify-center"
        >
          <div className="relative">
            <motion.div
              className="w-24 h-24 rounded-full bg-gradient-to-r from-orange-400 to-pink-500 flex items-center justify-center"
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 360],
              }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <Heart className="text-white" size={32} />
            </motion.div>
            <div className="absolute -top-2 -right-2">
              <Sparkles className="text-yellow-500" size={20} />
            </div>
            <div className="absolute -bottom-2 -left-2">
              <Sparkles className="text-pink-500" size={20} />
            </div>
          </div>
        </motion.div>

        {/* Right Column - Pet Profile */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-5"
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-gray-100">
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center mr-4">
                <PawPrint className="text-white" size={28} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800">Il tui pet</h3>
                <p className="text-gray-500">Personalizza il suo profilo</p>
              </div>
            </div>

            {/* Pet Cards */}
            <div className="space-y-6">
              {renderPetCards()}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Preview Cards */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-12 max-w-4xl mx-auto"
      >
        <h3 className="text-3xl font-bold text-center mb-8">Abbinamento perfetto</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {renderMatchPreview()}
        </div>
      </motion.div>

      {/* CTA Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="text-center mt-16"
      >
        <button className="px-12 py-6 text-xl font-bold text-white rounded-2xl bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 transition-all duration-300 shadow-2xl hover:shadow-3xl">
          Inizia la personalizzazione
        </button>
      </motion.div>

      {/* Floating Elements */}
      {renderFloatingElements()}
    </div>
  );

  function renderOwnerCards() {
    return (
      <>
        {/* Lifestyle */}
        <motion.div whileHover={{ scale: 1.02 }} className="bg-gradient-to-r from-white to-gray-50 rounded-2xl p-6 border border-gray-100">
          <h4 className="text-lg font-semibold mb-4 text-gray-700">Stile di vita</h4>
          <div className="grid grid-cols-3 gap-3">
            {lifestyleOptions.map((option) => (
              <div
                key={option.label}
                className={`p-4 rounded-xl cursor-pointer transition-all duration-300 ${
                  ownerChoices.lifestyle === option.label
                    ? 'transform scale-105 shadow-lg'
                    : 'hover:shadow-lg'
                } bg-gradient-to-r ${option.color}`}
                onClick={() => handleOwnerSelect('lifestyle', option.label)}
              >
                <option.icon className="text-white mx-auto mb-2" size={24} />
                <p className="text-white text-sm text-center font-medium">{option.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Schedule */}
        <motion.div whileHover={{ scale: 1.02 }} className="bg-gradient-to-r from-white to-gray-50 rounded-2xl p-6 border border-gray-100">
          <h4 className="text-lg font-semibold mb-4 text-gray-700">Orario preferito</h4>
          <div className="space-y-2">
            {['Mattina', 'Pomeriggio', 'Serata', 'Flessibile'].map((time) => (
              <motion.button
                key={time}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`w-full p-3 rounded-xl transition-all ${
                  ownerChoices.schedule === time
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => handleOwnerSelect('schedule', time)}
              >
                {time}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </>
    );
  }

  function renderPetCards() {
    return (
      <>
        {/* Energy Level */}
        <motion.div whileHover={{ scale: 1.02 }} className="bg-gradient-to-r from-white to-gray-50 rounded-2xl p-6 border border-gray-100">
          <h4 className="text-lg font-semibold mb-4 text-gray-700">Energia</h4>
          <div className="grid grid-cols-3 gap-3">
            {energyOptions.map((option) => (
              <div
                key={option.label}
                className={`p-4 rounded-xl cursor-pointer transition-all duration-300 ${
                  petChoices.energy === option.label
                    ? 'transform scale-105 shadow-lg'
                    : 'hover:shadow-lg'
                } bg-gradient-to-r ${option.color}`}
                onClick={() => handlePetSelect('energy', option.label)}
              >
                <option.icon className="text-white mx-auto mb-2" size={24} />
                <p className="text-white text-sm text-center font-medium">{option.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Social */}
        <motion.div whileHover={{ scale: 1.02 }} className="bg-gradient-to-r from-white to-gray-50 rounded-2xl p-6 border border-gray-100">
          <h4 className="text-lg font-semibold mb-4 text-gray-700">Socialità</h4>
          <div className="space-y-2">
            {['Solo pet', 'Pet socievoli', 'Tutti sono amici', 'Dipende dal mood'].map((social) => (
              <motion.button
                key={social}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`w-full p-3 rounded-xl transition-all ${
                  petChoices.sociability === social
                    ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => handlePetSelect('sociability', social)}
              >
                {social}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </>
    );
  }

  function renderMatchPreview() {
    return (
      <>
        {/* Owner Match */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl p-6 text-white"
        >
          <User className="mb-4" size={32} />
          <h4 className="text-xl font-bold mb-2">Profilo Owner</h4>
          <ul className="space-y-2">
            <li>• {ownerChoices.lifestyle || 'Seleziona stile di vita'}</li>
            <li>• {ownerChoices.schedule || 'Seleziona orario'}</li>
          </ul>
        </motion.div>

        {/* Pet Match */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl p-6 text-white"
        >
          <PawPrint className="mb-4" size={32} />
          <h4 className="text-xl font-bold mb-2">Profilo Pet</h4>
          <ul className="space-y-2">
            <li>• {petChoices.energy || 'Seleziona energia'}</li>
            <li>• {petChoices.sociability || 'Seleziona socialità'}</li>
          </ul>
        </motion.div>
      </>
    );
  }

  function renderFloatingElements() {
    const elements = [
      { icon: Bone, x: 10, y: 20, delay: 0 },
      { icon: Heart, x: 80, y: 40, delay: 0.5 },
      { icon: Star, x: 15, y: 70, delay: 1 },
      { icon: PawPrint, x: 85, y: 85, delay: 1.5 }
    ];

    return elements.map((el, index) => (
      <motion.div
        key={index}
        className="absolute opacity-20"
        style={{
          left: `${el.x}%`,
          top: `${el.y}%`,
        }}
        animate={{
          y: [0, -20, 0],
          rotate: [0, 360],
        }}
        transition={{
          duration: 4 + el.delay,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <el.icon size={24} className="text-orange-400" />
      </motion.div>
    ));
  }
}