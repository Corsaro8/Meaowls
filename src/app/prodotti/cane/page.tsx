"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, Star } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

// Prodotti per cani organizzati per categoria
const productsByCategory = {
  "cibo-secco": [
    {
      id: 1,
      name: "Croccantini Premium Pollo e Riso",
      price: 32.99,
      weight: "12kg",
      badge: "Best Seller",
      rating: 4.8,
      description: "Croccantini premium con pollo e riso per cani adulti"
    },
    {
      id: 5,
      name: "Cibo Ipoallergenico Agnello",
      price: 45.99,
      weight: "15kg",
      badge: "Best Seller",
      rating: 4.9,
      description: "Formula ipoallergenica con agnello per cani sensibili"
    }
  ],
  "cibo-umido": [
    {
      id: 2,
      name: "Umido Gourmet Carne e Verdure",
      price: 24.50,
      weight: "6x400g",
      badge: "Novità",
      rating: 4.9,
      description: "Pietanze gourmet con carne selezionata e verdure fresche"
    },
    {
      id: 3,
      name: "Paté Salmone e Patate",
      price: 18.99,
      weight: "800g",
      rating: 4.6,
      description: "Paté ricco di salmone fresco e patate biologiche"
    },
    {
      id: 6,
      name: "Bocconcini Umidi Mix",
      price: 15.99,
      weight: "12x100g",
      rating: 4.5,
      description: "Mix assortito di bocconcini umidi per tutti i gusti"
    }
  ],
  "caccia-per-cuccioli": [
    {
      id: 7,
      name: "Puppy Formula Cuccioli",
      price: 29.99,
      weight: "7.5kg",
      badge: "Novità",
      rating: 4.8,
      description: "Formula speciale per cuccioli in crescita"
    }
  ],
  "cibo-per-cani-adulti": [
    {
      id: 8,
      name: "Adult Light Pesce",
      price: 34.50,
      weight: "10kg",
      rating: 4.6,
      description: "Cibo leggero con pesce per cani adulti"
    }
  ],
  "cibo-per-cani-anziani": [
    {
      id: 9,
      name: "Cibo Senior 7+ anni",
      price: 38.99,
      weight: "12kg",
      badge: "Best Seller",
      rating: 4.7,
      description: "Formula bilanciata per cani anziani"
    }
  ],
  "cibo-per-cani-sterilizzati": [
    {
      id: 15,
      name: "Cibo Per Cani Sterilizzati",
      price: 36.99,
      weight: "10kg",
      rating: 4.6,
      description: "Formula leggera per cani sterilizzati"
    }
  ],
  "snacks": [
    {
      id: 4,
      name: "Snack Dentali Freschezza",
      price: 8.99,
      weight: "200g",
      badge: "Novità",
      rating: 4.7,
      description: "Snack dentali per l'igiene orale quotidiana"
    },
    {
      id: 10,
      name: "Menu Festa Compleanno",
      price: 12.99,
      weight: "500g",
      rating: 4.5,
      description: "Menu speciale per celebrare il compleanno del tuo cane"
    }
  ],
  "accessori": [
    {
      id: 11,
      name: "Cuccia Ortopedica Memory Foam",
      price: 89.99,
      weight: "XL",
      rating: 4.8,
      description: "Cuccia ortopedica con memory foam per il massimo del comfort"
    },
    {
      id: 12,
      name: "Guinzaglio Rinforzato Nylon",
      price: 22.99,
      weight: "L",
      badge: "Novità",
      rating: 4.5,
      description: "Guinzaglio rinforzato in nylon per passeggiate sicure"
    }
  ],
  "giochi": [
    {
      id: 13,
      name: "Osso da Masticare Gigante",
      price: 14.50,
      weight: "1pc",
      rating: 4.4,
      description: "Osso da masticare gigante per il divertimento quotidiano"
    },
    {
      id: 14,
      name: "Frisbee Resistente",
      price: 9.99,
      weight: "1pc",
      rating: 4.3,
      description: "Frisbee resistente per giochi all'aria aperta"
    }
  ]
};

// Definizione delle categorie con icone
const categories = [
  { id: "cibo-secco", name: "Cibo Secco", icon: "🥘", count: 2 },
  { id: "cibo-umido", name: "Cibo Umido", icon: "🥘", count: 3 },
  { id: "caccia-per-cuccioli", name: "Cibo per Cuccioli", icon: "🐶", count: 1 },
  { id: "cibo-per-cani-adulti", name: "Cibo per Cani Adulti", icon: "🐕", count: 1 },
  { id: "cibo-per-cani-anziani", name: "Cibo per Cani Anziani", icon: "🐾", count: 1 },
  { id: "cibo-per-cani-sterilizzati", name: "Cibo per Cani Sterilizzati", icon: "🍃", count: 1 },
  { id: "snacks", name: "Snacks", icon: "🥓", count: 2 },
  { id: "accessori", name: "Accessori", icon: "🧶", count: 2 },
  { id: "giochi", name: "Giochi", icon: "🎾", count: 2 }
];

