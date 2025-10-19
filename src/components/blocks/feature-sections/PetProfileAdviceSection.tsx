import { 
  Heart, 
  Scale, 
  Activity, 
  Calendar, 
  Ruler, 
  AlertTriangle, 
  Shield, 
  FileText,
  ArrowRight,
  Sparkles,
  Target,
  Award
} from 'lucide-react'

export const PetProfileAdviceSection = () => {
  const analysisParameters = [
    {
      icon: Heart,
      title: "Razza",
      description: "Caratteristiche specifiche della razza"
    },
    {
      icon: Calendar,
      title: "Età",
      description: "Fase di vita del tuo pet"
    },
    {
      icon: Ruler,
      title: "Taglia",
      description: "Dimensioni e struttura fisica"
    },
    {
      icon: Scale,
      title: "Peso",
      description: "Peso ideale e controllo"
    },
    {
      icon: Activity,
      title: "Movimento",
      description: "Livello di attività quotidiana"
    },
    {
      icon: AlertTriangle,
      title: "Allergie",
      description: "Reazioni allergiche note"
    },
    {
      icon: Shield,
      title: "Intolleranze",
      description: "Sensibilità alimentari"
    },
    {
      icon: FileText,
      title: "Storia Clinica",
      description: "Condizioni mediche pregresse"
    }
  ]

  const benefits = [
    {
      icon: Target,
      title: "Raccomandazioni Brand Personalizzate",
      description: "Suggerimenti mirati sui migliori marchi per il tuo pet"
    },
    {
      icon: Award,
      title: "Caratteristiche Specifiche di Razza",
      description: "Consigli basati sulle esigenze della razza del tuo animale"
    }
  ]

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-orange-50 via-white to-amber-50">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Sparkles className="h-4 w-4" />
            Profilo Personalizzato
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 font-heading">
            Consigli Personalizzati per il Tuo Pet
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Crea un profilo dettagliato del tuo amico a quattro zampe per ricevere 
            raccomandazioni sui brand più adatti e consigli specifici per la sua razza
          </p>
        </div>

        {/* Analysis Parameters Grid */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-gray-900 text-center mb-12">
            I Nostri Parametri di Analisi
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {analysisParameters.map((param, index) => {
              const IconComponent = param.icon
              return (
                <div 
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="bg-orange-50 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <IconComponent className="h-6 w-6 text-orange-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    {param.title}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {param.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mb-12">
          <h3 className="text-2xl font-semibold text-gray-900 text-center mb-12">
            Cosa Ottieni
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon
              return (
                <div 
                  key={index}
                  className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
                >
                  <div className="bg-gradient-to-br from-orange-500 to-amber-500 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-3">
                    {benefit.title}
                  </h4>
                  <p className="text-gray-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl p-8 lg:p-12 shadow-xl">
            <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
              Pronto a Iniziare?
            </h3>
            <p className="text-orange-100 mb-8 text-lg max-w-2xl mx-auto">
              Crea subito la scheda del tuo pet e scopri i consigli personalizzati che abbiamo per lui
            </p>
            <button className="bg-white text-orange-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-50 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 inline-flex items-center gap-3 group">
              Inizia a Creare la Scheda del Tuo Pet
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}