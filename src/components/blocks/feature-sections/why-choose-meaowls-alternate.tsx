"use client";

import React, { useState } from 'react';
import { Star, Heart, Clock, Shield, Palette, Zap, CheckCircle, Award, Users, TrendingUp, X, Dog, Cat, Calendar, Scale, AlertTriangle, FileText, Loader2, Check } from 'lucide-react';
import { useRouter } from 'next/navigation';

export const WhyChooseMeaowlsAlternate = () => {
  const router = useRouter();
  const [showPetModal, setShowPetModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [petData, setPetData] = useState({
    petName: '',
    petType: '',
    breed: '',
    age: '',
    weight: '',
    activityLevel: '',
    allergies: [] as string[],
    intolerances: [] as string[],
    sensitivities: '',
    clinicalHistory: [] as string[],
  });

  // Liste complete di allergie e intolleranze
  const commonAllergies = [
    "Pollo", "Manzo", "Maiale", "Pesce", "Uova", "Latticini", "Soia",
    "Grano", "Mais", "Riso", "Agnello", "Tacchino", "Patate", "Carote",
    "Acari della polvere", "Pollini", "Erba", "Pulci", "Profumi", "Conservanti"
  ];

  const commonIntolerances = [
    "Lattosio", "Glutine", "Proteine del latte", "Cereali", "Legumi",
    "Grassi animali", "Oli vegetali", "Coloranti artificiali", "Conservanti",
    "Aromi artificiali", "Dolcificanti", "Solfiti", "Istamina", "Salicilati"
  ];

  const clinicalProblems = {
    dogs: [
      "Displasia dell'anca", "Displasia del gomito", "Problemi cardiaci", "Epilessia",
      "Problemi agli occhi (cataratta, glaucoma)", "Problemi alla tiroide", "Diabete",
      "Problemi digestivi cronici", "Allergie cutanee", "Artrite", "Problemi dentali",
      "Problemi respiratori", "Obesità", "Problemi renali", "Tumori", "Otiti ricorrenti"
    ],
    cats: [
      "Malattie renali croniche", "Ipertiroidismo", "Diabete", "Problemi cardiaci",
      "Problemi urinari (calcoli, cistiti)", "Problemi dentali", "Artrite",
      "Problemi digestivi (IBD)", "Allergie alimentari", "Problemi cutanei",
      "Problemi respiratori (asma)", "Obesità", "Problemi agli occhi", "Tumori",
      "Stress/ansia", "Problemi comportamentali"
    ]
  };

  const handleInputChange = (field: string, value: string | string[]) => {
    setPetData(prev => ({ ...prev, [field]: value }));
    setError(null);
  };

  const toggleSelection = (item: string, items: string[], setItems: (items: string[]) => void) => {
    if (items.includes(item)) {
      setItems(items.filter(i => i !== item));
    } else {
      setItems([...items, item]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Prepare data for API
      const apiData = {
        petType: petData.petType,
        breed: petData.breed || 'Non specificato',
        weight: petData.weight || 'Non specificato',
        age: petData.age,
        movement: petData.activityLevel || 'Non specificato',
        allergies: petData.allergies,
        intolerances: petData.intolerances,
        sensitivities: petData.sensitivities || null,
        clinicalHistory: petData.clinicalHistory,
        photoUrl: null
      };

      // Call API to create pet profile
      const response = await fetch('/api/pets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(apiData)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Errore durante il salvataggio del profilo');
      }

      // Success - save pet name to localStorage and redirect
      localStorage.setItem('lastCreatedPetName', petData.petName);
      localStorage.setItem('lastCreatedPetId', result.id);
      
      setShowPetModal(false);
      
      // Redirect to pet profile page
      router.push('/il-mio-pet?tab=pets');
      
    } catch (err) {
      console.error('Error creating pet profile:', err);
      setError(err instanceof Error ? err.message : 'Errore durante il salvataggio');
    } finally {
      setIsLoading(false);
    }
  };

  const benefits = [
  {
    id: 1,
    title: "Prodotti Premium Selezionati",
    description: "Solo i migliori marchi del mercato",
    icon: Star,
    size: "large",
    gradient: "from-orange-50 to-amber-50"
  },
  {
    id: 2,
    title: "Consegna Rapida",
    description: "24-48h garantito",
    icon: Clock,
    size: "small",
    gradient: "from-amber-50 to-yellow-50"
  },
  {
    id: 3,
    title: "Personalizzazione Totale",
    description: "Ogni prodotto scelto specificamente per il tuo pet",
    icon: Palette,
    size: "medium",
    gradient: "from-orange-100 to-red-50"
  },
  {
    id: 4,
    title: "Supporto Esperto",
    description: "",
    icon: Heart,
    size: "small",
    gradient: "from-amber-100 to-orange-50"
  },
  {
    id: 5,
    title: "",
    description: "",
    icon: Shield,
    size: "medium",
    gradient: "from-orange-200 to-amber-100"
  },
  {
    id: 6,
    title: "Innovazione Continua",
    description: "Sempre al passo con le novità del settore",
    icon: Zap,
    size: "small",
    gradient: "from-yellow-100 to-orange-100"
  }];


  const stats = [
  { icon: Users, value: "50K+", label: "Pet Felici" },
  { icon: Award, value: "100+", label: "Prodotti Premium" },
  { icon: TrendingUp, value: "98%", label: "Soddisfazione" }];


  return (
    <>
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-br from-orange-25 via-white to-amber-25">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-orange-200 to-amber-200 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-br from-amber-200 to-orange-200 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-gradient-to-br from-orange-100 to-yellow-100 rounded-full blur-2xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Hero Section */}
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-100 to-amber-100 px-4 py-2 rounded-full">
                  <CheckCircle className="w-5 h-5 text-orange-600" />
                  <span className="text-orange-800 font-medium">La scelta migliore per il tuo pet</span>
                </div>
                
                <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight">
                  Perché scegliere{' '}
                  <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
                    Meaowls?
                  </span>
                </h2>
                
                <p className="text-xl text-gray-600 leading-relaxed">
                  Il primo servizio di abbonamento che mette davvero al centro il benessere dei tuoi animali domestici con un approccio completamente personalizzato e professionale.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => setShowPetModal(true)}
                  className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  Inizia Subito
                </button>
                <button className="border-2 border-orange-200 text-orange-600 px-8 py-4 rounded-xl font-semibold text-lg hover:border-orange-300 hover:bg-orange-50 transition-all duration-300">
                  Scopri di Più
                </button>
              </div>

              {/* Stats Section */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-orange-100">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <div key={index} className="text-center space-y-2">
                      <div className="inline-flex p-3 bg-gradient-to-br from-orange-100 to-amber-100 rounded-xl mb-2">
                        <Icon className="w-6 h-6 text-orange-600" />
                      </div>
                      <div className="space-y-1">
                        <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                        <div className="text-sm text-gray-600">{stat.label}</div>
                      </div>
                    </div>);
                })}
              </div>
            </div>

            {/* Right Complex Bento Grid */}
            <div className="grid grid-cols-3 gap-4 h-[600px]">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                let gridClass = "";

                switch (benefit.size) {
                  case "large":
                    gridClass = "col-span-2 row-span-2";
                    break;
                  case "medium":
                    gridClass = "col-span-2 row-span-1";
                    break;
                  case "small":
                    gridClass = "col-span-1 row-span-1";
                    break;
                }

                return (
                  <div
                    key={benefit.id}
                    className={`!w-48 !h-64 ${gridClass} bg-gradient-to-br ${benefit.gradient} p-6 rounded-2xl border border-orange-100 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.02] group cursor-pointer`}>

                    <div className="flex flex-col justify-center space-y-4 !w-[350px] !h-[206px]">
                      <div className="inline-flex p-3 bg-white/80 rounded-xl shadow-sm group-hover:bg-white transition-colors duration-300 w-fit">
                        <Icon className="w-6 h-6 text-orange-600 group-hover:text-orange-700 transition-colors duration-300" />
                      </div>
                      
                      <div className="space-y-2">
                        <h3 className="font-bold text-gray-900 group-hover:text-orange-700 transition-colors duration-300 text-lg !whitespace-pre-line">
                          {benefit.title}
                        </h3>
                        
                        <p className="text-gray-600 leading-relaxed !whitespace-pre-line !whitespace-pre-line !whitespace-pre-line">
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                  </div>);
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Pet Description Modal */}
      {showPetModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gradient-to-br from-orange-100 to-amber-100 rounded-xl">
                    <Heart className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Descrivi il Tuo Animale</h3>
                    <p className="text-gray-600">Aiutaci a personalizzare la sua alimentazione</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowPetModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-xl transition-colors duration-200"
                  disabled={isLoading}
                >
                  <X className="w-6 h-6 text-gray-500" />
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mx-6 mt-4 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-red-900">Errore</p>
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Pet Basic Info */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                    <FileText className="w-4 h-4 text-orange-600" />
                    <span>Nome del tuo Pet</span>
                  </label>
                  <input
                    type="text"
                    value={petData.petName}
                    onChange={(e) => handleInputChange('petName', e.target.value)}
                    placeholder="es. Max, Luna..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-200"
                    required
                    disabled={isLoading}
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                    <Dog className="w-4 h-4 text-orange-600" />
                    <span>Tipo di Animale *</span>
                  </label>
                  <select
                    value={petData.petType}
                    onChange={(e) => handleInputChange('petType', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-200"
                    required
                    disabled={isLoading}
                  >
                    <option value="">Seleziona...</option>
                    <option value="cane">🐕 Cane</option>
                    <option value="gatto">🐱 Gatto</option>
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                    <Star className="w-4 h-4 text-orange-600" />
                    <span>Razza</span>
                  </label>
                  <input
                    type="text"
                    value={petData.breed}
                    onChange={(e) => handleInputChange('breed', e.target.value)}
                    placeholder="es. Labrador, Persiano..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-200"
                    disabled={isLoading}
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                    <Calendar className="w-4 h-4 text-orange-600" />
                    <span>Età *</span>
                  </label>
                  <select
                    value={petData.age}
                    onChange={(e) => handleInputChange('age', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-200"
                    required
                    disabled={isLoading}
                  >
                    <option value="">Seleziona età...</option>
                    <option value="Cucciolo (0-1 anno)">Cucciolo (0-1 anno)</option>
                    <option value="Giovane (1-3 anni)">Giovane (1-3 anni)</option>
                    <option value="Adulto (3-7 anni)">Adulto (3-7 anni)</option>
                    <option value="Senior (7+ anni)">Senior (7+ anni)</option>
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                    <Scale className="w-4 h-4 text-orange-600" />
                    <span>Peso</span>
                  </label>
                  <input
                    type="text"
                    value={petData.weight}
                    onChange={(e) => handleInputChange('weight', e.target.value)}
                    placeholder="es. 25 kg"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-200"
                    disabled={isLoading}
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                    <Zap className="w-4 h-4 text-orange-600" />
                    <span>Livello di Attività</span>
                  </label>
                  <select
                    value={petData.activityLevel}
                    onChange={(e) => handleInputChange('activityLevel', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-200"
                    disabled={isLoading}
                  >
                    <option value="">Seleziona...</option>
                    <option value="Basso - Poco esercizio">Basso - Poco esercizio</option>
                    <option value="Moderato - Passeggiate regolari">Moderato - Passeggiate regolari</option>
                    <option value="Alto - Molto attivo">Alto - Molto attivo</option>
                  </select>
                </div>
              </div>

              {/* Health & Diet Info */}
              <div className="space-y-6">
                {/* Allergie con selezione multipla */}
                <div className="space-y-3">
                  <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                    <AlertTriangle className="w-4 h-4 text-orange-600" />
                    <span>Allergie (seleziona tutte quelle applicabili)</span>
                  </label>
                  <div className="border border-gray-300 rounded-xl p-4 bg-gray-50">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {commonAllergies.map((allergy) => (
                        <button
                          key={allergy}
                          type="button"
                          onClick={() => toggleSelection(allergy, petData.allergies, (items) => handleInputChange('allergies', items))}
                          disabled={isLoading}
                          className={`text-left p-3 rounded-lg border-2 transition-all ${
                            petData.allergies.includes(allergy)
                              ? 'bg-red-500 text-white border-red-500'
                              : 'bg-white text-gray-700 border-gray-200 hover:border-red-300'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-sm">{allergy}</span>
                            {petData.allergies.includes(allergy) && (
                              <Check className="w-4 h-4" />
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                    <p className="text-sm text-gray-600 mt-3">
                      Selezionate: {petData.allergies.length}
                    </p>
                  </div>
                </div>

                {/* Intolleranze con selezione multipla */}
                <div className="space-y-3">
                  <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                    <Shield className="w-4 h-4 text-orange-600" />
                    <span>Intolleranze (seleziona tutte quelle applicabili)</span>
                  </label>
                  <div className="border border-gray-300 rounded-xl p-4 bg-gray-50">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {commonIntolerances.map((intolerance) => (
                        <button
                          key={intolerance}
                          type="button"
                          onClick={() => toggleSelection(intolerance, petData.intolerances, (items) => handleInputChange('intolerances', items))}
                          disabled={isLoading}
                          className={`text-left p-3 rounded-lg border-2 transition-all ${
                            petData.intolerances.includes(intolerance)
                              ? 'bg-amber-500 text-white border-amber-500'
                              : 'bg-white text-gray-700 border-gray-200 hover:border-amber-300'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-sm">{intolerance}</span>
                            {petData.intolerances.includes(intolerance) && (
                              <Check className="w-4 h-4" />
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                    <p className="text-sm text-gray-600 mt-3">
                      Selezionate: {petData.intolerances.length}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                    <Heart className="w-4 h-4 text-orange-600" />
                    <span>Sensibilità Particolari</span>
                  </label>
                  <textarea
                    value={petData.sensitivities}
                    onChange={(e) => handleInputChange('sensitivities', e.target.value)}
                    placeholder="es. Problemi digestivi con cibi grassi, preferisce crocchette di taglia media..."
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-200 resize-none"
                    disabled={isLoading}
                  />
                </div>

                {/* Storia Clinica con selezione multipla */}
                <div className="space-y-3">
                  <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                    <FileText className="w-4 h-4 text-orange-600" />
                    <span>Storia Clinica (seleziona tutti i problemi di salute)</span>
                  </label>
                  <div className="border border-gray-300 rounded-xl p-4 bg-gray-50">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {(petData.petType === 'cane' ? clinicalProblems.dogs : petData.petType === 'gatto' ? clinicalProblems.cats : []).map((problem) => (
                        <button
                          key={problem}
                          type="button"
                          onClick={() => toggleSelection(problem, petData.clinicalHistory, (items) => handleInputChange('clinicalHistory', items))}
                          disabled={isLoading}
                          className={`text-left p-3 rounded-lg border-2 transition-all ${
                            petData.clinicalHistory.includes(problem)
                              ? 'bg-teal-500 text-white border-teal-500'
                              : 'bg-white text-gray-700 border-gray-200 hover:border-teal-300'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-sm">{problem}</span>
                            {petData.clinicalHistory.includes(problem) && (
                              <Check className="w-4 h-4" />
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                    {petData.petType && (
                      <p className="text-sm text-gray-600 mt-3">
                        Selezionati: {petData.clinicalHistory.length}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 bg-gradient-to-r from-orange-500 to-amber-500 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Salvataggio in corso...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      <span>Crea il Profilo del Mio Pet</span>
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setShowPetModal(false)}
                  disabled={isLoading}
                  className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold text-lg hover:border-gray-400 hover:bg-gray-50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Annulla
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};