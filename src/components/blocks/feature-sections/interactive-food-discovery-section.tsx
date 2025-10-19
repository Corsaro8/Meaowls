"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Dog, 
  Cat, 
  Baby, 
  User, 
  Users, 
  Zap, 
  Activity, 
  Gauge, 
  Heart,
  Shield,
  Home,
  TreePine,
  Sparkles,
  ChevronRight,
  CheckCircle,
  ArrowRight
} from 'lucide-react';

interface PetProfile {
  petType: 'dog' | 'cat' | null;
  ageStage: 'puppy' | 'adult' | 'senior' | null;
  size: 'small' | 'medium' | 'large' | null;
  activityLevel: 'low' | 'moderate' | 'high' | null;
  lifestyle: 'indoor' | 'outdoor' | 'both' | null;
  healthConsiderations: string[];
}

const FoodDiscoverySection = () => {
  const [petProfile, setPetProfile] = useState<PetProfile>({
    petType: null,
    ageStage: null,
    size: null,
    activityLevel: null,
    lifestyle: null,
    healthConsiderations: []
  });

  const [currentStep, setCurrentStep] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const steps = ['petType', 'ageStage', 'size', 'activityLevel', 'lifestyle', 'healthConsiderations'];
  const completedSteps = Object.values(petProfile).filter(value => 
    Array.isArray(value) ? value.length > 0 : value !== null
  ).length;

  const progressPercentage = (completedSteps / 6) * 100;

  const updateProfile = (key: keyof PetProfile, value: any) => {
    setPetProfile(prev => ({ ...prev, [key]: value }));
    if (currentStep < steps.length - 1) {
      setTimeout(() => setCurrentStep(prev => prev + 1), 500);
    }
  };

  const toggleHealthConsideration = (consideration: string) => {
    setPetProfile(prev => ({
      ...prev,
      healthConsiderations: prev.healthConsiderations.includes(consideration)
        ? prev.healthConsiderations.filter(item => item !== consideration)
        : [...prev.healthConsiderations, consideration]
    }));
  };

  const petTypeCards = [
    {
      id: 'dog',
      label: 'Cane',
      icon: Dog,
      color: 'from-orange-400 to-orange-600',
      description: 'Il tuo fedele compagno a quattro zampe'
    },
    {
      id: 'cat',
      label: 'Gatto',
      icon: Cat,
      color: 'from-purple-400 to-purple-600',
      description: 'Il tuo elegante amico felino'
    }
  ];

  const ageStageCards = [
    {
      id: 'puppy',
      label: petProfile.petType === 'cat' ? 'Cucciolo' : 'Cucciolo',
      icon: Baby,
      color: 'from-pink-400 to-pink-600',
      description: 'Fino a 12 mesi, in crescita'
    },
    {
      id: 'adult',
      label: 'Adulto',
      icon: User,
      color: 'from-blue-400 to-blue-600',
      description: '1-7 anni, nel pieno delle energie'
    },
    {
      id: 'senior',
      label: 'Senior',
      icon: Heart,
      color: 'from-green-400 to-green-600',
      description: 'Oltre 7 anni, cure speciali'
    }
  ];

  const sizeCards = [
    {
      id: 'small',
      label: 'Piccolo',
      icon: () => <div className="w-4 h-4 bg-current rounded-full" />,
      color: 'from-yellow-400 to-yellow-600',
      description: petProfile.petType === 'dog' ? 'Fino a 10kg' : 'Fino a 4kg'
    },
    {
      id: 'medium',
      label: 'Medio',
      icon: () => <div className="w-6 h-6 bg-current rounded-full" />,
      color: 'from-orange-400 to-orange-600',
      description: petProfile.petType === 'dog' ? '10-25kg' : '4-6kg'
    },
    {
      id: 'large',
      label: 'Grande',
      icon: () => <div className="w-8 h-8 bg-current rounded-full" />,
      color: 'from-red-400 to-red-600',
      description: petProfile.petType === 'dog' ? 'Oltre 25kg' : 'Oltre 6kg'
    }
  ];

  const activityCards = [
    {
      id: 'low',
      label: 'Rilassato',
      icon: Gauge,
      color: 'from-blue-400 to-blue-600',
      description: 'Preferisce il relax e il riposo'
    },
    {
      id: 'moderate',
      label: 'Moderato',
      icon: Activity,
      color: 'from-green-400 to-green-600',
      description: 'Equilibrio tra gioco e riposo'
    },
    {
      id: 'high',
      label: 'Energico',
      icon: Zap,
      color: 'from-red-400 to-red-600',
      description: 'Sempre in movimento e giocoso'
    }
  ];

  const lifestyleCards = [
    {
      id: 'indoor',
      label: 'Interno',
      icon: Home,
      color: 'from-purple-400 to-purple-600',
      description: 'Vive principalmente in casa'
    },
    {
      id: 'outdoor',
      label: 'Esterno',
      icon: TreePine,
      color: 'from-green-400 to-green-600',
      description: 'Ama stare all\'aperto'
    },
    {
      id: 'both',
      label: 'Misto',
      icon: Users,
      color: 'from-orange-400 to-orange-600',
      description: 'Casa e giardino/esterni'
    }
  ];

  const healthConsiderations = [
    'Allergie alimentari',
    'Sensibilità digestive',
    'Controllo peso',
    'Problemi articolari',
    'Cura del pelo',
    'Denti sensibili'
  ];

  const CardComponent = ({ 
    cards, 
    selectedValue, 
    onSelect, 
    title, 
    subtitle 
  }: {
    cards: any[];
    selectedValue: any;
    onSelect: (value: any) => void;
    title: string;
    subtitle: string;
  }) => (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600">{subtitle}</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
        {cards.map((card) => {
          const IconComponent = card.icon;
          const isSelected = selectedValue === card.id;
          
          return (
            <motion.button
              key={card.id}
              onClick={() => onSelect(card.id)}
              className={`relative p-6 rounded-2xl border-2 transition-all duration-300 min-h-[140px] ${
                isSelected 
                  ? 'border-primary bg-primary/5 shadow-lg transform scale-105' 
                  : 'border-gray-200 hover:border-primary/50 hover:shadow-md hover:scale-102'
              }`}
              whileHover={{ scale: isSelected ? 1.05 : 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className={`inline-block p-3 rounded-xl bg-gradient-to-br ${card.color} text-white mb-3`}>
                <IconComponent className="w-6 h-6" />
              </div>
              
              <h4 className="font-semibold text-lg text-gray-800 mb-1">
                {card.label}
              </h4>
              
              <p className="text-sm text-gray-600 leading-relaxed">
                {card.description}
              </p>
              
              {isSelected && (
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-3 right-3"
                >
                  <CheckCircle className="w-6 h-6 text-primary" />
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );

  const HealthConsiderationsStep = () => (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Considerazioni Speciali</h3>
        <p className="text-gray-600">Seleziona eventuali esigenze particolari (opzionale)</p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-w-3xl mx-auto">
        {healthConsiderations.map((consideration) => {
          const isSelected = petProfile.healthConsiderations.includes(consideration);
          
          return (
            <motion.button
              key={consideration}
              onClick={() => toggleHealthConsideration(consideration)}
              className={`p-4 rounded-xl border-2 text-sm transition-all duration-300 ${
                isSelected 
                  ? 'border-primary bg-primary text-white' 
                  : 'border-gray-200 hover:border-primary/50 text-gray-700'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center justify-between">
                <span>{consideration}</span>
                {isSelected && <CheckCircle className="w-4 h-4" />}
              </div>
            </motion.button>
          );
        })}
      </div>
      
      <div className="text-center">
        <motion.button
          onClick={() => setShowResults(true)}
          className="bg-primary text-white px-8 py-3 rounded-xl font-semibold hover:bg-primary/90 transition-colors inline-flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Scopri il Cibo Ideale
          <ArrowRight className="w-5 h-5" />
        </motion.button>
      </div>
    </motion.div>
  );

  const ResultsSection = () => (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center space-y-6"
    >
      <div className="space-y-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Sparkles className="w-16 h-16 text-primary mx-auto mb-4" />
        </motion.div>
        
        <h3 className="text-3xl font-bold text-gray-800">
          Profilo Completato!
        </h3>
        
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Abbiamo creato il profilo perfetto per il tuo {petProfile.petType === 'dog' ? 'cane' : 'gatto'}. 
          Le nostre raccomandazioni personalizzate sono pronte!
        </p>
      </div>
      
      <div className="bg-gradient-to-r from-primary/10 to-orange-100 p-8 rounded-2xl max-w-2xl mx-auto">
        <h4 className="font-semibold text-lg mb-4">Il tuo profilo:</h4>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="space-y-2">
            <p><span className="font-medium">Tipo:</span> {petProfile.petType === 'dog' ? 'Cane' : 'Gatto'}</p>
            <p><span className="font-medium">Età:</span> {
              petProfile.ageStage === 'puppy' ? 'Cucciolo' : 
              petProfile.ageStage === 'adult' ? 'Adulto' : 'Senior'
            }</p>
            <p><span className="font-medium">Taglia:</span> {
              petProfile.size === 'small' ? 'Piccolo' : 
              petProfile.size === 'medium' ? 'Medio' : 'Grande'
            }</p>
          </div>
          <div className="space-y-2">
            <p><span className="font-medium">Attività:</span> {
              petProfile.activityLevel === 'low' ? 'Rilassato' : 
              petProfile.activityLevel === 'moderate' ? 'Moderato' : 'Energico'
            }</p>
            <p><span className="font-medium">Stile di vita:</span> {
              petProfile.lifestyle === 'indoor' ? 'Interno' : 
              petProfile.lifestyle === 'outdoor' ? 'Esterno' : 'Misto'
            }</p>
            {petProfile.healthConsiderations.length > 0 && (
              <p><span className="font-medium">Esigenze speciali:</span> {petProfile.healthConsiderations.length}</p>
            )}
          </div>
        </div>
      </div>
      
      <motion.button
        className="bg-primary text-white px-10 py-4 rounded-xl font-semibold text-lg hover:bg-primary/90 transition-colors inline-flex items-center gap-3"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Vedi Raccomandazioni Personalizzate
        <ChevronRight className="w-6 h-6" />
      </motion.button>
    </motion.div>
  );

  const getCurrentStepContent = () => {
    if (showResults) return <ResultsSection />;
    
    switch (steps[currentStep]) {
      case 'petType':
        return (
          <CardComponent
            cards={petTypeCards}
            selectedValue={petProfile.petType}
            onSelect={(value) => updateProfile('petType', value)}
            title="Che tipo di animale hai?"
            subtitle="Iniziamo conoscendo il tuo amico a quattro zampe"
          />
        );
      case 'ageStage':
        return (
          <CardComponent
            cards={ageStageCards}
            selectedValue={petProfile.ageStage}
            onSelect={(value) => updateProfile('ageStage', value)}
            title="Che età ha?"
            subtitle="L'età influenza le esigenze nutrizionali"
          />
        );
      case 'size':
        return (
          <CardComponent
            cards={sizeCards}
            selectedValue={petProfile.size}
            onSelect={(value) => updateProfile('size', value)}
            title="Che taglia ha?"
            subtitle="Le dimensioni determinano le porzioni ideali"
          />
        );
      case 'activityLevel':
        return (
          <CardComponent
            cards={activityCards}
            selectedValue={petProfile.activityLevel}
            onSelect={(value) => updateProfile('activityLevel', value)}
            title="Quanto è attivo?"
            subtitle="Il livello di energia influenza il fabbisogno calorico"
          />
        );
      case 'lifestyle':
        return (
          <CardComponent
            cards={lifestyleCards}
            selectedValue={petProfile.lifestyle}
            onSelect={(value) => updateProfile('lifestyle', value)}
            title="Dove vive principalmente?"
            subtitle="Lo stile di vita aiuta a personalizzare la dieta"
          />
        );
      case 'healthConsiderations':
        return <HealthConsiderationsStep />;
      default:
        return null;
    }
  };

  return (
    <section className="py-16 bg-gradient-to-br from-orange-50 via-white to-yellow-50">
      <div className="container mx-auto px-4">
        {/* Main Content */}
        <div className="max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            {getCurrentStepContent()}
          </AnimatePresence>
        </div>

        {/* Navigation */}
        {!showResults && currentStep > 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mt-12"
          >
            <button
              onClick={() => setCurrentStep(prev => prev - 1)}
              className="text-gray-600 hover:text-primary transition-colors font-medium"
            >
              ← Torna indietro
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default FoodDiscoverySection;