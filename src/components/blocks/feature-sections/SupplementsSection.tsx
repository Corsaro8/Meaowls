"use client";

import { motion } from "@/lib/framer-motion-shim";

export const SupplementsSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const supplements = [
  "Omega-3 per pelle e pelo lucido",
  "Probiotici per digestione sana",
  "Glucosamina per articolazioni forti",
  "Vitamine per sistema immunitario",
  "Antiossidanti per longevità"];


  return (
    <motion.section
      className="py-6 px-4 bg-gradient-to-br from-secondary/30 to-background"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      viewport={{ once: true }}>

      <div className="max-w-6xl mx-auto">
        <motion.div className="text-center mb-8" variants={itemVariants}>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
            Integrare per una vita più sana e felice
          </h2>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto">
            Gli integratori naturali completano l'alimentazione del tuo pet, garantendo tutti i nutrienti essenziali per il suo benessere quotidiano.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <motion.div className="space-y-2" variants={itemVariants}>
            <div className="space-y-4 !w-[568px] !h-[194px]">
              <h3 className="text-2xl font-semibold text-foreground">
                Il supporto nutrizionale che meritano
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Anche con la migliore alimentazione, i nostri amici a quattro zampe possono beneficiare di un supporto nutrizionale mirato.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Dalla crescita alla maturità, ogni pet ha bisogni nutrizionali
                unici che richiedono un'attenzione particolare per mantenerli
                sempre in forma ottimale.
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="text-xl font-medium text-foreground">
                Integratori essenziali:
              </h4>
              <ul className="space-y-3">
                {supplements.map((supplement, index) =>
                <motion.li
                  key={index}
                  className="text-muted-foreground"
                  variants={itemVariants}
                  transition={{ delay: index * 0.1 }}>

                    <span>{supplement}</span>
                  </motion.li>
                )}
              </ul>
            </div>

            <motion.div className="pt-6" variants={itemVariants}>
              <motion.button
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 px-8 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}>

                Scopri gli integratori
              </motion.button>
            </motion.div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <div className="bg-card rounded-lg p-8 shadow-lg">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                  <div className="w-8 h-8 bg-primary rounded-full"></div>
                </div>
                <h3 className="text-xl font-semibold text-card-foreground mb-2">
                  Integratori Premium
                </h3>
                <p className="text-muted-foreground">
                  Formulati da veterinari esperti
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center py-3">
                  <span className="text-muted-foreground">Ingredienti naturali</span>
                  <span className="text-success font-medium">100%</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-muted-foreground">Controllo qualità</span>
                  <span className="text-success font-medium">Certificato</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-muted-foreground">Sicurezza</span>
                  <span className="text-success font-medium">Garantita</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-muted-foreground">Risultati visibili</span>
                  <span className="text-success font-medium">2-4 settimane</span>
                </div>
              </div>

              <div className="mt-8 pt-6">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-3">
                    Consigliato da oltre
                  </p>
                  <p className="text-2xl font-bold text-primary">
                    500+ veterinari
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>);

};