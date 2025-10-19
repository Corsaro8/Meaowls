"use client";
import React, { useRef, useState, useEffect } from "react";
import { Dog, Cat, Calendar, Clock, Euro, ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "@/lib/framer-motion-shim";

const examples = [
  {
    id: 1,
    name: "Abbonamento di Pepe",
    petType: "dog",
    breed: "Labrador Retriever",
    age: 5,
    weight: 33,
    items: [
      {
        name: "Trainer Natural - Medium - Adult - Manzo - 12 kg",
        price: 32.25,
      },
      {
        name: "2x110g Training Royal Canin Snack",
        price: 5.99,
      },
    ],
    total: 38.24,
    frequency: "Ogni 2 settimane",
    day: "Domenica",
    time: "14-18 pomeriggio",
    color: "#FF6B35",
    textColor: "#FFFFFF",
  },
  {
    id: 2,
    name: "Abbonamento di Briciola",
    petType: "cat",
    breed: "Europeo pelo corto",
    age: 3,
    weight: 4.5,
    items: [
      {
        name: "Monge Monoprotein Sfilaccetti Solo tacchino - 80g x 6",
        price: 5.70,
        calculation: "0,95 x 6 = 5,70 euro",
      },
      {
        name: "Lettiera Cat Fresh Classic 8lt 5kg - PURINA",
        price: 4.99,
      },
    ],
    total: 10.69,
    frequency: "Ogni settimana",
    day: "Lunedì",
    time: "8-12 mattina",
    color: "#0891B2",
    textColor: "#FFFFFF",
  },
  {
    id: 3,
    name: "Abbonamento Milo",
    petType: "dog",
    breed: "Pastore Tedesco",
    age: 1,
    weight: 42,
    items: [
      { name: "Crocchette Premium Puppy XL", price: 37.22 },
      { name: "Snack pollo Purina", price: 8.5 },
    ],
    total: 45.72,
    frequency: "Mensile",
    day: "15 del mese",
    time: "14-18 pomeriggio",
    color: "#48BB78",
    textColor: "#FFFFFF",
  },
  {
    id: 4,
    name: "Abbonamento Luna",
    petType: "cat",
    breed: "Siamese",
    age: 7,
    weight: 5.2,
    items: [
      { name: "Umido Gourmet Gold Mix 12x85g", price: 9.9 },
      { name: "Lettiera Naturale 10L", price: 8.3 },
    ],
    total: 18.2,
    frequency: "Ogni mercoledì",
    day: "Mercoledì",
    time: "18-20 sera",
    color: "#2D3748",
    textColor: "#FFFFFF",
  },
  {
    id: 5,
    name: "Abbonamento Leo",
    petType: "dog",
    breed: "Beagle",
    age: 4,
    weight: 12,
    items: [
      { name: "Cibo Biologico - Secco Manzo 3kg", price: 16.3 },
      { name: "Integratore pelo lucido", price: 5.5 },
    ],
    total: 21.8,
    frequency: "Ogni venerdì",
    day: "Venerdì",
    time: "8-12 mattina",
    color: "#F7FAFC",
    textColor: "#2D3748",
  },
  {
    id: 6,
    name: "Abbonamento Bella",
    petType: "cat",
    breed: "Maine Coon",
    age: 6,
    weight: 7.8,
    items: [
      { name: "Erba Gatta fresca 25g", price: 3.5 },
      { name: "Tiragraffi Mini", price: 12.2 },
    ],
    total: 15.7,
    frequency: "Mensile",
    day: "5 del mese",
    time: "14-18 pomeriggio",
    color: "#FFFFFF",
    textColor: "#2D3748",
  },
];

export const SubscriptionExamplesAlt = () => {
  const [current, setCurrent] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const total = examples.length;
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const ITEMS_VISIBLE = 1;

  // Autoplay logic
  useEffect(() => {
    if (!autoplay) return;
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % total);
    }, 5000);
    return () => intervalRef.current && clearInterval(intervalRef.current);
  }, [autoplay, total]);

  // Arrow navigation
  const prev = () => {
    setCurrent((prev) => (prev === 0 ? total - 1 : prev - 1));
    setAutoplay(false);
  };
  const next = () => {
    setCurrent((prev) => (prev + 1) % total);
    setAutoplay(false);
  };

  return (
    <section className="py-14 px-2 sm:px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-extrabold mb-2 text-gray-900 tracking-tight font-heading">
            Esempi di Abbonamento
          </h2>
          <p className="text-base md:text-lg text-gray-500 max-w-2xl mx-auto">
            Componi il tuo abbonamento proprio come fanno altri Pet owners!
          </p>
        </div>
        {/* CAROUSEL */}
        <div className="relative flex flex-col items-center">
          <div className="flex items-center w-full">
            {/* Left Arrow */}
            <button
              className="hidden sm:flex items-center justify-center rounded-full border bg-white shadow hover:bg-gray-50 transition w-10 h-10 absolute left-0 top-1/2 -translate-y-1/2 z-10"
              aria-label="Precedente"
              style={{ boxShadow: '0 2px 10px rgba(45,55,72,0.07)' }}
              onClick={prev}
              tabIndex={0}
            >
              <ChevronLeft className="text-gray-800" />
            </button>
            {/* Carousel track */}
            <div
              className="flex-1 overflow-x-hidden w-full relative"
              onMouseEnter={() => setAutoplay(false)}
              onMouseLeave={() => setAutoplay(true)}
            >
              <div className="flex w-full justify-center ">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={examples[current].id}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ type: "spring", stiffness: 100, damping: 22, duration: 0.4 }}
                    className="w-full max-w-md md:max-w-lg"
                  >
                    <CardCarousel example={examples[current]} />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
            {/* Right Arrow */}
            <button
              className="hidden sm:flex items-center justify-center rounded-full border bg-white shadow hover:bg-gray-50 transition w-10 h-10 absolute right-0 top-1/2 -translate-y-1/2 z-10"
              aria-label="Successivo"
              style={{ boxShadow: '0 2px 10px rgba(45,55,72,0.07)' }}
              onClick={next}
              tabIndex={0}
            >
              <ChevronRight className="text-gray-800" />
            </button>
          </div>
          <div className="flex justify-center items-center mt-6 gap-2">
            {examples.map((_, idx) => (
              <button
                key={idx}
                aria-label={`Vai alla card ${idx + 1}`}
                className={`h-2.5 w-2.5 rounded-full transition-all border focus:outline-none ${
                  idx === current
                    ? 'bg-orange-500 border-orange-400 scale-110'
                    : 'bg-gray-200 border-gray-300 opacity-50'
                }`}
                onClick={() => {
                  setCurrent(idx);
                  setAutoplay(false);
                }}
              />
            ))}
          </div>
        </div>
        {/* CTA */}
        <div className="text-center mt-12">
          <p className="opacity-80 mb-4 text-gray-800 text-base font-medium">
            Pronto a creare il tuo abbonamento personalizzato?
          </p>
          <button className="inline-flex items-center px-8 py-3 rounded-full bg-orange-500 text-white font-semibold shadow-sm hover:bg-orange-600 transition-all text-sm">
            Inizia Ora
          </button>
        </div>
      </div>
    </section>
  );
};

