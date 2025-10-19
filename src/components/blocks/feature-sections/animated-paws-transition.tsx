"use client";

import { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';

export const TransitionSection = () => {
  const [pawPrints, setPawPrints] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([]);
  const [hearts, setHearts] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([]);

  useEffect(() => {
    // Generate paw prints
    const generatePawPrints = () => {
      const prints = [];
      for (let i = 0; i < 8; i++) {
        prints.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          delay: Math.random() * 4
        });
      }
      setPawPrints(prints);
    };

    // Generate hearts
    const generateHearts = () => {
      const heartIcons = [];
      for (let i = 0; i < 6; i++) {
        heartIcons.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          delay: Math.random() * 3
        });
      }
      setHearts(heartIcons);
    };

    generatePawPrints();
    generateHearts();
  }, []);

  return (
    <div className="relative overflow-hidden">
      {/* Curved wave top */}
      <div className="absolute top-0 left-0 w-full">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="w-full h-12 fill-white"
        >
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            opacity=".25"
          ></path>
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
            opacity=".5"
          ></path>
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"></path>
        </svg>
      </div>

      {/* Main section */}
      <section className="relative h-72 bg-gradient-to-br from-orange-100 via-blue-50 to-green-50 flex items-center justify-center">
        {/* Animated paw prints */}
        {pawPrints.map((paw) => (
          <div
            key={paw.id}
            className="absolute animate-bounce opacity-20"
            style={{
              left: `${paw.x}%`,
              top: `${paw.y}%`,
              animationDelay: `${paw.delay}s`,
              animationDuration: '3s'
            }}
          >
            <div className="w-6 h-6 relative">
              {/* Paw print shape using CSS */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-3 h-4 bg-orange-300 rounded-full"></div>
              <div className="absolute bottom-0 left-0 w-2 h-3 bg-orange-300 rounded-full"></div>
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2 h-3 bg-orange-300 rounded-full"></div>
              <div className="absolute bottom-0 right-0 w-2 h-3 bg-orange-300 rounded-full"></div>
              <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-4 h-3 bg-orange-300 rounded-full"></div>
            </div>
          </div>
        ))}

        {/* Floating hearts */}
        {hearts.map((heart) => (
          <div
            key={heart.id}
            className="absolute animate-pulse opacity-30"
            style={{
              left: `${heart.x}%`,
              top: `${heart.y}%`,
              animationDelay: `${heart.delay}s`,
              animationDuration: '2s'
            }}
          >
            <div className="animate-float">
              <Heart className="w-5 h-5 text-red-300 fill-current" />
            </div>
          </div>
        ))}

        {/* Central message */}
        <div className="relative z-10 text-center px-4 max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 animate-fade-in-up">
            Il benessere del tuo pet è la nostra missione
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-orange-400 to-blue-400 mx-auto rounded-full animate-scale-in"></div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-4 left-4 w-8 h-8 bg-green-200 rounded-full opacity-40 animate-bounce" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-8 right-8 w-6 h-6 bg-blue-200 rounded-full opacity-40 animate-bounce" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-8 left-8 w-10 h-10 bg-orange-200 rounded-full opacity-40 animate-bounce" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute bottom-4 right-16 w-7 h-7 bg-red-200 rounded-full opacity-40 animate-bounce" style={{ animationDelay: '1.5s' }}></div>
      </section>

      {/* Curved wave bottom */}
      <div className="absolute bottom-0 left-0 w-full">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="w-full h-12 fill-white rotate-180"
        >
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            opacity=".25"
          ></path>
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
            opacity=".5"
          ></path>
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"></path>
        </svg>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scale-in {
          0% {
            transform: scaleX(0);
          }
          100% {
            transform: scaleX(1);
          }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out;
        }

        .animate-scale-in {
          animation: scale-in 1s ease-out 0.5s both;
        }
      `}</style>
    </div>
  );
};