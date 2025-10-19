"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Heart, 
  AlertTriangle, 
  Scale, 
  Bone, 
  Smile, 
  Zap, 
  Dna, 
  Brain, 
  Activity,
  Droplets,
  X,
  ChevronRight,
  Shield,
  Sparkles
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

interface HealthIssue {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  detailedDescription: string;
  profileHelp: string;
  recommendations: string[];
  nutritionalAdvice: string;
  color: string;
}

const healthIssues: HealthIssue[] = [
  {
    id: "allergies",
    name: "Allergie",
    description: "Reazioni avverse a specifici ingredienti o sostanze ambientali",
    icon: <AlertTriangle className="w-6 h-6" />,
    detailedDescription: "Le allergie alimentari nei pets sono reazioni del sistema immunitario a specifiche proteine o ingredienti. Possono manifestarsi con sintomi cutanei, gastrointestinali o respiratori.",
    profileHelp: "Specificando il profilo del tuo animale, identifichiamo gli allergeni comuni per la sua razza ed età, creando un piano alimentare personalizzato che evita completamente i trigger.",
    recommendations: [
      "Alimenti ipoallergenici con proteine idrolizzate",
      "Integratori con omega-3 per supportare la pelle",
      "Probiotici per rafforzare il sistema immunitario",
      "Snack monoproteici per test di eliminazione"
    ],
    nutritionalAdvice: "Dieta ad eliminazione seguita da reintroduzione graduale per identificare gli allergeni specifici. Preferire ingredienti limitati e di alta qualità.",
    color: "bg-red-50 border-red-200"
  },
  {
    id: "intolerances",
    name: "Intolleranze",
    description: "Difficoltà digestive legate a specifici alimenti o componenti",
    icon: <Zap className="w-6 h-6" />,
    detailedDescription: "Le intolleranze alimentari causano problemi digestivi senza coinvolgere il sistema immunitario. Sono spesso legate a carenze enzimatiche o sensibilità gastrica.",
    profileHelp: "Attraverso il profilo personalizzato, analizziamo la storia digestiva del tuo pet e identifichiamo gli ingredienti che potrebbero causare intolleranze specifiche per la sua età e razza.",
    recommendations: [
      "Alimenti facilmente digeribili con ingredienti limitati",
      "Enzimi digestivi per migliorare l'assorbimento",
      "Prebiotici e probiotici per la salute intestinale",
      "Integratori con L-glutammina per riparare la mucosa intestinale"
    ],
    nutritionalAdvice: "Dieta graduale con ingredienti altamente digeribili. Evitare cereali complessi e preferire riso o patate dolci come fonte di carboidrati.",
    color: "bg-orange-50 border-orange-200"
  },
  {
    id: "weight",
    name: "Problemi di peso",
    description: "Sovrappeso, sottopeso o difficoltà nel mantenere il peso ideale",
    icon: <Scale className="w-6 h-6" />,
    detailedDescription: "I problemi di peso nei pets possono derivare da fattori metabolici, età, sterilizzazione, o stile di vita sedentario. Richiedono un approccio nutrizionale specifico.",
    profileHelp: "Il profilo del tuo pet ci permette di calcolare il peso ideale basato su razza, età, livello di attività e condizioni mediche, creando un piano alimentare su misura.",
    recommendations: [
      "Alimenti a ridotto contenuto calorico ma ricchi di nutrienti",
      "Integratori con L-carnitina per il metabolismo dei grassi",
      "Fibra solubile per aumentare il senso di sazietà",
      "Snack ipocalorici per il training e i premi"
    ],
    nutritionalAdvice: "Controllo delle porzioni con alimenti ad alta densità nutrizionale. Aumentare le proteine magre e ridurre i carboidrati semplici.",
    color: "bg-green-50 border-green-200"
  },
  {
    id: "joints",
    name: "Problemi articolari e mobilità",
    description: "Artrite, displasia, rigidità articolare e difficoltà di movimento",
    icon: <Bone className="w-6 h-6" />,
    detailedDescription: "I problemi articolari sono comuni negli animali anziani e in alcune razze predisposte. Possono causare dolore, ridotta mobilità e perdita di qualità della vita.",
    profileHelp: "Basandoci su razza, età e storia clinica del tuo pet, possiamo prevedere e prevenire problemi articolari con un supporto nutrizionale mirato.",
    recommendations: [
      "Alimenti arricchiti con glucosamina e condroitina",
      "Integratori con acidi grassi omega-3 anti-infiammatori",
      "Collagene idrolizzato per supportare cartilagini",
      "Curcuma e boswellia per ridurre l'infiammazione"
    ],
    nutritionalAdvice: "Dieta anti-infiammatoria ricca di antiossidanti. Mantenere peso ideale per ridurre stress articolare.",
    color: "bg-blue-50 border-blue-200"
  },
  {
    id: "dental",
    name: "Problemi dentali",
    description: "Tartaro, alitosi, gengiviti e problemi di igiene orale",
    icon: <Smile className="w-6 h-6" />,
    detailedDescription: "I problemi dentali nei pets possono portare a infezioni, dolore e problemi sistemici. La prevenzione attraverso alimentazione e igiene è fondamentale.",
    profileHelp: "Il profilo del tuo pet ci aiuta a identificare predisposizioni dentali della razza e a consigliare soluzioni preventive appropriate per età e taglia.",
    recommendations: [
      "Crocchette con texture speciale per pulizia meccanica",
      "Snack dentali con ingredienti antibatterici",
      "Integratori con enzimi per combattere la placca",
      "Additivi per l'acqua per igiene orale quotidiana"
    ],
    nutritionalAdvice: "Alimenti secchi con texture croccante per stimolare la masticazione. Evitare cibi appiccicosi che favoriscono l'accumulo di placca.",
    color: "bg-purple-50 border-purple-200"
  },
  {
    id: "digestive",
    name: "Problemi digestivi",
    description: "Diarrea, stipsi, reflusso gastrico e sensibilità intestinale",
    icon: <Heart className="w-6 h-6" />,
    detailedDescription: "I disturbi gastrointestinali possono essere acuti o cronici e richiedono un approccio nutrizionale specifico per ripristinare l'equilibrio intestinale.",
    profileHelp: "Attraverso il profilo personalizzato, identifichiamo trigger digestivi specifici e creiamo un piano alimentare che supporta la salute gastrointestinale del tuo pet.",
    recommendations: [
      "Alimenti ipoallergenici facilmente digeribili",
      "Probiotici multi-ceppo per riequilibrare la flora",
      "Prebiotici per nutrire i batteri benefici",
      "Fibre solubili per regolarizzare il transito"
    ],
    nutritionalAdvice: "Dieta bland temporanea seguita da reintroduzione graduale. Piccoli pasti frequenti per non sovraccaricare il sistema digestivo.",
    color: "bg-pink-50 border-pink-200"
  },
  {
    id: "metabolic",
    name: "Problemi metabolici e ormonali",
    description: "Diabete, ipotiroidismo, sindrome di Cushing e squilibri ormonali",
    icon: <Dna className="w-6 h-6" />,
    detailedDescription: "I disturbi metabolici e ormonali richiedono un controllo nutrizionale preciso per gestire glicemia, metabolismo e funzione endocrina.",
    profileHelp: "Il profilo del tuo pet ci permette di monitorare parametri metabolici e creare piani nutrizionali che supportano la terapia medica specifica.",
    recommendations: [
      "Alimenti a basso indice glicemico per diabetici",
      "Integratori con cromo per il metabolismo glucidico",
      "Supporto tiroideo con iodio e selenio",
      "Antiossidanti per proteggere dalle complicanze"
    ],
    nutritionalAdvice: "Controllo rigoroso dei carboidrati con pasti regolari. Monitoraggio costante dei parametri metabolici.",
    color: "bg-yellow-50 border-yellow-200"
  },
  {
    id: "stress",
    name: "Stress e ansia",
    description: "Ansia da separazione, stress ambientale e problemi comportamentali",
    icon: <Brain className="w-6 h-6" />,
    detailedDescription: "Lo stress cronico nei pets può influenzare sistema immunitario, digestione e comportamento. Un supporto nutrizionale mirato può aiutare significativamente.",
    profileHelp: "Conoscendo personalità, ambiente e storia del tuo pet, possiamo identificare trigger di stress e fornire supporto nutrizionale per promuovere calma e benessere.",
    recommendations: [
      "Integratori con L-teanina per rilassamento naturale",
      "Probiotici specifici per l'asse intestino-cervello",
      "Omega-3 per supportare la funzione cerebrale",
      "Estratti vegetali calmanti come valeriana e passiflora"
    ],
    nutritionalAdvice: "Dieta ricca di triptofano e magnesio per favorire la produzione di serotonina. Evitare stimolanti e additivi artificiali.",
    color: "bg-indigo-50 border-indigo-200"
  },
  {
    id: "muscle",
    name: "Problemi muscolari",
    description: "Debolezza muscolare, sarcopenia e perdita di massa magra",
    icon: <Activity className="w-6 h-6" />,
    detailedDescription: "I problemi muscolari possono derivare da età, inattività, malattie o carenze nutrizionali. Richiedono supporto proteico e nutrizionale specifico.",
    profileHelp: "Basandoci su età, razza e livello di attività, possiamo calcolare il fabbisogno proteico ottimale e creare un piano per mantenere la massa muscolare.",
    recommendations: [
      "Alimenti ad alto contenuto proteico di qualità",
      "Integratori con aminoacidi essenziali",
      "Creatina per supportare la funzione muscolare",
      "Vitamina D per assorbimento del calcio"
    ],
    nutritionalAdvice: "Aumentare proteine di alta qualità distribuite in più pasti. Includere aminoacidi ramificati per il recupero muscolare.",
    color: "bg-teal-50 border-teal-200"
  },
  {
    id: "urinary",
    name: "Problemi urinari",
    description: "Cistiti, calcoli urinari, incontinenza e infezioni del tratto urinario",
    icon: <Droplets className="w-6 h-6" />,
    detailedDescription: "I problemi urinari sono comuni nei pets e possono essere prevenuti o gestiti con un'alimentazione appropriata che controlla pH e minerali.",
    profileHelp: "Il profilo del tuo pet ci aiuta a identificare fattori di rischio per problemi urinari e a creare un piano alimentare preventivo personalizzato.",
    recommendations: [
      "Alimenti formulati per la salute urinaria",
      "Integratori con cranberry per prevenire infezioni",
      "Supporto per il pH urinario ottimale",
      "Aumentato contenuto di umidità per diluire l'urina"
    ],
    nutritionalAdvice: "Controllo del contenuto di minerali come magnesio e fosforo. Aumentare l'assunzione di acqua con cibi umidi.",
    color: "bg-cyan-50 border-cyan-200"
  }
];

