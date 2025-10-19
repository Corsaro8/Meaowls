"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Dog, Cat, Package, Heart, ShoppingBag, Star, Filter, Calendar, Tag, ChevronLeft, ChevronRight, Search, AlertCircle, Activity, X, Plus, Minus, Trash2, Info, CheckCircle, AlertTriangle, Utensils, Clock } from "lucide-react";
import { FooterWithGrid } from "@/components/blocks/footers/footer-with-grid";

// Descrizioni marche
const brandDescriptions: Record<string, string> = {
  "Almo Nature": "Almo Nature è un brand pioniere nel settore del pet food naturale. Fondata in Italia, l'azienda si distingue per l'utilizzo di ingredienti 100% naturali, carni fresche e pesce di alta qualità. Ogni ricetta è formulata senza conservanti artificiali, coloranti o aromi chimici, garantendo un'alimentazione sana e bilanciata per cani e gatti.",
  "Monge": "Monge è un'azienda italiana con oltre 50 anni di esperienza nella produzione di alimenti per animali domestici. Il brand combina tradizione e innovazione, utilizzando solo materie prime selezionate e controllate. Tutti i prodotti sono formulati con il supporto di veterinari e nutrizionisti per garantire il massimo benessere dei pet.",
  "Briantos": "Briantos è un marchio tedesco che si distingue per l'eccellente rapporto qualità-prezzo. Produce cibo per cani e gatti con ingredienti di alta qualità, formule bilanciate e senza l'aggiunta di coloranti, aromi o conservanti artificiali. Ideale per chi cerca un'alimentazione premium accessibile.",
  "Royal Canin": "Royal Canin è leader mondiale nella nutrizione per cani e gatti. Con oltre 50 anni di ricerca scientifica, sviluppa alimenti specifici per razza, età e condizioni di salute. Ogni prodotto è il risultato di studi approfonditi condotti da veterinari e nutrizionisti per soddisfare le esigenze nutrizionali specifiche di ogni animale.",
  "Altro": "Marchi selezionati che offrono prodotti di qualità per il benessere del tuo animale domestico. Tutti i prodotti sono testati e approvati da esperti veterinari."
};