export default function ProdottiCaniPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const router = useRouter();
  const searchParams = useSearchParams();

  // Apply filters from URL on mount
  useEffect(() => {
    const category = searchParams.get('category');
    if (category) {
      setSelectedCategory(category);
    }
  }, [searchParams]);

  const getCurrentProducts = () => {
    let products = selectedCategory === "all" 
      ? Object.values(productsByCategory).flat()
      : productsByCategory[selectedCategory] || [];

    // Apply exclusion filters from pet profile
    const excludeAllergies = searchParams.get('excludeAllergies');
    const excludeIntolerances = searchParams.get('excludeIntolerances');

    if (excludeAllergies || excludeIntolerances) {
      const allergiesToExclude = excludeAllergies?.toLowerCase().split(',').map(a => a.trim()) || [];
      const intolerancesToExclude = excludeIntolerances?.toLowerCase().split(',').map(i => i.trim()) || [];
      
      products = products.filter(product => {
        const productName = product.name.toLowerCase();
        const productDescription = product.description.toLowerCase();
        const productText = `${productName} ${productDescription}`;
        
        // Check if product contains any allergens
        const hasAllergen = allergiesToExclude.some(allergen => 
          productText.includes(allergen.toLowerCase())
        );
        
        // Check if product contains any intolerances
        const hasIntolerance = intolerancesToExclude.some(intolerance => 
          productText.includes(intolerance.toLowerCase())
        );
        
        // Exclude product if it contains allergens or intolerances
        return !hasAllergen && !hasIntolerance;
      });
    }

    return products;
  };

  const currentProducts = getCurrentProducts();
  
  // Check if filters are active
  const hasActiveFilters = searchParams.get('category') || 
                          searchParams.get('excludeAllergies') || 
                          searchParams.get('excludeIntolerances');

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Header con navigazione */}
        <div className="text-center mb-6">
          <button 
            onClick={() => router.push("/prodotti")}
            className="flex items-center text-sm text-gray-600 hover:text-gray-900 mb-4 mx-auto"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Indietro ai prodotti
          </button>
          
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            Prodotti per Cani
          </h1>
          <p className="text-sm text-gray-600 mb-6">
            Seleziona una categoria per scoprire i nostri prodotti
          </p>
          
          {/* Active Filters Badge */}
          {hasActiveFilters && (
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-full text-sm text-primary mb-4">
              <span className="font-semibold">✨ Filtri personalizzati dal profilo del tuo pet applicati</span>
              <button
                onClick={() => {
                  setSelectedCategory("all");
                  router.push("/prodotti/cane");
                }}
                className="ml-2 hover:bg-primary/20 rounded-full px-2 py-0.5 transition-colors"
              >
                Rimuovi
              </button>
            </div>
          )}
        </div>

        {/* Categorie - solo testo cliccabile */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-3 mb-8">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`p-4 text-center rounded-lg border-2 transition-all hover:shadow-md ${
              selectedCategory === "all"
                ? "border-orange-500 bg-orange-50 text-orange-700"
                : "border-gray-200 bg-white hover:border-orange-300"
            }`}
          >
            <div className="text-xs font-semibold">Tutti i Prodotti</div>
            <div className="text-xs text-gray-500">{Object.values(productsByCategory).flat().length} prodotti</div>
          </button>

          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`p-4 text-center rounded-lg border-2 transition-all hover:shadow-md ${
                selectedCategory === category.id
                  ? "border-orange-500 bg-orange-50 text-orange-700"
                  : "border-gray-200 bg-white hover:border-orange-300"
              }`}
            >
              <div className="text-xs font-semibold leading-tight">{category.name}</div>
              <div className="text-xs text-gray-500">{category.count} prodotti</div>
            </button>
          ))}
        </div>

        {/* Risultati con conteggio */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            {selectedCategory === "all" 
              ? "Tutti i prodotti" 
              : categories.find(c => c.id === selectedCategory)?.name || "Prodotti"
            }
          </h2>
          <span className="text-sm text-gray-500">{currentProducts.length} prodotti</span>
        </div>

        {/* Griglia prodotti filtrati con icone rimosse dai prodotti */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {currentProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200 overflow-hidden"
            >
              <div className="aspect-square bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center">
                <div className="text-sm font-medium text-orange-600">
                  {categories.find(c => c.id === Object.keys(productsByCategory).find(key => 
                    productsByCategory[key].some(p => p.id === product.id)
                  ))?.name || "Prodotto"}
                </div>
              </div>

              <div className="p-3 space-y-2">
                <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full inline-block">
                  {categories.find(c => c.id === Object.keys(productsByCategory).find(key => 
                    productsByCategory[key].some(p => p.id === product.id)
                  ))?.name || "Prodotto"}
                </span>
                
                <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 min-h-[2.5rem]">
                  {product.name}
                </h3>

                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3 h-3 ${
                        i < Math.floor(product.rating)
                          ? "text-amber-400 fill-amber-400"
                          : "text-gray-300 fill-gray-300"
                      }`}
                    />
                  ))}
                  <span className="text-xs text-gray-500 ml-1">
                    {product.rating}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold text-orange-600">€{product.price}</p>
                    <p className="text-xs text-gray-500">{product.weight}</p>
                  </div>
                  <button className="text-xs bg-orange-600 text-white px-3 py-1.5 rounded-md hover:bg-orange-700">
                    Aggiungi
                  </button>
                </div>

                {product.badge && (
                  <span className={`block mt-2 text-xs text-center px-2 py-1 rounded-full text-white ${
                    product.badge === "Novità" ? "bg-green-500" : "bg-amber-500"
                  }`}>
                    {product.badge}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {currentProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">😕</div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Nessun prodotto trovato
            </h3>
            <p className="text-gray-500">
              Prova a selezionare un'altra categoria o torna ai prodotti principali.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}