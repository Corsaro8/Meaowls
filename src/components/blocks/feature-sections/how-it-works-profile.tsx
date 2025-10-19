import { Card } from "@/components/ui/card"

export const HowItWorksProfile = () => {
  const steps = [
    {
      title: "Crea il profilo del tuo pet",
      description: "Inserisci razza, età, peso, sensibilità, intolleranze, allergie e la storia clinica del tuo pet. Ricevi consigli nutrizionali personalizzati su misura per lui."
    },
    {
      title: "Ricevi prodotti personalizzati",
      description: "In base alle specifiche del tuo amico, selezioneremo i migliori prodotti disponibili e te li invieremo comodamente a casa. Zero spreco, massima qualità."
    },
    {
      title: "Monitora i risultati",
      description: "Tieni traccia del benessere del tuo pet attraverso la nostra app. Modifica il piano quando necessario e ricevi sempre nuovi consigli dal nostro team di esperti."
    }
  ]

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-background to-secondary/30">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Come funziona
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Tre semplici passaggi per prenderti cura del tuo amico a quattro zampe come un vero professionista
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connection arrows for desktop */}
          <div className="hidden md:block absolute top-16 left-1/3 transform -translate-x-1/2 w-1/3">
            <div className="h-0.5 bg-gradient-to-r from-primary/60 to-primary/30 relative">
              <div className="absolute -right-1 top-1/2 transform -translate-y-1/2 w-2 h-2 rotate-45 bg-primary/60"></div>
            </div>
          </div>
          <div className="hidden md:block absolute top-16 right-1/3 transform translate-x-1/2 w-1/3">
            <div className="h-0.5 bg-gradient-to-r from-primary/60 to-primary/30 relative">
              <div className="absolute -right-1 top-1/2 transform -translate-y-1/2 w-2 h-2 rotate-45 bg-primary/60"></div>
            </div>
          </div>

          {steps.map((step, index) => (
            <div key={index} className="relative">
              <Card className="p-6 h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-card/80 backdrop-blur-sm">
                {/* Step number */}
                <div className="w-12 h-12 bg-gradient-to-r from-primary to-primary/80 text-white rounded-full flex items-center justify-center font-bold text-lg mb-4 shadow-lg">
                  {index + 1}
                </div>
                
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {step.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </Card>
              
              {/* Mobile arrow */}
              {index < steps.length - 1 && (
                <div className="md:hidden flex justify-center my-6">
                  <div className="w-0.5 h-8 bg-gradient-to-b from-primary/60 to-primary/30 relative">
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 rotate-45 bg-primary/60"></div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}