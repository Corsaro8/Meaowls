"use client";

import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Dog, Cat, Star, ShoppingBag, Package, Heart, ArrowLeft,
  CheckCircle, AlertTriangle, Info, Utensils, Scale, Calendar,
  Award, Shield, Leaf, Clock, ChevronRight } from
"lucide-react";
import { FooterWithGrid } from "@/components/blocks/footers/footer-with-grid";
import { useState } from "react";

// Descrizioni marche
const brandDescriptions: Record<string, string> = {
  "Almo Nature": "Almo Nature è un brand pioniere nel settore del pet food naturale. Fondata in Italia, l'azienda si distingue per l'utilizzo di ingredienti 100% naturali, carni fresche e pesce di alta qualità. Ogni ricetta è formulata senza conservanti artificiali, coloranti o aromi chimici, garantendo un'alimentazione sana e bilanciata per cani e gatti.",
  "Monge": "Monge è un'azienda italiana con oltre 50 anni di esperienza nella produzione di alimenti per animali domestici. Il brand combina tradizione e innovazione, utilizzando solo materie prime selezionate e controllate. Tutti i prodotti sono formulati con il supporto di veterinari e nutrizionisti per garantire il massimo benessere dei pet.",
  "Briantos": "Briantos è un marchio tedesco che si distingue per l'eccellente rapporto qualità-prezzo. Produce cibo per cani e gatti con ingredienti di alta qualità, formule bilanciate e senza l'aggiunta di coloranti, aromi o conservanti artificiali. Ideale per chi cerca un'alimentazione premium accessibile.",
  "Royal Canin": "Royal Canin è leader mondiale nella nutrizione per cani e gatti. Con oltre 50 anni di ricerca scientifica, sviluppa alimenti specifici per razza, età e condizioni di salute. Ogni prodotto è il risultato di studi approfonditi condotti da veterinari e nutrizionisti per soddisfare le esigenze nutrizionali specifiche di ogni animale.",
  "Altro": "Marchi selezionati che offrono prodotti di qualità per il benessere del tuo animale domestico. Tutti i prodotti sono testati e approvati da esperti veterinari."
};

// Prodotti per cani
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
  "Sistema immunitario rafforzato"],

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
  "Facile digeribilità"],

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
  "Made in Italy con controlli rigorosi"],

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
  "Antiossidanti naturali"],

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
{ id: "d14", name: "Corda per Tiro", price: 9.99, weight: "1pc", rating: 4.5, category: "Giochi", animal: "cane", age: "giovane", brand: "Altro", breed: "Jack Russell", intolerances: [], tags: ["Cotone naturale", "Pulisce denti"], ingredients: "Cotone naturale 100%, nodi resistenti.", benefits: ["Pulisce denti e gengive", "Rinforza il legame cane-padrone", "Cotone naturale e sicuro", "Ideale per masticazione"], contraindications: "Controllare regolarmente l'integrità. Sostituire se sfilacciata.", usage: "Giochi di tiro controllati. Non lasciare incustodito con il cane." }];


