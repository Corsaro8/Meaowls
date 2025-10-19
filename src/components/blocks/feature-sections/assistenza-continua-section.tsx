import { Headphones } from "lucide-react";

export const AssistenzaContinuaSection = () => {
  return (
    <section className="relative py-3 bg-[#FFA64D] !w-full !h-[275px]">
      <div className="px-4 !w-full !h-[265px]">
        <div className="p-6 lg:p-8 text-center text-gray-800 !w-full !h-[268px]">
          <div className="flex justify-center mb-4">
            <div className="bg-white/20 p-3 rounded-2xl">
              <Headphones className="h-10 w-10 text-gray-700" />
            </div>
          </div>
          <h3 className="text-xl lg:text-2xl font-bold mb-3">Assistenza Continua</h3>
          <p className="text-base opacity-90 mx-auto leading-relaxed !w-[672px] !h-[57px] !max-w-2xl">
            Il nostro servizio clienti specializzato è sempre al tuo fianco. Hai domande sulla nutrizione del tuo pet?
            Dubbi su quale prodotto scegliere? I nostri esperti sono pronti ad aiutarti 7 giorni su 7.
          </p>
        </div>
      </div>
    </section>);
};