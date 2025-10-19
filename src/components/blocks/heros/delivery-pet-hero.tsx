"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Dog, Cat, MessageCircle } from 'lucide-react';

export const DeliveryPetHero: React.FC = () => {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <div className="relative h-screen w-full overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src="https://v3.fal.media/files/lion/Ny4mWWhrF82HfsojjzO7z_output.png"
            alt="Cane felice"
            className="w-full h-full object-cover"
          />
          {/* Gradient Overlay for Better Text Readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/30" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-6 leading-tight">
              DA OGGI IL{" "}
              <span className="text-[#FF6B35]">DELIVERY</span>{" "}
              ANCHE PER I TUOI AMICI A 4 ZAMPE
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Meaowls è il primo servizio di consegna a domicilio in abbonamento di cibo per cani e gatti.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Categories Section */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Category Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button 
                  size="lg" 
                  className="w-full sm:w-auto min-w-[200px] h-14 text-lg font-medium bg-[#FF6B35] hover:bg-[#FF6B35]/90 text-white shadow-lg rounded-lg"
                >
                  <Dog className="mr-2 h-6 w-6" />
                  Cibo per Cani
                </Button>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button 
                  size="lg" 
                  variant="outline"
                  className="w-full sm:w-auto min-w-[200px] h-14 text-lg font-medium border-2 border-[#FF6B35] text-[#FF6B35] hover:bg-[#FF6B35]/10 shadow-lg rounded-lg"
                >
                  <Cat className="mr-2 h-6 w-6" />
                  Cibo per Gatti
                </Button>
              </motion.div>
            </div>

            {/* Special Requests Section */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-center sm:text-left">
              <p className="text-[#2D3748] text-base">
                Non trovi la tua marca preferita? Contattaci per richieste speciali
              </p>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button 
                  variant="outline"
                  className="border-[#2D3748] text-[#2D3748] hover:bg-[#2D3748] hover:text-white rounded-lg"
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Contattaci
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};