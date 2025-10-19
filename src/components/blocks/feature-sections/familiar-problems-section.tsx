"use client";

import { Clock, Store, Weight, Package } from "lucide-react";

export function FamiliarProblemsSection() {
  const problems = [
  {
    icon: Clock,
    title: "Sempre di corsaaaaaaa?",
    description: "Trovare il tempo per andare a comprare il cibo per il tuo pet tra lavoro e impegni quotidiani.",
    gradient: "from-blue-100 to-indigo-50"
  },
  {
    icon: Store,
    title: "Negozi chiusi quando servono?",
    description: "Weekend, serate, festivi... proprio quando ti accorgi che le scorte stanno finendo.",
    gradient: "from-purple-100 to-pink-50"
  },
  {
    icon: Weight,
    title: "Sacchi troppo pesanti?",
    description: "Trasportare sacchi da 15kg dalle auto al piano di casa non è mai divertente.",
    gradient: "from-green-100 to-emerald-50"
  },
  {
    icon: Package,
    title: "Cibo finito all'improvviso?",
    description: "Quella sensazione di panico quando ti accorgi che non hai più crocchette.",
    gradient: "from-orange-100 to-amber-50"
  }];


  return (
    <section className="py-10 bg-white">
      <div className="mx-auto px-4 !w-[1152px] !h-full !max-w-6xl">
        
        {/* Problems Grid - Clean Layout with Boxes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {problems.map((problem, index) =>
          <div key={index} className="text-center border border-[#FF6B35] rounded-lg p-4 bg-white hover:shadow-md transition-shadow !w-64 !h-full">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-orange-50 mb-3">
                <problem.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-base font-semibold text-gray-900 mb-1.5">
                {problem.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {problem.description}
              </p>
            </div>
          )}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-8">
          <p className="text-xl text-black">
            È ora di dire addio a questi problemi.{" "}
            <span className="text-primary font-semibold">Meaowls è la soluzione.</span>
          </p>
        </div>
      </div>
    </section>);

}