"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Package, Heart, Check, X, ChevronRight, ChevronLeft, Search, Loader2, AlertTriangle } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';

export const PetFoodOptions = () => {
  const router = useRouter();
  const [selectedAllergies, setSelectedAllergies] = useState<string[]>([]);
  const [selectedIntolerances, setSelectedIntolerances] = useState<string[]>([]);
  const [sensitivitiesText, setSensitivitiesText] = useState('');
  const [selectedClinicalHistory, setSelectedClinicalHistory] = useState<string[]>([]);
  const [petName, setPetName] = useState('');
  const [selectedBreed, setSelectedBreed] = useState<string>('');
  const [selectedWeight, setSelectedWeight] = useState<string>('');
  const [selectedAge, setSelectedAge] = useState<string>('');
  const [selectedMovement, setSelectedMovement] = useState<string>('');
  const [breedSearchTerm, setBreedSearchTerm] = useState('');
  const [showProfileForm, setShowProfileForm] = useState(false);
  const [petType, setPetType] = useState<'cane' | 'gatto' | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [showBreedSuggestions, setShowBreedSuggestions] = useState(false);
  const [showSensitivitySuggestions, setShowSensitivitySuggestions] = useState(false);
  const [showWeightSuggestions, setShowWeightSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const dogBreeds = [
    'Labrador Retriever', 'Golden Retriever', 'Pastore Tedesco', 'Bulldog', 'Beagle',
    'Barboncino', 'Rottweiler', 'Yorkshire Terrier', 'Boxer', 'Dalmata',
    'Siberian Husky', 'Dobermann', 'Shih Tzu', 'Chihuahua', 'Pomerania',
    'Border Collie', 'Cocker Spaniel', 'Jack Russell Terrier', 'Maltese', 'Carlino'
  ];

  const catBreeds = [
    'Persiano', 'Maine Coon', 'Siamese', 'Ragdoll', 'British Shorthair',
    'Abissino', 'Sphynx', 'Bengala', 'Birmano', 'Norvegese delle Foreste',
    'Scottish Fold', 'Exotic Shorthair', 'Devon Rex', 'Certosino', 'Angora Turco',
    'Europeo', 'Russian Blue', 'Somalo', 'Burmese', 'Tonkinese'
  ];

  const weightSuggestions = [
    '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 
    '12', '15', '18', '20', '25', '30', '35', '40', '45', '50'
  ];

  const weightRanges = [
  'Meno di 2 kg', '2-5 kg', '5-10 kg', '10-15 kg', '15-20 kg',
  '20-25 kg', '25-30 kg', '30-40 kg', '40-50 kg', 'Più di 50 kg'];

  const ageRanges = [
  'Cucciolo (0-6 mesi)', 'Giovane (6-12 mesi)', 'Adulto (1-7 anni)',
  'Senior (7-10 anni)', 'Geriatrico (oltre 10 anni)'];

  const movementLevels = [
  'Sedentario - Molto poco attivo',
  'Leggero - Attività limitata, principalmente indoor',
  'Moderato - Passeggiate regolari, qualche gioco',
  'Attivo - Corse, lunghe passeggiate, giochi frequenti',
  'Molto Attivo - Sport, lunghe corse, attività intensa quotidiana'];

  const allergies = [
  'Pollo', 'Manzo', 'Maiale', 'Agnello', 'Pesce', 'Salmone', 'Tonno',
  'Uova', 'Latticini', 'Latte', 'Formaggio', 'Soia', 'Grano', 'Mais',
  'Riso', 'Avena', 'Patate', 'Patate dolci', 'Carote', 'Piselli'];

  const intolerances = [
  'Lattosio', 'Glutine', 'Cereali', 'Conservanti artificiali',
  'Coloranti artificiali', 'Aromi artificiali', 'BHA/BHT',
  'Etossichina', 'Propylene glycol', 'Xilitolo', 'Cipolle',
  'Aglio', 'Uva', 'Cioccolato'];

  const sensitivitiesExamples = [
  'Sensibilità al freddo o caldo eccessivo',
  'Reazioni a rumori forti o stress',
  'Problemi di digestione dopo i pasti',
  'Irritazioni cutanee o prurito',
  'Sensibilità alla luce solare',
  'Difficoltà nella masticazione'];

  const clinicalHistoryDogs = [
  'Displasia dell\'anca', 'Epilessia', 'Problemi cardiaci', 'Diabete',
  'Problemi renali', 'Problemi epatici', 'Artrite', 'Obesità',
  'Problemi digestivi', 'Allergie cutanee', 'Cataratta', 'Otite cronica',
  'Problemi respiratori', 'Cancro', 'Problemi neurologici', 'Ipotiroidismo'];

  const clinicalHistoryCats = [
  'Malattie renali croniche', 'Ipertiroidismo', 'Diabete', 'Problemi urinari',
  'Malattie cardiache', 'Problemi dentali', 'Obesità', 'Artrite',
  'Problemi digestivi', 'Allergie cutanee', 'Asma felina', 'Problemi epatici',
  'Cancro', 'Problemi neurologici', 'Insufficienza renale', 'Cistite'];

  const toggleSelection = (item: string, selectedItems: string[], setSelectedItems: (items: string[]) => void) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter((i) => i !== item));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const handleWeightChange = (value: string) => {
    // Allow only numbers and decimal point
    const numericValue = value.replace(/[^0-9.]/g, '');
    setSelectedWeight(numericValue);
  };

  const getFilteredBreeds = () => {
    const breeds = petType === 'cane' ? dogBreeds : catBreeds;
    if (!selectedBreed) return breeds;
    return breeds.filter(breed => 
      breed.toLowerCase().includes(selectedBreed.toLowerCase())
    );
  };

  const getFilteredSensitivities = () => {
    if (!sensitivitiesText) return sensitivitiesExamples;
    return sensitivitiesExamples.filter(sensitivity =>
      sensitivity.toLowerCase().includes(sensitivitiesText.toLowerCase())
    );
  };

  const handleSaveAndGoToMyPets = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Prepare data for API
      const apiData = {
        name: petName,
        petType: petType,
        breed: selectedBreed || 'Non specificato',
        weight: selectedWeight || 'Non specificato',
        age: selectedAge,
        movement: selectedMovement || 'Non specificato',
        allergies: selectedAllergies,
        intolerances: selectedIntolerances,
        sensitivities: sensitivitiesText || null,
        clinicalHistory: selectedClinicalHistory,
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

      // Success - save pet ID to localStorage for reference
      localStorage.setItem('lastCreatedPetId', result.id);
      
      // Close modal and redirect
      setShowProfileForm(false);
      router.push('/il-mio-pet');
      
    } catch (err) {
      console.error('Error creating pet profile:', err);
      setError(err instanceof Error ? err.message : 'Errore durante il salvataggio');
    } finally {
      setIsLoading(false);
    }
  };

  const steps = [
  { title: 'Tipo di Animale', icon: '🐾', color: 'from-orange-50 to-orange-100' },
  { title: 'Nome e Razza', icon: '🎯', color: 'from-blue-50 to-blue-100' },
  { title: 'Peso ed Età', icon: '⚖️', color: 'from-green-50 to-green-100' },
  { title: 'Livello di Movimento', icon: '🏃‍♂️', color: 'from-purple-50 to-purple-100' },
  { title: 'Allergie', icon: '🚫', color: 'from-red-50 to-red-100' },
  { title: 'Intolleranze', icon: '⚠️', color: 'from-amber-50 to-amber-100' },
  { title: 'Sensibilità', icon: '💜', color: 'from-pink-50 to-pink-100' },
  { title: 'Storia Clinica', icon: '🏥', color: 'from-teal-50 to-teal-100' }];


  const canProceedToNextStep = () => {
    switch (currentStep) {
      case 0:return petType !== null;
      case 1:return petName.trim() !== '' && selectedBreed.trim() !== '';
      case 2:return selectedWeight.trim() !== '' && selectedAge !== '';
      case 3:return selectedMovement !== '';
      default:return true;
    }
  };

  const renderStepContent = () => {
    const currentStepData = steps[currentStep];

    switch (currentStep) {
      case 0: // Tipo di Animale
        return (
          <div className="space-y-2">
            <div className="text-center">
              <h3 className="text-xl font-bold text-gray-800 mb-0.5 flex items-center justify-center gap-2">
                <span className="text-2xl">{currentStepData.icon}</span>
                {currentStepData.title}
              </h3>
              <p className="text-gray-600 text-xs">Seleziona il tipo di animale domestico</p>
            </div>
            <div className="flex justify-center gap-3">
              <button
                onClick={() => setPetType('cane')}
                className={`px-8 py-4 rounded-2xl transition-all duration-300 text-base font-bold shadow-lg ${
                petType === 'cane' ?
                'bg-primary text-white scale-110' :
                'bg-white text-gray-700 border-2 border-gray-300 hover:border-primary hover:scale-105'}`
                }>
                <div className="text-3xl mb-1">🐕</div>
                Cane
              </button>
              <button
                onClick={() => setPetType('gatto')}
                className={`px-8 py-4 rounded-2xl transition-all duration-300 text-base font-bold shadow-lg ${
                petType === 'gatto' ?
                'bg-primary text-white scale-110' :
                'bg-white text-gray-700 border-2 border-gray-300 hover:border-primary hover:scale-105'}`
                }>
                <div className="text-3xl mb-1">🐱</div>
                Gatto
              </button>
            </div>
          </div>);


      case 1: // Nome e Razza
        return (
          <div className="space-y-2">
            <div className="text-center">
              <h3 className="text-xl font-bold text-gray-800 mb-0.5 flex items-center justify-center gap-2">
                <span className="text-2xl">{currentStepData.icon}</span>
                {currentStepData.title}
              </h3>
              <p className="text-gray-600 text-xs">Inserisci il nome e la razza del tuo pet</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-4xl mx-auto">
              <div className="bg-white/80 rounded-2xl p-2.5 border-2 border-blue-200">
                <h4 className="text-base font-bold text-gray-800 mb-1.5 text-center">👤 Nome</h4>
                <Input
                  type="text"
                  placeholder="Es. Max, Bella"
                  value={petName}
                  onChange={(e) => setPetName(e.target.value)}
                  className="bg-white border-2 border-gray-300 text-gray-800 placeholder:text-gray-400 text-base py-3 text-center font-semibold" />
              </div>
              <div className="bg-white/80 rounded-2xl p-2.5 border-2 border-blue-200 relative">
                <h4 className="text-base font-bold text-gray-800 mb-1.5 text-center">🎯 Razza</h4>
                <Input
                  type="text"
                  placeholder={`Es. ${petType === 'cane' ? 'Labrador' : 'Persiano'}`}
                  value={selectedBreed}
                  onChange={(e) => {
                    setSelectedBreed(e.target.value);
                    setShowBreedSuggestions(true);
                  }}
                  onFocus={() => setShowBreedSuggestions(true)}
                  className="bg-white border-2 border-gray-300 text-gray-800 placeholder:text-gray-400 text-base py-3 text-center font-semibold" />
                
                {showBreedSuggestions && selectedBreed && getFilteredBreeds().length > 0 && (
                  <div className="absolute z-10 w-full mt-1 left-0 right-0 px-2.5">
                    <div className="bg-white rounded-lg shadow-xl max-h-40 overflow-y-auto border border-gray-200">
                      {getFilteredBreeds().slice(0, 6).map((breed) => (
                        <button
                          key={breed}
                          onClick={() => {
                            setSelectedBreed(breed);
                            setShowBreedSuggestions(false);
                          }}
                          className="w-full text-left px-3 py-1.5 hover:bg-blue-50 transition-all duration-200 text-gray-800 font-medium text-sm"
                        >
                          {breed}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>);


      case 2: // Peso ed Età
        return (
          <div className="space-y-2">
            <div className="text-center">
              <h3 className="text-xl font-bold text-gray-800 mb-0.5 flex items-center justify-center gap-2">
                <span className="text-2xl">{currentStepData.icon}</span>
                {currentStepData.title}
              </h3>
              <p className="text-gray-600 text-xs">Inserisci peso ed età del tuo pet</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-4xl mx-auto">
              <div className="bg-white/80 rounded-2xl p-2.5 border-2 border-green-200 relative">
                <h4 className="text-base font-bold text-gray-800 mb-1.5 text-center">⚖️ Peso (kg)</h4>
                <Input
                  type="text"
                  placeholder="es. 15 o 3.5"
                  value={selectedWeight}
                  onChange={(e) => {
                    handleWeightChange(e.target.value);
                    setShowWeightSuggestions(true);
                  }}
                  onFocus={() => setShowWeightSuggestions(true)}
                  className="bg-white border-2 border-gray-300 text-gray-800 placeholder:text-gray-400 text-base py-3 text-center font-semibold" />
                
                {showWeightSuggestions && weightSuggestions.length > 0 && (
                  <div className="absolute z-10 w-full mt-1 left-0 right-0 px-2.5">
                    <div className="bg-white rounded-lg shadow-xl max-h-32 overflow-y-auto border border-gray-200">
                      <p className="text-[10px] text-gray-500 px-3 pt-2 pb-1 font-semibold">💡 Suggerimenti kg:</p>
                      <div className="grid grid-cols-5 gap-1 p-2">
                        {weightSuggestions.map((weight) => (
                          <button
                            key={weight}
                            onClick={() => {
                              setSelectedWeight(weight);
                              setShowWeightSuggestions(false);
                            }}
                            className="px-2 py-1 text-xs hover:bg-green-50 transition-all duration-200 text-gray-800 font-medium rounded border border-gray-200 hover:border-green-500"
                          >
                            {weight}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="bg-white/80 rounded-2xl p-2.5 border-2 border-green-200">
                <h4 className="text-base font-bold text-gray-800 mb-1.5 text-center">🎂 Età (anni)</h4>
                <Input
                  type="text"
                  placeholder="es. 5 o 0.5"
                  value={selectedAge}
                  onChange={(e) => {
                    const numericValue = e.target.value.replace(/[^0-9.]/g, '');
                    setSelectedAge(numericValue);
                  }}
                  className="bg-white border-2 border-gray-300 text-gray-800 placeholder:text-gray-400 text-base py-3 text-center font-semibold" />
                <p className="text-[10px] text-gray-500 text-center mt-1">Inserisci l'età precisa in anni</p>
              </div>
            </div>
          </div>);


      case 3: // Livello di Movimento
        return (
          <div className="space-y-2">
            <div className="text-center">
              <h3 className="text-xl font-bold text-gray-800 mb-0.5 flex items-center justify-center gap-2">
                <span className="text-2xl">{currentStepData.icon}</span>
                {currentStepData.title}
              </h3>
              <p className="text-gray-600 text-xs">Quanto è attivo il tuo pet?</p>
            </div>
            <div className="space-y-1.5 max-w-3xl mx-auto">
              {movementLevels.map((movement) =>
              <button
                key={movement}
                onClick={() => setSelectedMovement(movement)}
                className={`w-full p-2 rounded-xl text-left transition-all duration-300 font-semibold text-xs ${
                selectedMovement === movement ?
                'bg-purple-600 text-white scale-105 shadow-lg' :
                'bg-white text-gray-700 border border-gray-300 hover:border-purple-500 hover:bg-purple-50'}`
                }>
                  {movement}
                </button>
              )}
            </div>
          </div>);


      case 4: // Allergie
        return (
          <div className="space-y-2">
            <div className="text-center">
              <h3 className="text-lg font-bold text-gray-800 mb-0.5 flex items-center justify-center gap-2">
                <span className="text-xl">{currentStepData.icon}</span>
                {currentStepData.title}
              </h3>
              <p className="text-gray-600 text-xs">Seleziona eventuali allergie (opzionale)</p>
            </div>
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-4 md:grid-cols-5 gap-1.5">
                {allergies.map((allergy) =>
                <button
                  key={allergy}
                  onClick={() => toggleSelection(allergy, selectedAllergies, setSelectedAllergies)}
                  className={`p-1.5 rounded-lg transition-all duration-300 font-semibold text-[10px] ${
                  selectedAllergies.includes(allergy) ?
                  'bg-red-600 text-white scale-105 shadow-lg' :
                  'bg-white text-gray-700 border border-gray-300 hover:border-red-500 hover:bg-red-50'}`
                  }>
                    {allergy}
                  </button>
                )}
              </div>
              <p className="text-gray-700 text-center mt-1.5 text-xs font-semibold">
                Selezionate: {selectedAllergies.length}
              </p>
            </div>
          </div>);


      case 5: // Intolleranze
        return (
          <div className="space-y-2">
            <div className="text-center">
              <h3 className="text-lg font-bold text-gray-800 mb-0.5 flex items-center justify-center gap-2">
                <span className="text-xl">{currentStepData.icon}</span>
                {currentStepData.title}
              </h3>
              <p className="text-gray-600 text-xs">Seleziona eventuali intolleranze (opzionale)</p>
            </div>
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-3 md:grid-cols-4 gap-1.5">
                {intolerances.map((intolerance) =>
                <button
                  key={intolerance}
                  onClick={() => toggleSelection(intolerance, selectedIntolerances, setSelectedIntolerances)}
                  className={`p-1.5 rounded-lg transition-all duration-300 font-semibold text-[10px] ${
                  selectedIntolerances.includes(intolerance) ?
                  'bg-amber-600 text-white scale-105 shadow-lg' :
                  'bg-white text-gray-700 border border-gray-300 hover:border-amber-500 hover:bg-amber-50'}`
                  }>
                    {intolerance}
                  </button>
                )}
              </div>
              <p className="text-gray-700 text-center mt-1.5 text-xs font-semibold">
                Selezionate: {selectedIntolerances.length}
              </p>
            </div>
          </div>);


      case 6: // Sensibilità
        return (
          <div className="space-y-2">
            <div className="text-center">
              <h3 className="text-xl font-bold text-gray-800 mb-0.5 flex items-center justify-center gap-2">
                <span className="text-2xl">{currentStepData.icon}</span>
                {currentStepData.title}
              </h3>
              <p className="text-gray-600 text-xs">Descrivi eventuali sensibilità particolari</p>
            </div>
            <div className="max-w-3xl mx-auto relative">
              <Textarea
                value={sensitivitiesText}
                onChange={(e) => {
                  setSensitivitiesText(e.target.value);
                  setShowSensitivitySuggestions(true);
                }}
                onFocus={() => setShowSensitivitySuggestions(true)}
                placeholder="Scrivi qui le sensibilità particolari..."
                className="min-h-24 bg-white border-2 border-gray-300 text-gray-800 placeholder:text-gray-400 text-sm font-semibold" />
              
              {showSensitivitySuggestions && getFilteredSensitivities().length > 0 && (
                <div className="mt-1.5 bg-white/90 rounded-xl p-2 border-2 border-pink-200 max-h-32 overflow-y-auto">
                  <p className="text-gray-700 text-[10px] font-semibold mb-1.5">💡 Suggerimenti (clicca per aggiungere):</p>
                  <div className="flex flex-wrap gap-1.5">
                    {getFilteredSensitivities().slice(0, 4).map((example, i) =>
                    <button
                      key={i}
                      onClick={() => {
                        setSensitivitiesText(prev => prev ? `${prev}; ${example}` : example);
                        setShowSensitivitySuggestions(false);
                      }}
                      className="text-gray-700 text-[10px] bg-white px-2 py-1 rounded-full border border-gray-300 hover:border-pink-500 hover:bg-pink-50 transition-all duration-300"
                    >
                      {example}
                    </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>);


      case 7: // Storia Clinica
        return (
          <div className="space-y-2">
            <div className="text-center">
              <h3 className="text-lg font-bold text-gray-800 mb-0.5 flex items-center justify-center gap-2">
                <span className="text-xl">{currentStepData.icon}</span>
                {currentStepData.title}
              </h3>
              <p className="text-gray-600 text-xs">Seleziona eventuali problemi di salute (opzionale)</p>
            </div>
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-1.5">
                {(petType === 'cane' ? clinicalHistoryDogs : clinicalHistoryCats).map((condition) =>
                <button
                  key={condition}
                  onClick={() => toggleSelection(condition, selectedClinicalHistory, setSelectedClinicalHistory)}
                  className={`p-1.5 rounded-lg transition-all duration-300 font-semibold text-[10px] ${
                  selectedClinicalHistory.includes(condition) ?
                  'bg-teal-600 text-white scale-105 shadow-lg' :
                  'bg-white text-gray-700 border border-gray-300 hover:border-teal-500 hover:bg-teal-50'}`
                  }>
                    {condition}
                  </button>
                )}
              </div>
              <p className="text-gray-700 text-center mt-1.5 text-xs font-semibold">
                Selezionati: {selectedClinicalHistory.length}
              </p>
            </div>
          </div>);


      default:
        return null;
    }
  };

  const renderProfileForm = () => {
    if (!showProfileForm) return null;

    const currentStepData = steps[currentStep];

    return (
      <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[85vh] p-5 relative shadow-xl flex flex-col overflow-hidden">
          <button
            onClick={() => {
              setShowProfileForm(false);
              setCurrentStep(0);
            }}
            className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors z-10 hover:bg-gray-100 rounded-full p-2">
            <X className="w-5 h-5" />
          </button>
          
          {/* Progress Indicator */}
          <div className="mb-3 flex-shrink-0">
            <div className="flex justify-center items-center gap-2 mb-2">
              {steps.map((step, index) => (
                <div key={index} className="flex items-center">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    index === currentStep
                      ? 'bg-primary text-white scale-110 shadow-md'
                      : index < currentStep
                      ? 'bg-primary/20 text-primary'
                      : 'bg-gray-100 text-gray-400'
                  }`}>
                    {index + 1}
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-5 h-1 mx-1 rounded ${
                      index < currentStep ? 'bg-primary/30' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
            <p className="text-center text-gray-600 text-xs font-medium">
              Step {currentStep + 1} di {steps.length}
            </p>
          </div>

          {/* Step Content with light background */}
          <div className={`flex-1 overflow-hidden bg-gradient-to-br ${currentStepData.color} rounded-xl p-4`}>
            {renderStepContent()}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mt-3 gap-4 flex-shrink-0 pt-3 border-t border-gray-200">
            <Button
              onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
              disabled={currentStep === 0}
              variant="outline"
              className="border-gray-300 text-gray-700 hover:bg-gray-50 font-medium px-5 py-2.5 disabled:opacity-40 disabled:cursor-not-allowed">
              <ChevronLeft className="w-4 h-4 mr-2" />
              Indietro
            </Button>

            {currentStep < steps.length - 1 ? (
              <Button
                onClick={() => setCurrentStep(currentStep + 1)}
                disabled={!canProceedToNextStep()}
                className="bg-primary hover:bg-primary/90 text-white font-semibold px-7 py-2.5 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm">
                Avanti
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button
                onClick={handleSaveAndGoToMyPets}
                disabled={!selectedBreed}
                className="bg-primary hover:bg-primary/90 text-white font-semibold px-7 py-2.5 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm">
                Salva e Continua
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="px-4 py-12 !w-full !h-full">
      {/* Main Section Title */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-[#2D3748] mb-4 font-inter">
          Come Scegliere il Cibo Perfetto per il Tuo Amico
        </h1>
        <p className="text-lg text-[#A0AEC0] font-inter max-w-2xl mx-auto">
          Due modi semplici per assicurarti che il tuo animale riceva la nutrizione ideale
        </p>
      </div>

      {/* Two Option Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12 max-w-6xl mx-auto">
        {/* Option 1 - Left Card */}
        <Card className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 group flex flex-col !w-[560px] !h-[499px]">
          <CardHeader className="text-center pb-2">
            <div className="w-16 h-16 bg-[#FF6B35] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <Package className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-[#2D3748] font-inter mb-2">
              Conosci già il suo cibo?
            </CardTitle>
            <CardDescription className="text-lg font-semibold text-[#FF6B35] font-inter">
              Scegli tra le Migliori Marche
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col py-3 !w-full !h-[277px] gap-4">
            <p className="text-[#2D3748] font-inter text-base leading-relaxed">
              Hai già individuato il cibo perfetto per il tuo amico? Seleziona tra le migliori marche disponibili nel nostro catalogo e ricevilo comodamente a casa tua.
            </p>
            
            <div className="flex flex-col gap-2 !w-full !h-[130px]">
              {["Oltre 50 marche premium", "Consegna programmata", "Sconti per abbonamenti"].map((feature, index) =>
              <div key={index} className="flex items-center space-x-3">
                  <div className="w-5 h-5 bg-[#48BB78] rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-[#2D3748] font-inter text-base">{feature}</span>
                </div>
              )}
            </div>

            <Button
              onClick={() => router.push('/prodotti')}
              className="bg-[#FF6B35] hover:bg-[#E55A2B] text-white font-inter text-base py-6 rounded-lg transition-all duration-300 transform hover:scale-105 mx-auto !w-80 !h-12 !max-w-xs">
              Scegli il Tuo Cibo
            </Button>
          </CardContent>
        </Card>

        {/* Option 2 - Right Card */}
        <Card className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 group flex flex-col">
          <CardHeader className="text-center pb-2">
            <div className="w-16 h-16 bg-[#FF6B35] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-[#2D3748] font-inter mb-2">
              Vuoi un Consiglio Personalizzato?
            </CardTitle>
            <CardDescription className="text-lg font-semibold text-[#FF6B35] font-inter">
              Profilo Personalizzato
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col justify-between space-y-4 py-3">
            <p className="text-[#2D3748] font-inter text-base leading-relaxed">
              Descrivi il profilo del tuo animale e i nostri esperti ti consiglieranno il cibo ideale in base alle sue caratteristiche specifiche.
            </p>
            
            <div className="space-y-4 flex flex-col">
              <div className="flex items-center justify-between group/item cursor-pointer p-3 rounded-lg border-2 border-blue-400 hover:border-blue-500 transition-colors">
                <div className="flex items-center space-x-3">
                  <span className="text-lg">📋</span>
                  <div className="flex flex-col">
                    <span className="text-[#2D3748] font-inter font-semibold text-base">
                      Profilo Base dell'Animale
                    </span>
                    <span className="text-[#A0AEC0] font-inter text-sm">
                      Razza + Peso + Età + Movimento
                    </span>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-[#A0AEC0] group-hover/item:text-[#FF6B35] transition-colors" />
              </div>

              <div className="flex items-center justify-between group/item cursor-pointer p-3 rounded-lg border-2 border-red-400 hover:border-red-500 transition-colors">
                <div className="flex items-center space-x-3">
                  <span className="text-lg">🚫</span>
                  <span className="text-[#2D3748] font-inter font-semibold text-base">
                    Allergie (3 selezionate)
                  </span>
                </div>
                <ChevronRight className="w-5 h-5 text-[#A0AEC0] group-hover/item:text-[#FF6B35] transition-colors" />
              </div>

              <div className="flex items-center justify-between group/item cursor-pointer p-3 rounded-lg border-2 border-amber-400 hover:border-amber-500 transition-colors">
                <div className="flex items-center space-x-3">
                  <span className="text-lg">⚠️</span>
                  <span className="text-[#2D3748] font-inter font-semibold text-base">
                    Intolleranze (2 selezionate)
                  </span>
                </div>
                <ChevronRight className="w-5 h-5 text-[#A0AEC0] group-hover/item:text-[#FF6B35] transition-colors" />
              </div>

              <div className="flex items-center justify-between group/item cursor-pointer p-3 rounded-lg border-2 border-purple-400 hover:border-purple-500 transition-colors">
                <div className="flex items-center space-x-3">
                  <span className="text-lg">💜</span>
                  <span className="text-[#2D3748] font-inter font-semibold text-base">
                    Sensibilità particolari
                  </span>
                </div>
                <ChevronRight className="w-5 h-5 text-[#A0AEC0] group-hover/item:text-[#FF6B35] transition-colors" />
              </div>

              <div className="flex items-center justify-between group/item cursor-pointer p-3 rounded-lg border-2 border-teal-400 hover:border-teal-500 transition-colors">
                <div className="flex items-center space-x-3">
                  <span className="text-lg">🏥</span>
                  <span className="text-[#2D3748] font-inter font-semibold text-base">
                    Storia clinica (5 problemi)
                  </span>
                </div>
                <ChevronRight className="w-5 h-5 text-[#A0AEC0] group-hover/item:text-[#FF6B35] transition-colors" />
              </div>
            </div>

            <Button
              onClick={() => setShowProfileForm(true)}
              className="w-full bg-[#FF6B35] hover:bg-[#E55A2B] text-white font-inter text-base py-6 rounded-lg transition-all duration-300 transform hover:scale-105 max-w-xs mx-auto">
              Crea il Profilo
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Section */}
      <div className="bg-white rounded-xl p-8 border border-[#FF6B35] mx-auto mt-12 !w-[672px] !h-[196px] !max-w-2xl">
        <p className="text-[#2D3748] font-inter text-base leading-relaxed">
          <strong className="text-[#FF6B35]">Il nostro approccio</strong> va oltre la semplice vendita di prodotti: creiamo una relazione di fiducia che dura nel tempo, accompagnando te e il tuo pet in ogni fase della vita. Dai cuccioli agli animali senior, dalle esigenze più semplici a quelle più complesse, siamo qui per offrirti soluzioni personalizzate che fanno la differenza ogni giorno.
        </p>
      </div>
      
      {/* Profile Form Dialog */}
      {renderProfileForm()}
    </div>);

};