// Prodotti per gatti
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
  "Sapore naturale irresistibile"],

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
  "Facile digeribilità"],

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
  "Salute urinaria"],

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
  "Facile digeribilità"],

  contraindications: "Adatto anche a gatti con intolleranze alimentari. Transizione graduale consigliata.",
  usage: "3kg: 40-50g | 4kg: 50-60g | 5kg: 60-70g | 6kg: 70-80g al giorno."
},
{ id: "c5", name: "Kitten Mousse Salmone", price: 2.49, weight: "85g", rating: 4.8, category: "Cibo Umido", animal: "gatto", age: "cucciolo", brand: "Monge", breed: "Persiano", intolerances: [], tags: ["Cuccioli 0-12 mesi", "DHA"], ingredients: "Salmone, DHA, taurina, vitamine.", benefits: ["DHA per sviluppo cerebrale", "Texture morbida", "Nutrizione completa per cuccioli"], contraindications: "Solo per gattini fino a 12 mesi.", usage: "2-3 vaschette al giorno per gattino di 2-3 mesi." },
{ id: "c6", name: "Snack Dental Care", price: 4.99, weight: "50g", rating: 4.4, category: "Snack", animal: "gatto", age: "giovane", brand: "Altro", breed: "Ragdoll", intolerances: [], tags: ["Igiene orale", "Croccanti"], ingredients: "Cereali, pollo, minerali, estratti vegetali.", benefits: ["Riduce placca", "Rinfresca alito", "Croccantezza dentale"], contraindications: "Max 10 pezzi al giorno.", usage: "Come snack tra i pasti." },
{ id: "c7", name: "Crunchy Snack Pollo", price: 2.50, weight: "80g", rating: 4.5, category: "Snack", animal: "gatto", age: "giovane", brand: "Monge", breed: "Siamese", intolerances: [], tags: ["Pollo 90%", "Snack naturale"], ingredients: "Pollo 90%, minerali, taurina.", benefits: ["Alto contenuto proteico", "Senza additivi", "Taurina essenziale"], contraindications: "Non sostituisce pasto completo.", usage: "5-10 pezzi al giorno come premio." },
{ id: "c8", name: "Integratore Hairball", price: 14.99, weight: "100g pasta", rating: 4.7, category: "Integratori", animal: "gatto", age: "adulto", brand: "Altro", breed: "Persiano", intolerances: [], tags: ["Previene boli di pelo", "Gusto malto"], ingredients: "Malto, oli vegetali, fibre, lecitina.", benefits: ["Facilita espulsione pelo", "Previene occlusioni", "Gusto appetibile"], contraindications: "In caso di occlusioni gravi, consultare veterinario.", usage: "3-5cm di pasta al giorno, anche mescolata al cibo." },
{ id: "c9", name: "Vitamine Complete", price: 18.99, weight: "60 compresse", rating: 4.6, category: "Integratori", animal: "gatto", age: "adulto", brand: "Altro", breed: "Maine Coon", intolerances: [], tags: ["Sistema immunitario", "Taurina"], ingredients: "Taurina, vitamine A, D, E, B-complex, minerali.", benefits: ["Supporto immunitario", "Taurina per cuore e vista", "Energia e vitalità"], contraindications: "Non superare le dosi consigliate.", usage: "1 compressa al giorno durante i pasti." },
{ id: "c10", name: "Palla Interactive Puzzle", price: 9.99, weight: "1pc", rating: 4.3, category: "Giochi", animal: "gatto", age: "giovane", brand: "Altro", breed: "Bengala", intolerances: [], tags: ["Stimolazione mentale", "Distributore snack"], ingredients: "Plastica atossica certificata.", benefits: ["Stimolazione mentale", "Combatte noia", "Rallenta alimentazione"], contraindications: "Pulire regolarmente.", usage: "Riempire con crocchette o snack. Lasciare giocare sotto supervisione." },
{ id: "c11", name: "Toy Mouse with Catnip", price: 3.99, weight: "1pc", rating: 4.6, badge: "Novità", category: "Giochi", animal: "gatto", age: "giovane", brand: "Altro", breed: "Abissino", intolerances: [], tags: ["Con catnip", "Peluche morbido"], ingredients: "Tessuto morbido, imbottitura, catnip naturale.", benefits: ["Stimola istinto caccia", "Catnip rilassante", "Morbido e sicuro"], contraindications: "Controllare stato del gioco. Sostituire se danneggiato.", usage: "Gioco libero. Il catnip perde effetto dopo 10-15 minuti." }];


