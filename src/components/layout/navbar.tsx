"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, Home, ShoppingBag, Sparkles, Mail, PawPrint, User, Heart } from "lucide-react";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const pathname = usePathname();

  // Determina se siamo su una pagina che richiede testo scuro
  const isDarkTextPage = pathname === "/prodotti" || pathname.startsWith("/prodotti/");

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Determina se il navbar è scrollato oltre i primi 10px
      setIsScrolled(currentScrollY > 10);
      
      // Determina la visibilità basata sulla direzione dello scroll
      if (currentScrollY < lastScrollY || currentScrollY < 10) {
        // Scroll up o all'inizio della pagina → mostra navbar
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scroll down e oltre i 100px → nascondi navbar
        setIsVisible(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const navLinks = [
    { href: "/", label: "Home", icon: Home },
    { href: "/il-mio-pet", label: "Il tuo pet", icon: PawPrint },
    { href: "/prodotti", label: "Prodotti", icon: ShoppingBag },
    { href: "/chi-siamo", label: "Chi siamo", icon: Sparkles },
    { href: "/contatti", label: "Contatti", icon: Mail }
  ];

  // Determina i colori del testo in base alla pagina e allo scroll
  const getTextColor = () => {
    if (isDarkTextPage) {
      // Su pagine con sfondo chiaro, usa sempre testo scuro
      return "text-gray-800";
    }
    // Su altre pagine, usa il comportamento normale
    return isScrolled ? "text-gray-700" : "text-white/90";
  };

  const getTextColorHover = () => {
    if (isDarkTextPage) {
      return "hover:text-[#FF6B35]";
    }
    return isScrolled ? "hover:text-[#FF6B35]" : "hover:text-white";
  };

  const getLogoColor = () => {
    if (isDarkTextPage) {
      return "text-[#FF6B35] fill-[#FF6B35]";
    }
    return isScrolled ? "text-[#FF6B35] fill-[#FF6B35]" : "text-white fill-white";
  };

  const getLogoTextColor = () => {
    if (isDarkTextPage) {
      return "text-gray-800";
    }
    return isScrolled ? "text-gray-800" : "text-white";
  };

  const getLogoSubtextColor = () => {
    if (isDarkTextPage) {
      return "text-gray-600";
    }
    return isScrolled ? "text-gray-600" : "text-white/80";
  };

  const getUserIconColor = () => {
    if (isDarkTextPage) {
      return "text-gray-700 hover:text-[#FF6B35]";
    }
    return isScrolled ? "text-gray-700 hover:text-[#FF6B35]" : "text-white/90 hover:text-white";
  };

  const getMobileMenuColor = () => {
    if (isDarkTextPage) {
      return "text-gray-800";
    }
    return isScrolled ? "text-gray-800" : "text-white";
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
        isScrolled || isDarkTextPage
          ? "backdrop-blur-sm"
          : "bg-transparent"
      } ${
        isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      }`}
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex justify-between items-center h-16">
          {/* Logo più piccolo e semplice */}
          <Link href="/" className="flex items-center space-x-2 group">
            <Heart className={`w-5 h-5 transition-colors duration-300 ${getLogoColor()}`} />
            <div className="flex flex-col">
              <span className={`text-lg font-semibold italic tracking-wide leading-none transition-colors duration-300 ${getLogoTextColor()}`}>
                Meaowls
              </span>
              <span className={`text-xs font-normal tracking-wide transition-colors duration-300 ${getLogoSubtextColor()}`}>
                Pet Delivery
              </span>
            </div>
          </Link>

          {/* Desktop Navigation - Centrato con contenitore ellissoidale blurrato */}
          <div className="hidden md:flex items-center justify-center flex-1">
            <div className="backdrop-blur-sm bg-white/10 rounded-full px-8 py-3 flex items-center space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-normal transition-colors duration-300 ${getTextColor()} ${getTextColorHover()}`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Icona Accedi a destra */}
          <div className="hidden md:flex items-center">
            <button className={`transition-colors duration-300 ${getUserIconColor()}`}>
              <User className="w-5 h-5" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden p-2 transition-colors duration-300 ${getMobileMenuColor()}`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-gradient-to-br from-[#FF6B35] via-orange-500 to-orange-600 z-40 transform transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center p-4 border-b border-white/20">
            <Link href="/" className="flex items-center space-x-2">
              <Heart className="w-5 h-5 text-white fill-white" />
              <span className="text-lg font-medium text-white italic">Meaowls</span>
            </Link>
            <button
              className="p-2 rounded-xl bg-white/20 hover:bg-white/30 transition-colors duration-200"
              onClick={() => setIsOpen(false)}
            >
              <X className="w-6 h-6 text-white" />
            </button>
          </div>

          <nav className="flex-1 flex flex-col justify-center space-y-4 px-6">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="group flex items-center space-x-4 p-5 rounded-2xl bg-white hover:bg-orange-50 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-[#FF6B35] to-orange-500 rounded-xl flex items-center justify-center shadow-md">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-xl text-gray-800 font-semibold">
                    {link.label}
                  </span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;