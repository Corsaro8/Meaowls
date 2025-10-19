"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "@/lib/framer-motion-shim";
import { Bell, Calendar, Settings } from "lucide-react";

const benefits = [
  {
    id: 1,
    title: "Consegne Prevedibili",
    description: "Ricevi i prodotti per il tuo pet sempre quando ne hai bisogno, senza sorprese.",
    icon: Bell,
    color: "bg-orange-50 border-orange-200"
  },
  {
    id: 2,
    title: "Finestra di Modifica", 
    description: "Hai sempre il controllo: modifica, pausa o cancella il tuo abbonamento quando vuoi.",
    icon: Calendar,
    color: "bg-blue-50 border-blue-200"
  },
  {
    id: 3,
    title: "Controllo Totale",
    description: "Gestisci facilmente quantità, frequenza e prodotti attraverso la tua area riservata.",
    icon: Settings,
    color: "bg-green-50 border-green-200"
  }
];

export const MeawolsAdvantages = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % benefits.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isPaused]);

  const handleIndicatorClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      {/* Enhanced Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/1752673132414-h3tt9bsk6a.jpg"
          alt="Background"
          className="w-full h-full object-cover opacity-10"
        />
      </div>

      {/* Large decorative background elements */}
      <div className="absolute top-1/4 left-10 w-24 h-24 bg-orange-200/30 rounded-full blur-xl"></div>
      <div className="absolute bottom-1/4 right-10 w-32 h-32 bg-orange-300/30 rounded-full blur-2xl"></div>

      <div className="relative z-10 container mx-auto px-4 max-w-7xl">
        {/* Main Title - ENORMOUS */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <h2 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-gray-900 mb-6 leading-tight">
            <motion.span
              className="bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 8,
                ease: "linear",
                repeat: Infinity,
              }}
            >
              Meaowls
            </motion.span>
            <br />
            <span className="bg-gradient-to-r from-orange-700 to-amber-600 bg-clip-text text-transparent">
              al tuo Servizio
            </span>
          </h2>
        </motion.div>

        {/* Subtitle - MASSIVE and centered */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-16"
        >
          <div className="inline-block bg-gradient-to-r from-orange-500 via-orange-400 to-amber-400 px-8 py-6 rounded-3xl shadow-2xl shadow-orange-500/40 transform hover:scale-105 transition-transform duration-300">
            <p className="text-2xl md:text-3xl lg:text-4xl font-semibold text-white leading-tight">
              Da oggi affidati a Meawols
              <br />
              <span className="text-amber-300">e a portarti il cibo ci penseremo noi</span>
            </p>
          </div>
        </motion.div>

        {/* Benefits Grid - Much larger */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            const isActive = index === activeIndex;

            return (
              <motion.div
                key={benefit.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.15 }}
                className={`relative p-10 rounded-2xl border-2 transition-all duration-500 cursor-pointer backdrop-blur-md ${
                  isActive
                    ? "bg-gradient-to-br from-orange-100/95 to-orange-200/95 border-orange-400 shadow-2xl shadow-orange-500/30 scale-110"
                    : "bg-white/95 border-gray-200 hover:border-orange-300 shadow-xl hover:shadow-2xl"
                }`}
                onClick={() => handleIndicatorClick(index)}
                whileHover={{ scale: isActive ? 1.12 : 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="text-center">
                  <motion.div
                    className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-6 mx-auto ${
                      isActive ? "bg-orange-500 shadow-lg" : "bg-orange-100 border-2 border-orange-200"
                    }`}
                    animate={isActive ? { rotateY: [0, 360], scale: [1, 1.1, 1] } : { rotateY: 0, scale: 1 }}
                    transition={{ duration: 0.6, repeat: isActive ? Infinity : 0, repeatDelay: 1 }}
                  >
                    <IconComponent
                      className={`w-10 h-10 transition-colors duration-300 ${
                        isActive ? "text-white" : "text-orange-600"
                      }`}
                    />
                  </motion.div>

                  <h3 className={`text-2xl md:text-3xl font-bold mb-4 ${
                    isActive ? "text-gray-900" : "text-gray-800"
                  }`}>
                    {benefit.title}
                  </h3>

                  <p className={`text-lg leading-relaxed ${
                    isActive ? "text-gray-700" : "text-gray-600"
                  }`}>
                    {benefit.description}
                  </p>
                </div>

                {/* Active indicator glow - enhanced */}
                {isActive && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-orange-200/20 to-orange-400/30 rounded-2xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Progress Indicators - Larger */}
        <div className="flex justify-center space-x-4 mb-8">
          {benefits.map((_, index) => (
            <motion.button
              key={index}
              className={`w-4 h-4 rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? "bg-orange-500 scale-150"
                  : "bg-gray-300 hover:bg-orange-300 hover:scale-110"
              }`}
              onClick={() => handleIndicatorClick(index)}
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: 0.8 }}
            />
          ))}
        </div>

        {/* Auto-rotation progress bar - Wider */}
        <div className="mt-8 flex justify-center">
          <div className="w-36 h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-orange-400 to-orange-600"
              initial={{ width: "0%" }}
              animate={{ width: isPaused ? "0%" : "100%" }}
              transition={{
                duration: isPaused ? 0 : 4,
                ease: "linear",
                repeat: isPaused ? 0 : Infinity,
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};