// Prodotti per cani con informazioni dettagliate
const dogProducts = [
  { 
    id: "d1", 
    name: "Almo Nature Holistic Puppy Medium Pollo e Riso", 
    price: 26.90, 
    weight: "12kg", 
    badge: "Almo Nature", 
    rating: 4.8, 
    category: "Crocchette", 
    subcategory: "Obbligatorio", 
    animal: "cane", 
    age: "cucciolo", 
    brand: "Almo Nature", 
    breed: "Labrador", 
    intolerances: [], 
    tags: ["Cuccioli taglia media", "Pollo fresco", "DHA per sviluppo cerebrale", "+3"],
    ingredients: "Pollo fresco (26%), riso (14%), mais, polpa di barbabietola, grassi animali, lievito di birra, olio di pesce, minerali, DHA, condroitina, glucosamina.",
    benefits: [
      "DHA per sviluppo cerebrale e della vista",
      "Proteine di alta qualità per crescita muscolare",
      "Condroitina e glucosamina per articolazioni sane",
      "Acidi grassi Omega-3 per pelo lucido",
      "Sistema immunitario rafforzato"
    ],
    contraindications: "Non adatto a cuccioli con allergie al pollo. In caso di sensibilità alimentari, consultare il veterinario prima dell'uso.",
    usage: "Dosaggio giornaliero: 2-4 mesi: 160-220g | 4-6 mesi: 220-320g | 6-12 mesi: 320-420g. Dividere in 2-3 pasti al giorno. Assicurare sempre acqua fresca a disposizione."
  },
  { 
    id: "d2", 
    name: "Almo Nature Holistic Medium Adult Pollo e Riso", 
    price: 24.90, 
    weight: "12kg", 
    badge: "Almo Nature", 
    rating: 4.9, 
    category: "Crocchette", 
    subcategory: "Obbligatorio", 
    animal: "cane", 
    age: "adulto", 
    brand: "Almo Nature", 
    breed: "Golden Retriever", 
    intolerances: [], 
    tags: ["Taglia media", "Pollo fresco", "Cereali integrali", "+3"],
    ingredients: "Pollo fresco (26%), riso integrale (14%), mais, orzo, polpa di barbabietola, olio di pesce, lievito, minerali, estratti vegetali.",
    benefits: [
      "Fonte proteica di alta qualità per mantenimento muscolare",
      "Cereali integrali per energia costante",
      "Omega-3 e 6 per pelo lucido e pelle sana",
      "Antiossidanti naturali per sistema immunitario",
      "Facile digeribilità"
    ],
    contraindications: "Non somministrare in caso di allergia al pollo o ai cereali. Consultare il veterinario in caso di patologie renali o epatiche.",
    usage: "Cane 10-15kg: 150-200g/giorno | 15-25kg: 200-300g/giorno | 25-35kg: 300-380g/giorno. Dividere in 2 pasti. Acqua sempre disponibile."
  },
  { 
    id: "d3", 
    name: "Briantos Adult Medium Pollo e Riso", 
    price: 19.90, 
    weight: "12kg", 
    badge: "Briantos", 
    rating: 4.6, 
    category: "Crocchette", 
    subcategory: "Obbligatorio", 
    animal: "cane", 
    age: "adulto", 
    brand: "Briantos", 
    breed: "Pastore Tedesco", 
    intolerances: [], 
    tags: ["Made in Italy", "Pollo fresco", "Formula bilanciata", "+3"],
    ingredients: "Pollo (24%), riso (16%), mais, grassi animali, polpa di barbabietola essiccata, lievito, minerali, yucca schidigera.",
    benefits: [
      "Formula bilanciata per cani adulti attivi",
      "Supporto articolare con glucosamina",
      "Digestione facilitata con prebiotici",
      "Mantello brillante grazie agli acidi grassi essenziali",
      "Made in Italy con controlli rigorosi"
    ],
    contraindications: "Evitare in caso di intolleranza al glutine o allergia al pollo. Non adatto a cani con problemi renali cronici senza supervisione veterinaria.",
    usage: "Peso 10-20kg: 170-280g | 20-30kg: 280-380g | 30-40kg: 380-470g al giorno. Somministrare in 1-2 pasti. Transizione graduale in 7 giorni."
  },
  { 
    id: "d4", 
    name: "Monge Natural Superpremium All Breeds Adult Salmone e Riso", 
    price: 21.90, 
    weight: "12kg", 
    badge: "Monge", 
    rating: 4.7, 
    category: "Crocchette", 
    subcategory: "Obbligatorio", 
    animal: "cane", 
    age: "adulto", 
    brand: "Monge", 
    breed: "Bulldog", 
    intolerances: ["Pollo"], 
    tags: ["Monoproteico", "Made in Italy", "Prebiotici XOS", "+4"],
    ingredients: "Salmone fresco (28%), riso (20%), patate, olio di salmone, prebiotici XOS, condroitina, glucosamina, estratti vegetali, minerali.",
    benefits: [
      "Monoproteico ideale per cani con intolleranze",
      "Prebiotici XOS per flora intestinale equilibrata",
      "Omega-3 da olio di salmone per cuore e cervello",
      "Condroitina per cartilagini e articolazioni",
      "Antiossidanti naturali"
    ],
    contraindications: "Non utilizzare in caso di allergia al pesce. Adatto anche a cani sensibili grazie alla formula monoproteica.",
    usage: "5-10kg: 90-150g | 10-20kg: 150-260g | 20-30kg: 260-350g | 30-40kg: 350-430g/giorno. Somministrare in 2 pasti."
  },
  { id: "d5", name: "Almo Nature Holistic Medium Adult Salmone e Riso", price: 26.90, weight: "12kg", badge: "Almo Nature", rating: 4.9, category: "Crocchette", subcategory: "Obbligatorio", animal: "cane", age: "adulto", brand: "Almo Nature", breed: "Beagle", intolerances: [], tags: ["Taglia media", "Salmone fresco", "Omega-3", "+3"], ingredients: "Salmone fresco, riso, oli di pesce, minerali, vitamine.", benefits: ["Alto contenuto di Omega-3", "Supporto cardiovascolare", "Pelo lucido"], contraindications: "Evitare in caso di allergia al pesce.", usage: "Seguire le dosi consigliate in base al peso." },
  { id: "d6", name: "Almo Nature Holistic Large Adult Pollo e Riso", price: 29.90, weight: "12kg", badge: "Almo Nature", rating: 4.8, category: "Crocchette", subcategory: "Obbligatorio", animal: "cane", age: "adulto", brand: "Almo Nature", breed: "Rottweiler", intolerances: [], tags: ["Taglia grande", "Pollo fresco", "Glucosamina", "+3"], ingredients: "Pollo fresco, riso, glucosamina, condroitina, minerali.", benefits: ["Supporto articolare per razze grandi", "Proteine di qualità", "Energia bilanciata"], contraindications: "Non adatto a cani allergici al pollo.", usage: "Dosare in base al peso e all'attività fisica." },
  { id: "d7", name: "Umido Gourmet Carne e Verdure", price: 24.50, weight: "6x400g", badge: "Monge", rating: 4.9, category: "Cibo Umido", animal: "cane", age: "adulto", brand: "Monge", breed: "Labrador", intolerances: [], tags: ["Carne vera", "Verdure fresche"], ingredients: "Carne (70%), verdure (carote, piselli), riso, minerali, oli vegetali.", benefits: ["Alto contenuto di carne fresca", "Idratazione ottimale", "Sapore appetibile", "Verdure per fibre"], contraindications: "Conservare in frigo dopo l'apertura. Consumare entro 24 ore.", usage: "1 vaschetta per 8-10kg di peso corporeo al giorno. Servire a temperatura ambiente." },
  { id: "d8", name: "Paté Salmone e Patate", price: 18.99, weight: "800g", rating: 4.6, category: "Cibo Umido", animal: "cane", age: "adulto", brand: "Almo Nature", breed: "Golden Retriever", intolerances: ["Cereali"], tags: ["Salmone fresco", "Patate dolci"], ingredients: "Salmone (65%), patate dolci (20%), olio di salmone, minerali, vitamine.", benefits: ["Grain-free per cani sensibili", "Omega-3 per pelle e pelo", "Facile digeribilità", "Texture morbida"], contraindications: "Evitare in caso di allergia al pesce.", usage: "400g per 10kg di peso. Mescolare con crocchette se desiderato." },
  { id: "d9", name: "Snack Dentali Freschezza", price: 8.99, weight: "200g", badge: "Monge", rating: 4.7, category: "Snack", animal: "cane", age: "giovane", brand: "Monge", breed: "Chihuahua", intolerances: [], tags: ["Igiene dentale", "Alito fresco"], ingredients: "Cereali, sottoprodotti vegetali, estratti di menta, clorofilla, minerali.", benefits: ["Riduce placca e tartaro", "Rinfresca l'alito", "Stimola la masticazione", "Ingredienti naturali"], contraindications: "Non sostituisce l'alimentazione completa. Max 3-5 pezzi al giorno.", usage: "1-2 snack al giorno tra i pasti. Non adatto a cuccioli sotto i 4 mesi." },
  { id: "d10", name: "Biscotti Croccanti Mix", price: 6.99, weight: "500g", rating: 4.5, category: "Snack", animal: "cane", age: "adulto", brand: "Briantos", breed: "Pastore Tedesco", intolerances: ["Glutine"], tags: ["Gusti assortiti", "Senza zucchero"], ingredients: "Farine senza glutine, carne essiccata, oli vegetali, minerali.", benefits: ["Senza zuccheri aggiunti", "Gusti variati", "Premio ideale per l'addestramento"], contraindications: "Non eccedere le dosi consigliate per evitare sovrappeso.", usage: "Come premio durante l'addestramento o tra i pasti principali." },
  { id: "d11", name: "Integratore Articolazioni", price: 29.99, weight: "60 compresse", rating: 4.8, category: "Integratori", animal: "cane", age: "senior", brand: "Altro", breed: "Labrador", intolerances: [], tags: ["Glucosamina", "Condroitina"], ingredients: "Glucosamina solfato (500mg), condroitina (400mg), MSM, collagene, vitamina C.", benefits: ["Supporta cartilagini e articolazioni", "Riduce dolori articolari", "Migliora mobilità", "Ideale per cani anziani o di taglia grande"], contraindications: "Consultare il veterinario in caso di patologie articolari gravi. Non somministrare a cuccioli.", usage: "1 compressa ogni 10kg di peso al giorno. Somministrare durante i pasti per 2-3 mesi." },
  { id: "d12", name: "Omega 3 Premium", price: 19.99, weight: "90 capsule", rating: 4.7, category: "Integratori", animal: "cane", age: "adulto", brand: "Altro", breed: "Golden Retriever", intolerances: [], tags: ["Pelo lucido", "Pelle sana"], ingredients: "Olio di pesce (EPA 180mg, DHA 120mg), vitamina E, olio di lino.", benefits: ["Pelo lucido e morbido", "Pelle sana senza irritazioni", "Supporto cardiovascolare", "Azione antinfiammatoria naturale"], contraindications: "Non somministrare in caso di terapie anticoagulanti senza parere veterinario.", usage: "1 capsula ogni 10kg di peso, 1 volta al giorno durante i pasti. Corso minimo 60 giorni." },
  { id: "d13", name: "Palla Interactive Rimbalzante", price: 12.99, weight: "1pc", rating: 4.6, category: "Giochi", animal: "cane", age: "giovane", brand: "Altro", breed: "Border Collie", intolerances: [], tags: ["Resistente", "Galleggia"], ingredients: "Gomma naturale atossica, materiali certificati pet-safe.", benefits: ["Stimola l'attività fisica", "Galleggia per giochi in acqua", "Resistente ai morsi", "Facile da pulire"], contraindications: "Sostituire se danneggiata. Supervisionare durante il gioco.", usage: "Ideale per giochi di riporto. Pulire regolarmente con acqua e sapone neutro." },
  { id: "d14", name: "Corda per Tiro", price: 9.99, weight: "1pc", rating: 4.5, category: "Giochi", animal: "cane", age: "giovane", brand: "Altro", breed: "Jack Russell", intolerances: [], tags: ["Cotone naturale", "Pulisce denti"], ingredients: "Cotone naturale 100%, nodi resistenti.", benefits: ["Pulisce denti e gengive", "Rinforza il legame cane-padrone", "Cotone naturale e sicuro", "Ideale per masticazione"], contraindications: "Controllare regolarmente l'integrità. Sostituire se sfilacciata.", usage: "Giochi di tiro controllati. Non lasciare incustodito con il cane." },
];

