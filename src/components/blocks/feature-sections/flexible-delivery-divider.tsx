"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Sun, SunMedium, Moon } from "lucide-react";

interface DeliveryTimeSlot {
  id: string;
  label: string;
  time: string;
  icon: React.ReactNode;
}

interface FlexibleDeliveryDividerProps {
  className?: string;
}

export const FlexibleDeliveryDivider: React.FC<FlexibleDeliveryDividerProps> = ({ className = "" }) => {
  const [hoveredSlot, setHoveredSlot] = useState<string | null>(null);

  const deliverySlots: DeliveryTimeSlot[] = [
    {
      id: "morning",
      label: "Mattina",
      time: "8:00 - 12:00",
      icon: <Sun className="w-5 h-5 text-amber-500" />
    },
    {
      id: "afternoon",
      label: "Pomeriggio", 
      time: "14:00 - 18:00",
      icon: <SunMedium className="w-5 h-5 text-orange-500" />
    },
    {
      id: "evening",
      label: "Sera",
      time: "18:00 - 20:00", 
      icon: <Moon className="w-5 h-5 text-indigo-500" />
    }
  ];

  return (
    <section className={`py-8 bg-gradient-to-b from-orange-50/40 to-white ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Consegne Flessibili{" "}
            <span className="text-primary">7 Giorni su 7</span>
          </h2>
          <p className="text-base text-gray-600">
            Scegli l'orario che si adatta meglio alla tua giornata.
          </p>
        </div>

        {/* Time Slots */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
          {deliverySlots.map((slot) => (
            <Card
              key={slot.id}
              className={`
                border-2 transition-all duration-300 cursor-pointer
                ${hoveredSlot === slot.id 
                  ? 'border-primary shadow-lg scale-105' 
                  : 'border-gray-200 hover:border-primary/50'
                }
              `}
              onMouseEnter={() => setHoveredSlot(slot.id)}
              onMouseLeave={() => setHoveredSlot(null)}
            >
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-3">
                  {slot.icon}
                </div>
                <h3 className="text-base font-semibold text-gray-900 mb-1">
                  {slot.label}
                </h3>
                <p className="text-xl font-bold text-primary">
                  {slot.time}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};