import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"

export const ComesFunziona = () => {
  const steps = [
    {
      number: "1",
      title: "Scegli",
      description: "Seleziona i prodotti per il tuo pet"
    },
    {
      number: "2", 
      title: "Scegli la scadenza",
      description: "Scegli la scadenza: ogni settimana, ogni due, ogni tre e abbonati al servizio che si occuperà da qui in avanti del cibo del tuo pet."
    },
    {
      number: "3",
      title: "Ricevi",
      description: "Il pacco arriva direttamente a casa"
    }
  ]

  return (
    <section className="bg-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-xl md:text-2xl font-semibold text-[#2D3748] text-center mb-8">
          Il nostro servizio
        </h2>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
          {steps.map((step, index) => {
            return (
              <>
                <Card className="bg-white shadow-md rounded-lg p-4 text-center hover:scale-105 transition-transform duration-300 max-w-xs">
                  <CardContent className="p-0">
                    <div className="flex flex-col items-center space-y-3">
                      <div className="w-12 h-12 bg-[#FF6B35] rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-lg">
                          {step.number}
                        </span>
                      </div>
                      
                      <h3 className="text-lg font-semibold text-[#2D3748]">
                        {step.title}
                      </h3>
                      
                      <p className="text-gray-600 text-sm">
                        {step.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Freccia tra le fasi - solo per desktop e non dopo l'ultimo step */}
                {index < steps.length - 1 && (
                  <div className="hidden md:flex items-center justify-center">
                    <ArrowRight className="w-6 h-6 text-[#FF6B35]" />
                  </div>
                )}
              </>
            )
          })}
        </div>
      </div>
    </section>
  )
}