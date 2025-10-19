"use client";

import React from 'react';
import { Heart, PawPrint } from 'lucide-react';

export const WhatIsMeaowlsSection = () => {
  return (
    <section className="w-full bg-gray-50">
      {/* Full Width Two Backgrounds */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 min-h-[384px] !w-full !h-full">
        {/* Left Side - White Background with Title (Full Width) */}
        <div className="bg-white flex flex-col items-center justify-center p-6 lg:p-10 space-y-8 !w-[746px] !h-full">
          {/* Playful Title */}
          <div className="text-center relative">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold font-['Poppins',sans-serif] inline-block relative">
              <span className="text-[#FF6B35]">Cosa è </span>
              <span className="text-[#FFD700] relative inline-block animate-pulse" style={{ animationDuration: '2s' }}>
                Meaowls
                <span className="absolute -top-6 -right-7">
                  <Heart className="w-4 h-4 text-[#FF6B35] fill-[#FF6B35] animate-bounce" style={{ animationDuration: '1.5s' }} />
                </span>
              </span>
              <span className="text-[#FF6B35]">?</span>
            </h2>
          </div>

          {/* Description Text */}
          <div className="max-w-2xl">
            <p className="text-black text-sm md:text-base lg:text-lg leading-relaxed font-['Poppins',sans-serif] !w-full !h-full">
              Meaowls è il primo servizio in Italia che ti consegna direttamente a casa il cibo per il tuo animale domestico, ogni quanto vuoi tu, attraverso un sistema di abbonamento flessibile, a costo zero.
            </p>
          </div>

          {/* Mission Box - Moved here */}
          <div className="border-3 border-[#FF6B35] rounded-2xl p-4 lg:p-6 shadow-lg !w-[632px] !h-[147px] !max-w-[632px]">
            <p className="text-gray-900 text-xs md:text-sm lg:text-base leading-relaxed font-['Poppins',sans-serif]">
              La <span className="font-bold text-[#FF6B35]">nostra missione</span> è prenderci cura dell'alimentazione del tuo amico a quattro zampe come se fosse il nostro, garantendo che abbia sempre tutto ciò di cui ha bisogno. Così tu non dovrai più preoccuparti del cibo, ma solo di goderti ogni momento con lui.
            </p>
          </div>
        </div>

        {/* Right Side - White Background with Video */}
        <div className="bg-white flex items-center justify-center">
          <video 
            className="w-full h-full object-cover"
            autoPlay 
            loop 
            muted 
            playsInline
          >
            <source src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/d1111b7e-c722-4451-bcb9-81243c18f800/generated_videos/cinematic-scene-of-a-delivery-person-bri-e0080963-20251007203105.mp4" type="video/mp4" />
            Il tuo browser non supporta il tag video.
          </video>
        </div>
      </div>
    </section>);

};