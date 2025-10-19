"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';

interface LeftAlignedHeroProps {}

export const LeftAlignedHero: React.FC<LeftAlignedHeroProps> = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 2;

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => prev === 0 ? totalSlides - 1 : prev - 1);
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => prev === totalSlides - 1 ? 0 : prev + 1);
  };

  return (
    <section className="relative h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/1752851247791-vhcdyz4q34.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center top'
        }} />

      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/30 w-full" />
      
      {/* Navigation Arrows */}
      <button
        onClick={handlePrevSlide}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm flex items-center justify-center transition-all duration-300 group"
        aria-label="Previous slide">

        <ChevronLeft className="w-6 h-6 text-white" />
      </button>
      
      <button
        onClick={handleNextSlide}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm flex items-center justify-center transition-all duration-300 group"
        aria-label="Next slide">

        <ChevronRight className="w-6 h-6 text-white" />
      </button>
      
      {/* Content Container */}
      <div className="relative z-10 w-full px-8 md:px-16 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto space-y-8 text-center">

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-white">
            Da oggi il{' '}
            <span className="text-[#FF6B35]">DELIVERY</span>{' '}
            anche per i tuoi amici a 4 zampe
          </h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-base md:text-lg lg:text-xl text-white leading-relaxed max-w-3xl mx-auto !whitespace-pre-line">Meaowls è il primo servizio in Italia di consegna a domicilio in abbonamento di cibo per cani e gatti.

          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-4 pt-4 justify-center">
            
            <Button
              size="lg"
              className="px-8 py-6 text-lg font-semibold bg-[#FF6B35] hover:bg-[#e55a2b] text-white shadow-xl hover:shadow-2xl transition-all duration-300"
              asChild>
              <a href="#cibo-perfetto">
                Inizia ora
              </a>
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="px-8 py-6 text-lg font-semibold bg-white/10 hover:bg-white/20 text-white border-2 border-white/50 backdrop-blur-sm transition-all duration-300 flex items-center gap-2"
              asChild>
              <a href="#come-funziona">
                Scopri di più
                <ChevronDown className="w-5 h-5" />
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {Array.from({ length: totalSlides }).map((_, index) =>
        <button
          key={index}
          onClick={() => setCurrentSlide(index)}
          className={`w-3 h-3 rounded-full transition-all duration-300 ${
          currentSlide === index ?
          'bg-white w-8' :
          'bg-white/50 hover:bg-white/70'}`
          }
          aria-label={`Go to slide ${index + 1}`} />

        )}
      </div>
    </section>
  );
};