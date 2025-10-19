"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Dog, Cat, Calendar, Clock, Package, Truck, ArrowLeft, Check } from "lucide-react";
import { FooterWithGrid } from "@/components/blocks/footers/footer-with-grid";

interface CartItem {
  id: string;
  name: string;
  price: number;
  weight: string;
  animal: string;
  quantity: number;
}

export default function AbbonamentoPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedFrequency, setSelectedFrequency] = useState<number>(2);
  const [selectedDay, setSelectedDay] = useState<string>("Lunedì");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("mattina");

  const SHIPPING_COST = 5.99;

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

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

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const total = subtotal + SHIPPING_COST;

  const handleConfirm = () => {
    // Save subscription to localStorage
    const subscription = {
      id: `sub_${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'active',
      products: cartItems,
      frequency: selectedFrequency,
      frequencyLabel: frequencyOptions.find(o => o.value === selectedFrequency)?.label,
      deliveryDay: selectedDay,
      deliveryTime: selectedTimeSlot,
      deliveryTimeLabel: timeSlotOptions.find(o => o.value === selectedTimeSlot)?.label,
      subtotal,
      shippingCost: SHIPPING_COST,
      total,
      nextDelivery: calculateNextDelivery(selectedDay, selectedFrequency)
    };
    
    localStorage.setItem('activeSubscription', JSON.stringify(subscription));
    localStorage.removeItem('cart');
    
    // Redirect to My Pet page with subscriptions tab active
    router.push('/il-mio-pet?tab=abbonamenti');
  };

  const calculateNextDelivery = (day: string, weeksFrequency: number) => {
    const daysMap: { [key: string]: number } = {
      'Lunedì': 1, 'Martedì': 2, 'Mercoledì': 3, 
      'Giovedì': 4, 'Venerdì': 5, 'Sabato': 6, 'Domenica': 0
    };
    
    const today = new Date();
    const targetDay = daysMap[day];
    const currentDay = today.getDay();
    
    let daysUntilNext = (targetDay - currentDay + 7) % 7;
    if (daysUntilNext === 0) daysUntilNext = 7;
    
    const nextDate = new Date(today);
    nextDate.setDate(today.getDate() + daysUntilNext + (weeksFrequency - 1) * 7);
    
    return nextDate.toISOString();
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <Package className="w-24 h-24 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-[#2D3748] mb-2">Nessun prodotto nel carrello</h2>
          <p className="text-gray-500 mb-6">Aggiungi prodotti al carrello per creare un abbonamento</p>
          <button
            onClick={() => router.push("/prodotti")}
            className="bg-[#FF6B35] hover:bg-[#E55A2B] text-white px-6 py-3 rounded-lg font-semibold transition-all">
            Vai ai Prodotti
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-orange-50">
        <section className="py-16 md:py-24">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Back Button */}
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-[#2D3748] hover:text-[#FF6B35] transition-colors mb-6">
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Torna al Carrello</span>
            </button>

            {/* Hero */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-[#2D3748] mb-4 font-inter">
                Crea il Tuo Abbonamento
              </h1>
              <p className="text-lg text-gray-600">
                Ricevi i tuoi prodotti preferiti con la frequenza che desideri
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Left Column - Prodotti */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-6">
                
                {/* Prodotti nel Carrello */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                  <h2 className="text-xl font-bold text-[#2D3748] mb-4 flex items-center gap-2">
                    <Package className="w-5 h-5 text-[#FF6B35]" />
                    I Tuoi Prodotti
                  </h2>
                  
                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex gap-4 p-4 bg-gray-50 rounded-xl">
                        
                        {/* Immagine */}
                        <div className="w-16 h-16 flex-shrink-0 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg flex items-center justify-center">
                          {item.animal === "cane" ? (
                            <Dog className="w-8 h-8 text-orange-400" />
                          ) : (
                            <Cat className="w-8 h-8 text-orange-400" />
                          )}
                        </div>

                        {/* Info */}
                        <div className="flex-1">
                          <h3 className="font-semibold text-sm text-[#2D3748] line-clamp-2">
                            {item.name}
                          </h3>
                          <p className="text-xs text-gray-500 mt-1">{item.weight}</p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs text-gray-600">
                              Quantità: {item.quantity}
                            </span>
                            <span className="font-bold text-[#FF6B35]">
                              €{(item.price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Riepilogo Costi */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                  <h2 className="text-xl font-bold text-[#2D3748] mb-4 flex items-center gap-2">
                    <Truck className="w-5 h-5 text-[#FF6B35]" />
                    Riepilogo Costi
                  </h2>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between text-[#2D3748]">
                      <span>Subtotale Prodotti:</span>
                      <span className="font-semibold">€{subtotal.toFixed(2)}</span>
                    </div>
                    
                    <div className="flex justify-between text-[#2D3748]">
                      <span>Spedizione:</span>
                      <span className="font-semibold">€{SHIPPING_COST.toFixed(2)}</span>
                    </div>
                    
                    <div className="border-t border-gray-200 pt-3 flex justify-between items-center">
                      <span className="text-lg font-bold text-[#2D3748]">Totale Abbonamento:</span>
                      <span className="text-2xl font-bold text-[#FF6B35]">
                        €{total.toFixed(2)}
                      </span>
                    </div>
                    
                    <div className="bg-orange-50 rounded-lg p-3 mt-3">
                      <p className="text-sm text-[#2D3748]">
                        <strong>Nota:</strong> Questo importo verrà addebitato{" "}
                        {frequencyOptions.find(o => o.value === selectedFrequency)?.label.toLowerCase()}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Right Column - Personalizzazione */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="space-y-6">
                
                {/* Frequenza */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-bold text-[#2D3748] mb-4 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-[#FF6B35]" />
                    Frequenza di Consegna
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-3">
                    {frequencyOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setSelectedFrequency(option.value)}
                        className={`p-4 rounded-xl border-2 transition-all font-semibold text-sm relative ${
                          selectedFrequency === option.value
                            ? "border-[#FF6B35] bg-orange-50 text-[#FF6B35]"
                            : "border-gray-200 bg-white text-[#2D3748] hover:border-gray-300"
                        }`}>
                        {option.label}
                        {selectedFrequency === option.value && (
                          <Check className="w-5 h-5 absolute top-2 right-2 text-[#FF6B35]" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Giorno della Settimana */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-bold text-[#2D3748] mb-4 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-[#FF6B35]" />
                    Giorno di Consegna
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-2">
                    {dayOptions.map((day) => (
                      <button
                        key={day}
                        onClick={() => setSelectedDay(day)}
                        className={`p-3 rounded-lg border-2 transition-all font-medium text-sm relative ${
                          selectedDay === day
                            ? "border-[#FF6B35] bg-orange-50 text-[#FF6B35]"
                            : "border-gray-200 bg-white text-[#2D3748] hover:border-gray-300"
                        }`}>
                        {day}
                        {selectedDay === day && (
                          <Check className="w-4 h-4 absolute top-1 right-1 text-[#FF6B35]" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Fascia Oraria */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-bold text-[#2D3748] mb-4 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-[#FF6B35]" />
                    Fascia Oraria
                  </h3>
                  
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
                          <div className="w-6 h-6 rounded-full bg-[#FF6B35] flex items-center justify-center">
                            <Check className="w-4 h-4 text-white" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Riepilogo Selezione */}
                <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl border-2 border-[#FF6B35] p-6">
                  <h3 className="font-bold text-[#2D3748] mb-4 text-lg">📦 Il Tuo Abbonamento</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">Frequenza:</span>
                      <span className="font-bold text-[#FF6B35]">
                        {frequencyOptions.find(o => o.value === selectedFrequency)?.label}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">Giorno:</span>
                      <span className="font-bold text-[#FF6B35]">{selectedDay}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">Orario:</span>
                      <span className="font-bold text-[#FF6B35]">
                        {timeSlotOptions.find(o => o.value === selectedTimeSlot)?.label}
                      </span>
                    </div>
                    <div className="border-t border-orange-200 pt-3 flex items-center justify-between">
                      <span className="text-gray-700 font-semibold">Costo per consegna:</span>
                      <span className="text-2xl font-bold text-[#FF6B35]">
                        €{total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Conferma Button */}
                <button
                  onClick={handleConfirm}
                  className="w-full bg-[#FF6B35] hover:bg-[#E55A2B] text-white py-5 rounded-2xl font-bold text-lg transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
                  <Check className="w-6 h-6" />
                  Conferma Abbonamento
                </button>

                <p className="text-center text-xs text-gray-500">
                  Cliccando su "Conferma Abbonamento" accetti i nostri termini e condizioni
                </p>
              </motion.div>
            </div>
          </div>
        </section>
      </div>

      <FooterWithGrid />
    </>
  );
}