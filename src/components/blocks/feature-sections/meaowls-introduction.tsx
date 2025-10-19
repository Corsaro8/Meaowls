"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Truck, Crown, Clock, Heart } from 'lucide-react';

export const IntroductionSection = () => {
  const features = [
    {
      icon: Truck,
      title: "Primo servizio in Italia",
      description: "Consegna a domicilio di cibo per cani e gatti"
    },
    {
      icon: Crown,
      title: "Marchi premium",
      description: "Solo i migliori brand per i tuoi amici a quattro zampe"
    },
    {
      icon: Clock,
      title: "Tu decidi quando",
      description: "Scegli la frequenza di consegna che preferisci"
    },
    {
      icon: Heart,
      title: "Nato per semplificare",
      description: "Evita corse dell'ultimo minuto e dimenticanze"
    }
  ];

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-white via-orange-50/30 to-orange-100/50 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 bg-primary rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-40 right-20 w-48 h-48 bg-orange-200 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        {/* Floating stats card */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="absolute top-10 right-10 bg-white rounded-2xl shadow-lg p-4 border border-orange-100 hidden md:block"
        >
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
            <span className="text-sm font-semibold text-gray-700">Primo in Italia</span>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
          {/* Left content */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Cosa è{' '}
                <span className="text-primary relative">
                  Meaowls
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="absolute -bottom-2 left-0 right-0 h-1 bg-primary/30 rounded-full origin-left"
                  />
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed">
                Il primo servizio di consegna a domicilio per cibo di cani e gatti, 
                nato per semplificare la vita dei proprietari di animali domestici.
              </p>
            </motion.div>

            {/* Feature cards */}
            <div className="grid gap-4">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: "0 10px 30px rgba(255, 107, 53, 0.15)"
                  }}
                  className="bg-white rounded-2xl p-6 shadow-lg border border-orange-100 hover:border-primary/30 transition-all duration-300 cursor-pointer group"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                      <feature.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors duration-300">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right hero image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative bg-gradient-to-br from-orange-100 to-orange-200 rounded-3xl p-8 shadow-2xl">
              {/* Decorative elements */}
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-primary rounded-full opacity-60"></div>
              <div className="absolute -bottom-4 -right-4 w-6 h-6 bg-orange-300 rounded-full opacity-80"></div>
              
              {/* Pet illustration placeholder - in real implementation, this would be an actual image */}
              <div className="bg-white rounded-2xl p-8 aspect-square flex items-center justify-center relative overflow-hidden">
                {/* Happy pets illustration */}
                <div className="text-center space-y-4">
                  <div className="text-8xl">🐕🐱</div>
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 bg-primary rounded-full"></div>
                    <div className="w-6 h-6 bg-orange-300 rounded-full"></div>
                    <div className="w-4 h-4 bg-orange-400 rounded-full"></div>
                  </div>
                  <p className="text-gray-500 font-medium">Cibo premium a domicilio</p>
                </div>
                
                {/* Floating food elements */}
                <motion.div
                  animate={{ 
                    y: [-10, 10, -10],
                    rotate: [-5, 5, -5]
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute top-4 right-4 text-3xl opacity-60"
                >
                  🥘
                </motion.div>
                
                <motion.div
                  animate={{ 
                    y: [10, -10, 10],
                    rotate: [5, -5, 5]
                  }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                  }}
                  className="absolute bottom-4 left-4 text-2xl opacity-60"
                >
                  🦴
                </motion.div>
              </div>
              
              {/* Stats overlay */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-xl border border-orange-100"
              >
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">100%</div>
                  <div className="text-sm text-gray-600 font-medium">Qualità garantita</div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};