import React from 'react';
import { Clock, Weight, Shield, User, AlertTriangle, Stethoscope } from 'lucide-react';

export const ProblemsWeSolveSection = () => {
  const problems = [
    {
      icon: Clock,
      title: "Tempo Sprecato negli Acquisti",
      description: "Basta perdere ore nei negozi di animali, cercando tra scaffali infiniti e facendo code interminabili. Il tempo è prezioso e dovrebbe essere dedicato a giocare con il tuo pet, non a fare la spesa.",
      gradient: "from-orange-100 to-amber-50"
    },
    {
      icon: Weight,
      title: "Fatica nel Trasporto",
      description: "Mai più sacchi pesanti da trascinare dal negozio all'auto e poi fino a casa. I sacchi da 15-20kg di crocchette sono un vero peso, letteralmente. Noi li portiamo direttamente alla tua porta.",
      gradient: "from-blue-100 to-indigo-50"
    },
    {
      icon: Shield,
      title: "Incertezza sulla Qualità",
      description: "Non sai mai se stai scegliendo il prodotto giusto per il tuo amico. Ingredient misteriosi, marche sconosciute e dubbi sulla freschezza ti fanno perdere sonno. Noi garantiamo solo il meglio.",
      gradient: "from-green-100 to-emerald-50"
    },
    {
      icon: User,
      title: "Mancanza di Personalizzazione",
      description: "Ogni pet è unico ma spesso compri sempre la stessa marca generica. Età, taglia, allergie e preferenze del tuo pet meritano un'alimentazione su misura, non soluzioni standard.",
      gradient: "from-purple-100 to-violet-50"
    },
    {
      icon: AlertTriangle,
      title: "Scorte Inconsistenti",
      description: "Ti ritrovi sempre con la ciotola vuota e il negozio chiuso? O accumuli montagne di cibo per paura di restare senza? Con noi non rimarrai mai senza, ma nemmeno con eccessi inutili.",
      gradient: "from-red-100 to-rose-50"
    },
    {
      icon: Stethoscope,
      title: "Mancanza di Consulenza Professionale",
      description: "Hai dubbi nutrizionali ma il commesso del negozio non è un esperto? Le esigenze alimentari del tuo pet cambiano nel tempo e servono consigli qualificati, non improvvisazione."
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-orange-50 to-amber-50">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            I Problemi che Risolviamo per Te
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Meaowls nasce dalla comprensione profonda delle sfide quotidiane che ogni proprietario di animali domestici affronta. 
            Abbiamo identificato e risolto i problemi più comuni per rendere la cura del tuo pet più semplice e serena.
          </p>
        </div>

        {/* Problems Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {problems.map((problem, index) => {
            const IconComponent = problem.icon;
            return (
              <div
                key={index}
                className={`bg-gradient-to-br ${problem.gradient || 'from-orange-100 to-amber-50'} border border-border rounded-2xl p-8 transition-all duration-300 hover:shadow-2xl hover:scale-105 hover:border-primary/30 group`}
              >
                <div className="flex flex-col items-start h-full">
                  <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-8 h-8 text-primary-foreground" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors duration-300">
                    {problem.title}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed text-lg flex-grow">
                    {problem.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Value Proposition */}
        <div className="bg-white border border-border rounded-3xl p-12 text-center shadow-xl">
          <h3 className="text-3xl font-bold text-foreground mb-6">
            La Soluzione è Più Semplice di Quanto Pensi
          </h3>
          <p className="text-xl text-muted-foreground mb-8 max-w-4xl mx-auto leading-relaxed">
            Con Meaowls, trasformiamo ogni problema in un'opportunità per rendere la vita con il tuo pet più bella. 
            Un servizio pensato da pet owner per pet owner, che comprende davvero le tue esigenze quotidiane.
          </p>
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-primary to-orange-600 text-primary-foreground px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <span>Scopri come possiamo aiutarti</span>
            <div className="w-2 h-2 bg-primary-foreground rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};