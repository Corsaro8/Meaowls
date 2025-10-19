"use client";

import { useState } from "react";
import { ArrowLeft, Star } from "lucide-react";
import { useRouter } from "next/navigation";

// Prodotti per gatti organizzati per categoria
const productsByCategory = {
  "cibo-umido": [
    {
      id: 1,
      name: "Scatoletto Salmone Premium",
      brand: "Royal Canin",
      price: 2.99,
      weight: "85g",
      rating: 4.8,
      badge: "Best Seller",
      description: "Scatoletto al salmone premium per gatti adulti"
    },
    {
      id: 2,
      name: "Paté Tacchino e Riso",
      brand: "Hill's",
      price: 1.89,
      weight: "100g",
      rating: 4.7,
      description: "Paté cremoso con tacchino e riso per gatti esigenti"
    }
  ],
  "cibo-secco": [
    {
      id: 3,
      name: "Crocchette Indoor Adult",
      brand: "Purina One",
      price: 22.99,
      weight: "7kg",
      rating: 4.6,
      description: "Crocchette specifiche per gatti indoor"
    },
    {
      id: 4,
      name: "Croccantini Sensitive Digestion",
      brand: "Royal Canin",
      price: 35.50,
      weight: "10kg",
      rating: 4.9,
      badge: "Best Seller",
      description: "Formula speciale per gatti con digestione sensibile"
    }
  ],
  "cibo-cuccioli": [
    {
      id: 5,
      name: "Kitten Mousse Salmone",
      brand: "Royal Canin",
      price: 2.49,
      weight: "85g",
      rating: 4.8,
      description: "Mousse delicata per cuccioli di gatto"
    },
    {
      id: 6,
      name: "Kitten Formula Cibo Secco",
      brand: "Farmina",
      price: 28.99,
      weight: "5kg",
      rating: 4.7,
      description: "Croccantini per cuccioli in fase di crescita"
    }
  ],
  "gatti-adulti": [
    {
      id: 7,
      name: "Adult Maintenance Pouch",
      brand: "Gourmet",
      price: 2.19,
      weight: "85g",
      rating: 4.5,
      description: "Bustine complete per gatti adulti"
    },
    {
      id: 8,
      name: "Adult Tuna Formula",
      brand: "Almo Nature",
      price: 24.99,
      weight: "6x70g",
      rating: 4.6,
      description: "Bustine al tonno 100% naturale"
    }
  ],
  "gatti-anziani": [
    {
      id: 9,
      name: "Senior 7+ Years",
      brand: "Hill's",
      price: 32.99,
      weight: "10kg",
      rating: 4.7,
      badge: "Best Seller",
      description: "Cibo specifico per gatti anziani 7+ anni"
    },
    {
      id: 10,
      name: "Senior Care Paté Manzo",
      brand: "Schesir",
      price: 1.99,
      weight: "85g",
      rating: 4.5,
      description: "Paté al manzo per gatti anziani"
    }
  ],
  "gatti-sterilizzati": [
    {
      id: 11,
      name: "Sterilised Weight Control",
      brand: "Purina One",
      price: 29.99,
      weight: "8kg",
      rating: 4.6,
      description: "Cibo specifico per gatti sterilizzati"
    },
    {
      id: 12,
      name: "Light Formula Sterilised",
      brand: "Royal Canin",
      price: 34.99,
      weight: "10kg",
      rating: 4.8,
      description: "Formula leggera per gatti sterilizzati"
    }
  ],
  "spuntini": [
    {
      id: 13,
      name: "Snack Dental Care",
      brand: "Beaphar",
      price: 4.99,
      weight: "50g",
      rating: 4.4,
      description: "Spuntini dentali per l'igiene orale"
    },
    {
      id: 14,
      name: "Crunchy Snack Pollo",
      brand: "Vitakraft",
      price: 2.50,
      weight: "80g",
      rating: 4.5,
      description: "Biscottini croccanti al pollo"
    }
  ],
  "giochi": [
    {
      id: 15,
      name: "Palla Interactive Puzzle",
      brand: "Trixie",
      price: 9.99,
      weight: "1pc",
      rating: 4.3,
      description: "Gioco interattivo per stimolare l'intelligenza"
    },
    {
      id: 16,
      name: "Toy Mouse with Catnip",
      brand: "Natural Paradise",
      price: 3.99,
      weight: "1pc",
      rating: 4.6,
      badge: "Novità",
      description: "Topolino con gatteo per giochi divertenti"
    }
  ],
  "accessori": [
    {
      id: 17,
      name: "Tiragraffi Multi-level",
      brand: "Trixie",
      price: 89.99,
      weight: "XL",
      rating: 4.7,
      description: "Tiragraffi multi-livello con posto per riposo"
    },
    {
      id: 18,
      name: "Cuccia Cuscino Plush",
      brand: "Flamingo",
      price: 24.99,
      weight: "M",
      rating: 4.5,
      description: "Cuscino morbido per il riposo quotidiano"
    }
  ]
};

// Definizione delle categorie
const categories = [
  { id: "cibo-umido", name: "Cibo Umido", count: 2 },
  { id: "cibo-secco", name: "Cibo Secco", count: 2 },
  { id: "cibo-cuccioli", name: "Cibo Cuccioli", count: 2 },
  { id: "gatti-adulti", name: "Gatti Adulti", count: 2 },
  { id: "gatti-anziani", name: "Gatti Anziani", count: 2 },
  { id: "gatti-sterilizzati", name: "Gatti Sterilizzati", count: 2 },
  { id: "spuntini", name: "Spuntini", count: 2 },
  { id: "giochi", name: "Giochi", count: 2 },
  { id: "accessori", name: "Accessori", count: 2 }
];

export default function ProdottiGattoPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const router = useRouter();

  const getCurrentProducts = () => {
    if (selectedCategory === "all") {
      return Object.values(productsByCategory).flat();
    }
    return productsByCategory[selectedCategory] || [];
  };

  const currentProducts = getCurrentProducts();

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
            Prodotti per Gatti
          </h1>
          <p className="text-sm text-gray-600 mb-6">
            Seleziona una categoria per scoprire i nostri prodotti
          </p>
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

        {/* Griglia prodotti filtrati */}
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