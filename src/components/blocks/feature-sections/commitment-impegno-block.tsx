import { Heart, Leaf, Award, Shield } from "lucide-react";

export function CommitmentImpegnoBlock() {
  const commitments = [
  {
    icon: Heart,
    title: "Benessere al Primo Posto",
    description:
    "Il benessere dei tuoi animali è la nostra priorità. Ogni prodotto è selezionato per garantire salute e felicità.",
    color: "orange"
  },
  {
    icon: Leaf,
    title: "Sostenibilità e Qualità",
    description:
    "Scegliamo solo prodotti sostenibili e di alta qualità, rispettando l'ambiente e i tuoi amici a quattro zampe.",
    color: "green"
  },
  {
    icon: Award,
    title: "Eccellenza nel Servizio",
    description:
    "Il nostro impegno è offrirti un servizio impeccabile, dalla selezione alla consegna, con attenzione a ogni dettaglio.",
    color: "blue"
  },
  {
    icon: Shield,
    title: "Trasparenza e Fiducia",
    description:
    "Crediamo nella trasparenza totale. Ogni scelta è chiara e ogni prodotto è certificato per la tua tranquillità.",
    color: "purple"
  }];

  const iconColorClasses = {
    orange: "text-orange-500",
    green: "text-green-500",
    blue: "text-blue-500",
    purple: "text-purple-500"
  };

  return (
    <section className="bg-orange-50">
      <div className="grid grid-cols-1 md:grid-cols-2 min-h-[300px] md:min-h-[400px]">
        {/* Colonna sinistra: immagine che copre tutto */}
        <div className="relative h-full min-h-[250px] md:min-h-[400px]">
          <img
            src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/d1111b7e-c722-4451-bcb9-81243c18f800/generated_images/professional-photograph-of-a-happy-golde-ec3be676-20251007211759.jpg"
            alt="Cane felice"
            className="object-cover w-full h-full" />
        </div>

        {/* Colonna destra: testo con padding */}
        <div className="flex flex-col justify-between px-6 md:px-10 py-6 md:py-8">
          <div className="space-y-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                Il Nostro Impegno
              </h2>
              <p className="text-base text-gray-600 mb-4">
                Ogni giorno lavoriamo con passione per garantire il meglio ai tuoi animali
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {commitments.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={index} className="flex flex-col items-start text-left p-6 bg-white rounded-lg border border-gray-200 hover:border-orange-200 transition-all duration-200 h-full">
                    <div className={`mb-4 ${iconColorClasses[item.color as keyof typeof iconColorClasses]}`}>
                      <Icon className="w-10 h-10" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-base font-semibold text-gray-900 mb-2">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>);

              })}
            </div>
          </div>
        </div>
      </div>
    </section>);

}