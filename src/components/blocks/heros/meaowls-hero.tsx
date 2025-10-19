"use client";

import { Button } from "@/components/ui/button";
import { ChevronRight, Dog, Cat } from "lucide-react";
import Link from "next/link";

export const MeaowlsHero = () => {
  return (
    <div className="relative overflow-hidden bg-white">
      <div className="mx-auto max-w-7xl">
        <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <main className="px-6 pt-10 mx-auto max-w-7xl sm:pt-12 md:pt-16 lg:pt-20 xl:pt-28">
            <div className="lg:grid lg:grid-cols-12 lg:gap-8">
              <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-7 lg:text-left lg:mx-0">
                {/* Logo/Brand */}
                <div className="mb-8">
                  <h1 className="text-4xl font-bold font-inter text-[#FF6B35]">
                    Meaowls
                  </h1>
                  <p className="text-sm text-gray-600 font-inter">
                    Consegna cibo per animali
                  </p>
                </div>

                {/* Main headline */}
                <div>
                  <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl font-inter">
                    <span className="block xl:inline">
                      Cibo premium per{" "}
                    </span>
                    <span className="block text-red-900 xl:inline">
                      i tuoi amici pelosi
                    </span>
                  </h2>
                  <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0 font-inter">
                    Il cibo migliore per cani e gatti, selezionato con cura e consegnato direttamente a casa tua. Nutrizione sana, comoda e affidabile per i tuoi animali domestici.
                  </p>
                  
                  {/* Premium Brand Choice Section */}
                  <div className="mt-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 font-inter">
                      Scegli tra le migliori marche premium
                    </h3>
                    <div className="flex flex-col sm:flex-row gap-4 sm:justify-center lg:justify-start">
                      <Button 
                        size="lg" 
                        className="bg-[#FF6B35] hover:bg-[#FF6B35]/90 text-white font-semibold py-3 px-6 rounded-md transition-all duration-300 font-inter shadow-md hover:shadow-lg hover:scale-105"
                      >
                        <Dog className="w-5 h-5 mr-2" />
                        Cibo per Cani
                      </Button>
                      <Button 
                        size="lg" 
                        className="bg-[#FF6B35] hover:bg-[#FF6B35]/90 text-white font-semibold py-3 px-6 rounded-md transition-all duration-300 font-inter shadow-md hover:shadow-lg hover:scale-105"
                      >
                        <Cat className="w-5 h-5 mr-2" />
                        Cibo per Gatti
                      </Button>
                    </div>
                  </div>
                  
                  {/* Secondary CTA */}
                  <div className="mt-6 sm:flex sm:justify-center lg:justify-start">
                    <div className="mt-3 sm:mt-0">
                      <Link href="#discover" className="w-full flex items-center justify-center px-8 py-3 text-base font-medium text-gray-900 hover:text-red-900 transition-colors duration-200 font-inter">
                        Scopri di più
                        <ChevronRight className="ml-2 h-5 w-5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Right side image */}
              <div className="mt-12 lg:mt-0 lg:col-span-5">
                <div className="relative">
                  <img 
                    className="w-full h-full object-cover rounded-lg shadow-xl aspect-[3/2] lg:aspect-auto lg:h-[600px]" 
                    src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/d1111b7e-c722-4451-bcb9-81243c18f800/generated_images/a-beautiful-happy-dog-and-cat-sitting-to-2f64f497-20250825143505.jpg?"
                    alt="Beautiful happy dog and cat sitting together"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg"></div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};