// Prodotti per gatti con informazioni dettagliate
const catProducts = [
  { 
    id: "c1", 
    name: "Scatoletto Salmone Premium", 
    price: 2.99, 
    weight: "85g", 
    rating: 4.8, 
    badge: "Almo Nature", 
    category: "Cibo Umido", 
    animal: "gatto", 
    age: "adulto", 
    brand: "Almo Nature", 
    breed: "Persiano", 
    intolerances: [], 
    tags: ["Salmone 100%", "Senza conservanti"],
    ingredients: "Salmone 75%, brodo di cottura, riso 3%.",
    benefits: [
      "Altissimo contenuto di pesce fresco",
      "Omega-3 per pelo lucido",
      "Senza conservanti o additivi",
      "Idratazione ottimale",
      "Sapore naturale irresistibile"
    ],
    contraindications: "Conservare in frigorifero dopo l'apertura. Consumare entro 24 ore.",
    usage: "1 scatoletta per 3-4kg di peso corporeo al giorno. Servire a temperatura ambiente."
  },
  { 
    id: "c2", 
    name: "Paté Tacchino e Riso", 
    price: 1.89, 
    weight: "100g", 
    rating: 4.7, 
    category: "Cibo Umido", 
    animal: "gatto", 
    age: "adulto", 
    brand: "Monge", 
    breed: "Siamese", 
    intolerances: [], 
    tags: ["Tacchino fresco", "Riso integrale"],
    ingredients: "Tacchino (60%), riso integrale (8%), minerali, taurina, vitamina E.",
    benefits: [
      "Proteina magra di alta qualità",
      "Taurina per salute cardiaca e visiva",
      "Texture cremosa appetibile",
      "Facile digeribilità"
    ],
    contraindications: "Non adatto a gatti con allergia al tacchino.",
    usage: "2-3 vaschette al giorno per gatto adulto di 4kg. Dividere in più pasti."
  },
  { 
    id: "c3", 
    name: "Crocchette Indoor Adult", 
    price: 22.99, 
    weight: "7kg", 
    rating: 4.6, 
    category: "Crocchette", 
    subcategory: "Obbligatorio", 
    animal: "gatto", 
    age: "adulto", 
    brand: "Royal Canin", 
    breed: "Maine Coon", 
    intolerances: [], 
    tags: ["Controllo hairball", "Digestione facile"],
    ingredients: "Proteine di pollame, riso, mais, fibre vegetali, polpa di barbabietola, grassi animali, minerali, vitamine.",
    benefits: [
      "Riduce formazione boli di pelo",
      "Controllo peso per gatti indoor",
      "Fibre specifiche per transito intestinale",
      "Salute urinaria"
    ],
    contraindications: "Non adatto a gattini sotto i 12 mesi o gatti sterilizzati senza controllo veterinario.",
    usage: "Gatto 3kg: 45g | 4kg: 55g | 5kg: 65g al giorno. Dividere in 2 pasti."
  },
  { 
    id: "c4", 
    name: "Croccantini Sensitive Digestion", 
    price: 35.50, 
    weight: "10kg", 
    rating: 4.9, 
    badge: "Almo Nature", 
    category: "Crocchette", 
    subcategory: "Obbligatorio", 
    animal: "gatto", 
    age: "adulto", 
    brand: "Almo Nature", 
    breed: "British Shorthair", 
    intolerances: ["Glutine"], 
    tags: ["Stomaci sensibili", "Prebiotici"],
    ingredients: "Pollo fresco (32%), patate, piselli, olio di salmone, prebiotici FOS, taurina, vitamine, minerali.",
    benefits: [
      "Grain-free per stomaci delicati",
      "Prebiotici per flora intestinale",
      "Taurina per cuore e vista",
      "Fonte proteica unica",
      "Facile digeribilità"
    ],
    contraindications: "Adatto anche a gatti con intolleranze alimentari. Transizione graduale consigliata.",
    usage: "3kg: 40-50g | 4kg: 50-60g | 5kg: 60-70g | 6kg: 70-80g al giorno."
  },
  { id: "c5", name: "Kitten Mousse Salmone", price: 2.49, weight: "85g", rating: 4.8, category: "Cibo Umido", animal: "gatto", age: "cucciolo", brand: "Monge", breed: "Persiano", intolerances: [], tags: ["Cuccioli 0-12 mesi", "DHA"], ingredients: "Salmone, DHA, taurina, vitamine.", benefits: ["DHA per sviluppo cerebrale", "Texture morbida", "Nutrizione completa per cuccioli"], contraindications: "Solo per gattini fino a 12 mesi.", usage: "2-3 vaschette al giorno per gattino di 2-3 mesi." },
  { id: "c6", name: "Snack Dental Care", price: 4.99, weight: "50g", rating: 4.4, category: "Snack", animal: "gatto", age: "giovane", brand: "Altro", breed: "Ragdoll", intolerances: [], tags: ["Igiene orale", "Croccanti"], ingredients: "Cereali, pollo, minerali, estratti vegetali.", benefits: ["Riduce placca", "Rinfresca alito", "Croccantezza dentale"], contraindications: "Max 10 pezzi al giorno.", usage: "Come snack tra i pasti." },
  { id: "c7", name: "Crunchy Snack Pollo", price: 2.50, weight: "80g", rating: 4.5, category: "Snack", animal: "gatto", age: "giovane", brand: "Monge", breed: "Siamese", intolerances: [], tags: ["Pollo 90%", "Snack naturale"], ingredients: "Pollo 90%, minerali, taurina.", benefits: ["Alto contenuto proteico", "Senza additivi", "Taurina essenziale"], contraindications: "Non sostituisce pasto completo.", usage: "5-10 pezzi al giorno come premio." },
  { id: "c8", name: "Integratore Hairball", price: 14.99, weight: "100g pasta", rating: 4.7, category: "Integratori", animal: "gatto", age: "adulto", brand: "Altro", breed: "Persiano", intolerances: [], tags: ["Previene boli di pelo", "Gusto malto"], ingredients: "Malto, oli vegetali, fibre, lecitina.", benefits: ["Facilita espulsione pelo", "Previene occlusioni", "Gusto appetibile"], contraindications: "In caso di occlusioni gravi, consultare veterinario.", usage: "3-5cm di pasta al giorno, anche mescolata al cibo." },
  { id: "c9", name: "Vitamine Complete", price: 18.99, weight: "60 compresse", rating: 4.6, category: "Integratori", animal: "gatto", age: "adulto", brand: "Altro", breed: "Maine Coon", intolerances: [], tags: ["Sistema immunitario", "Taurina"], ingredients: "Taurina, vitamine A, D, E, B-complex, minerali.", benefits: ["Supporto immunitario", "Taurina per cuore e vista", "Energia e vitalità"], contraindications: "Non superare le dosi consigliate.", usage: "1 compressa al giorno durante i pasti." },
  { id: "c10", name: "Palla Interactive Puzzle", price: 9.99, weight: "1pc", rating: 4.3, category: "Giochi", animal: "gatto", age: "giovane", brand: "Altro", breed: "Bengala", intolerances: [], tags: ["Stimolazione mentale", "Distributore snack"], ingredients: "Plastica atossica certificata.", benefits: ["Stimolazione mentale", "Combatte noia", "Rallenta alimentazione"], contraindications: "Pulire regolarmente.", usage: "Riempire con crocchette o snack. Lasciare giocare sotto supervisione." },
  { id: "c11", name: "Toy Mouse with Catnip", price: 3.99, weight: "1pc", rating: 4.6, badge: "Novità", category: "Giochi", animal: "gatto", age: "giovane", brand: "Altro", breed: "Abissino", intolerances: [], tags: ["Con catnip", "Peluche morbido"], ingredients: "Tessuto morbido, imbottitura, catnip naturale.", benefits: ["Stimola istinto caccia", "Catnip rilassante", "Morbido e sicuro"], contraindications: "Controllare stato del gioco. Sostituire se danneggiato.", usage: "Gioco libero. Il catnip perde effetto dopo 10-15 minuti." },
];

const allProducts = [...dogProducts, ...catProducts];

// Categorie principali con icone numerate
const mainCategories = [
  { id: "Crocchette", label: "Crocchette", sublabel: "(Obbligatorio)", number: 1 },
  { id: "Cibo Umido", label: "Cibo Umido", number: 2 },
  { id: "Snack", label: "Snack", number: 3 },
  { id: "Integratori", label: "Integratori", number: 4 },
  { id: "Giochi", label: "Giochi", number: 5 },
];

