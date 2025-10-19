"use client";

import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

export const PetGuidanceSection = () => {
  const handleStartClick = () => {
    console.log("Pet guidance started");
  };

  return (
    <section className="relative bg-white overflow-hidden">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 to-white" />
      
      {/* Decorative animated dots */}
      <div className="absolute top-20 left-10 w-2 h-2 bg-primary/20 rounded-full animate-pulse" />
      <div className="absolute top-40 right-16 w-1 h-1 bg-primary/30 rounded-full animate-pulse delay-300" />
      <div className="absolute bottom-32 left-20 w-3 h-3 bg-primary/15 rounded-full animate-pulse delay-700" />
      <div className="absolute bottom-20 right-32 w-2 h-2 bg-primary/25 rounded-full animate-pulse delay-500" />
      
      {/* Pattern background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-24 h-24 border border-primary/20 rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-32 h-32 border border-primary/15 rounded-full" />
      </div>
      
      <div className="relative container mx-auto px-4 py-24 lg:py-32">
        <div className="max-w-4xl mx-auto text-center">
          {/* Heart icon with animation */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full">
              <Heart 
                className="w-8 h-8 text-primary animate-pulse" 
                fill="currentColor"
              />
            </div>
          </div>
          
          {/* Subtitle */}
          <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground font-medium mb-12 max-w-3xl mx-auto leading-relaxed font-[var(--font-inter)]">
            Descrivi il profilo del tuo pet e trovi il cibo adatto a lui
          </p>
          
          {/* CTA Button */}
          <div className="flex justify-center">
            <Button
              onClick={handleStartClick}
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-12 py-6 text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 font-[var(--font-inter)]"
              aria-label="Inizia il processo di selezione alimenti per il tuo pet"
            >
              inizia
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};