"use client";

import React from 'react';

export function PetsRunningDivider() {
  return (
    <div className="relative w-full h-48 sm:h-64 md:h-80 overflow-hidden bg-gradient-to-r from-orange-100 via-amber-50 to-orange-100">
      {/* Immagine di sfondo */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `url('https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/d1111b7e-c722-4451-bcb9-81243c18f800/generated_images/wide-panoramic-photograph-of-happy-dogs--c23ad7a0-20251007204124.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />
      
      {/* Overlay scuro per ridurre la luminosità */}
      <div className="absolute inset-0 bg-black/50" />
      
      {/* Gradiente per sfumare i bordi */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-white/10" />
    </div>
  );
}