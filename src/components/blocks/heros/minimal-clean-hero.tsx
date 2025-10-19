"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Heart, Shield, Clock, Star } from 'lucide-react';
import Image from 'next/image';

export const MinimalCleanHero = () => {
  const floatingElements = [
    { icon: Heart, position: 'top-32 left-16', delay: 0.5 },
    { icon: Shield, position: 'top-48 right-24', delay: 0.8 },
    { icon: Clock, position: 'top-80 left-32', delay: 1.1 },
    { icon: Star, position: 'top-96 right-16', delay: 1.4 },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        type: "spring",
        damping: 25,
        stiffness: 120
      }
    }
  };

  const floatingVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        type: "spring",
        damping: 20,
        stiffness: 100
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-white to-orange-50/30">
      {/* Navigation */}
      <motion.nav 
        className="relative z-10 px-6 py-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <motion.div 
            className="text-xl font-semibold text-gray-800"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", damping: 15 }}
          >
            Meaowls
          </motion.div>
          <div className="hidden md:flex items-center space-x-8">
            {['Home', 'Servizi', 'Piani', 'Contatti'].map((item, index) => (
              <motion.a
                key={item}
                href="#"
                className="text-sm font-medium text-gray-600 hover:text-primary transition-colors duration-200"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index + 0.3, duration: 0.4 }}
                whileHover={{ y: -2 }}
              >
                {item}
              </motion.a>
            ))}
          </div>
        </div>
      </motion.nav>

      {/* Floating Elements */}
      {floatingElements.map((element, index) => {
        const IconComponent = element.icon;
        return (
          <motion.div
            key={index}
            className={`absolute ${element.position} hidden lg:block`}
            variants={floatingVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: element.delay }}
          >
            <motion.div
              animate={{
                y: [0, -10, 0],
                rotate: [0, 5, 0]
              }}
              transition={{
                duration: 3 + index * 0.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Card className="p-3 bg-white/80 backdrop-blur-sm border-orange-100 shadow-lg">
                <IconComponent className="w-5 h-5 text-primary" />
              </Card>
            </motion.div>
          </motion.div>
        );
      })}

      {/* Hero Content */}
      <motion.div 
        className="relative z-10 px-6 pt-16 pb-24"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight mb-6"
            variants={itemVariants}
          >
            Meaowls: Veterinario e Alimenti per Cani e Gatti a Domicilio a Milano
          </motion.h1>

          <motion.p 
            className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            Il primo servizio in Italia che porta il veterinario e gli alimenti di alta qualità 
            direttamente a casa tua. Prenota una visita o scegli il tuo piano alimentare personalizzato.
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
            variants={itemVariants}
          >
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-white px-8 py-3 text-sm font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
            >
              Prenota Visita
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-2 border-gray-200 text-gray-700 hover:border-primary hover:text-primary px-8 py-3 text-sm font-medium rounded-xl transition-all duration-200"
            >
              Scopri i Piani
            </Button>
          </motion.div>

          {/* Hero Image */}
          <motion.div 
            className="relative max-w-2xl mx-auto"
            variants={itemVariants}
          >
            <motion.div
              className="relative overflow-hidden rounded-3xl shadow-2xl bg-gradient-to-br from-orange-50 to-white"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", damping: 20, stiffness: 100 }}
            >
              <div className="aspect-[4/3] relative">
                <Image
                  src="/api/placeholder/600/450"
                  alt="Happy dog with veterinarian care"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
                  priority
                />
              </div>
              
              {/* Gentle overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-white/10 pointer-events-none" />
            </motion.div>

            {/* Feature Cards */}
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 -mb-8"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
            >
              {[
                { icon: Heart, title: "Cura a domicilio", desc: "Comfort per i tuoi animali" },
                { icon: Shield, title: "Veterinari esperti", desc: "Professionisti qualificati" },
                { icon: Clock, title: "Orari flessibili", desc: "Quando hai bisogno" }
              ].map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.4 + index * 0.1, duration: 0.4 }}
                  >
                    <Card className="p-4 bg-white/90 backdrop-blur-sm border-orange-100 shadow-lg hover:shadow-xl transition-all duration-300 group">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", damping: 15 }}
                      >
                        <IconComponent className="w-6 h-6 text-primary mb-2 mx-auto group-hover:scale-110 transition-transform duration-200" />
                        <h3 className="text-sm font-semibold text-gray-800 mb-1">{feature.title}</h3>
                        <p className="text-xs text-gray-600">{feature.desc}</p>
                      </motion.div>
                    </Card>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};