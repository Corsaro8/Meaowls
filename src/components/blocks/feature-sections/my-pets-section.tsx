"use client";

import { PawPrint, Plus, Camera, Edit, Heart, Package, Calendar, Trash2, RefreshCw, CreditCard, User, Mail, Loader2, X, Check, History, ExternalLink, Weight, Cake, Activity, AlertCircle, AlertTriangle, Cross, Stethoscope, Sparkles, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState, useRef, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

const tabs = [
  { id: "pets", label: "I Miei Pet" },
  { id: "account", label: "Account" },
  { id: "storico", label: "Storico" },
  { id: "abbonamenti", label: "Abbonamenti" },
];

interface PetProfile {
  id?: number;
  name?: string;
  petType: 'cane' | 'gatto' | null;
  breed: string;
  weight: string;
  age: string;
  movement: string;
  allergies: string[];
  intolerances: string[];
  sensitivities: string;
  clinicalHistory: string[];
  createdAt: string;
  updatedAt?: string;
  photoUrl?: string;
}

interface PetHistoryEntry {
  id: number;
  petId: number;
  userName: string;
  modificationType: string;
  oldValue: string | null;
  newValue: string | null;
  createdAt: string;
}

interface Subscription {
  id: string;
  createdAt: string;
  status: string;
  products: Array<{
    id: string;
    name: string;
    price: number;
    weight: string;
    animal: string;
    quantity: number;
  }>;
  frequency: number;
  frequencyLabel: string;
  deliveryDay: string;
  deliveryTime: string;
  deliveryTimeLabel: string;
  subtotal: number;
  shippingCost: number;
  total: number;
  nextDelivery: string;
}

// Example Labrador profile
const exampleLabrador: PetProfile = {
  petType: 'cane',
  breed: 'Labrador Retriever',
  weight: '30-35 kg',
  age: '5 anni (Adulto)',
  movement: 'Attivo - 1-2 ore di attività al giorno',
  allergies: ['Pollo', 'Grano'],
  intolerances: ['Lattosio'],
  sensitivities: 'Tende ad avere problemi digestivi con cibi troppo grassi. Preferisce crocchette di taglia media.',
  clinicalHistory: ['Allergie alimentari', 'Sensibilità digestiva'],
  createdAt: new Date().toISOString(),
  photoUrl: undefined
};

export const MyPetsSection = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [pets, setPets] = useState<PetProfile[]>([]);
  const [selectedPet, setSelectedPet] = useState<PetProfile | null>(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const [userName, setUserName] = useState("Maria Rossi");
  const [activeTab, setActiveTab] = useState("pets");
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [accountData, setAccountData] = useState({
    nome: "",
    cognome: "",
    email: "",
    metodoPagamento: ""
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // New states for edit modals
  const [editModalOpen, setEditModalOpen] = useState<string | null>(null);
  const [tempAllergies, setTempAllergies] = useState<string[]>([]);
  const [tempIntolerances, setTempIntolerances] = useState<string[]>([]);
  const [tempSensitivities, setTempSensitivities] = useState("");
  const [tempClinicalHistory, setTempClinicalHistory] = useState<string[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  
  // History state
  const [petHistory, setPetHistory] = useState<PetHistoryEntry[]>([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const [showFullHistory, setShowFullHistory] = useState(false);

  // NEW: State for collapsed/expanded cards
  const [expandedPetIds, setExpandedPetIds] = useState<Set<number>>(new Set());
  const [expandAll, setExpandAll] = useState(false);

  // NEW: States for delete confirmation with countdown
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [deletingPetId, setDeletingPetId] = useState<number | null>(null);

  // NEW: Toggle expand/collapse
  const togglePetExpanded = (petId: number) => {
    const newExpanded = new Set(expandedPetIds);
    if (newExpanded.has(petId)) {
      newExpanded.delete(petId);
    } else {
      newExpanded.add(petId);
    }
    setExpandedPetIds(newExpanded);
  };

  // NEW: Toggle all pets
  const toggleAllPets = () => {
    if (expandAll) {
      // Chiudi tutte
      setExpandedPetIds(new Set());
      setExpandAll(false);
    } else {
      // Apri tutte
      const allPetIds = pets.filter(p => p.id).map(p => p.id!);
      setExpandedPetIds(new Set(allPetIds));
      setExpandAll(true);
    }
  };

  // NEW: Handle delete button click - opens confirmation dialog
  const handleDeleteClick = (petId: number) => {
    setDeletingPetId(petId);
    setDeleteConfirmOpen(true);
  };

  // NEW: Cancel deletion
  const cancelDeletion = () => {
    setDeleteConfirmOpen(false);
    setDeletingPetId(null);
  };

  // NEW: Execute actual deletion - wrapped in useCallback
  const executePetDeletion = useCallback(async (petId: number) => {
    try {
      const response = await fetch(`/api/pets/${petId}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete pet');
      }
      
      // Remove pet from local state
      const updatedPets = pets.filter(p => p.id !== petId);
      setPets(updatedPets);
      
      // Select a different pet if the deleted one was selected
      if (selectedPet?.id === petId) {
        setSelectedPet(updatedPets.length > 0 ? updatedPets[0] : null);
      }
      
      toast.success('Profilo pet eliminato con successo');
      setDeleteConfirmOpen(false);
      setDeletingPetId(null);
    } catch (error) {
      console.error('Error deleting pet:', error);
      toast.error('Errore durante l\'eliminazione del profilo');
      setDeleteConfirmOpen(false);
      setDeletingPetId(null);
    }
  }, [pets, selectedPet]);

  // Common allergie e intolleranze
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

  // Load pets from database
  const loadPetsFromDatabase = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/pets');
      
      if (!response.ok) {
        throw new Error('Failed to load pets');
      }
      
      const data = await response.json();
      
      if (Array.isArray(data) && data.length > 0) {
        setPets(data);
        setSelectedPet(data[0]);
      } else {
        setPets([]);
        setSelectedPet(null);
      }
    } catch (error) {
      console.error('Error loading pets:', error);
      // Fallback to empty state
      setPets([]);
      setSelectedPet(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Load pet history
  const loadPetHistory = async (petId: number) => {
    try {
      setIsLoadingHistory(true);
      const response = await fetch(`/api/pets/${petId}/history?limit=10`);
      
      if (!response.ok) {
        throw new Error('Failed to load history');
      }
      
      const data = await response.json();
      setPetHistory(data.history || []);
    } catch (error) {
      console.error('Error loading history:', error);
      setPetHistory([]);
    } finally {
      setIsLoadingHistory(false);
    }
  };

  useEffect(() => {
    // Check URL parameters for tab
    const tabParam = searchParams.get('tab');
    if (tabParam) {
      setActiveTab(tabParam);
    }

    // Check if user is registered
    const userRegistered = localStorage.getItem('userRegistered');
    const savedUserName = localStorage.getItem('userName');
    
    if (userRegistered === 'true') {
      setIsRegistered(true);
      if (savedUserName) {
        setUserName(savedUserName);
      }
    }

    // Load account data from localStorage
    const savedAccountData = localStorage.getItem('accountData');
    if (savedAccountData) {
      setAccountData(JSON.parse(savedAccountData));
    }
    
    // Load pets from database
    loadPetsFromDatabase();

    // Load subscription from localStorage
    const savedSubscription = localStorage.getItem('activeSubscription');
    if (savedSubscription) {
      setSubscription(JSON.parse(savedSubscription));
    }
  }, [searchParams]);

  // Load history when pet is selected
  useEffect(() => {
    if (selectedPet?.id) {
      loadPetHistory(selectedPet.id);
    }
  }, [selectedPet?.id]);

  const handlePhotoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && selectedPet && selectedPet.id) {
      setIsUploadingPhoto(true);
      
      try {
        const reader = new FileReader();
        reader.onloadend = async () => {
          const photoUrl = reader.result as string;
          
          // Update pet in database
          const response = await fetch(`/api/pets/${selectedPet.id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ photoUrl })
          });

          if (!response.ok) {
            throw new Error('Failed to update photo');
          }

          const updatedPet = await response.json();
          
          // Update local state
          const updatedPets = pets.map(p => 
            p.id === selectedPet.id ? updatedPet : p
          );
          setPets(updatedPets);
          setSelectedPet(updatedPet);
        };
        reader.readAsDataURL(file);
      } catch (error) {
        console.error('Error uploading photo:', error);
        alert('Errore durante il caricamento della foto');
      } finally {
        setIsUploadingPhoto(false);
      }
    }
  };

  // Open edit modal
  const openEditModal = (section: string) => {
    if (!selectedPet) return;
    
    setEditModalOpen(section);
    
    if (section === 'allergies') {
      setTempAllergies([...selectedPet.allergies]);
    } else if (section === 'intolerances') {
      setTempIntolerances([...selectedPet.intolerances]);
    } else if (section === 'sensitivities') {
      setTempSensitivities(selectedPet.sensitivities);
    } else if (section === 'clinical') {
      setTempClinicalHistory([...selectedPet.clinicalHistory]);
    }
  };

  // Toggle selection in arrays
  const toggleSelection = (item: string, items: string[], setItems: (items: string[]) => void) => {
    if (items.includes(item)) {
      setItems(items.filter(i => i !== item));
    } else {
      setItems([...items, item]);
    }
  };

  // Save modifications
  const saveModifications = async (section: string) => {
    if (!selectedPet?.id) return;
    
    setIsSaving(true);
    
    try {
      const updates: any = {
        userName: userName || "Sistema"
      };
      
      if (section === 'allergies') {
        updates.allergies = tempAllergies;
      } else if (section === 'intolerances') {
        updates.intolerances = tempIntolerances;
      } else if (section === 'sensitivities') {
        updates.sensitivities = tempSensitivities;
      } else if (section === 'clinical') {
        updates.clinicalHistory = tempClinicalHistory;
      }
      
      const response = await fetch(`/api/pets/${selectedPet.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates)
      });
      
      if (!response.ok) {
        throw new Error('Failed to update pet');
      }
      
      const updatedPet = await response.json();
      
      // Update local state
      const updatedPets = pets.map(p => 
        p.id === selectedPet.id ? updatedPet : p
      );
      setPets(updatedPets);
      setSelectedPet(updatedPet);
      
      // Reload history
      await loadPetHistory(selectedPet.id);
      
      setEditModalOpen(null);
    } catch (error) {
      console.error('Error updating pet:', error);
      alert('Errore durante il salvataggio');
    } finally {
      setIsSaving(false);
    }
  };

  // Render edit modal
  const renderEditModal = () => {
    if (!editModalOpen) return null;

    const modalConfig: any = {
      allergies: {
        title: "Modifica Allergie",
        subtitle: "Seleziona tutte le allergie del tuo pet",
        items: commonAllergies,
        selectedItems: tempAllergies,
        setSelectedItems: setTempAllergies,
        color: "red"
      },
      intolerances: {
        title: "Modifica Intolleranze",
        subtitle: "Seleziona le intolleranze alimentari",
        items: commonIntolerances,
        selectedItems: tempIntolerances,
        setSelectedItems: setTempIntolerances,
        color: "amber"
      },
      sensitivities: {
        title: "Modifica Sensibilità",
        subtitle: "Descrivi le sensibilità particolari",
        color: "purple"
      },
      clinical: {
        title: "Modifica Storia Clinica",
        subtitle: "Seleziona i problemi di salute",
        color: "teal"
      }
    };

    const config = modalConfig[editModalOpen];

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className={`bg-gradient-to-r from-${config.color}-500 to-${config.color}-600 p-6 rounded-t-2xl text-white`}>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-2xl font-bold mb-2">{config.title}</h3>
                <p className="text-white/90">{config.subtitle}</p>
              </div>
              <button
                onClick={() => setEditModalOpen(null)}
                className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          <div className="p-6">
            {editModalOpen === 'sensitivities' ? (
              <div className="space-y-4">
                <textarea
                  value={tempSensitivities}
                  onChange={(e) => setTempSensitivities(e.target.value)}
                  placeholder="Scrivi qui tutte le sensibilità particolari..."
                  className="w-full h-32 border border-gray-200 rounded-lg p-4 resize-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                />
                <Button
                  onClick={() => saveModifications('sensitivities')}
                  disabled={isSaving}
                  className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white"
                >
                  {isSaving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                  Salva Modifiche
                </Button>
              </div>
            ) : editModalOpen === 'clinical' ? (
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-lg mb-4 text-gray-800">
                    Problemi di salute comuni:
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
                    {[...(clinicalProblems.dogs || []), ...(clinicalProblems.cats || [])].map((problem, index) => (
                      <button
                        key={index}
                        onClick={() => toggleSelection(problem, tempClinicalHistory, setTempClinicalHistory)}
                        className={`text-left p-3 rounded-lg border-2 transition-all ${
                          tempClinicalHistory.includes(problem)
                            ? 'bg-teal-500 text-white border-teal-500'
                            : 'bg-white text-gray-700 border-gray-200 hover:border-teal-300'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm">{problem}</span>
                          {tempClinicalHistory.includes(problem) && (
                            <Check className="w-4 h-4" />
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <Button
                  onClick={() => saveModifications('clinical')}
                  disabled={isSaving}
                  className="w-full bg-gradient-to-r from-teal-500 to-teal-600 text-white"
                >
                  {isSaving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                  Salva Storia Clinica ({tempClinicalHistory.length} problemi selezionati)
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {config.items?.map((item: string, index: number) => (
                    <button
                      key={index}
                      onClick={() => toggleSelection(item, config.selectedItems, config.setSelectedItems)}
                      className={`text-left p-3 rounded-lg border-2 transition-all ${
                        config.selectedItems.includes(item)
                          ? `bg-${config.color}-500 text-white border-${config.color}-500`
                          : `bg-white text-gray-700 border-gray-200 hover:border-${config.color}-300`
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm">{item}</span>
                        {config.selectedItems.includes(item) && (
                          <Check className="w-4 h-4" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>

                <Button
                  onClick={() => saveModifications(editModalOpen)}
                  disabled={isSaving}
                  className={`w-full bg-gradient-to-r from-${config.color}-500 to-${config.color}-600 text-white`}
                >
                  {isSaving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                  Salva {config.title.replace('Modifica ', '')} ({config.selectedItems.length} selezionate)
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Render full history modal
  const renderFullHistoryModal = () => {
    if (!showFullHistory) return null;

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-t-2xl text-white">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-2xl font-bold mb-2">Storico Completo Modifiche</h3>
                <p className="text-white/90">Tutte le modifiche al profilo del pet</p>
              </div>
              <button
                onClick={() => setShowFullHistory(false)}
                className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          <div className="p-6">
            {isLoadingHistory ? (
              <div className="text-center py-8">
                <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto mb-4" />
                <p className="text-muted-foreground">Caricamento storico...</p>
              </div>
            ) : petHistory.length === 0 ? (
              <div className="text-center py-8">
                <History className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-muted-foreground">Nessuna modifica registrata</p>
              </div>
            ) : (
              <div className="space-y-4">
                {petHistory.map((entry) => (
                  <div key={entry.id} className="border-l-4 border-primary bg-gray-50 p-4 rounded-r-lg">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-semibold text-foreground">{entry.modificationType}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(entry.createdAt).toLocaleDateString('it-IT', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                        {entry.userName}
                      </span>
                    </div>
                    {entry.oldValue && entry.newValue && (
                      <div className="mt-2 text-sm">
                        <p className="text-gray-600">
                          <span className="font-medium">Da:</span> {entry.oldValue}
                        </p>
                        <p className="text-gray-600">
                          <span className="font-medium">A:</span> {entry.newValue}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Render delete confirmation dialog with countdown
  const renderDeleteConfirmDialog = () => {
    if (!deleteConfirmOpen || !deletingPetId) return null;

    const petToDelete = pets.find(p => p.id === deletingPetId);
    if (!petToDelete) return null;

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl">
          <div className="bg-gradient-to-r from-red-500 to-red-600 p-6 rounded-t-2xl text-white">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                <AlertCircle className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold">Conferma Eliminazione</h3>
            </div>
            <p className="text-white/90 text-sm">
              Stai per eliminare il profilo di {petToDelete.name || petToDelete.breed}
            </p>
          </div>

          <div className="p-6">
            <div className="text-center mb-6">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-red-100 to-red-200 flex items-center justify-center mb-3 mx-auto">
                <AlertTriangle className="w-12 h-12 text-red-600" />
              </div>
              <p className="text-sm text-gray-600 mb-2">
                Questa azione è irreversibile
              </p>
              <p className="text-xs text-gray-500">
                Tutti i dati del pet verranno eliminati permanentemente
              </p>
            </div>

            <div className="space-y-3">
              <Button
                onClick={() => executePetDeletion(deletingPetId)}
                className="w-full bg-red-600 hover:bg-red-700 text-white text-lg py-6"
              >
                <Trash2 className="w-5 h-5 mr-2" />
                Conferma Eliminazione
              </Button>
              
              <Button
                onClick={cancelDeletion}
                variant="outline"
                className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 text-lg py-6"
              >
                <X className="w-5 h-5 mr-2" />
                Annulla
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const handleDeleteSubscription = () => {
    if (confirm('Sei sicuro di voler eliminare questo abbonamento?')) {
      localStorage.removeItem('activeSubscription');
      setSubscription(null);
    }
  };

  const handleEditSubscription = () => {
    // Redirect back to subscription page with current data
    if (subscription) {
      localStorage.setItem('cart', JSON.stringify(subscription.products));
      router.push('/abbonamento');
    }
  };

  // Delete pet function
  const handleDeletePet = async (petId: number) => {
    if (!petId) return;
    
    try {
      const response = await fetch(`/api/pets/${petId}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete pet');
      }
      
      // Remove pet from local state
      const updatedPets = pets.filter(p => p.id !== petId);
      setPets(updatedPets);
      
      // Select a different pet if the deleted one was selected
      if (selectedPet?.id === petId) {
        setSelectedPet(updatedPets.length > 0 ? updatedPets[0] : null);
      }
      
      toast.success('Profilo pet eliminato con successo');
    } catch (error) {
      console.error('Error deleting pet:', error);
      toast.error('Errore durante l\'eliminazione del profilo');
    }
  };

  if (isLoading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto" />
          <p className="text-muted-foreground">Caricamento profili pet...</p>
        </div>
      </div>
    );
  }

  if (!selectedPet && activeTab === "pets") {
    return (
      <div className="w-full">
        {/* Header with Gradient Background */}
        <div className="relative w-full bg-gradient-to-r from-[#C85A2F] via-[#B8863B] to-[#8BA14B] px-6 py-8 md:px-12">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-start gap-4">
              {/* Avatar */}
              <div className="flex-shrink-0">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-xl font-semibold text-[#C85A2F]">
                  {isRegistered ? userName.split(' ').map(n => n[0]).join('').toUpperCase() : '👤'}
                </div>
              </div>

              {/* Welcome Text */}
              <div className="flex-1 text-white">
                <h1 className="mb-2 text-2xl font-bold md:text-3xl">
                  {isRegistered ? `Ciao, ${userName}! 👋` : 'Benvenuto! 👋'}
                </h1>
                <p className="mb-3 text-sm opacity-95 md:text-base">
                  {isRegistered 
                    ? 'Benvenuto nel tuo spazio dedicato. Gestisci i tuoi amici a quattro zampe e i loro prodotti preferiti.'
                    : 'Esplora i profili dei tuoi amici a quattro zampe. Registrati per salvare e gestire i tuoi dati.'}
                </p>
                <div className="flex flex-wrap gap-4 text-xs md:text-sm">
                  {isRegistered ? (
                    <>
                      <div className="flex items-center gap-2">
                        <svg
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        <span>Cliente dal 15/01/2023</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <PawPrint className="h-4 w-4" />
                        <span>{pets.length} pet registrati</span>
                      </div>
                    </>
                  ) : (
                    <div className="flex items-center gap-2">
                      <PawPrint className="h-4 w-4" />
                      <span>{pets.length} pet in esplorazione</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="border-b border-border bg-background">
          <div className="mx-auto max-w-7xl px-6 md:px-12">
            <div className="flex gap-2 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 whitespace-nowrap border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? "border-primary bg-primary text-white"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab.id === "pets" && <PawPrint className="h-4 w-4" />}
                  {tab.id === "storico" && <Package className="h-4 w-4" />}
                  {tab.id === "abbonamenti" && <Calendar className="h-4 w-4" />}
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-6xl px-6 py-6 md:px-8 md:py-8">
          <div className="rounded-xl border-2 border-border bg-white p-8 shadow-lg text-center">
            <PawPrint className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-foreground mb-2">Nessun Pet Registrato</h3>
            <p className="text-muted-foreground mb-6">
              Non hai ancora creato il profilo del tuo pet. Inizia ora per ricevere consigli personalizzati!
            </p>
            <Button 
              onClick={() => router.push('/')}
              className="bg-primary hover:bg-primary/90 text-white"
            >
              Crea il Profilo del Tuo Pet
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Header with Gradient Background */}
      <div className="relative w-full bg-gradient-to-r from-[#C85A2F] via-[#B8863B] to-[#8BA14B] px-6 py-8 md:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-start gap-4">
            {/* Avatar */}
            <div className="flex-shrink-0">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-xl font-semibold text-[#C85A2F]">
                {isRegistered ? userName.split(' ').map(n => n[0]).join('').toUpperCase() : '👤'}
              </div>
            </div>

            {/* Welcome Text */}
            <div className="flex-1 text-white">
              <h1 className="mb-2 text-2xl font-bold md:text-3xl">
                {isRegistered ? `Ciao, ${userName}! 👋` : 'Benvenuto! 👋'}
              </h1>
              <p className="mb-3 text-sm opacity-95 md:text-base">
                {isRegistered 
                  ? 'Benvenuto nel tuo spazio dedicato. Gestisci i tuoi amici a quattro zampe e i loro prodotti preferiti.'
                  : 'Esplora i profili dei tuoi amici a quattro zampe. Registrati per salvare e gestire i tuoi dati.'}
              </p>
              <div className="flex flex-wrap gap-4 text-xs md:text-sm">
                {isRegistered ? (
                  <>
                    <div className="flex items-center gap-2">
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <span>Cliente dal 15/01/2023</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <PawPrint className="h-4 w-4" />
                      <span>{pets.length} pet registrati</span>
                    </div>
                  </>
                ) : (
                  <div className="flex items-center gap-2">
                    <PawPrint className="h-4 w-4" />
                    <span>{pets.length} pet in esplorazione</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="border-b border-border bg-background">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="flex gap-2 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 whitespace-nowrap border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? "border-primary bg-primary text-white"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.id === "pets" && <PawPrint className="h-4 w-4" />}
                {tab.id === "storico" && <Package className="h-4 w-4" />}
                {tab.id === "abbonamenti" && <Calendar className="h-4 w-4" />}
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content Area - Conditional Rendering */}
      <div className="mx-auto max-w-7xl px-6 py-6 md:px-8 md:py-8">
        {/* Pets Tab Content */}
        {activeTab === "pets" && selectedPet && (
          <>
            {/* Header with Selected Pet Name */}
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-orange-600 flex items-center justify-center text-white text-2xl">
                  {selectedPet.petType === 'cane' ? '🐕' : '🐱'}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-foreground md:text-2xl">
                    {selectedPet.name || 'Profilo di'}
                  </h2>
                  {pets.length > 1 && (
                    <p className="text-sm text-muted-foreground">
                      Pet {pets.findIndex(p => p.id === selectedPet.id) + 1} di {pets.length}
                    </p>
                  )}
                </div>
              </div>
              <Button className="bg-primary hover:bg-primary/90 text-white text-sm">
                <Edit className="mr-2 h-4 w-4" />
                Modifica Profilo
              </Button>
            </div>

            {/* NEW LAYOUT: Pet Cards on Left, Profile on Right */}
            <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-6">
              {/* Left Column - Pet Selection Cards */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between px-1">
                  <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">I Miei Pet ({pets.length})</h3>
                  <button
                    onClick={toggleAllPets}
                    className="text-xs font-medium text-primary hover:text-primary/80 transition-colors flex items-center gap-1"
                  >
                    {expandAll ? 'Chiudi Tutte' : 'Apri Tutte'}
                  </button>
                </div>
                
                {/* Pet Cards - Vertical Layout */}
                <div className="space-y-2.5">
                  {pets.map((pet, index) => {
                    const isExpanded = pet.id ? expandedPetIds.has(pet.id) : false;
                    
                    return (
                      <div
                        key={pet.id || index}
                        className={`relative rounded-2xl transition-all duration-300 w-full group ${
                          selectedPet?.id === pet.id
                            ? 'bg-gradient-to-br from-orange-100 to-orange-50 shadow-md ring-2 ring-primary/20'
                            : 'bg-white hover:bg-gradient-to-br hover:from-gray-50 hover:to-orange-50/30 shadow-sm hover:shadow-md border border-border/50'
                        }`}
                      >
                        {/* Delete Button - Changed to use handleDeleteClick */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (pet.id) handleDeleteClick(pet.id);
                          }}
                          className="absolute -top-1.5 -right-1.5 bg-red-500 text-white rounded-full p-1.5 shadow-md hover:bg-red-600 transition-all opacity-0 group-hover:opacity-100 z-10"
                          title="Elimina pet"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                        
                        {/* Selected Badge */}
                        {selectedPet?.id === pet.id && (
                          <div className="absolute -top-1.5 -left-1.5 bg-gradient-to-br from-green-500 to-green-600 text-white rounded-full p-1 shadow-md">
                            <Check className="w-3 h-3" />
                          </div>
                        )}
                        
                        {/* COLLAPSED STATE - Dimezzata e mostra solo il nome */}
                        {!isExpanded && (
                          <button
                            onClick={() => setSelectedPet(pet)}
                            className="w-full p-2 flex items-center justify-between gap-2"
                          >
                            <div className="flex items-center gap-2 flex-1">
                              {/* Pet Icon Circle - Più piccolo */}
                              <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${
                                pet.photoUrl ? 'bg-gray-100' : 'bg-gradient-to-br from-orange-100 to-orange-50'
                              }`}>
                                {pet.photoUrl ? (
                                  <img 
                                    src={pet.photoUrl} 
                                    alt={pet.name || pet.breed}
                                    className="w-full h-full object-cover rounded-full"
                                  />
                                ) : (
                                  <span className="text-sm">
                                    {pet.petType === 'cane' ? '🐕' : '🐱'}
                                  </span>
                                )}
                              </div>
                              
                              {/* Mostra SOLO il nome del pet */}
                              <div className="flex-1 text-left overflow-hidden">
                                <p className="font-semibold text-xs leading-tight line-clamp-1 text-foreground">
                                  {pet.name || 'Senza Nome'}
                                </p>
                              </div>
                            </div>
                            
                            {/* Expand Button */}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                if (pet.id) togglePetExpanded(pet.id);
                              }}
                              className="p-1 hover:bg-primary/10 rounded-lg transition-colors flex-shrink-0"
                              title="Espandi"
                            >
                              <ChevronRight className="w-3.5 h-3.5 text-primary" />
                            </button>
                          </button>
                        )}
                        
                        {/* EXPANDED STATE - Full Card con nome principale */}
                        {isExpanded && (
                          <div className="p-3">
                            <button
                              onClick={() => setSelectedPet(pet)}
                              className="w-full"
                            >
                              <div className="flex items-center gap-3">
                                {/* Pet Photo - Larger */}
                                <div className={`w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 ${
                                  pet.photoUrl ? 'bg-gray-100' : 'bg-gradient-to-br from-orange-100 to-orange-50'
                                }`}>
                                  {pet.photoUrl ? (
                                    <img 
                                      src={pet.photoUrl} 
                                      alt={pet.name || pet.breed}
                                      className="w-full h-full object-cover"
                                    />
                                  ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                      <span className="text-2xl">
                                        {pet.petType === 'cane' ? '🐕' : '🐱'}
                                      </span>
                                    </div>
                                  )}
                                </div>
                                
                                {/* Pet Info - Nome come principale */}
                                <div className="flex-1 text-left overflow-hidden">
                                  <p className="font-semibold text-sm leading-tight line-clamp-1 text-foreground">
                                    {pet.name || 'Senza Nome'}
                                  </p>
                                  <p className="text-xs mt-0.5 line-clamp-1 text-muted-foreground">
                                    {pet.breed}
                                  </p>
                                </div>

                                {/* Arrow Indicator */}
                                {selectedPet?.id === pet.id && (
                                  <div className="flex-shrink-0">
                                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                                      <span className="text-primary text-xs">→</span>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </button>
                            
                            {/* Collapse Button */}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                if (pet.id) togglePetExpanded(pet.id);
                              }}
                              className="w-full mt-2 p-1.5 hover:bg-primary/10 rounded-lg transition-colors flex items-center justify-center gap-1 text-xs text-muted-foreground hover:text-primary"
                            >
                              <span>Riduci</span>
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                  
                  {/* Add New Pet Card */}
                  <button
                    onClick={() => router.push('/')}
                    className="rounded-2xl p-4 border-2 border-dashed border-primary/30 hover:border-primary hover:bg-gradient-to-br hover:from-orange-50/50 hover:to-orange-100/30 transition-all duration-300 flex items-center justify-center gap-2 w-full group"
                  >
                    <div className="w-8 h-8 rounded-full bg-primary/10 group-hover:bg-primary/20 flex items-center justify-center transition-colors">
                      <Plus className="w-4 h-4 text-primary" />
                    </div>
                    <p className="font-medium text-primary text-sm">Aggiungi Pet</p>
                  </button>
                </div>
              </div>

              {/* Right Column - Pet Profile */}
              <div className="space-y-6">
                <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-md">
                  <div className="grid gap-5 lg:grid-cols-[200px_1fr]">
                    {/* Left Column - Photo */}
                    <div className="lg:col-span-1">
                      <div className="space-y-2.5">
                        {/* Photo Upload Area - Smaller */}
                        <div className="relative mx-auto aspect-square w-full max-w-[200px] overflow-hidden rounded-xl border-2 border-primary bg-gradient-to-br from-orange-100 to-orange-200 shadow-md">
                          {selectedPet.photoUrl ? (
                            <img 
                              src={selectedPet.photoUrl} 
                              alt={selectedPet.breed}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="flex h-full w-full flex-col items-center justify-center text-primary">
                              <PawPrint className="mb-2 h-12 w-12 opacity-40" />
                              <p className="text-sm font-semibold">Nessuna foto</p>
                              <p className="text-xs opacity-70">Aggiungi foto</p>
                            </div>
                          )}
                          
                          {/* Camera Button */}
                          <button
                            onClick={() => fileInputRef.current?.click()}
                            disabled={isUploadingPhoto}
                            className="absolute bottom-2 right-2 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white shadow-md transition-transform hover:scale-110 hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {isUploadingPhoto ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <Camera className="h-4 w-4" />
                            )}
                          </button>
                          
                          <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handlePhotoUpload}
                            className="hidden"
                            disabled={isUploadingPhoto}
                          />
                        </div>

                        {/* Pet Type Badge - Compact */}
                        <div className="flex items-center justify-center gap-2 rounded-lg bg-gray-50 p-2.5 border border-gray-200">
                          <span className="text-2xl">
                            {selectedPet.petType === 'cane' ? '🐕' : '🐱'}
                          </span>
                          <div>
                            <p className="text-xs text-muted-foreground">Tipo</p>
                            <p className="text-sm font-bold capitalize text-foreground">
                              {selectedPet.petType}
                            </p>
                          </div>
                        </div>

                        {/* Registration Date - Compact */}
                        <div className="rounded-lg bg-gray-50 border border-gray-200 p-2.5 text-center">
                          <p className="mb-0.5 text-xs text-muted-foreground">Registrato</p>
                          <p className="text-xs font-semibold text-foreground">
                            {new Date(selectedPet.createdAt).toLocaleDateString('it-IT', {
                              day: '2-digit',
                              month: '2-digit',
                              year: 'numeric'
                            })}
                          </p>
                        </div>

                        {/* Vai ai prodotti button - Compact */}
                        <Button
                          onClick={() => {
                            // Build URL parameters based on pet profile
                            const params = new URLSearchParams();
                            
                            // Animal type
                            params.append('animal', selectedPet.petType || 'cane');
                            
                            // Category - always Crocchette as mandatory
                            params.append('category', 'Crocchette');
                            
                            // Age filter
                            if (selectedPet.age) {
                              const age = selectedPet.age.toLowerCase();
                              if (age.includes('cucciolo') || age.includes('puppy')) {
                                params.append('age', 'cucciolo');
                              } else if (age.includes('anziano') || age.includes('senior')) {
                                params.append('age', 'senior');
                              } else if (age.includes('adulto') || age.includes('adult')) {
                                params.append('age', 'adulto');
                              } else if (age.includes('giovane') || age.includes('young')) {
                                params.append('age', 'giovane');
                              }
                            }
                            
                            // Breed filter
                            if (selectedPet.breed) {
                              params.append('breed', selectedPet.breed);
                            }
                            
                            // Intolerances filter - pass first one if exists
                            if (selectedPet.intolerances && selectedPet.intolerances.length > 0) {
                              params.append('intolerance', selectedPet.intolerances[0]);
                            }
                            
                            // Allergies filter - pass first one if exists
                            if (selectedPet.allergies && selectedPet.allergies.length > 0) {
                              params.append('allergy', selectedPet.allergies[0]);
                            }
                            
                            // Navigate to main products page with filters
                            router.push(`/prodotti?${params.toString()}`);
                          }}
                          className="w-full bg-gradient-to-r from-primary to-orange-600 text-white hover:shadow-md transition-all text-sm py-2"
                        >
                          <Package className="w-3.5 h-3.5 mr-1.5" />
                          Prodotti per Lui
                        </Button>
                      </div>
                    </div>

                    {/* Right Column - Compact Info */}
                    <div className="lg:col-span-1">
                      <div className="space-y-3">
                        {/* Breed - Compact */}
                        <div className="flex items-center gap-2.5 p-3 bg-gray-50 border border-gray-200 rounded-lg">
                          <div className="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center flex-shrink-0">
                            <Heart className="h-4 w-4 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs text-muted-foreground mb-0.5">Razza</p>
                            <p className="text-sm font-semibold text-foreground truncate">
                              {selectedPet.breed}
                            </p>
                          </div>
                        </div>

                        {/* Weight & Age - Compact Grid */}
                        <div className="grid grid-cols-2 gap-2.5">
                          <div className="p-2.5 bg-white border border-gray-200 rounded-lg">
                            <div className="flex items-center gap-2 mb-1">
                              <Weight className="h-3.5 w-3.5 text-gray-500" />
                              <p className="text-xs text-muted-foreground">Peso</p>
                            </div>
                            <p className="text-sm font-semibold text-foreground">{selectedPet.weight}</p>
                          </div>

                          <div className="p-2.5 bg-white border border-gray-200 rounded-lg">
                            <div className="flex items-center gap-2 mb-1">
                              <Cake className="h-3.5 w-3.5 text-gray-500" />
                              <p className="text-xs text-muted-foreground">Età</p>
                            </div>
                            <p className="text-sm font-semibold text-foreground">{selectedPet.age}</p>
                          </div>
                        </div>

                        {/* Activity - Compact */}
                        <div className="p-2.5 bg-white border border-gray-200 rounded-lg">
                          <div className="flex items-center gap-2 mb-1">
                            <Activity className="h-3.5 w-3.5 text-gray-500" />
                            <p className="text-xs text-muted-foreground">Attività</p>
                          </div>
                          <p className="text-xs text-foreground leading-snug">{selectedPet.movement}</p>
                        </div>

                        {/* Allergies - Compact */}
                        <div className="relative p-2.5 bg-white border-l-2 border-red-400 rounded-md shadow-sm">
                          <button
                            onClick={() => openEditModal('allergies')}
                            className="absolute top-2 right-2 p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
                            aria-label="Modifica allergie"
                          >
                            <Edit className="w-3 h-3" />
                          </button>
                          <div className="flex items-center gap-2 mb-1.5 pr-6">
                            <AlertCircle className="h-3.5 w-3.5 text-red-500" />
                            <p className="text-xs font-semibold text-gray-900">Allergie</p>
                          </div>
                          {selectedPet.allergies.length > 0 ? (
                            <div className="flex flex-wrap gap-1.5">
                              {selectedPet.allergies.map((allergy, i) => (
                                <span
                                  key={i}
                                  className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-red-50 text-red-700 border border-red-200"
                                >
                                  {allergy}
                                </span>
                              ))}
                            </div>
                          ) : (
                            <p className="text-xs text-gray-500">Nessuna</p>
                          )}
                        </div>

                        {/* Intolerances - Compact */}
                        <div className="relative p-2.5 bg-white border-l-2 border-amber-400 rounded-md shadow-sm">
                          <button
                            onClick={() => openEditModal('intolerances')}
                            className="absolute top-2 right-2 p-1 text-gray-400 hover:text-amber-500 hover:bg-amber-50 rounded transition-colors"
                            aria-label="Modifica intolleranze"
                          >
                            <Edit className="w-3 h-3" />
                          </button>
                          <div className="flex items-center gap-2 mb-1.5 pr-6">
                            <AlertTriangle className="h-3.5 w-3.5 text-amber-500" />
                            <p className="text-xs font-semibold text-gray-900">Intolleranze</p>
                          </div>
                          {selectedPet.intolerances.length > 0 ? (
                            <div className="flex flex-wrap gap-1.5">
                              {selectedPet.intolerances.map((intolerance, i) => (
                                <span
                                  key={i}
                                  className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-amber-50 text-amber-700 border border-amber-200"
                                >
                                  {intolerance}
                                </span>
                              ))}
                            </div>
                          ) : (
                            <p className="text-xs text-gray-500">Nessuna</p>
                          )}
                        </div>

                        {/* Clinical History - Compact */}
                        <div className="relative p-2.5 bg-white border-l-2 border-teal-400 rounded-md shadow-sm">
                          <button
                            onClick={() => openEditModal('clinical')}
                            className="absolute top-2 right-2 p-1 text-gray-400 hover:text-teal-500 hover:bg-teal-50 rounded transition-colors"
                            aria-label="Modifica storia clinica"
                          >
                            <Edit className="w-3 h-3" />
                          </button>
                          <div className="flex items-center gap-2 mb-1.5 pr-6">
                            <Stethoscope className="h-3.5 w-3.5 text-teal-500" />
                            <p className="text-xs font-semibold text-gray-900">Storia Clinica</p>
                          </div>
                          {selectedPet.clinicalHistory.length > 0 ? (
                            <ul className="space-y-1">
                              {selectedPet.clinicalHistory.map((item, i) => (
                                <li key={i} className="flex items-start gap-1.5 text-xs text-gray-700">
                                  <span className="h-1 w-1 rounded-full bg-teal-500 mt-1.5 flex-shrink-0" />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className="text-xs text-gray-500">Nessuna</p>
                          )}
                        </div>

                        {/* Sensitivities - Compact */}
                        <div className="relative p-2.5 bg-white border-l-2 border-purple-400 rounded-md shadow-sm">
                          <button
                            onClick={() => openEditModal('sensitivities')}
                            className="absolute top-2 right-2 p-1 text-gray-400 hover:text-purple-500 hover:bg-purple-50 rounded transition-colors"
                            aria-label="Modifica sensibilità"
                          >
                            <Edit className="w-3 h-3" />
                          </button>
                          <div className="flex items-center gap-2 mb-1.5 pr-6">
                            <Sparkles className="h-3.5 w-3.5 text-purple-500" />
                            <p className="text-xs font-semibold text-gray-900">Sensibilità</p>
                          </div>
                          {selectedPet.sensitivities ? (
                            <p className="text-xs text-gray-700 leading-relaxed">{selectedPet.sensitivities}</p>
                          ) : (
                            <p className="text-xs text-gray-500">Nessuna</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* History Section - Compact */}
                {petHistory.length > 0 && (
                  <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-md">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <History className="w-4 h-4 text-primary" />
                        <h3 className="text-sm font-bold text-foreground">Ultima Modifica</h3>
                      </div>
                      <button
                        onClick={() => setShowFullHistory(true)}
                        className="text-primary hover:text-primary/80 text-xs font-medium flex items-center gap-1"
                      >
                        Vedi Tutto
                        <ExternalLink className="w-3 h-3" />
                      </button>
                    </div>
                    
                    <div className="border-l-2 border-primary bg-gradient-to-r from-orange-50 to-white p-3 rounded-r-lg">
                      <div className="flex items-start justify-between mb-1.5">
                        <div>
                          <p className="text-sm font-semibold text-foreground">{petHistory[0].modificationType}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(petHistory[0].createdAt).toLocaleDateString('it-IT', {
                              day: '2-digit',
                              month: '2-digit',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                        </div>
                        <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                          {petHistory[0].userName}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </>
        )}

        {/* Storico Tab Content */}
        {activeTab === "storico" && (
          <div>
            <div className="mb-6">
              <h2 className="text-xl font-bold italic text-foreground md:text-2xl">
                Storico Consegne
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Visualizza lo storico delle consegne del tuo abbonamento attivo
              </p>
            </div>

            {subscription ? (
              <div className="space-y-4">
                {/* Prossima Consegna */}
                <div className="rounded-xl border-2 border-primary bg-gradient-to-br from-blue-50 to-purple-50 p-6 shadow-lg">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="h-5 w-5 text-primary" />
                        <h3 className="text-lg font-bold text-foreground">Prossima Consegna</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Prevista per il {new Date(subscription.nextDelivery).toLocaleDateString('it-IT', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })}
                      </p>
                    </div>
                    <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-800">
                      In Arrivo
                    </span>
                  </div>

                  <div className="space-y-3 border-t border-border pt-4">
                    {subscription.products.map((product, index) => (
                      <div key={index} className="flex items-center gap-4">
                        <div className="h-16 w-16 rounded-lg bg-orange-100 flex items-center justify-center">
                          <Package className="h-8 w-8 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-foreground">{product.name}</h4>
                          <p className="text-sm text-muted-foreground">{product.weight} • Quantità: {product.quantity}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-foreground">€{(product.price * product.quantity).toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-border mt-4 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-base font-bold">Totale Consegna</span>
                      <span className="text-xl font-bold text-primary">€{subscription.total.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="mt-4 rounded-lg bg-blue-100 p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm font-semibold text-blue-900">📦 Dettagli Consegna</span>
                    </div>
                    <p className="text-sm text-blue-800 mb-1">
                      <strong>Giorno:</strong> {subscription.deliveryDay}
                    </p>
                    <p className="text-sm text-blue-800">
                      <strong>Orario:</strong> {subscription.deliveryTimeLabel}
                    </p>
                  </div>
                </div>

                {/* Consegne Passate */}
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-4">Consegne Precedenti</h3>
                  
                  <div className="space-y-4">
                    {/* Consegna 3 */}
                    <div className="rounded-xl border-2 border-border bg-white p-6 shadow-lg">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="text-base font-bold text-foreground">Consegna #0003</h4>
                          <p className="text-sm text-muted-foreground">18 Febbraio 2024</p>
                        </div>
                        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800">
                          Consegnato
                        </span>
                      </div>

                      <div className="space-y-3 border-t border-border pt-4">
                        {subscription.products.map((product, index) => (
                          <div key={index} className="flex items-center gap-4">
                            <div className="h-14 w-14 rounded-lg bg-gray-100 flex items-center justify-center">
                              <Package className="h-7 w-7 text-gray-500" />
                            </div>
                            <div className="flex-1">
                              <h5 className="font-semibold text-foreground text-sm">{product.name}</h5>
                              <p className="text-xs text-muted-foreground">{product.weight} • Quantità: {product.quantity}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-sm">€{(product.price * product.quantity).toFixed(2)}</p>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="border-t border-border mt-3 pt-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-muted-foreground">Totale</span>
                          <span className="text-base font-bold text-foreground">€{subscription.total.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Consegna 2 */}
                    <div className="rounded-xl border-2 border-border bg-white p-6 shadow-lg">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="text-base font-bold text-foreground">Consegna #0002</h4>
                          <p className="text-sm text-muted-foreground">18 Gennaio 2024</p>
                        </div>
                        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800">
                          Consegnato
                        </span>
                      </div>

                      <div className="space-y-3 border-t border-border pt-4">
                        {subscription.products.map((product, index) => (
                          <div key={index} className="flex items-center gap-4">
                            <div className="h-14 w-14 rounded-lg bg-gray-100 flex items-center justify-center">
                              <Package className="h-7 w-7 text-gray-500" />
                            </div>
                            <div className="flex-1">
                              <h5 className="font-semibold text-foreground text-sm">{product.name}</h5>
                              <p className="text-xs text-muted-foreground">{product.weight} • Quantità: {product.quantity}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-sm">€{(product.price * product.quantity).toFixed(2)}</p>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="border-t border-border mt-3 pt-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-muted-foreground">Totale</span>
                          <span className="text-base font-bold text-foreground">€{subscription.total.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Consegna 1 */}
                    <div className="rounded-xl border-2 border-border bg-white p-6 shadow-lg">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="text-base font-bold text-foreground">Consegna #0001</h4>
                          <p className="text-sm text-muted-foreground">18 Dicembre 2023</p>
                        </div>
                        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800">
                          Consegnato
                        </span>
                      </div>

                      <div className="space-y-3 border-t border-border pt-4">
                        {subscription.products.map((product, index) => (
                          <div key={index} className="flex items-center gap-4">
                            <div className="h-14 w-14 rounded-lg bg-gray-100 flex items-center justify-center">
                              <Package className="h-7 w-7 text-gray-500" />
                            </div>
                            <div className="flex-1">
                              <h5 className="font-semibold text-foreground text-sm">{product.name}</h5>
                              <p className="text-xs text-muted-foreground">{product.weight} • Quantità: {product.quantity}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-sm">€{(product.price * product.quantity).toFixed(2)}</p>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="border-t border-border mt-3 pt-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-muted-foreground">Totale</span>
                          <span className="text-base font-bold text-foreground">€{subscription.total.toFixed(2)}</span>
                        </div>
                      </div>

                      <div className="mt-3 rounded-lg bg-purple-50 border border-purple-200 p-3">
                        <p className="text-xs text-purple-900">
                          🎉 Prima consegna del tuo abbonamento
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Summary Stats */}
                <div className="rounded-xl border-2 border-border bg-gradient-to-br from-orange-50 to-amber-50 p-6 shadow-lg">
                  <h3 className="text-lg font-bold text-foreground mb-4">Riepilogo Abbonamento</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <p className="text-3xl font-bold text-primary">4</p>
                      <p className="text-sm text-muted-foreground mt-1">Consegne Totali</p>
                    </div>
                    <div className="text-center">
                      <p className="text-3xl font-bold text-primary">3</p>
                      <p className="text-sm text-muted-foreground mt-1">Consegne Completate</p>
                    </div>
                    <div className="text-center col-span-2 md:col-span-1">
                      <p className="text-3xl font-bold text-primary">€{(subscription.total * 3).toFixed(2)}</p>
                      <p className="text-sm text-muted-foreground mt-1">Speso Finora</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="rounded-xl border-2 border-border bg-white p-8 shadow-lg text-center">
                <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-foreground mb-2">Nessuno Storico Disponibile</h3>
                <p className="text-muted-foreground mb-6">
                  Non hai ancora un abbonamento attivo. Crea il tuo primo abbonamento per iniziare a vedere lo storico delle consegne!
                </p>
                <Button 
                  onClick={() => router.push('/prodotti')}
                  className="bg-primary hover:bg-primary/90 text-white"
                >
                  Crea Abbonamento
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Ordini Tab Content */}
        {activeTab === "ordini" && (
          <div>
            <div className="mb-6">
              <h2 className="text-xl font-bold italic text-foreground md:text-2xl">
                I Miei Ordini
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Visualizza lo storico delle consegne del tuo abbonamento
              </p>
            </div>

            {subscription ? (
              <div className="space-y-4">
                {/* Prossima Consegna */}
                <div className="rounded-xl border-2 border-primary bg-gradient-to-br from-blue-50 to-purple-50 p-6 shadow-lg">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="h-5 w-5 text-primary" />
                        <h3 className="text-lg font-bold text-foreground">Prossima Consegna</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Prevista per il {new Date(subscription.nextDelivery).toLocaleDateString('it-IT', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })}
                      </p>
                    </div>
                    <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-800">
                      In Arrivo
                    </span>
                  </div>

                  <div className="space-y-3 border-t border-border pt-4">
                    {subscription.products.map((product, index) => (
                      <div key={index} className="flex items-center gap-4">
                        <div className="h-16 w-16 rounded-lg bg-orange-100 flex items-center justify-center">
                          <Package className="h-8 w-8 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-foreground">{product.name}</h4>
                          <p className="text-sm text-muted-foreground">{product.weight} • Quantità: {product.quantity}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-foreground">€{(product.price * product.quantity).toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-border mt-4 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-base font-bold">Totale Consegna</span>
                      <span className="text-xl font-bold text-primary">€{subscription.total.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="mt-4 rounded-lg bg-blue-100 p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm font-semibold text-blue-900">📦 Dettagli Consegna</span>
                    </div>
                    <p className="text-sm text-blue-800 mb-1">
                      <strong>Giorno:</strong> {subscription.deliveryDay}
                    </p>
                    <p className="text-sm text-blue-800">
                      <strong>Orario:</strong> {subscription.deliveryTimeLabel}
                    </p>
                  </div>
                </div>

                {/* Consegne Passate */}
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-4">Consegne Precedenti</h3>
                  
                  <div className="space-y-4">
                    {/* Consegna 3 */}
                    <div className="rounded-xl border-2 border-border bg-white p-6 shadow-lg">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="text-base font-bold text-foreground">Consegna #0003</h4>
                          <p className="text-sm text-muted-foreground">18 Febbraio 2024</p>
                        </div>
                        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800">
                          Consegnato
                        </span>
                      </div>

                      <div className="space-y-3 border-t border-border pt-4">
                        {subscription.products.map((product, index) => (
                          <div key={index} className="flex items-center gap-4">
                            <div className="h-14 w-14 rounded-lg bg-gray-100 flex items-center justify-center">
                              <Package className="h-7 w-7 text-gray-500" />
                            </div>
                            <div className="flex-1">
                              <h5 className="font-semibold text-foreground text-sm">{product.name}</h5>
                              <p className="text-xs text-muted-foreground">{product.weight} • Quantità: {product.quantity}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-sm">€{(product.price * product.quantity).toFixed(2)}</p>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="border-t border-border mt-3 pt-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-muted-foreground">Totale</span>
                          <span className="text-base font-bold text-foreground">€{subscription.total.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Consegna 2 */}
                    <div className="rounded-xl border-2 border-border bg-white p-6 shadow-lg">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="text-base font-bold text-foreground">Consegna #0002</h4>
                          <p className="text-sm text-muted-foreground">18 Gennaio 2024</p>
                        </div>
                        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800">
                          Consegnato
                        </span>
                      </div>

                      <div className="space-y-3 border-t border-border pt-4">
                        {subscription.products.map((product, index) => (
                          <div key={index} className="flex items-center gap-4">
                            <div className="h-14 w-14 rounded-lg bg-gray-100 flex items-center justify-center">
                              <Package className="h-7 w-7 text-gray-500" />
                            </div>
                            <div className="flex-1">
                              <h5 className="font-semibold text-foreground text-sm">{product.name}</h5>
                              <p className="text-xs text-muted-foreground">{product.weight} • Quantità: {product.quantity}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-sm">€{(product.price * product.quantity).toFixed(2)}</p>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="border-t border-border mt-3 pt-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-muted-foreground">Totale</span>
                          <span className="text-base font-bold text-foreground">€{subscription.total.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Consegna 1 */}
                    <div className="rounded-xl border-2 border-border bg-white p-6 shadow-lg">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="text-base font-bold text-foreground">Consegna #0001</h4>
                          <p className="text-sm text-muted-foreground">18 Dicembre 2023</p>
                        </div>
                        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800">
                          Consegnato
                        </span>
                      </div>

                      <div className="space-y-3 border-t border-border pt-4">
                        {subscription.products.map((product, index) => (
                          <div key={index} className="flex items-center gap-4">
                            <div className="h-14 w-14 rounded-lg bg-gray-100 flex items-center justify-center">
                              <Package className="h-7 w-7 text-gray-500" />
                            </div>
                            <div className="flex-1">
                              <h5 className="font-semibold text-foreground text-sm">{product.name}</h5>
                              <p className="text-xs text-muted-foreground">{product.weight} • Quantità: {product.quantity}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-sm">€{(product.price * product.quantity).toFixed(2)}</p>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="border-t border-border mt-3 pt-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-muted-foreground">Totale</span>
                          <span className="text-base font-bold text-foreground">€{subscription.total.toFixed(2)}</span>
                        </div>
                      </div>

                      <div className="mt-3 rounded-lg bg-purple-50 border border-purple-200 p-3">
                        <p className="text-xs text-purple-900">
                          🎉 Prima consegna del tuo abbonamento
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Summary Stats */}
                <div className="rounded-xl border-2 border-border bg-gradient-to-br from-orange-50 to-amber-50 p-6 shadow-lg">
                  <h3 className="text-lg font-bold text-foreground mb-4">Riepilogo Abbonamento</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <p className="text-3xl font-bold text-primary">4</p>
                      <p className="text-sm text-muted-foreground mt-1">Consegne Totali</p>
                    </div>
                    <div className="text-center">
                      <p className="text-3xl font-bold text-primary">3</p>
                      <p className="text-sm text-muted-foreground mt-1">Consegne Completate</p>
                    </div>
                    <div className="text-center col-span-2 md:col-span-1">
                      <p className="text-3xl font-bold text-primary">€{(subscription.total * 3).toFixed(2)}</p>
                      <p className="text-sm text-muted-foreground mt-1">Speso Finora</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="rounded-xl border-2 border-border bg-white p-8 shadow-lg text-center">
                <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-foreground mb-2">Nessuno Storico Disponibile</h3>
                <p className="text-muted-foreground mb-6">
                  Non hai ancora un abbonamento attivo. Crea il tuo primo abbonamento per iniziare a vedere lo storico delle consegne!
                </p>
                <Button 
                  onClick={() => router.push('/prodotti')}
                  className="bg-primary hover:bg-primary/90 text-white"
                >
                  Crea Abbonamento
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Abbonamenti Tab Content */}
        {activeTab === "abbonamenti" && (
          <div>
            <div className="mb-6">
              <h2 className="text-xl font-bold italic text-foreground md:text-2xl">
                I Miei Abbonamenti
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Gestisci i tuoi abbonamenti attivi
              </p>
            </div>

            {subscription ? (
              <div className="rounded-xl border-2 border-primary bg-gradient-to-br from-white to-orange-50 p-6 shadow-lg">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="h-5 w-5 text-primary" />
                      <h3 className="text-lg font-bold text-foreground">Abbonamento Attivo</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Iniziato il {new Date(subscription.createdAt).toLocaleDateString('it-IT', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800">
                    Attivo
                  </span>
                </div>

                {/* Subscription Details */}
                <div className="space-y-4 border-t border-border pt-4">
                  {/* Products */}
                  {subscription.products.map((product, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className="h-20 w-20 rounded-lg bg-orange-100 flex items-center justify-center">
                        <Package className="h-10 w-10 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground">{product.name}</h4>
                        <p className="text-sm text-muted-foreground">{product.weight} • Quantità: {product.quantity}</p>
                        <p className="text-lg font-bold text-primary mt-1">
                          €{(product.price * product.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}

                  {/* Total */}
                  <div className="rounded-lg bg-white border border-border p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-muted-foreground">Subtotale Prodotti:</span>
                      <span className="text-sm font-medium">€{subscription.subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-muted-foreground">Spedizione:</span>
                      <span className="text-sm font-medium">€{subscription.shippingCost.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t">
                      <span className="text-base font-bold">Totale per consegna:</span>
                      <span className="text-xl font-bold text-primary">€{subscription.total.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Delivery Frequency */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="rounded-lg bg-white border border-border p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <RefreshCw className="h-4 w-4 text-primary" />
                        <span className="text-sm font-semibold text-muted-foreground">Frequenza</span>
                      </div>
                      <p className="text-base font-bold text-foreground">{subscription.frequencyLabel}</p>
                    </div>

                    <div className="rounded-lg bg-white border border-border p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="h-4 w-4 text-primary" />
                        <span className="text-sm font-semibold text-muted-foreground">Prossima Consegna</span>
                      </div>
                      <p className="text-base font-bold text-foreground">
                        {new Date(subscription.nextDelivery).toLocaleDateString('it-IT', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>

                  {/* Delivery Details */}
                  <div className="rounded-lg bg-blue-50 border border-blue-200 p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm font-semibold text-blue-900">📦 Dettagli Consegna</span>
                    </div>
                    <p className="text-sm text-blue-800 mb-1">
                      <strong>Giorno:</strong> {subscription.deliveryDay}
                    </p>
                    <p className="text-sm text-blue-800">
                      <strong>Orario:</strong> {subscription.deliveryTimeLabel}
                    </p>
                  </div>

                  {/* Payment Method */}
                  <div className="rounded-lg bg-purple-50 border border-purple-200 p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm font-semibold text-purple-900">💳 Metodo di Pagamento</span>
                    </div>
                    <p className="text-sm text-purple-800">
                      Carta •••• 4242 - Scadenza 12/2026
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <Button 
                    onClick={handleEditSubscription}
                    className="flex-1 bg-primary hover:bg-primary/90 text-white"
                  >
                    <Edit className="mr-2 h-4 w-4" />
                    Modifica Abbonamento
                  </Button>
                  <Button 
                    onClick={handleDeleteSubscription}
                    variant="outline" 
                    className="flex-1 border-red-300 text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Elimina Abbonamento
                  </Button>
                </div>

                {/* Info Notice */}
                <div className="mt-4 rounded-lg bg-amber-50 border border-amber-200 p-3">
                  <p className="text-xs text-amber-900">
                    ℹ️ Puoi modificare la frequenza, cambiare prodotto o mettere in pausa l'abbonamento in qualsiasi momento. 
                    Le modifiche saranno applicate dalla prossima consegna.
                  </p>
                </div>
              </div>
            ) : (
              <div className="rounded-xl border-2 border-border bg-white p-8 shadow-lg text-center">
                <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-foreground mb-2">Nessun Abbonamento Attivo</h3>
                <p className="text-muted-foreground mb-6">
                  Non hai ancora creato un abbonamento. Inizia a risparmiare con consegne automatiche!
                </p>
                <Button 
                  onClick={() => router.push('/prodotti')}
                  className="bg-primary hover:bg-primary/90 text-white"
                >
                  Crea Abbonamento
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Account Section */}
        {activeTab === "account" && (
          <div className="space-y-6">
            {isRegistered ? (
              <>
                {/* Dati Account Salvati */}
                <Card>
                  <CardHeader>
                    <CardTitle>I Tuoi Dati</CardTitle>
                    <CardDescription>
                      Informazioni del tuo account meaowls
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                        <User className="h-5 w-5 text-muted-foreground mt-0.5" />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-muted-foreground">Nome</p>
                          <p className="text-base font-semibold">{accountData.nome}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                        <User className="h-5 w-5 text-muted-foreground mt-0.5" />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-muted-foreground">Cognome</p>
                          <p className="text-base font-semibold">{accountData.cognome}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                        <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-muted-foreground">Email</p>
                          <p className="text-base font-semibold">{accountData.email}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                        <CreditCard className="h-5 w-5 text-muted-foreground mt-0.5" />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-muted-foreground">Metodo di Pagamento</p>
                          <p className="text-base font-semibold">{accountData.metodoPagamento}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Account Non Registrato</CardTitle>
                  <CardDescription>
                    Registra un account per salvare i tuoi dati e accedere a funzionalità esclusive
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Per creare un account e salvare i tuoi dati, vai alla pagina di registrazione.
                  </p>
                  <Button className="w-full">
                    Vai alla Registrazione
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>

      {/* Render modals */}
      {renderEditModal()}
      {renderFullHistoryModal()}
      {renderDeleteConfirmDialog()}
    </div>
  );
};