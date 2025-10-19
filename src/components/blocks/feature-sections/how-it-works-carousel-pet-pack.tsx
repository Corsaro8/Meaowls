"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface StepData {
  title: string;
  description: string;
  cta: string;
  image: string;
  alt: string;
}

const steps: StepData[] = [
  {
    title: "Chi è il tuo compagno di avventure?",
    description: "Inserisci nome, specie, razza, età e peso del tuo animale domestico.",
    cta: "Inizia ora",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/d1111b7e-c722-4451-bcb9-81243c18f800/generated_images/cute-cartoon-illustration%2c-pastel-pale-3f1ac92a-20250725072257.jpg",
    alt: "Illustrazione carina di animali domestici in stile cartoon con colori pastello"
  },
  {
    title: "Cosa gli piace (e cosa no)?",
    description: "Seleziona gusti preferiti, eventuali allergie o intolleranze.",
    cta: "Avanti",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/d1111b7e-c722-4451-bcb9-81243c18f800/generated_images/whimsical-cartoon%2c-pastel-colors%3a-a--35933eb9-20250725072307.jpg",
    alt: "Illustrazione fantasiosa con colori pastello che mostra preferenze alimentari per animali"
  },
  {
    title: "Una dieta pensata da esperti (e da AI)",
    description: "Scopri la dieta ideale per il tuo pet, creata con il nostro algoritmo nutrizionale.",
    cta: "Vedi la dieta",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/d1111b7e-c722-4451-bcb9-81243c18f800/generated_images/pastel-cartoon%2c-light-modern-style%3a--fc3eb3c2-20250725072318.jpg",
    alt: "Illustrazione moderna in stile cartoon che rappresenta una dieta personalizzata per animali"
  },
  {
    title: "Tutto il necessario, in un'unica box",
    description: "Ricevi cibo, snack, e accessori utili come antiparassitari, in base alla stagionalità.",
    cta: "Anteprima pacco",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/d1111b7e-c722-4451-bcb9-81243c18f800/generated_images/fun-cartoon%2c-pastel%2c-modern%3a-deliv-9ea02d64-20250725072329.jpg",
    alt: "Illustrazione divertente di una scatola di consegna con prodotti per animali domestici"
  },
  {
    title: "Mai più senza crocchette!",
    description: "Scegli ogni quanto ricevere il pacco: mensile, bimestrale o su richiesta.",
    cta: "Scegli il piano",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/d1111b7e-c722-4451-bcb9-81243c18f800/generated_images/cartoon%2c-friendly%2c-pastel-tones%3a-c-73218d4f-20250725072342.jpg",
    alt: "Illustrazione amichevole con toni pastello che mostra la pianificazione delle consegne"
  },
  {
    title: "Consegna rapida, pet felice",
    description: "Controlla il riepilogo e finalizza l'ordine in pochi clic.",
    cta: "Completa ordine",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/d1111b7e-c722-4451-bcb9-81243c18f800/generated_images/cartoon-illustration%2c-light-pastel-pal-2e1c7fac-20250725072351.jpg",
    alt: "Illustrazione cartoon con palette pastello che rappresenta una consegna felice"
  }
];

export const HowItWorksCarouselPetPack: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [touchStart, setTouchStart] = useState<number>(0);
  const [touchEnd, setTouchEnd] = useState<number>(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<NodeJS.Timeout>();

  const getVisibleItems = (): number => {
    return window.innerWidth >= 1024 ? 3 : 2;
  };

  const [visibleItems, setVisibleItems] = useState<number>(2);

  useEffect(() => {
    const handleResize = (): void => {
      setVisibleItems(getVisibleItems());
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, steps.length - visibleItems);

  const nextSlide = useCallback((): void => {
    setCurrentIndex(prev => prev >= maxIndex ? 0 : prev + 1);
  }, [maxIndex]);

  const prevSlide = useCallback((): void => {
    setCurrentIndex(prev => prev <= 0 ? maxIndex : prev - 1);
  }, [maxIndex]);

  const goToSlide = (index: number): void => {
    setCurrentIndex(Math.min(index, maxIndex));
  };

  const startAutoPlay = useCallback((): void => {
    if (autoPlayRef.current) {
      clearTimeout(autoPlayRef.current);
    }
    autoPlayRef.current = setTimeout(nextSlide, 5500);
  }, [nextSlide]);

  const stopAutoPlay = (): void => {
    if (autoPlayRef.current) {
      clearTimeout(autoPlayRef.current);
    }
  };

  useEffect(() => {
    if (!isHovered) {
      startAutoPlay();
    } else {
      stopAutoPlay();
    }

    return () => stopAutoPlay();
  }, [isHovered, startAutoPlay]);

  const handleTouchStart = (e: React.TouchEvent): void => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent): void => {
    setTouchEnd(e.touches[0].clientX);
  };

  const handleTouchEnd = (): void => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50;

    if (Math.abs(distance) < minSwipeDistance) return;

    if (distance > 0) {
      nextSlide();
    } else {
      prevSlide();
    }

    setTouchStart(0);
    setTouchEnd(0);
  };

  const translateX = -(currentIndex * (100 / visibleItems));

  return null;
};