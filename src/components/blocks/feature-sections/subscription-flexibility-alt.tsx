"use client";

import React from "react";
import { motion } from "@/lib/framer-motion-shim";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      staggerChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

export const SubscriptionFlexibilityAlt = () => {
  const features = [
    {
      id: 1,
      title: "Prezzo su misura",
      description: "Calcoliamo il piano perfetto basato su razza, età e stile di vita del tuo pet"
    },
    {
      id: 2,
      title: "Flessibilità totale", 
      description: "Modifica, pausa o cancella il tuo abbonamento quando vuoi, senza vincoli"
    }
  ];

  return (
    <section className="relative py-20 bg-white overflow-hidden">
      {/* Decorative grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,107,53,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,107,53,0.03)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
      
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-16"
        >
          {/* Header */}
          <motion.div
            variants={itemVariants}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4 font-heading leading-tight">
              Abbonamento su misura,{" "}
              <span className="text-primary">per te e il tuo amico</span>
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
          </motion.div>

          {/* Vertical Stack Layout */}
          <div className="space-y-8 max-w-4xl mx-auto">
            {features.map((feature, index) => (
              <motion.div
                key={feature.id}
                variants={itemVariants}
                whileHover={{ x: 10 }}
                className="group"
              >
                <div className="relative bg-gradient-to-r from-gray-50 to-white border-l-4 border-primary rounded-r-2xl p-8 md:p-10 shadow-sm hover:shadow-lg transition-all duration-300">
                  {/* Background accent */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full transform translate-x-16 -translate-y-16 group-hover:scale-110 transition-transform duration-500"></div>
                  
                  <div className="relative z-10 flex flex-col md:flex-row md:items-start gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center shadow-lg">
                        <span className="text-white font-bold text-2xl">{index + 1}</span>
                      </div>
                    </div>
                    
                    <div className="flex-1 space-y-3">
                      <h3 className="text-2xl md:text-3xl font-bold text-secondary font-heading group-hover:text-primary transition-colors duration-300">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 text-lg leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>

                  {/* Subtle arrow indicator */}
                  <div className="absolute right-6 top-1/2 transform -translate-y-1/2 text-primary/40 group-hover:text-primary group-hover:translate-x-2 transition-all duration-300">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M13 7L18 12L13 17M6 12H18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom decorative element */}
          <motion.div 
            variants={itemVariants}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-primary/10 rounded-full">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <span className="text-primary font-medium text-sm">Personalizzato per ogni pet</span>
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};