const allProducts = [...dogProducts, ...catProducts];

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [showAddedToCart, setShowAddedToCart] = useState(false);
  const [activeTab, setActiveTab] = useState<"ingredienti" | "benefici" | "uso" | "avvertenze">("ingredienti");

  const productId = params.id as string;
  const product = allProducts.find((p) => p.id === productId);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-orange-50 via-white to-orange-50">
        <div className="text-center">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-2xl font-bold text-[#2D3748] mb-4">Prodotto non trovato</h2>
          <button
            onClick={() => router.push("/prodotti")}
            className="px-6 py-3 bg-[#FF6B35] hover:bg-[#E55A2B] text-white rounded-xl font-semibold transition-all">
            Torna ai Prodotti
          </button>
        </div>
      </div>);

  }

  const brandDescription = brandDescriptions[product.brand] || brandDescriptions["Altro"];

  const handleAddToCart = () => {
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      weight: product.weight,
      animal: product.animal,
      quantity: quantity
    };

    const existingCart = localStorage.getItem("cart");
    let cart = existingCart ? JSON.parse(existingCart) : [];

    const existingItemIndex = cart.findIndex((item: any) => item.id === product.id);

    if (existingItemIndex !== -1) {
      cart[existingItemIndex].quantity += quantity;
    } else {
      cart.push(cartItem);
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    setShowAddedToCart(true);
    setTimeout(() => setShowAddedToCart(false), 3000);
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-orange-50">
        {/* Notification quando aggiunto al carrello */}
        {showAddedToCart &&
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="fixed top-24 right-6 z-50 bg-green-500 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3">
            <CheckCircle className="w-6 h-6" />
            <span className="font-semibold">Aggiunto al carrello!</span>
          </motion.div>
        }

        <section className="relative py-8">
          <div className="max-w-7xl mx-auto px-4">
            {/* Breadcrumb */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 text-sm text-gray-600 mb-6">
              <button
                onClick={() => router.push("/")}
                className="hover:text-[#FF6B35] transition-colors">
                Home
              </button>
              <ChevronRight className="w-4 h-4" />
              <button
                onClick={() => router.push("/prodotti")}
                className="hover:text-[#FF6B35] transition-colors">
                Prodotti
              </button>
              <ChevronRight className="w-4 h-4" />
              <span className="text-[#2D3748] font-medium truncate">{product.name}</span>
            </motion.div>

            {/* Back Button */}
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={() => router.back()}
              className="flex items-center gap-2 text-[#FF6B35] hover:text-[#E55A2B] font-semibold mb-6 transition-colors">
              <ArrowLeft className="w-5 h-5" />
              Torna ai Prodotti
            </motion.button>

            {/* Layout principale: Foto + Titolo/Carrello affiancati */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Colonna Sinistra - Immagine Prodotto */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}>
                
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                  {/* Immagine principale */}
                  <div className="aspect-square bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center relative p-12">
                    {product.animal === "cane" ?
                    <Dog className="w-48 h-48 text-orange-300" /> :

                    <Cat className="w-48 h-48 text-orange-300" />
                    }

                    {/* Badge */}
                    {product.badge &&
                    <span className="absolute top-4 left-4 bg-green-500 text-white text-xs px-3 py-1.5 rounded-full font-semibold shadow-lg">
                        {product.badge}
                      </span>
                    }

                    {/* Wishlist */}
                    <button className="absolute top-4 right-4 p-3 bg-white rounded-full shadow-lg hover:bg-red-50 transition-colors group">
                      <Heart className="w-6 h-6 text-gray-400 group-hover:text-red-500 transition-colors" />
                    </button>
                  </div>

                  {/* Info rapide sotto l'immagine */}
                  <div className="p-6 bg-gray-50 border-t border-gray-200">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="flex items-center justify-center mb-2">
                          <Scale className="w-5 h-5 text-[#FF6B35]" />
                        </div>
                        <div className="text-sm font-semibold text-[#2D3748]">{product.weight}</div>
                        <div className="text-xs text-gray-500">Peso</div>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center mb-2">
                          <Calendar className="w-5 h-5 text-[#FF6B35]" />
                        </div>
                        <div className="text-sm font-semibold text-[#2D3748] capitalize">{product.age || "Tutti"}</div>
                        <div className="text-xs text-gray-500">Età</div>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center mb-2">
                          <Award className="w-5 h-5 text-[#FF6B35]" />
                        </div>
                        <div className="flex items-center justify-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-semibold text-[#2D3748]">{product.rating}</span>
                        </div>
                        <div className="text-xs text-gray-500">Rating</div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Colonna Destra - Titolo e Pulsante Aggiungi al Carrello */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="flex flex-col justify-between">
                
                {/* Header Prodotto */}
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    {product.animal === "cane" ?
                    <div className="p-2 bg-orange-100 rounded-lg">
                        <Dog className="w-6 h-6 text-[#FF6B35]" />
                      </div> :

                    <div className="p-2 bg-orange-100 rounded-lg">
                        <Cat className="w-6 h-6 text-[#FF6B35]" />
                      </div>
                    }
                    <span className="text-sm font-semibold text-gray-600 capitalize">
                      {product.category} per {product.animal}
                    </span>
                  </div>

                  <h1 className="text-3xl lg:text-4xl font-bold text-[#2D3748] mb-4 leading-tight">
                    {product.name}
                  </h1>

                  {/* Tags */}
                  {product.tags && product.tags.length > 0 &&
                  <div className="flex flex-wrap gap-2 mb-4">
                      {product.tags.map((tag, index) =>
                    <span
                      key={index}
                      className="px-3 py-1 bg-orange-50 text-[#FF6B35] text-xs font-semibold rounded-full border border-orange-200">
                          {tag}
                        </span>
                    )}
                    </div>
                  }

                  {/* Rating */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) =>
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                        i < Math.floor(product.rating) ?
                        "fill-yellow-400 text-yellow-400" :
                        "text-gray-300"}`
                        } />

                      )}
                    </div>
                    <span className="text-sm font-semibold text-[#2D3748]">
                      {product.rating} / 5.0
                    </span>
                  </div>

                  {/* Prezzo */}
                  <div className="flex items-baseline gap-3 mb-6">
                    <div className="text-4xl font-bold text-[#FF6B35]">
                      €{product.price.toFixed(2)}
                    </div>
                    <div className="text-gray-500 text-sm">
                      IVA inclusa
                    </div>
                  </div>
                </div>

                {/* Quantity & Add to Cart - nella parte inferiore */}
                <div>
                  <div className="flex items-center gap-4 mb-6 !w-0 !h-0">
                    <div className="flex items-center gap-3 bg-gray-100 rounded-xl p-2">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-10 h-10 flex items-center justify-center bg-white rounded-lg hover:bg-gray-50 transition-colors">
                        <span className="text-xl font-bold text-[#2D3748]">-</span>
                      </button>
                      <span className="text-lg font-bold text-[#2D3748] w-12 text-center">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-10 h-10 flex items-center justify-center bg-white rounded-lg hover:bg-gray-50 transition-colors">
                        <span className="text-xl font-bold text-[#2D3748]">+</span>
                      </button>
                    </div>

                    <button
                      onClick={handleAddToCart}
                      className="flex-1 bg-[#FF6B35] hover:bg-[#E55A2B] text-white py-4 px-8 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-3">
                      <ShoppingBag className="w-6 h-6" />
                      Aggiungi al Carrello
                    </button>
                  </div>

                  {/* Trust Badges */}
                  <div className="grid grid-cols-3 gap-4 p-4 bg-green-50 rounded-xl border border-green-200">
                    <div className="text-center">
                      <Shield className="w-6 h-6 text-green-600 mx-auto mb-1" />
                      <div className="text-xs font-semibold text-green-700">Garanzia</div>
                    </div>
                    <div className="text-center">
                      <Package className="w-6 h-6 text-green-600 mx-auto mb-1" />
                      <div className="text-xs font-semibold text-green-700">Spedizione Gratuita</div>
                    </div>
                    <div className="text-center">
                      <Clock className="w-6 h-6 text-green-600 mx-auto mb-1" />
                      <div className="text-xs font-semibold text-green-700">Consegna Rapida</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Descrizione Brand */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-8">
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl border border-orange-200 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-white rounded-lg shadow-sm">
                    <Leaf className="w-5 h-5 text-[#FF6B35]" />
                  </div>
                  <h2 className="text-xl font-bold text-[#2D3748]">Il Brand: {product.brand}</h2>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  {brandDescription}
                </p>
              </div>
            </motion.div>

            {/* Tab System per Informazioni Dettagliate */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              
              {/* Tab Headers */}
              <div className="flex border-b border-gray-200 overflow-x-auto">
                <button
                  onClick={() => setActiveTab("ingredienti")}
                  className={`flex-1 min-w-[140px] px-6 py-4 font-semibold text-sm transition-all flex items-center justify-center gap-2 ${
                  activeTab === "ingredienti" ?
                  "bg-[#FF6B35] text-white" :
                  "bg-white text-gray-600 hover:bg-gray-50"}`
                  }>
                  <Utensils className="w-4 h-4" />
                  Ingredienti
                </button>
                <button
                  onClick={() => setActiveTab("benefici")}
                  className={`flex-1 min-w-[140px] px-6 py-4 font-semibold text-sm transition-all flex items-center justify-center gap-2 ${
                  activeTab === "benefici" ?
                  "bg-[#FF6B35] text-white" :
                  "bg-white text-gray-600 hover:bg-gray-50"}`
                  }>
                  <CheckCircle className="w-4 h-4" />
                  Benefici
                </button>
                <button
                  onClick={() => setActiveTab("uso")}
                  className={`flex-1 min-w-[140px] px-6 py-4 font-semibold text-sm transition-all flex items-center justify-center gap-2 ${
                  activeTab === "uso" ?
                  "bg-[#FF6B35] text-white" :
                  "bg-white text-gray-600 hover:bg-gray-50"}`
                  }>
                  <Info className="w-4 h-4" />
                  Modalità d'Uso
                </button>
                <button
                  onClick={() => setActiveTab("avvertenze")}
                  className={`flex-1 min-w-[140px] px-6 py-4 font-semibold text-sm transition-all flex items-center justify-center gap-2 ${
                  activeTab === "avvertenze" ?
                  "bg-[#FF6B35] text-white" :
                  "bg-white text-gray-600 hover:bg-gray-50"}`
                  }>
                  <AlertTriangle className="w-4 h-4" />
                  Avvertenze
                </button>
              </div>

              {/* Tab Content */}
              <div className="p-8">
                {activeTab === "ingredienti" && product.ingredients &&
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}>
                    <h3 className="text-2xl font-bold text-[#2D3748] mb-4 flex items-center gap-3">
                      <Utensils className="w-6 h-6 text-[#FF6B35]" />
                      Composizione Ingredienti
                    </h3>
                    <p className="text-gray-700 leading-relaxed text-lg">
                      {product.ingredients}
                    </p>
                  </motion.div>
                }

                {activeTab === "benefici" && product.benefits && product.benefits.length > 0 &&
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}>
                    <h3 className="text-2xl font-bold text-[#2D3748] mb-6 flex items-center gap-3">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                      Benefici Principali
                    </h3>
                    <ul className="space-y-4">
                      {product.benefits.map((benefit, index) =>
                    <li key={index} className="flex items-start gap-4">
                          <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mt-1">
                            <CheckCircle className="w-5 h-5 text-green-600" />
                          </div>
                          <span className="text-gray-700 leading-relaxed text-lg flex-1">{benefit}</span>
                        </li>
                    )}
                    </ul>
                  </motion.div>
                }

                {activeTab === "uso" && product.usage &&
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}>
                    <h3 className="text-2xl font-bold text-[#2D3748] mb-4 flex items-center gap-3">
                      <Info className="w-6 h-6 text-blue-600" />
                      Come Utilizzare il Prodotto
                    </h3>
                    <p className="text-gray-700 leading-relaxed text-lg">
                      {product.usage}
                    </p>
                  </motion.div>
                }

                {activeTab === "avvertenze" && product.contraindications &&
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}>
                    <h3 className="text-2xl font-bold text-[#2D3748] mb-4 flex items-center gap-3">
                      <AlertTriangle className="w-6 h-6 text-yellow-600" />
                      Avvertenze e Controindicazioni
                    </h3>
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                      <p className="text-gray-700 leading-relaxed text-lg">
                        {product.contraindications}
                      </p>
                    </div>
                  </motion.div>
                }
              </div>
            </motion.div>

            {/* Info Aggiuntive */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-[#2D3748] mb-4">Informazioni Prodotto</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-500 mb-1">Categoria</div>
                  <div className="font-semibold text-[#2D3748]">{product.category}</div>
                </div>
                {product.breed &&
                <div>
                    <div className="text-sm text-gray-500 mb-1">Razza Consigliata</div>
                    <div className="font-semibold text-[#2D3748]">{product.breed}</div>
                  </div>
                }
                {product.age &&
                <div>
                    <div className="text-sm text-gray-500 mb-1">Età</div>
                    <div className="font-semibold text-[#2D3748] capitalize">{product.age}</div>
                  </div>
                }
                <div>
                  <div className="text-sm text-gray-500 mb-1">Brand</div>
                  <div className="font-semibold text-[#2D3748]">{product.brand}</div>
                </div>
              </div>

              {product.intolerances && product.intolerances.length > 0 &&
              <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="text-sm text-gray-500 mb-2">Non contiene:</div>
                  <div className="flex flex-wrap gap-2">
                    {product.intolerances.map((intol, index) =>
                  <span
                    key={index}
                    className="px-3 py-1 bg-red-50 text-red-700 text-xs font-semibold rounded-full border border-red-200">
                        {intol}
                      </span>
                  )}
                  </div>
                </div>
              }
            </motion.div>
          </div>
        </section>
      </div>

      <FooterWithGrid />
    </>);

}