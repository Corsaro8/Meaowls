"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { useState, useRef, useEffect } from "react";
import Image, { StaticImageData } from "next/image";
import { Transition } from "@headlessui/react";

export function TestimonialsGridWithCenteredCarousel() {
  return (
    <div className="relative w-full max-w-7xl mx-auto px-4 md:px-8 pt-20 overflow-hidden h-full bg-white">
      <div className="pb-20">
        <h1 className="pt-4 font-bold text-[#2D3748] text-lg md:text-2xl dark:text-white font-[var(--font-heading)]">
          Cosa dicono i nostri clienti
        </h1>
        <p className="text-base text-[#A0AEC0] dark:text-neutral-200 font-[var(--font-body)]">
          Proprietari di animali domestici che si fidano di meaowls per la felicità dei loro amici a quattro zampe.
        </p>
      </div>

      <div className=" relative">
        <TestimonialsSlider />
        <div className="h-full max-h-screen md:max-h-none overflow-hidden w-full bg-[#2D3748] opacity-30 [mask-image:radial-gradient(circle_at_center,transparent_10%,white_99%)]">
          <TestimonialsGrid />
        </div>
      </div>

      <div className="absolute bottom-0 inset-x-0 h-40 w-full bg-gradient-to-t from-[#2D3748] to-transparent"></div>
    </div>
  );
}

export const TestimonialsGrid = () => {
  const first = testimonials.slice(0, 3);
  const second = testimonials.slice(3, 6);
  const third = testimonials.slice(6, 9);
  const fourth = testimonials.slice(9, 12);

  const grid = [first, second, third, fourth];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-7xl mx-auto ">
      {grid.map((testimonialsCol, index) => (
        <div key={`testimonials-col-${index}`} className="grid gap-4">
          {testimonialsCol.map((testimonial) => (
            <Card key={`testimonial-${testimonial.src}-${index}`}>
              <Quote>{testimonial.quote}</Quote>
              <div className="flex gap-2 items-center mt-8">
                <Image
                  src={testimonial.src}
                  alt={testimonial.name}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div className="flex flex-col">
                  <QuoteDescription className="text-[#2D3748] dark:text-white font-medium">{testimonial.name}</QuoteDescription>
                  <QuoteDescription className="text-[10px] text-[#A0AEC0]">
                    {testimonial.designation}
                  </QuoteDescription>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ))}
    </div>
  );
};

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "p-8 rounded-xl border border-[#E2E8F0] bg-white dark:border-[rgba(255,255,255,0.10)] dark:bg-[rgba(45,55,72,0.30)] shadow-[2px_4px_16px_0px_rgba(248,248,248,0.06)_inset] group",
        className
      )}
    >
      {children}
    </div>
  );
};

export const Quote = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <h3
      className={cn(
        "text-xs font-semibold text-[#2D3748] dark:text-white py-2 font-[var(--font-body)]",
        className
      )}
    >
      {children}
    </h3>
  );
};

export const QuoteDescription = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <p
      className={cn(
        "text-xs font-normal text-[#A0AEC0] dark:text-neutral-400 max-w-sm font-[var(--font-body)]",
        className
      )}
    >
      {children}
    </p>
  );
};

interface Testimonial {
  src: string;
  quote: string;
  name: string;
  designation?: string;
}

export const testimonials: Testimonial[] = [
  {
    name: "Maria",
    quote:
      "Luna ora mangia con appetito e il pelo è più lucido. La consegna è sempre puntuale!",
    src: "https://i.pravatar.cc/150?img=1",
    designation: "Proprietaria di gatto • Roma",
  },
  {
    name: "Giuseppe",
    quote:
      "Finalmente non devo più preoccuparmi di finire il cibo di Max. Servizio perfetto!",
    src: "https://i.pravatar.cc/150?img=2",
    designation: "Proprietario di cane • Milano",
  },
  {
    name: "Sofia",
    quote:
      "I miei gatti sono schizzinosi ma con meaowls hanno trovato il loro cibo ideale.",
    src: "https://i.pravatar.cc/150?img=3",
    designation: "Proprietaria di gatti • Napoli",
  },
  {
    name: "Marco",
    quote:
      "Ottima qualità del cibo e consegna rapidissima. Fido è sempre entusiasta quando arriva il pacco!",
    src: "https://i.pravatar.cc/150?img=4",
    designation: "Proprietario di cane • Torino",
  },
  {
    name: "Elena",
    quote:
      "Mia figlia Mila è molto esigente con il cibo, ma con meaowls ha finalmente trovato quello che ama.",
    src: "https://i.pravatar.cc/150?img=5",
    designation: "Proprietaria di gatto • Bologna",
  },
  {
    name: "Roberto",
    quote:
      "Il servizio clienti è fantastico e Rocky ha migliorato notevolmente la digestione.",
    src: "https://i.pravatar.cc/150?img=6",
    designation: "Proprietario di cane • Firenze",
  },
  {
    name: "Francesca",
    quote:
      "Consegne sempre puntuali e Whiskers non è mai stato così sano e felice!",
    src: "https://i.pravatar.cc/150?img=7",
    designation: "Proprietaria di gatto • Genova",
  },
  {
    name: "Antonio",
    quote:
      "Prezzi competitivi e qualità eccellente. Bruno si lecca i baffi ogni volta!",
    src: "https://i.pravatar.cc/150?img=8",
    designation: "Proprietario di cane • Palermo",
  },
  {
    name: "Valentina",
    quote:
      "Servizio impeccabile e i miei due gatti, Sole e Luna, sono sempre soddisfatti.",
    src: "https://i.pravatar.cc/150?img=9",
    designation: "Proprietaria di gatti • Bari",
  },
  {
    name: "Luca",
    quote:
      "Ottimo rapporto qualità-prezzo. Rex è ringiovanito da quando usa meaowls!",
    src: "https://i.pravatar.cc/150?img=10",
    designation: "Proprietario di cane • Catania",
  },
  {
    name: "Giulia",
    quote:
      "Consegna velocissima e Bella non ha mai avuto problemi digestivi da quando usiamo meaowls.",
    src: "https://i.pravatar.cc/150?img=11",
    designation: "Proprietaria di gatto • Venezia",
  },
  {
    name: "Stefano",
    quote:
      "Servizio clienti sempre disponibile e Charlie è più energico che mai!",
    src: "https://i.pravatar.cc/150?img=12",
    designation: "Proprietario di cane • Verona",
  },
];