interface CardCarouselProps {
  example: typeof examples[0];
}

function CardCarousel({ example }: CardCarouselProps) {
  const isVeryLightBg = example.color === "#FFFFFF" || example.color === "#F7FAFC";
  const bgStyle = isVeryLightBg
    ? { background: "linear-gradient(135deg, #fff 95%, #f7fafc)", borderColor: "#E2E8F0" }
    : { background: `linear-gradient(135deg, ${example.color} 98%, #fff 135%)`, borderColor: "#E2E8F0" };
  const textClass = isVeryLightBg ? "text-gray-800" : "text-white";
  const mutedTextClass = isVeryLightBg ? "text-gray-700" : "text-neutral-200";

  return (
    <motion.div
      whileHover={{
        scale: 1.045,
        boxShadow: "0 8px 40px 0 rgba(255, 107, 53, 0.18)",
        y: -8,
        transition: { duration: 0.23, type: "spring", stiffness: 160, damping: 20 },
      }}
      className={
        "rounded-3xl border shadow-lg flex flex-col h-full relative group cursor-pointer transition-transform" +
        (isVeryLightBg ? " bg-white/90" : "")
      }
      style={bgStyle}
    >
      {/* Overlay arancione glow al passaggio hover */}
      <div className="pointer-events-none invisible group-hover:visible transition-opacity duration-300 absolute inset-0 z-10 rounded-3xl bg-gradient-to-br from-orange-400/10 via-orange-400/20 to-orange-500/10 blur-[1px]" />
      {/* Header card + dettagli pet */}
      <div className="flex items-center gap-3 px-6 pt-5 pb-2">
        <span className="inline-flex items-center justify-center rounded-full border border-gray-200 bg-gray-50 w-9 h-9">
          {example.petType === "dog" ? (
            <Dog size={20} className="text-orange-400" />
          ) : (
            <Cat size={20} className="text-emerald-500" />
          )}
        </span>
        <span className={`font-semibold text-base truncate font-heading opacity-95 ${textClass}`}>
          {example.name}
        </span>
      </div>
      {/* Dati razza, anni, peso */}
      <div className={`flex flex-wrap gap-x-3 gap-y-1 px-6 text-xs font-semibold mb-0.5 mt-0.5 ${mutedTextClass}`}>
        <div className="inline-flex items-center gap-1">
          <span className="font-bold text-orange-500">Razza:</span> {example.breed}
        </div>
        <div className="inline-flex items-center gap-1">
          <span className="font-bold text-orange-500">Età:</span> {example.age} anni
        </div>
        <div className="inline-flex items-center gap-1">
          <span className="font-bold text-orange-500">Peso:</span> {example.weight} kg
        </div>
      </div>
      <div className="flex-1 flex flex-col px-6 py-1">
        {/* Dettaglio prodotti */}
        <ul className={`flex flex-col gap-1 mb-2 mt-1 text-xs font-normal ${mutedTextClass}`}>
          {example.items.map((item, idx) => (
            <li
              key={idx}
              className={`flex items-baseline justify-between text-xs ${mutedTextClass}`}
            >
              <span className="truncate opacity-90">{item.name}</span>
              <span className="flex items-center gap-1 font-medium opacity-80">
                <Euro size={12} />
                {item.calculation ? item.calculation : `${item.price.toFixed(2)} €`}
              </span>
            </li>
          ))}
        </ul>
        {/* Totale */}
        <div className={`flex items-center gap-2 justify-between mb-1 mt-2 text-xs opacity-90 ${textClass}`}>
          <span className="flex items-center gap-1">
            <ShoppingCart size={14} /> Totale abbonamento:
          </span>
          <span className="text-base font-bold tracking-tight opacity-95" style={{color: example.textColor}}>
            €{example.total.toFixed(2)}
          </span>
        </div>
        {/* Frequenza e giorno/orario */}
        <div className={`flex flex-col gap-0.5 mb-2 mt-auto opacity-80 ${textClass}`}>
          <div className="flex items-center gap-2 text-[13px]">
            <Calendar size={13} />
            <span>{example.frequency} {example.day}</span>
          </div>
          <div className="flex items-center gap-2 text-[13px]">
            <Clock size={13} />
            <span>{example.time}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}