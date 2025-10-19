"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Dog, Cat, MessageCircle } from "lucide-react";
import { motion } from "@/lib/framer-motion-shim";
import { Vortex } from "@/components/ui/vortex";
import { CanvasRevealEffect } from "@/components/ui/canvas-reveal-effect";

export default function SplitWithImage() {
  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* Dynamic Vortex Background */}
      <div className="absolute inset-0">
        <Vortex
          backgroundColor="black"
          rangeY={800}
          particleCount={500}
          baseHue={30}
          baseSpeed={0.5}
          rangeSpeed={1}
          containerClassName="w-full h-full"
          className="flex items-center flex-col justify-center px-2 md:px-10 py-4 w-full h-full">

          {/* Floating Navigation */}
          <motion.nav
            className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 bg-white/10 backdrop-blur-lg border border-white/20 rounded-full px-6 py-3"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}>

            <div className="flex items-center space-x-8">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-[#FF6B35] rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">M</span>
                </div>
                <span className="ml-2 text-xl font-bold text-white">meaowls</span>
              </div>
              
              <div className="hidden md:flex items-center space-x-6">
                <a href="#" className="text-sm font-medium text-white/80 hover:text-[#FF6B35] transition-colors">

                </a>
                <a href="#" className="text-sm font-medium text-white/80 hover:text-[#FF6B35] transition-colors">
                  Prodotti
                </a>
                <a href="#" className="text-sm font-medium text-white/80 hover:text-[#FF6B35] transition-colors">
                  Piani di Abbonamento
                </a>
                <a href="#" className="text-sm font-medium text-white/80 hover:text-[#FF6B35] transition-colors">
                  Contatti
                </a>
                <motion.a
                  href="#"
                  className="rounded-full bg-[#FF6B35] px-4 py-2 text-sm font-semibold text-white shadow-lg"
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(255, 107, 53, 0.3)" }}
                  whileTap={{ scale: 0.95 }}>

                  Accedi
                </motion.a>
              </div>
            </div>
          </motion.nav>
          
          {/* Main Content Container */}
          <div className="relative z-10 w-full max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-screen pt-24">
              
              {/* Left Content */}
              <div className="text-center lg:text-left space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}>

                  <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 text-white/80 text-sm mb-6">
                    <span className="w-2 h-2 bg-[#FF6B35] rounded-full mr-2 animate-pulse"></span>
                    Servizio di consegna premium per animali domestici
                  </div>
                </motion.div>

                <motion.h1
                  className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}>

                  DA OGGI IL{" "}
                  <motion.span
                    className="text-[#FF6B35] relative"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.8 }}>

                    DELIVERY
                    <motion.div
                      className="absolute -inset-2 bg-[#FF6B35]/20 rounded-lg blur-sm -z-10"
                      animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.5, 0.8, 0.5]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }} />

                  </motion.span>{" "}
                  ANCHE PER I TUOI AMICI A QUATTRO ZAMPE
                </motion.h1>

                <motion.p
                  className="text-xl md:text-2xl text-white/80 leading-relaxed max-w-2xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}>

                  meaowls è il primo servizio di consegna a domicilio in abbonamento di cibo per cani e gatti
                </motion.p>

                {/* Action Buttons */}
                <motion.div
                  className="flex flex-col sm:flex-row gap-4 pt-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}>

                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}>

                    <Button className="w-full sm:w-auto bg-[#FF6B35] hover:bg-[#FF6B35]/90 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300">
                      <Dog className="w-6 h-6 mr-3" />
                      Cibo per Cani
                    </Button>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}>

                    <Button className="w-full sm:w-auto bg-white/10 backdrop-blur-sm border border-white/30 hover:bg-white/20 text-white px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300">
                      <Cat className="w-6 h-6 mr-3" />
                      Cibo per Gatti
                    </Button>
                  </motion.div>
                </motion.div>

                {/* Additional Info */}
                <motion.div
                  className="space-y-4 pt-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 1.0 }}>

                  <p className="text-white/70 text-base font-medium">
                    Scegli tra le migliori marche premium.
                  </p>
                  
                  <p className="text-white/60 text-sm">
                    Non trovi la tua marca preferita? Contattaci per richieste speciali
                  </p>
                  
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}>

                    <Button variant="ghost" className="text-[#FF6B35] hover:bg-[#FF6B35]/10 border border-[#FF6B35]/50 rounded-full px-6 py-2 text-sm font-medium transition-all duration-300">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Contattaci
                    </Button>
                  </motion.div>
                </motion.div>
              </div>

              {/* Right Content - Image with Canvas Reveal Effect */}
              <div className="relative">
                <motion.div
                  className="relative"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}>

                  {/* Canvas Reveal Effect Container */}
                  <div className="relative w-full h-[500px] rounded-3xl overflow-hidden bg-black border border-white/20">
                    <CanvasRevealEffect
                      animationSpeed={0.4}
                      containerClassName="bg-black rounded-3xl"
                      colors={[
                      [255, 107, 53], // Orange
                      [255, 140, 0], // Dark Orange
                      [255, 165, 0] // Orange variations
                      ]}
                      dotSize={2} />

                    
                    {/* Image overlay with blend mode */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.img
                        src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/1752673132414-h3tt9bsk6a.jpg"
                        alt="Cane felice"
                        className="w-full h-full object-contain mix-blend-soft-light opacity-90 shadow-2xl rounded-2xl"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.3 }} />

                    </div>

                    {/* Floating UI Elements */}
                    <motion.div
                      className="absolute top-6 left-6 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-white text-sm font-medium"
                      animate={{
                        y: [0, -5, 0],
                        opacity: [0.8, 1, 0.8]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}>

                      🐕 Premium Quality
                    </motion.div>

                    <motion.div
                      className="absolute bottom-6 right-6 bg-[#FF6B35]/20 backdrop-blur-sm border border-[#FF6B35]/30 rounded-full px-4 py-2 text-white text-sm font-medium"
                      animate={{
                        y: [0, 5, 0],
                        opacity: [0.8, 1, 0.8]
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1
                      }}>

                      🚚 Fast Delivery
                    </motion.div>
                  </div>

                  {/* Decorative floating elements */}
                  <motion.div
                    className="absolute -top-4 -left-4 w-24 h-24 bg-[#FF6B35]/20 rounded-full blur-xl"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.6, 0.3]
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }} />


                  <motion.div
                    className="absolute -bottom-6 -right-6 w-32 h-32 bg-white/10 rounded-full blur-2xl"
                    animate={{
                      scale: [1, 1.1, 1],
                      opacity: [0.2, 0.4, 0.2]
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1
                    }} />

                </motion.div>
              </div>
            </div>
          </div>
        </Vortex>
      </div>
    </div>);

}