export const BeyondNutritionWellness = () => {
  const [selectedIssue, setSelectedIssue] = useState<HealthIssue | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (issue: HealthIssue) => {
    setSelectedIssue(issue);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedIssue(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center mb-6">
            <div className="p-3 bg-orange-100 rounded-full mr-4">
              <Heart className="w-8 h-8 text-orange-600" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 font-inter">
              Oltre l'Alimentazione:
            </h1>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6 font-inter">
            Benessere Completo e Personalizzato
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-inter">
            Ogni animale è unico. Specificando il profilo del tuo pet, possiamo creare percorsi di benessere 
            personalizzati che vanno oltre la semplice alimentazione, includendo consigli nutrizionali mirati, 
            integratori specifici e prodotti su misura per le sue esigenze individuali.
          </p>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-3xl shadow-xl p-8 md:p-12 mb-16"
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-6">
                <div className="p-2 bg-orange-100 rounded-lg mr-3">
                  <Shield className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 font-inter">
                  Il Potere del Profilo Personalizzato
                </h3>
              </div>
              <p className="text-gray-600 mb-6 font-inter leading-relaxed">
                Una volta specificato il profilo del tuo animale, il nostro sistema intelligente analizza 
                razza, età, peso, condizioni mediche e stile di vita per creare corsie di benessere dedicate.
              </p>
              <div className="space-y-4">
                {[
                  "Alimentazione mirata per condizioni specifiche",
                  "Consigli nutrizionali personalizzati",
                  "Integratori formulati su misura",
                  "Prodotti specifici per ogni esigenza"
                ].map((item, index) => (
                  <div key={index} className="flex items-center">
                    <ChevronRight className="w-5 h-5 text-primary mr-3" />
                    <span className="text-gray-700 font-inter">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-8 relative overflow-hidden">
                <div className="absolute top-4 right-4">
                  <Sparkles className="w-8 h-8 text-orange-400" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-4 font-inter">
                  Corsie di Benessere
                </h4>
                <p className="text-gray-600 font-inter">
                  Ogni condizione di salute attiva una corsia specifica con raccomandazioni 
                  personalizzate per alimenti, integratori e trattamenti mirati.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Health Categories Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-4 font-inter">
            Aree di Specializzazione
          </h3>
          <p className="text-center text-gray-600 mb-12 font-inter">
            Seleziona l'area di interesse per scoprire soluzioni personalizzate
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {healthIssues.map((issue, index) => (
              <motion.div
                key={issue.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <Card 
                  className={`h-full cursor-pointer transition-all duration-300 hover:shadow-xl border-2 ${issue.color} hover:border-primary`}
                  onClick={() => openModal(issue)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="p-3 bg-white rounded-xl shadow-sm group-hover:shadow-md transition-shadow">
                        <div className="text-primary">
                          {issue.icon}
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardTitle className="text-lg font-bold text-gray-900 mb-2 font-inter group-hover:text-primary transition-colors">
                      {issue.name}
                    </CardTitle>
                    <CardDescription className="text-sm text-gray-600 font-inter leading-relaxed">
                      {issue.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-gradient-to-r from-primary to-orange-600 rounded-3xl p-12 text-center text-white"
        >
          <h3 className="text-3xl font-bold mb-6 font-inter">
            Inizia il Percorso di Benessere del Tuo Pet
          </h3>
          <p className="text-xl mb-8 font-inter opacity-90">
            Crea un profilo personalizzato e scopri soluzioni su misura per il benessere del tuo animale
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-primary hover:bg-gray-100 px-8 py-4 text-lg font-semibold font-inter"
            >
              Crea il Profilo del Tuo Animale
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-primary px-8 py-4 text-lg font-semibold font-inter"
            >
              Scopri Tutte le Soluzioni
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && selectedIssue && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <button
                  onClick={closeModal}
                  className="absolute top-6 right-6 z-10 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                >
                  <X className="w-6 h-6 text-gray-600" />
                </button>
                
                <div className="p-8 md:p-12">
                  <div className="flex items-center mb-6">
                    <div className="p-4 bg-orange-100 rounded-2xl mr-4">
                      <div className="text-primary">
                        {selectedIssue.icon}
                      </div>
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-gray-900 font-inter">
                        {selectedIssue.name}
                      </h2>
                      <p className="text-gray-600 font-inter">
                        {selectedIssue.description}
                      </p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4 font-inter">
                        Descrizione Dettagliata
                      </h3>
                      <p className="text-gray-600 mb-6 font-inter leading-relaxed">
                        {selectedIssue.detailedDescription}
                      </p>
                      
                      <h3 className="text-xl font-bold text-gray-900 mb-4 font-inter">
                        Come il Profilo Personalizzato Aiuta
                      </h3>
                      <p className="text-gray-600 font-inter leading-relaxed">
                        {selectedIssue.profileHelp}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4 font-inter">
                        Raccomandazioni Specifiche
                      </h3>
                      <div className="space-y-3 mb-6">
                        {selectedIssue.recommendations.map((rec, index) => (
                          <div key={index} className="flex items-start">
                            <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span className="text-gray-600 font-inter">{rec}</span>
                          </div>
                        ))}
                      </div>

                      <h3 className="text-xl font-bold text-gray-900 mb-4 font-inter">
                        Consigli Nutrizionali
                      </h3>
                      <div className="bg-orange-50 rounded-xl p-4 mb-6">
                        <p className="text-gray-700 font-inter leading-relaxed">
                          {selectedIssue.nutritionalAdvice}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button 
                        size="lg" 
                        className="bg-primary hover:bg-orange-600 px-8 py-4 text-lg font-semibold font-inter"
                      >
                        Crea Pacchetto Personalizzato
                      </Button>
                      <Button 
                        size="lg" 
                        variant="outline" 
                        className="border-primary text-primary hover:bg-primary hover:text-white px-8 py-4 text-lg font-semibold font-inter"
                      >
                        Consulta uno Specialista
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};