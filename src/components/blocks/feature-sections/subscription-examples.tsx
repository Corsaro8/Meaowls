"use client";

import React, { useState, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, Euro, Calendar, Dog, Cat, ShoppingCart } from 'lucide-react'
import { motion } from "@/lib/framer-motion-shim"

export const SubscriptionExamples = () => {
  const subscriptions = [
    {
      id: 1,
      name: "Abbonamento di Pepe",
      icon: Dog,
      items: [
        {
          name: "Trainer Natural - Medium - Adult - Manzo - 12 kg",
          price: 32.25
        },
        {
          name: "2x110g Training Royal Canin Snack",
          price: 5.99
        }
      ],
      total: 38.24,
      frequency: "Ogni 2 settimane",
      deliveryDay: "Domenica",
      backgroundColor: "#FF6B35",
      selectedFrequency: 2, // ogni 2 settimane
      selectedDay: 'Domenica',
      selectedTimeSlot: 'pomeriggio' // orario casuale per Pepe
    },
    {
      id: 2,
      name: "Abbonamento di Briciola",
      icon: Cat,
      items: [
        {
          name: "Monge Monoprotein Sfilaccetti Solo tacchino - gatti adulti 80g - mangime veterinario -- x 6",
          price: 5.70,
          calculation: "0,95 X 6 = 5,70 euro"
        },
        {
          name: "Lettiera per gatti Cat Fresh Classic 8lt 5kg - PURINA",
          price: 4.99
        }
      ],
      total: 10.69,
      frequency: "Ogni settimana",
      deliveryDay: "Lunedì",
      backgroundColor: "#0891B2",
      selectedFrequency: 1, // ogni settimana
      selectedDay: 'Lunedì',
      selectedTimeSlot: 'mattina' // orario casuale per Briciola
    }
  ]

  const frequencyOptions = [
    { value: 1, label: 'ogni settimana' },
    { value: 2, label: 'ogni due' },
    { value: 3, label: 'ogni tre' },
    { value: 4, label: 'ogni quattro' }
  ];

  const dayOptions = ['Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato', 'Domenica'];

  const timeSlotOptions = [
    { value: 'mattina', label: '8-12 mattina' },
    { value: 'pomeriggio', label: '14-18 pomeriggio' },
    { value: 'sera', label: '18-20 sera' }
  ];

  const [subscriptionSettings, setSubscriptionSettings] = useState(
    subscriptions.reduce((acc, sub) => ({
      ...acc,
      [sub.id]: {
        frequency: sub.selectedFrequency,
        day: sub.selectedDay,
        timeSlot: sub.selectedTimeSlot
      }
    }), {})
  );
  const carouselRef = useRef<HTMLDivElement>(null);

  const updateSubscriptionSetting = (subscriptionId, type, value) => {
    setSubscriptionSettings(prev => ({
      ...prev,
      [subscriptionId]: {
        ...prev[subscriptionId],
        [type]: value
      }
    }));
  };

  // Simple horizontal scroll handlers
  const scroll = (dir: 'left' | 'right') => {
    const container = carouselRef.current;
    if (container) {
      const cardWidth = container.firstChild?.clientWidth || 320;
      container.scrollBy({
        left: dir === 'right' ? cardWidth + 24 : -(cardWidth + 24),
        behavior: 'smooth',
      });
    }
  };

  return null;
};