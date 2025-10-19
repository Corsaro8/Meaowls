"use client";

import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';

export const CTASection = () => {
  return (
    <section className="bg-white py-8 px-4 relative overflow-hidden">
      {/* Decorative background gradient */}
      <div className="absolute inset-0 overflow-hidden !w-[1313px] !h-[549px]">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-100 rounded-full filter blur-xl opacity-60 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-100 rounded-full filter blur-xl opacity-60 animate-pulse"></div>
      </div>
      
      <div className="w-full text-center relative z-10">
        <h2 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-8 font-[Inter]">
          Pronto a viziare il tuo pet?
        </h2>
        
        <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
          Inizia oggi con un piano personalizzato e scopri
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            size="lg"
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-4 rounded-md transition-all duration-300 hover:shadow-lg text-lg">
            Inizia Subito
          </Button>
          
          <button className="text-gray-700 hover:text-orange-500 font-medium transition-colors duration-300 flex items-center gap-2 group text-lg !whitespace-pre-line !w-[120px] !h-7 !whitespace-pre-line">contattaci

            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </section>);

};