"use client";

import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

export const PetGuidanceSection = () => {
  const handleStartClick = () => {
    // Placeholder for navigation or modal opening
    console.log("Starting pet guidance...");
  };

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-secondary/30 via-background to-secondary/20 font-inter">
      <div className="max-w-4xl mx-auto text-center">
        {/* Icon */}
        <div className="flex justify-center mb-8">
          <div className="p-4 rounded-full bg-primary/10 shadow-sm">
            <Heart className="h-12 w-12 text-primary" />
          </div>
        </div>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
          Descrivi il profilo del tuo pet e trovi il cibo adatto a lui
        </p>

        {/* Button */}
        <Button
          onClick={handleStartClick}
          size="lg"
          className="px-12 py-4 text-lg font-semibold bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          inizia
        </Button>

        {/* Decorative elements */}
        <div className="mt-16 flex justify-center space-x-2 opacity-30">
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse hidden"></div>
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse hidden" style={{ animationDelay: "0.2s" }}></div>
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse hidden" style={{ animationDelay: "0.4s" }}></div>
        </div>
      </div>
    </section>
  );
};