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

interface FlexibleDeliveryTimesProps {
  className?: string;
}

export const FlexibleDeliveryTimes: React.FC<FlexibleDeliveryTimesProps> = ({ className = "" }) => {
  const [hoveredSlot, setHoveredSlot] = useState<string | null>(null);

  const deliverySlots: DeliveryTimeSlot[] = [
    {
      id: "morning",
      label: "Mattina",
      time: "8:00 - 12:00",
      icon: <Sun className="w-4 h-4 text-amber-500" />
    },
    {
      id: "afternoon",
      label: "Pomeriggio", 
      time: "14:00 - 18:00",
      icon: <SunMedium className="w-4 h-4 text-orange-500" />
    },
    {
      id: "evening",
      label: "Sera",
      time: "18:00 - 20:00", 
      icon: <Moon className="w-4 h-4 text-indigo-500" />
    }
  ];

  return (
    <></>
  );
};