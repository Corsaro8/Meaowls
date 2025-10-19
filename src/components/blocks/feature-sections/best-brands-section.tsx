"use client";

import { Button } from "@/components/ui/button";

export const BestBrandsSection = () => {
  const brands = [
  { name: "Royal Canin", emoji: "🐕" },
  { name: "Monge", emoji: "🐱" },
  { name: "Hill's", emoji: "🐕" },
  { name: "Purina Pro Plan", emoji: "🐱" },
  { name: "Orijen", emoji: "🐕" },
  { name: "Acana", emoji: "🐱" },
  { name: "Farmina", emoji: "🐕" },
  { name: "Trainer", emoji: "🐱" },
  { name: "Natural Trainer", emoji: "🐕" },
  { name: "Exclusion", emoji: "🐱" },
  { name: "Almo Nature", emoji: "🐕" },
  { name: "Schesir", emoji: "🐱" }];


  return (
    <section className="py-16 px-4 sm:py-20 sm:px-6 lg:px-8 !w-full !h-40">
      <div className="mx-auto max-w-5xl">
        {/* Remove inner rounded div with bg-[#F7FAFC] */}
        {/* Remove CTA button div */}
      </div>
    </section>);

};