// Razze comuni
const dogBreeds = ["Labrador", "Golden Retriever", "Pastore Tedesco", "Bulldog", "Beagle", "Chihuahua", "Rottweiler", "Border Collie", "Jack Russell"];
const catBreeds = ["Persiano", "Siamese", "Maine Coon", "British Shorthair", "Ragdoll", "Bengala", "Abissino"];

// Intolleranze comuni
const commonIntolerances = ["Glutine", "Cereali", "Pollo", "Manzo", "Lattosio", "Soia"];

// Sensibilità particolari comuni
const commonSensitivities = ["Stomaco sensibile", "Pelle sensibile", "Digestione delicata", "Sensibilità alimentare", "Sensibilità cutanea"];

// Allergie comuni
const commonAllergies = ["Polline", "Acari", "Polvere", "Erba", "Punture insetti"];

// Problemi di salute comuni
const commonHealthIssues = ["Sovrappeso", "Diabete", "Problemi renali", "Problemi articolari", "Problemi digestivi", "Problemi cardiaci"];

// Interface per item del carrello
interface CartItem {
  id: string;
  name: string;
  price: number;
  weight: string;
  animal: string;
  quantity: number;
}

export default function ProdottiPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const productsRef = useRef<HTMLDivElement>(null);
  
  const [selectedAnimal, setSelectedAnimal] = useState<string>("cane");
  const [selectedCategory, setSelectedCategory] = useState<string>("Crocchette");
  const [selectedAge, setSelectedAge] = useState<string>("all");
  const [selectedBrand, setSelectedBrand] = useState<string>("all");
  const [selectedBreed, setSelectedBreed] = useState<string>("all");
  const [selectedIntolerance, setSelectedIntolerance] = useState<string>("all");
  const [selectedSensitivity, setSelectedSensitivity] = useState<string>("all");
  const [selectedAllergy, setSelectedAllergy] = useState<string>("all");
  const [selectedHealthIssue, setSelectedHealthIssue] = useState<string>("all");
  const [breedSearch, setBreedSearch] = useState<string>("");
  const [intoleranceSearch, setIntoleranceSearch] = useState<string>("");
  const [sensitivitySearch, setSensitivitySearch] = useState<string>("");
  const [allergySearch, setAllergySearch] = useState<string>("");
  const [healthIssueSearch, setHealthIssueSearch] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("popular");

  // Stati per il carrello
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  // Stati per il prodotto dettaglio
  const [selectedProduct, setSelectedProduct] = useState<typeof allProducts[0] | null>(null);
  const [isProductDetailOpen, setIsProductDetailOpen] = useState<boolean>(false);

  // Stati per il checkout dialog
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [selectedFrequency, setSelectedFrequency] = useState<number>(2);
  const [selectedDay, setSelectedDay] = useState<string>("Lunedì");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("mattina");

  // Opzioni per il checkout
  const frequencyOptions = [
    { value: 1, label: "Ogni settimana" },
    { value: 2, label: "Ogni 2 settimane" },
    { value: 3, label: "Ogni 3 settimane" },
    { value: 4, label: "Ogni 4 settimane" }
  ];

  const dayOptions = ["Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato", "Domenica"];

  const timeSlotOptions = [
    { value: "mattina", label: "8-12 Mattina" },
    { value: "pomeriggio", label: "14-18 Pomeriggio" },
    { value: "sera", label: "18-20 Sera" }
  ];

  // Applica filtri dai parametri URL all'avvio
  useEffect(() => {
    const animalParam = searchParams.get("animal");
    const categoryParam = searchParams.get("category");
    const ageParam = searchParams.get("age");
    const breedParam = searchParams.get("breed");
    const intoleranceParam = searchParams.get("intolerance");
    const allergyParam = searchParams.get("allergy");
    
    if (animalParam && (animalParam === "cane" || animalParam === "gatto")) {
      setSelectedAnimal(animalParam);
    }
    
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
    
    if (ageParam) {
      setSelectedAge(ageParam);
    }
    
    if (breedParam) {
      setSelectedBreed(breedParam);
    }
    
    if (intoleranceParam) {
      setSelectedIntolerance(intoleranceParam);
    }
    
    if (allergyParam) {
      setSelectedAllergy(allergyParam);
    }
  }, [searchParams]);

  // Scroll to products when filters change
  useEffect(() => {
    if (productsRef.current) {
      productsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [selectedAnimal, selectedCategory, selectedAge, selectedBrand, selectedBreed, selectedIntolerance, selectedSensitivity, selectedAllergy, selectedHealthIssue, sortBy]);

  // Funzione per aggiungere al carrello
  const addToCart = (product: typeof allProducts[0]) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, {
        id: product.id,
        name: product.name,
        price: product.price,
        weight: product.weight,
        animal: product.animal,
        quantity: 1
      }];
    });
    setIsCartOpen(true);
  };

  // Funzione per rimuovere dal carrello
  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  // Funzione per aggiornare quantità
  const updateQuantity = (id: string, change: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQuantity = item.quantity + change;
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  // Calcola totale
  const cartTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Funzione per procedere al checkout
  const proceedToCheckout = () => {
    // Salva il carrello in localStorage
    localStorage.setItem("cart", JSON.stringify(cartItems));
    // Naviga alla pagina abbonamento
    router.push("/abbonamento");
  };

  const getFilteredProducts = () => {
    let filtered = allProducts;

    if (selectedAnimal) {
      filtered = filtered.filter((p) => p.animal === selectedAnimal);
    }
    
    if (selectedCategory) {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    if (selectedAge !== "all") {
      filtered = filtered.filter((p) => "age" in p && p.age === selectedAge);
    }

    if (selectedBrand !== "all") {
      filtered = filtered.filter((p) => p.brand === selectedBrand);
    }

    if (selectedBreed !== "all") {
      filtered = filtered.filter((p) => "breed" in p && p.breed === selectedBreed);
    }

    if (selectedIntolerance !== "all") {
      filtered = filtered.filter((p) => "intolerances" in p && !p.intolerances.includes(selectedIntolerance));
    }

    if (selectedSensitivity !== "all") {
      filtered = filtered.filter((p) => 
        "sensitivities" in p && (p.sensitivities as string[]).length === 0 || 
        !("sensitivities" in p) || 
        ("sensitivities" in p && !(p.sensitivities as string[]).includes(selectedSensitivity))
      );
    }

    if (selectedAllergy !== "all") {
      filtered = filtered.filter((p) => 
        "allergies" in p && (p.allergies as string[]).length === 0 || 
        !("allergies" in p) || 
        ("allergies" in p && !(p.allergies as string[]).includes(selectedAllergy))
      );
    }

    if (selectedHealthIssue !== "all") {
      filtered = filtered.filter((p) => 
        "healthIssues" in p && (p.healthIssues as string[]).includes(selectedHealthIssue)
      );
    }

    // Ordinamento
    if (sortBy === "popular") {
      filtered = filtered.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "price-low") {
      filtered = filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      filtered = filtered.sort((a, b) => b.price - a.price);
    }

    return filtered;
  };

  const currentProducts = getFilteredProducts();

  const brands = Array.from(new Set(allProducts.filter(p => p.animal === selectedAnimal).map((p) => p.brand))).sort();
  
  const availableBreeds = selectedAnimal === "cane" ? dogBreeds : catBreeds;
  const filteredBreeds = availableBreeds.filter(breed => 
    breed.toLowerCase().includes(breedSearch.toLowerCase())
  );

  const filteredIntolerances = commonIntolerances.filter(intol => 
    intol.toLowerCase().includes(intoleranceSearch.toLowerCase())
  );

  const filteredSensitivities = commonSensitivities.filter(sens => 
    sens.toLowerCase().includes(sensitivitySearch.toLowerCase())
  );

  const filteredAllergies = commonAllergies.filter(allergy => 
    allergy.toLowerCase().includes(allergySearch.toLowerCase())
  );

  const filteredHealthIssues = commonHealthIssues.filter(issue => 
    issue.toLowerCase().includes(healthIssueSearch.toLowerCase())
  );

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-orange-50">
        {/* Pulsante Carrello Fisso */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="fixed top-24 right-6 z-40 bg-[#FF6B35] hover:bg-[#E55A2B] text-white p-4 rounded-full shadow-lg transition-all flex items-center gap-2">
          <ShoppingBag className="w-6 h-6" />
          {cartItemCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
              {cartItemCount}
            </span>
          )}
        </button>

        {/* Overlay Carrello */}
        {isCartOpen && (
          <>
            {/* Backdrop */}
            <div
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black/50 z-40 transition-opacity"
            />
            
            {/* Drawer Carrello */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-full sm:w-96 bg-white shadow-2xl z-50 flex flex-col">
              
              {/* Header Carrello */}
              <div className="bg-[#FF6B35] text-white p-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <ShoppingBag className="w-6 h-6" />
                  <h2 className="text-xl font-bold">Il Tuo Carrello</h2>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Contenuto Carrello */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {cartItems.length === 0 ? (
                  <div className="text-center py-12">
                    <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 font-medium">Il tuo carrello è vuoto</p>
                    <p className="text-gray-400 text-sm mt-2">Aggiungi prodotti per iniziare</p>
                  </div>
                ) : (
                  <>
                    {cartItems.map((item) => (
                      <div
                        key={item.id}
                        className="bg-gray-50 rounded-xl p-4 flex gap-4">
                        
                        {/* Immagine Prodotto */}
                        <div className="w-20 h-20 flex-shrink-0 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg flex items-center justify-center">
                          {item.animal === "cane" ? (
                            <Dog className="w-10 h-10 text-orange-400" />
                          ) : (
                            <Cat className="w-10 h-10 text-orange-400" />
                          )}
                        </div>

                        {/* Contenuto */}
                        <div className="flex-1 space-y-3">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <h3 className="font-semibold text-sm text-[#2D3748] line-clamp-2">
                                {item.name}
                              </h3>
                              <p className="text-xs text-gray-500 mt-1">{item.weight}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="text-xs text-gray-600 capitalize">{item.animal}</span>
                              </div>
                            </div>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="p-2 hover:bg-red-50 rounded-lg transition-colors group">
                              <Trash2 className="w-4 h-4 text-gray-400 group-hover:text-red-500" />
                            </button>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <button
                                onClick={() => updateQuantity(item.id, -1)}
                                className="w-8 h-8 flex items-center justify-center bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                                <Minus className="w-4 h-4 text-[#2D3748]" />
                              </button>
                              <span className="font-semibold text-[#2D3748] w-8 text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, 1)}
                                className="w-8 h-8 flex items-center justify-center bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                                <Plus className="w-4 h-4 text-[#2D3748]" />
                              </button>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-lg text-[#FF6B35]">
                                €{(item.price * item.quantity).toFixed(2)}
                              </p>
                              <p className="text-xs text-gray-500">
                                €{item.price.toFixed(2)} cad.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </div>

              {/* Footer Carrello */}
              {cartItems.length > 0 && (
                <div className="border-t border-gray-200 p-6 space-y-4 bg-white">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-[#2D3748]">Totale:</span>
                    <span className="text-2xl font-bold text-[#FF6B35]">
                      €{cartTotal.toFixed(2)}
                    </span>
                  </div>
                  <button 
                    onClick={proceedToCheckout}
                    className="w-full bg-[#FF6B35] hover:bg-[#E55A2B] text-white py-4 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-xl">
                    Procedi al Checkout
                  </button>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="w-full bg-gray-100 hover:bg-gray-200 text-[#2D3748] py-3 rounded-xl font-semibold transition-all">
                    Continua lo Shopping
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}

        {/* Checkout Dialog */}
        {isCheckoutOpen && (
          <>
            {/* Backdrop */}
            <div
              onClick={() => setIsCheckoutOpen(false)}
              className="fixed inset-0 bg-black/50 z-50 transition-opacity"
            />
            
            {/* Dialog Checkout */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-white rounded-2xl shadow-2xl z-50 max-h-[90vh] overflow-y-auto">
              
              {/* Header */}
              <div className="bg-[#FF6B35] text-white p-6 rounded-t-2xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-6 h-6" />
                    <h2 className="text-xl font-bold">Programma la Consegna</h2>
                  </div>
                  <button
                    onClick={() => setIsCheckoutOpen(false)}
                    className="p-2 hover:bg-white/20 rounded-lg transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-white/90 text-sm mt-2">
                  Scegli quando vuoi ricevere il tuo ordine
                </p>
              </div>

              {/* Contenuto */}
              <div className="p-6 space-y-6">
                {/* Riepilogo Carrello */}
                <div className="bg-orange-50 rounded-xl p-4 border border-orange-100">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-[#2D3748]">
                      {cartItemCount} {cartItemCount === 1 ? "prodotto" : "prodotti"}
                    </span>
                    <span className="text-lg font-bold text-[#FF6B35]">
                      €{cartTotal.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Frequenza */}
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-[#2D3748] flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#FF6B35]" />
                    Frequenza di Consegna
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {frequencyOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setSelectedFrequency(option.value)}
                        className={`p-4 rounded-xl border-2 transition-all font-semibold text-sm ${
                          selectedFrequency === option.value
                            ? "border-[#FF6B35] bg-orange-50 text-[#FF6B35]"
                            : "border-gray-200 bg-white text-[#2D3748] hover:border-gray-300"
                        }`}>
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Giorno della Settimana */}
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-[#2D3748] flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#FF6B35]" />
                    Giorno di Consegna
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {dayOptions.map((day) => (
                      <button
                        key={day}
                        onClick={() => setSelectedDay(day)}
                        className={`p-3 rounded-lg border-2 transition-all font-medium text-sm ${
                          selectedDay === day
                            ? "border-[#FF6B35] bg-orange-50 text-[#FF6B35]"
                            : "border-gray-200 bg-white text-[#2D3748] hover:border-gray-300"
                        }`}>
                        {day}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Fascia Oraria */}
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-[#2D3748] flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#FF6B35]" />
                    Fascia Oraria
                  </label>
                  <div className="space-y-2">
                    {timeSlotOptions.map((slot) => (
                      <button
                        key={slot.value}
                        onClick={() => setSelectedTimeSlot(slot.value)}
                        className={`w-full p-4 rounded-xl border-2 transition-all font-semibold text-sm flex items-center justify-between ${
                          selectedTimeSlot === slot.value
                            ? "border-[#FF6B35] bg-orange-50 text-[#FF6B35]"
                            : "border-gray-200 bg-white text-[#2D3748] hover:border-gray-300"
                        }`}>
                        <span>{slot.label}</span>
                        {selectedTimeSlot === slot.value && (
                          <div className="w-5 h-5 rounded-full bg-[#FF6B35] flex items-center justify-center">
                            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Riepilogo Selezione */}
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <h3 className="font-semibold text-[#2D3748] mb-3 text-sm">Riepilogo:</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Frequenza:</span>
                      <span className="font-semibold text-[#2D3748]">
                        {frequencyOptions.find(o => o.value === selectedFrequency)?.label}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Giorno:</span>
                      <span className="font-semibold text-[#2D3748]">{selectedDay}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Orario:</span>
                      <span className="font-semibold text-[#2D3748]">
                        {timeSlotOptions.find(o => o.value === selectedTimeSlot)?.label}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="border-t border-gray-200 p-6 space-y-3 bg-white rounded-b-2xl">
                <button
                  onClick={proceedToCheckout}
                  className="w-full bg-[#FF6B35] hover:bg-[#E55A2B] text-white py-4 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-xl">
                  Conferma Abbonamento
                </button>
                <button
                  onClick={() => setIsCheckoutOpen(false)}
                  className="w-full bg-gray-100 hover:bg-gray-200 text-[#2D3748] py-3 rounded-xl font-semibold transition-all">
                  Torna al Carrello
                </button>
              </div>
            </motion.div>
          </>
        )}

        <section className="relative py-6">
          <div className="w-full px-4">
            {/* Hero Section - Professional & Clean */}
            <div className="relative text-center mb-8 rounded-2xl overflow-hidden bg-white border border-gray-200 shadow-sm animate-fade-in">
              {/* Background Pattern Subtle */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-50/30 via-white to-orange-50/30">
                <div className="absolute inset-0" style={{
                  backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255, 107, 53, 0.05) 1px, transparent 0)`,
                  backgroundSize: '32px 32px'
                }}></div>
              </div>

              <div className="relative z-10 py-10 px-6">
                {/* Badge Professionale */}
                <div className="flex justify-center mb-3">
                  <span className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1.5 rounded-full text-xs font-semibold border border-green-100">
                    <CheckCircle className="w-3 h-3" />
                    Prodotti Certificati & Selezionati
                  </span>
                </div>

                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#2D3748] mb-2 font-heading">
                  Nutrizione di Qualità
                </h1>
                <p className="text-base text-gray-600 max-w-2xl mx-auto font-medium">
                  Scegli tra i migliori brand italiani ed europei per il benessere del tuo animale
                </p>

                {/* Trust Indicators */}
                <div className="flex flex-wrap justify-center items-center gap-5 mt-5 text-xs text-gray-600">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="font-medium">Spedizione Gratuita</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="font-medium">Garanzia Soddisfatti</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="font-medium">Prodotti Veterinari</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Barra Categorie Orizzontale */}
            <div className="mb-6 overflow-x-auto">
              <div className="flex gap-3 pb-2 min-w-max">
                {mainCategories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`flex items-center gap-3 px-6 py-3 rounded-xl transition-all whitespace-nowrap ${
                      selectedCategory === cat.id
                        ? "bg-[#FF6B35] text-white shadow-lg"
                        : "bg-white text-[#2D3748] border border-gray-200 hover:border-[#FF6B35]"
                    }`}>
                    <div className={`flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm ${
                      selectedCategory === cat.id
                        ? "bg-white/20 text-white"
                        : "bg-gray-100 text-[#2D3748]"
                    }`}>
                      {cat.number}
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-sm">{cat.label}</div>
                      {cat.sublabel && (
                        <div className={`text-xs ${selectedCategory === cat.id ? "text-white/80" : "text-gray-500"}`}>
                          {cat.sublabel}
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Layout con sidebar */}
            <div className="grid grid-cols-1 lg:grid-cols-[238px_1fr] gap-4">
              {/* Sidebar Filtri */}
              <aside className="lg:h-[calc(100vh-140px)] lg:sticky lg:top-24">
                <div className="bg-white rounded-xl shadow-sm border border-[#FF6B35] h-full flex flex-col">
                  {/* Header Filtri - FISSO */}
                  <div className="flex items-center gap-2 text-lg font-bold text-[#2D3748] p-4 flex-shrink-0">
                    <Filter className="w-5 h-5" />
                    Filtri
                  </div>

                  {/* Contenuto scrollabile */}
                  <div className="overflow-y-auto p-6 space-y-6 flex-1">
                    {/* Filtro Animale - Cane o Gatto */}
                    <div>
                      <h3 className="text-sm font-bold text-[#2D3748] mb-3 flex items-center gap-2 bg-orange-50 rounded-lg px-3 py-2.5">
                        <Utensils className="w-4 h-4" />
                        Animale
                      </h3>
                      <div className="space-y-1">
                        <button
                          onClick={() => setSelectedAnimal("cane")}
                          className="w-full flex items-center gap-3 text-left transition-all duration-200 p-2 rounded-lg hover:bg-orange-50/60 hover:shadow-sm">
                          <div className={`w-5 h-5 flex-shrink-0 rounded border-2 flex items-center justify-center transition-all ${
                            selectedAnimal === "cane" ? "border-[#FF6B35] bg-[#FF6B35]" : "border-gray-300 bg-white"
                          }`}>
                            {selectedAnimal === "cane" && (
                              <span className="text-sm">🐶</span>
                            )}
                          </div>
                          <span className="text-[0.7875rem] font-medium text-[#2D3748]">Cane</span>
                        </button>
                        <button
                          onClick={() => setSelectedAnimal("gatto")}
                          className="w-full flex items-center gap-3 text-left transition-all duration-200 p-2 rounded-lg hover:bg-orange-50/60 hover:shadow-sm">
                          <div className={`w-5 h-5 flex-shrink-0 rounded border-2 flex items-center justify-center transition-all ${
                            selectedAnimal === "gatto" ? "border-[#FF6B35] bg-[#FF6B35]" : "border-gray-300 bg-white"
                          }`}>
                            {selectedAnimal === "gatto" && (
                              <span className="text-sm">🐱</span>
                            )}
                          </div>
                          <span className="text-[0.7875rem] font-medium text-[#2D3748]">Gatto</span>
                        </button>
                      </div>
                    </div>

                    {/* Filtro Età */}
                    <div>
                      <h3 className="text-sm font-bold text-[#2D3748] mb-2 flex items-center gap-2 bg-orange-50 rounded-lg px-3 py-2">
                        <Calendar className="w-4 h-4" />
                        Età
                      </h3>
                      <div className="space-y-1">
                        {[
                          { id: "cucciolo", label: "Cucciolo" },
                          { id: "giovane", label: "Giovane" },
                          { id: "adulto", label: "Adulto" },
                          { id: "senior", label: "Senior" }
                        ].map((age) => (
                          <button
                            key={age.id}
                            onClick={() => setSelectedAge(age.id === selectedAge ? "all" : age.id)}
                            className="w-full flex items-center gap-3 text-left transition-all p-2 rounded-lg hover:bg-orange-50">
                            <div className={`w-5 h-5 flex-shrink-0 rounded border-2 flex items-center justify-center transition-all ${
                              selectedAge === age.id ? "border-[#FF6B35] bg-[#FF6B35]" : "border-gray-300 bg-white"
                            }`}>
                              {selectedAge === age.id && (
                                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                              )}
                            </div>
                            <span className="text-[0.7875rem] font-medium text-[#2D3748]">{age.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    {/* Filtro Marchio */}
                    <div>
                      <h3 className="text-sm font-bold text-[#2D3748] mb-2 flex items-center gap-2 bg-orange-50 rounded-lg px-3 py-2">
                        <Tag className="w-4 h-4" />
                        Marchio
                      </h3>
                      <div className="space-y-1">
                        <button
                          onClick={() => setSelectedBrand("all")}
                          className="w-full flex items-center gap-3 text-left transition-all p-2 rounded-lg hover:bg-orange-50">
                          <div className={`w-5 h-5 flex-shrink-0 rounded border-2 flex items-center justify-center transition-all ${
                            selectedBrand === "all" ? "border-[#FF6B35] bg-[#FF6B35]" : "border-gray-300 bg-white"
                          }`}>
                            {selectedBrand === "all" && (
                              <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </div>
                          <span className="text-[0.7875rem] font-medium text-[#2D3748]">Tutte le marche</span>
                        </button>
                        {brands.map((brand) => (
                          <button
                            key={brand}
                            onClick={() => setSelectedBrand(brand)}
                            className="w-full flex items-center gap-3 text-left transition-all p-2 rounded-lg hover:bg-orange-50">
                            <div className={`w-5 h-5 flex-shrink-0 rounded border-2 flex items-center justify-center transition-all ${
                              selectedBrand === brand ? "border-[#FF6B35] bg-[#FF6B35]" : "border-gray-300 bg-white"
                            }`}>
                              {selectedBrand === brand && (
                                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                              )}
                            </div>
                            <span className="text-[0.7875rem] font-medium text-[#2D3748]">{brand}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Filtro Razza */}
                    <div>
                      <h3 className="text-sm font-bold text-[#2D3748] mb-2 flex items-center gap-2 bg-orange-50 rounded-lg px-3 py-2">
                        <Dog className="w-4 h-4" />
                        Razza
                      </h3>
                      
                      {/* Barra di ricerca */}
                      <div className="relative mb-2">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Cerca razza..."
                          value={breedSearch}
                          onChange={(e) => setBreedSearch(e.target.value)}
                          className="w-full pl-9 pr-3 py-2 text-[0.7875rem] border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent"
                        />
                      </div>

                      <div className="space-y-1 max-h-48 overflow-y-auto">
                        <button
                          onClick={() => setSelectedBreed("all")}
                          className="w-full flex items-center gap-3 text-left transition-all p-2 rounded-lg hover:bg-orange-50">
                          <div className={`w-5 h-5 flex-shrink-0 rounded border-2 flex items-center justify-center transition-all ${
                            selectedBreed === "all" ? "border-[#FF6B35] bg-[#FF6B35]" : "border-gray-300 bg-white"
                          }`}>
                            {selectedBreed === "all" && (
                              <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </div>
                          <span className="text-[0.7875rem] font-medium text-[#2D3748]">Tutte le razze</span>
                        </button>
                        {filteredBreeds.map((breed) => (
                          <button
                            key={breed}
                            onClick={() => setSelectedBreed(breed)}
                            className="w-full flex items-center gap-3 text-left transition-all p-2 rounded-lg hover:bg-orange-50">
                            <div className={`w-5 h-5 flex-shrink-0 rounded border-2 flex items-center justify-center transition-all ${
                              selectedBreed === breed ? "border-[#FF6B35] bg-[#FF6B35]" : "border-gray-300 bg-white"
                            }`}>
                              {selectedBreed === breed && (
                                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                              )}
                            </div>
                            <span className="text-[0.7875rem] font-medium text-[#2D3748]">{breed}</span>
                          </button>
                        ))}
                      </div>
                      
                      {/* Esempi sotto */}
                      <div className="mt-2 text-[0.675rem] text-gray-500">
                        Es: {availableBreeds.slice(0, 3).join(", ")}
                      </div>
                    </div>

                    {/* Filtro Intolleranze */}
                    <div>
                      <h3 className="text-sm font-bold text-[#2D3748] mb-2 flex items-center gap-2 bg-orange-50 rounded-lg px-3 py-2">
                        <Package className="w-4 h-4" />
                        Intolleranze
                      </h3>
                      
                      {/* Barra di ricerca */}
                      <div className="relative mb-2">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Cerca intolleranza..."
                          value={intoleranceSearch}
                          onChange={(e) => setIntoleranceSearch(e.target.value)}
                          className="w-full pl-9 pr-3 py-2 text-[0.7875rem] border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent"
                        />
                      </div>

                      <div className="space-y-1 max-h-48 overflow-y-auto">
                        <button
                          onClick={() => setSelectedIntolerance("all")}
                          className="w-full flex items-center gap-3 text-left transition-all p-2 rounded-lg hover:bg-orange-50">
                          <div className={`w-5 h-5 flex-shrink-0 rounded border-2 flex items-center justify-center transition-all ${
                            selectedIntolerance === "all" ? "border-[#FF6B35] bg-[#FF6B35]" : "border-gray-300 bg-white"
                          }`}>
                            {selectedIntolerance === "all" && (
                              <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </div>
                          <span className="text-[0.7875rem] font-medium text-[#2D3748]">Nessuna intolleranza</span>
                        </button>
                        {filteredIntolerances.map((intol) => (
                          <button
                            key={intol}
                            onClick={() => setSelectedIntolerance(intol)}
                            className="w-full flex items-center gap-3 text-left transition-all p-2 rounded-lg hover:bg-orange-50">
                            <div className={`w-5 h-5 flex-shrink-0 rounded border-2 flex items-center justify-center transition-all ${
                              selectedIntolerance === intol ? "border-[#FF6B35] bg-[#FF6B35]" : "border-gray-300 bg-white"
                            }`}>
                              {selectedIntolerance === intol && (
                                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                              )}
                            </div>
                            <span className="text-[0.7875rem] font-medium text-[#2D3748]">{intol}</span>
                          </button>
                        ))}
                      </div>
                      
                      {/* Esempi sotto */}
                      <div className="mt-2 text-[0.675rem] text-gray-500">
                        Es: {commonIntolerances.slice(0, 3).join(", ")}
                      </div>
                    </div>

                    {/* Filtro Sensibilità Particolari */}
                    <div>
                      <h3 className="text-sm font-bold text-[#2D3748] mb-2 flex items-center gap-2 bg-orange-50 rounded-lg px-3 py-2">
                        <AlertCircle className="w-4 h-4" />
                        Sensibilità Particolari
                      </h3>
                      
                      {/* Barra di ricerca */}
                      <div className="relative mb-2">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Cerca sensibilità..."
                          value={sensitivitySearch}
                          onChange={(e) => setSensitivitySearch(e.target.value)}
                          className="w-full pl-9 pr-3 py-2 text-[0.7875rem] border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent"
                        />
                      </div>

                      <div className="space-y-1 max-h-48 overflow-y-auto">
                        <button
                          onClick={() => setSelectedSensitivity("all")}
                          className="w-full flex items-center gap-3 text-left transition-all p-2 rounded-lg hover:bg-orange-50">
                          <div className={`w-5 h-5 flex-shrink-0 rounded border-2 flex items-center justify-center transition-all ${
                            selectedSensitivity === "all" ? "border-[#FF6B35] bg-[#FF6B35]" : "border-gray-300 bg-white"
                          }`}>
                            {selectedSensitivity === "all" && (
                              <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </div>
                          <span className="text-[0.7875rem] font-medium text-[#2D3748]">Nessuna sensibilità</span>
                        </button>
                        {filteredSensitivities.map((sens) => (
                          <button
                            key={sens}
                            onClick={() => setSelectedSensitivity(sens)}
                            className="w-full flex items-center gap-3 text-left transition-all p-2 rounded-lg hover:bg-orange-50">
                            <div className={`w-5 h-5 flex-shrink-0 rounded border-2 flex items-center justify-center transition-all ${
                              selectedSensitivity === sens ? "border-[#FF6B35] bg-[#FF6B35]" : "border-gray-300 bg-white"
                            }`}>
                              {selectedSensitivity === sens && (
                                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                              )}
                            </div>
                            <span className="text-[0.7875rem] font-medium text-[#2D3748]">{sens}</span>
                          </button>
                        ))}
                      </div>
                      
                      {/* Esempi sotto */}
                      <div className="mt-2 text-[0.675rem] text-gray-500">
                        Es: {commonSensitivities.slice(0, 2).join(", ")}
                      </div>
                    </div>

                    {/* Filtro Allergie */}
                    <div>
                      <h3 className="text-sm font-bold text-[#2D3748] mb-2 flex items-center gap-2 bg-orange-50 rounded-lg px-3 py-2">
                        <Heart className="w-4 h-4" />
                        Allergie
                      </h3>
                      
                      {/* Barra di ricerca */}
                      <div className="relative mb-2">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Cerca allergia..."
                          value={allergySearch}
                          onChange={(e) => setAllergySearch(e.target.value)}
                          className="w-full pl-9 pr-3 py-2 text-[0.7875rem] border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent"
                        />
                      </div>

                      <div className="space-y-1 max-h-48 overflow-y-auto">
                        <button
                          onClick={() => setSelectedAllergy("all")}
                          className="w-full flex items-center gap-3 text-left transition-all p-2 rounded-lg hover:bg-orange-50">
                          <div className={`w-5 h-5 flex-shrink-0 rounded border-2 flex items-center justify-center transition-all ${
                            selectedAllergy === "all" ? "border-[#FF6B35] bg-[#FF6B35]" : "border-gray-300 bg-white"
                          }`}>
                            {selectedAllergy === "all" && (
                              <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </div>
                          <span className="text-[0.7875rem] font-medium text-[#2D3748]">Nessuna allergia</span>
                        </button>
                        {filteredAllergies.map((allergy) => (
                          <button
                            key={allergy}
                            onClick={() => setSelectedAllergy(allergy)}
                            className="w-full flex items-center gap-3 text-left transition-all p-2 rounded-lg hover:bg-orange-50">
                            <div className={`w-5 h-5 flex-shrink-0 rounded border-2 flex items-center justify-center transition-all ${
                              selectedAllergy === allergy ? "border-[#FF6B35] bg-[#FF6B35]" : "border-gray-300 bg-white"
                            }`}>
                              {selectedAllergy === allergy && (
                                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                              )}
                            </div>
                            <span className="text-[0.7875rem] font-medium text-[#2D3748]">{allergy}</span>
                          </button>
                        ))}
                      </div>
                      
                      {/* Esempi sotto */}
                      <div className="mt-2 text-[0.675rem] text-gray-500">
                        Es: {commonAllergies.slice(0, 3).join(", ")}
                      </div>
                    </div>

                    {/* Filtro Problemi di Salute */}
                    <div>
                      <h3 className="text-sm font-bold text-[#2D3748] mb-2 flex items-center gap-2 bg-orange-50 rounded-lg px-3 py-2">
                        <Activity className="w-4 h-4" />
                        Problemi di Salute
                      </h3>
                      
                      {/* Barra di ricerca */}
                      <div className="relative mb-2">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Cerca problema..."
                          value={healthIssueSearch}
                          onChange={(e) => setHealthIssueSearch(e.target.value)}
                          className="w-full pl-9 pr-3 py-2 text-[0.7875rem] border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent"
                        />
                      </div>

                      <div className="space-y-1 max-h-48 overflow-y-auto">
                        <button
                          onClick={() => setSelectedHealthIssue("all")}
                          className="w-full flex items-center gap-3 text-left transition-all p-2 rounded-lg hover:bg-orange-50">
                          <div className={`w-5 h-5 flex-shrink-0 rounded border-2 flex items-center justify-center transition-all ${
                            selectedHealthIssue === "all" ? "border-[#FF6B35] bg-[#FF6B35]" : "border-gray-300 bg-white"
                          }`}>
                            {selectedHealthIssue === "all" && (
                              <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </div>
                          <span className="text-[0.7875rem] font-medium text-[#2D3748]">Nessun problema</span>
                        </button>
                        {filteredHealthIssues.map((issue) => (
                          <button
                            key={issue}
                            onClick={() => setSelectedHealthIssue(issue)}
                            className="w-full flex items-center gap-3 text-left transition-all p-2 rounded-lg hover:bg-orange-50">
                            <div className={`w-5 h-5 flex-shrink-0 rounded border-2 flex items-center justify-center transition-all ${
                              selectedHealthIssue === issue ? "border-[#FF6B35] bg-[#FF6B35]" : "border-gray-300 bg-white"
                            }`}>
                              {selectedHealthIssue === issue && (
                                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                              )}
                            </div>
                            <span className="text-[0.7875rem] font-medium text-[#2D3748]">{issue}</span>
                          </button>
                        ))}
                      </div>
                      
                      {/* Esempi sotto */}
                      <div className="mt-2 text-[0.675rem] text-gray-500">
                        Es: {commonHealthIssues.slice(0, 2).join(", ")}
                      </div>
                    </div>
                  </div>
                </div>
              </aside>

              {/* Area Prodotti */}
              <div className="flex-1 min-h-screen" ref={productsRef}>
                {/* Header Prodotti */}
                <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <h2 className="text-2xl font-bold text-[#2D3748]">
                      {selectedCategory}
                    </h2>
                    <span className="text-gray-500">|</span>
                    <span className="text-gray-600 font-medium">{currentProducts.length} prodotti</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-[#2D3748] focus:outline-none focus:ring-2 focus:ring-[#FF6B35]">
                      <option value="popular">Più Popolari</option>
                      <option value="price-low">Prezzo: Basso a Alto</option>
                      <option value="price-high">Prezzo: Alto a Basso</option>
                    </select>

                    <div className="flex gap-2">
                      <button className="p-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        <ChevronLeft className="w-5 h-5 text-[#2D3748]" />
                      </button>
                      <button className="p-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        <ChevronRight className="w-5 h-5 text-[#2D3748]" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Griglia Prodotti */}
                {currentProducts.length === 0 ? (
                  <div className="text-center py-20">
                    <div className="text-6xl mb-4">😕</div>
                    <h3 className="text-xl font-semibold text-[#2D3748] mb-2">
                      Nessun prodotto trovato
                    </h3>
                    <p className="text-[#A0AEC0]">
                      Prova a modificare i filtri per vedere più prodotti
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {currentProducts.map((product, index) => (
                      <div
                        key={product.id}
                        className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 overflow-hidden group relative"
                        style={{ animationDelay: `${index * 50}ms` }}>
                        
                        {/* Area Immagine */}
                        <div className="aspect-square bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center relative p-1.5">
                          {product.animal === "cane" ? (
                            <Dog className="w-5 h-5 text-orange-300" />
                          ) : (
                            <Cat className="w-5 h-5 text-orange-300" />
                          )}
                          
                          {/* Badge in alto a sinistra */}
                          {product.badge && (
                            <span className="absolute top-0.5 left-0.5 bg-green-500 text-white text-[0.5625rem] px-1 py-0.5 rounded-full font-semibold">
                              {product.badge}
                            </span>
                          )}

                          {/* Cuore in alto a destra */}
                          <button className="absolute top-0.5 right-0.5 p-0.5 bg-white rounded-full shadow-sm hover:bg-red-50 transition-colors group/heart">
                            <Heart className="w-2.5 h-2.5 text-gray-400 group-hover/heart:text-red-500 transition-colors" />
                          </button>
                        </div>

                        {/* Contenuto Card */}
                        <div className="p-1.5 space-y-1">
                          <h3 className="text-xs font-bold text-[#2D3748] line-clamp-2 min-h-[2rem] leading-tight">
                            {product.name}
                          </h3>

                          {/* Tags */}
                          {product.tags && product.tags.length > 0 && (
                            <div className="flex flex-wrap gap-0.5">
                              {product.tags.slice(0, 2).map((tag, i) => (
                                <span
                                  key={i}
                                  className="text-[0.5625rem] bg-gray-100 text-gray-600 px-1 py-0.5 rounded">
                                  {tag}
                                </span>
                              ))}
                              {product.tags.length > 2 && (
                                <span className="text-[0.5625rem] bg-gray-100 text-gray-600 px-1 py-0.5 rounded">
                                  +{product.tags.length - 2}
                                </span>
                              )}
                            </div>
                          )}

                          {/* Prezzo e Azione */}
                          <div className="flex items-center justify-between pt-0.5">
                            <div className="text-lg font-bold text-[#FF6B35]">
                              €{product.price.toFixed(2)}
                            </div>
                            <button
                              onClick={() => addToCart(product)}
                              className="bg-[#FF6B35] hover:bg-[#E55A2B] text-white px-2 py-1 rounded text-[0.6875rem] font-semibold transition-all">
                              Aggiungi
                            </button>
                          </div>

                          {/* Dettagli in piccolo */}
                          <button 
                            onClick={() => router.push(`/prodotti/${product.id}`)}
                            className="w-full text-center text-[0.625rem] text-gray-500 hover:text-[#FF6B35] transition-colors pt-0.5 border-t border-gray-100">
                            Dettagli
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
      
      <FooterWithGrid />
    </>
  );
}