"use client";

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

export const TransitionSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.3,
        rootMargin: '-50px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[40vh] md:h-[50vh] lg:h-[60vh] overflow-hidden bg-gradient-to-br from-orange-50 to-amber-50">

      {/* Background Image with Parallax Effect */}
      <div className="absolute inset-0 transform transition-transform duration-1000 ease-out scale-105">
        <Image
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/d1111b7e-c722-4451-bcb9-81243c18f800/generated_images/happy-dogs-and-cats-running-excitedly-to-6cc39f1b-20250826140601.jpg"
          alt="Happy dogs and cats running excitedly towards food bowls"
          fill
          className={`object-cover transition-all duration-1000 ease-out ${
          isVisible ? 'scale-100 opacity-100' : 'scale-110 opacity-0'}`
          }
          priority
          sizes="100vw" />
      </div>

      {/* Subtle Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10" />

      {/* Floating Animation Elements */}
      <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/40 rounded-full animate-pulse" />
      <div className="absolute top-3/4 right-1/3 w-1.5 h-1.5 bg-white/30 rounded-full animate-pulse delay-1000" />
      <div className="absolute bottom-1/3 left-1/6 w-1 h-1 bg-white/50 rounded-full animate-pulse delay-500" />

      {/* Bottom Wave Transition */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <svg
          className="relative block w-full h-12 md:h-16"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none">

          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            opacity=".25"
            className="fill-background" />

          <path
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
            opacity=".5"
            className="fill-background" />

          <path
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
            className="fill-background" />
        </svg>
      </div>
    </section>
  );
};