export const TestimonialsSlider = () => {
  const [active, setActive] = useState<number>(0);
  const [autorotate, setAutorotate] = useState<boolean>(true);
  const testimonialsRef = useRef<HTMLDivElement>(null);

  const slicedTestimonials = testimonials.slice(0, 3);

  useEffect(() => {
    if (!autorotate) return;
    const interval = setInterval(() => {
      setActive(
        active + 1 === slicedTestimonials.length ? 0 : (active) => active + 1
      );
    }, 7000);
    return () => clearInterval(interval);
  }, [active, autorotate, slicedTestimonials.length]);

  const heightFix = () => {
    if (testimonialsRef.current && testimonialsRef.current.parentElement)
      testimonialsRef.current.parentElement.style.height = `${testimonialsRef.current.clientHeight}px`;
  };

  useEffect(() => {
    heightFix();

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        heightFix();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <section className="absolute inset-0 mt-20 md:mt-60">
      <div className="max-w-3xl mx-auto  relative z-40 h-80">
        <div className="relative pb-12 md:pb-20">
          {/* Particles animation */}

          {/* Carousel */}
          <div className="text-center">
            {/* Testimonial image */}
            <div className="relative h-40 [mask-image:_linear-gradient(0deg,transparent,#FFFFFF_30%,#FFFFFF)] md:[mask-image:_linear-gradient(0deg,transparent,#FFFFFF_40%,#FFFFFF)]">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[480px] h-[480px] -z-10 pointer-events-none before:rounded-full rounded-full before:absolute before:inset-0 before:bg-gradient-to-b before:from-[#FF6B35]/20 before:to-transparent before:to-20% after:rounded-full after:absolute after:inset-0 after:bg-white after:dark:bg-[#2D3748] after:m-px before:-z-20 after:-z-20">
                {slicedTestimonials.map((item, index) => (
                  <Transition
                    key={index}
                    show={active === index}
                    enter="transition ease-[cubic-bezier(0.68,-0.3,0.32,1)] duration-700 order-first"
                    enterFrom="opacity-0 -translate-x-10"
                    enterTo="opacity-100 translate-x-0"
                    leave="transition ease-[cubic-bezier(0.68,-0.3,0.32,1)] duration-700"
                    leaveFrom="opacity-100 translate-x-0"
                    leaveTo="opacity-0 translate-x-10"
                    beforeEnter={() => heightFix()}
                    as="div"
                  >
                    <div className="absolute inset-0 h-full -z-10">
                      <Image
                        className="relative top-11 left-1/2 -translate-x-1/2 rounded-full"
                        src={item.src}
                        width={56}
                        height={56}
                        alt={item.name}
                      />
                    </div>
                  </Transition>
                ))}
              </div>
            </div>
            {/* Text */}
            <div className="mb-10 transition-all duration-150 delay-300 ease-in-out px-8 sm:px-6">
              <div className="relative flex flex-col" ref={testimonialsRef}>
                {slicedTestimonials.map((item, index) => (
                  <Transition
                    key={index}
                    show={active === index}
                    enter="transition ease-in-out duration-500 delay-200 order-first"
                    enterFrom="opacity-0 -translate-x-4"
                    enterTo="opacity-100 translate-x-0"
                    leave="transition ease-out duration-300 delay-300 absolute"
                    leaveFrom="opacity-100 translate-x-0"
                    leaveTo="opacity-0 translate-x-4"
                    beforeEnter={() => heightFix()}
                    as="div"
                  >
                    <div className="text-base text-[#2D3748] dark:text-white md:text-xl font-bold font-[var(--font-body)]">
                      {item.quote}
                    </div>
                  </Transition>
                ))}
              </div>
            </div>
            {/* Buttons */}
            <div className="flex flex-wrap justify-center -m-1.5 px-8 sm:px-6">
              {slicedTestimonials.map((item, index) => (
                <button
                  className={cn(
                    `px-2 py-1 rounded-full m-1.5 text-xs border border-transparent text-neutral-300 transition duration-150 ease-in-out [background:linear-gradient(theme(colors.neutral.900),_theme(colors.neutral.900))_padding-box,_conic-gradient(theme(colors.neutral.400),_theme(colors.neutral.700)_25%,_theme(colors.neutral.700)_75%,_theme(colors.neutral.400)_100%)_border-box] relative before:absolute before:inset-0 before:bg-neutral-800/30 before:rounded-full before:pointer-events-none font-[var(--font-body)] ${
                      active === index
                        ? "border-[#FF6B35]/50"
                        : "border-transparent opacity-70"
                    }`
                  )}
                  key={index}
                  onClick={() => {
                    setActive(index);
                    setAutorotate(false);
                  }}
                >
                  <span className="relative">
                    <span className="text-neutral-50 font-bold">
                      {item.name}
                    </span>{" "}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};