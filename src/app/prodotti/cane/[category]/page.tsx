"use client";

import { useState } from "react";
import { motion } from "@/lib/framer-motion-shim";
import { ChevronLeft, ChevronRight, Filter, Star, TrendingUp, TrendingDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface Product {
  id: number;
  name: string;
  price: number;
  weight: string;
  image: string;
  badge?: "Novità" | "Best Seller";
  rating: number;
}

const mockProducts: Product[] = [
  {
    id: 1,
    name: "Croccantini Premium Pollo e Riso",
    price: 32.99,
    weight: "12kg",
    image: "",
    badge: "Best Seller",
    rating: 4.8
  },
  {
    id: 2,
    name: "Umido Gourmet Carne e Verdure",
    price: 24.50,
    weight: "6x400g",
    image: "",
    badge: "Novità",
    rating: 4.9
  },
  {
    id: 3,
    name: "Paté Salmone e Patate",
    price: 18.99,
    weight: "800g",
    image: "",
    rating: 4.6
  },
  {
    id: 4,
    name: "Snack Dentali Freschezza",
    price: 8.99,
    weight: "200g",
    image: "",
    badge: "Novità",
    rating: 4.7
  },
  {
    id: 5,
    name: "Cibo Ipoallergenico Agnello",
    price: 45.99,
    weight: "15kg",
    image: "",
    badge: "Best Seller",
    rating: 4.9
  },
  {
    id: 6,
    name: "Bocconcini Umidi Mix",
    price: 15.99,
    weight: "12x100g",
    image: "",
    rating: 4.5
  },
  {
    id: 7,
    name: "Puppy Formula Cuccioli",
    price: 29.99,
    weight: "7.5kg",
    image: "",
    badge: "Novità",
    rating: 4.8
  },
  {
    id: 8,
    name: "Adult Light Pesce",
    price: 34.50,
    weight: "10kg",
    image: "",
    rating: 4.6
  },
  {
    id: 9,
    name: "Cibo Senior 7+ anni",
    price: 38.99,
    weight: "12kg",
    image: "",
    badge: "Best Seller",
    rating: 4.7
  },
  {
    id: 10,
    name: "Menu Festa Compleanno",
    price: 12.99,
    weight: "500g",
    image: "",
    badge: "Novità",
    rating: 4.5
  }
];

export default function ProductListPage() {
  const [priceRange, setPriceRange] = useState([0, 50]);
  const [sortBy, setSortBy] = useState("featured");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const filteredProducts = mockProducts.filter(
    product => product.price >= priceRange[0] && product.price <= priceRange[1]
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const Breadcrumb = () => (
    <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
      <Button
        variant="ghost"
        size="sm"
        className="hover:text-primary transition-colors"
        onClick={() => window.history.back()}
      >
        <ChevronLeft className="h-4 w-4 mr-1" />
        Indietro
      </Button>
      <span>Home</span>
      <span>/</span>
      <span>Prodotti</span>
      <span>/</span>
      <span>Cane</span>
      <span>/</span>
      <span className="font-medium text-foreground">Cibo Umido</span>
    </nav>
  );

  const FilterSidebar = ({ className = "" }) => (
    <div className={className}>
      <h3 className="font-semibold text-lg mb-4">Filtri</h3>
      
      <div className="space-y-6">
        <div>
          <h4 className="font-medium mb-3">Prezzo (€)</h4>
          <Slider
            defaultValue={[0, 50]}
            max={50}
            min={0}
            step={1}
            value={priceRange}
            onValueChange={setPriceRange}
            className="my-4"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>€{priceRange[0]}</span>
            <span>€{priceRange[1]}</span>
          </div>
        </div>

        <div>
          <h4 className="font-medium mb-3">Ordina per</h4>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">In primo piano</SelectItem>
              <SelectItem value="price-asc">
                <div className="flex items-center">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Prezzo crescente
                </div>
              </SelectItem>
              <SelectItem value="price-desc">
                <div className="flex items-center">
                  <TrendingDown className="h-4 w-4 mr-2" />
                  Prezzo decrescente
                </div>
              </SelectItem>
              <SelectItem value="rating">Miglior valutazione</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );

  const ProductCard = ({ product }: { product: Product }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="group"
    >
      <Card className="overflow-hidden h-full hover:shadow-lg transition-shadow duration-300 border-gray-200">
        <div className="relative">
          <div className="aspect-square bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center">
            <div className="text-6xl opacity-20">🦴</div>
          </div>
          {product.badge && (
            <Badge
              className={`absolute top-2 right-2 px-2 py-1 text-xs font-medium ${
                product.badge === "Novità"
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-amber-500 hover:bg-amber-600"
              }`}
            >
              {product.badge}
            </Badge>
          )}
        </div>
        
        <div className="p-4 space-y-3">
          <h3 className="font-semibold text-sm leading-tight line-clamp-2">
            {product.name}
          </h3>
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-3 w-3 ${
                  i < Math.floor(product.rating)
                    ? "fill-amber-400 text-amber-400"
                    : "fill-gray-300 text-gray-300"
                }`}
              />
            ))}
            <span className="text-xs text-muted-foreground ml-1">{product.rating}</span>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-bold text-lg text-primary">€{product.price}</p>
              <p className="text-xs text-muted-foreground">{product.weight}</p>
            </div>
            <Button
              size="sm"
              className="bg-primary hover:bg-primary/90"
              onClick={() => console.log("Add to cart:", product.id)}
            >
              Aggiungi
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );

  const MobileFilterAccordion = () => (
    <Accordion type="single" collapsible className="w-full mt-4 md:hidden">
      <AccordionItem value="filters">
        <AccordionTrigger>
          <div className="flex items-center">
            <Filter className="h-4 w-4 mr-2" />
            Filtri e ordinamento
          </div>
        </AccordionTrigger>
        <AccordionContent className="pt-4">
          <FilterSidebar />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );

  const Pagination = () => (
    <div className="flex justify-center items-center space-x-2 mt-8">
      <Button
        variant="outline"
        size="sm"
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(currentPage - 1)}
        className="border-gray-300"
      >
        <ChevronLeft className="h-4 w-4" />
        Precedente
      </Button>
      <span className="text-sm text-muted-foreground">
        Pagina {currentPage} di {totalPages}
      </span>
      <Button
        variant="outline"
        size="sm"
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage(currentPage + 1)}
        className="border-gray-300"
      >
        Successiva
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Breadcrumb />
        </div>

        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Cibo Umido per Cani</h1>
          <p className="text-muted-foreground">
            {sortedProducts.length} prodotti trovati
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="hidden lg:block sticky top-4 self-start">
            <FilterSidebar />
          </div>

          <div className="lg:col-span-3">
            <MobileFilterAccordion />
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6"
            >
              {paginatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </motion.div>

            {totalPages > 1 && <Pagination />}
          </div>
        </div>
      </div>
    </div>
  );
}