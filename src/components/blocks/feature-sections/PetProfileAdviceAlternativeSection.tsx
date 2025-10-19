"use client";

import React from 'react';
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
} from 'lucide-react';

export const PetProfileAdviceAlternativeSection = () => {
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
    <section className="py-16 lg:py-24 bg-gradient-to-b from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* Hero Section with Side Layout */}
        <div className="lg:grid lg:grid-cols-12 lg:gap-16 items-center mb-20">
          
          {/* Left Content */}
          <div className="lg:col-span-5 mb-12 lg:mb-0">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Sparkles className="h-4 w-4" />
              Profilo Personalizzato
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 font-heading leading-tight">
              Consigli Personalizzati per il Tuo Pet
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              Crea un profilo dettagliato del tuo amico a quattro zampe per ricevere 
              raccomandazioni sui brand più adatti e consigli specifici per la sua razza
            </p>
            
            {/* CTA in Hero */}
            <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 inline-flex items-center gap-3 group">
              Inizia a Creare la Scheda del Tuo Pet
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>

          {/* Right Benefits */}
          <div className="lg:col-span-7">
            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-8">
                Cosa Ottieni
              </h3>
              <div className="space-y-6">
                {benefits.map((benefit, index) => {
                  const IconComponent = benefit.icon
                  return (
                    <div 
                      key={index}
                      className="bg-white rounded-2xl p-8 shadow-lg border border-blue-100 hover:shadow-xl transition-all duration-300 hover:scale-105"
                    >
                      <div className="flex items-start gap-6">
                        <div className="bg-gradient-to-br from-blue-500 to-indigo-500 w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0">
                          <IconComponent className="h-8 w-8 text-white" />
                        </div>
                        <div>
                          <h4 className="text-xl font-semibold text-gray-900 mb-3">
                            {benefit.title}
                          </h4>
                          <p className="text-gray-600 leading-relaxed">
                            {benefit.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Analysis Parameters - Horizontal Scroll Layout */}
        <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-xl border border-blue-100">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-semibold text-gray-900 mb-4">
              I Nostri Parametri di Analisi
            </h3>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full"></div>
          </div>
          
          <div className="overflow-x-auto pb-4">
            <div className="flex gap-6 min-w-max lg:grid lg:grid-cols-4 lg:min-w-0 lg:gap-8">
              {analysisParameters.map((param, index) => {
                const IconComponent = param.icon
                return (
                  <div 
                    key={index}
                    className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 w-72 lg:w-auto border border-blue-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-2 group"
                  >
                    <div className="text-center">
                      <div className="bg-gradient-to-br from-blue-500 to-indigo-500 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                        <IconComponent className="h-8 w-8 text-white" />
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-3 text-lg">
                        {param.title}
                      </h4>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {param.description}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-2xl p-8 lg:p-12 shadow-xl">
            <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
              Pronto a Iniziare?
            </h3>
            <p className="text-indigo-100 mb-8 text-lg max-w-2xl mx-auto">
              Crea subito la scheda del tuo pet e scopri i consigli personalizzati che abbiamo per lui
            </p>
            <button className="bg-white text-indigo-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-50 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 inline-flex items-center gap-3 group">
              Inizia a Creare la Scheda del Tuo Pet
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}