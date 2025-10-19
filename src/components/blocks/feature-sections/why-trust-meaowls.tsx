"use client";

import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle } from 'lucide-react';

export const WhyMeaowls = () => {
  const problems = [
    "Stanco di rimanere sempre senza scorte di cibo?",
    "o di fare le corse al supermercato all'ultimo minuto?",
    "Il cibo del tuo cane pesa troppo e stai al quarto piano senza ascensore?",
    "Esci da lavorare alle 20 e il trovi il supermercato sempre chiuso?"
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.7 }
    }
  };

  const solutionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: 0.8 }
    }
  };

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-white via-slate-50 to-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
          className="grid lg:grid-cols-2 gap-12 items-center"
        >
          {/* Left side - Content */}
          <motion.div variants={itemVariants} className="space-y-8">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800 leading-tight">
              Perché affidarsi a{' '}
              <span className="text-orange-500 relative">
                meaowls
                <div className="absolute -bottom-2 left-0 right-0 h-1 bg-orange-500/30 rounded-full"></div>
              </span>
            </h2>

            <div className="space-y-4">
              {problems.map((problem, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="flex items-start gap-3 group"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.1 + 0.5, duration: 0.3 }}
                    className="flex-shrink-0 mt-1"
                  >
                    <CheckCircle className="w-5 h-5 text-orange-500 group-hover:text-orange-600 transition-colors duration-200" />
                  </motion.div>
                  <p className="text-slate-600 text-lg italic leading-relaxed group-hover:text-slate-700 transition-colors duration-200">
                    {problem}
                  </p>
                </motion.div>
              ))}
            </div>

            <motion.div
              variants={solutionVariants}
              className="bg-gradient-to-r from-orange-50 to-orange-100/50 p-6 rounded-2xl border-l-4 border-orange-500 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <p className="text-xl md:text-2xl font-semibold text-slate-800 leading-relaxed">
                Da oggi affidati a{' '}
                <span className="text-orange-500 font-bold">Meaowls</span>{' '}
                e a portarti il cibo ci penseremo noi
              </p>
            </motion.div>
          </motion.div>

          {/* Right side - Image */}
          <motion.div
            variants={imageVariants}
            className="relative order-first lg:order-last"
          >
            <div className="relative overflow-hidden rounded-3xl shadow-2xl">
              <img
                src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/d1111b7e-c722-4451-bcb9-81243c18f800/generated_images/digital-illustration-of-a-stressed-pet-o-8e8b2e2e-20250714145546.jpg"
                alt="Pet owner struggling with shopping"
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-orange-500/20 rounded-full blur-xl"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl"></div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyMeaowls;